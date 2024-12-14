<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Subchapter;
use Illuminate\Http\Request;
use App\Http\Resources\SubchapterResource;
use App\Models\Course;
use Illuminate\Database\Query\Builder;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class SubchapterController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {
        return [
            new Middleware('auth:api', except: ['index', 'show']),
            new Middleware('role:teacher', except: ['index', 'show', 'markAsCompleted'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(string $course, string $chapter)
    {
        $course = Course::where('slug', $course)->firstOrFail();
        $chapter = $course->chapters()->where('position', $chapter)->firstOrFail();
        $subchapters = $chapter->subchapters()
            ->with('assignments')
            ->orderBy('position')
            ->get();

        return SubchapterResource::collection($subchapters);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $course, string $chapter)
    {
        $course = Course::where('slug', $course)->firstOrFail();

        if ($course->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $chapter = $course->chapters->where('position', $chapter)->firstOrFail();

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'present|string',
            'content' => 'required|string',
            'is_published' => 'required|boolean',
            'position' => [
                'required',
                'numeric',
                Rule::unique('subchapters')->where(fn(Builder $query) =>
                $query->where('chapter_id', $chapter->id))
            ]
        ]);

        $subchapter = new Subchapter();

        $subchapter->fill($validated);
        $subchapter->chapter_id = $chapter->id;

        $subchapter->save();

        return new SubchapterResource($subchapter);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $course, string $chapter, string $subchapter)
    {
        $course = Course::where('slug', $course)->firstOrFail();
        $chapter = $course->chapters->where('position', $chapter)->firstOrFail();
        $subchapter = $chapter->subchapters()
            ->where('position', $subchapter)
            ->with('assignments')
            ->firstOrFail();

        return new SubchapterResource($subchapter);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $course, string $chapter, string $subchapter)
    {
        $course = Course::where('slug', $course)->firstOrFail();

        if ($course->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $chapter = $course->chapters->where('position', $chapter)->firstOrFail();
        $subchapter = $chapter->subchapters->where('position', $subchapter)->firstOrFail();

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'present|string',
            'content' => 'required|string',
            'is_published' => 'required|boolean',
            'position' => [
                'required',
                'numeric',
                Rule::unique('subchapters')
                    ->ignore($subchapter)
                    ->where(fn(Builder $query) =>
                    $query->where('chapter_id', $chapter->id))
            ]
        ]);

        $subchapter->fill($validated);
        $subchapter->save();

        return new SubchapterResource($subchapter->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $course, string $chapter, string $subchapter)
    {
        $course = Course::where('slug', $course)->firstOrFail();

        if ($course->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $chapter = $course->chapters->where('position', $chapter)->firstOrFail();
        $subchapter = $chapter->subchapters->where('position', $subchapter)->firstOrFail();

        $subchapter->delete();

        return response()->json(['message' => 'Subchapter has been deleted succesfully'], 204);
    }

    public function markAsCompleted(Request $request, Course $course, Chapter $chapter, Subchapter $subchapter)
    {
        if (!$request->user()->hasPurchased($course)) {
            return response(['message' => 'Unauthorized'], 403);
        }

        if ($request->user()
            ->subchapters()
            ->find($subchapter->id)
            ->progress
            ->is_completed
        ) {
            return response()->json(['message' => 'User has already finished this subchapter'], 406);
        }

        $request->user()->markAsCompleted($subchapter);

        return response()->json(
            $request->user()
                ->subchapters()
                ->find($subchapter->id)
                ->progress
        );
    }
}

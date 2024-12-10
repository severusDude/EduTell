<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChapterResource;
use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class ChapterController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {
        return [
            new Middleware('auth:api', except: ['index', 'show']),
            new Middleware('role:teacher', except: ['index', 'show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(string $course)
    {
        $course = Course::where('slug', $course)->firstOrFail();

        return ChapterResource::collection($course->chapters);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $course)
    {
        $course = Course::where('slug', $course)->firstOrFail();

        if ($course->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'string|present|nullable',
            'is_published' => 'required|boolean'
        ]);

        $chapter = new Chapter;

        $chapter->fill($validated);
        $chapter->course_id = $course->id;

        $chapter->save();

        return new ChapterResource($chapter);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $course, string $chapter)
    {
        $course = Course::where('slug', $course)->firstOrFail();
        $chapter = $course->chapters->findOrFail($chapter);

        return new ChapterResource($chapter);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $course, string $chapter)
    {
        $course = Course::where('slug', $course)->firstOrFail();

        if ($course->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $chapter = $course->chapters->findOrFail($chapter);

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'string|present|nullable',
            'is_published' => 'required|boolean'
        ]);

        $chapter->fill($validated);
        $chapter->save();

        return new ChapterResource($chapter->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $course, string $chapter)
    {
        $course = Course::where('slug', $course)->firstOrFail();

        if ($course->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $chapter = $course->chapters->findOrFail($chapter);

        $chapter->delete();

        return response()->json(['message' => 'Chapter has been deleted succesfully'], 204);
    }
}

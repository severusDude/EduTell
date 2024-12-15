<?php

namespace App\Http\Controllers;

use App\Http\Resources\AssignmentResource;
use App\Models\Course;
use App\Models\Assignment;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class AssignmentController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {
        return [
            new Middleware('auth:api'),
            new Middleware('role:teacher'),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(
        Request $request,
        string $course,
        string $chapter,
        string $subchapter
    ) {
        $course = Course::where('slug', $course)->firstOrFail();

        if ($course->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $chapter = $course->chapters()->where('position', $chapter)->firstOrFail();
        $subchapter = $chapter->subchapters()->where('position', $subchapter)->firstOrFail();

        return AssignmentResource::collection($subchapter->assignments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        Request $request,
        string $course,
        string $chapter,
        string $subchapter
    ) {
        $course = Course::where('slug', $course)->firstOrFail();

        if ($course->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $chapter = $course->chapters->where('position', $chapter)->firstOrFail();
        $subchapter = $chapter->subchapters->where('position', $subchapter)->firstOrFail();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'present|string',
            'due_date' => 'required|date_format:d-m-Y'
        ]);

        $assignment = new Assignment();

        $assignment->fill($validated);
        $assignment->subchapter_id = $subchapter->id;
        $assignment->is_active = true;

        $assignment->save();

        return new AssignmentResource($assignment);
    }

    /**
     * Display the specified resource.
     */
    public function show(
        Request $request,
        string $course,
        string $chapter,
        string $subchapter,
        string $assignment
    ) {
        $course = Course::where('slug', $course)->firstOrFail();

        if ($course->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $assignment = Assignment::findOrFail($assignment);

        return new AssignmentResource($assignment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        Request $request,
        string $course,
        string $chapter,
        string $subchapter,
        string $assignment
    ) {
        $course = Course::where('slug', $course)->firstOrFail();

        if ($course->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'present|string',
            'due_date' => 'required|date_format:d-m-Y',
            'is_active' => 'required|boolean'
        ]);

        $assignment = Assignment::findOrFail($assignment);

        $assignment->fill($validated);
        $assignment->save();

        return new AssignmentResource($assignment->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
        Request $request,
        string $course,
        string $chapter,
        string $subchapter,
        string $assignment
    ) {
        $course = Course::where('slug', $course)->firstOrFail();

        if ($course->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $assignment = Assignment::findOrFail($assignment);

        $assignment->delete();

        return response()->json(['message' => 'Assignment have been deleted succesfully'], 204);
    }
}

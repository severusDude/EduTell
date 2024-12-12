<?php

namespace App\Http\Controllers;

use App\Http\Resources\AssignmentResource;
use App\Models\Course;
use App\Models\Assignment;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $course, string $chapter, string $subchapter)
    {
        $course = Course::where('slug', $course)->firstOrFail();
        $chapter = $course->chapters()->where('position', $chapter)->firstOrFail();
        $subchapter = $chapter->subchapters()->where('position', $subchapter)->firstOrFail();

        return AssignmentResource::collection($subchapter->assignments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $course, string $chapter, string $subchapter)
    {
        $course = Course::where('slug', $course)->firstOrFail();
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
    public function show(string $course, string $chapter, string $subchapter, Assignment $assignment)
    {
        return new AssignmentResource($assignment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $course, string $chapter, string $subchapter, Assignment $assignment)
    {
        $course = Course::where('slug', $course)->firstOrFail();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'present|string',
            'due_date' => 'required|date_format:d-m-Y',
            'is_active' => 'required|boolean'
        ]);

        $assignment->fill($validated);
        $assignment->save();

        return new AssignmentResource($assignment->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $course, string $chapter, string $subchapter, Assignment $assignment)
    {
        $course = Course::where('slug', $course)->firstOrFail();
        $assignment->delete();

        return response()->json(['message' => 'Assignment have been deleted succesfully'], 204);
    }
}

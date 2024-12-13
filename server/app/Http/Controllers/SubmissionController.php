<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubmissionResource;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\Submission;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(
        string $course,
        string $chapter,
        string $subchapter,
        string $assignment
    ) {
        $course = Course::where('slug', $course)->firstOrFail();
        $assignment = Assignment::findOrFail($assignment);

        return SubmissionResource::collection($assignment->submissions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        Request $request,
        string $course,
        string $chapter,
        string $subchapter,
        string $assignment
    ) {
        $course = Course::where('slug', $course)->firstOrFail();
        $assignment = Assignment::findOrFail($assignment);

        $validated = $request->validate([
            'content' => 'present|nullable|string'
        ]);

        $submission = new Submission();

        $submission->fill($validated);
        $submission->user_id = $request->user()->id;
        $submission->assignment_id = $assignment->id;

        $submission->save();

        return response()->json($submission);
    }

    /**
     * Display the specified resource.
     */
    public function show(Submission $submission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Submission $submission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Submission $submission)
    {
        //
    }
}

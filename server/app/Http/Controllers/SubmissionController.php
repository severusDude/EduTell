<?php

namespace App\Http\Controllers;

use App\Http\Resources\AssignmentResource;
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

        //check whether user has already submitted the submission
        // if ($request->user()->hasSubmitted($assignment)) {
        //     return response()->json(['message' => 'User has already made submission to this assignment'], 403);
        // }

        $validated = $request->validate([
            'content' => 'present|nullable|string'
        ]);

        $submission = new Submission();

        $submission->fill($validated);
        $submission->user_id = $request->user()->id;
        $submission->assignment_id = $assignment->id;

        $submission->save();

        return new SubmissionResource($submission);
    }

    /**
     * Display the specified resource.
     */
    public function show(
        string $course,
        string $chapter,
        string $subchapter,
        string $assignment,
        string $submission,
    ) {
        $course = Course::where('slug', $course)->firstOrFail();
        $submission = Submission::findOrFail($submission);

        return new SubmissionResource($submission);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        Request $request,
        string $course,
        string $chapter,
        string $subchapter,
        string $assignment,
        string $submission,
    ) {
        $course = Course::where('slug', $course)->firstOrFail();
        $submission = Submission::findOrFail($submission);

        $validated = $request->validate([
            'content' => 'present|nullable|string'
        ]);

        $submission->fill($validated);

        $submission->save();

        return new SubmissionResource($submission);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
        string $course,
        string $chapter,
        string $subchapter,
        string $assignment,
        string $submission,
    ) {
        $course = Course::where('slug', $course)->firstOrFail();
        $submission = Submission::findOrFail($submission);

        $submission->delete();

        return response()->json(['message' => 'Submission has been deleted succesfully'], 204);
    }
}

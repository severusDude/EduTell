<?php

namespace App\Http\Controllers;

use App\Http\Resources\GradeResource;
use App\Models\Grade;
use App\Models\Submission;
use Illuminate\Http\Request;

class GradeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Submission $submission)
    {
        return new GradeResource($submission->grade);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Submission $submission)
    {
        $validated = $request->validate([
            'score' => 'required|decimal:0,2|min:0|max:100',
            'comment' => 'present|string|nullable',
        ]);

        $grade = new Grade();

        $grade->fill($validated);
        $grade->submission_id = $submission->id;

        $grade->save();

        return new GradeResource($grade);
    }

    /**
     * Display the specified resource.
     */
    public function show(Grade $grade)
    {
        return new GradeResource($grade);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Submission $submission, Grade $grade)
    {
        $validated = $request->validate([
            'score' => 'required|decimal:0,2|min:0|max:100',
            'comment' => 'present|string|nullable',
        ]);

        $grade->fill($validated);

        $grade->save();

        return new GradeResource($grade);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Submission $submission, Grade $grade)
    {
        $grade->delete();

        return response()->json(['message' => 'Grade has been deleted succesfully'], 204);
    }
}

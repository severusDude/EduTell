<?php

namespace App\Http\Controllers;

use Closure;
use App\Models\User;
use App\Models\Grade;
use App\Models\Course;
use App\Models\Submission;
use Illuminate\Http\Request;
use App\Http\Resources\GradeResource;
use App\Http\Resources\SubmissionResource;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class GradeController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:api'),
            new Middleware('role:teacher', except: ['index', 'show']),

            new Middleware(function (Request $request, Closure $next) {

                $submission = $request->route('submission');

                $course = $submission->assignment->subchapter->chapter->course;

                if (
                    !($request->user()->hasPurchased($course))
                ) {
                    return response()->json(['error' => 'Unauthorized'], 403);
                }

                return $next($request);
            }, except: ['index'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // dd($request->user()->submissions()->with('grade')->get());

        return SubmissionResource::collection(
            $request->user()->submissions()->with('grade')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Submission $submission)
    {
        if ($submission->grade()->exists()) {
            return response()->json(['message' => 'Submission has already been graded'], 406);
        }

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

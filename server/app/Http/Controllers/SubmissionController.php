<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubmissionResource;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\Submission;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class SubmissionController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {
        return [
            new Middleware('auth:api'),
            // new Middleware('role:teacher', only: ['index', 'show']),
            new Middleware(function (Request $request, Closure $next) {
                // get course slug from url
                $course_slug = $request->route('course');

                $course = Course::where('slug', $course_slug)->firstOrFail();

                if (
                    !($request->user()->hasPurchased($course))
                ) {
                    return response()->json(['error' => 'Unauthorized'], 403);
                }

                return $next($request);
            }),

            new Middleware(function (Request $request, Closure $next) {
                $assignment = Assignment::findOrFail($request->route('assignment'));

                // check whether submission has passed assignment due date
                if ($assignment->due_date <= now()) {
                    return response()->json(['message' => 'Submitting submission not allowed exceeding assignment\'s due date'], 406);
                }
            }, except: ['index', 'show']),

            new Middleware('role:student', except: ['index', 'show']),

        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(
        Request $request,
        string $course,
        string $chapter,
        string $subchapter,
        string $assignment
    ) {
        $course = Course::where('slug', $course)->firstOrFail();
        $assignment = Assignment::findOrFail($assignment);

        if ($request->user()->hasRole('student')) {
            return new SubmissionResource($request->user()->submissions()
                ->where('assignment_id', $assignment->id)
                ->firstOrFail());
        }

        return SubmissionResource::collection($assignment->submissions()->paginate(15));
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
        if ($assignment->submissions()->where('user_id', $request->user()->id)->exists()) {
            return response()->json(['message' => 'User has already made submission to this assignment'], 403);
        }

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
        Request $request,
        string $course,
        string $chapter,
        string $subchapter,
        string $assignment,
        string $submission,
    ) {
        $course = Course::where('slug', $course)->firstOrFail();
        $submission = Submission::findOrFail($submission);

        if ($submission->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

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

        // check whether the submission belong to currently authenticated user
        if ($submission->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

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
        Request $request,
        string $course,
        string $chapter,
        string $subchapter,
        string $assignment,
        string $submission,
    ) {
        $course = Course::where('slug', $course)->firstOrFail();
        $submission = Submission::findOrFail($submission);

        // check whether the submission belong to currently authenticated user
        if ($submission->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $submission->delete();

        return response()->json(['message' => 'Submission has been deleted succesfully'], 204);
    }
}

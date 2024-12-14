<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Course;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CourseResource;
use App\Http\Controllers\AuthController;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class CourseController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {
        return [
            new Middleware('auth:api', except: ['index', 'show', 'teacher', 'students']),
            new Middleware('role:teacher', except: [
                'index',
                'show',
                'teacher',
                'students',
                'purchase',
                'progress'
            ])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CourseResource::collection(Course::paginate(15));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([

            'title' => 'required|string|min:3|max:50',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'image_url' => 'required|string',
            'price' => 'required|numeric',
            'difficulty' => ['required', 'string', Rule::in(['Beginner', 'Intermediate', 'Advanced'])],
            'duration' => 'required|numeric',
            'is_published' => 'required|boolean'
        ]);

        $course = new Course;
        $course->fill($validated);

        $course->user_id = $request->user()->id;


        $course->save();

        return new CourseResource($course->fresh());
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $course)
    {
        $course = Course::where('slug', $course)
            ->with('chapters')
            ->firstOrFail();

        return new CourseResource($course);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $course)
    {
        $course = Course::where('slug', $course)->firstOrFail();

        if ($course->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|min:3|max:50',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'image_url' => 'required|string',
            'price' => 'required|numeric',
            'difficulty' => ['required', 'string', Rule::in(['Beginner', 'Intermediate', 'Advanced'])],
            'duration' => 'required|numeric',
            'is_published' => 'required|boolean'
        ]);

        $course->fill($validated);
        $course->save();

        return new CourseResource($course->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $course)
    {
        $course = Course::where('slug', $course)->firstOrFail();

        if ($course->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $course->delete();

        return response()->json(['message' => 'Course has been deleted succesfully'], 204);
    }

    public function teacher(string $course)
    {
        $course = Course::where('slug', $course)->firstOrFail();

        return new UserResource($course->teacher);
    }

    public function students(string $course)
    {
        $course = Course::where('slug', $course)->firstOrFail();

        return UserResource::collection($course->students()->paginate(15));
    }

    public function purchase(Request $request, string $course)
    {
        $course = Course::where('slug', $course)->firstOrFail();

        if ($request->user()->hasPurchased($course)) {
            return response()->json(['message' => 'User has already purchased this course'], 400);
        }

        // initiate purchase
        $request->user()
            ->courses()
            ->attach($course->id, [
                'id' => Str::uuid(),
                'purchased_at' => now()
            ]);

        // create progress table
        $subchapters = $course->chapters->flatMap(function ($chapter) {
            return $chapter->subchapters;
        });

        $request->user()->subchapters()->attach($subchapters->pluck('id'), ['is_completed' => false]);

        return CourseResource::collection($request->user()->courses()->where('course_id', $course->id)->get());
    }

    public function progress(Request $request, Course $course)
    {
        if (!$request->user()->hasPurchased($course)) {
            return response()->json(['message' => 'User has not purchased this course'], 406);
        }

        $subchapters = $request->user()->subchapters()->whereIn(
            'chapter_id',
            $course->chapters->pluck('id')
        )->get();

        return response()->json([
            'finished' => $subchapters->where('progress.is_completed', true)->count(),
            'unfinished' => $subchapters->where('progress.is_completed', false)->count()
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Resources\UserResource;
use App\Http\Resources\CourseResource;
use App\Http\Controllers\AuthController;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller implements HasMiddleware
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
            'title' => 'required|string|min:3|max:50|regex:/^[a-zA-Z\s\-\'\\/]+$/',
            'description' => 'required|string|regex:/^[a-zA-Z\s\-\'\\/]+$/',
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
    public function show(string $course)
    {
        return new CourseResource(Course::where('slug', $course)->firstOrFail());
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
            'title' => 'required|string|min:3|max:50|regex:/^[a-zA-Z\s\-\'\\/]+$/',
            'description' => 'required|string|regex:/^[a-zA-Z\s\-\'\\/]+$/',
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
}

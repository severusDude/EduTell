<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Resources\UserResource;
use App\Http\Resources\CourseResource;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
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

        $auth = new AuthController();
        $course->user_id = $auth->user()->original->id;

        $course->save();

        return new CourseResource($course->fresh());
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
    }
}
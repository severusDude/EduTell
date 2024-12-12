<?php

use App\Models\User;
use App\Models\Course;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\CourseResource;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubchapterController;

Route::group(['prefix' => 'auth'], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('jwt')->group(function () {
        Route::get('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
    });
});

Route::get('slug/{slug}', [UserController::class, 'isSlugAvailable']);

Route::apiResource('users', UserController::class)
    ->except('store');

Route::apiResource('categories', CategoryController::class)
    ->except('show');

Route::apiResource('courses', CourseController::class);
Route::apiResource('courses.chapters', ChapterController::class);
Route::apiResource('courses.chapters.subchapters', SubchapterController::class);

Route::get('users/{user}/teaches', function (Request $request) {
    return response()->json($request->user()->teaches);
});

Route::get('users/{user}/purchased-courses', function (Request $request, string $user) {
    return response()->json($request->user()->courses);
});

Route::prefix('courses')->group(function () {
    Route::get('{course}/teacher', function (string $course) {
        $course = Course::where('slug', $course)->firstOrFail();

        return response()->json($course->user);
    });

    Route::get('{course}/students', function (string $course) {
        $course = Course::where('slug', $course)->firstOrFail();

        return response()->json($course->students);
    });

    Route::post('{course}/purchase', function (Request $request, string $course) {
        $course = Course::where('slug', $course)->firstOrFail();

        $request->user()
            ->courses()
            ->attach($course->id, [
                'id' => Str::uuid(),
                'purchased_at' => now()
            ]);

        return response()->json($request->user()->courses);
    });
});

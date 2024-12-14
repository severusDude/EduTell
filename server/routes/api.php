<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\SubchapterController;
use App\Http\Controllers\SubmissionController;

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

Route::prefix('users')->group(function () {
    Route::get('{user}/teaches', [UserController::class, 'teaches']);
    Route::get('{user}/courses', [UserController::class, 'courses']);
});

Route::apiResource('categories', CategoryController::class)
    ->except('show');

Route::apiResource('courses', CourseController::class);
Route::apiResource('courses.chapters', ChapterController::class);
Route::apiResource('courses.chapters.subchapters', SubchapterController::class);
Route::apiResource('courses.chapters.subchapters.assignments', AssignmentController::class);
Route::apiResource('courses.chapters.subchapters.assignments.submissions', SubmissionController::class);

Route::prefix('courses')->group(function () {
    Route::get('{course}/teacher', [CourseController::class, 'teacher']);
    Route::get('{course}/students', [CourseController::class, 'students']);
    Route::post('{course}/purchase', [CourseController::class, 'purchase']);
});

Route::apiResource('submissions.grades', GradeController::class);

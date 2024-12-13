<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\SubchapterController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

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
Route::apiResource('courses.chapters.subchapters.assignments', AssignmentController::class);
Route::apiResource('courses.chapters.subchapters.assignments.submissions', SubmissionController::class);

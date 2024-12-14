<?php

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

Route::post(
    'courses/{course:slug}/chapters/{chapter:position}/subchapters/{subchapter:position}/mark-complete',
    [SubchapterController::class, 'markAsCompleted']
);

Route::get('users/{user:slug}/grades', [GradeController::class, 'index']);

Route::apiResource('submissions.grades', GradeController::class)
    ->except('index');


//updated routes
Route::prefix('v1')->group(function () {

    // auth routes
    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
    });

    // me routes (currently authenticated user)
    Route::prefix('me')->middleware('auth:api')->group(function () {
        Route::get('', [AuthController::class, 'me']);
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('teaches', [UserController::class, 'teaches']);
        Route::get('courses', [UserController::class, 'courses']);
    });

    // category routes
    // Route::apiResource('categories', CategoryController::class);
    // Route::apiResource('courses', CourseController::class);
    // Route::apiResource('chapters', ChapterController::class);
    // Route::apiResource('subchapters', SubchapterController::class);
    // Route::apiResource('assignments', AssignmentController::class);
    // Route::apiResource('submissions', SubmissionController::class);
    // Route::apiResource('grades', GradeController::class);
});

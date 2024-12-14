<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Resources\UserResource;
use App\Http\Resources\CourseResource;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class UserController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {
        return [
            new Middleware('auth:api', except: ['index', 'show']),
            new Middleware('role:teacher', only: ['teaches'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(User::paginate());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $user)
    {
        return new UserResource(User::where('slug', $user)->firstOrFail());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $user)
    {
        $user = User::where('slug', $user)->firstOrFail();

        if ($user->id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|alpha_dash|min:3|max:50',
            'slug' => [
                Rule::unique('users', 'slug')->ignore($user->id),
                'required',
                'string',
                'alpha_dash',
                'min:3',
                'max:50'
            ],
            'date_of_birth' => 'nullable|date_format:d-m-Y',
            'bio' => 'nullable|string|max:750',
            'gender' => [
                'required',
                'string',
                Rule::in(['male', 'female', 'prefer not to say'])
            ],
        ]);

        $user->fill($validated);
        $user->save();

        return new UserResource($user->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $user)
    {
        $user = User::where('slug', $user)->firstOrFail();

        if ($user->id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'User has been deleted successfully'], 204);
    }

    public function isSlugAvailable(string $slug)
    {
        $available = User::where('slug', $slug)->exists();

        return response()->json($available);
    }

    public function teaches(Request $request)
    {
        return CourseResource::collection($request->user()->teaches()->paginate(15));
    }

    public function courses(Request $request)
    {
        return CourseResource::collection($request->user()->courses()->paginate(15));
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Resources\UserResource;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class UserController extends Controller implements HasMiddleware
{
    //Midleware
    public static function middleware(): array
    {
        return [
            // new Middleware('auth:api', only: ['update', 'destroy'])
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
            'gender' => [Rule::in(['male', 'female', 'prefer not to say'])],
        ]);

        $user->fill($validated);
        $user->save();

        return new UserResource($user->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $user)
    {
        $user = User::where('slug', $user)->firstOrFail();
        $user->delete();

        return response()->json(['message' => 'User has been deleted successfully'], 204);
    }

    public function isSlugAvailable(string $slug)
    {
        $available = User::where('slug', $slug)->exists();

        return response()->json($available);
    }
}

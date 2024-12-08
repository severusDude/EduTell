<?php

namespace App\Http\Controllers;

use App\Models\User;
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
            new Middleware('auth:api', except: ['index', 'show', 'isSlugAvailable'])
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
    public function update(UpdateUserRequest $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
    }

    public function isSlugAvailable(string $slug)
    {
        $available = User::where('slug', $slug)->exists();

        return response()->json($available);
    }
}

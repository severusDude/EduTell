<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|alpha_dash|min:3|max:50',
            'slug' => 'required|string|alpha_dash|unique:users,slug|min:3|max:50',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        User::create($validated);

        return response()->json(['message' => 'Account created successfully'], 200);
    }

    // User login
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            // Get the authenticated user.
            $user = Auth::user();

            // (optional) Attach the role to the token.
            $token = JWTAuth::claims([
                'role' => $user->roles[0]['name'],
                'name' => $user->name,
                'slug' => $user->slug
            ])->fromUser($user);

            return response()->json(compact('token'));
            // return $this->respondWithToken($token);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['error' => 'User not found'], 404);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 400);
        }

        return response()->json($user);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['error' => 'User not found'], 404);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 400);
        }

        return new UserResource($user);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = $request->user();

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
            'image' => 'nullable|image|mimes:png,jpg,jpeg,gif|max:2048',
            'date_of_birth' => 'nullable|date_format:d-m-Y',
            'bio' => 'nullable|string|max:750',
            'gender' => [
                'required',
                'string',
                Rule::in(['male', 'female', 'prefer not to say'])
            ],
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            if ($image->isValid()) {
                $filename = $validated['slug'] . 'profilepic.' . $image->extension();
                $path = $image->storeAs('images', $filename, 'public');
                $validated['image_url'] = $path;
            }
        }

        $user->fill($validated);
        $user->save();

        return new UserResource($user->fresh());
    }
}

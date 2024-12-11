<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(['data' => Category::all()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'min:3',
                'max:50',
                'regex:/^[a-zA-Z\s\-\'\\/]+$/'
            ],
            'description' => 'nullable|string'
        ], [
            'name.regex' => 'The name field can only contain letters, spaces, hypens, apostrophes and slashes'
        ]);

        $category = new Category;

        $category->name = $validated['name'];

        if (isset($validated['description'])) {
            $category->description = $validated['description'];
        }

        $category->save();

        return response()->json([
            'message' => 'Category successfully created',
            'data' => $category
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'min:3',
                'max:50',
                'regex:/^[a-zA-Z\s\-\'\\/]+$/'
            ],
            'description' => 'nullable|string'
        ], [
            'name.regex' => 'The name field can only contain letters, spaces, hypens, apostrophes and slashes'
        ]);

        $category->name = $validated['name'];

        if (isset($validated['description'])) {
            $category->description = $validated['description'];
        }

        $category->save();

        return response()->json([
            'message' => 'Category successfully updated',
            'data' => $category->fresh()
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(null, 204);
    }
}

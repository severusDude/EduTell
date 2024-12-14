<?php

namespace App\Http\Resources;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $course = Course::findOrFail($this->id);
        $user = $request->user();
        // dd($course);

        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'user_id' => $this->teacher->slug,
            'category_id' => $this->category->name,
            'image_url' => $this->image_url,
            'price' => $this->price,
            'difficulty' => $this->difficulty,
            'duration' => $this->duration,
            'is_published' => $this->is_published,
            'enrolled' => $this->students()->count(),
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
            'purchased' => ($user && $user->hasPurchased($course)) ?
                $course->students()->where('user_id', $user->id)->first()->pivot->purchased_at ??
                $course->teacher->slug // for teacher
                : null,
            // 3 jam ngurusin gini doang loh asuu
            'chapters' => ChapterResource::collection($this->whenLoaded('chapters', $course->chapters()->orderBy('position')->get())),
        ];
    }
}

<?php

namespace App\Http\Resources;

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
        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'user_id' => $this->user->slug,
            'category_id' => $this->category_id,
            'image_url' => $this->image_url,
            'price' => $this->price,
            'difficulty' => $this->difficulty,
            'duration' => $this->duration,
            'is_published' => $this->is_published,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}

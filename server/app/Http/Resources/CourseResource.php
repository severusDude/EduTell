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
            'description' => $this->description,
            'user_id' => $this->user_id,
            'category_id' => $this->category_id,
            'image_url' => $this->image_url,
            'price' => $this->price,
            'difficulty' => $this->difficulty,
            'duration' => $this->duration,
            'is_published' => $this->is_published
        ];
    }
}

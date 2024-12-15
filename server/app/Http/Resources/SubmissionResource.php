<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubmissionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->when($request->user() &&
                $request->user()->hasRole('teacher'), function () {
                return $this->user->slug;
            }),
            'content' => $this->content,
            'submitted_at' => (string) $this->created_at,
            'grade' => new GradeResource($this->whenLoaded('grade', function () {
                return $this->grade;
            })),
            'attachments' => AttachmentResource::collection($this->whenLoaded('attachments', function () {
                return $this->attachments()->get();
            }))
        ];
    }
}

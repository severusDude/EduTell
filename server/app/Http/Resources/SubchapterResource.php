<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubchapterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $course = $this->chapter->course;

        return [
            'title' => $this->title,
            'description' => $this->description,
            'content' => $this->when(
                $request->user() && //prevent null error on guest access
                    $request->user()->hasPurchased($this->chapter->course),
                function () {
                    return $this->content;
                }
            ),
            'is_published' => $this->is_published,
            'position' => $this->position,
            // 'assignments' => AssignmentResource::collection($this->whenLoaded('assignments', function () {
            //     return $this->assignments()->get();
            // })),
            // 'attachments' => AttachmentResource::collection($this->whenLoaded('attachments'), function () {
            //     return $this->attachments()->get();
            // }),
            'assignments' => $this->when($request->user() && $request->user()->hasPurchased($course), function () {
                return AssignmentResource::collection($this->whenLoaded('assignments', function () {
                    return $this->assignments()->get();
                }));
            }),
            'attachments' => $this->when($request->user() && $request->user()->hasPurchased($course), function () {
                return AttachmentResource::collection($this->whenLoaded('attachments', function () {
                    return $this->attachments()->get();
                }));
            }),
        ];
    }
}

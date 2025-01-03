<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subchapter extends Model
{
    /** @use HasFactory<\Database\Factories\SubchapterFactory> */
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'title',
        'description',
        'content',
        'is_published',
        'position'
    ];

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'progresses')
            ->as('progress')
            ->withPivot('is_completed')
            ->withTimestamps();
    }

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachable')->chaperone();
    }

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean'
        ];
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();

            if (empty($model->position)) {
                $last_subchapter = self::where('chapter_id', $model->chapter_id)
                    ->orderByDesc('position')
                    ->first();

                $model->position = $last_subchapter ? $last_subchapter->position + 1 : 1;
            }
        });
    }
}

<?php

namespace App\Models;

use App\Models\Course;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Chapter extends Model
{
    /** @use HasFactory<\Database\Factories\ChapterFactory> */
    use HasFactory;

    public $incrementing = false;

    protected $fillable = [
        'title',
        'description',
        'is_published',
        'position'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function subchapters()
    {
        return $this->hasMany(Subchapter::class);
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();

            if (empty($model->position)) {
                $last_chapter = self::where('course_id', $model->course_id)
                    ->orderByDesc('position')
                    ->first();

                $model->position = $last_chapter ? $last_chapter->position + 1 : 1;
            }
        });
    }
}

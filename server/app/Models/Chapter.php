<?php

namespace App\Models;

use App\Models\Course;
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
        'is_published'
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
            $last_chapter = Chapter::where('course_id', $model->course_id)
                ->orderBy('id', 'desc')
                ->first();

            $model->id = $last_chapter ? $last_chapter->id + 1 : 1;
        });
    }
}

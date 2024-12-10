<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    /** @use HasFactory<\Database\Factories\ChapterFactory> */
    use HasFactory;

    public $incrementing = false;

    public function chapter()
    {
        return $this->belongsTo(Course::class);
    }

    protected $fillable = [
        'title',
        'description',
        'is_published'
    ];

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

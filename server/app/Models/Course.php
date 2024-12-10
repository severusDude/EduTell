<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'category_id',
        'image_url',
        'price',
        'difficulty',
        'duration',
        'is_published'
    ];

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
            $base_slug = Str::slug($model->title);
            $slug = $base_slug;
            $counter = 1;

            if (Course::where('slug', $base_slug)->exists()) {
                while (Course::where('slug', $slug)->exists()) {
                    $slug = $base_slug . $counter;
                    $counter++;
                }
            }

            $model->slug = $slug;
        });
    }
}

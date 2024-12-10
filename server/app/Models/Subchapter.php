<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subchapter extends Model
{
    /** @use HasFactory<\Database\Factories\SubchapterFactory> */
    use HasFactory;

    public $incrementing = false;

    protected $fillable = [
        'id',
        'title',
        'description',
        'content',
        'is_published'
    ];

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $last_subchapter = Subchapter::where('chapter_id', $model->chapter_id)
                    ->orderBy('id', 'desc')
                    ->first();

                $model->id = $last_subchapter ? $last_subchapter->id + 1 : 1;
            }
        });
    }
}

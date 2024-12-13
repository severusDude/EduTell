<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    public $incrementing = false;

    protected $fillable = [
        'content'
    ];

    public function assignment()
    {
        return $this->belongsTo(Assignment::class);
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}

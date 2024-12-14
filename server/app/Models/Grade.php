<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'score',
        'comment'
    ];

    public function submission()
    {
        return $this->belongsTo(Submission::class);
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}

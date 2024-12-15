<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'content'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function assignment()
    {
        return $this->belongsTo(Assignment::class);
    }

    public function grade()
    {
        return $this->hasOne(Grade::class);
    }

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachable')->chaperone();
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}

<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'file_url',
        'attachable_id',
        'attachable_type'
    ];

    public function attachable()
    {
        return $this->morphTo();
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}

<?php

namespace App\Models;

use App\Models\Subchapter;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Assignment extends Model
{
    /** @use HasFactory<\Database\Factories\AssignmentFactory> */
    use HasFactory;

    public $incrementing = false;

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'is_active'
    ];

    public function subchapter()
    {
        return $this->belongsTo(Subchapter::class);
    }

    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean'
        ];
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}

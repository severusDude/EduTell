<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'email',
        'password',
        'image_url',
        'date_of_birth',
        'bio',
        'gender'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    //role scope
    public function scopeTeacher($query)
    {
        return $query->whereHas('roles', function ($query) {
            $query->where('name', 'teacher');
        });
    }

    public function scopeStudent($query)
    {
        return $query->whereHas('roles', function ($query) {
            $query->where('name', 'student');
        });
    }

    public function teaches()
    {
        return $this->hasMany(Course::class, 'user_id');
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'purchases')
            ->withPivot('purchased_at')
            ->withTimestamps();
    }

    public function hasPurchased(Course $course): bool
    {
        return $this->courses()->where('course_id', $course->id)->exists() ||
            $course->teacher->id === $this->id;
    }

    public function subchapters()
    {
        return $this->belongsToMany(Subchapter::class, 'progresses')
            ->as('progress')
            ->withPivot('is_completed')
            ->withTimestamps();
    }

    // progress controls
    public function markAsCompleted(Subchapter $subchapter)
    {
        return $this->subchapters()->updateExistingPivot($subchapter->id, ['is_completed' => true]);
    }

    public function markAsIncomplete(Subchapter $subchapter)
    {
        return $this->subchapters()->updateExistingPivot($subchapter->id, ['is_completed' => false]);
    }


    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }


    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });

        static::created(function ($model) {
            if (!$model->hasRole('teacher')) {
                $model->syncRoles('student');
            }
        });
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'student_number',
    'first_name',
    'last_name',
    'email',
    'phone',
    'department',
    'program',
    'date_of_birth',
    'gender',
    'address',
    'is_active',
])]
class Student extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'is_active' => 'boolean',
        ];
    }
}

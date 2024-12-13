<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'student',
                'slug' => 'student',
                'email' => 'student@example.com',
                'password' => 'student',
                'role' => 'student'
            ],
            [
                'name' => 'teacher',
                'slug' => 'teacher',
                'email' => 'teacher@example.com',
                'password' => 'teacher',
                'role' => 'teacher'
            ],

        ];

        foreach ($users as $user) {
            $createdUser = User::create([
                'name' => $user['name'],
                'slug' => $user['slug'],
                'email' => $user['email'],
                'password' => Hash::make($user['password'])
            ]);

            $createdUser->syncRoles($user['role']);
        }
    }
}

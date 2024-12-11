<?php

namespace Database\Seeders;

use App\Models\Chapter;
use App\Models\Subchapter;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubchapterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Chapter::all()->each(function ($model) {
            Subchapter::factory(4)->create([
                'chapter_id' => $model->id
            ]);
        });
    }
}

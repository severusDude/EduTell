<?php

use App\Models\Chapter;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subchapters', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->foreignIdFor(Chapter::class);
            $table->string('title');
            $table->text('description');
            $table->text('content');
            $table->boolean('is_published');
            $table->timestamps();

            $table->unique(['id', 'chapter_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subchapters');
    }
};

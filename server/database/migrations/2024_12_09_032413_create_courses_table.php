<?php

use App\Models\Category;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignUuid('user_id')->constrained();
            $table->foreignIdFor(Category::class);
            $table->string('image_url')->nullable();
            $table->smallInteger('price', unsigned: true);
            $table->enum('difficulty', ['Beginner', 'Medium', 'Advanced'])->default('Beginner');
            $table->tinyInteger('duration', unsigned: true)->default(0);
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};

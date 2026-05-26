<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('board_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->text('message');
            $table->string('role', 20)->default('visitor');
            $table->string('color', 7)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('board_messages');
    }
};

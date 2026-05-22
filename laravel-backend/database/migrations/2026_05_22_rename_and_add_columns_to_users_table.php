<?php

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
        Schema::table('users', function (Blueprint $table) {
            // Rename 'username' to 'name'
            $table->renameColumn('username', 'name');
            // Add new columns
            $table->string('role')->default('user');
            $table->integer('score')->default(0);
            $table->boolean('is_admin')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Revert column name
            $table->renameColumn('name', 'username');
            // Drop added columns
            $table->dropColumn(['role', 'score', 'is_admin']);
        });
    }
};

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
        Schema::table('academic_activities', function (Blueprint $table) {
            $table->unsignedTinyInteger('start_day')->nullable()->after('date_string');
        });

        Schema::table('academic_learning_programs', function (Blueprint $table) {
            $table->unsignedTinyInteger('start_day')->nullable()->after('date_string');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('academic_activities', function (Blueprint $table) {
            $table->dropColumn('start_day');
        });

        Schema::table('academic_learning_programs', function (Blueprint $table) {
            $table->dropColumn('start_day');
        });
    }
};

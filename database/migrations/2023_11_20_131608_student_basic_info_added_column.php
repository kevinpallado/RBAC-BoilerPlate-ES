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
        Schema::table('student_familybackground', function(Blueprint $table) {
            $table->string('Mother_Monthly_Income')->nullable();
            $table->string('Father_Monthly_Income')->nullable();
            $table->string('Guardian_Monthly_Income')->nullable();
            $table->string('Guardian_ProvinceID')->nullable();
            $table->string('Guardian_BarangayID')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('student_familybackground', function(Blueprint $table) {
            $table->dropColumn(['Mother_Monthly_Income','Father_Monthly_Income','Guardian_Monthly_Income','Guardian_ProvinceID','Guardian_BarangayID']);
        });
    }
};

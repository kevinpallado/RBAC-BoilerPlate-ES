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
        Schema::table('system_users', function(Blueprint $table) {
            $table->string('university_id');
            $table->boolean('block')->default(false);
            $table->boolean('is_confirmed')->default(false);
            $table->boolean('is_logged_in')->default(false);
            $table->boolean('is_parents')->default(false);
            $table->boolean('is_email_activated')->default(false);
            // must set by date time
            $table->dateTime('password_last_changed')->nullable();
            $table->dateTime('password_expire_date')->nullable();
            $table->string('block_reason')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('system_users', function(Blueprint $table) {
            $table->dropColumn(['university_id','block','is_confirmed','is_logged_in','is_parents','is_email_activated','password_last_changed','password_expire_date','block_reason']);
        });
    }
};

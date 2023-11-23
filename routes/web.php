<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
// controllers
use App\Http\Controllers\DashboardController;
// students
use App\Http\Controllers\Students\AssessmentBillingController;
use App\Http\Controllers\Students\EvaluationController;
use App\Http\Controllers\Students\GradesController;
use App\Http\Controllers\Students\ProfileController;
use App\Http\Controllers\Students\SubjectsEnrolledController;
// system settings
use App\Http\Controllers\SelectDataController;
use App\Http\Controllers\UsersGroupController;
use App\Http\Controllers\UsersController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('auth')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

    Route::prefix('system-settings')->name('system-settings.')->group(function () {
        Route::resource('user-group', UsersGroupController::class);
        Route::resource('users', UsersController::class);
    });

    Route::prefix('students')->name('students.')->group(function () {
        Route::resource('enrollment', DashboardController::class)->only('index');
        Route::resource('assessment-billing', AssessmentBillingController::class)->only('index');
        Route::resource('subjects-enrolled', SubjectsEnrolledController::class)->only('index');
        Route::resource('grades', GradesController::class)->only('index');
        Route::resource('evaluation', EvaluationController::class)->only('index');
        // student data
        Route::get('profile', [ProfileController::class, 'profile'])->name('profile');
        Route::post('profile/{student}', [ProfileController::class, 'updateProfile'])->name('submit.profile');
        Route::get('family', [ProfileController::class, 'family'])->name('profile.family');
        Route::post('family/{student}', [ProfileController::class, 'updateFamily'])->name('submit.family');
        Route::get('emergency', [ProfileController::class, 'emergency'])->name('profile.emergency');
        Route::post('emergency/{student}', [ProfileController::class, 'updateEmergency'])->name('submit.profile.emergency');
    });

    Route::prefix('select')->name('select.')->group(function () {
        Route::get('address', [SelectDataController::class, 'data'])->name('address');
    });
});

require __DIR__.'/auth.php';

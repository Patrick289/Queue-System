<?php

use App\Http\Controllers\Queues\QueueController;
use App\Http\Controllers\Reports\ReportController;
use App\Http\Controllers\Students\StudentController;
use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Student routes
    Route::get('students/search', [StudentController::class, 'search'])->name('students.search');
    Route::resource('students', StudentController::class);

    // Queue routes
    Route::resource('queues', QueueController::class)->only(['index', 'show']);
    Route::post('queues/{queue}/add-student', [QueueController::class, 'addStudent'])->name('queues.add-student');
    Route::patch('queue-positions/{position}', [QueueController::class, 'updatePosition'])->name('queue-positions.update');
    Route::delete('queue-positions/{position}', [QueueController::class, 'removeFromQueue'])->name('queue-positions.delete');

    // Report routes
    Route::resource('reports', ReportController::class)->only(['index', 'show', 'destroy']);
    Route::post('reports/generate-students', [ReportController::class, 'generateStudentsReport'])->name('reports.generate-students');
    Route::post('reports/generate-queues', [ReportController::class, 'generateQueuesReport'])->name('reports.generate-queues');

    // User management routes (admin only)
    Route::middleware('admin')->group(function () {
        Route::resource('users', UserController::class)->except(['show']);
    });
});

require __DIR__.'/settings.php';

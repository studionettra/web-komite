<?php

use App\Http\Controllers\AcademicCalendarController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\Admin\ClassroomController;
use App\Http\Controllers\AdminAcademicMonthController;
use App\Http\Controllers\AdminAcademicYearController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Korlas\CollectionController;
use App\Http\Controllers\Korlas\StudentController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgramActivityController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/pengurus', [HomeController::class, 'organization'])->name('public.organization');
Route::get('/keuangan', [HomeController::class, 'finance'])->name('public.finance');
Route::post('/keuangan/verify', [HomeController::class, 'verifyFinanceAccess'])->name('public.finance.verify');
Route::get('/program', [HomeController::class, 'programs'])->name('public.programs');
Route::get('/kalender-akademik', [AcademicCalendarController::class, 'index'])->name('public.academic-calendar');
Route::post('/kalender-akademik/verify', [AcademicCalendarController::class, 'verifyAccess'])->name('public.academic-calendar.verify');
Route::get('/kebijakan-privasi', [HomeController::class, 'privacyPolicy'])->name('public.privacy-policy');
Route::get('/syarat-dan-ketentuan', [HomeController::class, 'termsAndConditions'])->name('public.terms-and-conditions');

Route::middleware(['guest', 'prevent-back-history'])->group(function () {
    Route::get('/login', [AuthController::class, 'create'])->name('login');
    Route::post('/login', [AuthController::class, 'store']);
});

Route::middleware(['auth', 'prevent-back-history'])->group(function () {
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // Read-only routes (accessible by all authenticated users)
    Route::get('/programs', [ProgramController::class, 'index'])->name('programs.index');
    Route::get('/programs/{program}', [ProgramController::class, 'show'])->name('programs.show');
    Route::get('/meetings', [MeetingController::class, 'index'])->name('meetings.index');
    Route::get('/academic-calendar', [AdminAcademicYearController::class, 'index'])->name('academic-years.index');
    Route::get('/academic-calendar/{academicYear}', [AdminAcademicYearController::class, 'show'])->name('academic-years.show');

    // Korlas routes
    Route::middleware(['role:Superadmin|Korlas'])->prefix('korlas')->name('korlas.')->group(function () {
        Route::resource('students', StudentController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::get('collections', [CollectionController::class, 'index'])->name('collections.index');
        Route::put('collections/settings', [CollectionController::class, 'updateSettings'])->name('collections.settings');
    });

    // Superadmin | Sekretaris restricted routes
    Route::middleware(['role:Superadmin|Sekretaris'])->group(function () {
        Route::get('/activities', [ActivityLogController::class, 'index'])->name('activities.index');

        Route::post('/programs', [ProgramController::class, 'store'])->name('programs.store');
        Route::put('/programs/{program}', [ProgramController::class, 'update'])->name('programs.update');
        Route::delete('/programs/{program}', [ProgramController::class, 'destroy'])->name('programs.destroy');

        Route::post('/program-activities', [ProgramActivityController::class, 'store'])->name('program_activities.store');
        Route::put('/program-activities/{programActivity}', [ProgramActivityController::class, 'update'])->name('program_activities.update');
        Route::delete('/program-activities/{programActivity}', [ProgramActivityController::class, 'destroy'])->name('program_activities.destroy');

        Route::post('/meetings', [MeetingController::class, 'store'])->name('meetings.store');
        Route::put('/meetings/{meeting}', [MeetingController::class, 'update'])->name('meetings.update');
        Route::delete('/meetings/{meeting}', [MeetingController::class, 'destroy'])->name('meetings.destroy');

        Route::post('/academic-calendar', [AdminAcademicYearController::class, 'store'])->name('academic-years.store');
        Route::put('/academic-calendar/{academicYear}', [AdminAcademicYearController::class, 'update'])->name('academic-years.update');
        Route::delete('/academic-calendar/{academicYear}', [AdminAcademicYearController::class, 'destroy'])->name('academic-years.destroy');

        Route::post('/academic-calendar/{academicYear}/months', [AdminAcademicMonthController::class, 'store'])->name('academic-months.store');
        Route::get('/academic-calendar/months/{academicMonth}/edit', [AdminAcademicMonthController::class, 'edit'])->name('academic-months.edit');
        Route::put('/academic-calendar/months/{academicMonth}', [AdminAcademicMonthController::class, 'update'])->name('academic-months.update');
        Route::delete('/academic-calendar/months/{academicMonth}', [AdminAcademicMonthController::class, 'destroy'])->name('academic-months.destroy');

        Route::post('/documents', [DocumentController::class, 'store'])->name('documents.store');
        Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');

        Route::resource('banners', BannerController::class)->except(['show']);
    });

    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');

    Route::middleware(['role:Superadmin|Bendahara'])->group(function () {
        // Settings
        Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
        Route::post('/settings', [SettingController::class, 'store'])->name('settings.store');
    });
    Route::middleware(['role:Superadmin'])->group(function () {
        Route::resource('users', UserController::class)->except(['create', 'show', 'edit']);
        Route::resource('roles', RoleController::class)->only(['index', 'store', 'destroy']);

        // Admin Classroom Routes
        Route::resource('/admin/classrooms', ClassroomController::class)->except(['create', 'show', 'edit']);
    });
});

<?php

namespace App\Http\Controllers;

use App\Helpers\Alert;
use App\Models\Classroom;
use App\Models\Program;
use App\Models\ProgramActivity;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $today = now()->setTimezone('Asia/Jakarta')->format('Y-m-d');

        $upcomingSessions = ProgramActivity::with('program')
            ->where('activity_date', '>=', $today)
            ->where('status', '!=', 'cancelled')
            ->orderBy('activity_date', 'asc')
            ->orderBy('start_time', 'asc')
            ->limit(3)
            ->get();

        $heroProgram = null;
        if ($upcomingSessions->isNotEmpty()) {
            $heroProgram = Program::with('activities')->find($upcomingSessions->first()->program_id);
        }

        if (! $heroProgram) {
            $heroProgram = Program::with('activities')
                ->where('start_date', '>=', $today)
                ->orderBy('start_date', 'asc')
                ->first();
        }

        if (! $heroProgram) {
            $heroProgram = Program::with('activities')
                ->where('start_date', '<=', $today)
                ->where(function ($q) use ($today) {
                    $q->where('end_date', '>=', $today)
                        ->orWhereNull('end_date');
                })->first();
        }

        if (! $heroProgram) {
            $heroProgram = Program::with('activities')->orderBy('start_date', 'desc')->first();
        }

        $activeProgramsQuery = Program::with('activities')
            ->whereNotNull('start_date')
            ->where(function ($q) use ($today) {
                $q->where('end_date', '>=', $today)
                    ->orWhereNull('end_date');
            })
            ->orderBy('start_date', 'asc');

        if ($heroProgram) {
            $activeProgramsQuery->where('id', '!=', $heroProgram->id);
        }

        $activePrograms = $activeProgramsQuery->get();

        return Inertia::render('public/Home', [
            'heroProgram' => $heroProgram,
            'activePrograms' => $activePrograms,
            'upcomingSessions' => $upcomingSessions,
        ]);
    }

    public function organization()
    {
        return Inertia::render('public/Organization');
    }

    public function finance(Request $request)
    {
        if (! $request->session()->get('verified_parent')) {
            $classrooms = Classroom::orderBy('name', 'asc')->get();

            return Inertia::render('public/FinanceGate', [
                'classrooms' => $classrooms,
            ]);
        }

        // Get from settings.json first, fallback to .env
        $settingsPath = storage_path('app/settings.json');
        $settings = [];

        if (File::exists($settingsPath)) {
            $settings = json_decode(File::get($settingsPath), true) ?? [];
        }

        $sheetId = $settings['google_spreadsheet_id'] ?? env('GOOGLE_SPREADSHEET_ID');
        $sheetStatus = $settings['google_spreadsheet_status'] ?? 'hidden';
        $sheetUrl = $sheetId ? "https://docs.google.com/spreadsheets/d/{$sheetId}/edit" : null;

        $classroomSheetUrl = null;
        $classroomSheetStatus = 'hidden';
        $classroomName = null;
        if ($classroomId = $request->session()->get('verified_parent_classroom_id')) {
            $classroom = Classroom::find($classroomId);
            if ($classroom) {
                $classroomSheetUrl = $classroom->google_sheet_link;
                $classroomSheetStatus = $classroom->google_sheet_status;
                $classroomName = $classroom->name;
            }
        }

        return Inertia::render('public/Finance', [
            'sheetUrl' => $sheetUrl,
            'sheetStatus' => $sheetStatus,
            'classroomSheetUrl' => $classroomSheetUrl,
            'classroomSheetStatus' => $classroomSheetStatus,
            'classroomName' => $classroomName,
        ]);
    }

    public function verifyFinanceAccess(Request $request)
    {
        $request->validate([
            'student_name' => 'required|string|min:3',
            'classroom_id' => 'required|exists:classrooms,id',
            'agreed' => 'accepted',
        ], [
            'student_name.required' => 'Nama lengkap anak wajib diisi.',
            'student_name.min' => 'Nama anak harus terdiri dari minimal 3 huruf.',
            'classroom_id.required' => 'Kelas anak wajib dipilih.',
            'agreed.accepted' => 'Anda harus mencentang persetujuan syarat dan ketentuan terlebih dahulu.',
        ]);

        $classroomName = Classroom::where('id', $request->classroom_id)->value('name') ?? 'Unknown';

        $inputName = strtolower(trim($request->student_name));
        $inputName = preg_replace('/\s+/', ' ', $inputName);

        // Ambil kata pertama dari input untuk pencarian awal di database
        $firstWord = explode(' ', $inputName)[0];

        // Lakukan pre-filter di level database (MySQL) agar memori tidak penuh
        $potentialStudents = Student::where('is_active', true)
            ->where('classroom_id', $request->classroom_id)
            ->where('name', 'LIKE', "%{$firstWord}%")
            ->get();

        // Pengecekan ketat (regex spasi dan case-insensitive) di level PHP untuk sisa kandidat
        $matchedStudent = $potentialStudents->first(function ($student) use ($inputName) {
            $dbName = strtolower(trim(preg_replace('/\s+/', ' ', $student->name)));

            return $dbName === $inputName;
        });

        if ($matchedStudent) {
            $request->session()->put('verified_parent', true);
            $request->session()->put('verified_parent_classroom_id', $matchedStudent->classroom_id);
            Alert::success('Akses Diberikan', 'Selamat datang, Wali dari '.$matchedStudent->name);

            activity('finance_access')
                ->withProperties([
                    'input_name' => $request->student_name,
                    'classroom_id' => $request->classroom_id,
                    'classroom_name' => $classroomName,
                    'ip_address' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                    'status' => 'success',
                    'matched_student_id' => $matchedStudent->id,
                ])
                ->log('Successful access to finance dashboard');

            return redirect()->route('public.finance');
        }

        Alert::error('Akses Ditolak', 'Nama siswa tidak ditemukan. Pastikan ejaan sesuai dengan data sekolah.');

        activity('finance_access')
            ->withProperties([
                'input_name' => $request->student_name,
                'classroom_id' => $request->classroom_id,
                'classroom_name' => $classroomName,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'status' => 'failed',
            ])
            ->log('Failed access attempt to finance dashboard');

        return back();
    }

    public function programs()
    {
        $programs = Program::with([
            'activities' => fn ($q) => $q->orderBy('activity_date', 'asc'),
            'activities.documents',
            'documents' => fn ($q) => $q->whereNull('program_activity_id'),
        ])->orderBy('start_date', 'asc')->get();

        return Inertia::render('public/Programs', [
            'programs' => $programs,
        ]);
    }

    public function privacyPolicy()
    {
        return Inertia::render('public/PrivacyPolicy');
    }

    public function termsAndConditions()
    {
        return Inertia::render('public/TermsAndConditions');
    }
}

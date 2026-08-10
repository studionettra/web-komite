<?php

namespace App\Http\Controllers;

use App\Helpers\Alert;
use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicCalendarController extends Controller
{
    public function index(Request $request)
    {
        if (! $request->session()->get('verified_parent')) {
            $classrooms = Classroom::orderBy('name', 'asc')->get();

            return Inertia::render('public/AcademicCalendarGate', [
                'classrooms' => $classrooms,
            ]);
        }

        $query = AcademicYear::with([
            'months.activities' => function ($query) {
                $query->orderBy('start_day', 'asc');
            },
            'months.learningPrograms' => function ($query) {
                $query->orderBy('start_day', 'asc');
            },
        ]);

        if ($request->has('year_id')) {
            $year = $query->findOrFail($request->year_id);
        } else {
            $year = $query->where('is_active', true)->first();
            if (! $year) {
                $year = $query->latest()->first();
            }
        }

        $allYears = AcademicYear::orderBy('name', 'desc')->get();

        return Inertia::render('public/AcademicCalendar', [
            'academicYear' => $year,
            'allYears' => $allYears,
        ]);
    }

    public function verifyAccess(Request $request)
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

            activity('academic_access')
                ->withProperties([
                    'input_name' => $request->student_name,
                    'classroom_id' => $request->classroom_id,
                    'classroom_name' => $classroomName,
                    'ip_address' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                    'status' => 'success',
                    'matched_student_id' => $matchedStudent->id,
                ])
                ->log('Successful access to academic calendar');

            return redirect()->route('public.academic-calendar');
        }

        Alert::error('Akses Ditolak', 'Nama siswa tidak ditemukan. Pastikan ejaan sesuai dengan data sekolah.');

        activity('academic_access')
            ->withProperties([
                'input_name' => $request->student_name,
                'classroom_id' => $request->classroom_id,
                'classroom_name' => $classroomName,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'status' => 'failed',
            ])
            ->log('Failed access attempt to academic calendar');

        return back();
    }
}

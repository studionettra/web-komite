<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Meeting;
use App\Models\Program;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $role = $request->user()->roles->first()->name ?? 'Anggota Komite';

        $data = [
            'role' => $role,
        ];

        if ($role === 'Superadmin') {
            $data['metrics'] = [
                'programs' => Program::count(),
                'meetings' => Meeting::count(),
            ];
            $data['ongoing_programs'] = Program::where('status', 'ongoing')->orderBy('start_date', 'desc')->take(5)->get();
        } elseif ($role === 'Bendahara') {
            $data['metrics'] = [];
        } elseif ($role === 'Sekretaris') {
            $data['metrics'] = [
                'programs' => Program::count(),
                'meetings' => Meeting::count(),
                'documents' => Document::count(),
            ];
            $data['recent_meetings'] = Meeting::orderBy('date', 'desc')->take(5)->get();
            $data['upcoming_programs'] = Program::whereIn('status', ['planned', 'ongoing'])->orderBy('start_date', 'asc')->take(5)->get();
        } elseif ($role === 'Korlas') {
            $classroom = $request->user()->classrooms()->first();
            if ($classroom) {
                $data['classroom'] = $classroom;
                $data['students_count'] = Student::where('classroom_id', $classroom->id)->where('is_active', true)->count();
            } else {
                $data['classroom'] = null;
                $data['students_count'] = 0;
            }
        } else {
            // Anggota Komite
            $data['metrics'] = [];
            $data['active_programs'] = Program::where('status', 'ongoing')->orderBy('start_date', 'desc')->take(5)->get();
            $data['recent_meetings'] = Meeting::orderBy('date', 'desc')->take(3)->get();
        }

        return Inertia::render('Dashboard', $data);
    }
}

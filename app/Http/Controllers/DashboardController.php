<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Meeting;
use App\Models\Program;
use App\Models\Student;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $roles = $request->user()->roles->pluck('name')->toArray();
        $role = 'Anggota Komite';

        if (in_array('Superadmin', $roles)) {
            $role = 'Superadmin';
        } elseif (in_array('Bendahara', $roles)) {
            $role = 'Bendahara';
        } elseif (in_array('Sekretaris', $roles)) {
            $role = 'Sekretaris';
        } elseif (in_array('Humas', $roles)) {
            $role = 'Humas';
        } elseif (in_array('Korlas', $roles)) {
            $role = 'Korlas';
        }

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
        } elseif ($role === 'Humas') {
            $data['metrics'] = [
                'published_posts' => Post::where('is_published', true)->count(),
                'draft_posts' => Post::where('is_published', false)->count(),
            ];
            $data['recent_posts'] = Post::latest()->take(5)->get();
        } else {
            // Anggota Komite
            $data['metrics'] = [];
            $data['active_programs'] = Program::where('status', 'ongoing')->orderBy('start_date', 'desc')->take(5)->get();
            $data['recent_meetings'] = Meeting::orderBy('date', 'desc')->take(3)->get();
        }

        if (in_array($role, ['Superadmin', 'Humas'])) {
            try {
                $analytics = \Spatie\Analytics\Facades\Analytics::fetchTotalVisitorsAndPageViews(\Spatie\Analytics\Period::days(7));
                $data['analytics'] = [
                    'visitors' => $analytics->sum('activeUsers'),
                    'pageViews' => $analytics->sum('screenPageViews'),
                    'chart' => $analytics->map(function ($item) {
                        return [
                            'date' => $item['date']->format('d M'),
                            'visitors' => (int) $item['activeUsers'],
                            'pageViews' => (int) $item['screenPageViews']
                        ];
                    })->values()->toArray()
                ];
            } catch (\Exception $e) {
                $message = $e->getMessage();
                $friendlyMessage = 'Gagal memuat data analitik. Pastikan Google Analytics API sudah diaktifkan.';
                
                if (str_contains($message, 'SERVICE_DISABLED') || str_contains($message, 'not been used')) {
                    $friendlyMessage = 'Google Analytics belum dikonfigurasi atau belum diaktifkan di Google Cloud Project Anda.';
                } else if (str_contains($message, 'credentials')) {
                    $friendlyMessage = 'Kredensial Google Analytics tidak valid atau tidak ditemukan.';
                }

                $data['analytics'] = [
                    'error' => true,
                    'message' => $friendlyMessage
                ];
            }
        }

        return Inertia::render('Dashboard', $data);
    }
}

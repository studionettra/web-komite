<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class ActivityLogController extends Controller
{
    public function index()
    {
        $activities = Activity::with('causer')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('admin/Activities', [
            'activities' => $activities,
        ]);
    }
}

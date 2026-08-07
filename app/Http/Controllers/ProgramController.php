<?php

namespace App\Http\Controllers;

use App\Helpers\Alert;
use App\Models\Program;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index()
    {
        $allPrograms = Program::with(['users', 'activities'])->get()->sortBy(function ($program) {
            $now = now()->startOfDay();
            
            $startDiff = $program->start_date 
                ? abs(now()->diffInDays(\Carbon\Carbon::parse($program->start_date)->startOfDay())) 
                : 999999;
            
            $activityDiff = 999999;
            if ($program->activities->isNotEmpty()) {
                $activityDiff = $program->activities->min(function ($activity) use ($now) {
                    return abs($now->diffInDays(\Carbon\Carbon::parse($activity->activity_date)->startOfDay()));
                });
            }
            
            return min($startDiff, $activityDiff);
        })->values();

        $page = request()->get('page', 1);
        $perPage = 10;
        $programs = new \Illuminate\Pagination\LengthAwarePaginator(
            $allPrograms->forPage($page, $perPage)->values(),
            $allPrograms->count(),
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        $members = User::select('id', 'name')->get();

        return Inertia::render('programs/Index', [
            'programs' => $programs,
            'members' => $members,
        ]);
    }

    public function show(Program $program)
    {
        $program->load([
            'documents' => fn($q) => $q->whereNull('program_activity_id'),
            'users',
            'activities' => fn($q) => $q->orderBy('activity_date', 'desc'),
            'activities.documents',
        ]);

        return Inertia::render('programs/Show', [
            'program' => $program,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'frequency' => 'required|in:monthly,incidental',
            'status' => 'required|in:planned,ongoing,completed',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|max:5120',
            'assigned_users' => 'nullable|array',
            'assigned_users.*' => 'exists:users,id',
        ]);

        $uploadedImages = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $uploadedImages[] = $image->store('programs', 'public');
            }
        }
        $validated['images'] = $uploadedImages;

        $program = Program::create($validated);

        if ($request->has('assigned_users')) {
            $program->users()->sync($request->assigned_users);
        }
        Alert::success('Berhasil', 'Program kerja berhasil ditambahkan.');

        return back();
    }

    public function update(Request $request, Program $program)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'frequency' => 'required|in:monthly,incidental',
            'status' => 'required|in:planned,ongoing,completed',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|max:5120',
            'existing_images' => 'nullable|array',
            'assigned_users' => 'nullable|array',
            'assigned_users.*' => 'exists:users,id',
        ]);

        $existingImages = $request->input('existing_images', []);
        
        // Remove old images not in existing_images
        $oldImages = $program->images ?? [];
        $imagesToDelete = array_diff($oldImages, $existingImages);
        foreach ($imagesToDelete as $img) {
            if (Storage::disk('public')->exists($img)) {
                Storage::disk('public')->delete($img);
            }
        }

        $finalImages = $existingImages;

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $finalImages[] = $image->store('programs', 'public');
            }
        }
        
        $validated['images'] = $finalImages;

        $program->update($validated);

        if ($request->has('assigned_users')) {
            $program->users()->sync($request->assigned_users);
        }
        Alert::success('Berhasil', 'Program kerja diperbarui.');

        return back();
    }

    public function destroy(Program $program)
    {

        if ($program->documents()->exists()) {
            Alert::error('Gagal', 'Program tidak dapat dihapus karena masih memiliki lampiran dokumen/laporan. Hapus laporan terlebih dahulu.');

            return back();
        }

        if ($program->activities()->exists()) {
            Alert::error('Gagal', 'Program tidak dapat dihapus karena masih memiliki sesi program. Hapus sesi program terlebih dahulu.');

            return back();
        }

        $images = $program->images ?? [];
        foreach ($images as $img) {
            if (Storage::disk('public')->exists($img)) {
                Storage::disk('public')->delete($img);
            }
        }

        $program->delete();
        Alert::deleteSuccess('Berhasil', 'Program kerja dihapus.');

        return back();
    }
}

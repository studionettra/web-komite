<?php

namespace App\Http\Controllers;

use App\Helpers\Alert;
use App\Models\Program;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index()
    {
        $programs = Program::with(['users', 'activities'])
            ->selectRaw('programs.*, LEAST(
                COALESCE(ABS(DATEDIFF(programs.start_date, CURDATE())), 999999),
                COALESCE((SELECT MIN(ABS(DATEDIFF(activity_date, CURDATE()))) 
                          FROM program_activities 
                          WHERE program_activities.program_id = programs.id), 999999)
            ) as days_diff')
            ->orderBy('days_diff', 'asc')
            ->paginate(10)
            ->withQueryString();

        $members = User::select('id', 'name')->get();

        return Inertia::render('programs/Index', [
            'programs' => $programs,
            'members' => $members,
        ]);
    }

    public function show(Program $program)
    {
        $program->load([
            'documents' => fn ($q) => $q->whereNull('program_activity_id'),
            'users',
            'activities' => fn ($q) => $q->orderBy('activity_date', 'desc'),
            'activities.documents',
        ]);

        return Inertia::render('programs/Show', [
            'program' => $program,
        ]);
    }

    public function store(Request $request): RedirectResponse
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

    public function update(Request $request, Program $program): RedirectResponse
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

    public function destroy(Program $program): RedirectResponse
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

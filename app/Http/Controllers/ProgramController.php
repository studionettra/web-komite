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
        $programs = Program::with(['users', 'activities'])->orderBy('created_at', 'desc')->paginate(10);
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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'frequency' => 'required|in:monthly,incidental',
            'status' => 'required|in:planned,ongoing,completed',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|image|max:5120',
            'assigned_users' => 'nullable|array',
            'assigned_users.*' => 'exists:users,id',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('programs', 'public');
        }

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
            'image' => 'nullable|image|max:5120',
            'assigned_users' => 'nullable|array',
            'assigned_users.*' => 'exists:users,id',
        ]);

        if ($request->hasFile('image')) {
            if ($program->image && Storage::disk('public')->exists($program->image)) {
                Storage::disk('public')->delete($program->image);
            }
            $validated['image'] = $request->file('image')->store('programs', 'public');
        }

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

        if ($program->image && Storage::disk('public')->exists($program->image)) {
            Storage::disk('public')->delete($program->image);
        }

        $program->delete();
        Alert::deleteSuccess('Berhasil', 'Program kerja dihapus.');

        return back();
    }
}

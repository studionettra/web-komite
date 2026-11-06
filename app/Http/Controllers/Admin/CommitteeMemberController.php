<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Alert;
use App\Http\Controllers\Controller;
use App\Models\CommitteeMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CommitteeMemberController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            function ($request, $next) {
                $firstSuperadmin = User::role('Superadmin')->orderBy('id', 'asc')->first();
                if ($firstSuperadmin && auth()->id() !== $firstSuperadmin->id) {
                    abort(403, 'Hanya Superadmin Utama yang dapat mengakses halaman ini.');
                }

                return $next($request);
            },
        ];
    }

    public function index()
    {
        $members = CommitteeMember::orderBy('division_order', 'asc')
            ->orderBy('order', 'asc')
            ->orderBy('created_at', 'asc')
            ->get();

        return Inertia::render('admin/committee/Index', [
            'members' => $members,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'division' => 'required|string|max:255',
            'division_order' => 'nullable|integer|min:0',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('committee', 'public');
        }

        CommitteeMember::create([
            'name' => $validated['name'],
            'position' => $validated['position'],
            'division' => $validated['division'],
            'division_order' => $validated['division_order'] ?? 0,
            'order' => $validated['order'] ?? 0,
            'is_active' => $request->boolean('is_active', true),
            'photo_path' => $photoPath,
        ]);

        Alert::success('Berhasil', 'Pengurus berhasil ditambahkan');

        return redirect()->back()->with('success', 'Pengurus berhasil ditambahkan');
    }

    public function update(Request $request, CommitteeMember $committeeMember)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'division' => 'required|string|max:255',
            'division_order' => 'nullable|integer|min:0',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = [
            'name' => $validated['name'],
            'position' => $validated['position'],
            'division' => $validated['division'],
            'division_order' => $validated['division_order'] ?? 0,
            'order' => $validated['order'] ?? 0,
            'is_active' => $request->boolean('is_active', true),
        ];

        if ($request->hasFile('photo')) {
            if ($committeeMember->photo_path && Storage::disk('public')->exists($committeeMember->photo_path)) {
                Storage::disk('public')->delete($committeeMember->photo_path);
            }
            $data['photo_path'] = $request->file('photo')->store('committee', 'public');
        }

        $committeeMember->update($data);

        Alert::success('Berhasil', 'Data pengurus berhasil diperbarui');

        return redirect()->back()->with('success', 'Data pengurus berhasil diperbarui');
    }

    public function destroy(CommitteeMember $committeeMember)
    {
        if ($committeeMember->photo_path && Storage::disk('public')->exists($committeeMember->photo_path)) {
            Storage::disk('public')->delete($committeeMember->photo_path);
        }

        $committeeMember->delete();

        Alert::success('Berhasil', 'Pengurus berhasil dihapus');

        return redirect()->back()->with('success', 'Pengurus berhasil dihapus');
    }
}

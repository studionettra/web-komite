<?php

namespace App\Http\Controllers\Korlas;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectionController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Asumsi seorang Korlas biasanya memegang 1 kelas utama
        // Jika memegang banyak, kita ambil yang pertama untuk saat ini
        $classroom = $user->classrooms()->first();

        $collections = [];
        $sheetUrl = null;
        $sheetStatus = 'hidden';

        if ($classroom) {
            $sheetUrl = $classroom->google_sheet_link;
            $sheetStatus = $classroom->google_sheet_status;
        }

        return Inertia::render('korlas/collections/Index', [
            'classroom' => $classroom,
            'sheetUrl' => $sheetUrl,
            'sheetStatus' => $sheetStatus,
        ]);
    }

    public function updateSettings(Request $request)
    {
        $user = auth()->user();
        $classroom = $user->classrooms()->first();

        if (! $classroom) {
            return redirect()->back()->with('error', 'Anda belum ditugaskan ke kelas manapun.');
        }

        $request->validate([
            'google_sheet_status' => 'required|in:active,preparing,hidden',
            'google_sheet_link' => 'nullable|url|max:255|required_if:google_sheet_status,active',
        ]);

        $classroom->update([
            'google_sheet_status' => $request->google_sheet_status,
            'google_sheet_link' => $request->google_sheet_link,
        ]);

        return redirect()->back()->with('success', 'Pengaturan laporan kas kelas berhasil diperbarui.');
    }
}

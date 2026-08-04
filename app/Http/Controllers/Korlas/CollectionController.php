<?php

namespace App\Http\Controllers\Korlas;

use App\Http\Controllers\Controller;
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

        if ($classroom && $classroom->google_sheet_link) {
            $sheetUrl = $classroom->google_sheet_link;
        }

        return Inertia::render('korlas/collections/Index', [
            'classroom' => $classroom,
            'sheetUrl' => $sheetUrl,
        ]);
    }
}

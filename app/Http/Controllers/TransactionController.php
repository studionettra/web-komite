<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        // Get from settings.json first, fallback to .env
        $settingsPath = storage_path('app/settings.json');
        $settings = [];

        if (File::exists($settingsPath)) {
            $settings = json_decode(File::get($settingsPath), true) ?? [];
        }

        $sheetId = $settings['google_spreadsheet_id'] ?? config('services.google.spreadsheet_id');
        $sheetStatus = $settings['google_spreadsheet_status'] ?? 'hidden';
        $sheetUrl = $sheetId ? "https://docs.google.com/spreadsheets/d/{$sheetId}/edit" : null;

        return Inertia::render('transactions/Index', [
            'sheetUrl' => $sheetUrl,
            'sheetStatus' => $sheetStatus,
        ]);
    }
}

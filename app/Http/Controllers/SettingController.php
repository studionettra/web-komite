<?php

namespace App\Http\Controllers;

use App\Helpers\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Tampilkan halaman Pengaturan.
     */
    public function index()
    {
        $settingsPath = storage_path('app/settings.json');
        $settings = [];

        if (File::exists($settingsPath)) {
            $settings = json_decode(File::get($settingsPath), true) ?? [];
        }

        // Tampilkan Spreadsheet ID atau URL yang tersimpan
        $googleSpreadsheetId = $settings['google_spreadsheet_id'] ?? env('GOOGLE_SPREADSHEET_ID', '');
        $googleSpreadsheetStatus = $settings['google_spreadsheet_status'] ?? 'hidden';

        // Buat format URL penuh agar mudah dipahami user
        $googleSpreadsheetUrl = $googleSpreadsheetId ? "https://docs.google.com/spreadsheets/d/{$googleSpreadsheetId}/edit" : '';

        return Inertia::render('admin/Settings', [
            'settings' => [
                'google_spreadsheet_url' => $googleSpreadsheetUrl,
                'google_spreadsheet_status' => $googleSpreadsheetStatus,
            ],
        ]);
    }

    /**
     * Simpan pengaturan.
     */
    public function store(Request $request)
    {
        $request->validate([
            'google_spreadsheet_status' => 'required|in:active,preparing,hidden',
            'google_spreadsheet_url' => 'nullable|url|required_if:google_spreadsheet_status,active',
        ], [
            'google_spreadsheet_status.required' => 'Status pelaporan wajib dipilih.',
            'google_spreadsheet_url.required_if' => 'URL Google Sheet wajib diisi jika status Tampilkan Laporan.',
            'google_spreadsheet_url.url' => 'Format URL tidak valid.',
        ]);

        $url = $request->google_spreadsheet_url;
        $spreadsheetId = null;

        if ($url) {
            $spreadsheetId = $this->extractSpreadsheetId($url);
            if (! $spreadsheetId) {
                return back()->withErrors(['google_spreadsheet_url' => 'URL Google Sheet tidak valid. Pastikan Anda mengkopi link langsung dari Google Sheets.']);
            }
        }

        $settingsPath = storage_path('app/settings.json');
        $settings = [];

        if (File::exists($settingsPath)) {
            $settings = json_decode(File::get($settingsPath), true) ?? [];
        }

        $settings['google_spreadsheet_id'] = $spreadsheetId;
        $settings['google_spreadsheet_status'] = $request->google_spreadsheet_status;

        File::put($settingsPath, json_encode($settings, JSON_PRETTY_PRINT));

        Alert::success('Berhasil', 'Pengaturan berhasil disimpan.');

        return back();
    }

    /**
     * Ekstrak ID dari URL Google Spreadsheet
     */
    private function extractSpreadsheetId($url): ?string
    {
        // Contoh URL: https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
        $pattern = '/\/d\/([a-zA-Z0-9-_]+)/';
        if (preg_match($pattern, $url, $matches)) {
            return $matches[1];
        }

        return null;
    }
}

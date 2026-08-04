<?php

namespace App\Http\Controllers;

use App\Services\GoogleSheetService;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        // For Bendahara, we use a central spreadsheet ID from .env
        $sheetId = env('GOOGLE_SPREADSHEET_ID');
        $sheetUrl = $sheetId ? "https://docs.google.com/spreadsheets/d/{$sheetId}/edit" : null;

        $transactions = GoogleSheetService::fetchPublicSheetData($sheetUrl);

        return Inertia::render('transactions/Index', [
            'transactions' => $transactions,
            'sheetUrl' => $sheetUrl,
        ]);
    }
}

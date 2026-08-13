<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GoogleSheetService
{
    /**
     * Fetch data from a public Google Sheet URL.
     * The sheet must be set to "Anyone with the link can view".
     */
    public static function fetchPublicSheetData(?string $sheetUrl): array
    {
        if (empty($sheetUrl)) {
            return [];
        }

        $sheetId = self::extractSheetId($sheetUrl);

        if (! $sheetId) {
            Log::warning("Invalid Google Sheet URL: {$sheetUrl}");

            return [];
        }

        try {
            // Use the export endpoint to get CSV data
            $csvUrl = "https://docs.google.com/spreadsheets/d/{$sheetId}/export?format=csv";
            $response = Http::get($csvUrl);

            if (! $response->successful()) {
                Log::error("Failed to fetch Google Sheet data from {$csvUrl}. Status: ".$response->status());

                return [];
            }

            return self::parseCsv($response->body());
        } catch (\Exception $e) {
            Log::error('Exception when fetching Google Sheet: '.$e->getMessage());

            return [];
        }
    }

    /**
     * Extract the Sheet ID from a standard Google Sheet URL.
     */
    private static function extractSheetId(string $url): ?string
    {
        // Example URL: https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
        if (preg_match('/spreadsheets\/d\/([a-zA-Z0-9-_]+)/', $url, $matches)) {
            return $matches[1];
        }

        return null;
    }

    /**
     * Parse CSV string into an array of associative arrays.
     */
    private static function parseCsv(string $csvContent): array
    {
        $lines = explode("\n", $csvContent);
        $data = [];
        $headers = [];

        foreach ($lines as $index => $line) {
            $line = trim($line);
            if (empty($line)) {
                continue;
            }

            $row = str_getcsv($line);

            if ($index === 0) {
                $headers = $row;
            } else {
                $item = [];
                foreach ($headers as $colIndex => $headerName) {
                    // Use the header name as key, fallback to 'col_X' if empty
                    $key = ! empty($headerName) ? trim($headerName) : "col_{$colIndex}";
                    $item[$key] = $row[$colIndex] ?? '';
                }
                $data[] = $item;
            }
        }

        return $data;
    }
}

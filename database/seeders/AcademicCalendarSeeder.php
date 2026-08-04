<?php

namespace Database\Seeders;

use App\Models\AcademicActivity;
use App\Models\AcademicLearningProgram;
use App\Models\AcademicMonth;
use App\Models\AcademicYear;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AcademicCalendarSeeder extends Seeder
{
    public function run()
    {
        // First, clear old data
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        AcademicLearningProgram::truncate();
        AcademicActivity::truncate();
        AcademicMonth::truncate();
        AcademicYear::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Create the academic year
        $academicYear = AcademicYear::create([
            'name' => '2026/2027',
            'is_active' => true,
        ]);

        $filePath = base_path('docs/kalender-pendidikan-2026-2027.md');
        $content = file_get_contents($filePath);

        // Regex to extract each month section
        // A month section starts with `## MONTH YEAR` and ends right before the next `## MONTH YEAR` or `## Ringkasan`
        preg_match_all('/## ([A-Z]+ \d{4})\n\n\*\*HE: (.*?)\*\*\n\n### Kegiatan\n(.*?)(?=\n### Program Pembelajaran)/s', $content, $kegiatanMatches, PREG_SET_ORDER);
        preg_match_all('/### Program Pembelajaran\n(.*?)(?=\n---|\n## )/s', $content, $programMatches, PREG_SET_ORDER);

        $monthOrder = 1;

        foreach ($kegiatanMatches as $index => $match) {
            $monthYear = $match[1]; // e.g. "JULI 2026"
            $he = $match[2]; // e.g. "15 hari"
            $kegiatanTable = $match[3];

            $parts = explode(' ', $monthYear);
            $monthName = Str::title($parts[0]);
            $year = intval($parts[1]);

            // Create month
            $month = AcademicMonth::create([
                'academic_year_id' => $academicYear->id,
                'name' => $monthName,
                'year' => $year,
                'effective_days' => $he,
                'order_index' => $monthOrder++,
            ]);

            // Parse Kegiatan table
            $kegiatanLines = explode("\n", trim($kegiatanTable));
            foreach ($kegiatanLines as $line) {
                if (empty($line) || str_starts_with($line, '| Tanggal |') || str_starts_with($line, '|---|')) {
                    continue;
                }
                $cols = explode('|', $line);
                if (count($cols) >= 4) {
                    $tanggal = trim($cols[1]);
                    $kegiatan = trim($cols[2]);
                    $keterangan = trim($cols[3]);

                    AcademicActivity::create([
                        'academic_month_id' => $month->id,
                        'date_string' => $tanggal,
                        'name' => $kegiatan,
                        'description' => $keterangan,
                        'is_committee_program' => false,
                    ]);
                }
            }

            // Parse Program Pembelajaran table
            if (isset($programMatches[$index])) {
                $programTable = $programMatches[$index][1];
                $programLines = explode("\n", trim($programTable));
                foreach ($programLines as $line) {
                    if (empty($line) || str_starts_with($line, '| Minggu |') || str_starts_with($line, '|---|')) {
                        continue;
                    }
                    $cols = explode('|', $line);
                    if (count($cols) >= 6) {
                        $minggu = trim($cols[1]);
                        $topik = trim($cols[2]);
                        $tanggal = trim($cols[3]);
                        $subTopik = trim($cols[4]);
                        $keterangan = trim($cols[5]);

                        AcademicLearningProgram::create([
                            'academic_month_id' => $month->id,
                            'week_string' => $minggu,
                            'topic' => $topik,
                            'date_string' => $tanggal,
                            'sub_topic' => $subTopik,
                            'description' => $keterangan,
                        ]);
                    }
                }
            }
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = base_path('docs/student_data.md');
        if (! File::exists($file)) {
            $this->command->warn('student_data.md not found.');

            return;
        }

        $content = File::get($file);
        $lines = explode("\n", $content);

        $currentClass = null;

        foreach ($lines as $line) {
            $line = trim($line);

            if (empty($line) || str_starts_with($line, '---')) {
                continue;
            }

            if (preg_match('/\*\*Kelas\s+(.+)\*\*/i', $line, $matches)) {
                $className = trim($matches[1]);
                $currentClass = Classroom::firstOrCreate(
                    ['name' => $className],
                    ['korlas_id' => null]
                );
            } else {
                if ($currentClass) {
                    Student::firstOrCreate([
                        'classroom_id' => $currentClass->id,
                        'name' => $line,
                    ], [
                        'parent_name' => null,
                        'is_active' => true,
                    ]);
                }
            }
        }
    }
}

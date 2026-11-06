<?php

namespace Database\Seeders;

use App\Models\CommitteeMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class CommitteeMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $storageDir = storage_path('app/public/committee');
        if (! File::isDirectory($storageDir)) {
            File::makeDirectory($storageDir, 0755, true);
        }

        $sourceDir = resource_path('images/komite');

        $members = [
            // 1. Kepala Sekolah
            [
                'name' => 'Ibu Rifda, S.Pd.',
                'position' => 'Kepala Sekolah',
                'division' => 'Kepala Sekolah',
                'division_order' => 1,
                'order' => 1,
                'source_file' => 'kepala-sekolah-Ibu-Rifdah, S.Pd..jpg',
                'target_file' => 'kepala-sekolah-ibu-rifda.jpg',
            ],
            // 2. Pengurus Harian
            [
                'name' => 'Eka Putri Rahayu (Una - BL2)',
                'position' => 'Ketua',
                'division' => 'Pengurus Harian',
                'division_order' => 2,
                'order' => 1,
                'source_file' => 'ketua-komite-mama-una.jpeg',
                'target_file' => 'ketua-komite-mama-una.jpeg',
            ],
            [
                'name' => 'Noval Aysha Pratiwi (Ghani - BL1)',
                'position' => 'Wakil Ketua',
                'division' => 'Pengurus Harian',
                'division_order' => 2,
                'order' => 2,
                'source_file' => 'wakil-ketua-mama-ghani.jpeg',
                'target_file' => 'wakil-ketua-mama-ghani.jpeg',
            ],
            [
                'name' => 'Denissa Indriana (Daania - KBIT)',
                'position' => 'Sekretaris',
                'division' => 'Pengurus Harian',
                'division_order' => 2,
                'order' => 3,
                'source_file' => 'sekretaris-mama-daania.jpeg',
                'target_file' => 'sekretaris-mama-daania.jpeg',
            ],
            [
                'name' => 'Karima Salsabila (Sarah - B)',
                'position' => 'Bendahara',
                'division' => 'Pengurus Harian',
                'division_order' => 2,
                'order' => 4,
                'source_file' => 'bendahara-mama-sarah.jpeg',
                'target_file' => 'bendahara-mama-sarah.jpeg',
            ],
            // 3. Bidang Media Sosial
            [
                'name' => 'Novita Diah Lestari (Athar - KBIT)',
                'position' => 'Ketua',
                'division' => 'Bidang Media Sosial',
                'division_order' => 3,
                'order' => 1,
                'source_file' => 'ketua-sosmed-mama-athar.jpeg',
                'target_file' => 'ketua-sosmed-mama-athar.jpeg',
            ],
            [
                'name' => 'Widiya Juliana (Shanum - BL1)',
                'position' => 'Anggota',
                'division' => 'Bidang Media Sosial',
                'division_order' => 3,
                'order' => 2,
                'source_file' => 'angota-sosmed-mama-shanum.jpeg',
                'target_file' => 'angota-sosmed-mama-shanum.jpeg',
            ],
            [
                'name' => 'Rosmanih (Baarik - B)',
                'position' => 'Anggota',
                'division' => 'Bidang Media Sosial',
                'division_order' => 3,
                'order' => 3,
                'source_file' => 'anggota-sosmed-mama-baarik.jpeg',
                'target_file' => 'anggota-sosmed-mama-baarik.jpeg',
            ],
            // 4. Bidang Konsumsi
            [
                'name' => 'Rahmawati (Razka - BL2)',
                'position' => 'Ketua',
                'division' => 'Bidang Konsumsi',
                'division_order' => 4,
                'order' => 1,
                'source_file' => 'ketua-konsumsi-mama-razka.jpeg',
                'target_file' => 'ketua-konsumsi-mama-razka.jpeg',
            ],
            [
                'name' => 'Tuti Alawiyah (Ryu - A1)',
                'position' => 'Anggota',
                'division' => 'Bidang Konsumsi',
                'division_order' => 4,
                'order' => 2,
                'source_file' => 'anggota-konsumsi-mama-ryu.jpeg',
                'target_file' => 'anggota-konsumsi-mama-ryu.jpeg',
            ],
            [
                'name' => 'Nabila Rivmi (Rayya - A1)',
                'position' => 'Anggota',
                'division' => 'Bidang Konsumsi',
                'division_order' => 4,
                'order' => 3,
                'source_file' => 'anggota-konsumsi-mama-rayya.jpeg',
                'target_file' => 'anggota-konsumsi-mama-rayya.jpeg',
            ],
            // 5. Bidang Humas
            [
                'name' => 'Nurlaila Zahra (Fath - A2)',
                'position' => 'Ketua',
                'division' => 'Bidang Humas',
                'division_order' => 5,
                'order' => 1,
                'source_file' => 'anggota-humas-mama-fath.jpeg',
                'target_file' => 'anggota-humas-mama-fath.jpeg',
            ],
            [
                'name' => 'Kunairoh (Thariq - A2)',
                'position' => 'Anggota',
                'division' => 'Bidang Humas',
                'division_order' => 5,
                'order' => 2,
                'source_file' => 'anggota-humas-mama-thariq.jpeg',
                'target_file' => 'anggota-humas-mama-thariq.jpeg',
            ],
        ];

        foreach ($members as $item) {
            $photoPath = null;
            $sourcePath = $sourceDir.DIRECTORY_SEPARATOR.$item['source_file'];

            if (File::exists($sourcePath)) {
                $targetRelative = 'committee/'.$item['target_file'];
                File::copy($sourcePath, storage_path('app/public/'.$targetRelative));
                $photoPath = $targetRelative;
            }

            CommitteeMember::updateOrCreate(
                [
                    'name' => $item['name'],
                    'division' => $item['division'],
                ],
                [
                    'position' => $item['position'],
                    'division_order' => $item['division_order'],
                    'order' => $item['order'],
                    'photo_path' => $photoPath,
                    'is_active' => true,
                ]
            );
        }
    }
}

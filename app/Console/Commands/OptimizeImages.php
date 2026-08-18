<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class OptimizeImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:optimize-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Optimize existing images in storage to improve LCP';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting image optimization...');

        $manager = new ImageManager(new Driver);
        $directories = ['banners', 'programs', 'posts']; // Directories inside storage/app/public

        $totalOptimized = 0;

        foreach ($directories as $dir) {
            $this->info("Scanning directory: public/$dir");

            if (! Storage::disk('public')->exists($dir)) {
                $this->warn("Directory public/$dir does not exist, skipping.");

                continue;
            }

            $files = Storage::disk('public')->files($dir);

            foreach ($files as $file) {
                // Only process common image formats, skip if already webp or small
                if (! preg_match('/\.(jpg|jpeg|png)$/i', $file)) {
                    continue;
                }

                $absolutePath = Storage::disk('public')->path($file);

                // Skip if file is less than 500KB and maybe we still want to convert to webp, but let's do all
                $size = filesize($absolutePath);

                try {
                    $this->line("Optimizing: $file (".round($size / 1024, 2).' KB)');

                    $image = $manager->decodePath($absolutePath);

                    // Scale down if image is larger than 1920px width
                    if ($image->width() > 1920) {
                        $image->scale(width: 1920);
                    }

                    // Convert to WebP and save
                    $newFile = preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $file);
                    $newAbsolutePath = Storage::disk('public')->path($newFile);

                    // Save as WebP with 80% quality
                    $image->save($newAbsolutePath, 80);

                    // If we created a new file with different extension, let's keep the original for now
                    // or delete it? We should probably keep it and update database, OR we just overwrite the original format but compressed?
                    // Let's just overwrite the original image with optimized JPEG/PNG for backward compatibility without changing DB
                    // Then the user doesn't need to change DB records!

                    $extension = strtolower(pathinfo($absolutePath, PATHINFO_EXTENSION));

                    $image->save($absolutePath, 80);

                    // We keep the WebP file so frontend can use it
                    $newSize = filesize($absolutePath);
                    $this->info(' -> Done: '.round($newSize / 1024, 2).' KB (Saved '.round(($size - $newSize) / 1024, 2).' KB)');

                    $totalOptimized++;
                } catch (\Exception $e) {
                    $this->error("Failed to optimize $file: ".$e->getMessage());
                }
            }
        }

        $this->info("Finished! Optimized $totalOptimized images.");
    }
}

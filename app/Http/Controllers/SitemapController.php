<?php

namespace App\Http\Controllers;

use App\Models\Post;

class SitemapController extends Controller
{
    public function index(): \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
    {
        $baseUrl = config('app.url');

        // Static routes
        $urls = [
            '/',
            '/pengurus',
            '/program',
            '/kabar',
            '/kebijakan-privasi',
            '/syarat-dan-ketentuan',
        ];

        // Dynamic posts routes
        $posts = Post::where('is_published', true)->get();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        foreach ($urls as $url) {
            $xml .= '<url>';
            $xml .= '<loc>'.$baseUrl.$url.'</loc>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>0.8</priority>';
            $xml .= '</url>';
        }

        foreach ($posts as $post) {
            $xml .= '<url>';
            $xml .= '<loc>'.$baseUrl.'/kabar/'.$post->slug.'</loc>';
            $xml .= '<lastmod>'.$post->updated_at->toAtomString().'</lastmod>';
            $xml .= '<changefreq>monthly</changefreq>';
            $xml .= '<priority>0.9</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}

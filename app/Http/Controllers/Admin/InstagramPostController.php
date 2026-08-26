<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Alert;
use App\Http\Controllers\Controller;
use App\Models\InstagramPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class InstagramPostController extends Controller
{
    public function index()
    {
        $posts = InstagramPost::orderBy('order', 'asc')->orderBy('created_at', 'desc')->get();

        return Inertia::render('admin/instagram/Index', [
            'posts' => $posts,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'url' => 'required|url|max:255',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        $data = $request->only(['url', 'is_active', 'order']);
        $data['is_active'] = $request->input('is_active', true);
        $data['order'] = $request->input('order', 0);

        InstagramPost::create($data);

        Cache::forget('home.instagram_posts');

        Alert::success('Berhasil', 'Tautan Instagram berhasil ditambahkan');

        return redirect()->back();
    }

    public function update(Request $request, InstagramPost $instagram)
    {
        $request->validate([
            'url' => 'required|url|max:255',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        $data = $request->only(['url', 'is_active', 'order']);
        
        $instagram->update($data);

        Cache::forget('home.instagram_posts');

        Alert::success('Berhasil', 'Tautan Instagram berhasil diperbarui');

        return redirect()->back();
    }

    public function destroy(InstagramPost $instagram)
    {
        $instagram->delete();

        Cache::forget('home.instagram_posts');

        Alert::success('Berhasil', 'Tautan Instagram berhasil dihapus');

        return redirect()->back();
    }
}

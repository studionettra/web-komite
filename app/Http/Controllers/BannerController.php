<?php

namespace App\Http\Controllers;

use App\Helpers\Alert;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function index()
    {
        $banners = Banner::orderBy('order', 'asc')->orderBy('created_at', 'desc')->get();

        return Inertia::render('admin/banners/Index', [
            'banners' => $banners,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/banners/Form');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        $data = $request->except('image');
        $data['is_active'] = $request->input('is_active', true);
        $data['order'] = $request->input('order', 0);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('banners', 'public');
        }

        Banner::create($data);

        Alert::success('Berhasil', 'Banner berhasil ditambahkan');

        return redirect()->route('banners.index');
    }

    public function edit(Banner $banner)
    {
        return Inertia::render('admin/banners/Form', [
            'banner' => $banner,
        ]);
    }

    public function update(Request $request, Banner $banner)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        $data = $request->except('image');
        $data['is_active'] = $request->input('is_active', true);
        $data['order'] = $request->input('order', 0);

        if ($request->hasFile('image')) {
            if ($banner->image) {
                Storage::disk('public')->delete($banner->image);
            }
            $data['image'] = $request->file('image')->store('banners', 'public');
        }

        $banner->update($data);

        Alert::success('Berhasil', 'Banner berhasil diperbarui');

        return redirect()->route('banners.index');
    }

    public function destroy(Banner $banner)
    {
        if ($banner->image) {
            Storage::disk('public')->delete($banner->image);
        }

        $banner->delete();

        Alert::success('Berhasil', 'Banner berhasil dihapus');

        return redirect()->route('banners.index');
    }
}

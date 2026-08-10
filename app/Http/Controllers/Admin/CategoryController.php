<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('posts')->orderBy('name', 'asc')->get();

        return Inertia::render('admin/categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'color' => 'nullable|string|max:50',
        ]);

        Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'color' => $request->color,
        ]);

        return redirect()->back()->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,'.$category->id,
            'color' => 'nullable|string|max:50',
        ]);

        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'color' => $request->color,
        ]);

        return redirect()->back()->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(Category $category)
    {
        if ($category->posts()->count() > 0) {
            return redirect()->back()->with('error', 'Kategori tidak dapat dihapus karena masih memiliki artikel.');
        }

        $category->delete();

        return redirect()->back()->with('success', 'Kategori berhasil dihapus.');
    }
}

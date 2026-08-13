<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with(['category', 'author'])->latest()->paginate(15);

        return Inertia::render('admin/posts/Index', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        $categories = Category::orderBy('name', 'asc')->get();

        return Inertia::render('admin/posts/Form', [
            'categories' => $categories,
            'post' => null,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048', // 2MB max
            'category_id' => 'nullable|exists:categories,id',
            'is_published' => 'boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        $slug = Str::slug($request->title);
        // Ensure unique slug
        $count = Post::where('slug', 'LIKE', "{$slug}%")->count();
        if ($count > 0) {
            $slug = $slug.'-'.($count + 1);
        }

        Post::create([
            'title' => $request->title,
            'slug' => $slug,
            'content' => $request->content,
            'image_path' => $imagePath,
            'is_published' => $request->is_published ?? false,
            'published_at' => $request->is_published ? now() : null,
            'category_id' => $request->category_id,
            'author_id' => auth()->id(),
            'seo_title' => $request->seo_title,
            'seo_description' => $request->seo_description,
        ]);

        Cache::forget('home.recentPosts');

        return redirect()->route('admin.posts.index')->with('success', 'Kabar berhasil ditambahkan.');
    }

    public function edit(Post $post)
    {
        $categories = Category::orderBy('name', 'asc')->get();

        return Inertia::render('admin/posts/Form', [
            'categories' => $categories,
            'post' => $post,
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'category_id' => 'nullable|exists:categories,id',
            'is_published' => 'boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
        ]);

        $imagePath = $post->image_path;
        if ($request->hasFile('image')) {
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        $slug = $post->slug;
        if ($request->title !== $post->title) {
            $slug = Str::slug($request->title);
            $count = Post::where('slug', 'LIKE', "{$slug}%")->where('id', '!=', $post->id)->count();
            if ($count > 0) {
                $slug = $slug.'-'.($count + 1);
            }
        }

        $wasPublished = $post->is_published;
        $isPublished = $request->is_published ?? false;

        $post->update([
            'title' => $request->title,
            'slug' => $slug,
            'content' => $request->content,
            'image_path' => $imagePath,
            'is_published' => $isPublished,
            'published_at' => (! $wasPublished && $isPublished) ? now() : $post->published_at,
            'category_id' => $request->category_id,
            'seo_title' => $request->seo_title,
            'seo_description' => $request->seo_description,
        ]);

        Cache::forget('home.recentPosts');

        return redirect()->route('admin.posts.index')->with('success', 'Kabar berhasil diperbarui.');
    }

    public function destroy(Post $post)
    {
        if ($post->image_path && Storage::disk('public')->exists($post->image_path)) {
            Storage::disk('public')->delete($post->image_path);
        }

        $post->delete();

        Cache::forget('home.recentPosts');

        return redirect()->back()->with('success', 'Kabar berhasil dihapus.');
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'file' => 'required|image|max:2048', // 2MB max
        ]);

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('posts/attachments', 'public');

            return response()->json(['url' => asset('storage/'.$path)]);
        }

        return response()->json(['error' => 'File not found'], 400);
    }
}

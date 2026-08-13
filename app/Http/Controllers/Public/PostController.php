<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with(['category', 'author'])
            ->where('is_published', true)
            ->latest('published_at');

        if ($request->has('category')) {
            $category = Category::where('slug', $request->category)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        if ($request->has('search') && ! empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search): void {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $posts = $query->paginate(12)->withQueryString();
        $categories = Category::has('posts')->orderBy('name', 'asc')->get();

        return Inertia::render('public/posts/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'currentCategory' => $request->category,
            'currentSearch' => $request->search,
        ]);
    }

    public function show($slug)
    {
        $post = Post::with(['category', 'author'])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $relatedPosts = Post::with(['category'])
            ->where('is_published', true)
            ->where('id', '!=', $post->id)
            ->when($post->category_id, function ($query) use ($post): void {
                $query->where('category_id', $post->category_id);
            })
            ->latest('published_at')
            ->take(3)
            ->get();

        $defaultDesc = mb_substr(strip_tags($post->content), 0, 160).'...';

        return Inertia::render('public/posts/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
            'meta' => [
                'title' => $post->seo_title ?: ($post->title.' | Komite TKIT Al-Ikhlash'),
                'description' => $post->seo_description ?: $defaultDesc,
                'image' => $post->image_path ? asset('storage/'.$post->image_path) : null,
                'type' => 'article',
            ],
        ]);
    }
}

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" href="/favicon.png" type="image/png">
    <link rel="apple-touch-icon" href="/favicon.png">

    @fonts

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    <x-inertia::head>
        <title>{{ $page['props']['meta']['title'] ?? config('app.name', 'Laravel') }}</title>
        @if(isset($page['props']['meta']))
            <meta name="description" content="{{ $page['props']['meta']['description'] ?? '' }}">
            <meta property="og:title" content="{{ $page['props']['meta']['title'] ?? '' }}">
            <meta property="og:description" content="{{ $page['props']['meta']['description'] ?? '' }}">
            @if(isset($page['props']['meta']['image']))
                <meta property="og:image" content="{{ $page['props']['meta']['image'] }}">
            @endif
            <meta property="og:type" content="{{ $page['props']['meta']['type'] ?? 'website' }}">
        @endif
    </x-inertia::head>

    @if(app()->environment('production'))
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PZ9GD2FKM6"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-PZ9GD2FKM6');
        </script>
    @endif
</head>

<body class="font-sans antialiased">
    <x-inertia::app />
</body>

</html>

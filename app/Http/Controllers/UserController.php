<?php

namespace App\Http\Controllers;

use App\Helpers\Alert;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            function ($request, $next) {
                $firstSuperadmin = User::role('Superadmin')->orderBy('id', 'asc')->first();
                if ($firstSuperadmin && auth()->id() !== $firstSuperadmin->id) {
                    abort(403, 'Hanya Superadmin Utama yang dapat mengakses halaman ini.');
                }

                return $next($request);
            },
        ];
    }

    public function index()
    {
        $users = User::with('roles')->paginate(10);
        $roles = Role::all();

        return Inertia::render('users/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|string|exists:roles,name',
        ]);

        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $user->assignRole($request->role);
            DB::commit();
            Alert::success('Berhasil', 'Pengguna baru ditambahkan.');
        } catch (\Exception $e) {
            DB::rollBack();
            Alert::error('Gagal', 'Terjadi kesalahan saat menyimpan data.');
        }

        return back();
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', Rule::unique('users')->ignore($user->id)],
            'role' => 'required|string|exists:roles,name',
        ]);

        DB::beginTransaction();
        try {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
            ]);

            if ($request->filled('password')) {
                $user->update(['password' => Hash::make($request->password)]);
            }

            $user->syncRoles([$request->role]);
            DB::commit();
            Alert::success('Berhasil', 'Data pengguna diperbarui.');
        } catch (\Exception $e) {
            DB::rollBack();
            Alert::error('Gagal', 'Terjadi kesalahan saat menyimpan data.');
        }

        return back();
    }

    public function destroy(User $user): RedirectResponse
    {
        if (auth()->id() === $user->id) {
            Alert::error('Gagal', 'Anda tidak dapat menghapus akun Anda sendiri.');

            return back();
        }

        if ($user->hasRole('Superadmin') && User::role('Superadmin')->count() === 1) {
            Alert::error('Gagal', 'Tidak dapat menghapus satu-satunya Superadmin.');

            return back();
        }

        $user->delete();
        Alert::deleteSuccess('Berhasil', 'Pengguna dihapus.');

        return back();
    }
}

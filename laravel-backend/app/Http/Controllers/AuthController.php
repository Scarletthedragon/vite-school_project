<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function makeAdmin(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'actor_email' => 'required|email|exists:users,email',
        ]);

        $actor = User::where('email', $request->actor_email)->first();
        if (!$actor || !$actor->is_admin) {
            return response()->json(['success' => false, 'message' => 'Only admins can promote users.'], 403);
        }

        $user = User::where('email', $request->email)->first();
        $user->is_admin = true;
        $user->role = 'admin';
        $user->save();

        return response()->json(['success' => true, 'message' => 'User promoted to admin.']);
    }

    // Delete another user by email (admin only)
    public function deleteUser(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'actor_email' => 'required|email|exists:users,email',
        ]);

        $actor = User::where('email', $request->actor_email)->first();
        if (!$actor || !$actor->is_admin) {
            return response()->json(['success' => false, 'message' => 'Only admins can delete users.'], 403);
        }

        if ($request->email === $request->actor_email) {
            return response()->json(['success' => false, 'message' => 'Use delete account for your own account.'], 422);
        }

        $target = User::where('email', $request->email)->first();
        if (!$target) {
            return response()->json(['success' => false, 'message' => 'User not found.'], 404);
        }

        $target->delete();

        return response()->json(['success' => true, 'message' => 'User deleted.']);
    }

    // Delete currently signed-in user account (email + password confirmation)
    public function deleteAccount(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found.'], 404);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Invalid password.'], 401);
        }

        $user->delete();

        return response()->json(['success' => true, 'message' => 'Account deleted.']);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'success' => true,
            'user'    => ['name' => $user->name, 'email' => $user->email, 'role' => 'user'],
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Invalid email or password'], 401);
        }

        $isAdmin = (bool) ($user->is_admin ?? false);
        $role = $isAdmin ? 'admin' : ($user->role ?? 'user');

        return response()->json([
            'success' => true,
            'user'    => [
                'name' => $user->name,
                'email' => $user->email,
                'role' => $role,
                'is_admin' => $isAdmin,
            ],
        ]);
    }
}

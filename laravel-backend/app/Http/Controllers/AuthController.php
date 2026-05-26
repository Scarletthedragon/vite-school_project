<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
    // Delete a user by email (admin only)
    public function deleteUser(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);
        // Optionally, check if the current user is admin (add your own auth logic here)
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found.'], 404);
        }
        $user->delete();
        return response()->json(['success' => true, 'message' => 'User deleted.']);
    }
{
    public function makeAdmin(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();
        $user->is_admin = true;
        $user->role = 'admin';
        $user->save();

        return response()->json(['success' => true, 'message' => 'User promoted to admin.']);
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

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    public function leaderboard()
    {
        $users = User::select('name', 'email', 'role', 'score')
            ->orderByDesc('score')
            ->get();

        return response()->json($users);
    }

    public function addPoints(Request $request)
    {
        $request->validate([
            'email'  => 'required|email|exists:users,email',
            'points' => 'required|integer',
        ]);

        $user = User::where('email', $request->email)->first();
        $user->score = max(0, $user->score + $request->points);
        $user->save();

        return response()->json(['score' => $user->score]);
    }
}

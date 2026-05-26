<?php

namespace App\Http\Controllers;

use App\Models\BoardMessage;
use Illuminate\Http\Request;

class BoardMessageController extends Controller
{
    public function index()
    {
        $messages = BoardMessage::query()
            ->latest()
            ->limit(30)
            ->get()
            ->map(function (BoardMessage $entry) {
                return [
                    'id' => $entry->id,
                    'name' => $entry->name,
                    'message' => $entry->message,
                    'role' => $entry->role,
                    'color' => $entry->color,
                    'createdAt' => optional($entry->created_at)->toISOString(),
                ];
            });

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:2000'],
            'role' => ['nullable', 'string', 'in:admin,user,visitor'],
            'color' => ['nullable', 'string', 'regex:/^#[0-9a-fA-F]{6}$/'],
        ]);

        $entry = BoardMessage::create([
            'name' => $validated['name'],
            'message' => $validated['message'],
            'role' => $validated['role'] ?? 'visitor',
            'color' => $validated['color'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => [
                'id' => $entry->id,
                'name' => $entry->name,
                'message' => $entry->message,
                'role' => $entry->role,
                'color' => $entry->color,
                'createdAt' => optional($entry->created_at)->toISOString(),
            ],
        ], 201);
    }
}

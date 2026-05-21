<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ScoreController;

Route::get('/test', function () {
    return response()->json(['message' => 'Connected to Laravel!']);
});

Route::post('/contact', [ContactController::class, 'store']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/make-admin', [AuthController::class, 'makeAdmin']);

Route::get('/leaderboard', [ScoreController::class, 'leaderboard']);
Route::post('/scores/add', [ScoreController::class, 'addPoints']);

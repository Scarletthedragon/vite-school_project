<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

Route::get('/test', function () {
    return response()->json(['message' => 'Connected to Laravel!']);
});

Route::post('/contact', [ContactController::class, 'store']);

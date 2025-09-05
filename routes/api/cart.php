<?php

use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;

Route::prefix('cart')->group(function () {
  Route::get('/', [CartController::class, 'index']);
  Route::post('/', [CartController::class, 'store']);
  Route::delete('/{id}', [CartController::class, 'removeItem']);
  Route::delete('/', [CartController::class, 'clearItem']);
  Route::put('/{id}', [CartController::class, 'updateQuantity']);
});

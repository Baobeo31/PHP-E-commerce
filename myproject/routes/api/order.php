<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::prefix('orders')->group(function () {
  Route::post('/', [OrderController::class, 'store']);
  Route::get('/', [OrderController::class, 'getAllOrders'])->middleware(['jwt', 'admin']);
  Route::get('/my-orders', [OrderController::class, 'myorder']);
  Route::get('/{id}', [OrderController::class, 'show']);
  Route::put('/{id}/status', [OrderController::class, 'updateStatus'])->middleware(['jwt', 'admin']);
});

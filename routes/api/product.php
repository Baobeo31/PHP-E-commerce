<?php

use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;

Route::prefix('products')->group(function () {
  Route::get('/', [ProductController::class, 'index']);
  Route::get('/{id}', [ProductController::class, 'show']);
  Route::post('/', [ProductController::class, 'store'])->middleware(['jwt', 'admin']);
  Route::put('/{id}', [ProductController::class, 'update'])->middleware(['jwt', 'admin']);
  Route::delete('/{id}', [ProductController::class, 'destroy'])->middleware(['jwt', 'admin']);
});

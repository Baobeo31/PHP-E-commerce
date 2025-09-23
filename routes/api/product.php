<?php

use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;

Route::prefix('products')->group(function () {
  Route::get('/', [ProductController::class, 'index']);
  Route::get('/{id}', [ProductController::class, 'getProductDetail']);
  Route::post('/', [ProductController::class, 'create'])->middleware(['jwt', 'admin']);
  Route::put('/{id}', [ProductController::class, 'edit'])->middleware(['jwt', 'admin']);
  Route::delete('/{id}', [ProductController::class, 'destroy'])->middleware(['jwt', 'admin']);
});

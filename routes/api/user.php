<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerifyEmailController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('users')->group(function () {
  Route::post('/login', [UserController::class, 'login']);
  Route::post('/logout', [UserController::class, 'logout']);
  Route::get('/getall', [UserController::class, 'getall'])->middleware(['jwt', 'admin']);
  Route::get('/getdetail/{id}', [UserController::class, 'getUserbyId'])->middleware(['jwt', 'user.or.admin']);
  Route::put('/update/{id}', [UserController::class, 'update'])->middleware(['jwt', 'user.or.admin']);
  Route::delete('/delete/{id}', [UserController::class, 'delete'])->middleware(['jwt', 'admin']);
  Route::post('/create', [UserController::class, 'create']);
  Route::post('/sendOTP', [UserController::class, 'sendOTP']);
  Route::post('/verify', [UserController::class, 'passwordReset']); 
  
  // Route::get('/google', )
});

<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Mail\VerifyEmailMail;
use App\Models\User;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class UserService
{
  public function getAllUsers()
  {
    return User::all();
  }

  public function getUserById($id)
  {
    return User::findOrFail($id);
  }

  public function createUser(array $data)
  {
    DB::beginTransaction();
    try {
      $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
      ]);
      $verifyUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        [
          'id' => $user->id,
          'hash' => sha1($user->email)
        ]
      ); // tạo 1 URL tạm thời
      try {
        Mail::to($user->email)->send(new VerifyEmailMail($verifyUrl)); // gửi mail tới mail vừa nhập
      } catch (Exception $e) {
        throw new AppError('Không gửi được email xác thực: ' . $e->getMessage());
      }
      DB::commit();
      return $user;
    } catch (\Throwable $e) {
      DB::rollBack();
      throw $e;
    }
  }
  public function verifyEmail($id, $hash)
  {
    $user = User::findOrFail($id);

    if (!hash_equals($hash, sha1($user->email))) {
      throw new AppError('Liên kết không hợp lệ', 400);
    }

    if ($user->hasVerifiedEmail()) { // Kiểm tra xem người dùng đã xác thực chưa
      return false;
    }

    $user->markEmailAsVerified(); // gửi email thông báo xác thực thành công(Chuyển email_verified_at thành now())
    return true;
  }
  public function updateUser($id, array $data)
  {
    $user = User::findOrFail($id);

    if (isset($data['password'])) {
      $data['password'] = Hash::make($data['password']);
    }

    $user->update($data);
    return $user;
  }

  public function deleteUser($id)
  {
    $user = User::findOrFail($id);
    return $user->delete();
  }
  public function loginUser($email, $password)
  {
    $user = User::where('email', $email)->first();
    if (!$user || !Hash::check($password, $user->password)) {
      throw new AppError('Email hoặc mật khẩu không đúng', 401);
    }
    // if (!$user->hasVerifiedEmail()) {
    //   throw new AppError('Vui lòng xác thực email trước khi đăng nhập', 403);
    // }
    $payload = [
      'id' => $user->id,
      'email' => $user->email,
      'isAdmin' => $user->isAdmin,

    ];
    $access_token = JwtService::generalAccessToken($payload);
    $refresh_token = JwtService::generalRefreshToken($payload);
    return [
      'status' => 'OK',
      'message' => 'Đăng nhập thành công',
      'user' => $user->only(['id', 'email', 'name']),
      'access_token' => $access_token,
      'refresh_token' => $refresh_token
    ];
  }
  public function logout()
  {
    Auth::logout();
  }
}

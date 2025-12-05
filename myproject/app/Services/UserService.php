<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Mail\VerifyEmailMail;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

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
            // Tạo token URL-safe, tránh base64
            $token = Str::random(40);
            $expiresAt = Carbon::now()->addMinutes(60); // token 1 giờ

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'email_verification_token' => $token,
                'email_verification_expires_at' => $expiresAt,
            ]);

            // Tạo link xác thực trỏ về frontend
            $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
           $verifyUrl = "{$frontendUrl}/verify-email/{$user->id}/" . urlencode($user->email_verification_token);


            // Gửi email
            Mail::to($user->email)->queue(new VerifyEmailMail($verifyUrl));

            DB::commit();

            return $user;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw new AppError('Không tạo được user hoặc gửi mail: ' . $e->getMessage());
        }
    }

 public function verifyEmail($id, $hash)
{
    $user = User::findOrFail($id);
    // dd($user);
    if (!is_null($user->email_verified_at)) {
        return [
            'success' => true,
            'message' => 'Email đã được xác thực trước đó'
        ];
    }
    if ($user->email_verification_token === null) {
        throw new AppError('Liên kết xác thực không hợp lệ ', 400);
    }
    if ($user->email_verification_token !== $hash) {
        throw new AppError('Liên kết xác thực không hợp lệ hoặc đã hết hạn', 400);
    }
    if (Carbon::now()->greaterThan($user->email_verification_expires_at)) {
        throw new AppError('Liên kết xác thực đã hết hạn', 400);
    }
    $user->email_verified_at = now();
    $user->email_verification_token = null;
    $user->email_verification_expires_at = null;
    $user->save();
    // dd($user);
    return true;
}



    public function resendVerificationEmail($email)
    {
        $user = User::where('email', $email)->firstOrFail();

        if (!is_null($user->email_verified_at)) {
            throw new AppError('Tài khoản này đã được xác thực.', 400);
        }

        $user->email_verification_token = Str::random(64);
        $user->email_verification_expires_at = Carbon::now()->addMinutes(60);
        $user->save();

        // Tạo link xác thực trỏ về frontend
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
       $verifyUrl = "{$frontendUrl}/verify-email/{$user->id}/" . urlencode($user->email_verification_token);

        // Gửi email
        Mail::to($user->email)->queue(new VerifyEmailMail($verifyUrl));

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
        if (!$user->hasVerifiedEmail()) {
            throw new AppError('Vui lòng xác thực email trước khi đăng nhập', 403);
        }

        $payload = [
            'id' => $user->id,
            'email' => $user->email,
            'isAdmin' => $user->isAdmin,
        ];

        $access_token = JwtService::generalAccessToken($payload);
        $refresh_token = JwtService::generalRefreshToken($payload);

        // Trả về array, không dùng response()->json
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
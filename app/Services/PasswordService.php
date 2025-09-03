<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Mail\PasswordResetMail;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class PasswordService
{
  public function sendOTP(string $email)
  {
    try {
      $user = User::where('email', $email)->first();
      if (!$user) {
        throw new AppError('Email khong ton tai', 400);
      }
      $otp = random_int(100000, 999999);

      DB::table('users')->updateOrInsert( // cập nhật bảng users
        ['email' => $email],
        ['otp' => $otp, 'otp_expires_at' => now()->addMinutes(5)->format('Y-m-d H:i:s')], 
      );
      // dd(DB::table('users')->updateOrInsert( // cập nhật bảng users
      //   ['email' => $email],
      //   ['otp' => $otp, 'otp_expires_at' => now()->addMinutes(5)],
      // ));
      Mail::to($email)->send(new PasswordResetMail($otp));
    } catch (Exception $e) {
      throw $e;
    }
  }
  public function resetPass(string $email, string $otp, string $newPassword)
  {
    $user = User::where('email', $email)->where('otp', $otp)->first();
    if (!$user) throw new AppError('OTP khong hop le', 400);
    if (!$user->otp_expires_at || now()->greaterThanOrEqualTo($user->otp_expires_at)) {
      throw new AppError('Ma OTP da het han', 400);
    }

    $user->password = Hash::make($newPassword);
    $user->otp = null;
    $user->otp_expires_at = null;
    $user->save();
    // dd([
    //   $user,
    //   'now' => now()->toDateTimeString(),
    //   'otp_expires_at' => $user->otp_expires_at?->toDateTimeString(),
    //   'expired' => now()->greaterThanOrEqualTo($user->otp_expires_at),
    // ]);
    return true;
  }
}

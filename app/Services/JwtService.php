<?php

namespace App\Services;

use App\Exceptions\AppError;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtService
{
  public static function generalAccessToken(array $payload)
  {
    $key = env('JWT_SECRET');
    $issueAt = time();
    $expire = $issueAt + 300; //5phut
    $token = array_merge([
      'iat' => $issueAt,
      'exp' => $expire,
    ], $payload);
    return JWT::encode($token, $key, 'HS256');
  }
  public static function generalRefreshToken(array $payload)
  {
    $key = env('JWT_SECRET');
    $issueAt = time();
    $expire = $issueAt + 7 * 24 * 60 * 60;

    $token = array_merge([
      'iat' => $issueAt,
      'exp' => $expire,
    ], $payload);
    return JWT::encode($token, $key, 'HS256');
  }
  public static function refreshTokenJWTService(string $refreshToken)
  {
    $key = env('JWT_SECRET');
    try {
      $decode = JWT::decode($refreshToken, new Key($key, 'HS256'));
      $id = $decode->id ?? null; // Lấy id từ token đã giải mã

      if (!$id) {
        throw new AppError('Refresh_token không hợp lệ');
      }
      $accessToken = self::generalAccessToken(['id' => $id]);
      return [
        'status' => 'OK',
        'message' => 'SUCCESS',
        'access_token' => $accessToken,
      ];
    } catch (Exception $e) {
      throw new AppError('Access_token đã hết hạn hoặc không hợp lệ');
    }
  }
}

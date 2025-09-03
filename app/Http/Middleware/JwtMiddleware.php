<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
//Logic của JWT
class JwtMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer')) {
            return response()->json(['message' => 'Xác thực thất bại'], 401);
        }
        try {
            $token = trim(str_replace('Bearer', '', $authHeader));
            $decode = JWT::decode($token, new Key(env("JWT_SECRET"), 'HS256'));
            $request->setUserResolver(function () use ($decode) {
                return $decode;
            });
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Token không hợp lệ hoặc đã hết hạn'
            ], 401);
        }


        return $next($request);
    }
}

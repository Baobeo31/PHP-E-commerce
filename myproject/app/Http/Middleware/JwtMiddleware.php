<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $authHeader = $request->header('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json(['message' => 'Xác thực thất bại'], 401);
        }

        try {
            $token = trim(str_replace('Bearer ', '', $authHeader));
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

            $user = User::find($decoded->id);

            if (!$user) {
                return response()->json(['message' => 'User không tồn tại'], 401);
            }
            Auth::setUser($user);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Token không hợp lệ hoặc đã hết hạn'
            ], 401);
        }

        return $next($request);
    }
}

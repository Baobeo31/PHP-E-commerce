<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class UserOrAdminMiddleware
{

    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();  // user là object 
        $paramId = $request->route('id');

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        if (intval($user->isAdmin ?? 0) !== 1 && intval($user->id) !== intval($paramId)) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        return $next($request);
    }
}

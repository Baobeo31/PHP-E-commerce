<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;

class VerifyEmailController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function __invoke($id, $hash)
    {
        $this->userService->verifyEmail($id, $hash);

        return response()->json([
            'message' => 'Xác thực email thành công, giờ bạn có thể đăng nhập'
        ]);
    }
}

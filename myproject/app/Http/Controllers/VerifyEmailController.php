<?php

namespace App\Http\Controllers;

use App\Exceptions\AppError;
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
    try {
         $this->userService->verifyEmail($id, $hash);
        // dd($result);
        return response()->json([
            'success' => true,
            'message' => 'Xác thực email thành công'
        ]);

    } catch (AppError $e) {
        return response()->json([
            'success' => false, 
            'message' => $e->getMessage()
        ], 400);
    } catch (\Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => 'Lỗi máy chủ: ' . $e->getMessage()
        ], 500);
    }
}

}

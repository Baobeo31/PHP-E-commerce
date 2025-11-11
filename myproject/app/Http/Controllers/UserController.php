<?php

namespace App\Http\Controllers;

use App\Exceptions\AppError;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\ResetPassRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Services\PasswordService;
use Illuminate\Validation\ValidationException;
use Throwable;

class UserController extends Controller
{

    protected $userService;
    protected $passwordService;
    public function __construct(
        UserService $userService,
        PasswordService $password_service,
    ) {
        $this->userService = $userService;
        $this->passwordService = $password_service;
    }
    public function getall()
    {
        try {
            $users = $this->userService->getAllUsers();
            return response()->json([
                'success' => true,
                'data' => $users,
                'message' => 'Thành công'
            ]);
        } catch (AppError $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        } catch (Throwable $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function getUserbyId($id)
    {
        try {
            $user = $this->userService->getUserById($id);
            return new UserResource($user);
        } catch (AppError $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        } catch (Throwable $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function create(RegisterRequest $request)
    {
        try {
            $data = $request->validated();
            $user = $this->userService->createUser($data);

            return response()->json([
                'success' => true,
                'user' => $user,
                'message' => 'Đăng ký thành công. Vui lòng kiểm tra Email để xác nhận',
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->errors()['email'][0] ?? 'Dữ liệu không hợp lệ'
            ], 422);
        } catch (AppError $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $data = $request->validated();
            $user = $this->userService->loginUser($data['email'], $data['password']);
            $refreshToken = $user['refresh_token'];
            unset($user['refresh_token']);

            $cookie = cookie(
                'refresh_token',
                $refreshToken,
                60 * 24 * 7, //ngay tinh theo phut
                null,
                null,
                app()->environment('production'), //secure khi bật production
                true, // httponly
                false,
                'Strict' //sameSite
            );
            return response()->json([
                'message' => 'Thành công',
                'data' => $user
            ], 200)->cookie($cookie);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => $e->errors()
            ], 422);
        } catch (AppError $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getStatusCode());
        } catch (Throwable $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
        //Đăng nhập
    }

    public function logout()
    {
        //đăng xuất tài khoản
        $this->userService->logout();
        return response()->json([
            'message' => 'Đăng xuất thành công'
        ])->cookie('refresh_token', '', -1);
    }


    public function update(UpdateRequest $request, $id)
    {
        $data = $request->validated();
        $user = $this->userService->updateUser($id, $data);
        return response()->json($user);
    }


    public function delete($id)
    {
        //Xóa user
        $this->userService->deleteUser($id);
        return response()->json([
            'message' => 'Xóa thành công'
        ]);
    }

    public function sendOTP(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $this->passwordService->sendOTP($request->email);
        return response()->json([
            'message' => 'Gửi mã thành công'
        ]);
    }
    public function passwordReset(ResetPassRequest $request)
    {
        try {
            $data = $request->validated();
            $this->passwordService->resetPass($data->email, $data->otp, $data->password);
            return response()->json([
                'message' => 'Đặt lại mật khẩu thành công '
            ]);
        } catch (AppError $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }
}

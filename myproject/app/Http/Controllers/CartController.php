<?php

namespace App\Http\Controllers;

use App\Exceptions\AppError;
use App\Http\Requests\Cart\StoreCartRequest;
use App\Http\Requests\Cart\UpdateCartRequest;
use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cart_service)
    {
        $this->cartService = $cart_service;
    }

    public function index()
    {
        try {
            $user = auth()->id();
            $cartItem = $this->cartService->getCart($user);
            return response()->json($cartItem, 200);
        } catch (AppError $err) {
            return response()->json([
                'message' => 'Error',
                'error' => $err->getMessage()
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Lỗi hệ thống',
                'error' => $th->getMessage()
            ]);
        }
    }

    public function store(StoreCartRequest $request)
    {
        try {
            $user = auth()->id();
            $data = $request->validated();
            $cartItem = $this->cartService->addtoCart($user, $data);
            return response()->json($cartItem, 200);
        } catch (AppError $err) {
            return response()->json([
                'message' => 'Error',
                'error' => $err->getMessage()
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Lỗi hệ thống',
                'error' => $th->getMessage()
            ]);
        }
    }
    public function updateQuantity(UpdateCartRequest $request, $id)
    {
        try {
            $user = auth()->id();
            $data = $request->validated();
            $cartItem = $this->cartService->updateQuantity($user, $id, $data['quantity']);
            return response()->json($cartItem, 200);
        } catch (AppError $err) {
            return response()->json([
                'message' => 'Error',
                'error' => $err->getMessage()
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Lỗi hệ thống',
                'error' => $th->getMessage()
            ]);
        }
    }
    public function removeItem($id)
    {
        try {
            $user = auth()->id();
            $cartItem = $this->cartService->removeFromCart($user, $id);
            return response()->json($cartItem, 200);
        } catch (AppError $err) {
            return response()->json([
                'message' => 'Error',
                'error' => $err->getMessage()
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Lỗi hệ thống',
                'error' => $th->getMessage()
            ]);
        }
    }
    public function clearItem()
    {
        try {
            $user = auth()->id();
            $this->cartService->clearCart($user);
            return response()->json([
                'message' =>  'Xóa thành công',
            ], 200);
        } catch (AppError $err) {
            return response()->json([
                'message' => 'Error',
                'error' => $err->getMessage()
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Lỗi hệ thống',
                'error' => $th->getMessage()
            ]);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Exceptions\AppError;
use Dotenv\Exception\ValidationException;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use App\Services\OrderService;

class OrderController extends Controller
{
    protected $orderService;
    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function store(Request $request)
    {
        try {
            $userId = auth()->id();
            $data = $request->validate([
                'fullname' => 'required|string|max:255',
                'phone' => 'required|string|max:20',
                'address' => 'required|string|max:255',
                'city' => 'required|string|max:255',
                'payment_method' => 'required|string',
                'items_price' => 'required|numeric',
                'shipping_price' => 'required|numeric',
                'total_price' => 'required|numeric',
                'items' => 'required|array|min:1',
                'items.*.product_id' => 'required|exists:products,id',
                'items.*.name'  => 'required|string',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.price' => 'required|numeric',
                'items.*.image' => 'nullable|string',
            ]);

            $order = $this->orderService->createOrder($data, $userId);
            return response()->json($order, 200);
        } catch (AppError $err) {
            return $err->getMessage();
        } catch (ValidationException $err) {
            return $err->getMessage();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Lỗi hệ thống',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function getAllOrders($perPage)
    {
        try {
            $order = $this->orderService->getAllOrders($perPage);
            return response()->json($order, 200);
        } catch (AppError $err) {
            return $err->getMessage();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Lỗi hệ thống',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    //Lấy đơn hàng của User
    public function myOrder()
    {
        try {
            $userId = auth()->id();
            $order = $this->orderService->getOrderByUser($userId);
            return response()->json($order, 200);
        } catch (AppError $err) {
            return $err->getMessage();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Lỗi hệ thống',
                'error' => $th->getMessage()
            ], 500);
        }
    }
    //Lấy chi tiết đơn hàng
    public function show($id)
    {
        try {
            $user = auth()->id();
            $order = $this->orderService->getOrderDetail($id, $user);
            return response()->json($order, 200);
        } catch (AppError $err) {
            return $err->getMessage();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Lỗi hệ thống',
                'error' => $th->getMessage()
            ], 500);
        }
    }
    public function updateStatus(Request $request, $id)
    {
        try {
            $data = $request->only(['is_paid', 'is_delivered']);
            $order = $this->orderService->updateStatusOrder($id, $data);
            return response()->json([
                'message' => 'Thành công',
                'data' => $order
            ]);
        } catch (AppError $err) {
            return $err->getMessage();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Lỗi hệ thống',
                'error' => $th->getMessage()

            ], 500);
        }
    }
}

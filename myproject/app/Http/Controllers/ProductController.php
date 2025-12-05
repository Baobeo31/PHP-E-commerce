<?php

namespace App\Http\Controllers;

use App\Exceptions\AppError;
use App\Http\Requests\Product\ProductRequest;
use Illuminate\Http\Request;
use App\Services\ProductService;
use Throwable;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request)
    {

        try {
            $filter = [
                'search' => $request->query('search'),
                'price_min' => $request->query('price_min'),
                'price_max' => $request->query('price_max'),
                'rating_min' => $request->query('rating_min'),
                'rating_max' => $request->query('rating_max'),
                'sort' => $request->query('sort'),
            ];

            $perpage = $request->query('per_page', 10);
            $product = $this->productService->getAllProduct($filter, $perpage);
            return response()->json($product);
        } catch (AppError $ex) {
            return $ex->getMessage();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Lỗi hệ thống',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function getProductDetail($id)
    {
        try {
            $product = $this->productService->getProductById($id);
            return response()->json($product);
        } catch (AppError $e) {
            return $e->getMessage();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Lỗi hệ thống',
                'error' => $th->getMessage()
            ], 500);
        }
    }
    public function create(ProductRequest $request)
    {
        try {
            $data = $request->validated();
            $newProduct = $this->productService->createProduct($data);
            return response()->json($newProduct);
        } catch (AppError $e) {
            return $e->getMessage();
        } catch (Throwable $th) {
            return response()->json([
                'message' => 'Lỗi hệ thống',
                'error' => $th->getMessage()
            ], 500);
        }
    }
    public function edit(ProductRequest $request, $id)
    {
        try {
            $data = $request->validated();
            $product = $this->productService->updateProduct($id, $data);

            return response()->json([
                'success' => true,
                'message' => 'Product updated successfully',
                'data'    => $product
            ]);
        } catch (AppError $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi hệ thống',
                'error'   => $th->getMessage()
            ], 500);
        }
    }
    public function destroy($id)
    {
        try {
            $this->productService->destroy($id);
            return response()->json([
                'message' => 'Xóa sản phẩm thành công'
            ]);
        } catch (AppError $e) {
            return $e->getMessage();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Lỗi hệ thống',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}

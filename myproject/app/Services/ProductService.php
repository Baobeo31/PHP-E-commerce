<?php

namespace App\Services;

use App\Models\Product;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\DB;

class ProductService
{

   public function getAllProduct(array $filters = [], $perPage = 10)
{
    $query = Product::query();

    if (!empty($filters['search'])) {
        $query->where('name', 'like', '%' . $filters['search'] . '%');
    }
    if (!empty($filters['price_min'])) {
        $query->where('price', '>=', $filters['price_min']);
    }

    if (!empty($filters['price_max'])) {
        $query->where('price', '<=', $filters['price_max']); 
    }

    if (!empty($filters['rating_min'])) {
        $query->where('rating', '>=', $filters['rating_min']);
    }

    if (!empty($filters['rating_max'])) {
        $query->where('rating', '<=', $filters['rating_max']);
    }
    if (!empty($filters['sort_by'])) {
        $sortDirection = $filters['sort_direction'] ?? 'asc';
        $query->orderBy($filters['sort_by'], $sortDirection);
    }

    if (!empty($filters['sort'])) {
        switch ($filters['sort']) { 
            case 'name_asc':
                $query->orderBy('name', 'asc');
                break;

            case 'name_desc':
                $query->orderBy('name', 'desc');
                break;

            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;

            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;

            case 'rating_asc':
                $query->orderBy('rating', 'asc');
                break;

            case 'rating_desc':
                $query->orderBy('rating', 'desc');
                break;

            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
        }
    }

    if (empty($filters['sort']) && empty($filters['sort_by'])) {
        $query->orderBy('created_at', 'desc');
    }

    // Giới hạn per_page
    $perPage = min($perPage, 8); 

    return $query->paginate($perPage);
}

    public function getProductById($id)
    {
        return Product::findOrFail($id);
    }
    public function createProduct(array $data)
    {
        DB::beginTransaction();
        try {
            $product = Product::create([
                'name' => $data['name'],
                'price' => $data['price'],
                'brand' => $data['brand'],
                'image' => $data['image'],
                'description' => $data['description'],
                'rating' => $data['rating'],
                'countInStock' => $data['countInStock']
            ]);
            return $product;
            DB::commit();
        } catch (\Throwable $err) {
            DB::rollBack();
            return $err;
        }
    }

    public function updateProduct($id, array $data)
    {
        DB::beginTransaction();
        try {
            $product = Product::findOrFail($id);

            $product->update($data);

            DB::commit();

            // luôn return fresh object
            return $product->fresh();
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }


    public function destroy($id)
    {
        Db::beginTransaction();
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return $th;
        }
    }
}

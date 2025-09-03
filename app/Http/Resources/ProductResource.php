<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{



    public function toArray($request): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'price'       => number_format($this->price, 0, ',', '.') . ' VND',
            'description' => $this->description,
            'rating'      => $this->rating,
            'brand'       => $this->brand,
            'stock'       => $this->countInstock,
            'image'   => $this->image
                ? asset('storage/' . $this->image)
                : null,
            'created_at'  => $this->created_at->diffForHumans(),
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'description',
        'rating',
        'brand',
        'image',
        'countInstock'
    ];
    protected $casts = [
        'price' => 'decimal:2',
        'rating' => 'float',
        'countInstock' => 'integer'
    ];
}

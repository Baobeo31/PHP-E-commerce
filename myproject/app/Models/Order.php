<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'fullname',
        'phone',
        'address',
        'city',
        'payment_method',
        'items_price',
        'shipping_price',
        'total_price',
        'is_paid',
        'paid_at',
        'is_delivered',
        'delivered_at'
    ];
    public function user()
    {
        return $this->belongsTo(User::class); //nhiều-1
    }
    public function items()
    {
        return $this->hasMany(OrderItem::class); //1-nhiều
    }
}

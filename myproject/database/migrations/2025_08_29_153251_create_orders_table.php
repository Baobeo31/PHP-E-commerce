<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            // Quan hệ tới user
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Thông tin khách hàng
            $table->string('fullname');
            $table->string('phone', 20);
            $table->string('address');
            $table->string('city');

            // Thanh toán
            $table->string('payment_method'); // COD, VNPay, Paypal...
            $table->decimal('items_price', 10, 2);
            $table->decimal('shipping_price', 10, 2)->default(0);
            $table->decimal('total_price', 10, 2);

            // Trạng thái thanh toán / giao hàng
            $table->boolean('is_paid')->default(false);
            $table->timestamp('paid_at')->nullable();

            $table->boolean('is_delivered')->default(false);
            $table->timestamp('delivered_at')->nullable();

            $table->timestamps(); // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};

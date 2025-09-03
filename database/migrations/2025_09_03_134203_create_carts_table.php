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
        Schema::create('carts', function (Blueprint $table) {
            $table->id();

            // User nào sở hữu giỏ hàng
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            // Sản phẩm nào trong giỏ
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');

            // Số lượng sản phẩm trong giỏ
            $table->integer('quantity')->default(1);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carts');
    }
};

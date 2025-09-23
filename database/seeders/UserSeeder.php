<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Mai Bảo',
            'email' => 'mbao2k3@gmail.com',
            'password' => Hash::make('12345678'), // quan trọng: hash mật khẩu
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

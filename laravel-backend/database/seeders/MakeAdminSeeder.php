<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class MakeAdminSeeder extends Seeder
{
    public function run()
    {
        User::updateOrCreate(
            ['email' => 'admin@dragons.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('admin123'),
                'is_admin' => true,
                'role' => 'admin',
            ]
        );
    }
}

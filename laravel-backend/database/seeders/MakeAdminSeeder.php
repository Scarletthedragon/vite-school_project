<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class MakeAdminSeeder extends Seeder
{
    public function run()
    {
        $user = User::where('email', 'admin@dragons.com')->first();
        if ($user) {
            $user->is_admin = true;
            $user->save();
        }
    }
}

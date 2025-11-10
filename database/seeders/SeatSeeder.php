<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class SeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $i = 1;
        $y = 1;

        do {
            DB::table('seats')->insert([
                'hall_id' => 1,
                'seat_number' => $i,
                'status' => 1,
            ]);
            $i += 1;
        } while ($i <= 70);

        do {
            DB::table('seats')->insert([
                'hall_id' => 2,
                'seat_number' => $y,
                'status' => 1,
            ]);
            $y += 1;
        } while ($y <= 48);
    }
}

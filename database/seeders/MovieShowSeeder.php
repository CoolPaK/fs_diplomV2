<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MovieShowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('movie_shows')->insert([
            'hall_id' => 1,
            'movie_id' => 1,
            'start_time' => '09:00',
        ]);

        DB::table('movie_shows')->insert([
            'hall_id' => 1,
            'movie_id' => 2,
            'start_time' => '13:30',
        ]);

        DB::table('movie_shows')->insert([
            'hall_id' => 1,
            'movie_id' => 3,
            'start_time' => '19:10',
        ]);
    }
}

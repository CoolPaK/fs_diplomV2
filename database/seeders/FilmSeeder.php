<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class FilmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('film')->insert([
            'name' => 'Звёздные войны XXIII: Атака клонированных клонов',
            'description' => 'Две сотни лет назад малороссийские хутора разоряла шайка нехристей-ляхов во главе с могущественным колдуном.',
            'country' => 'США',
            'duration' => 130,
            'poster' => 'images/poster1.jpg',
        ]);

        DB::table('film')->insert([
            'name' => 'Альфа',
            'description' => '20 тысяч лет назад Земля была холодным и неуютным местом, в котором смерть подстерегала человека на каждом шагу.',
            'country' => 'Франция',
            'duration' => 96,
            'poster' => 'images/poster2.jpg',
        ]);
    }
}

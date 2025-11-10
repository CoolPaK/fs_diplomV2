<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('movies')->insert([
            'title' => 'Звёздные войны XXIII - Атака клонированных клонов',
            'duration' => 130,
            'description' => 'Две сотни лет назад малороссийские хутора разоряла шайка нехристей-ляхов во главе с могущественным колдуном.',
            'country' => 'США',
        ]);
        DB::table('movies')->insert([
            'title' => 'Альфа',
            'duration' => 96,
            'description' => '20 тысяч лет назад Земля была холодным и неуютным местом, в котором смерть подстерегала человека на каждом шагу.',
            'country' => 'Франция'
        ]);
        DB::table('movies')->insert([
            'title' => 'Хищник',
            'duration' => 101,
            'description' => 'Самые опасные хищники Вселенной, прибыв из глубин космоса, высаживаются на улицах маленького городка, чтобы начать свою кровавую охоту. Генетически модернизировав себя с помощью ДНК других видов, охотники стали ещё сильнее, умнее и беспощаднее.',
            'country' => 'Канада, США'
        ]);
    }
}

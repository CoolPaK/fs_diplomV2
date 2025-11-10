<?php

namespace App\Providers;

use App\Models\Hall;
use App\Models\HallSize;
use App\Models\Movie;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
{
     $halls = Hall::all();
     $movies = Movie::all();
     $hallSize = HallSize::all();

     View::share('halls', $halls);
     View::share('movies', $movies);
     View::share('hallSize', $hallSize);
}
}

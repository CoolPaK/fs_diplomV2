<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Post;
use App\Models\MovieShow;
use App\Models\Hall;
use App\Models\Film;
use DateTime;

class UserMovieShowController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $halls = Hall::all()->where('is_active', 1);
        $films = Film::all();
        $movieShow = MovieShow::all()->where('start_day', $id)->sortBy('start_time');;
        $output = [];
        foreach ($films as $film) {
            $newArr = ['film_id'=> $film['id'],'name'=> $film['name'], 'country'=> $film['country'], 'duration'=> $film['duration'],'poster'=> $film['poster'], 'halls'=> []];
            foreach ($halls as $hall) {
                $newHall = ['hall_id'=> $hall['id'],'name'=> $hall['name'], 'row'=> $hall['row'], 'seats'=> $hall['seats'], 'price'=> $hall['price'], 'vip_price'=> $hall['vip_price'], 'seances'=> []];
                foreach ($movieShow as $movie) {
                if ($movie['hall_id'] === $newHall['hall_id']) {
                    if ($movie['film_id'] === $film['id']) {
                        $newHall['seances'][] = $movie;
                    }
                }
                }
                $newArr['halls'][] = $newHall;
            }
            $output[] = $newArr;
        }

        return new Post($output);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

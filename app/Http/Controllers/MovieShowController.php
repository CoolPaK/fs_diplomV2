<?php

namespace App\Http\Controllers;

use App\Http\Requests\MovieShowRequest;
use App\Models\Hall;
use App\Models\Movie;
use App\Models\MovieShow;
use App\Models\Place;
use App\Models\TakenPlace;
use Illuminate\Http\Request;

class MovieShowController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MovieShow::all();
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
    public function store(MovieShowRequest $request)
    {
        $id = Movie::where('title', $request->movie_name)->first()->id;
        $all = MovieShow::all();

        $arr = [];
        foreach ($all as $key => $value) {
            if ($value->hall_id == $request->hall_id) {
                $dur = Movie::where('id', $value->movie_id)->first()->duration;
                $m = floor((strtotime($value->start_time)-strtotime($request->start_time))/60);
                if (abs($m)< $dur) {
                    array_push($arr, abs($m));
                }
            }
        }

        if (count($arr) === 0) {
            if (!MovieShow::where('hall_id', $request->hall_id)->where('start_time', $request->start_time)->first()) {
                MovieShow::create([
                    'hall_id' => $request->hall_id,
                    'movie_id' => $id,
                    'start_time' => $request->start_time
                ]);
            }
            $seance_id = MovieShow::where('hall_id', $request->hall_id)->where('start_time', $request->start_time)->first()->id;
            $seats = Place::where('hall_id', $request->hall_id)->get();
            foreach ($seats as $key => $value) {
                TakenPlace::create([
                    'hall_id' => $request->hall_id,
                    'seance_id' => $seance_id,
                    'row_num' => $value['row_num'],
                    'seat_num' => $value['seat_num'],
                    'taken' => false
                ]);
            }
        } else {
            return 'Время сеанса уже занято! Выберите другое время!';
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  in $hall_id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        return $request;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MovieShow  $movieShow
     * @return \Illuminate\Http\Response
     */
    public function edit(MovieShow $movieShow)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MovieShow  $movieShow
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MovieShow $movieShow)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MovieShow  $movieShow
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $movie_id = Movie::where('title', $request->movieName)->first()->id;
        MovieShow::where('hall_id', $request->hall_id)->where('movie_id', $movie_id)->where('start_time', $request->movieTime)->first()->delete();
        if (!MovieShow::find($request->hall_id)) {
            $hall = Hall::where('id', $request->hall_id)->first();
            $hall->is_active = 0;
            $hall->save();
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Price;
use App\Models\TakenPlace;
use Illuminate\Http\Request;

class TakenPlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TakenPlace::all();
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
     * @param  \App\Models\TakenPlace  $takenPlace
     * @return \Illuminate\Http\Response
     */
    public function show(TakenPlace $takenPlace)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TakenPlace  $takenPlace
     * @return \Illuminate\Http\Response
     */
    public function edit(TakenPlace $takenPlace)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
//     * @param  \App\Models\TakenPlace  $takenPlace
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $hall_id = Hall::where('name', $request->hallName)->first()->id;

        $placesArray = [];
        $totalPrice = 0;
        $standartPrice = Price::where('hall_id', $hall_id)->where('status', 'standart')->first()->price;
        $standartVip = Price::where('hall_id', $hall_id)->where('status', 'vip')->first()->price;
        for ($i = 0; $i < count($request->takenPlaces); $i++) {
            $row = (string)$request->takenPlaces[$i]['row'];
            $place = (string)$request->takenPlaces[$i]['place'];
            $status = $request->takenPlaces[$i]['type'];
            if ($status === 'standart') {
                $price = $standartPrice;
            }
            if ($status === 'vip') {
                $price = $standartVip;
            }
            $str = $row . '/' . $place;
            array_push($placesArray, $str);
            $totalPrice += $price;
        }
        $takenPlacesStr = join(', ', $placesArray);

        return route('payment', ['movie_title' => $request->movie, 'start_time' => $request->seance, 'hall_name' => $request->hallName, 'takenPlaces' => $takenPlacesStr, 'total_price' => $totalPrice, 'takenPlacesArr' => $request->takenPlaces]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TakenPlace  $takenPlace
     * @return \Illuminate\Http\Response
     */
    public function destroy(TakenPlace $takenPlace)
    {
        //
    }
}

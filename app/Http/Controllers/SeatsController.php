<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Seat;
use App\Models\Hall;
use App\Http\Resources\Post;

class SeatsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Post::collection(Seat::all());
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
        return Post::collection(Seat::all()->where('hall_id', $id));
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
        $newData = json_decode($request->status);
        $hall = Hall::findOrFail($id);
        $hall->row = $request->row;
        $hall->seats = $request->seats;
        $hall->save();
        $seatsArr = Seat::all()->where('hall_id', $id);
        foreach($seatsArr as $seat) {
            $seat->delete();
        }

        foreach ($newData as $value) {
            $seat = new Seat([
                'hall_id' =>  $value->hall_id,
                'seat_number' => $value->seat_number,
                'status' => $value->status,
            ]);
            $seat->save();
        }
        return "Update successful";
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

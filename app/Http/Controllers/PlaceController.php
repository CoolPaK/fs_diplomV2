<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\HallSize;
use App\Models\Place;
use App\Models\TakenPlace;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Place::all();
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
    public function store($result)
    {
        $hall_id = $result[0]['hall_id'];
        Place::where('hall_id', $hall_id)->delete();

        foreach ($result as $key => $value) {
            Place::create([
                'hall_id' => $value['hall_id'],
                'row_num' => $value['row_num'],
                'seat_num' => $value['seat_num'],
                'status' => $value['status']
            ]);
        }
        return redirect()->route('admin');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $hall_id
     * @return \Illuminate\Http\Response
     */
    public function show(int $hall_id)
    {
        return Place::where('hall_id', '=', $hall_id)->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function edit(Place $place)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        if ($request->hallSize['rows'] !== 0 && $request->hallSize['rows'] !== 0) {
            $hall = HallSize::where('id', $request->result[0]['hall_id'])->first();
            $hall->rows = $request->hallSize['rows'];
            $hall->cols = $request->hallSize['cols'];
            $hall->save();

            $h = Hall::where('id', $request->result[0]['hall_id'])->first();
            TakenPlace::where('hall_id', $hall->id)->delete();
            for ($s = 0; $s < $h->seances->count(); $s++) {
                for ($r = 0; $r < (int)$request->hallSize['rows']; $r++) {
                    for ($c = 0; $c < (int)$request->hallSize['cols']; $c++) {
                        TakenPlace::create([
                            'hall_id' => $hall->id,
                            'seance_id' => $s + 1,
                            'row_num' => $r,
                            'seat_num' => $c,
                            'taken' => false,
                        ]);
                    }
                }
            }
        }

        foreach ($request->result as $key => $value) {
            $seat = Place::where('hall_id', $value['hall_id'])->where('row_num', $value['row_num'])->where('seat_num', $value['seat_num'])->first();
            if ($seat === null) {
                return $this->store($request->result);
            } else {
                $seat->status = $value['status'];
                $seat->save();
            }
        }
        return $request->hallSize;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Place  $seat
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (Place::where('hall_id', $id)->delete()) {
            return redirect()->route('admin');
        }
        return null;
    }
}

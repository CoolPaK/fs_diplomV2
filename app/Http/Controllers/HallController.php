<?php

namespace App\Http\Controllers;

use App\Http\Requests\HallRequest;
use App\Models\Hall;
use App\Models\HallSize;
use App\Models\Movie;
use App\Models\MovieShow;
use App\Models\Place;
use App\Models\Price;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class HallController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $halls = Hall::with('seances', 'seats')->join('hall_sizes', 'hall_sizes.id', '=', 'halls.id')->get();
        $movie = Movie::all();
        $movieShow = MovieShow::all();

        if (Auth::user()->is_admin !== '1') {
            return redirect('/index');
        }
        return view('admin.admin', ['seats' => $this->seats($halls), 'hallSeances' => $this->hallSeances($halls, $movie), 'hallIsActive' => $this->activeHall($halls, $movieShow)
        ], compact('halls'));
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
     * @param  HallRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(HallRequest $request)
    {
        Hall::create($request->validated());
        $hall_id = Hall::where('name', $request->name)->first()->id;
        return ['hall_id' => $hall_id, 'hall_name' => $request->name];
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        return Hall::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Hall  $hall
     * @return \Illuminate\Http\Response
     */
    public function edit(Hall $hall)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param HallRequest $request
     * @param  \App\Models\Hall  $hall
     * @return \Illuminate\Http\Response
     */
    public function update(HallRequest $request, Hall $hall)
    {
        $hall->fill($request->validated());
        return $hall->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Hall  $hall
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Hall::find($request->hall_id)->delete();
        HallSize::find($request->hall_id)->delete();
        Place::where('hall_id', $request->hall_id)->delete();
        Price::where('hall_id', $request->hall_id)->delete();
    }

    /**
     * Set hall active status
     *
     * @param  int $id
     * @param bool $is_active
     * @return \Illuminate\Http\Response
     */

    public function setActive(Request $request)
    {
        $hall = Hall::findOrFail($request->id);
        if ($hall->is_active == true) {
            $hall->is_active = false;
            $hall->save();
            return ['Открыть продажу билетов', 'Зал Готов к открытию'];
        } else {
            if (!Place::where('hall_id', $hall->id)->first()) {
                $hall->is_active = false;
                return ['Открыть продажу билетов', 'Установите конфигурацию зала'];
            }
            if (!Price::where('hall_id', $hall->id)->first()) {
                $hall->is_active = false;
                return ['Открыть продажу билетов', 'Установите конфигурацию цен в зале'];
            }
            $hall->is_active = true;
            $hall->save();
            return ['Закрыть продажу билетов', 'Продажа билетов окрыта'];
        }
    }

    public function hallSeances($halls, $movie)
    {
        $arr = [];

        for ($i = 0; $i < $halls->count(); $i++) {
            for ($j = 0; $j < $halls[$i]->seances->count(); $j++) {
                $arr[$halls[$i]->id][$j] = [];
                try {
                    $d = (int)($movie->where('id', $halls[$i]->seances[$j]->movie_id)->first()->duration) / 2;
                    $st = (int)($halls[$i]->seances[$j]->start_time) * 30;
                    $mn = $movie->where('id', $halls[$i]->seances[$j]->movie_id)->first()->title;
                    array_push($arr[$halls[$i]->id][$j], $d);
                    array_push($arr[$halls[$i]->id][$j], $st);
                    array_push($arr[$halls[$i]->id][$j], $mn);
                } catch (\Exception $e) {
                    array_push($arr, null);
                }
            }
        }
        return $arr;
    }

    public function seats($halls)
    {
        $arr = [];
        foreach ($halls as $key => $value) {
            $hall = $halls->where('id', $value->id)->first();
            for ($i = 0; $i < $value->rows; $i++) {
                for ($j = 0; $j < $value->cols; $j++) {
                    $arr[$hall->name][$i][$j] = [];
                    try {
                        $seatStatus = $hall->seats->where('row_num', $i)->where('seat_num', $j)->first()->status;
                        array_push($arr[$hall->name][$i][$j], $seatStatus);
                    } catch (\Exception $e) {
                        array_push($arr[$hall->name][$i][$j], 'standart');
                    }
                }
            }
        }
        return $arr;
    }

    public function activeHall($halls, $movieShow)
    {
        $arr = [];
        foreach ($halls as $key => $value) {
            $arr[$value->id] = [];
            if ($movieShow->where('hall_id', $value->id)->first()) {
                array_push($arr[$value->id], 'is_active');
            } else {
                array_push($arr[$value->id], null);
            }
        }
        return $arr;
    }
}

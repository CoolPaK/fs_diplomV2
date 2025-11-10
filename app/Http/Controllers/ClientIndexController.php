<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Movie;
use Carbon\Carbon;

class ClientIndexController extends Controller
{
    public function index()
    {
        $movies = Movie::all();
        $halls = Hall::where('is_active', 1)->with('seances')->get();
        return view('client.index', ['hallsShow' => $this->movieShow($halls, $movies), 'weekDayRus' => $this->getWeekDayRus()], compact('halls'));
    }

    public function movieShow($halls, $movies) {
        $arr = [];
        for($i = 0; $i < $movies->count(); $i++) {
            for($j = 0; $j < count($halls); $j++) {
                $arr[$i][$j] = [];
                try {
                    $hallId = $halls[$j]->seances->where('movie_id', $movies[$i]->id)->first()->hall_id;
                    $hallName = $halls->where('id', $hallId)->first()->name;
                    $isActive = $halls->where('id', $hallId)->first()->is_active;
                    if($isActive) {
                        array_push($arr[$i][$j], $hallName);
                    } else {
                        array_push($arr[$i][$j], null);
                    }
                } catch (\Exception $e) {
                    array_push($arr[$i][$j], null);
                }
            }
        }
        return $arr;
    }

    public function getWeekDayRus() {
        $days = array(
            'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
        );

        $arr = [];
        for($i = 0; $i < 7; $i++) {
            $date = Carbon::now();
            $arr[$i] = [];
            $date->addDays($i);
            $myDay = $date->format('w');
            $weekEnd = (($myDay == 0) || ($myDay == 6)) ? 'page-nav__day_weekend' : '';
            $timeStamp = $date->getTimeStamp();

            $result = array('day' => $date->format('j'),
                'dayWeek' => $days[$myDay],
                'weekEnd' => $weekEnd,
                'timeStamp' => $timeStamp);
            array_push($arr[$i], $result);
        }
        return $arr;
    }
}

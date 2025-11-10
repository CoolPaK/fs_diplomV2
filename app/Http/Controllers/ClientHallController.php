<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Hall;
use App\Models\MovieShow;
use Illuminate\Http\Request;

class ClientHallController extends Controller
{
    public function index()
    {
        $halls = Hall::where('is_active', 1)
            ->join('prices', 'prices.hall_id', '=', 'halls.id')
            ->join('hall_sizes', 'hall_sizes.id', '=', 'halls.id')
            ->select('halls.*', 'prices.status', 'prices.price', 'hall_sizes.rows', 'hall_sizes.cols')
            ->with('seats', 'takenSeat')
            ->get();
        $hall_name = $_GET['hall_name'];
        $hall = $halls->where('name', $hall_name)->first();
        $movie_title = $_GET['movie'];
        $start_time = $_GET['start_time'];
        $movie = MovieShow::all();

        $rows = $halls->where('id', $hall->id)->first()->rows;
        $cols = $halls->where('id', $hall->id)->first()->cols;

        $seats = $this->seats($start_time, $halls, $movie);

        return view('client.hall', [
            'hall_name' => $hall_name,
            'hall' => $hall,
            'movie_title' => $movie_title,
            'start_time' => $start_time,
            'seats' => $seats,
            'rows' => $rows,
            'cols' => $cols
        ], compact('halls'));
    }

    public function seats($start_time, $halls, $movie)
    {
        foreach ($halls as $key => $value) {
            $hall = $halls->where('id', $value->id)->first();
            $rows = $value->rows;
            $cols = $value->cols;

            for ($i = 0; $i < $value->rows; $i++) {
                for ($j = 0; $j < $value->cols; $j++) {
                    $arr[$value->id][$i][$j] = [];
                    try {
                        $seance_id = $movie->where('hall_id', $value->id)->where('start_time', $start_time)->first()->id;
                        $s = $hall->seats->where('row_num', $i)->where('seat_num', $j)->first()->status;
                        if ($hall->takenSeat->where('hall_id', $hall['id'])->where('seance_id', $seance_id)->where('row_num', $i)->where('seat_num', $j)->first()->taken) {
                            $s = 'taken';
                        }
                        array_push($arr[$value->id][$i][$j], $s);
                    } catch (\Exception $e) {
                        array_push($arr[$value->id][$i][$j], 'standart');
                    }
                }
            }
        }
        return $arr;
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\MovieShow;
use App\Models\TakenPlace;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class ClientTicketController extends Controller
{
    public function index()
    {
        $hall_name = $_GET['hall_name'];
        $movie_title = $_GET['movie_title'];
        $start_time = $_GET['start_time'];
        $places = $_GET['places'];
        $takenPlaces = $_GET['taken_places'];
        
        $QRtext = 'Фильм: ' . $movie_title . PHP_EOL . 'Зал: ' . $hall_name . PHP_EOL . 'Ряд/Место: ' . $places . PHP_EOL . PHP_EOL . 'Начало сеанса: ' . $start_time;
        $qr = QrCode::encoding('UTF-8')->size(200)->generate($QRtext);

        $this->hallUpdate($hall_name, $start_time, $takenPlaces);

        return view('client.ticket', [
            'hall_name' => $hall_name,
            'movie_title' => $movie_title,
            'start_time' => $start_time,
            'places' => $places,
            'qr' => $qr,
        ]);
    }

    public function hallUpdate($hallName, $seanceTime, $takenPlaces) 
    {
        $hall = Hall::where('name', $hallName)->first();
        if (!$hall) {
            \Log::error("Hall not found: {$hallName}");
            return;
        }

        $seance = MovieShow::where('hall_id', $hall->id)
                          ->where('start_time', $seanceTime)
                          ->first();
        if (!$seance) {
            \Log::error("Seance not found for hall: {$hall->id}, time: {$seanceTime}");
            return;
        }

        foreach ($takenPlaces as $place) {
            $row = $place['row'] ?? null;
            $seatNum = $place['place'] ?? null;
            
            if (!$row || !$seatNum) {
                \Log::warning("Invalid place data: " . json_encode($place));
                continue;
            }

            $seat = TakenPlace::where([
                'hall_id' => $hall->id,
                'seance_id' => $seance->id,
                'row_num' => $row - 1,
                'seat_num' => $seatNum - 1
            ])->first();

            if (!$seat) {
                $seat = new TakenPlace();
                $seat->hall_id = $hall->id;
                $seat->seance_id = $seance->id;
                $seat->row_num = $row - 1;
                $seat->seat_num = $seatNum - 1;
            }

            $seat->taken = 1;
            $seat->save();
        }
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Post;
use App\Models\Ticket;
use App\Models\MovieShow;
use SimpleSoftwareIO\QrCode\Generator;
use SimpleSoftwareIO\QrCode\Facades\QrCode;


class TicketController extends Controller
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

        $newTicket = new Ticket([
            'show_id' =>  $request->show_id,
            'seats' => $request->seats,
            'start_day' => $request->start_day,
            'start_time' => $request->start_time,
            'hall_name' => $request->hall_name,
            'film' => $request->film,
            'price' => $request->price,
        ]);
        $newTicket->save();
        $show = MovieShow::findOrFail($request->show_id);
        $newOrder = json_decode($request->seats);
        $ordered = json_decode($show->ordered);
        foreach ($newOrder as $order) {
            $ordered[] = $order;
        }
        $orderOutput = json_encode($ordered);
        $show->ordered = $orderOutput;
        $show->save();
        return $newTicket->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new Post(Ticket::findOrFail($id));
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

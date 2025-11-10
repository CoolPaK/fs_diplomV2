<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateHallSizeRequest;
use App\Models\HallSize;
use App\Http\Requests\HallSizeRequest;
use Illuminate\Http\Response;

class HallSizeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return HallSize::all();
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
     * @param  HallSizeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(HallSizeRequest $request)
    {
        HallSize::insertGetId($request->validated());
        return $request;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HallSize  $hallSize
     * @return \Illuminate\Http\Response
     */
    public function show(int $hall_id)
    {
        return HallSize::findOrFail($hall_id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HallSize  $hallSize
     * @return \Illuminate\Http\Response
     */
    public function edit(HallSize $hallSize)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateHallSizeRequest  $request
     * @param  \App\Models\HallSize  $hallSize
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateHallSizeRequest $request, HallSize $hallSize)
    {
        $hallSize->fill($request->validated());
        return $hallSize->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HallSize  $hallSize
     * @return \Illuminate\Http\Response
     */
    public function destroy(HallSize $hallSize)
    {
        if ($hallSize->delete()) {
            return response(null, Response::HTTP_NO_CONTENT);
        }
        return null;
    }
}


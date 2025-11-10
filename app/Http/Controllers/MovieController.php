<?php

namespace App\Http\Controllers;


use App\Models\Movie;
use App\Models\MovieShow;
use Illuminate\Http\Request;
use App\Http\Requests\MovieRequest;
use Illuminate\Http\Response;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Movie::all();
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
    public function store(MovieRequest $request)
    {
        Movie::create($request->validated());
    }

    /**
     * Display the specified resource.
     *
//     * @param  \App\Models\Movie  $movie
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        return Movie::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function edit(Movie $movie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Movie $movie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $movie_id = Movie::where('title', $request->title)->first()->id;
        Movie::where('id', $movie_id)->first()->delete();
        MovieShow::where('movie_id', $movie_id)->delete();
    }
}

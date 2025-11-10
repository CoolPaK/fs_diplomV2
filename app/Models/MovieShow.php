<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovieShow extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'hall_id', 'movie_id', 'start_time'
    ];

    public function movie()
    {
        return $this->belongsTo(Movie::class, 'movie_id');
    }

    public function hall()
    {
        return $this->belongsTo(Hall::class);
    }

    public function takenPlaces()
    {
        return $this->hasMany(TakenPlace::class, 'seance_id');
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'show_id',
        'seats',
        'price',
        'start_day',
        'start_time',
        'hall_name',
        'film',
    ];

    protected $table = 'tickets';
}

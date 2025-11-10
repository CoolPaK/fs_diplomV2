<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'name'
    ];

    protected $casts = [
        'is_active' => 'integer'
    ];

    public function seances()
    {
        return $this->hasMany(\App\Models\MovieShow::class);
    }

    public function seats()
    {
        return $this->hasMany(\App\Models\Place::class);
    }

    public function takenSeat()
    {
        return $this->hasMany(\App\Models\TakenPlace::class);
    }
}

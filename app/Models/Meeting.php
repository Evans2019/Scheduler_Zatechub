<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'note',
        'channel',
        'date',
        'slug',
        'start_time',
        'end_time',
        'time_zone',
        'creator_name',
        'creator_email',
        'user_id'
    ];
}

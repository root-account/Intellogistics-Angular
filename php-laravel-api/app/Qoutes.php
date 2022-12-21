<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Qoutes extends Model
{

    protected $table = 'qoute_details';

    const CREATED_AT = 'date_created';
    const UPDATED_AT = 'date_modified';

    protected $fillable = [];
    protected $guarded = ['id'];

    protected $hidden = [
    'id'

    ];

}

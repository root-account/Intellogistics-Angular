<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rates extends Model
{

    protected $table = 'rates_main';

    const CREATED_AT = 'date_created';
    const UPDATED_AT = 'date_modified';

    protected $fillable = [];
    protected $guarded = ['id'];


}

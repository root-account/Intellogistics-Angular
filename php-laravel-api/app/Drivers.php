<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Drivers extends Model
{

    protected $table = 'drivers';

    const CREATED_AT = 'date_created';
    const UPDATED_AT = 'date_modified';

    protected $fillable = [];
    protected $guarded = ['id'];

    protected $hidden = ['password', 'api_key', 'user_type', 'id'];

}

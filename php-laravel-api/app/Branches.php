<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Branches extends Model
{

    protected $table = 'branches';

    const CREATED_AT = 'date_created';
    const UPDATED_AT = 'date_modified';

    protected $fillable = [];
    protected $guarded = ['id'];


}

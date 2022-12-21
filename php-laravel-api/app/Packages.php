<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Packages extends Model
{

    protected $table = 'packages';

    const CREATED_AT = 'date_created';
    const UPDATED_AT = 'date_modified';

    protected $fillable = [];
    protected $guarded = ['id'];

    protected $hidden = [
    'id'

    ];

}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoices extends Model
{

    protected $table = 'invoices';

    const CREATED_AT = 'date_created';
    const UPDATED_AT = 'date_modified';

    protected $fillable = [];
    protected $guarded = ['id'];


}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServiceProviders extends Model
{

    protected $table = 'service_providers';

    const CREATED_AT = 'date_created';
    const UPDATED_AT = 'date_modified';

    protected $fillable = [];
    protected $guarded = ['id'];


}

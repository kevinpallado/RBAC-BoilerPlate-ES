<?php

namespace Modules\Setup\BuildingAndRooms\Models;

use Illuminate\Database\Eloquent\Model;

class Buildings extends Model
{
    protected $table = 'buildings';
    protected $primaryKey = 'BldgID';
    protected $fillable = array(
        'CampusID',
        'BldgName',
        'BldgOtherName',
        'Acronym',
        'FloorsCount',
        'BldgPictures',
        'IsLANReady',
        'Elevator',
        'Escalator',
        'ShortName'
    );
}
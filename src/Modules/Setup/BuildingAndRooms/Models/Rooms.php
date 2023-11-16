<?php

namespace Modules\Setup\BuildingAndRooms\Models;

use Illuminate\Database\Eloquent\Model;

class Rooms extends Model
{
    protected $table = 'rooms';
    protected $primaryKey = 'RoomID';
    protected $fillable = array(
        'BldgID',
        'Floor',
        'RoomNo',
        'RoomName',
        'RoomTypeID',
        'Capacity',
        'IsAirConditioned',
        'IsUsable',
        'IsLANMember',
        'AllowNightClass',
        'Shared',
        'IsReservable'
    );
}
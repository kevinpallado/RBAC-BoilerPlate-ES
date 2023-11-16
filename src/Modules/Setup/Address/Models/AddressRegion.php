<?php

namespace Modules\Setup\Address\Models;

use Illuminate\Database\Eloquent\Model;

class AddressRegion extends Model
{
    protected $table = 'philregions';
    protected $primaryKey = 'RegionID';
    protected $fillable = array(
        'RegionName',
        'ShortName',
        'CountryID'
    );

    public function province() {
        return $this->hasMany(AddressProvince::class, 'RegionID', 'RegionID');
    }
}
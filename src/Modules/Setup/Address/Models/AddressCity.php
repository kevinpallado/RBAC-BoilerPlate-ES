<?php

namespace Modules\Setup\Address\Models;

use Illuminate\Database\Eloquent\Model;

class AddressCity extends Model
{
    protected $table = 'address_cities';
    protected $primaryKey = 'CityID';
    protected $fillable = array(
        'CityName',
        'PopularName',
        'OldName',
        'ZipCode',
        'ProvinceID',
        'CountryCode'
    );

    public function province() {
        return $this->belongsTo(AddressProvince::class, 'ProvinceID', 'ProvinceID');
    }

    public function barangay() {
        return $this->hasMany(AddressBarangay::class ,'CityID', 'CityID');
    }
}
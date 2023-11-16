<?php

namespace Modules\Setup\Address\Models;

use Illuminate\Database\Eloquent\Model;

class AddressProvince extends Model
{
    protected $table = 'address_province';
    protected $primaryKey = 'ProvinceID';
    protected $fillable = array(
        'ProvinceName',
        'ShortName',
        'RegionID',
        'Sort'
    );

    public function cities() {
        return $this->hasMany(AddressCity::class, 'ProvinceID', 'ProvinceID');
    }
}
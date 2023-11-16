<?php

namespace Modules\Setup\Address\Models;

use Illuminate\Database\Eloquent\Model;

class AddressBarangay extends Model
{
    protected $table = 'address_barangay';
    protected $primaryKey = 'BrgyID';
    protected $fillable = array(
        'BrgyName',
        'District',
        'Zone',
        'Inactive',
        'CityID'
    );

    public function city() {
        return $this->belongsTo(AddressCity::class, 'CityID', 'CityID');
    }
}
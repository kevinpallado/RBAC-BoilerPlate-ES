<?php

namespace Modules\Setup\ProfileStatus\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileCivilStatus extends Model
{
    protected $table = 'civilstatus';
    protected $primaryKey = 'StatusID';
    protected $fillable = array(
        'CivilDesc',
        'DateModified',
        'ModifiedBy',
        'DateCreated',
        'CreatedBy'
    );
}
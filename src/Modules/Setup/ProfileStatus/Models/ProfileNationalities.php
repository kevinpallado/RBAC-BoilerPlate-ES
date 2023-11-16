<?php

namespace Modules\Setup\ProfileStatus\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileNationalities extends Model
{
    protected $table = 'nationalities';
    protected $primaryKey = 'NationalityID';
    protected $fillable = array(
        'Nationality',
        'ShortName',
        'MotherTongue',
        'IsForeign',
        'SeqNo',
        'DateModified',
        'ModifiedBy',
        'DateCreated',
        'CreatedBy'
    );
}
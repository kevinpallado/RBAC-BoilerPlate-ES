<?php

namespace Modules\Setup\Academic\Models;

use Illuminate\Database\Eloquent\Model;

class YearLevel extends Model
{
    protected $table = 'yearlevel';
    protected $primaryKey = 'YearLevelID';
    protected $fillable = array(
        'ProgClass',
        'YearLevelCode',
        'YearLevelName',
        'SeqNo',
        'Inactive',
        'YLID_OldValue',
        'ProgID',
        'ChineseName',
        'adm_inactive',
    );
}
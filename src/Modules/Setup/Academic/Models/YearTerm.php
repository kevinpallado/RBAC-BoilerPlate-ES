<?php

namespace Modules\Setup\Academic\Models;

use Illuminate\Database\Eloquent\Model;

class YearTerm extends Model
{
    protected $table = 'yearterms';
    protected $primaryKey = 'IndexID';
    protected $fillable = array(
        'TermCode',
        'YearLevelID',
        'YearTermDesc',
        'Remarks',
        'YearStatus',
        'SortOrder',
        'ProgClass',
        'Inactive'
    );
}

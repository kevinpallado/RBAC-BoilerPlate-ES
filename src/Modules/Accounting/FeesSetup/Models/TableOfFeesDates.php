<?php

namespace Modules\Accounting\FeesSetup\Models;

use Illuminate\Database\Eloquent\Model;

class TableOfFeesDates extends Model
{
    protected $table = 'tableoffees_dates';
    protected $primaryKey = 'IndexID';
    protected $fillable = [
        'TemplateID',
        'Date1',
        'Date2',
        'Date3',
        'Date4',
        'Date5',
        'Date6',
        'Date7',
        'Date8',
        'Date9',
        'Date10'
    ];
}
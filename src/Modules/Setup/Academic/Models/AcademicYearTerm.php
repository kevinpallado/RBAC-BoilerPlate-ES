<?php

namespace Modules\Setup\Academic\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicYearTerm extends Model
{
    protected $table = 'ayterm';
    protected $primaryKey = 'TermID';
    protected $fillable = array(
        'AcademicYear',
        'SchoolTerm',
        'StartofAY',
        'EndofAY',
        'ExpireReg',
        'ExpireDays',
        'Lock',
        'NumWeeks',
        'LastModified',
        'LastModifiedDate',
        'Hidden',
        'ExpireSaturday',
        'OverrideExpReg',
        'IsCurrentTerm',
        'Active_OnlineEnrolment',
        'AssessmentLock',
        'CondDueDate',
        'IncDueDate',
        'OpenAdmission',
        'NoOfTerm',
        'TermCode'
    );
}
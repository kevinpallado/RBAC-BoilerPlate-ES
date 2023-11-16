<?php

namespace Modules\Scheduling\AcademicSchedule\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicSchedules extends Model
{
    protected $table = 'academic_schedules';
    protected $primaryKey = 'IndexID';
    protected $fillable = array(
        'TermID',
        'CampusID',
        'StartDate',
        'FinishDate',
        'LateDate',
        'AcceptDate',
        'CollegeID',
        'ProgramID',
        'LevelID',
        'TypeID',
        'Expiry',
        'ExpiryDays',
        'SectionID',
        'program_class',
    );

    public function scheduleType() {
        return $this->belongsTo(EnrollmentScheduleLists::class, 'TypeID');
    }
}
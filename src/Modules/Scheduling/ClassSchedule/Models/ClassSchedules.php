<?php

namespace Modules\Scheduling\ClassSchedule\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
// models
use Modules\Management\Employee\Models\Employees;
use Modules\Registrar\Subjects\Models\Subjects;
use Modules\Setup\Academic\Models\AcademicYearTerm;
use Modules\Setup\BuildingAndRooms\Models\Rooms;

class ClassSchedules extends Model
{
    protected $table = 'classschedules';
    protected $primaryKey = 'ScheduleID';
    protected $fillable = array(
        'TermID',
        'SectionID',
        'SubjectID',
        'FacultyID',
        'Limit',
        'IsSpecialClass',
        'Time1_Start',
        'Time1_End',
        'Days1',
        'Room1_ID',
        'Time2_Start',
        'Time2_End',
        'Days2',
        'Room2_ID',
        'Time3_Start',
        'Time3_End',
        'Days3',
        'Room3_ID',
        'Time4_Start',
        'Time4_End',
        'Days4',
        'Room4_ID',
        'Time5_Start',
        'Time5_End',
        'Days5',
        'Room5_ID',
        'Days1_EventID',
        'Days2_EventID',
        'Days3_EventID',
        'Days4_EventID',
        'Days5_EventID',
        'Sched_1',
        'Sched_2',
        'Sched_3',
        'Sched_4',
        'Sched_5',
        'LastModifiedBy',
        'LastModifiedDate',
        'Cntr',
        'GradesPostingDate',
        'OverideConflict',
        'GradesPostingDate2',
        'IsDissolved',
        'MidtermGradesPostingDate',
        'MidtermGradesPostingBy',
        'GradesPostingBy',
        'IsHonorarium',
        'FacultyID_2',
        'FacultyID_3',
        'FacultyID_4',
        'FacultyID_5',
        'DatePosted',
        'PostedBy',
        'RoomDatePosted',
        'RoomPostedBy',
        'FacultyDatePosted',
        'FacultyPostedBy',
        'LoadTypeID',
        'EffectivityDate',
        'MergeWith',
        'FacultyLoad',
        'ActualHrPerWeek',
        'ScheduleCode',
        'TransferedSubjectID',
        'SubmittedGradeDate',
        'SubmittedGradeTo',
        'IsCustomSched',
        'GradingSystemSettingsID',
        'FacultybyGender',
    );

    public function classSection() {
        return $this->belongsTo(ClassSections::class, 'SectionID', 'SectionID');
    }

    public function subjects() {
        return $this->belongsTo(Subjects::class, 'SubjectID', 'SubjectID');
    }

    public function ayterm() {
        return $this->belongsTo(AcademicYearTerm::class, 'TermID', 'TermID');
    }

    public function faculty() {
        return $this->belongsTo(Employees::class, 'FacultyID', 'EmployeeID');
    }

    public function room1_Id() {
        return $this->belongsTo(Rooms::class, 'Room1_ID', 'RoomID');
    }
    
    public function room2_Id() {
        return $this->belongsTo(Rooms::class, 'Room2_ID', 'RoomID');
    }

    public function room3_Id() {
        return $this->belongsTo(Rooms::class, 'Room3_ID', 'RoomID');
    }

    public function room4_Id() {
        return $this->belongsTo(Rooms::class, 'Room4_ID', 'RoomID');
    }

    public function room5_Id() {
        return $this->belongsTo(Rooms::class, 'Room5_ID', 'RoomID');
    }
}
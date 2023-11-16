<?php

namespace Modules\Registrar\Registrations\Models;

use Illuminate\Database\Eloquent\Model;
// models
use Modules\Scheduling\ClassSchedule\Models\ClassSchedules;

class RegistrationDetails extends Model
{
    protected $table = 'registrationdetails';
    protected $primaryKey = 'ReferenceID';
    protected $fillable = array(
        'RegID',
        'ScheduleID',
        'RegTagID',
        'RefNo',
        'CSTargetScheduleID',
        'Default',
        'SeqNo',
        'ScheduleID_Old',
        'WithdrawnSchedID',
        'SpecialSubjectTransNo',
        'GroupSectionID',
        'IsEvaluated',
    );

    public function registration() {
        return $this->belongsTo(Registrations::class, 'RegID', 'RegID');
    }

    public function classSchedules() {
        return $this->hasMany(ClassSchedules::class, 'ScheduleID', 'ScheduleID');
    }

    public function subjectClassSchedule() {
        return $this->hasOne(ClassSchedules::class, 'ScheduleID', 'ScheduleID');
    }

    public function registerLoadTags() {
        return $this->hasOne(RegisterLoadTags::class, 'RegTagID', 'RegTagID');
    }
}
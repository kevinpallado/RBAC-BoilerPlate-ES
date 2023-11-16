<?php

namespace Modules\Scheduling\ClassSchedule\Models;

use Illuminate\Database\Eloquent\Model;

class ClassSections extends Model
{
    protected $table = 'classsections';
    protected $primaryKey = 'SectionID';
    protected $fillable = array(
        'SectionName',
        'TermID',
        'CampusID',
        'CollegeID',
        'CurriculumID',
        'ProgramID',
        'AdviserID',
        'IsBlock',
        'RoomID',
        'Limit',
        'CreationDate',
        'YearLevelID',
        'CreatedBy',
        'IsEvening',
        'IsDissolved',
        'ShortName',
        'ClassTypeID',
        'SectionName_2',
        'Is2ndSection',
        'Elective',
    );
}
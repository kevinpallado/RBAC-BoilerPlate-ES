<?php

namespace Modules\Setup\Academic\Models;

use Illuminate\Database\Eloquent\Model;

class Programs extends Model
{
    protected $table = 'programs';
    protected $primaryKey = 'ProgID';
    protected $fillable = array(
        'CampusID',
        'CollegeID',
        'ProgCode',
        'ProgName',
        'ProgShortName',
        'ProgYears',
        'ProgSems',
        'MaxResidency',
        'TotalAcadSubject',
        'TotalAcadCreditUnits',
        'TotalNormalLoad',
        'TotalGenEdUnits',
        'TotalMajorUnits',
        'TotalElectiveUnits',
        'TotalLectureUnits',
        'TotalNonLectUnits',
        'ProgDiscipline',
        'ProgRecognize',
        'ProgRevise',
        'ProgClass',
        'ProgStatus',
        'ProgLadder',
        'ProgParent',
        'BoardExam',
        'ThesisReqID',
        'Semestral',
        'ProgChairID',
        'MajorDiscGroupCode',
        'Accreditation',
        'NumberCode',
        'ProgAlias',
        'Weight',
        'SortOrder',
        'Remarks',
        'ProgAlias2',
        'OldProgID',
        'AllowMultipleRegistration',
        'Display_Online',
        'GradingSystemComponentsVisible',
        'GradingSystemNoofAbsentVisible',
        'GradingSystemComponentsID',
        'StandardYearLeveling',
        'CostCenterID',
        'AdmissionPolicy',
        'IsGeneral',
        'ChineseName',
        'FreeEducation',
        'MinimumGWARequired',
        'IDColor',
        'EnableAdmitAdmissionApproval',
        'EnableAdmitApprovalDate',
    );
}
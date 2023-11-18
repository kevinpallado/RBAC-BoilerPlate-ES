<?php

namespace Modules\ClassRecords\GradeEncoding\Models;

use Illuminate\Database\Eloquent\Model;
// models
use Modules\Registrar\Subjects\Models\Subjects;
use Modules\Setup\Academic\Models\AcademicYearTerm;
use Modules\Scheduling\ClassSchedule\Models\ClassSchedules;

class PermanentRecordDetails extends Model
{
    protected $table = 'permanentrecord_details';
    protected $primaryKey = 'GradeIDX';
    protected $fillable = array(
        'SummaryID',
        'RegID',
        'CampusID',
        'TermID',
        'ProgClassID',
        'ProgramID',
        'YearLevelID',
        'StudentNo',
        'ScheduleID',
        'SubjectID',
        'SubjectCode',
        'SubjectTitle',
        'SubjectCreditUnits',
        'CreditedUnit',
        'CreditedUnits',
        'IsClubbing',
        'IsNonAcademic',
        'ParentSubjectID',
        'AverageA',
        'AverageB',
        'TotalAverageAB',
        'AverageC',
        'AverageD',
        'AverageE',
        'TotalAverageCD',
        'Final_Average',
        'Final_Remarks',
        'IsConduct',
        'ConductA',
        'ConductB',
        'ConductC',
        'ConductD',
        'Conduct_FinalAverage',
        'Conduct_FinalRemarks',
        'LastSchoolID',
        'LastSchoolName',
        'DatePosted',
        'PostedBy',
        'LastModifiedDate',
        'LastModifiedBy',
        'CorrectionDate',
        'CorrectionBy',
        'SeqNo',
        'SubjectGroupID',
        'DatePosted1',
        'PostedBy1',
        'DatePosted2',
        'PostedBy2',
        'DatePosted3',
        'PostedBy3',
        'DatePosted4',
        'PostedBy4',
        'DatePosted5',
        'PostedBy5',
        'PeriodGrade1',
        'PeriodGrade2',
        'PeriodGrade3',
        'PeriodGrade4',
        'PeriodGrade5',
        'IsSemestral',
        'IsNonConduct',
        'SuppressSubject',
        'SuppressAcademicGrade',
        'SuppressConductGrade',
        'IsExclConductCompute',
        'IsExclAverageCompute',
        'Weight',
        'ShowOnReport',
        'ConductUnit',
        'Final_Equivalent',
        'ElectiveSubjectID',
        'GradeIDX_fromES_Grades',
        'LastSchoolAddress',
        'DateEntered',
        'LastSchoolGrade',
        'IsMigrated',
        'EquivalentSubjectID',
        'ShowInTranscript',
        'ThesisSubject',
        'ThesisTitle'
    );

    public function ayterm() {
        return $this->belongsTo(AcademicYearTerm::class, 'TermID', 'TermID');
    }

    public function classSchedules() {
        return $this->belongsTo(ClassSchedules::class, 'ScheduleID', 'ScheduleID');
    }

    public function subjects() {
        return $this->belongsTo(Subjects::class, 'SubjectID', 'SubjectID');
    }
}
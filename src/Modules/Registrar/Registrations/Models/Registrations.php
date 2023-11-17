<?php

namespace Modules\Registrar\Registrations\Models;

use Illuminate\Database\Eloquent\Model;
// models
use Modules\Accounting\FeesSetup\Models\TableOfFees;
use Modules\Accounting\FeesSetup\Models\TableOfFeesDates;
use Modules\Registrar\Students\Models\Students;
use Modules\Setup\Academic\Models\AcademicYearTerm;
use Modules\Setup\Academic\Models\YearLevel;

class Registrations extends Model
{
    protected $table = 'registrations';
    protected $primaryKey = 'RegID';
    protected $fillable = array(
        'RegID',
        'StudentNo',
        'RegDate',
        'ExpireDate',
        'TermID',
        'CampusID',
        'AdvisingOfficerID',
        'ValidatingOfficerID',
        'ValidationDate',
        'ORNo',
        'AssessedFees',
        'Discount',
        'TableofFeeID',
        'SchoProviderType',
        'SchoProviderID',
        'SchoAllAccount',
        'SchoPercentage',
        'GrantTemplateID',
        'LastPrintoutDate',
        'LastModifiedBy',
        'LastModifiedDate',
        'AssessedBy',
        'AssessedDate',
        'FirstPaymentDueDate',
        'SecondPaymentDueDate',
        'ThirdPaymentDueDate',
        'FourthPaymentDueDate',
        'FifthPaymentDueDate',
        'ClassSectionID',
        'IsWithdrawal',
        'YearLevelID',
        'YearLevelID_2',
        'TotalAssessment',
        'TotalFinancialAid',
        'TotalNetAssessed',
        'TotalPayment',
        'TotalDiscount',
        'TotalNonLedger',
        'TotalRefund',
        'TotalBalance',
        'CollegeID',
        'ProgID',
        'MajorID',
        'DateGradeCardGenerated',
        'RetentionStatus',
        'SubjectsEnrolled',
        'CreditUnitsEnrolled',
        'CreditUnitsEarned',
        'GWA',
        'AcademicScholarship',
        'RedRemarks',
        'NumberofPayments',
        'TotalDebitMemo',
        'TotalCreditMemo',
        'ReservationORNo',
        'ReservationAmount',
        'ReservationMemoID',
        'RemovedValidationBy',
        'RemovedValidationDate',
        'SchoDelinquencyRemarks',
        'DateWithdrawn',
        'Remarks',
        'TotalLecUnits',
        'TotalLabUnits',
        'ValidationType',
        'SchoOptionID',
        'TotalFinancialAidExternal',
        'SessionID',
        'TotalPreviousBalance',
        'MaxUnitsAllowed',
        'SchoStatusID',
        'AwardNo',
        'SixthPaymentDueDate',
        'SeventhPaymentDueDate',
        'EightPaymentDueDate',
        'NinethPaymentDueDate',
        'TenthPaymentDueDate',
        'ConfigDateID',
        'NonZeroBase',
        'IsResidencyOnly',
        'DateCapturePhoto',
        'DateCaptureSign',
        'DateIDPrinted',
        'ClassSectionID_2',
        'IsOnlineEnrolment',
        'OrigMaxLoadUnits',
        'BillingRefNo',
        'IsGraduating',
        'IsRegularStudent',
        'IsNewStudent',
        'EnrolmentStatus',
        'PaymentMethod',
        'ReportCard_Comments',
        'ReportCard_Comments_2',
        'BillingNotes',
        'Registered',
        'internet_connection',
        'UniFastScholar',
        'UniFastScholarDate',
        'StatusID'
    );

    public function registrationDetails() {
        return $this->hasMany(RegistrationDetails::class, 'RegID', 'RegID');
    }

    public function ayterm() {
        return $this->belongsTo(AcademicYearTerm::class, 'TermID', 'TermID');
    }

    public function tableOfFeesDueDates()
	{
		return $this->hasOneThrough(TableOfFeesDates::class, TableOfFees::class, 'TemplateID','TemplateID','TableofFeeID', 'TemplateID');
	}

    public function yearlevel()
    {
        return $this->belongsTo(YearLevel::class, 'YearLevelID', 'YearLevelID');
    }

    public function installmentBalance()
	{
		return $this->hasOne(RegistrationInstallmentBalance::class, 'RegID', 'RegID');
	}

    public function students()
    {
        return $this->belongsTo(Students::class, 'StudentNo', 'StudentNo');
    }

    static function arrangeSchedulesByDate($registeredTerm) {
        $weekDaySchedule = [];
        foreach($registeredTerm as $registerDetails) {
            foreach($registerDetails->registrationDetails as $listOfSubjects) {
                foreach($listOfSubjects->classSchedules as $schedules) {
                    array_push($weekDaySchedule, 
                        array_merge(
                            ($schedules->Sched_1 ? matchWeekDays($schedules->Sched_1,$schedules->room1_id,$schedules->subjects) : []),
                            ($schedules->Sched_2 ? matchWeekDays($schedules->Sched_2,$schedules->room1_id,$schedules->subjects) : []),
                            ($schedules->Sched_3 ? matchWeekDays($schedules->Sched_3,$schedules->room1_id,$schedules->subjects) : []),
                            ($schedules->Sched_4 ? matchWeekDays($schedules->Sched_4,$schedules->room1_id,$schedules->subjects) : []),
                            ($schedules->Sched_5 ? matchWeekDays($schedules->Sched_5,$schedules->room1_id,$schedules->subjects) : []),
                        )
                    );
                }
            }
        }
        return array_merge(...$weekDaySchedule);
    }
}
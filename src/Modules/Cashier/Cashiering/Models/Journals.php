<?php

namespace Modules\Cashier\Cashiering\Models;

use Illuminate\Database\Eloquent\Model;
// models
use Modules\Setup\Academic\Models\AcademicYearTerm;
use Modules\Students\Models\Students;

class Journals extends Model
{
    protected $table = 'journals';
    protected $primaryKey = 'EntryID';
    protected $fillable = array(
        'ServerDate',
        'TransDate',
        'TermID',
        'CampusID',
        'TransID',
        'ReferenceNo',
        'Description',
        'Particulars',
        'Payor',
        'AccountID',
        'IDType',
        'IDNo',
        'CheckNo',
        'Debit',
        'Credit',
        'Remarks',
        'UserID',
        'DateModified',
        'ModifiedBy',
        'Assess Fee',
        'Discount',
        '1st Payment',
        '2nd Payment',
        '3rd Payment',
        '4th Payment',
        '5th Payment',
        'PaymentDiscount',
        'ActualPayment',
        'Refund',
        'DMCMRefNo',
        'TransType',
        'TransRefNo',
        'CreditMemo',
        'SeqNo',
        'NonLedger',
        'Deferred',
        'SubCodeID',
        'DMCode',
        'InstallmentExcluded',
        '6th Payment',
        '7th Payment',
        '8th Payment',
        '9th Payment',
        '10th Payment',
        'SeqNo2',
        'SpecialFee',
        'ADCRefund',
        'Adjustment',
        'SpecialTransNo',
        'FinancialAidExternal',
        'DeptID',
        'YrLvlID',
        'DeptCode',
        'YrLvlName',
        'CurrencyID'
    );

    public function students() {
        return $this->belongsTo(Students::class, 'IDNo', 'StudentNo');
    }

    public function ayterm() {
        return $this->belongsTo(AcademicYearTerm::class, 'TermID', 'TermID');
    }

    static function studentAssessmentBilling($request) {
        $academicYearSelected = null;
        $billingData = self::with(['ayterm:TermID,AcademicYear,SchoolTerm'])
            ->when($request->student, fn($query, $student) => $query->where('IDNo', $student), fn($query) => $query->where('IDNo', auth()->user()->university_id))
            ->when($request->ayterm, fn($query, $ayterm) => $query->where('TermID', $ayterm), fn($query) => $query->where('TermID', getActiveAYTermID()))
            ->get();
        $totalAssessment = [
            'Assessment' => 0,
            'Discount' => 0,
            'FinancialAidExternal' => 0,
            'PaymentDiscount' => 0,
            'NetAssessment' => 0,
            'ActualPayment' => 0,
            'Balance' => 0,
            'Refund' => 0,
            'CreditMemo' => 0
        ];
        foreach($billingData as $journals) {
            $netAssessment  = $journals->{'Assess Fee'} - ($journals->Discount + $journals->FinancialAidExternal);
            $balance = ($netAssessment + $journals->Refund) - $journals->ActualPayment - $journals->CreditMemo ;
            $totalAssessment['Assessment'] += $journals->{'Assess Fee'};
            $totalAssessment['Discount'] += $journals->Discount;
            $totalAssessment['FinancialAidExternal'] += $journals->FinancialAidExternal;
            $totalAssessment['PaymentDiscount'] += $journals->PaymentDiscount;
            $totalAssessment['NetAssessment'] += $netAssessment;
            $totalAssessment['Balance'] += $balance;
            $totalAssessment['ActualPayment'] += $journals->ActualPayment;
            $totalAssessment['Refund'] += $journals->Refund;
            $totalAssessment['CreditMemo'] += $journals->CreditMemo;
            $academicYearSelected = $journals->ayterm->AcademicYear.' '.$journals->ayterm->SchoolTerm;
        }
        $totalAssessment['Assessment'] = number_format($totalAssessment['Assessment'], 2);
        $totalAssessment['Discount'] = number_format($totalAssessment['Discount'], 2);
        $totalAssessment['FinancialAidExternal'] = number_format($totalAssessment['FinancialAidExternal'], 2);
        $totalAssessment['PaymentDiscount'] = number_format($totalAssessment['PaymentDiscount'], 2);
        $totalAssessment['NetAssessment'] = number_format($totalAssessment['NetAssessment'], 2);
        $totalAssessment['Balance'] = number_format($totalAssessment['Balance'], 2);
        $totalAssessment['ActualPayment'] = number_format($totalAssessment['ActualPayment'], 2);
        $totalAssessment['Refund'] = number_format($totalAssessment['Refund'], 2);
        $totalAssessment['CreditMemo'] = number_format($totalAssessment['CreditMemo'], 2);
        $totalAssessment['AYTerm'] = $academicYearSelected;
        return $totalAssessment;
    }
}
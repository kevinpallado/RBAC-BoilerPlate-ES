<?php

namespace Modules\Accounting\FeesSetup\Models;

use Illuminate\Database\Eloquent\Model;

class TableOfFees extends Model
{
    protected $table = 'tableoffees';
    protected $primaryKey = 'TemplateID';
    protected $fillable = [
        'TemplateCode',
        'TemplateDesc',
        'TemplateRemarks',
        'TermID',
        'CampusID',
        'LastModified',
        'ModifiedBy',
        'ForForeign',
        'TransType',
        'InActive',
        'CurrencyID',
        'StudentStatus',
        'StudentGender',
        'PaymentScheme',
        'PaymentOption',
        'LockedBy',
        'LockedDate',
        'PracticumOnly',
        'Total1stPayment',
        'Total2ndPayment',
        'Total3rdPayment',
        'Total4thPayment',
        'Total5thPayment',
        'Total6thPayment',
        'Total7thPayment',
        'Total8thPayment',
        'Total9thPayment',
        'Total10thPayment',
        'TotalNumPayment',
        'TotalAmount',
        'TotalNumMonth',
        'SchoProviderID',
        'DeductOnPreAssessment',
        'PaymentSchedules',
        'Discount',
        'DiscountAcctIDs',
        'DiscountEffectiveDate',
        'DiscountOption'
    ];
}
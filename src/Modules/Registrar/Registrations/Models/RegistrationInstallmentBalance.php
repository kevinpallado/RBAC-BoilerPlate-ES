<?php

namespace Modules\Registrar\Registrations\Models;

use Illuminate\Database\Eloquent\Model;

class RegistrationInstallmentBalance extends Model
{
    protected $table = 'registration_installment_balance';
    protected $primaryKey = 'RegID';
    protected $fillable = [
        '1stPayment',
        '2ndPayment',
        '3rdPayment',
        '4thPayment',
        '5thPayment',
        '6thPayment',
        '7thPayment',
        '8thPayment',
        '9thPayment',
        '10thPayment',
    ];
    public $timestamps = false;
}
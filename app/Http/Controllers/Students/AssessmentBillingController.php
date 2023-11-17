<?php

namespace App\Http\Controllers\Students;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
// models
use Modules\Cashier\Cashiering\Models\Journals;
use Modules\Registrar\Registrations\Models\Registrations;

class AssessmentBillingController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('student/assessment-and-billing/assessment-billing')->with([
            'billing' => Journals::studentAssessmentBilling($request),
            'studentInfo' => Registrations::select('RegID','TermID','StudentNo','YearLevelID','TableofFeeID')
                ->with(['students:StudentNo,FirstName,LastName,TermID,YearLevelID,ProgID','yearLevel:YearLevelID,YearLevelName','students.program:ProgID,ProgCode,ProgName','tableOfFeesDueDates','installmentBalance'])
                ->when($request->student, fn($query, $student) => $query->where('StudentNo', $student), fn($query) => $query->where('StudentNo', auth()->user()->university_id))
                ->when($request->ayterm, fn($query, $ayterm) => $query->where('TermID', $ayterm), fn($query) => $query->where('TermID', getActiveAYTermID()))
                ->first(),
            'registeredTerm' => Registrations::select('RegID','StudentNo','TermID')->with(['ayterm:TermID,AcademicYear,SchoolTerm'])->when($request->student, fn($query, $student) => $query->where('StudentNo', $student), fn($query) => $query->where('StudentNo', auth()->user()->university_id))->get()
        ]);
    }
}
<?php

namespace App\Http\Controllers\Students;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
// models
use Modules\Registrar\Students\Models\Students;
use Modules\ClassRecords\GradeEncoding\Models\PermanentRecordDetails;

class EvaluationController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('student/evaluation/evaluation')->with([
            'studentCurriculum' => Students::select('StudentNo','CurriculumID')->with([
                'curriculum:IndexID,CurriculumCode,CurriculumDesc',
                'curriculum.evaluationDetails:IndexID,CurriculumID,YearTermID,SubjectID',
                'curriculum.evaluationDetails.yearterm:IndexID,YearLevelID,YearTermDesc',
                'curriculum.evaluationDetails.subject:SubjectID,SubjectCode,SubjectTitle,CreditUnits',
                'curriculum.evaluationDetails.preRequisite.subject:SubjectID,SubjectCode,SubjectTitle,CreditUnits'
            ])
            ->where('StudentNo', auth()->user()->university_id)->first(),
            'studentGrades' => PermanentRecordDetails::select('DatePosted','SubjectID')->where('StudentNo', auth()->user()->university_id)->get()
        ]);
    }
}
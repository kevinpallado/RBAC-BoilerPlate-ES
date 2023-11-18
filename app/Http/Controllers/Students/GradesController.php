<?php

namespace App\Http\Controllers\Students;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
// models
use Modules\ClassRecords\GradeEncoding\Models\PermanentRecordDetails;

class GradesController extends Controller
{
    public function index(Request $request): Response
    {
        $gradeRecords = PermanentRecordDetails::where('StudentNo', auth()->user()->university_id);
        return Inertia::render('student/grades/grades')->with([
            'grades' => $gradeRecords->select('GradeIDX','TermID','SubjectID','ScheduleID','YearLevelID','StudentNo','Final_Average','Final_Remarks')->with([
                'classSchedules:ScheduleID,SectionID',
                'classSchedules.classSection:SectionID,SectionName',
                'subjects:SubjectID,SubjectCode,SubjectTitle,AcadUnits,LabUnits,CreditUnits'
            ])->get(),
            'enrolledTerm' => $gradeRecords->select('TermID')->with(['ayterm:TermID,AcademicYear,SchoolTerm'])->groupBy('TermID')->orderBy('TermID','desc')->get()
        ]);
    }
}
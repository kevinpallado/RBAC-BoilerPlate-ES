<?php

namespace App\Http\Controllers\Students;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
// models
use Modules\Registrar\Registrations\Models\Registrations;
use Modules\Registrar\Registrations\Models\RegistrationDetails;

class SubjectsEnrolledController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('student/subjects-enrolled/subjects-enrolled')->with([
            'subjectsEnrolled' => RegistrationDetails::select('RegID','ScheduleID','RegTagID')->with([
                'registerLoadTags',
                'registration:RegID,StudentNo,RegDate,TermID',
                'subjectClassSchedule:ScheduleID,SectionID,TermID,SubjectID,FacultyID',
                'subjectClassSchedule.subjects:SubjectID,SubjectCode,SubjectTitle',
                'subjectClassSchedule.faculty:EmployeeID,LastName,FirstName',
                'subjectClassSchedule.classSection:SectionID,SectionName'
            ])->whereHas('registration', function($query) use($request) {
                return $query->where('StudentNo', auth()->user()->university_id)->when($request->ayterm, fn($q, $ayterm) => $q->where('TermID', $ayterm), fn($q, $ayterm) => $q->where('TermID', getActiveAYTermID()));
            })->get(),
            'registeredAYTerm' => Registrations::select('RegID','TermID')->with(['ayterm:TermID,AcademicYear,SchoolTerm'])->where('StudentNo', auth()->user()->university_id)->get(),
            'activeAyTerm' => getActiveAYTermID()
        ]);
    }
}
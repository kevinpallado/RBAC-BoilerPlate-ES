<?php

namespace Modules\Registrar\Curriculums\Models;

use Illuminate\Database\Eloquent\Model;
// models
use Modules\Setup\Academic\Models\YearTerm;
use Modules\Registrar\Subjects\Models\Subjects;

class CurriculumDetails extends Model
{
    protected $table = 'curriculumdetails';
    protected $primaryKey = 'IndexID';
    protected $fillable = array(
        'CurriculumID',
        'YearTermID',
        'SubjectID',
        'YearStandingID',
        'EquivalentSubjectID',
        'SortOrder',
        'TransferedSubjectID',
        'TransferedEquivalentSubjectID',
        'SubjectElective',
        'SubjectMajor'
    );

    public function yearTerm() {
        return $this->belongsTo(YearTerm::class, 'YearTermID', 'IndexID');
    }

    public function subject() {
        return $this->belongsTo(Subjects::class, 'SubjectID', 'SubjectID');
    }

    public function preRequisite() {
        return $this->hasMany(PreRequisite::class, 'CurriculumIndexID', 'IndexID')->where('Options','Pre-Requisite');
    }
}
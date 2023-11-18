<?php

namespace Modules\Registrar\Curriculums\Models;

use Illuminate\Database\Eloquent\Model;

use Modules\Registrar\Subjects\Models\Subjects;

class PreRequisite extends Model
{
    protected $table = 'prerequisites';
    protected $primaryKey = 'IndexID';
    protected $fillable = array(
        'Options',
        'CurriculumIndexID',
        'SubjectID_Curriculum',
        'SubjectID',
        'TransferedSubjectID_Curriculum',
        'TransferedSubjectID'
    );

    public function subject() {
        return $this->belongsTo(Subjects::class, 'SubjectID', 'SubjectID');
    }
}
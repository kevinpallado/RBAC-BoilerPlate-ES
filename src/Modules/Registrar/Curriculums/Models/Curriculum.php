<?php

namespace Modules\Registrar\Curriculums\Models;

use Illuminate\Database\Eloquent\Model;

class Curriculum extends Model
{
    protected $table = 'curriculums';
    protected $primaryKey = 'IndexID';
    protected $fillable = array(
        'CurriculumCode',
        'CurriculumDesc',
        'Notes',
        'ProgramID',
        'MajorID',
        'LastModified',
        'ModifiedBy',
        'DateLocked',
        'Attachment',
        'Attachtype',
        'Inactive',
        'RegularMinLoad',
        'RegularMaxLoad',
        'SummerMinLoad',
        'SummerMaxLoad',
        'ManualComputeCYLP',
        'CYLP_ManualBy',
        'CYLP_ManualDateTime',
        'NonZeroBased'
    );

    public function evaluationDetails() {
        return $this->hasMany(CurriculumDetails::class, 'CurriculumID', 'IndexID')->orderBy('YearTermID','asc');
    }
}
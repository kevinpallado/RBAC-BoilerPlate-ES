<?php

namespace Modules\Scheduling\AcademicSchedule\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicScheduleLists extends Model
{
    protected $table = 'academic_schedule_list';
    protected $fillable = array(
        'name',
        'active'
    );
}
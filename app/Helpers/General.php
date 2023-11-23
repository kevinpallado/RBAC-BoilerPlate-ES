<?php

use Modules\Registrar\Students\Models\StudentFamilyBackground;

function familyIDGenerate() {
    $total = StudentFamilyBackground::count()+1;
    return substr('00000'.$total,-5);
}
<?php

use Modules\Registrar\Students\Models\StudentFamilyBackground;

function familyIDGenerate() {
    $total = StudentFamilyBackground::count()+1;
    return "0".substr('00000'.$total,-5);
}
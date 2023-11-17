<?php

use Modules\Setup\Academic\Models\AcademicYearTerm;

function getActiveAYTermID() {
    $aytermActive = AcademicYearTerm::where('IsCurrentTerm',1)->first();
    return $aytermActive ? $aytermActive->TermID : null;
}

function getActiveAYTermName() {
    $aytermActive = AcademicYearTerm::where('IsCurrentTerm',1)->first();
    return $aytermActive ? $aytermActive->AcademicYear.' '.$aytermActive->SchoolTerm : null;
}


function matchWeekDays($schedule, $room, $subject) {
    $weekDaysCode = [
        'M'  => 'Monday',
        'T'  => 'Tuesday',
        'W'  => 'Wednesday',
        'H' => 'Thursday',
        'F'  => 'Friday',
        'S'  => 'Saturday',
        'U' => 'Sunday'
    ];
    $weekDaysSchedule = [];
    $splitScheduleData = explode(" ", str_replace(['Th','Su'],['H','U'],$schedule));
    foreach(str_split($splitScheduleData[0]) as $weekDays) {
        array_push($weekDaysSchedule, [
            'start' => date('Y-m-d H:i:s',strtotime($weekDaysCode[$weekDays].' 0 week '.$splitScheduleData[1].' '.$splitScheduleData[2])),
            'end' => date('Y-m-d H:i:s',strtotime($weekDaysCode[$weekDays].' 0 week '.$splitScheduleData[4].' '.$splitScheduleData[5])),
            'title' => ($subject ? $subject->SubjectCode.'-'.$subject->SubjectTitle : 'No Subject'),
            'description' => ($room ? 'Room#'.$room->RoomNo.' - Room:'.$room->RoomName : 'No Assigned Room'),
            'display' => 'block',
            'backgroundColor' => 'green'
        ]);
    }
    return $weekDaysSchedule;
}
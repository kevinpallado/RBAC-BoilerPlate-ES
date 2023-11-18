<?php

namespace App\Http\Controllers\Students;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
// models
use Modules\Registrar\Students\Models\Students;
use Modules\Setup\ProfileStatus\Models\ProfileCivilStatus;
use Modules\Setup\ProfileStatus\Models\ProfileNationalities;

class ProfileController extends Controller
{
    public function profile(Request $request): Response
    {
        return Inertia::render('student/profile/profile')->with([
            'profile' => Students::where('StudentNo', auth()->user()->UserID)->first(),
            'civilStatus' => ProfileCivilStatus::all(),
            'nationality' => ProfileNationalities::orderBy('Nationality','asc')->get()
        ]);
    }

    public function settings(Request $request): Response
    {
        return Inertia::render('Student/Settings/index');
    }
}
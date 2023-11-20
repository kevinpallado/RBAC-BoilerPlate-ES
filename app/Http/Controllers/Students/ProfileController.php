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
use Modules\Setup\Address\Models\AddressBarangay;
use Modules\Setup\Address\Models\AddressCity;
use Modules\Setup\Address\Models\AddressProvince;
// validation
use Modules\Registrar\Students\Validation\StudentProfileRequest;

class ProfileController extends Controller
{
    public function profile(Request $request): Response
    {
        $profile = Students::where('StudentNo', auth()->user()->university_id)->first();
        return Inertia::render('student/profile/profile')->with([
            'profile' => $profile,
            'civilStatus' => ProfileCivilStatus::all(),
            'nationality' => ProfileNationalities::orderBy('Nationality','asc')->get(),
            'province' => AddressProvince::all(),
            'resBarangay' => $profile->Res_TownCityID ? AddressBarangay::where('CityID', $profile->Res_TownCityID)->get() : [],
            'resCities' => $profile->Res_ProvinceID ? AddressCity::where('ProvinceID', $profile->Res_ProvinceID)->get() : [],
            'permBarangay' => $profile->Perm_TownCityID ? AddressBarangay::where('CityID', $profile->Perm_TownCityID)->get() : [],
            'permCities' => $profile->Perm_ProvinceID ? AddressCity::where('ProvinceID', $profile->Perm_ProvinceID)->get() : []
        ]);
    }

    public function updateProfile(StudentProfileRequest $request, Students $student) {
        $student->update(array_merge($request->except('ExtName'), [
            'MiddleInitial' => mb_substr($request->MiddleName, 0, 1),
            'Fullname' => $request->MiddleName ? $request->FirstName.' '.mb_substr($request->MiddleName, 0, 1).'. '.$request->LastName : $request->FirstName.' '.$request->LastName,
            'Res_Barangay' => AddressBarangay::where('BrgyID', $request->Res_BarangayID)->value('BrgyName'),
            'ExtName' => $request->ExtName ? $request->ExtName : "",
            'Res_TownCity' => AddressCity::where('CityID', $request->Res_TownCityID)->value('CityName'),
            'Res_Province' => AddressProvince::where('ProvinceID', $request->Res_ProvinceID)->value('ProvinceName'),
            'Perm_Barangay' => AddressBarangay::where('BrgyID', $request->Perm_BarangayID)->value('BrgyName'),
            'Perm_TownCity' => AddressCity::where('CityID', $request->Perm_TownCityID)->value('CityName'),
            'Perm_Province' => AddressProvince::where('ProvinceID', $request->Perm_ProvinceID)->value('ProvinceName'),
            'IsProfileUpdated' => 1
        ]));

        return redirect()->back()->with(['message' => 'Successfully updated profile']);
    }

    public function family(Request $request): Response
    {
        $profile = Students::where('StudentNo', auth()->user()->university_id)->first();
        return Inertia::render('student/profile/family')->with([
            'family' => $profile,
            'province' => AddressProvince::all(),
        ]);
    }
}
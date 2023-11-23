<?php

namespace App\Http\Controllers\Students;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
// models
use Modules\Registrar\Students\Models\Students;
use Modules\Registrar\Students\Models\StudentFamilyBackground;
use Modules\Setup\ProfileStatus\Models\ProfileCivilStatus;
use Modules\Setup\ProfileStatus\Models\ProfileNationalities;
use Modules\Setup\Address\Models\AddressBarangay;
use Modules\Setup\Address\Models\AddressCity;
use Modules\Setup\Address\Models\AddressProvince;
use Modules\SystemSettings\User\Models\SystemUser;
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

    public function updateProfile(StudentProfileRequest $request, $student) {
        $student = Students::where('StudentNo', $student)->first();
        $student->update(array_merge($request->except('ExtName'), [
            'MiddleInitial' => mb_substr($request->MiddleName, 0, 1),
            'Fullname' => $request->Middlename ? $request->FirstName.' '.mb_substr($request->Middlename, 0, 1).'. '.$request->LastName : $request->FirstName.' '.$request->LastName,
            'Res_Barangay' => AddressBarangay::where('BrgyID', $request->Res_BarangayID)->value('BrgyName'),
            'ExtName' => $request->ExtName ? $request->ExtName : "",
            'Res_TownCity' => AddressCity::where('CityID', $request->Res_TownCityID)->value('CityName'),
            'Res_Province' => AddressProvince::where('ProvinceID', $request->Res_ProvinceID)->value('ProvinceName'),
            'Perm_Barangay' => AddressBarangay::where('BrgyID', $request->Perm_BarangayID)->value('BrgyName'),
            'Perm_TownCity' => AddressCity::where('CityID', $request->Perm_TownCityID)->value('CityName'),
            'Perm_Province' => AddressProvince::where('ProvinceID', $request->Perm_ProvinceID)->value('ProvinceName'),
            'IsProfileUpdated' => 1
        ]));

        SystemUser::where('university_id', $student->StudentNo)->update([
            'name' => $request->Middlename ? $request->FirstName.' '.mb_substr($request->Middlename, 0, 1).'. '.$request->LastName : $request->FirstName.' '.$request->LastName
        ]);

        return redirect()->back()->with(['message' => 'Successfully updated profile']);
    }

    public function family(Request $request): Response
    {
        $profile = Students::where('StudentNo', auth()->user()->university_id)->first();
        $family = StudentFamilyBackground::where('FamilyID', $profile->FamilyID)->first();
        return Inertia::render('student/profile/family')->with([
            'profile' => $profile,
            'family' => $family,
            'province' => AddressProvince::all(),
            'cities' => $family->Guardian_ProvinceID ? AddressCity::where('ProvinceID', $family->Guardian_ProvinceID)->get() : [],
            'barangay' => $family->Guardian_CityID ? AddressBarangay::where('CityID', $family->Guardian_CityID)->get() : []
        ]);
    }

    public function updateFamily(Request $request, $student) {
        $student = Students::where('StudentNo', $student)->first();
        $studentFamilyData = StudentFamilyBackground::updateOrCreate(
            ['FamilyID' => $student->FamilyID],
            array_merge($request->all(), [
                'FamilyID' => $student->FamilyID ? $student->FamilyID : familyIDGenerate(),
                'Guardian_Name' => $request->Guardian_MiddleName ? $request->Guardian_FirstName.' '.mb_substr($request->Guardian_MiddleName, 0, 1).'. '.$request->Guardian_LastName : $request->Guardian_FirstName.' '.$request->Guardian_LastName,
                'Father_Name' => $request->Father_MiddleName ? $request->Father_FirstName.' '.mb_substr($request->Father_MiddleName, 0, 1).'. '.$request->Father_LastName : $request->Father_FirstName.' '.$request->Father_LastName,
                'Mother_Name' => $request->Mother_MiddleName ? $request->Mother_FirstName.' '.mb_substr($request->Mother_MiddleName, 0, 1).'. '.$request->Mother_LastName : $request->Mother_FirstName.' '.$request->Mother_LastName,
                'Guardian_Province' => AddressProvince::where('ProvinceID', $request->Guardian_ProvinceID)->value('ProvinceName'),
                'Guardian_City' => AddressCity::where('CityID', $request->Guardian_CityID)->value('CityName'),
                'Guardian_TownCity' => AddressCity::where('CityID', $request->Guardian_CityID)->value('CityName'),
                'Guardian_Barangay' => AddressBarangay::where('BrgyID', $request->Guardian_BarangayID)->value('BrgyName'),
            ])
        );

        $student->FamilyID = $studentFamilyData->FamilyID;
        $student->save();

        return redirect()->back()->with(['message' => 'Successfully updated profile']);
    }

    public function emergency(Request $request) {
        $profile = Students::select('StudentNo','FamilyID')->where('StudentNo', auth()->user()->university_id)->first();
        $family = StudentFamilyBackground::where('FamilyID', $profile->FamilyID)->first();
        return Inertia::render('student/profile/emergency')->with([
            'student' => $profile,
            'family' => $family
        ]);
    }

    public function updateEmergency(Request $request, $student) {
        $student = Students::where('StudentNo', $student)->first();
        StudentFamilyBackground::where('FamilyID', $student->FamilyID)->update($request->all());

        return redirect()->back()->with(['message' => 'Successfully updated emergency contacts']);
    }
}
<?php

namespace Modules\Registrar\Students\Validation;

use Illuminate\Foundation\Http\FormRequest;

class StudentProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->beneficary | auth()->user()->university_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'FirstName' => 'required',
            'LastName' => 'required',
            'Gender' => 'required|in:M,F,PNTR',
            'CivilStatusID' => 'required|exists:civilstatus,StatusID',
            'NationalityID' => 'required|exists:nationalities,NationalityID',
            'MobileNo' => 'required',
            'DateOfBirth' => 'required',
            'Res_ProvinceID' => 'required|exists:address_province,ProvinceID',
            'Res_TownCityID' => 'required|exists:address_cities,CityID',
            'Res_BarangayID' => 'required|exists:address_barangay,BrgyID',
            'Perm_ProvinceID' => 'required|exists:address_province,ProvinceID',
            'Perm_TownCityID' => 'required|exists:address_cities,CityID',
            'Perm_BarangayID' => 'required|exists:address_barangay,BrgyID',
        ];
    }
}

<?php

namespace Modules\Registrar\Students\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
// models
use Modules\Setup\Academic\Models\YearLevel;

class Students extends Model
{
    protected $table = 'students';
    protected $primaryKey = 'StudentNo';
    protected $fillable = array(
        'StudentNo',
        'CodeCHED',
        'CampusID',
        'ProgID',
        'MajorDiscID',
        'YearLevelID',
        'AppNo',
        'TermID',
        'CurriculumID',
        'MaxUnitsLoad',
        'TblFeesID',
        'DateAdmitted',
        'DateGraduated',
        'LastName',
        'Middlename',
        'FirstName',
        'MiddleInitial',
        'ExtName',
        'DateOfBirth',
        'PlaceOfBirth',
        'Gender',
        'CivilStatusID',
        'ReligionID',
        'NationalityID',
        'VisaID',
        'TelNo',
        'MobileNo',
        'FaxNo',
        'Email',
        'HealthID',
        'Height',
        'Weight',
        'BloodType',
        'Father',
        'Father_Occupation',
        'Father_Company',
        'Father_CompanyAddress',
        'Father_TelNo',
        'Father_Email',
        'Mother',
        'Mother_Occupation',
        'Mother_Company',
        'Mother_CompanyAddress',
        'Mother_TelNo',
        'Mother_Email',
        'Res_Address',
        'Res_Street',
        'Res_Barangay',
        'Res_TownCity',
        'Res_ZipCode',
        'Res_Province',
        'Perm_Address',
        'Perm_Street',
        'Perm_Barangay',
        'Perm_TownCity',
        'Perm_ZipCode',
        'Perm_Province',
        'Guardian',
        'Guardian_Relationship',
        'Guardian_Address',
        'Guardian_Street',
        'Guardian_Barangay',
        'Guardian_TownCity',
        'Guardian_Province',
        'Guardian_ZipCode',
        'Guardian_Occupation',
        'Guardian_Company',
        'Guardian_TelNo',
        'Guardian_Email',
        'Emergency_Contact',
        'Emergency_Address',
        'Emergency_MobileNo',
        'Emergency_TelNo',
        'Elem_School',
        'Elem_Address',
        'Elem_InclDates',
        'HS_School',
        'HS_Address',
        'HS_InclDates',
        'Vocational',
        'Vocational_Address',
        'Vocational_Degree',
        'Vocational_InclDates',
        'College_School',
        'College_Address',
        'College_Degree',
        'College_InclDates',
        'GS_School',
        'GS_Address',
        'GS_Degree',
        'GS_InclDates',
        'StudentPicture',
        'TF_FlatRate',
        'Misc_FlatRate',
        'TFPerUnit',
        'LabFee',
        'LastModifiedDate',
        'LastModifiedBy',
        'IDPrintedDate',
        'Password',
        'Prog2_ID',
        'Prog2_GradDate',
        'Prog3_ID',
        'Prog3_GradDate',
        'Prog4_ID',
        'Prog4_GradDate',
        'Prog5_ID',
        'Prog6_GradDate',
        'EntranceData_SchoolLastAttended',
        'EntranceData_SchoolLastLocation',
        'EntranceData_AdmissionCredential',
        'DateHonorableDismissal',
        'Session',
        'NCEERating',
        'BadAccount',
        'EntranceData',
        'ThesisTitle',
        'Inactive',
        'StatusID',
        'Admitted_From_GS_to_HS',
        'StatusRemarks',
        'ForeignStudent',
        'OldStudentNo',
        'OldStudentNo2',
        'OldStudentNo3',
        'OldStudentNo4',
        'PassportNumber',
        'VisaStatus',
        'SSP_Number',
        'Validity_of_Stay',
        'ThesisTitle2',
        'ThesisTitle3',
        'IsLegitimateChild',
        'Father_BirthDate',
        'Mother_BirthDate',
        'Father_EducAttain',
        'Mother_EducAttain',
        'NoofBrothers',
        'NoofSisters',
        'Elem_AwardHonor',
        'HS_AwardHonor',
        'College_AwardHonor',
        'SES',
        'Signature',
        'ThesisDate',
        'ThesisAdviser',
        'ThesisDate2',
        'ThesisAdviser2',
        'ThesisDate3',
        'ThesisAdviser3',
        'RequirementTemplateID',
        'TribeID',
        'SmartCardID',
        'SchoProviderType',
        'SchoProviderID',
        'GrantTemplateID',
        'SchoStatusID',
        'SessionID',
        'Fullname',
        'oldSchoviderID',
        'oldSchoStatusID',
        'SchoDateTag',
        'AwardNo',
        'College_School2',
        'College_Address2',
        'College_Degree2',
        'College_InclDates2',
        'GS_School2',
        'GS_Address2',
        'GS_Degree2',
        'GS_InclDates2',
        'GS_School3',
        'GS_Address3',
        'GS_Degree3',
        'GS_InclDates3',
        'GS_School4',
        'GS_Address4',
        'GS_Degree4',
        'GS_InclDates4',
        'GS_School5',
        'GS_Address5',
        'GS_Degree5',
        'GS_InclDates5',
        'HS_ClassSection',
        'EntranceDataFromOtherSchool',
        'FormerStudent',
        'ChineseName',
        'NonZeroBase',
        'CurriculumMaxLoadUnits',
        'LRN',
        'FamilyID',
        'StudPreNumbered',
        'Note',
        'IsIllegitimateChild',
        'Section',
        'Res_ProvinceID',
        'Res_TownCityID',
        'Res_BarangayID',
        'Perm_ProvinceID',
        'Perm_TownCityID',
        'Perm_BarangayID',
        'College_AwardHonor2',
        'TOR_QrCode',
        'Diploma_QrCode',
        'TORQRCODE',
        'DIPQRCODE',
        'JHS_School',
        'SHS_School',
        'JHS_Address',
        'SHS_Address',
        'JHS_InclDates',
        'SHS_InclDates',
        'Vocational_School',
        'SPED',
        'JHS_Gwa',
        'SHS_Gwa',
        'JHS_AwardHonor',
        'SHS_AwardHonor',
        'Vocational_Gwa',
        'Vocational_AwardHonor',
        'College_Gwa',
        'College_Award',
        'GS_Gwa',
        'GS_AwardHonor',
        'Elem_Gwa',
        'OtherStatusID',
        'DateEntered',
        'IsProfileUpdated'
    );

    protected function DateOfBirth(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => date('Y-m-d', strtotime($value)),
        );
    }

    public function yearLevel() {
        return $this->belongsTo(YearLevel::class, 'YearLevelID', 'YearLevelID');
    }

    public function curriculum() {
        return $this->belongsTo(Curriculum::class, 'CurriculumID', 'IndexID');
    }
}
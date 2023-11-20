<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
// models
use Modules\Setup\Address\Models\AddressBarangay;
use Modules\Setup\Address\Models\AddressCity;
use Modules\Setup\Address\Models\AddressProvince;

class SelectDataController extends Controller
{
    public function data(Request $request)
    {
        switch($request->type) {
            case 'barangay':
                $addressData = AddressBarangay::with('city')
                    ->when($request->search, fn($query, $search) => $query->where('BrgyName', 'like', '%'.$search.'%'))
                    // ->when($request->length, fn($query, $length) => $query->take($length))
                    ->when($request->city, fn($query, $city) => $query->where('CityID', $city))
                    ->orderBy('BrgyName', 'asc')
                    ->get();

                return response()->json([
                    'options' => $addressData,
                    'hasMore' => count($addressData) < AddressBarangay::when($request->city, fn($query, $city) => $query->where('CityID', $city))->count() ? true : false
                ]);
            case 'city':
                $addressData = AddressCity::when($request->search, fn($query, $search) => $query->where('BrgyName', 'like', '%'.$search.'%'))
                    ->when($request->province, fn($query, $province) => $query->where('ProvinceID', $province))
                    // ->when($request->length, fn($query, $length) => $query->take($length))
                    ->orderBy('CityName', 'asc')
                    ->get();

                return response()->json([
                    'options' => $addressData,
                    'hasMore' => count($addressData) < AddressCity::when($request->province, fn($query, $province) => $query->where('ProvinceID', $province))->count() ? true : false
                ]);
            case 'province':
                $addressData = AddressProvince::when($request->search, fn($query, $search) => $query->where('BrgyName', 'like', '%'.$search.'%'))
                    ->when($request->length, fn($query, $length) => $query->take($length))
                    ->get();

                return response()->json([
                    'options' => $addressData,
                    'hasMore' => count($addressData) < AddressProvince::count() ? true : false
                ]);
        }
    }
}
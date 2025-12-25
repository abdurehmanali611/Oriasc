<?php

namespace App\Http\Controllers;

use App\Models\branches;
use Illuminate\Http\Request;

class BranchesController extends Controller
{
    public function CreateArea(Request $request) {
        $data = $request->validate([
            "Name" => 'required|string',
            "City" => 'required|string',
            "Category" => 'required|string',
            "Contact" => 'required|string',
            "Latitude" => 'required|string',
            "Longitude" => 'required|string'
        ]);

        $Branch = branches::CreateArea($data);

        return response()->json($Branch, 201);
    }

    public function AreaFetch() {
        $Branchs = branches::AreaFetch();
        return response()->json($Branchs);
    }

    public function UpdateArea(Request $request, $id) {
        $Branch = branches::findOrFail($id);

        $data = $request->validate([
            "Name" => 'sometimes|required|string',
            "City" => 'sometimes|required|string',
            "Category" => 'sometimes|required|string',
            "Contact" => 'sometimes|required|string',
            "Latitude" => 'sometimes|required|string',
            "Longitude" => 'sometimes|required|string'
        ]);

        $Branch->UpdateArea($data);

        return response()->json($Branch);
    }

    public function DeleteArea($id) {
        branches::DeleteArea($id);
        return response()->json(null, 204);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Activities;
use Illuminate\Http\Request;

class ActivitiesController extends Controller
{
    public function CreateActivity(Request $request) {
        $data = $request->validate([
            "Title" => 'required|string|max:255',
            "Description" => 'required|string',
            "Stat" => 'nullable|numeric',
            "DateTime" => 'nullable|date'
        ]);

        $Activity = Activities::CreateActivity($data);

        return response()->json($Activity, 201);
    }

    public function ActivityFetch() {
        $Activities = Activities::ActivityFetch();
        return response()->json($Activities);
    }

    public function UpdateActivity(Request $request, $id) {
        $Activity = Activities::findOrFail($id);

        $data = $request->validate([
            "Title" => 'sometimes|required|string|max:255',
            "Description" => 'sometimes|required|string',
            "Stat" => 'sometimes|nullable|numeric',
            "DateTime" => 'sometimes|nullable|date'
        ]);

        $Activity->UpdateActivity($data);
        
        return response()->json($Activity);
    }

    public function DeleteActivity($id) {
        Activities::DeleteActivity($id);
        return response()->json(null, 204);
    }
}

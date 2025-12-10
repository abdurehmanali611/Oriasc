<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function CreateTeam(Request $request)
    {
        $data = $request->validate([
            "Name" => 'required|string',
            "Position" => 'required|string',
            "Facebook" => 'nullable|string',
            "ImageUrl" => 'required|string',
            "Instagram" => 'nullable|string',
            "LinkedIn" => 'nullable|string'
        ]);

        $Team = Team::CreateTeam($data);

        return response()->json($Team, 201);
    }

    public function TeamFetch() {
        $Teams = Team::TeamFetch();
        return response()->json($Teams);
    }

    public function UpdateTeam(Request $request, $id) {
        $Team = Team::findOrFail($id);

        $data = $request->validate([
            "Name" => 'sometimes|required|string',
            "Position" => 'sometimes|required|string',
            "Facebook" => 'sometimes|nullable|string',
            "ImageUrl" => 'sometimes|required|string',
            "Instagram" => 'sometimes|nullable|string',
            "LinkedIn" => 'sometimes|nullable|string'
        ]);

        $Team->UpdateTeam($data);

        return response()->json($Team);
    }

    public function DeleteTeam($id) {
        Team::DeleteTeam($id);
        return response()->json(null, 204);
    }
}

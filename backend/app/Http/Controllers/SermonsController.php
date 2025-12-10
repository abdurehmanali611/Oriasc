<?php

namespace App\Http\Controllers;

use App\Models\Sermons;
use Illuminate\Http\Request;

class SermonsController extends Controller
{
    public function CreateSermon(Request $request)
    {
        $data = $request->validate([
            "Title" => 'required|string',
            "Slug" => 'required|string',
            "Description" => 'required|string',
            "Speaker" => 'required|string',
            "ImageVideoUrl" => 'required|string'
        ]);

        $Sermon = Sermons::CreateSermon($data);

        return response()->json($Sermon, 201);
    }

    public function SermonFetch() {
        $Sermons = Sermons::SermonFetch();
        return response()->json($Sermons);
    }

    public function UpdateSermon(Request $request, $id) {
        $Sermon = Sermons::findOrFail($id);

        $data = $request->validate([
            "Title" => 'sometimes|required|string',
            "Slug" => 'sometimes|required|string',
            "Description" => 'sometimes|required|string',
            "Speaker" => 'sometimes|required|string',
            "ImageVideoUrl" => 'sometimes|required|string'
        ]);

        $Sermon->UpdateSermon($data);

        return response()->json($Sermon);
    }

    public function DeleteSermon($id) {
        Sermons::DeleteSermon($id);
        return response()->json(null, 204);
    }
}

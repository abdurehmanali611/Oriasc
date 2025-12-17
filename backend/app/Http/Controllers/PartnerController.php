<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    public function CreatePartner(Request $request)
    {
        $data = $request->validate([
            "Title" => 'required|string',
            "Type" => 'required|string',
            "logoUrl" => 'required|string'
        ]);

        $partner = Partner::CreatePartner($data);

        return response()->json($partner, 201);
    }

    public function PartnerFetch() {
        $partner = Partner::PartnerFetch();
        return response()->json($partner);
    }

    public function UpdatePartner(Request $request, $id) {
        $partner = Partner::findOrFail($id);

        $data = $request->validate([
            "Title" => 'sometimes|required|string',
            "Type" => 'sometimes|required|string',
            "logoUrl" => 'sometimes|required|string'
        ]);

        $partner->UpdatePartner($data);

        return response()->json($partner);
    }

    public function DeletePartner($id) {
        Partner::DeletePartner($id);
        return response()->json(null, 204);
    }
}

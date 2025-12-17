<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function CreateService(Request $request)
    {
        $data = $request->validate([
            "Title" => 'required|string',
            "Description" => 'required|string',
            "ImageUrl" => 'required|string'
        ]);

        $service = Service::CreateService($data);

        return response()->json($service, 201);
    }

    public function ServiceFetch() {
        $Service = Service::ServiceFetch();
        return response()->json($Service);
    }

    public function UpdateService(Request $request, $id) {
        $service = Service::findOrFail($id);

        $data = $request->validate([
            "Title" => 'sometimes|required|string',
            "Description" => 'sometimes|required|string',
            "ImageUrl" => 'sometimes|required|string'
        ]);

        $service->UpdateService($data);

        return response()->json($service);
    }

    public function DeleteService($id) {
        Service::DeleteService($id);
        return response()->json(null, 204);
    }
}

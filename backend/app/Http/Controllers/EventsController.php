<?php

namespace App\Http\Controllers;

use App\Models\Events;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    public function CreateEvent(Request $request)
    {
        $data = $request->validate([
            "Title" => 'required|string|max:255',
            "Description" => 'required|string',
            "Slug" => 'required|string',
            "ImageUrl" => 'required|string',
            "StartDate" => 'required|date',
            "EndDate" => 'nullable|date'
        ]);

        $Event = Events::CreateEvent($data);

        return response()->json($Event, 201);
    }

    public function EventFetch() {
        $Events = Events::EventFetch();
        return response()->json($Events);
    }

    public function UpdateEvent(Request $request, $id) {
        $Event = Events::findOrFail($id);

        $data = $request->validate([
            "Title" => 'sometimes|required|string|max:255',
            "Description" => 'sometimes|required|string',
            "Slug" => 'sometimes|required|string',
            "ImageUrl" => 'sometimes|required|string',
            "StartDate" => 'sometimes|required|date',
            "EndDate" => 'sometimes|nullable|date'
        ]);

        $Event->UpdateEvent($data);

        return response()->json($Event);
    }

    public function DeleteEvent($id) {
        Events::DeleteEvent($id);
        return response()->json(null, 204);
    }
}

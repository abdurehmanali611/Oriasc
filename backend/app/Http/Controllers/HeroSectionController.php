<?php

namespace App\Http\Controllers;

use App\Models\HeroSection;
use Illuminate\Http\Request;

class HeroSectionController extends Controller
{
    public function CreateHero(Request $request) {
        $data = $request->validate([
            'Title' => 'required|string|max:255',
            'Body' => 'required|string',
            'ImageUrl' => 'required|string',
            'startDate' => 'required|date',
            'endDate' => 'required|date'
        ]);

        $hero = HeroSection::CreateHero($data);

        return response()->json($hero, 201);
    }

    public function HeroFetch() {
        $heroes = HeroSection::HeroFetch();
        return response()->json($heroes);
    }

    public function UpdateHero(Request $request, $id) {
        $hero = HeroSection::findOrFail($id);

        $data = $request->validate([
            'Title' => 'sometimes|required|string|max:255',
            'Body' => 'sometimes|required|string',
            'ImageUrl' => 'sometimes|required|string',
            'startDate' => 'sometimes|required|date',
            'endDate' => 'sometimes|required|date'
        ]);

        $hero->UpdateHero($data);
        return response()->json($hero);
    }

    public function DeleteHero($id) {
        HeroSection::DeleteHero($id);
        return response()->json(null, 204);
    }
}

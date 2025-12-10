<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function CreateTestimonial(Request $request)
    {
        $data = $request->validate([
            "Name" => 'required|string',
            "Proffession" => 'required|string',
            "Content" => 'required|string',
            "Rating" => 'required|numeric',
            "ImageUrl" => 'required|string'
        ]);

        $Testimonial = Testimonial::CreateTestimonial($data);

        return response()->json($Testimonial, 201);
    }

    public function TestimonialFetch() {
        $Testimonials = Testimonial::TestimonialFetch();
        return response()->json($Testimonials);
    }

    public function UpdateTestimonial(Request $request, $id) {
        $Testimonial = Testimonial::findOrFail($id);

        $data = $request->validate([
            "Name" => 'sometimes|required|string',
            "Proffession" => 'sometimes|required|string',
            "Content" => 'sometimes|required|string',
            "Rating" => 'sometimes|required|numeric',
            "ImageUrl" => 'sometimes|required|string'
        ]);

        $Testimonial->UpdateTestimonial($data);

        return response()->json($Testimonial);
    }

    public function DeleteTestimonial($id) {
        Testimonial::DeleteTestimonial($id);
        return response()->json(null, 204);
    }
}

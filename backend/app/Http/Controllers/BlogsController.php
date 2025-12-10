<?php

namespace App\Http\Controllers;

use App\Models\Blogs;
use Illuminate\Http\Request;

class BlogsController extends Controller
{
    public function CreateBlog(Request $request)
    {
        $data = $request->validate([
            "Title" => 'required|string',
            "Slug" => 'required|string',
            "Description" => 'required|string',
            "Author" => 'required|string',
            "ImageUrl" => 'required|string'
        ]);

        $Blog = Blogs::CreateBlog($data);

        return response()->json($Blog, 201);
    }

    public function BlogFetch() {
        $Blogs = Blogs::BlogFetch();
        return response()->json($Blogs);
    }

    public function UpdateBlog(Request $request, $id) {
        $Blog = Blogs::findOrFail($id);

        $data = $request->validate([
            "Title" => 'sometimes|required|string',
            "Slug" => 'sometimes|required|string',
            "Description" => 'sometimes|required|string',
            "Author" => 'sometimes|required|string',
            "ImageUrl" => 'sometimes|required|string'
        ]);

        $Blog->UpdateBlog($data);

        return response()->json($Blog);
    }

    public function DeleteBlog($id) {
        Blogs::DeleteBlog($id);
        return response()->json(null, 204);
    }
}

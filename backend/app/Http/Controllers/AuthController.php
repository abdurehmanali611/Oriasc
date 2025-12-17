<?php

namespace App\Http\Controllers;

use App\Models\Admins;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request) {
       $validated = $request->validate([
            'UserName' => 'required|string',
            'Password' => 'required'
        ]);

        $admin = Admins::authentication($validated['UserName'], $validated['Password']);

        if ($admin) {
            return response()->json(['message' => 'Login Successful', 'admin' => $admin]);
        }
        return response()->json(['message' => 'Invalid Credentials'], 401);
    }

    public function CreateCred(Request $request) {
        $data = $request->validate([
            "UserName" => 'required|string',
            "Password" => 'required|string'
        ]);
        $Auth = Admins::CreateCred($data);

        return response()->json($Auth, 201);
    }

    public function CredFetch() {
        $Auths = Admins::CredFetch();
        return response()->json($Auths);
    }

    public function UpdateCred(Request $request, $id) {
        $Auth = Admins::findOrFail($id);

        $data = $request->validate([
            "UserName" => 'sometimes|required|string',
            "Password" => 'sometimes|required|string'
        ]);

        $Auth->UpdateCred($data);

        return response()->json($Auth);
    }
}

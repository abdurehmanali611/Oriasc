<?php

namespace App\Http\Controllers;

use App\Models\Admins;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request) {
       $validated = $request->validate([
            'Email' => 'required|email',
            'Password' => 'required'
        ]);

        $admin = Admins::authentication($validated['Email'], $validated['Password']);

        if ($admin) {
            return response()->json(['message' => 'Login Successful', 'admin' => $admin]);
        }
        return response()->json(['message' => 'Invalid Credentials'], 401);
    }

    public function CreateCred(Request $request) {
        $data = $request->validate([
            "Email" => 'required|string',
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
            "Email" => 'sometimes|required|string',
            "Password" => 'sometimes|required|string'
        ]);

        $Auth->UpdateCred($data);

        return response()->json($Auth);
    }
}

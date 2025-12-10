<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    /**
     * Get all contact submissions ordered by most recent first.
     */
    public function index(): JsonResponse
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();

        return response()->json($contacts);
    }

    /**
     * Store a new contact submission.
     */
    public function store(StoreContactRequest $request): JsonResponse
    {
        $contact = Contact::create($request->validated());

        return response()->json($contact, 201);
    }

    /**
     * Delete a contact submission.
     */
    public function destroy(Contact $contact): JsonResponse
    {
        $contact->delete();

        return response()->json(['message' => 'Contact deleted successfully'], 200);
    }
}

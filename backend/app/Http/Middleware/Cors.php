<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Define the allowed origin (your frontend)
        $origin = 'http://localhost:3000';
        
        // Define allowed methods and headers
        $methods = 'GET, POST, PUT, PATCH, DELETE, OPTIONS';
        $headers = 'Content-Type, X-Auth-Token, Origin, Authorization';

        $response = $next($request);

        // Add the CORS headers to the response
        return $response
            ->header('Access-Control-Allow-Origin', $origin)
            ->header('Access-Control-Allow-Methods', $methods)
            ->header('Access-Control-Allow-Headers', $headers);
    }
}
<?php

use App\Http\Controllers\ActivitiesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\HeroSectionController;
use App\Http\Controllers\SermonsController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TestimonialController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post("/CredPost", [AuthController::class, "CreateCred"]);
Route::get("/GetCred", [AuthController::class, "CredFetch"]);
Route::patch("/PatchCred/{id}", [AuthController::class, "UpdateCred"]);
Route::post("/HeroPost", [HeroSectionController::class, "CreateHero"]);
Route::get("/GetHero", [HeroSectionController::class, "HeroFetch"]);
Route::patch("/PatchHero/{id}", [HeroSectionController::class, "UpdateHero"]);
Route::delete("DeleteHero/{id}", [HeroSectionController::class, "DeleteHero"]);
Route::post("/ActivityPost", [ActivitiesController::class, "CreateActivity"]);
Route::get("/GetActivity", [ActivitiesController::class, "ActivityFetch"]);
Route::patch("/PatchActivity/{id}", [ActivitiesController::class, "UpdateActivity"]);
Route::delete("/DeleteActivity/{id}", [ActivitiesController::class, "DeleteActivity"]);
Route::post("/EventPost", [EventsController::class, "CreateEvent"]);
Route::get("/GetEvent", [EventsController::class, "EventFetch"]);
Route::patch("/PatchEvent/{id}", [EventsController::class, "UpdateEvent"]);
Route::delete("/DeleteEvent/{id}", [EventsController::class, "DeleteEvent"]);
Route::post("/BlogPost", [BlogsController::class, "CreateBlog"]);
Route::get("/GetBlog", [BlogsController::class, "BlogFetch"]);
Route::patch("/PatchBlog/{id}", [BlogsController::class, "UpdateBlog"]);
Route::delete("/DeleteBlog/{id}", [BlogsController::class, "DeleteBlog"]);
Route::post("/SermonPost", [SermonsController::class, "CreateSermon"]);
Route::get("/GetSermon", [SermonsController::class, "SermonFetch"]);
Route::patch("/PatchSermon/{id}", [SermonsController::class, "UpdateSermon"]);
Route::delete("/DeleteSermon/{id}", [SermonsController::class, "DeleteSermon"]);
Route::post("/TeamPost", [TeamController::class, "CreateTeam"]);
Route::get("/GetTeam", [TeamController::class, "TeamFetch"]);
Route::patch("/PatchTeam/{id}", [TeamController::class, "UpdateTeam"]);
Route::delete("/DeleteTeam/{id}", [TeamController::class, "DeleteTeam"]);
Route::post("/TestimonialPost", [TestimonialController::class, "CreateTestimonial"]);
Route::get("/GetTestimonial", [TestimonialController::class, "TestimonialFetch"]);
Route::patch("/PatchTestimonial/{id}", [TestimonialController::class, "UpdateTestimonial"]);
Route::delete("/DeleteTestimonial/{id}", [TestimonialController::class, "DeleteTestimonial"]);

// Contact form routes
Route::get('/contacts', [ContactController::class, 'index']);
Route::post('/contacts', [ContactController::class, 'store']);
Route::delete('/contacts/{contact}', [ContactController::class, 'destroy']);

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class branches extends Model
{
    use HasFactory;

    protected $fillable = [
        "Name",
        "City",
        "Category",
        "Contact",
        "Latitude",
        "Longitude"
    ];

    public static function CreateArea(array $data) {
        return static::create($data);
    }

    public function UpdateArea(array $data) {
        $this->update($data);
        return $this;
    }

    public static function AreaFetch() {
        return static::all();
    }

    public static function DeleteArea($id) {
        $model = static::findOrFail($id);
        $model->delete();
        return true;
    }
}

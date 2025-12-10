<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    use HasFactory;

    protected $fillable = [
        "Title",
        "Body",
        "ImageUrl",
        "startDate",
        "endDate"
    ];

    public static function CreateHero(array $data) {
        return static::create($data);
    }

    public function UpdateHero(array $data) {
        $this->update($data);
        return $this;
    }

    public static function HeroFetch() {
        return static::all();
    }

    public static function DeleteHero($id) {
        $model = static::findOrFail($id);
        $model->delete();
        return true;
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        "Name",
        "Position",
        "Facebook",
        "ImageUrl",
        "Instagram",
        "LinkedIn"
    ];

    public static function CreateTeam(array $data) {
        return static::create($data);
    }

    public function UpdateTeam(array $data) {
        $this->update($data);
        return $this;
    }

    public static function TeamFetch() {
        return static::all();
    }

    public static function DeleteTeam($id) {
        $model = static::findOrFail($id);
        $model->delete();
        return true;
    }
}

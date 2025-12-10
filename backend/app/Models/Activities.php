<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activities extends Model
{
    use HasFactory;

    protected $fillable = [
        "Title",
        "Description",
        "Stat",
        "DateTime"
    ];

    public static function CreateActivity(array $data) {
        return static::create($data);
    }

    public function UpdateActivity(array $data) {
        $this->update($data);
        return $this;
    }

    public static function ActivityFetch() {
        return static::all();
    }

    public static function DeleteActivity($id) {
        $model = static::findOrFail($id);
        $model->delete();
        return true;
    }
}

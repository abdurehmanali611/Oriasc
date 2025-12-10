<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    use HasFactory;

    protected $fillable = [
        "Title",
        "Description",
        "Slug",
        "ImageUrl",
        "StartDate",
        "EndDate"
    ];

    public static function CreateEvent(array $data) {
        return static::create($data);
    }

    public function UpdateEvent(array $data) {
        $this->update($data);
        return $this;
    }

    public static function EventFetch() {
        return static::all();
    }

    public static function DeleteEvent($id) {
        $model = static::findOrFail($id);
        $model->delete();
        return true;
    }
}

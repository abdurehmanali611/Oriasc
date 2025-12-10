<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sermons extends Model
{
    use HasFactory;

    protected $fillable = [
        "Title",
        "Slug",
        "Description",
        "Speaker",
        "ImageVideoUrl"
    ];

    public static function CreateSermon(array $data) {
        return static::create($data);
    }

    public function UpdateSermon(array $data) {
        $this->update($data);
        return $this;
    }

    public static function SermonFetch() {
        return static::all();
    }

    public static function DeleteSermon($id) {
        $model = static::findOrFail($id);
        $model->delete();
        return true;
    }
}

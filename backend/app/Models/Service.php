<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        "Title",
        "Description",
        "ImageUrl"
    ];

    public static function CreateService(array $data) {
        return static::create($data);
    }

    public function UpdateService(array $data) {
        $this->update($data);
        return $this;
    }

    public static function ServiceFetch() {
        return static::all();
    }

    public static function DeleteService($id) {
        $model = static::findOrFail($id);
        $model->delete();
        return true;
    }
}

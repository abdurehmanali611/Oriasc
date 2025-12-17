<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    use HasFactory;

    protected $fillable = [
        "Title",
        "Type",
        "logoUrl"
    ];

    public static function CreatePartner(array $data) {
        return static::create($data);
    }

    public function UpdatePartner(array $data) {
        $this->update($data);
        return $this;
    }

    public static function PartnerFetch() {
        return static::all();
    }

    public static function DeletePartner($id) {
        $model = static::findOrFail($id);
        $model->delete();
        return true;
    }
}

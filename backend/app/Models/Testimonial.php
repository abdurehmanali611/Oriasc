<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        "Name",
        "Proffession",
        "Content",
        "Rating",
        "ImageUrl"
    ];

    public static function CreateTestimonial(array $data) {
        return static::create($data);
    }

    public function UpdateTestimonial(array $data) {
        $this->update($data);
        return $this;
    }

    public static function TestimonialFetch() {
        return static::all();
    }

    public static function DeleteTestimonial($id) {
        $model = static::findOrFail($id);
        $model->delete();
        return true;
    }
}

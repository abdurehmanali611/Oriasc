<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogs extends Model
{
    use HasFactory;

    protected $fillable = [
        "Title",
        "Slug",
        "Description",
        "Author",
        "ImageUrl"
    ];

    public static function CreateBlog(array $data) {
        return static::create($data);
    }

    public function UpdateBlog(array $data) {
        $this->update($data);
        return $this;
    }

    public static function BlogFetch() {
        return static::all();
    }

    public static function DeleteBlog($id) {
        $model = static::findOrFail($id);
        $model->delete();
        return true;
    }
}

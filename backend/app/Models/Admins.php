<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Admins
 *
 * @property int $id
 * @property string $Email
 * @property string $Password
 */
class Admins extends Model
{
    protected $fillable = ['UserName', 'Password'];

    /**
     * Automatically hash password when setting it
     */
    public function setPasswordAttribute($password)
    {
        (!empty($password) && \strlen($password) !== 64) ? $this->attributes['Password'] = hash('sha256', $password) : $this->attributes['Password'] = $password;
    }

    public static function authentication($email, $password)
    {
        $admin = self::where('UserName', $email)->first();

        if ($admin) {
            $hashedInput = hash('sha256', $password);
            if ($hashedInput === $admin->Password) {
                return $admin;
            }
        }
        return null;
    }

    public static function CreateCred(array $data)
    {
        return static::create($data);
    }

    public function UpdateCred(array $data)
    {
        $this->update($data);
        return $this;
    }

    public static function CredFetch()
    {
        return static::all();
    }
}
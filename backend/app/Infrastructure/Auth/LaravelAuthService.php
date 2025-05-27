<?php

declare(strict_types=1);

namespace App\Infrastructure\Auth;

use App\Domain\Auth\AuthServiceInterface;
use App\Domain\Auth\Entities\User;
use App\Endpoint\Http\Auth\Mappers\UserMapper;
use Illuminate\Support\Facades\Auth;

class LaravelAuthService implements AuthServiceInterface
{
    public function login(string $email, string $password, bool $remember = false): string
    {
        $credentials = compact('email', 'password');

        if (!Auth::attempt($credentials, $remember)) {
            throw new \Exception('Invalid credentials');
        }

        return Auth::user()->createToken('api')->plainTextToken;
    }

    public function user(): ?User
    {
        return UserMapper::fromArray(Auth::user()->toArray());
    }

    public function logout(): void
    {
        if (Auth::check()) {
            Auth::guard('web')->logout();
        }
    }
}
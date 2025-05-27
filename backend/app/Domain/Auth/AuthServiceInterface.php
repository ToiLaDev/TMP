<?php

declare(strict_types=1);

namespace App\Domain\Auth;

use App\Domain\Auth\Entities\User;

interface AuthServiceInterface
{
    public function login(string $email, string $password, bool $remember = false): string;
    public function user(): ?User;
    public function logout(): void;
}
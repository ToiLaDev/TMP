<?php

declare(strict_types=1);

namespace App\Application\Auth\Commands;

class LoginCommand
{
    public function __construct(
        public readonly string $email,
        public readonly string $password,
        public readonly bool $remember = false // Default to false if not provided
    ) {}
}
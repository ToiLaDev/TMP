<?php

declare(strict_types=1);

namespace App\Application\Auth\Commands;

use App\Domain\Auth\AuthServiceInterface;

class LoginHandler
{
    public function __construct(
        private readonly AuthServiceInterface $authService
    ) {}

    public function handle(LoginCommand $command): string
    {
        return $this->authService->login($command->email, $command->password);
    }
}
<?php

declare(strict_types=1);

namespace App\Application\Auth\Commands;

use App\Domain\Auth\AuthServiceInterface;

class LogoutHandler
{
    public function __construct(
        private readonly AuthServiceInterface $authService
    ) {}

    public function handle(LogoutCommand $command): void
    {
        $this->authService->logout();
    }
}
<?php

declare(strict_types=1);

namespace App\Application\Auth\Queries;

use App\Domain\Auth\AuthServiceInterface;
use App\Domain\Auth\Entities\User;

class GetAuthUserHandler
{
    public function __construct(
        private readonly AuthServiceInterface $authService
    ) {}

    public function handle(GetAuthUserQuery $query): User
    {
        return $this->authService->user();
    }
}
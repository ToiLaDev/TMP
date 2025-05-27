<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Auth\Mappers;

use App\Domain\Auth\Entities\User;

class UserMapper
{
    public static function toArray(User $user): array
    {
        return [
            'id' => $user->getId(),
            'name' => $user->getName(),
            'email' => $user->getEmail(),
        ];
    }

    public static function fromArray(array $data): User
    {
        return new User(
            id: (int) $data['id'],
            name: $data['name'],
            email: $data['email']
        );
    }
}
<?php

declare(strict_types=1);

namespace App\Domain\Auth\Entities;

class User
{
    public function __construct(
        public readonly int $id,
        public string $name,
        public string $email,
    ) {}

    public function getId(): int
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getName(): string
    {
        return $this->name;
    }
}
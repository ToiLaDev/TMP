<?php

declare(strict_types=1);

namespace App\Domain\Project\Entities;

class Project implements \JsonSerializable
{
    public function __construct(
        public readonly int|null $id,
        public string $title,
        public string $description,
        public string $status,
        public ?\DateTimeInterface $createdAt,
        public ?\DateTimeInterface $updatedAt,
    ) {}

    public function getId(): int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): \DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function jsonSerialize(): mixed
    {
        return [
            'id'          => $this->getId(),
            'title'       => $this->getTitle(),
            'description' => $this->getDescription(),
            'status'      => $this->getStatus(),
            'created_at'  => $this->getCreatedAt()->format('Y-m-d H:i:s'),
            'updated_at'  => $this->getUpdatedAt()->format('Y-m-d H:i:s'),
        ];
    }
}
<?php

declare(strict_types=1);

namespace App\Domain\Task\Entities;

class Task implements \JsonSerializable
{
    public function __construct(
        public readonly int|null   $id,
        public string              $title,
        public string              $priority,
        public string              $status,
        public int                 $projectId,
        public ?\DateTimeInterface $dueDate,
        public ?\DateTimeInterface $createdAt,
        public ?\DateTimeInterface $updatedAt,
    )
    {
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getPriority(): string
    {
        return $this->priority;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getProjectId(): int {
        return $this->projectId;
    }

    public function getDueDate(): ?\DateTimeInterface
    {
        return $this->dueDate;
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
            'id'         => $this->getId(),
            'title'      => $this->getTitle(),
            'priority'   => $this->getPriority(),
            'status'     => $this->getStatus(),
            'project_id' => $this->getProjectId(),
            'due_date'   => $this->getDueDate()
                ?->format('Y-m-d H:i:s'),
            'created_at' => $this->getCreatedAt()
                ?->format('Y-m-d H:i:s'),
            'updated_at' => $this->getUpdatedAt()
                ?->format('Y-m-d H:i:s'),
        ];
    }
}
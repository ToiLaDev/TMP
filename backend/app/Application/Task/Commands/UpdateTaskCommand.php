<?php

declare(strict_types=1);

namespace App\Application\Task\Commands;

class UpdateTaskCommand
{
    public function __construct(
        public int $id,
        public string $title,
        public string $priority,
        public string $status,
        public int $projectId,
        public ?\DateTimeInterface $dueDate = null,
    ) {
    }
}
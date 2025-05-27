<?php

declare(strict_types=1);

namespace App\Application\Task\Commands;

class CreateTaskCommand
{
    public function __construct(
        public string $title,
        public string $priority,
        public string $status,
        public int $projectId,
        public ?\DateTimeInterface $dueDate,
    ) {
    }
}
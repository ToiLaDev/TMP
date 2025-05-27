<?php

declare(strict_types=1);

namespace App\Application\Project\Commands;

class UpdateProjectCommand
{
    public function __construct(
        public int $id,
        public string $title,
        public string $description,
        public string $status,
    ) {
    }
}
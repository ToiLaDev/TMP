<?php

declare(strict_types=1);

namespace App\Application\Project\Commands;

class CreateProjectCommand
{
    public function __construct(
        public string $title,
        public string $description,
        public string $status,
    ) {
    }
}
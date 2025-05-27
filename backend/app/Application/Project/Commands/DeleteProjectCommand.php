<?php

declare(strict_types=1);

namespace App\Application\Project\Commands;

class DeleteProjectCommand
{
    public function __construct(
        public int $id
    ) {}
}
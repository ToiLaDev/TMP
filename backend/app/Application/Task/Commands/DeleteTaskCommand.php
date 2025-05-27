<?php

declare(strict_types=1);

namespace App\Application\Task\Commands;

class DeleteTaskCommand
{
    public function __construct(
        public int $id
    ) {}
}
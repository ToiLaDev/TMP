<?php

declare(strict_types=1);

namespace App\Application\Task\Commands;

use App\Domain\Task\Repositories\TaskRepositoryInterface;

class DeleteTaskHandler
{
    public function __construct(
        private readonly TaskRepositoryInterface $taskRepository
    )
    {
    }

    public function handle(DeleteTaskCommand $command): void
    {
        $this->taskRepository->delete($command->id);
    }
}
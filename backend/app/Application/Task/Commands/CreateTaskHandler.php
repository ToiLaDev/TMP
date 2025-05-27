<?php

declare(strict_types=1);

namespace App\Application\Task\Commands;

use App\Domain\Task\Entities\Task;
use App\Domain\Task\Repositories\TaskRepositoryInterface;
use App\Endpoint\Http\Task\Mappers\TaskMapper;

class CreateTaskHandler
{
    public function __construct(
        private readonly TaskRepositoryInterface $taskRepository
    )
    {
    }

    public function handle(CreateTaskCommand $command): ?Task
    {

        $task = $this->taskRepository->create(TaskMapper::fromArray(
            [
                'title'       => $command->title,
                'priority'    => $command->priority,
                'status'      => $command->status,
                'due_date'    => $command->dueDate,
            ]
        ));

        return $task;
    }
}
<?php

declare(strict_types=1);

namespace App\Application\Task\Commands;

use App\Domain\Task\Entities\Task;
use App\Domain\Task\Repositories\TaskRepositoryInterface;
use App\Endpoint\Http\Task\Mappers\TaskMapper;

class UpdateTaskHandler
{
    public function __construct(
        private readonly TaskRepositoryInterface $taskRepository
    )
    {
    }

    public function handle(UpdateTaskCommand $command): ?Task
    {

        $task = $this->taskRepository->save(TaskMapper::fromArray(
            [
                'id'        => $command->id,
                'title'     => $command->title,
                'priority'  => $command->priority,
                'status'    => $command->status,
                'projectId' => $command->projectId,
                'dueDate'   => $command->dueDate,
            ]
        ));

        return $task;
    }
}
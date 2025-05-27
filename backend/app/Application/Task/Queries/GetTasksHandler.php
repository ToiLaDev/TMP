<?php

declare(strict_types=1);

namespace App\Application\Task\Queries;

use App\Domain\Task\Repositories\TaskRepositoryInterface;

class GetTasksHandler
{

    public function __construct(
        private readonly TaskRepositoryInterface $taskRepository
    )
    {
    }


    public function handle(GetTasksQuery $query): array
    {
        return [
            'tasks' => $this->taskRepository->paginate(
                $query->page,
                $query->limit
            ),
            'total'    => $this->taskRepository->total()
        ];
    }
}
<?php

declare(strict_types=1);

namespace App\Application\Task\Queries;

use App\Domain\Task\Entities\Task;
use App\Domain\Task\Repositories\TaskRepositoryInterface;

class GetTaskHandler
{

    public function __construct(
        private readonly TaskRepositoryInterface $taskRepository
    )
    {
    }


    public function handle(GetTaskQuery $query): ?Task
    {
        return $this->taskRepository->findByPk($query->id);
    }
}
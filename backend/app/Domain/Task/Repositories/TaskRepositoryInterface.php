<?php

declare(strict_types=1);

namespace App\Domain\Task\Repositories;

use App\Domain\Task\Entities\Task;

interface TaskRepositoryInterface
{
    public function findByPk(int $id): ?Task;

    public function paginate(int $page = 1, int $perPage = 20): array;

    public function create(Task $task): Task;

    public function save(Task $task): Task;

    public function delete(int $id): void;

    public function total(): int;
}
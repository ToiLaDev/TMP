<?php

declare(strict_types=1);

namespace App\Domain\Project\Repositories;

use App\Domain\Project\Entities\Project;

interface ProjectRepositoryInterface
{
    public function findByPk(int $id): ?Project;

    public function paginate(int $page = 1, int $perPage = 20): array;

    public function create(Project $project): Project;

    public function save(Project $project): Project;

    public function delete(int $id): void;

    public function total(): int;
}
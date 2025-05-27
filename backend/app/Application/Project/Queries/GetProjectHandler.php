<?php

declare(strict_types=1);

namespace App\Application\Project\Queries;

use App\Domain\Project\Entities\Project;
use App\Domain\Project\Repositories\ProjectRepositoryInterface;

class GetProjectHandler
{

    public function __construct(
        private readonly ProjectRepositoryInterface $projectRepository
    )
    {
    }


    public function handle(GetProjectQuery $query): ?Project
    {
        return $this->projectRepository->findByPk($query->id);
    }
}
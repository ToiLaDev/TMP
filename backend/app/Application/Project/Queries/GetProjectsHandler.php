<?php

declare(strict_types=1);

namespace App\Application\Project\Queries;

use App\Domain\Project\Repositories\ProjectRepositoryInterface;

class GetProjectsHandler
{

    public function __construct(
        private readonly ProjectRepositoryInterface $projectRepository
    )
    {
    }


    public function handle(GetProjectsQuery $query): array
    {
        return [
            'projects' => $this->projectRepository->paginate(
                $query->page,
                $query->limit
            ),
            'total'    => $this->projectRepository->total()
        ];
    }
}
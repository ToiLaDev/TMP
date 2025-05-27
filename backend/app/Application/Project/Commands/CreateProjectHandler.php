<?php

declare(strict_types=1);

namespace App\Application\Project\Commands;

use App\Domain\Project\Entities\Project;
use App\Domain\Project\Repositories\ProjectRepositoryInterface;
use App\Endpoint\Http\Project\Mappers\ProjectMapper;

class CreateProjectHandler
{
    public function __construct(
        private readonly ProjectRepositoryInterface $projectRepository
    )
    {
    }

    public function handle(CreateProjectCommand $command): ?Project
    {

        $project = $this->projectRepository->create(ProjectMapper::fromArray(
            [
                'title'       => $command->title,
                'description' => $command->description,
                'status'      => $command->status
            ]
        ));

        return $project;
    }
}
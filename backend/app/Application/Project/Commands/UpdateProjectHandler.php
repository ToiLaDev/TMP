<?php

declare(strict_types=1);

namespace App\Application\Project\Commands;

use App\Domain\Project\Entities\Project;
use App\Domain\Project\Repositories\ProjectRepositoryInterface;
use App\Endpoint\Http\Project\Mappers\ProjectMapper;

class UpdateProjectHandler
{
    public function __construct(
        private readonly ProjectRepositoryInterface $projectRepository
    )
    {
    }

    public function handle(UpdateProjectCommand $command): ?Project
    {

        $project = $this->projectRepository->save(ProjectMapper::fromArray(
            [
                'id'          => $command->id,
                'title'       => $command->title,
                'description' => $command->description,
                'status'      => $command->status
            ]
        ));

        return $project;
    }
}
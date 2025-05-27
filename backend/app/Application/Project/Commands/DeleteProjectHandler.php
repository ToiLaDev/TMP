<?php

declare(strict_types=1);

namespace App\Application\Project\Commands;

use App\Domain\Project\Repositories\ProjectRepositoryInterface;

class DeleteProjectHandler
{
    public function __construct(
        private readonly ProjectRepositoryInterface $projectRepository
    )
    {
    }

    public function handle(DeleteProjectCommand $command): void
    {
        $this->projectRepository->delete($command->id);
    }
}
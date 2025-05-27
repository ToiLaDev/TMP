<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Project\Controllers;

use App\Application\Project\Commands\DeleteProjectCommand;
use App\Application\Project\Commands\DeleteProjectHandler;
use Spatie\RouteAttributes\Attributes\Delete;

class DeleteProjectAction
{

    #[Delete('/api/projects/{id}', name: 'api.projects.delete', middleware: 'api-personal')]
    public function __invoke(int $id, DeleteProjectHandler $handler): array
    {

        // Delete the project using the command handler
        $handler->handle(new DeleteProjectCommand($id));

        // If the project was successfully deleted, return a success response
        return [
            'success' => true,
            'message' => 'Project deleted successfully.'
        ];
    }
}
<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Project\Controllers;

use App\Application\Project\Commands\UpdateProjectCommand;
use App\Application\Project\Commands\UpdateProjectHandler;
use App\Endpoint\Http\Project\Mappers\ProjectMapper;
use App\Endpoint\Http\Project\Requests\UpdateProjectRequest;
use Spatie\RouteAttributes\Attributes\Put;

class UpdateProjectAction
{

    #[Put('/api/projects/{id}', name: 'api.projects.update', middleware: 'api-personal')]
    public function __invoke(int $id, UpdateProjectRequest $request, UpdateProjectHandler $handler): array
    {

        if ($id !== $request->input('id')) {
            throw new \Exception('Invalid project id.');
        }

        // Update the project using the command handler
        $project = $handler->handle(new UpdateProjectCommand(
            id: $id,
            title: $request->input('title'),
            description: $request->input('description'),
            status: $request->input('status')
        ));

        // If the project update succeeded, return the project data
        return [
            'success' => true,
            'data' => ProjectMapper::toArray($project),
            'message' => 'Project updated successfully.'
        ];
    }
}
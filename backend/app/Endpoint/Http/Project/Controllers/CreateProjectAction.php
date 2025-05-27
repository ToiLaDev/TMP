<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Project\Controllers;

use App\Application\Project\Commands\CreateProjectCommand;
use App\Application\Project\Commands\CreateProjectHandler;
use App\Endpoint\Http\Project\Mappers\ProjectMapper;
use App\Endpoint\Http\Project\Requests\CreateProjectRequest;
use Illuminate\Http\Request;
use Spatie\RouteAttributes\Attributes\Post;

class CreateProjectAction
{

    #[Post('/api/projects', name: 'api.projects.create', middleware: 'api-personal')]
    public function __invoke(CreateProjectRequest $request, CreateProjectHandler $handler): array
    {

        // Create a new project using the CreateProjectHandler
        $project = $handler->handle(new CreateProjectCommand(
            title: $request->input('title'),
            description: $request->input('description'),
            status: $request->input('status')
        ));

        // If the project creation succeeded, return the project data
        return [
            'success' => true,
            'data' => ProjectMapper::toArray($project),
            'message' => 'Project created successfully.'
        ];
    }
}
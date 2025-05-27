<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Project\Controllers;

use App\Application\Project\Queries\GetProjectHandler;
use App\Application\Project\Queries\GetProjectQuery;
use Spatie\RouteAttributes\Attributes\Get;

class GetProjectAction
{

    #[Get('/api/projects/{id}', name: 'api.projects', middleware: 'api-personal')]
    public function __invoke(int $id, GetProjectHandler $handler): array
    {

        $project = $handler->handle(new GetProjectQuery($id));

        return [
            'success' => true,
            'data'  => $project,
        ];
    }
}
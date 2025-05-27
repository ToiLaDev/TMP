<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Project\Controllers;

use App\Application\Project\Queries\GetProjectsHandler;
use App\Application\Project\Queries\GetProjectsQuery;
use Illuminate\Http\Request;
use Spatie\RouteAttributes\Attributes\Get;

class GetProjectsAction
{

    #[Get('/api/projects', name: 'api.projects', middleware: 'api-personal')]
    public function __invoke(Request $request, GetProjectsHandler $handler): array
    {
        $page = (int) $request->input('page', 1);
        $perPage = (int) $request->input('per_page', 20);

        $data = $handler->handle(new GetProjectsQuery($perPage, $page));

        return [
            'data'  => $data['projects'],
            'total' => $data['total'],
            'page'  => $page,
            'limit' => $perPage,
        ];
    }
}
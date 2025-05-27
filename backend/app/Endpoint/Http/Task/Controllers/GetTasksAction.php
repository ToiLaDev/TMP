<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Task\Controllers;

use App\Application\Task\Queries\GetTasksHandler;
use App\Application\Task\Queries\GetTasksQuery;
use Illuminate\Http\Request;
use Spatie\RouteAttributes\Attributes\Get;

class GetTasksAction
{

    #[Get('/api/tasks', name: 'api.tasks', middleware: 'api-personal')]
    public function __invoke(Request $request, GetTasksHandler $handler): array
    {
        $page = (int) $request->input('page', 1);
        $perPage = (int) $request->input('per_page', 20);

        $data = $handler->handle(new GetTasksQuery($perPage, $page));

        return [
            'data'  => $data['tasks'],
            'total' => $data['total'],
            'page'  => $page,
            'limit' => $perPage,
        ];
    }
}
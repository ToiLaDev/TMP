<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Task\Controllers;

use App\Application\Task\Queries\GetTaskHandler;
use App\Application\Task\Queries\GetTaskQuery;
use Spatie\RouteAttributes\Attributes\Get;

class GetTaskAction
{

    #[Get('/api/tasks/{id}', name: 'api.tasks', middleware: 'api-personal')]
    public function __invoke(int $id, GetTaskHandler $handler): array
    {

        $task = $handler->handle(new GetTaskQuery($id));

        return [
            'success' => true,
            'data'  => $task,
        ];
    }
}
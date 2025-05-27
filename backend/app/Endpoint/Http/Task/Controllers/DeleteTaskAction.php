<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Task\Controllers;

use App\Application\Task\Commands\DeleteTaskCommand;
use App\Application\Task\Commands\DeleteTaskHandler;
use Spatie\RouteAttributes\Attributes\Delete;

class DeleteTaskAction
{

    #[Delete('/api/tasks/{id}', name: 'api.tasks.delete', middleware: 'api-personal')]
    public function __invoke(int $id, DeleteTaskHandler $handler): array
    {

        // Delete the task using the command handler
        $handler->handle(new DeleteTaskCommand($id));

        // If the task was successfully deleted, return a success response
        return [
            'success' => true,
            'message' => 'Task deleted successfully.'
        ];
    }
}
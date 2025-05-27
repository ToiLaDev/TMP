<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Task\Controllers;

use App\Application\Task\Commands\UpdateTaskCommand;
use App\Application\Task\Commands\UpdateTaskHandler;
use App\Endpoint\Http\Task\Mappers\TaskMapper;
use App\Endpoint\Http\Task\Requests\UpdateTaskRequest;
use Spatie\RouteAttributes\Attributes\Put;

class UpdateTaskAction
{

    #[Put('/api/tasks/{id}', name: 'api.tasks.update', middleware: 'api-personal')]
    public function __invoke(int $id, UpdateTaskRequest $request, UpdateTaskHandler $handler): array
    {

        if ($id !== $request->input('id')) {
            throw new \Exception('Invalid task id.');
        }

        // Update the task using the command handler
        $task = $handler->handle(new UpdateTaskCommand(
            id: $id,
            title: $request->input('title'),
            priority: $request->input('priority'),
            status: $request->input('status'),
            projectId: $request->input('project_id'),
            dueDate: $request->input('due_date')
        ));

        // If the task update succeeded, return the task data
        return [
            'success' => true,
            'data' => TaskMapper::toArray($task),
            'message' => 'Task updated successfully.'
        ];
    }
}
<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Task\Controllers;

use App\Application\Task\Commands\CreateTaskCommand;
use App\Application\Task\Commands\CreateTaskHandler;
use App\Endpoint\Http\Task\Mappers\TaskMapper;
use App\Endpoint\Http\Task\Requests\CreateTaskRequest;
use Spatie\RouteAttributes\Attributes\Post;

class CreateTaskAction
{

    #[Post('/api/tasks', name: 'api.tasks.create', middleware: 'api-personal')]
    public function __invoke(CreateTaskRequest $request, CreateTaskHandler $handler): array
    {

        // Create a new task using the CreateTaskHandler
        $task = $handler->handle(new CreateTaskCommand(
            title: $request->input('title'),
            priority: $request->input('priority'),
            status: $request->input('status'),
            projectId: $request->input('project_id'),
            dueDate: $request->input('due_date')
        ));

        // If the task creation succeeded, return the task data
        return [
            'success' => true,
            'data' => TaskMapper::toArray($task),
            'message' => 'Task created successfully.'
        ];
    }
}
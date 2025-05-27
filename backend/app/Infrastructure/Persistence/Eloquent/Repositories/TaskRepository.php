<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Repositories;

use App\Domain\Task\Entities\Task;
use App\Domain\Task\Repositories\TaskRepositoryInterface;
use App\Endpoint\Http\Task\Mappers\TaskMapper;
use App\Infrastructure\Persistence\Eloquent\Models\TaskModel;

class TaskRepository implements TaskRepositoryInterface
{

    public function findByPk(int $id): ?Task
    {
        $model = TaskModel::find($id);
        if ($model) {
            return TaskMapper::fromArray($model->toArray());
        }
        return null;
    }

    public function paginate(int $page = 1, int $perPage = 20): array
    {
        return TaskModel::paginate($perPage, ['*'], 'page', $page)
            ->map(fn(TaskModel $model) => TaskMapper::fromArray($model->toArray()))
            ->toArray()
        ;
    }

    public function create(Task $task): Task
    {
        $task = TaskModel::create([
            'title'       => $task->getTitle(),
            'priority'   => $task->getPriority(),
            'status'      => $task->getStatus(),
            'project_id' => $task->getProjectId(),
            'due_date'   => $task->getDueDate(),
        ]);
        return TaskMapper::fromArray($task->toArray());
    }

    public function save(Task $task): Task
    {
        $model = TaskModel::find($task->getId());
        if ($model) {
            $model->title = $task->getTitle();
            $model->priority = $task->getPriority();
            $model->status = $task->getStatus();
            $model->project_id = $task->getProjectId();
            $model->due_date = $task->getDueDate();
            $model->save();
        }
        return TaskMapper::fromArray($model->toArray());
    }

    public function delete(int $id): void
    {
        $task = TaskModel::find($id);
        if ($task) {
            $task->delete();
        }
    }

    public function total(): int
    {
        return TaskModel::count();
    }
}
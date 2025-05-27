<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Task\Mappers;

use App\Domain\Task\Entities\Task;

class TaskMapper
{
    public static function toArray(Task $task): array
    {
        return [
            'id'          => $task->getId(),
            'title'       => $task->getTitle(),
            'priority'    => $task->getPriority(),
            'status'      => $task->getStatus(),
            'due_date'    => $task->getDueDate()
                ?->format('Y-m-d H:i:s'),
            'created_at'  => $task->getCreatedAt()
                ?->format('Y-m-d H:i:s'),
            'updated_at'  => $task->getUpdatedAt()
                ?->format('Y-m-d H:i:s'),
        ];
    }

    public static function fromArray(array $data): Task
    {
        return new Task(
            id: !empty($data['id']) ? (int)$data['id'] : null,
            title: $data['title'],
            priority: $data['priority'],
            status: $data['status'],
            dueDate: !empty($data['due_date']) ? new \DateTimeImmutable($data['due_date']) : null,
            createdAt: !empty($data['created_at']) ? new \DateTimeImmutable($data['created_at']) : null,
            updatedAt: !empty($data['updated_at']) ? new \DateTimeImmutable($data['updated_at']) : null
        );
    }
}
<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Project\Mappers;

use App\Domain\Project\Entities\Project;

class ProjectMapper
{
    public static function toArray(Project $project): array
    {
        return [
            'id'          => $project->getId(),
            'title'       => $project->getTitle(),
            'description' => $project->getDescription(),
            'status'      => $project->getStatus(),
            'created_at'  => $project->getCreatedAt()
                ->format('Y-m-d H:i:s'),
            'updated_at'  => $project->getUpdatedAt()
                ->format('Y-m-d H:i:s'),
        ];
    }

    public static function fromArray(array $data): Project
    {
        return new Project(
            id: !empty($data['id']) ? (int)$data['id'] : null,
            title: $data['title'],
            description: $data['description'],
            status: $data['status'],
            createdAt: !empty($data['created_at']) ? new \DateTimeImmutable($data['created_at']) : null,
            updatedAt: !empty($data['updated_at']) ? new \DateTimeImmutable($data['updated_at']) : null
        );
    }
}
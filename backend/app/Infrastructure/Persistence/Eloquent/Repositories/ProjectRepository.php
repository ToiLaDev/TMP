<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Repositories;

use App\Domain\Project\Entities\Project;
use App\Domain\Project\Repositories\ProjectRepositoryInterface;
use App\Endpoint\Http\Project\Mappers\ProjectMapper;
use App\Infrastructure\Persistence\Eloquent\Models\ProjectModel;

class ProjectRepository implements ProjectRepositoryInterface
{

    public function findByPk(int $id): ?Project
    {
        $model = ProjectModel::find($id);
        if ($model) {
            return ProjectMapper::fromArray($model->toArray());
        }
        return null;
    }

    public function paginate(int $page = 1, int $perPage = 20): array
    {
        return ProjectModel::paginate($perPage, ['*'], 'page', $page)
            ->map(fn(ProjectModel $model) => ProjectMapper::fromArray($model->toArray()))
            ->toArray()
        ;
    }

    public function create(Project $project): Project
    {
        $project = ProjectModel::create([
            'title'       => $project->getTitle(),
            'description' => $project->getDescription(),
            'status'      => $project->getStatus(),
        ]);
        return ProjectMapper::fromArray($project->toArray());
    }

    public function save(Project $project): Project
    {
        $model = ProjectModel::find($project->getId());
        if ($model) {
            $model->title = $project->getTitle();
            $model->description = $project->getDescription();
            $model->status = $project->getStatus();
            $model->save();
        }
        return ProjectMapper::fromArray($model->toArray());
    }

    public function delete(int $id): void
    {
        $project = ProjectModel::find($id);
        if ($project) {
            $project->delete();
        }
    }

    public function total(): int
    {
        return ProjectModel::count();
    }
}
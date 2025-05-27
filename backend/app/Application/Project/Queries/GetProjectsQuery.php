<?php

declare(strict_types=1);

namespace App\Application\Project\Queries;

class GetProjectsQuery
{
    public function __construct(
        public readonly int $limit = 10,
        public readonly int $page = 1,
    )
    {
    }
}
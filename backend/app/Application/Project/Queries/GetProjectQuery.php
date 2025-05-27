<?php

declare(strict_types=1);

namespace App\Application\Project\Queries;

class GetProjectQuery
{
    public function __construct(
        public readonly int $id
    )
    {
    }
}
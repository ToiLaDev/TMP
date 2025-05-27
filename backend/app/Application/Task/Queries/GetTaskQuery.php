<?php

declare(strict_types=1);

namespace App\Application\Task\Queries;

class GetTaskQuery
{
    public function __construct(
        public readonly int $id
    )
    {
    }
}
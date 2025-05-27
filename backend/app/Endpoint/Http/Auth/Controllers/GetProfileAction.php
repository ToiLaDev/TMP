<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Auth\Controllers;

use App\Application\Auth\Queries\GetAuthUserHandler;
use App\Application\Auth\Queries\GetAuthUserQuery;
use App\Endpoint\Http\Auth\Mappers\UserMapper;
use Illuminate\Http\JsonResponse;
use Spatie\RouteAttributes\Attributes\Get;

final class GetProfileAction
{

    #[Get('/api/auth/user', name: 'api.auth.user', middleware: 'api-personal')]
    public function __invoke(GetAuthUserHandler $handler): JsonResponse
    {
        $user = $handler->handle(new GetAuthUserQuery());

        return response()->json([
            'success' => true,
            'data' => UserMapper::toArray($user),
            'message' => __('login.successfully'),
        ]);
    }
}
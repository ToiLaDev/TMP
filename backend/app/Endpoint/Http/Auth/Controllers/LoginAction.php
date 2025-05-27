<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Auth\Controllers;

use App\Application\Auth\Commands\LoginCommand;
use App\Application\Auth\Commands\LoginHandler;
use App\Endpoint\Http\Auth\Requests\CredentialsRequest;
use Illuminate\Http\JsonResponse;
use Spatie\RouteAttributes\Attributes\Post;

final class LoginAction
{

    #[Post('/api/auth/login', name: 'api.auth.login', middleware: 'api')]
    public function __invoke(CredentialsRequest $request, LoginHandler $handler): JsonResponse
    {
        $token = $handler->handle(
            new LoginCommand(
                $request->input('email'),
                $request->input('password'),
                $request->input('remember', false) // Default to false if not provided
            )
        );

        return response()->json([
            'success' => true,
            'data' => [
                'token' => $token,
            ],
            'message' => __('login.successfully'),
        ]);
    }
}
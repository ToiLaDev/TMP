<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Auth\Controllers;

use App\Application\Auth\Commands\LogoutCommand;
use App\Application\Auth\Commands\LogoutHandler;
use Spatie\RouteAttributes\Attributes\Post;

final class LogoutAction
{

    #[Post('/api/auth/logout', name: 'api.auth.logout', middleware: 'api-personal')]
    public function __invoke(LogoutHandler $handler)
    {
        $handler->handle(new LogoutCommand());

        return response()->json([
            'success' => true,
            'message' => __('logout.successfully'),
        ]);
    }
}
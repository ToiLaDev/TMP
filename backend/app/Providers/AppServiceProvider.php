<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        // Register AuthService
        $this->app->bind(
            \App\Domain\Auth\AuthServiceInterface::class,
            \App\Infrastructure\Auth\LaravelAuthService::class
        );
        // Register ProjectRepository
        $this->app->bind(
            \App\Domain\Project\Repositories\ProjectRepositoryInterface::class,
            \App\Infrastructure\Persistence\Eloquent\Repositories\ProjectRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}

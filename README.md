# TMP
Task Management Platform

#Structure
## Backend: Laravel 12 use DDD structure
Why choose Domain-Driven Design (DDD)?
- The task management domain often contains complex and extensive business logic.
- Focus on Core Domain
- Improved Collaboration
- Better Maintainability
- Scalability
- Clearer Architecture
- Enhanced Testability
- Flexibility in Technology Choices
- Alignment with Business Goals
- Support for Complex Business Logic

## Frontend: Vue 3 modular structure with TypeScript
- Store use Pinia
- UI use PrimeVue
- Router use Vue Router
- Testing use Vitest

## Development Environment (Docker)
```sh
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
docker compose up -d
docker compose exec backend php artisan key:generate
docker compose exec backend php artisan migrate
docker compose exec backend php artisan db:seed
```
visit http://localhost:5173
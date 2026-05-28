# Backend API (Laravel 12)

This folder contains the Dragons Den backend API service.

## Tech Stack

- PHP 8.2+
- Laravel 12
- Eloquent ORM
- Default DB: SQLite

## API Routes

Defined in routes/api.php.

- GET /api/test
	- Health check style response

- POST /api/login
	- Payload: email, password
	- Returns user data with role and is_admin

- POST /api/register
	- Payload: name, email, password
	- Creates a new user

- POST /api/make-admin
	- Payload: email, actor_email
	- Promotes user when actor_email belongs to an admin

- POST /api/delete-user
	- Payload: email, actor_email
	- Deletes another user when actor_email belongs to an admin

- POST /api/delete-account
	- Payload: email, password
	- Deletes own account after password check

- GET /api/leaderboard
	- Returns users sorted by score descending

- POST /api/scores/add
	- Payload: email, points
	- Adds or subtracts score (minimum score 0)

- GET /api/board-messages
	- Returns latest 30 board messages

- POST /api/board-messages
	- Payload: name, message, role(optional), color(optional hex)
	- Creates board message

- POST /api/contact
	- Payload: name, email, subject, message
	- Validates and echoes response payload

## Data Model Summary

Users table includes:

- name
- email
- password
- role (default user)
- score (default 0)
- is_admin (default false)

Board messages table includes:

- name
- message
- role (default visitor)
- color (nullable hex)

## Local Setup

1. composer install
2. copy .env.example to .env
3. php artisan key:generate
4. php artisan migrate --force
5. php artisan serve --port=8000

Optional one-command bootstrap:

- composer run setup

## Development Scripts

From composer.json:

- composer run dev
	- Runs artisan serve, queue listener, pail logs, and npm run dev concurrently
- composer run test
	- Clears config and runs test suite

## Environment Notes

- DB_CONNECTION defaults to sqlite
- SQLite file path defaults to database/database.sqlite
- CORS is currently open to all origins in config/cors.php

## Railway Deployment

Deployment files:

- railway.json
- railway-start.sh
- Procfile

The startup script:

1. Verifies APP_KEY exists
2. Creates SQLite file when DB_CONNECTION=sqlite
3. Validates required Postgres vars when DB_CONNECTION=pgsql
4. Runs migrations
5. Starts Laravel server on 0.0.0.0:${PORT:-8080}

Recommended Railway environment variables:

- APP_ENV=production
- APP_DEBUG=false
- APP_KEY
- APP_URL
- DB_CONNECTION=sqlite (or pgsql/mysql)

If using PostgreSQL, also set:

- DB_HOST
- DB_PORT
- DB_DATABASE
- DB_USERNAME
- DB_PASSWORD

## Current Security/Behavior Notes

- API auth actions are request-payload driven (email and actor_email checks), not token-guarded.
- Contact endpoint does not send outbound email by default.

#!/usr/bin/env bash
set -e

echo "[startup] DB_CONNECTION=${DB_CONNECTION:-sqlite}"

# App key is required for Laravel runtime.
if [ -z "${APP_KEY:-}" ]; then
  echo "[startup][error] APP_KEY is missing. Set APP_KEY in Railway variables."
  exit 1
fi

# Create local SQLite db file only when sqlite is the selected driver.
if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
  mkdir -p database
  touch database/database.sqlite
fi

# Validate required PostgreSQL variables when pgsql is selected.
if [ "${DB_CONNECTION:-sqlite}" = "pgsql" ]; then
  for required_var in DB_HOST DB_PORT DB_DATABASE DB_USERNAME DB_PASSWORD; do
    if [ -z "${!required_var:-}" ]; then
      echo "[startup][error] ${required_var} is missing for pgsql connection."
      exit 1
    fi
  done
fi

php artisan config:clear
php artisan migrate --force
php artisan serve --host=0.0.0.0 --port="${PORT:-8080}"

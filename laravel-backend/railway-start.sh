#!/usr/bin/env bash
set -e

# Create local SQLite db file only when sqlite is the selected driver.
if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
  mkdir -p database
  touch database/database.sqlite
fi

php artisan config:clear
php artisan migrate --force
php artisan serve --host=0.0.0.0 --port="${PORT:-8080}"

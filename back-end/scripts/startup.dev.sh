#!/bin/sh
set -e
set -x

echo "Installing dependencies..."
npm install --production=true --legacy-peer-deps --force

echo "Running migrations..."
npx typeorm migration:run -d dist/shared/infrastructure/database/database.config.js

echo "Starting the application..."
node dist/main.js


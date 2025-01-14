#!/bin/bash

# Exit immediately on error
set -e

# Function to print a header
print_header() {
    echo "======================================"
    echo "$1"
    echo "======================================"
}

# Ensure required environment variables are set
require_variable() {
    local var_name="$1"
    if [[ -z "${!var_name}" ]]; then
        echo "Error: Required environment variable '$var_name' is not set."
        exit 1
    fi
}

# Print header
print_header "Validating Environment Variables"

# Validate required environment variables
require_variable "ENV_FILE_PATH"
require_variable "BE_PORT"
require_variable "FRONTEND_DOMAIN"
require_variable "CI_ENVIRONMENT_NAME"
require_variable "JWT_SECRET"
require_variable "MYSQL_HOST"
require_variable "MYSQL_DATABASE"
require_variable "MYSQL_USER"
require_variable "MYSQL_PASSWORD"
require_variable "MYSQL_ROOT_PASSWORD"
require_variable "MYSQL_TCP_PORT"
require_variable "TYPEORM_SYNCHRONIZE"
require_variable "TYPEORM_LOGGING"
require_variable "TYPEORM_MIGRATIONSRUN"
require_variable "PASSWORD_HASH_SALT_ROUNDS"

# Create .env file
print_header "Creating .env file"

ENV_FILE="./$ENV_FILE_PATH"
cat <<EOL > "$ENV_FILE"
# Environment Variables for the application
NODE_ENV=$CI_ENVIRONMENT_NAME
BE_PORT=$BE_PORT
FRONTEND_DOMAIN=$FRONTEND_DOMAIN
JWT_SECRET=$JWT_SECRET
MYSQL_HOST=$MYSQL_HOST
MYSQL_DATABASE=$MYSQL_DATABASE
MYSQL_USER=$MYSQL_USER
MYSQL_PASSWORD=$MYSQL_PASSWORD
MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD
MYSQL_TCP_PORT=$MYSQL_TCP_PORT
TYPEORM_SYNCHRONIZE=$TYPEORM_SYNCHRONIZE
TYPEORM_LOGGING=$TYPEORM_LOGGING
TYPEORM_MIGRATIONSRUN=$TYPEORM_MIGRATIONSRUN
PASSWORD_HASH_SALT_ROUNDS=$PASSWORD_HASH_SALT_ROUNDS
EOL

# Secure .env file
chmod 600 "$ENV_FILE"

# Success message
print_header "Environment setup complete"

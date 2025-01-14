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
require_variable "CI_ENVIRONMENT_NAME"
require_variable "FE_CONTAINER_PORT"
require_variable "FE_PORT"
require_variable "NEXT_PUBLIC_URL_API"
require_variable "NEXT_PUBLIC_API_PREFIX"
require_variable "NEXT_PUBLIC_API_VERSION"
require_variable "NEXT_PUBLIC_API_RESOURCE_PATH"

# Create .env file
print_header "Creating .env file"

ENV_FILE="./$ENV_FILE_PATH"
cat <<EOL > "$ENV_FILE"
# Environment Variables for the application
CI_ENVIRONMENT_NAME=$CI_ENVIRONMENT_NAME
FE_CONTAINER_PORT=$FE_CONTAINER_PORT
FE_PORT=$FE_PORT
NEXT_PUBLIC_URL_API=$NEXT_PUBLIC_URL_API
NEXT_PUBLIC_API_PREFIX=$NEXT_PUBLIC_API_PREFIX
NEXT_PUBLIC_API_VERSION=$NEXT_PUBLIC_API_VERSION
NEXT_PUBLIC_API_RESOURCE_PATH=$NEXT_PUBLIC_API_RESOURCE_PATH
EOL

# Secure .env file
chmod 600 "$ENV_FILE"

# Success message
print_header "Environment setup complete"

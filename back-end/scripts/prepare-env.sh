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
require_variable "CI_ENVIRONMENT_NAME"

# Create .env file
print_header "Creating .env file"

ENV_FILE="./$ENV_FILE_PATH"
cat <<EOL > "$ENV_FILE"
# Environment Variables for the application
NODE_ENV=$CI_ENVIRONMENT_NAME
PORT=$BE_PORT
EOL

# Secure .env file
chmod 600 "$ENV_FILE"

# Success message
print_header "Environment setup complete"
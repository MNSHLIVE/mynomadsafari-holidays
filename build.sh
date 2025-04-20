
#!/bin/bash

# Make the script fail on errors
set -e

# Install dependencies if needed
echo "Installing dependencies..."
npm ci --omit=dev

# Make sure vite is installed globally
echo "Installing Vite globally..."
npm install -g vite

# Build the project
echo "Building the project..."
npx vite build

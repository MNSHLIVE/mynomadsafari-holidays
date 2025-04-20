
#!/bin/bash

# Make the script fail on errors
set -e

# Install dependencies if needed
echo "Installing dependencies..."
npm ci

# Build the project using npx to ensure vite is available
echo "Building the project..."
npx vite build

echo "Build completed successfully!"

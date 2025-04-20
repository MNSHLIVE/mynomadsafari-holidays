
#!/bin/bash

# Make the script fail on errors
set -e

# Install dependencies if needed
echo "Installing dependencies..."
npm ci

# Build the project directly with npx
echo "Building the project..."
npx vite build

echo "Build completed successfully!"

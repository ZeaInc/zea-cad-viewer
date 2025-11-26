#!/bin/bash

set -e

echo "Configuring npm authentication for GitHub Packages..."

# Create/update .npmrc with authentication
cat > .npmrc << EOF
@zeainc:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${ZEA_GITHUB_NPM_TOKEN}
always-auth=true
EOF

echo "Installing dependencies..."
yarn install

echo "Building app..."
yarn run build

echo "Build complete!"

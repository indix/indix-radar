#!/bin/bash

# Exit immediately if something exits with error(s).
set -e

# Install deps.
curl -o- -L https://yarnpkg.com/install.sh | bash
npm install hexo-cli@1.0.2 webpack@1.14.0 --global
yarn install

# Generate Hexo static site.
hexo clean
hexo generate
webpack

# BAM! Deploy.
hexo deploy

# Run the server!
hexo server -s

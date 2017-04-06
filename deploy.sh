#!/bin/bash

# Exit immediately if something exits with error(s).
set -e

# Install Yarn.
npm install --global yarn

# Install Hexo & WebPack.
npm install hexo-cli@1.0.2 webpack@1.14.0 --global

# Install code dependencies.
yarn install

# Generate Hexo static site.
hexo clean
hexo generate
yarn run build

# BAM! Deploy.
hexo deploy

#!/bin/bash

set -ex

hexo clean
hexo generate
yarn run build
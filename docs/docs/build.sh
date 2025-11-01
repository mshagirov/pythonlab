#!/usr/bin/env bash

JEKYLL_ENV=production bundle exec jekyll build
rm -rf docs
cp -R _site docs

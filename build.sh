#!/usr/bin/env bash

JEKYLL_ENV=production bundle exec jekyll build
cp -R _site docs

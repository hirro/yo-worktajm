#!/bin/bash
cp -r ../../../dist dist
cp -r ../../../node_modules node_modules
docker build -t worktajm-node .
rm -rf dist
rm -rf node_modules

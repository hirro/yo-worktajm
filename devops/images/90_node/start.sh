#!/bin/bash
docker run --name node --link mongodb:mongodb -p 8080:8080 -d worktajm-node


#!/bin/bash
docker run --name node --link mongodb:mongodb -d worktajm-node


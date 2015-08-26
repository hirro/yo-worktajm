#!/bin/bash
docker run --name nginx -d \
	--link node:node \
	-p 443:443 \
	-v ~/worktajm.com/ssl:/etc/ssl:ro \
	worktajm-nginx


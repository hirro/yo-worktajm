#!/bin/bash
docker run --name nginx -d \
	--link node:node \
	-p 443:443 \
	-v /Users/jiar/worktajm.com:/etc/nginx/keys:ro \
	worktajm-nginx


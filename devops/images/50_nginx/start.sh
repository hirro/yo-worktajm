#!/bin/bash
docker run --name nginx -d \
	--link node:node \
	-p 443:443 \
	--privileged=true \
	-v ~/worktajm.com/ssl:/etc/ssl/ \
	worktajm-nginx


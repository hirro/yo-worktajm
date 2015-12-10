#!/bin/bash
docker run --name nginx \
    -d \
	-p 443:443 \
	--privileged=true \
	-v /opt/docker/ssl:/etc/ssl/ \
    -v /opt/docker/log:/var/log/nginx \
	worktajm-nginx


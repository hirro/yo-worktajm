#!/bin/bash
docker run --name lumberjack -d \
	-p 8080:80 \
	-v ~/worktajm.com:/etc/ssl/etc/ssl:ro \
	--volumes-from nginx \
	worktajm-logstash-forwarder


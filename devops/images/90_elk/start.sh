#!/bin/bash
docker run --name elk -d \
	-p 8080:80 \
	--volumes-from nginx \
	--volumes-from node \
	worktajm-elk


#!/bin/bash
docker run --name kibana -d \
	-p 8080:80 \
	--link elasticsearch:elasticsearch \
	worktajm-kibana


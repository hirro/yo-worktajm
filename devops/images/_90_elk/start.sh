#!/bin/bash
docker run --name logstash -d \
	-p 8080:80 \
	worktajm-elk


#!/bin/bash
docker run -d \
    --name logstash \
    --link elasticsearch:elasticsearch \
	-v ~/worktajm.com/ssl:/etc/ssl \
    worktajm-logstash \
	logstash --debug -f  /etc/logstash/logstash.conf

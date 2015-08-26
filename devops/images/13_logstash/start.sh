#!/bin/bash
docker run -d \
    --name logstash \
    --link elasticsearch:elasticsearch \
	-v ~/worktajm.com/logstash:/etc/ssl/logstash/ \
    worktajm-logstash \
	logstash --debug -f  /etc/logstash/logstash.conf

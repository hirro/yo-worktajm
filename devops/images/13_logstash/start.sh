#!/bin/bash
docker run -d \
    --name logstash \
    --link elasticsearch:elasticsearch \
    worktajm-logstash \
	logstash --debug -f  /etc/logstash/logstash.conf

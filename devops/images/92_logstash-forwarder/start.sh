#!/bin/bash
docker run --name logstash-forwarder \
	--rm -ti \
	-v ~/worktajm.com/logstash:/etc/ssl/logstash \
	--link logstash:logstash \
	--volumes-from nginx \
	worktajm-logstash-forwarder


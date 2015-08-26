#!/bin/bash
docker run --name logstash-forwarder \
	-d \
	--link logstash:logstash \
	--volumes-from nginx \
	worktajm-logstash-forwarder


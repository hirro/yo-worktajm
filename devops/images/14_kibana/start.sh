#!/bin/bash
docker run --name kibana -d \
	-p 5601:5601 \
	--link elasticsearch:elasticsearch \
	-e ELASTICSEARCH_URL=http://elasticsearch:9200 \
	worktajm-kibana


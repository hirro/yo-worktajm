#!/bin/bash
docker run -d \
    --name elasticsearch \
    -p 9200:9200 \
    -p 9300:9300 \
    worktajm-elasticsearch

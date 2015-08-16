#!/bin/bash

if [ -z ${DOMAIN+x} ]; then echo "DOMAIN not set"; exit 0; fi
if [ -z ${FACEBOOK_ID+x} ]; then echo "FACEBOOK_ID not set"; exit 0; fi
if [ -z ${FACEBOOK_SECRET+x} ]; then echo "FACEBOOK_SECRET not set"; exit 0; fi
if [ -z ${GOOGLE_ID+x} ]; then echo "GOOGLE_ID not set"; exit 0; fi
if [ -z ${GOOGLE_SECRET+x} ]; then echo "GOOGLE_SECRET not set"; exit 0; fi

docker run --name node \
	--link mongodb:mongodb \
	-e "FACEBOOK_ID=$FACEBOOK_ID" \
	-e "FACEBOOK_SECRET=$FACEBOOK_SECRET" \
	-e "GOOGLE_ID=$GOOGLE_ID" \
	-e "GOOGLE_SECRET=$GOOGLE_SECRET" \
	-e "DOMAIN=$DOMAIN" \
	-d worktajm-node


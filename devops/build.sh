#!/bin/bash

for path in $PWD/images/*; do
	echo
	echo
	echo "Building $path"
	( cd $path && ./build.sh )
done
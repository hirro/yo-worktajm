#!/bin/bash

for path in $PWD/images/*; do
	echo $path
	( cd $path && ./start.sh )
done
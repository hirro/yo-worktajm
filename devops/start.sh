#!/bin/bash

if [ -e ~/.worktajm.env ] 
then
    echo "Loading environment variables..."
    source ~/.worktajm.env
else
    echo "Must configure non public environment variables"
    exit 0
fi


for path in $PWD/images/*; do
	echo $path
	( cd $path && ./start.sh )
done

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
	if [[ "$path" =~ /_ ]]
	then
		echo "Skipping service $path"
	else	
		echo "Starting service $path"
		( cd $path && ./start.sh )
	fi
done

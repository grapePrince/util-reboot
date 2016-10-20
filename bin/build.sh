#!/bin/bash

rm -r ../build 
mkdir ../build
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    mkdir ../build/css
fi

webpack -w

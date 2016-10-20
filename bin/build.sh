#!/bin/bash

rm -r ../build 
mkdir -p ../build/js/lib
mkdir -p ../build/css/lib

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    cp -r ../src/js/lib ../build/js
    cp -r ../src/css/lib ../build/css
fi

cd ..
webpack
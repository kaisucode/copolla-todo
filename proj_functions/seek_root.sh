#!/bin/bash
while [ $PWD != "/" ]; do
    if [ -f ".proj" ]; then
        break
    fi
    cd ..
done

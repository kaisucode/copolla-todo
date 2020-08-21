#!/bin/bash
while [ $PWD != "/" ]; do
    echo $PWD
    if [ -f ".proj" ]; then
        echo "yayayaya"
        break
    fi
    cd ..
    echo "going up"
done

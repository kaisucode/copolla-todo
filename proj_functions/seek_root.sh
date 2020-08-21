#!/bin/bash
while [ $PWD != "/" ]; do
    if [ -f ".proj" ]; then
        break
    fi
    cd ..
done

echo $PWD

if [ $PWD == "/" ]; then
  echo "RIP ROOT"
  exit 0
fi


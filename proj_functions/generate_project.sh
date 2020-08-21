#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "Illegal number of parameters"
    exit 0 # stops the program
fi
proj_name=$1
echo $proj_name
mkdir $proj_name
cd $proj_name
touch .proj
echo "Project: $proj_name" >> .proj
mkdir "wiki"
mkdir "wiki/src"
mkdir "wiki/linked"
mkdir "wiki/html"
mkdir "todo"
mkdir "progress"
mkdir "src"
touch "README.md"
echo "# $proj_name" > .proj

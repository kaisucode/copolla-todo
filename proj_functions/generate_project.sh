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
mkdir "$proj_name/wiki"
mkdir "$proj_name/todo"
touch "$proj_name/README.md"

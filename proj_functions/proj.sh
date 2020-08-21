source $HOME/Desktop/project-project/proj_functions/seek_root.sh
if [ "$#" -eq 0 ]; then
  echo "run the electron thing"
elif [ "$#" -eq 1 ]; then
  if [ $1 == "generate" ]; then
    sh project_generate $2
  elif [ $1 == "compile" ]; then
    echo $PWD
    python3 $BLAH/linkify.py
    python3 $BLAH/pandaify.py
  elif [ $1 == "seekroot" ]; then
    sh seek_root.sh
  fi
else
  echo "Invalid number of arguments"
fi

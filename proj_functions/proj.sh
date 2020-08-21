source $PROJ_PROJ_PATH/proj_functions/seek_root.sh
if [ "$#" -eq 0 ]; then
  echo "running the electron thing"
elif [ "$#" -eq 1 ]; then
  if [ $1 == "generate" ]; then
    sh project_generate $2
  elif [ $1 == "compile" ]; then
    python3 $PROJ_PROJ_PATH/proj_functions/linkify.py
    python3 $PROJ_PROJ_PATH/proj_functions/pandaify.py
  else
    echo "Unknown command, valid arguments are [ , generate, compile ]"
  fi
else
  echo "Invalid number of arguments"
fi

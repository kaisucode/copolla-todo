if [ "$#" -eq 0 ]; then
  echo "run the electron thing"
elif [ "$#" -eq 1 ]; then
  if [ $1 == "generate" ]; then
    sh project_generate $2
  elif [ $1 == "compile" ]; then
    python3 linkify.py
    python3 pandaify.py
  elif [ $1 == "seekroot" ]; then
    sh seek_root.sh
  fi
else; then
  echo "Invalid number of arguments"
fi

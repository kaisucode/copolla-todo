# for every file `blah.md` in `projX/wiki/linked`
# make a file `projX/wiki/html/blah.md`
# with every occurence of a link word replaced with a link (markdown formatting)

import os
import sys

from get_root import get_root
proj_root = get_root()
if not proj_root:
    sys.exit("ERROR: not inside a project. Please initialize a project before trying to compile the wiki.")

os.chdir(proj_root)
os.chdir("wiki")

for filename in os.listdir("linked"):
    old_path = os.path.join('linked', filename)
    new_path = os.path.join('html', filename.replace('.md', '.html'))
    os.system(f"pandoc -s -c pandoc.css --mathjax {old_path} -o {new_path}")


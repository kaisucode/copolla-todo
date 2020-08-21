# for every file `blah.md` in `projX/wiki/linked`
# make a file `projX/wiki/html/blah.md`
# with every occurence of a link word replaced with a link (markdown formatting)

from get_root import get_root

import os
import sys

proj_root = get_root()
if not proj_root:
    sys.exit("ERROR: not inside a project. Please initialize a project before trying to compile the wiki.")
os.chdir(proj_root)
os.chdir("wiki")

for filename in os.path.listdir("linked"):
    os.system(f"pandoc --mathjax {os.path.join('linked', filename)} -o {os.path.join('html', filename.replace('.md', '.html'))}" 



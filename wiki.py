# for every file `blah.md` in `projX/wiki/src`
# make a file `projX/wiki/linked/blah.md`
# with every occurence of a link word replaced with a link (markdown formatting)

import os
import sys

# TODO: get_root some other way

from get_root import get_root
proj_root = get_root()
if not proj_root:
    sys.exit("ERROR: not inside a project. Please initialize a project before trying to compile the wiki.")

os.chdir(proj_root)
os.chdir("wiki")

linkWords = []
for filename in os.listdir("src"):
    linkWords.append(filename[:-len(".md")])

for filename in os.listdir("src"):
    with open(os.path.join("src", filename), "r") as f:
        data = f.read()

    for linkWord in linkWords:
        lengths = [len(x) for x in data.lower().split(linkWord.lower())]
        # example:
        # linkWord = "alek", data = "Bob ate alek, yesterday Alek was a cool kid."
        # "Bob ate ", ", yesterday ", " was a cool kid."

        new_data = ""
        prefix_length = 0
        for (i, segment_length) in enumerate(lengths):
            new_data += data[prefix_length:prefix_length+segment_length]
            prefix_length += segment_length
            if i < len(lengths) - 1:
                not_clean_link_word = data[prefix_length:prefix_length+len(linkWord)]
                new_data += f"[{not_clean_link_word}]({linkWord}.html)"
                prefix_length += len(linkWord)

        data = new_data

    with open(os.path.join("linked", filename), "w") as f:
        f.write(data + "\n\n\n\n----\n\n\n[index](index.html)\n\n")

toc_content = "# WIKI \n"
for linkWord in linkWords:
    toc_content += f"- [{linkWord}]({linkWord}.html)\n"

with open("linked/index.md", "w") as f:
    f.write(toc_content)



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
    title = filename.replace(".md", "")
    os.system(f"pandoc -s -c pandoc.css --mathjax --metadata pagetitle={title} {old_path} -o {new_path}")


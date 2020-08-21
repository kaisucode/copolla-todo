# take in a path as an argument `projX/wiki`
# for every file `blah.md` in `projX/wiki`
# make a file `linked/blah.md`
# with every occurence of a link word replaced with a link (markdown formatting)

import os
import sys
import re

path = sys.argv[1]
print(path)

linkWords = []
counter = 0


os.chdir(path)
for filename in os.listdir():
    linkedfile = os.path.join("..","linked",filename)
    os.system(f" touch {linkedfile}")
    fileLinkWord = filename[:-len(".md")]
    linkWords.append(fileLinkWord)

for filename in os.listdir():
    with open(filename, "r") as f:
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
                    new_data += f"![{not_clean_link_word}]({linkWord}.html)"
                    prefix_length += len(linkWord)

            data = new_data

    linkFileName = os.path.join("..","linked",filename)
    with open(linkFileName, "w") as f:
        f.write(data)

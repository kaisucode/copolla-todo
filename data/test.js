const fs = require('fs');
try { fs.writeFileSync('myfile.txt', 'the text to write in the file', 'utf-8'); }
catch(e) { alert('Failed to save the file !'); }

const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('public/index.html');
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.on('blah', (event, arg) => {
  console.log(arg);
  try { fs.writeFileSync('public/data/myfile.txt', JSON.stringify(arg), 'utf-8'); }
  catch(e) { alert('Failed to save the file !'); }
});


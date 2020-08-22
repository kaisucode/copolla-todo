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

ipcMain.on('writeData', (event, data) => {
  console.log(data);
  try { fs.writeFileSync('public/data/myfile.txt', JSON.stringify(data), 'utf-8'); }
  catch(e) { alert('Failed to save the file !'); }
});

ipcMain.on('readData', (event) => {
  let data = fs.readFileSync('public/data/myfile.txt', 'utf-8');
  return data;
});


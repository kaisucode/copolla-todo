'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const fs = require("fs");
const path = require('path');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    fullscreen: false,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    });
  }
}

const RUNNING_APP_VERSION = true;
const APPNAME = "copolla-todo"
const appDataFilePath = getAppDataPath();

function getAppDataPath() {
  let appDataDirPath = path.join(process.env.HOME, "Library", "Application Support", APPNAME);
  // Create appDataDir if not exist
  if (!fs.existsSync(appDataDirPath)) 
    fs.mkdirSync(appDataDirPath);
  return path.join(appDataDirPath, 'appData.json');
}

ipcMain.on('writeData', (event, data) => {
  if(RUNNING_APP_VERSION){
    fs.writeFile(appDataFilePath, data, (err) => {
      if (err) 
        console.log(err);
      else 
        console.log("Data written correctly!");
    });
  }
  else {
    fs.writeFileSync("data.json", data, "utf-8");
  }
});

ipcMain.on('readData', (event) => {
  if(RUNNING_APP_VERSION){
    fs.readFile(appDataFilePath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        win.webContents.send('readData', -1);
      }
      else {
        console.log("Data read correctly!");
        console.log(data);
        win.webContents.send('readData', data);
      }
    });
  }
  else{
    fs.readFile("data.json", "utf-8", (err, data)=>{
      if(err)
        console.error(err);
      win.webContents.send('readData', data);
    });
  }
});


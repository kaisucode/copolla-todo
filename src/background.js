'use strict'

// RUNNING_APP_VERSION = true vs false based on whether we are locally developing or deploying to an app
const RUNNING_APP_VERSION = false;
const APPNAME = "copolla-todo"

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
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});

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

const DEFAULT_BLANK_DATA = JSON.stringify({
  "week": {
    "2020-8-23":  [ [], [], [], [], [], [], [] ]
  }, 
  "month": {
    "2020-8": ["", "", "", "", "", ""]
  }, 
  "year": {
    "2020": ["", "", "", "", "", "", "", "", "", "", "", ""]
  }, 
  "categories": [
    {"name": "research", "color": "green", "categories": []}, 
    {"name": "learn", "color": "blue", "categories": []}, 
    {"name": "code", "color": "red", "categories": []}, 
    {"name": "read", "color": "yellow", "categories": []}
  ], 
  "backBurner": [], 
  "recurring": [ [], [], [], [], [], [], [] ]
});


const appDataDir = RUNNING_APP_VERSION ? path.join(process.env.HOME, "Library", "Application Support", APPNAME) : "";
let appDataFile = path.join(appDataDir, "appData.json");
let appDataBackupFile = path.join(appDataDir, "appDataBackup.json");

if(RUNNING_APP_VERSION) {
  if (!fs.existsSync(appDataDir)) 
    fs.mkdirSync(appDataDir);
}
if(!fs.existsSync(appDataFile)){
  console.log("WIPING appData.json");
  fs.writeFileSync(appDataFile, DEFAULT_BLANK_DATA, "utf-8");
}
if(!fs.existsSync(appDataBackupFile)){
  console.log("WIPING appDataBackup.json");
  fs.writeFileSync(appDataBackupFile, DEFAULT_BLANK_DATA, "utf-8");
}

ipcMain.on('writeData', (event, data) => {
  console.log("WRITING ");
  console.log(data);
  fs.writeFileSync(appDataFile, data, "utf-8");
});

ipcMain.on('readData', (event) => {
  fs.readFile(appDataFile, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      app.quit();
    }
    else {
      console.log("Data read correctly!");
      console.log(data);
      win.webContents.send('readData', data);
    }
  });
});

ipcMain.on('backupData', (event) => {
  console.log("YOOOOO,, backing up some data");
  fs.readFile(appDataFile, "utf-8", (err, data)=>{
    console.log("YOOOOO, just read some data");
    console.log(data);
    if(err){
      console.error(err);
      app.quit();
    }
    else {
<<<<<<< HEAD
      console.log("YOOOOO,writing some daaataa backup");
      fs.writeFileSync(appDataFile, data, "utf-8");
=======
      fs.writeFileSync(appDataBackupFile, data, "utf-8");
>>>>>>> d7c66aeb5b34e6d0defa60a9e22204a8c5771eff
    }
  });
});

ipcMain.on('recoverBackup', (event) => {
  fs.readFile(appDataBackupFile, "utf-8", (err, data)=>{
    win.webContents.send('readData', data);
  });
});


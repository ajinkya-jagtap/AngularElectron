"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var windowStateKeeper = require('electron-window-state');
var path = require("path");
var url = require("url");
var readItem = require("./readItem");
var electron = require('electron'), ipcMain = electron.ipcMain;
var win;
ipcMain.on('new-item', function (e, itemUrl) {
    readItem(itemUrl, function (item) {
        e.sender.send('new-item-success', item);
    });
});
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
function createWindow() {
    //win state keeper
    var state = windowStateKeeper({
        defaultWidth: 700, defaultHeight: 750,
    });
    win = new electron_1.BrowserWindow({
        x: state.x, y: state.y,
        width: state.width, height: state.height,
        minWidth: 500, minHeight: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    state.manage(win);
    //win.loadURL('https://electronjs.org')
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/angular-electron/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
}
//# sourceMappingURL=main.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserWindow = require('electron').BrowserWindow;
var offScreenWindow;
module.exports = function (url, callback) {
    offScreenWindow = new BrowserWindow({
        width: 500,
        height: 500,
        show: false,
        webPreferences: {
            offscreen: true,
            nodeIntegration: false
        }
    });
    offScreenWindow.loadURL(url);
    offScreenWindow.webContents.on('did-finish-load', function (e) {
        var title = offScreenWindow.getTitle();
        offScreenWindow.webContents.capturePage(function (image) {
            var screenShot = image.toDataURL();
            callback({ title: title, screenShot: screenShot, url: url });
            offScreenWindow.close();
            offScreenWindow = null;
        });
    });
};
//# sourceMappingURL=readItem.js.map
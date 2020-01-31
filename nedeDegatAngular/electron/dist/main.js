"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win, serve;
var argcmd = process.argv.slice(1);
serve = argcmd.some(function (val) { return val === '--serve'; });
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: { nodeIntegration: true }
    });
    win.maximize();
    if (serve) {
        win.loadURL('http://localhost:4200');
        win.webContents.openDevTools();
    }
    else {
        win.removeMenu();
        win.loadURL(url.format({
            pathname: path.join(__dirname, "/../../dist/nedeDegatAngular/index.html"),
            protocol: 'file:',
            slashes: true
        }));
    }
    win.on('closed', function () {
        win = null;
    });
}
//# sourceMappingURL=main.js.map
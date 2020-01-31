import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow, serve: any;
const argcmd = process.argv.slice(1);
serve = argcmd.some(val => val === '--serve');

app.on('ready', createWindow);

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

function createWindow() {
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: { nodeIntegration: true }
    });
    win.maximize();

    if (serve) {
        win.loadURL('http://localhost:4200');
        win.webContents.openDevTools();
    } else {
        win.removeMenu();
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, `/../../dist/nedeDegatAngular/index.html`),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    win.on('closed', () => {
        win = null;
    });
}




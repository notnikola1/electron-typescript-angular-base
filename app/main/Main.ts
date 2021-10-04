import { App } from "electron";

const Electron = require('electron');

module.exports = class Main {
    static mainWindow: Electron.BrowserWindow | null;
    static application: Electron.App;
    static BrowserWindow : Electron.BrowserWindow;
    private static onWindowAllClosed() {
        Main.application.quit();
    }

    private static getURL(env: any) {
        let config = '';
        switch (env) {
            case 'dev':
                config = 'http://localhost:4200';
                break;
            case 'prod':
                config = `file://${__dirname}/../ui/index.html`
                break;
                default :
                config = `file://${__dirname}/../ui/index.html`
                break;
        }
        return config;
    }

    private static onClose() {
        // Dereference the window object. 
        Main.mainWindow = null;
    }

    private static onReady(config : any) {
        Main.mainWindow = new Electron.BrowserWindow(config);
        const url = this.getURL(process.env.ENV);
        Main.mainWindow.loadURL(url);
        Main.mainWindow.show();
        Main.mainWindow.on('closed', Main.onClose);
    }

    static init(app: App, browserWindow: typeof BrowserWindow, config ? : any) {
        // we pass the Electron.App object and the  
        // Electron.BrowserWindow into this function 
        // so this class has no dependencies. This 
        // makes the code easier to write tests for 
        //@ts-ignore
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        
        Main.application.on('ready', Main.ReadyWrapper.bind(Main, [config]));
    }

    private static ReadyWrapper(config ? : any) {
        let defaultConfig = {
            height: 800,
            width: 1000,
            webPreferences: {
                preload: `${__dirname}/preload.js`
            }
        }
        Main.onReady(defaultConfig);
    }
}
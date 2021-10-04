const {app, BrowserWindow} = require('electron');
const Main = require('./main/Main');

Main.init(app, BrowserWindow)

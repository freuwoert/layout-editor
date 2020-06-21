'use strict'

import { app, protocol, BrowserWindow, globalShortcut } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { autoUpdater } from 'electron-updater'
import { ipcMain } from 'electron'
import log from 'electron-log'
const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow
let gotTheLock = app.requestSingleInstanceLock()



protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])



if ( !gotTheLock )
{
    app.quit()
}
else
{
    app.on('second-instance', (event, commandLine, workingDirectory) => {

        toRenderer(['startupOpen', commandLine[3]])

        if (mainWindow)
        {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })



    app.on('ready', async () => {

        if (isDevelopment && !process.env.IS_TEST)
        {
            // try {
            //     await installVueDevtools()
            // } catch (error) {
            //     console.error('Vue Devtools failed to install:', error.toString())
            // }
            BrowserWindow.addDevToolsExtension('node_modules/vue-devtools/vender')
            require('vue-devtools').install()
            
        }
        createWindow()
    })
    
    app.on('window-all-closed', () => {
        if( process.platform !== 'darwin' ) app.quit()
    })
    
    app.on('activate', () => {
        if( mainWindow === null ) createWindow()
    })
}



let createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        frame: false,
        icon:'src/images/icon/vudesigner_logo.png',
        webPreferences: {
            nodeIntegration: true
        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    } else {
        createProtocol('app')
        mainWindow.loadURL('app://./index.html')
    }

    mainWindow.maximize()
    mainWindow.setTitle(`Layout Editor ${app.getVersion()}`)
    mainWindow.on('closed', () => { mainWindow = null })

    globalShortcut.register('f5', () => {
        mainWindow.reload()
    })
}



let toRenderer = (arg) => {
    mainWindow.webContents.send('mainCommand', arg)
}



ipcMain.on('loaded', (event) => {

    toRenderer(['startupOpen', process.argv[1]])

    autoUpdater.on('error', function (err) {
        toRenderer(['update_error', JSON.stringify(err)])
    })

    autoUpdater.on('checking-for-update', () => {
        toRenderer(['update_checking'])
    })

    autoUpdater.on('update-available', function (info) {
        toRenderer(['update_available', JSON.stringify(info)])
    })

    autoUpdater.on('update-not-available', function () {
        toRenderer(['update_not_available'])
    })

    autoUpdater.on('update-downloaded', function () {
        toRenderer(['update_downloaded'])
    })

    autoUpdater.logger = log
    autoUpdater.logger.transports.file.level = 'info'
    log.info('App starting...')

    setTimeout(() => {
        autoUpdater.checkForUpdatesAndNotify()
    }, 3000)

})
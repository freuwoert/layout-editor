const { app, BrowserWindow, globalShortcut } = require('electron')
const { autoUpdater } = require('electron-updater')
const { ipcMain } = require('electron')
const electron = require('electron')
const log = require('electron-log')
const Menu = electron.Menu



let quit = false
let mainWindow = null

const gotTheLock = app.requestSingleInstanceLock()



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



    app.on('ready', () => {

        createWindow()
    
        const template = [
            {
                label:'Edit',
                submenu:[
                    {
                        label: 'Settings',
                        accelerator: 'CmdOrCtrl+Shift+E',
                        click (){toRenderer(['openSettings'])}
                    }
                ]
            },{
                label:'Fenster',
                submenu:[
                    {label: 'Open Dev Tools', role: 'toggledevtools'},
                ]
            }
        ]
    
        mainWindow.setMenu(Menu.buildFromTemplate(template))
        //mainWindow.setMenu(null)
    
        mainWindow.on('close', (e) => {
            let choice = require('electron').dialog.showMessageBoxSync(this,{
                type: 'warning',
                buttons: ['Close', 'Cancel'],
                title: 'Close program?',
                message: 'Are you sure you want to close the program?\n Unsaved progress will be lost.'
            })
            
            if(choice == 1){
                quit = false
                e.preventDefault()
            } else {
                quit = true
            }
    
        })
    
    })
    
    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })
    
    app.on('activate', () => {
        if (mainWindow === null) createWindow()
    })
}

let createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        frame: false,
        icon:'src/images/icon/layout_editor_logo.png',
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadFile('index.html')
    mainWindow.maximize()
    mainWindow.setTitle(`Layout Editor ${app.getVersion()}`)
    mainWindow.on('closed', function () { mainWindow = null })
    //mainWindow.webContents.openDevTools()

    globalShortcut.register('f5', function() {
		mainWindow.reload()
	})
}


///////////////////////////////////////////////////////////////
////////////////////////Request Methods////////////////////////
///////////////////////////////////////////////////////////////

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
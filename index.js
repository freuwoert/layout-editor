const { app, BrowserWindow, globalShortcut } = require('electron')
const { autoUpdater } = require('electron-updater')
const { ipcMain } = require('electron')
const electron = require('electron')
const log = require('electron-log')
const Menu = electron.Menu
quit = false

let mainWindow

function createWindow () {
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

app.on('ready', function(){

    createWindow()

    const template = [
        {
            label:'File',
            submenu: [
                {
                    label:'New',
                    accelerator: 'CmdOrCtrl+N',
                    click (){toRenderer(['new'])}
                },{
                    label:'Open',
                    accelerator: 'CmdOrCtrl+O',
                    click (){toRenderer(['open'])}
                },
                {type: 'separator'},
                {
                    label:'Home',
                    accelerator: 'CmdOrCtrl+Shift+H',
                    click (){toRenderer(['home'])}
                },
                {type: 'separator'},
                {
                    label:'Save',
                    accelerator: 'CmdOrCtrl+S',
                    click (){toRenderer(['save'])}
                },{
                    label:'Save as...',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click (){toRenderer(['saveas'])}
                },
                {type: 'separator'},
                {
                    label:'Close',
                    click(){toRenderer(['close'])}
                }
            ]
        },{
            label:'Edit',
            submenu:[
                {label: 'Copy', role: 'copy'},
                {label: 'Paste', role: 'paste'},
                {label: 'Cut', role: 'cut'},
                {type: 'separator'},
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

    mainWindow.on('close', function(e){
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
            //enable close for printWindow
            quit = true
        }

    })

})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') { app.quit() }
})

app.on('activate', function () {
    if (mainWindow === null) { createWindow() }
})



///////////////////////////////////////////////////////////////
////////////////////////Request Methods////////////////////////
///////////////////////////////////////////////////////////////

function toRenderer(arg) { mainWindow.webContents.send('msgFromMain', arg) }

ipcMain.on('loaded', (event) => {
    
    if (process.platform == 'win32' && process.argv.length >= 2) {
        toRenderer(['startupOpen',process.argv[1]])
    }

    ///////////////////////////////////////////////////////////////
    ////////////////////////Updater Methods////////////////////////
    ///////////////////////////////////////////////////////////////

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
ipcRenderer.on('mainCommand', function(event, args) {

    const commandsFromMain = {
        startupOpen:    (args)=>{ console.log('DATA: ' + args[1]) },
        openSettings:   (args)=>{ app.GENERAL_UI.settings = true },

        update_checking:        (args)=>{ new Toast('INFO','Searching for updates...', 4000) },
        update_available:       (args)=>{ new Toast('INFO','Update found: <b>Gencestor '+ JSON.parse(args[1]).version +'</b>', 3000) },
        update_not_available:   (args)=>{ new Toast('INFO','You are up to date!') },
        update_downloaded:      (args)=>{ new Toast('INFO','<b>Update wurde heruntergeladen!</b><br>Sie können das Programm jederzeit neustarten, um das Update zu installieren.', 8000) },
        update_error:           (args)=>{ new Toast('ERROR','Update error:<br>' + args[1]) },
    }

    if( commandsFromMain.hasOwnProperty(args[0]) ){
        commandsFromMain[args[0]](args)
    }
    
})
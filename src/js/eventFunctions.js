require('electron').ipcRenderer.on('msgFromMain', function(event, args) {

    const commandsFromMain = {
        save:           (args)=>{ app.MEMORY.logged ? file.save() : initLogin() },
        saveas:         (args)=>{ app.MEMORY.logged ? file.save('SAVEAS') : initLogin() },
        new:            (args)=>{ createFileIfSignedIn() },
        home:           (args)=>{ homescreenIfSignedIn() },
        //startupOpen:    (args)=>{ file.openOnStart(args[1]) },
        open:           (args)=>{ openFileIfSignedIn() },
        openSettings:   (args)=>{ openSettings() },

        update_checking:        (args)=>{ sendAToast('info','Suche nach Updates...', 4000) },
        update_available:       (args)=>{ sendAToast('info','Update gefunden: <b>Gencestor '+ JSON.parse(args[1]).version +'</b>', 3000) },
        update_not_available:   (args)=>{ sendAToast('info','Sie sind auf dem neusten Stand!') },
        update_downloaded:      (args)=>{ sendAToast('info','<b>Update wurde heruntergeladen!</b><br>Sie können das Programm jederzeit neustarten, um das Update zu installieren.', 8000) },
        update_error:           (args)=>{ sendAToast('error','Update Fehler:<br>' + args[1]) },
    }

    if( commandsFromMain.hasOwnProperty(args[0]) ){
        commandsFromMain[args[0]](args)
    }
    
})
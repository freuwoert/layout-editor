const _ = require('lodash')

app = new Vue({
    el:'#app',
    data: {
        info: {
            versionName: 'Founders Update',
            version: require('electron').remote.app.getVersion(),
            apiVersion: '0.1.0',
            electronVersion: process.versions.electron,
            nodeVersion: process.versions.node,
        },
        UI: {
            releaseNote: false,
            login: false,
            settings: false,
            activeSetting: 'INFO'
        }
    },
    methods: {},
    created: function(){},
})



/////////////////////////////////////////////////
//               INITIALIZATION                //
/////////////////////////////////////////////////

//send a msg to main to let it know renderer has loaded
ipcRenderer.send('loaded')



const remote = require('electron').remote

// When document has loaded, initialise
document.onreadystatechange = () => {
    if (document.readyState == "complete")
    {
        handleWindowControls()

        // Show release notes after update
        if(settings.get('currentVersion') != app.info.version)
        {
            app.UI.releaseNote = true
            settings.set('currentVersion', app.info.version)
        }

        setTimeout(() => {
            document.getElementById('preloader').classList.add('loaded')
        }, 400)
    }
}

function handleWindowControls() {

    let win = remote.getCurrentWindow()
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize()
    })

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize()
    })

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize()
    })

    document.getElementById('close-button').addEventListener("click", event => {
        win.close()
    })

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    if (win.isMaximized()) {
        document.body.classList.add('maximized')
    } else {
        document.body.classList.remove('maximized')
    }

    win.on('maximize', function() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized')
        } else {
            document.body.classList.remove('maximized')
        }
    })
    win.on('unmaximize', function() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized')
        } else {
            document.body.classList.remove('maximized')
        }
    })

}
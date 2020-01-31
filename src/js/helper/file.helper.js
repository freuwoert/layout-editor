window.openLayoutSaveDialog = (id, force, callback) => {

    if( id < app.TABS.length )
    {
        if( force || app.TABS[id].savePath == null )
        {
            dialog.showSaveDialog({filters:[{ name: 'Layout Editor Files', extensions: ['lef'] }]}).then((data)=>{
                if( !data.canceled ) callback(data.filePath)
                else callback(null)
            }).catch((error)=>{
                callback(null)
            })
        }
        else if(app.TABS[id].savePath != null)
        {
            callback(app.TABS[id].savePath)
        }
        else
        {
            callback(null)
        }
    }
}

window.saveLayoutTabTo = (tab, path = null) => {

    let content = JSON.stringify(tab.DOCUMENT)

    if( path != null )
    {
        try {
            fs.writeFile(path, content, 'utf8', ()=>{})
        }
        catch(e) {
            console.error(e)
            new Toast('ERROR', 'Could not save file!')
        }
    }
}
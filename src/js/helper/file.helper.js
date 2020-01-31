window.openLayoutSaveDialog = (tab, force, callback) => {

    if( force || tab.SAVE_PATH == null )
    {
        dialog.showSaveDialog({filters:[{ name: 'Layout Editor Files', extensions: ['lef'] }]}).then((data)=>{
            if( !data.canceled ) callback(data.filePath)
            else callback(null)
        }).catch((error)=>{
            callback(null)
        })
    }
    else if(tab.SAVE_PATH != null)
    {
        callback(tab.SAVE_PATH)
    }
    else
    {
        callback(null)
    }
}

window.saveLayoutTabTo = (tab, path = null, callback) => {

    let content = JSON.stringify(tab.DOCUMENT)

    if( path != null )
    {
        try {
            fs.writeFile(path, content, 'utf8', ()=>{
                callback('SUCCESS')
            })
        }
        catch(e) {
            console.error(e)
            new Toast('ERROR', 'Could not save file!')
            callback('ERROR')
        }
    }
    else
    {
        callback('ERROR')
    }
}



window.saveLayout = (options, callback) => {
    
    if(typeof options.tab != 'undefined' && typeof options.force != 'undefined')
    {
        openLayoutSaveDialog(options.tab, options.force, (path) => {
            saveLayoutTabTo(options.tab, path, (result) => {

                if(result == 'SUCCESS')
                {
                    options.tab.CHANGED = false
                    options.tab.SAVE_PATH = path
    
                    callback(options.tab)
                }
            })
        })
    }
}
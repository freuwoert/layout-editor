window.showLayoutSaveDialog = (tab, force, callback) => {

    if( force || tab.SAVE_PATH == null )
    {
        dialog.showSaveDialog({filters:[{ name: 'VuDesigner Document', extensions: ['vdd'] }]}).then((data)=>{
            if( !data.canceled )
            {
                callback(data.filePath)
                return
            }
            else
            {
                callback(null)
                return
            }
        }).catch((error)=>{
            callback(null)
            return
        })
    }
    else if(tab.SAVE_PATH != null)
    {
        callback(tab.SAVE_PATH)
        return
    }
    else
    {
        callback(null)
        return
    }
}

window.saveLayoutTabTo = (tab, path = null, callback) => {

    let content = JSON.stringify(tab.DOCUMENT)

    if( path != null )
    {
        try {
            fs.writeFile(path, content, 'utf8', ()=>{
                callback('SUCCESS')
                return
            })
        }
        catch(error) {
            callback('ERROR')
            new Toast('ERROR', 'Could not save file!')
            return
        }
    }
    else
    {
        callback('ERROR')
        return
    }
}



window.saveLayout = (options, callback) => {
    
    if(typeof options.tab != 'undefined' && typeof options.force != 'undefined')
    {
        showLayoutSaveDialog(options.tab, options.force, (path) => {
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



window.setSavePath = (tab) => {
    showLayoutSaveDialog(tab, true, (path) => {
        tab.SAVE_PATH = path
    })
}



window.showLayoutOpenDialog = (callback) => {
    dialog.showOpenDialog({filters:[{ name: 'VuDesigner Document', extensions: ['vdd'] }]}).then((data)=>{
        if( !data.canceled )
        {
            callback(data.filePaths)
            return
        }
        else
        {
            callback(null)
            return
        }
    }).catch((error)=>{
        callback(null)
        return
    })
}

window.getLayoutTabsFromPath = (paths, callback) => {

    let tabs = []
    let normPaths

    switch (typeof paths) {
        case 'object': normPaths = paths; break
        case 'string': normPaths = [paths]; break
        default: normPaths = []; break
    }
    


    if( normPaths != null )
    {

        for (let i = 0; i < normPaths.length; i++) {
            let path = normPaths[i]

            let tab, content, rawContent
            
            try {
                rawContent = fs.readFileSync(path, {encoding: 'utf8'})
                content = JSON.parse(rawContent)
            } catch (error) {
                continue
            }

            tab = {
                document: content,
                path: path
            }
    
            tabs.push(tab)
        }
    }


    callback(tabs)
    return
}



window.openLayout = (options, callback) => {
    
    if( !options.paths )
    {
        showLayoutOpenDialog((paths) => {
            getLayoutTabsFromPath(paths, (rawTabs)=>{

                let preparedTabs = []

                rawTabs.forEach(tab => {
                    let blank = unlink(app.TAB_TEMPLATE)
    
                    blank.NAME = path.parse(tab.path).name
                    blank.VIEW = 'EDIT'
                    blank.SAVE_PATH = tab.path
                    blank.DOCUMENT = tab.document

                    preparedTabs.push(blank)
                })
                
                app.TABS.push(...preparedTabs)
                callback(preparedTabs)
            })
        })
    }
    else
    {
        getLayoutTabsFromPath(options.paths, (rawTabs)=>{

            let preparedTabs = []

            rawTabs.forEach(tab => {
                let blank = unlink(app.TAB_TEMPLATE)

                blank.NAME = path.parse(tab.path).name
                blank.VIEW = 'EDIT'
                blank.SAVE_PATH = tab.path
                blank.DOCUMENT = tab.document

                preparedTabs.push(blank)
            })
            
            app.TABS.push(...preparedTabs)
            callback(preparedTabs)
        })
    }
}
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
                    blank.VIEW = 'VIEW:LAYOUT_EDITOR'
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
                blank.VIEW = 'VIEW:LAYOUT_EDITOR'
                blank.SAVE_PATH = tab.path
                blank.DOCUMENT = tab.document

                preparedTabs.push(blank)
            })
            
            app.TABS.push(...preparedTabs)
            callback(preparedTabs)
        })
    }
}
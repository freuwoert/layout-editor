window.newTab = (name = 'New Tab') => {

    let blank = unlink(app.TAB_TEMPLATE)

    blank.NAME = name

    app.TABS.push(blank)

    let newID = app.TABS.length - 1

    // save old tab to memory
    app.TABS[app.ACTIVE_TAB] = unlink(app.TAB)

    // set new tab
    app.TAB = unlink(app.TABS[newID])
    app.ACTIVE_TAB = newID
}



window.selectTab = (id) => {

    if(id < app.TABS.length)
    {
        // save old tab to memory
        app.TABS[app.ACTIVE_TAB] = unlink(app.TAB)

        // set new tab
        app.TAB = unlink(app.TABS[id])
        app.ACTIVE_TAB = id
    }
}



window.closeTab = (id) => {
    if(id < app.TABS.length && app.TABS.length > 1)
    {
        if(!app.TABS[id].CHANGED)
        {
            app.TABS.splice(id, 1)

            // get new tab id
            if(id > 0) id--
            else if (id < app.TABS.length - 1) id++
    
            // set new tab
            app.TAB = unlink(app.TABS[id])
            app.ACTIVE_TAB = id
        }
    }
}
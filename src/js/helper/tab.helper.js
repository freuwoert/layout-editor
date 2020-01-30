window.newTab = (name = 'New Tab') => {

    let blank = JSON.parse(JSON.stringify(app.TAB_TEMPLATE))

    blank.NAME = name

    app.TABS.push(blank)

    let newID = app.TABS.length - 1

    // save old tab to memory
    app.TABS[app.ACTIVE_TAB] = JSON.parse(JSON.stringify(app.TAB))

    // set new tab
    app.TAB = app.TABS[newID]
    app.ACTIVE_TAB = newID
}

window.selectTab = (id) => {

    if(id < app.TABS.length)
    {
        // save old tab to memory
        app.TABS[app.ACTIVE_TAB] = JSON.parse(JSON.stringify(app.TAB))

        // set new tab
        app.TAB = app.TABS[id]
        app.ACTIVE_TAB = id
    }
}
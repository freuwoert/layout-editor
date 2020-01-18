window.TAB = () => {
    return app.TAB[app.A]
}

window.TAB$ = (comparison) => {
    return app.TAB[app.A] == comparison
}

window.PANEL = () => {
    return TAB().FOCUSED_PANEL
}

window.PANEL$ = (comparison) => {
    return TAB().FOCUSED_PANEL == comparison
}



window.isValidHtmlTrace = (trace) => {

    if( typeof trace == 'string' )
    {
        trace = trace.split('-')
    }

    let query = 'app.TAB[app.A].DOCUMENT.HTML'

    for ( let i = 0; i < trace.length; i++ ) {
        if( trace[i] )
        {
            query += '[' + trace[i] + ']'
    
            if( (i+1) < trace.length ){
                query += '.children'
            }
        }
    }

    return typeof eval(query) == 'object'
}



window.getChildrenFromTrace = (trace) => {

    if( typeof trace == 'string' )
    {
        trace = trace.split('-')
    }

    let query = 'app.TAB[app.A].DOCUMENT.HTML'

    for ( let i = 0; i < trace.length; i++ ) {
        query += '[' + trace[i] + ']'

        if( (i+1) < trace.length ){
            query += '.children'
        }
    }

    if(trace.length > 0)
    {
        query += '.children'
    }

    return (typeof eval(query) == 'object') ? eval(query) : null
}



window.flattenObject = (ob, k = '', ret = []) => {

    if(Array.isArray(ob)){
        for (let i = 0; i < ob.length; i++) {
            p = (k == '') ? i+'' : k+'-'+i
            ret.push(p)
            flattenObject(ob[i]['children'], p, ret)
        }
    } else {
        flattenObject(ob['children'], k, ret)
    }
    
    return ret
}



window.updateStructureOL = () => {
    try {
        TAB().HTML_OL = flattenObject(TAB().DOCUMENT.HTML)
    } catch (error) {
        
    }
}



window.disableInputArrowKeys = (event) => {
    if(event.keyCode == 40 || event.keyCode == 38){
        event.preventDefault()
    }
}
window.TAB = () => {
    return app.TAB
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

window.VIEW = () => {
    return TAB().VIEW
}

window.VIEW$ = (comparison) => {
    return TAB().VIEW == comparison
}



window.isValidTrace = (trace, panel = 'HTML') => {

    if( !trace || typeof trace == 'null')
    {
        return false
    }
    else
    {
        trace = JSON.parse(JSON.stringify(trace))
    }

    let isProp = false



    if( trace && typeof trace == 'string' )
    {
        try {
            trace = trace.split('-')
        } catch (error) {
            return false
        }
    }



    if( trace && trace[trace.length-1] == 'prop' )
    {
        try {
            isProp = true
            trace.pop()
        } catch (error) {
            return false
        }

        if( panel == 'HTML' ) return false
    }



    let query = (panel == 'HTML') ? 'app.TAB.DOCUMENT.HTML' : 'app.TAB.DOCUMENT.CSS'

    if( trace )
    {
        try {
            for ( let i = 0; i < trace.length; i++ ) {
                if( trace[i] )
                {
                    if( i >= trace.length - 1 && isProp){
                        query += '.properties'
                    }
                    else
                    {
                        query += '.children'
                    }
                    query += '[' + trace[i] + ']'
                }
            }
        } catch (error) {
            return false
        }
    }



    try {
        return typeof eval(query) == 'object'
    } catch (error) {
        return false
    }
}



window.getChildrenFromTrace = (trace, panel = 'HTML') => {

    trace = JSON.parse(JSON.stringify(trace))
    let isProp = false

    if( typeof trace == 'string' )
    {
        trace = trace.split('-')
    }

    if(trace[trace.length-1] == 'prop')
    {
        isProp = true
        trace.pop()
        if( panel == 'HTML' ) return null
    }

    let query = (panel == 'HTML') ? 'app.TAB.DOCUMENT.HTML' : 'app.TAB.DOCUMENT.CSS'

    for ( let i = 0; i < trace.length; i++ ) {
        if( trace[i] )
        {
            query += '.children[' + trace[i] + ']'
        }
    }

    query = (isProp) ? query + '.properties' : query + '.children'

    return (typeof eval(query) == 'object') ? eval(query) : null
}



window.flattenObject = (ob, k = '', ret = []) => {

    if(Array.isArray(ob))
    {
        for (let i = 0; i < ob.length; i++)
        {
            p = (k == '') ? i+'' : k+'-'+i
            ret.push(p)

            if(typeof ob[i]['properties'] == 'object')
            {
                for (let ii = 0; ii < ob[i]['properties'].length; ii++)
                {
                    ret.push(`${p}-${ii}-prop`)
                }
            }

            flattenObject(ob[i]['children'], p, ret)
        }
    }
    else
    {
        flattenObject(ob['children'], k, ret)
    }
    
    return ret
}



window.updateStructureOL = () => {
    try {
        TAB().HTML_OL = flattenObject(TAB().DOCUMENT.HTML)
    } catch (error) {
        new Toast('ERROR', 'INTERNAL ERROR: '+error)
    }
}

window.updateStyleOL = () => {
    try {
        TAB().CSS_OL = flattenObject(TAB().DOCUMENT.CSS)
    } catch (error) {
        new Toast('ERROR', 'INTERNAL ERROR: '+error)
    }
}

window.activeTabChanged = () => {
    TAB().CHANGED = true
}



window.disableInputArrowKeys = (event) => {
    if(event.keyCode == 40 || event.keyCode == 38){
        event.preventDefault()
    }
}
window.TAB = () => {
    return app.TAB[app.A]
}

window.PANEL = (comparePanel) => {
    return TAB().FOCUSED_PANEL == comparePanel
}



window.isValidHtmlTrace = (trace) => {

    if( typeof trace == 'string' )
    {
        trace = trace.split('-')
    }

    let query = 'app.TAB[app.A].DOCUMENT.HTML['

    for ( let i = 0; i < trace.length; i++ ) {
        query += trace[i] + ']'

        if( (i+1) < trace.length ){
            query += '.children['
        }
    }

    return (typeof eval(query) == 'object') ? true : false
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
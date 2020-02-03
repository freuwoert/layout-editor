window.openStyleAddDist = (trace, direction = 'INTO') => {

    if( trace.endsWith('-prop') )
    {
        console.log('ADD PROP')
    }
    else if( trace.endsWith('-propadd') )
    {
        console.log('ADD PROP (btn)')
    }
    else if( isValidTrace(trace, 'CSS') )
    {
        openStyleAdd(trace, direction)
    }
    else
    {
        openStyleAdd(null, null)
    }
}

window.openStyleAdd = (trace, direction = 'INTO') => {

    if(direction == null) direction = 'INTO'
    
    if( direction == 'INTO' || direction == 'ABOVE' || direction == 'BELOW' )
    {
        // sloppy solution but it works
        setTimeout(() => { app.$refs.styleInput.focus() }, 1)

        TAB().FOCUSED_PANEL = 'STYLE_ADD'
        TAB().UI_DATA.styleAddTrace = isValidTrace(trace, 'CSS') ? trace : null
        TAB().UI_DATA.styleAddDirection = isValidTrace(trace, 'CSS') ? direction : 'BELOW' 
        TAB().UI_DATA.styleAddInput = ''
        TAB().UI.styleAdd = true
    }
    else
    {
        new Toast('ERROR','Could not add element due to an invalid direction!', 4000)
    }
}

window.closeStyleAdd = () => {
    app.$refs.styleInput.blur()
    TAB().FOCUSED_PANEL = 'STYLE'
    TAB().UI_DATA.styleAddTrace = ''
    TAB().UI_DATA.styleAddInput = ''
    TAB().UI.styleAdd = false
}







window.addStyleAdd = (item, trace, direction) => {
    
    if( !item ) return

    layout = (typeof item == 'object') ? item : [{label: item, properties:[], children: [] }]
    
    let valid = true

    if( !layout ) valid = false
    if(direction != 'INTO' && direction != 'ABOVE' && direction != 'BELOW') valid = false

    if( valid )
    {
        if(isValidTrace(trace, 'CSS'))
        {
            trace = trace.split('-')

            if(trace[trace.length-1] == 'prop'){
                trace.pop()
                trace.pop()
            }
        
            if( direction == 'INTO' )
            {
                getChildrenFromTrace(trace, 'CSS').unshift(...layout)
            }
            else if( direction == 'ABOVE' )
            {
                let insertPos = parseInt(trace.pop())
                getChildrenFromTrace(trace, 'CSS').splice(insertPos, 0, ...layout)
            }
            else if( direction == 'BELOW' )
            {
                let insertPos = parseInt(trace.pop()) + 1
                getChildrenFromTrace(trace, 'CSS').splice(insertPos, 0, ...layout)
            }
        }
        else
        {
            getChildrenFromTrace([], 'CSS').unshift(...layout)
        }
    
        updateStyleOL()
        closeStyleAdd()
        activeTabChanged()
    }
}





window.removeStyleRemove = (trace) => {
    if( isValidTrace(trace, 'CSS') )
    {
        trace = trace.split('-')

        let cutPos = null

        if( trace[trace.length - 1] == 'prop' )
        {
            trace.pop()
            cutPos = trace.pop()
            trace.push('prop')
        }
        else
        {
            cutPos = trace.pop()
        }
        
        getChildrenFromTrace(trace, 'CSS').splice(cutPos, 1)
        updateStyleOL()
        activeTabChanged()

        if( isValidTrace(TAB().FOCUSED_CSS, 'CSS') ) TAB().FOCUSED_CSS = '0'
    }
}
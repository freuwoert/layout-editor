

window.openStyleAdd = (trace, direction = 'INTO') => {
    
    if( direction == 'INTO' || direction == 'ABOVE' || direction == 'BELOW' )
    {
        TAB().FOCUSED_PANEL = 'STYLE_ADD'
        TAB().UI_DATA.styleAddTrace = isValidTrace(trace, 'CSS') ? trace : null
        TAB().UI_DATA.styleAddDirection = isValidTrace(trace, 'CSS') ? direction : 'BELOW' 
        TAB().UI_DATA.styleAddName = ''
        TAB().UI.styleAdd = true
    }
    else
    {
        new Toast('ERROR','Could not add element due to an invalid direction!', 4000)
    }
}

window.closeStyleAdd = () => {
    app.$refs.styleName.blur()
    TAB().FOCUSED_PANEL = 'STYLE'
    TAB().UI_DATA.styleAddTrace = ''
    TAB().UI_DATA.styleAddName = ''
    TAB().UI.styleAdd = false
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

        if( isValidTrace(TAB().FOCUSED_CSS, 'CSS') ) TAB().FOCUSED_CSS = '0'
    }
}
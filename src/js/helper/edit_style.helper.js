window.openStyleAddDist = (trace, direction = 'INTO') => {

    if( trace.endsWith('-prop') )
    {
        trace = trace.split('-')
        trace.pop()
        trace.pop()
        openStylePropAdd(trace.join('-'))
    }
    else if( trace.endsWith('-propadd') )
    {
        trace = trace.split('-')
        trace.pop()
        openStylePropAdd(trace.join('-'))
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
                getObjectFromTrace(trace, 'CSS').children.unshift(...layout)
            }
            else if( direction == 'ABOVE' )
            {
                let insertPos = parseInt(trace.pop())
                getObjectFromTrace(trace, 'CSS').children.splice(insertPos, 0, ...layout)
            }
            else if( direction == 'BELOW' )
            {
                let insertPos = parseInt(trace.pop()) + 1
                getObjectFromTrace(trace, 'CSS').children.splice(insertPos, 0, ...layout)
            }
        }
        else
        {
            getObjectFromTrace([], 'CSS').children.unshift(...layout)
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
        let isProp = false

        if( trace[trace.length - 1] == 'prop' )
        {
            trace.pop()
            cutPos = trace.pop()
            trace.push('prop')
            isProp = true
        }
        else
        {
            cutPos = trace.pop()
        }
        
        if( isProp ) getObjectFromTrace(trace, 'CSS').properties.splice(cutPos, 1)
        else getObjectFromTrace(trace, 'CSS').children.splice(cutPos, 1)
        updateStyleOL()
        activeTabChanged()

        if( isValidTrace(TAB().FOCUSED_CSS, 'CSS') ) TAB().FOCUSED_CSS = '0'
    }
}



window.openStylePropAdd = (trace) => {

    // sloppy solution but it works
    setTimeout(() => { app.$refs.stylePropName.focus() }, 1)

    TAB().FOCUSED_PANEL = 'STYLE_PROP_ADD'
    TAB().UI_DATA.stylePropAddTrace = isValidTrace(trace, 'CSS') ? trace : null
    TAB().UI_DATA.stylePropAddStep = 0
    TAB().UI_DATA.stylePropAddName = ''
    TAB().UI_DATA.stylePropAddValue = ''
    TAB().UI.stylePropAdd = true
}

window.closeStylePropAdd = () => {
    app.$refs.stylePropName.blur()
    app.$refs.stylePropValue.blur()
    TAB().FOCUSED_PANEL = 'STYLE'
    TAB().UI_DATA.stylePropAddTrace = ''
    TAB().UI_DATA.stylePropAddStep = 0
    TAB().UI_DATA.stylePropAddName = ''
    TAB().UI_DATA.stylePropAddValue = ''
    TAB().UI.stylePropAdd = false
}

window.addStylePropSetStep = (newStep, callback = null) => {

    let step = 0

    if( newStep == 'NEXT')
    {
        switch (TAB().UI_DATA.stylePropAddStep) {
            case 0: step = 1; break
            case 1: step = 2; break
            default: step = 0; break
        }
    }
    else if( newStep == 'PREVIOUS')
    {
        switch (TAB().UI_DATA.stylePropAddStep) {
            case 1: step = 0; break
            case 2: step = 1; break
            default: step = 0; break
        }
    }
    else
    {
        step = newStep
    }

    TAB().UI_DATA.stylePropAddStep = unlink(step)

    if( step == 0 )
    {
        app.$refs.stylePropName.focus()
        app.$refs.stylePropName.select()
        app.$refs.stylePropValue.blur()
    }
    else if ( step == 1 )
    {
        app.$refs.stylePropName.blur()
        app.$refs.stylePropValue.focus()
        app.$refs.stylePropValue.select()
    }
    else if ( step == 2 )
    {
        app.$refs.stylePropName.blur()
        app.$refs.stylePropValue.blur()

        if(callback) callback()
    }
}

window.addStylePropAdd = (item, trace) => {
    
    if( !item.name ) return
    if( !item.value ) return
    
    layout = [{label: item.name, value: item.value}]
    
    if(isValidTrace(trace, 'CSS') && TAB().DOCUMENT.CSS.children.length > 0)
    {
        getObjectFromTrace(trace, 'CSS').properties.push(...layout)
    }

    updateStyleOL()
    closeStylePropAdd()
    activeTabChanged()
}

window.addStylePropAddHELPER = () => {
    
    if( !TAB().UI_DATA.stylePropAddName )
    {
        addStylePropSetStep(0)
        return
    }

    if( !TAB().UI_DATA.stylePropAddValue )
    {
        addStylePropSetStep(1)
        return
    }

    if( !isValidTrace(TAB().UI_DATA.stylePropAddTrace, 'CSS') )
    {
        closeStylePropAdd()
        return
    }

    let item = {
        name: TAB().UI_DATA.stylePropAddName,
        value: TAB().UI_DATA.stylePropAddValue
    }

    let trace = TAB().UI_DATA.stylePropAddTrace

    addStylePropAdd(item, trace)
}
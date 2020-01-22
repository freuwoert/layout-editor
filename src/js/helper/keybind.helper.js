window.navigateSECTION = (direction = 'RIGHT') => {

    if(direction == 'RIGHT')
    {
        TAB().FOCUSED_PANEL = 'STYLE'
    }

    if(direction == 'LEFT')
    {
        TAB().FOCUSED_PANEL = 'STRUCTURE'
    }

}




















///////////////////////////////////////////////////////////
/////////////////////// STRUCTURE /////////////////////////
///////////////////////////////////////////////////////////

window.navigateSTRUCTURE = (direction = 'UP', isShift = false) => {

    let trace = TAB().FOCUSED_HTML.split('-')

    // Validate current trace
    if(isValidTrace(trace, 'HTML'))
    {

        let traceProbe = [...trace]
        let traceIndex = TAB().HTML_OL.indexOf(trace.join('-'))

        if(direction == 'UP')
        {
            traceProbe[traceProbe.length - 1]--

            if( isValidTrace(traceProbe, 'HTML') && isShift )
            {
                TAB().FOCUSED_HTML = traceProbe.join('-')
            }
            else
            {
                if( traceIndex > 0 )
                {
                    TAB().FOCUSED_HTML = TAB().HTML_OL[ traceIndex - 1 ]
                }
            }
        }

        if(direction == 'DOWN')
        {
            traceProbe[traceProbe.length - 1]++

            if( isValidTrace(traceProbe, 'HTML') && isShift )
            {
                TAB().FOCUSED_HTML = traceProbe.join('-')
            }
            else
            {
                if( traceIndex < TAB().HTML_OL.length - 1 )
                {
                    TAB().FOCUSED_HTML = TAB().HTML_OL[ traceIndex + 1 ]
                }
            }
        }
    }
    else
    {
        TAB().FOCUSED_HTML = '0'
    }
}

window.editSTRUCTURE = (element = 'CURRENT') => {
    let trace = null

    if( element == 'CURRENT' && isValidTrace(TAB().FOCUSED_HTML, 'HTML') )
    {
        trace = TAB().FOCUSED_HTML
    }
    else if( isValidTrace(element, 'HTML') )
    {
        trace = element
    }

    // Proceed with valid trace
    if( trace )
    {
        // Do Something
    }
}



window.openStructureAdd = (trace, direction = 'INTO') => {
    
    if( isValidTrace(trace, 'HTML') )
    {
        if( direction == 'INTO' || direction == 'ABOVE' || direction == 'BELOW' )
        {
            TAB().FOCUSED_PANEL = 'STRUCTURE_ADD'
            TAB().UI_DATA.structureAddTrace = trace
            TAB().UI_DATA.structureAddDirection = direction
            TAB().UI_DATA.structureAddSearch = ''
            TAB().UI.structureAdd = true
        }
        else
        {
            new Toast('ERROR','Could not add element due to an invalid direction!', 4000)
        }
    }
    else
    {
        new Toast('WARNING','No entry point! Please select an element.', 4000)
    }
}

window.closeStructureAdd = () => {
    app.$refs.structureSearch.blur()
    TAB().FOCUSED_PANEL = 'STRUCTURE'
    TAB().UI_DATA.structureAddTrace = ''
    TAB().UI_DATA.structureAddSearch = ''
    TAB().UI.structureAdd = false
}

window.selectStructureAddSuggestion = (suggestion) => {
    new Toast('INFO', suggestion)
}

window.focusStructureAddSearch = () => {
    TAB().FOCUSED_PANEL = 'STRUCTURE_ADD_SEARCH'
    app.$refs.structureSearch.focus()
}

window.blurStructureAddSearch = () => {
    TAB().FOCUSED_PANEL = 'STRUCTURE_ADD'
    app.$refs.structureSearch.blur()
}

window.updateStructureAddSearch = () => {

    let list = app.AVAILABLE_STRUCTURES
    let query = TAB().UI_DATA.structureAddSearch

    let options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "name",
            "type"
        ]
    }

    let fuse = new Fuse(list, options)
    let result = fuse.search(query)

    TAB().UI_DATA.structureAddSearchItems = [...result]
}

window.navigateStructureAddSearch = (direction = 'UP') => {

    let id = TAB().UI_DATA.structureAddSearchSelected
    let itemLength = TAB().UI_DATA.structureAddSearchItems.length

    if(direction == 'UP')
    {
        id = (id > 0) ? id-1 : 0
    }

    if(direction == 'DOWN')
    {
        id = (id < itemLength - 1) ? id+1 : itemLength-1
    }

    TAB().UI_DATA.structureAddSearchSelected = id
}

window.getAbsoluteStructureID = (relativeID, panel) => {
    if(panel == 'STRUCTURE_ADD_SEARCH')
    {
        let absoluteID = TAB().UI_DATA.structureAddSearchItems[relativeID]
        return (absoluteID && absoluteID.hasOwnProperty('id')) ? absoluteID.id : null
    }
}

window.addStructureAdd = (absoluteID, trace, direction) => {

    let valid = true
    let structure = app.AVAILABLE_STRUCTURES.find(element => element.id == absoluteID)

    if(!structure) valid = false
    if(!isValidTrace(trace, 'HTML')) valid = false
    if(direction != 'INTO' && direction != 'ABOVE' && direction != 'BELOW') valid = false

    if( valid )
    {
        ///////////////////////////////////////////////////////////////////////////////////////
        //   The number of times that this JSON-Hack is necessary for the app's survival     //
        //   is equal to the number off elements this recursion would cause without it.      //
        ///////////////////////////////////////////////////////////////////////////////////////
        let layout = JSON.parse(JSON.stringify(structure.layout))

        trace = trace.split('-')
        
        if( direction == 'INTO' )
        {
            getChildrenFromTrace(trace, 'HTML').unshift(...layout)
        }
        else if( direction == 'ABOVE' )
        {
            let insertPos = parseInt(trace.pop())
            getChildrenFromTrace(trace, 'HTML').splice(insertPos, 0, ...layout)
        }
        else if( direction == 'BELOW' )
        {
            let insertPos = parseInt(trace.pop()) + 1
            getChildrenFromTrace(trace, 'HTML').splice(insertPos, 0, ...layout)
        }
    
        new Toast('SUCCESS', 'ADDED ELEMENT')
    
        updateStructureOL()
        closeStructureAdd()
    }
}



window.removeStructureRemove = (trace) => {
    if( isValidTrace(trace, 'HTML') )
    {
        trace = trace.split('-')
        let cutPos = trace.pop()
        getChildrenFromTrace(trace, 'HTML').splice(cutPos, 1)
        updateStructureOL()

        if( isValidTrace(TAB().FOCUSED_HTML, 'HTML') ) TAB().FOCUSED_HTML = '0'
    }
}























///////////////////////////////////////////////////////////
///////////////////////// STYLE ///////////////////////////
///////////////////////////////////////////////////////////

window.navigateSTYLE = (direction = 'UP', isShift = false) => {

    let trace = TAB().FOCUSED_CSS.split('-')

    // Validate current trace
    if(isValidTrace(trace, 'CSS'))
    {
        
        let traceIndex = TAB().CSS_OL.indexOf( trace.join('-') )
        
        if(direction == 'UP')
        {

            if( isShift )
            {
                let foundNearestTrace = false

                while ( !foundNearestTrace )
                {
                    if(traceIndex > 0)
                    {
                        traceIndex = traceIndex - 1
                    }

                    if( !TAB().CSS_OL[ traceIndex ].endsWith('prop') )
                    {
                        TAB().FOCUSED_CSS = TAB().CSS_OL[ traceIndex ]
                        foundNearestTrace = true
                    }
                }

            }
            else
            {
                if( traceIndex > 0 )
                {
                    TAB().FOCUSED_CSS = TAB().CSS_OL[ traceIndex - 1 ]
                }
            }
        }

        if(direction == 'DOWN')
        {

            if( isShift )
            {
                let foundNearestTrace = false

                while ( !foundNearestTrace )
                {
                    if(traceIndex < TAB().CSS_OL.length - 1)
                    {
                        traceIndex++
                    }

                    if( !TAB().CSS_OL[ traceIndex ].endsWith('prop') )
                    {
                        TAB().FOCUSED_CSS = TAB().CSS_OL[ traceIndex ]
                        foundNearestTrace = true
                    }
                }
            }
            else
            {
                if( traceIndex < TAB().CSS_OL.length - 1 )
                {
                    TAB().FOCUSED_CSS = TAB().CSS_OL[ traceIndex + 1 ]
                }
            }
        }
    }
    else
    {
        TAB().FOCUSED_CSS = '0'
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

        if( isValidTrace(TAB().FOCUSED_CSS, 'CSS') ) TAB().FOCUSED_CSS = '0'
    }
}
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
        new Toast('INFO','EDIT:STRUCTURE')
    }
}



window.openStructureAdd = (trace, direction = 'INTO') => {
    
    if( direction == 'INTO' || direction == 'ABOVE' || direction == 'BELOW' )
    {
        TAB().FOCUSED_PANEL = 'STRUCTURE_ADD'
        TAB().UI_DATA.structureAddTrace = isValidTrace(trace, 'HTML') ? trace : null
        TAB().UI_DATA.structureAddDirection = isValidTrace(trace, 'HTML') ? direction : 'BELOW' 
        TAB().UI_DATA.structureAddSearch = ''
        TAB().UI.structureAdd = true
    }
    else
    {
        new Toast('ERROR','Could not add element due to an invalid direction!', 4000)
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
    if(direction != 'INTO' && direction != 'ABOVE' && direction != 'BELOW') valid = false

    if( valid )
    {
        ///////////////////////////////////////////////////////////////////////////////////////
        //   The number of times that this JSON-Hack was necessary for the app's survival    //
        //   is equal to the number off elements this recursion would cause without it.      //
        //   I really should switch to Vuex.                                                 //
        ///////////////////////////////////////////////////////////////////////////////////////
        let layout = JSON.parse(JSON.stringify(structure.layout))


        
        if(isValidTrace(trace, 'HTML'))
        {
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
        }
        else
        {
            getChildrenFromTrace([], 'HTML').unshift(...layout)
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
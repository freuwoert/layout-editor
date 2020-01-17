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



window.navigateHTML = (direction = 'UP', isShift = false) => {

    let trace = TAB().FOCUSED_HTML.split('-')

    // Validate current trace
    if(isValidHtmlTrace(trace))
    {

        let traceProbe = [...trace]
        let traceIndex = TAB().HTML_OL.indexOf(trace.join('-'))

        if(direction == 'UP')
        {
            traceProbe[traceProbe.length - 1]--

            if( isValidHtmlTrace(traceProbe) && isShift )
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

            if( isValidHtmlTrace(traceProbe) && isShift )
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
}



window.editHTML = (element = 'CURRENT') => {
    let trace = null

    if( element == 'CURRENT' && isValidHtmlTrace(TAB().FOCUSED_HTML) )
    {
        trace = TAB().FOCUSED_HTML
    }
    else if( isValidHtmlTrace(element) )
    {
        trace = element
    }

    // Proceed with valid trace
    if( trace )
    {
        new Toast('INFO', trace, 6000)
    }
}



window.addHTML = (element = 'CURRENT') => {
    let trace = null

    if( element == 'CURRENT' && isValidHtmlTrace(TAB().FOCUSED_HTML) )
    {
        trace = TAB().FOCUSED_HTML
    }
    else if( isValidHtmlTrace(element) )
    {
        trace = element
    }

    // Proceed with valid trace
    if( trace )
    {
        openStructureAdd(trace)
    }
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

    let result = []
    let query = TAB().UI_DATA.structureAddSearch

    for (const structure of app.AVAILABLE_STRUCTURES) {
        if(structure.name.includes(query)){
            result.push(structure)
        }
    }

    TAB().UI_DATA.structureAddTags = [...result]
}

window.openStructureAdd = (trace = 'END') => {
    TAB().FOCUSED_PANEL = 'STRUCTURE_ADD'
    TAB().UI_DATA.structureAddTrace = trace
    TAB().UI_DATA.structureAddSearch = ''
    TAB().UI.structureAdd = true
}

window.closeStructureAdd = () => {
    TAB().FOCUSED_PANEL = 'STRUCTURE'
    TAB().UI_DATA.structureAddTrace = ''
    TAB().UI_DATA.structureAddSearch = ''
    TAB().UI.structureAdd = false
}
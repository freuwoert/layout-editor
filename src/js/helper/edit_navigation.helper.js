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
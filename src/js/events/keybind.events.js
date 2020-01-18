Mousetrap.bind(['up'], function(){
    switch (PANEL()){
        case 'STRUCTURE': navigateHTML('UP', false); break
        case 'STRUCTURE_ADD_SEARCH': navigateStructureAddSearch('UP'); break
    }
})

Mousetrap.bind(['down'], function(){
    switch (PANEL()){
        case 'STRUCTURE': navigateHTML('DOWN', false); break
        case 'STRUCTURE_ADD_SEARCH': navigateStructureAddSearch('DOWN'); break
    }
})

Mousetrap.bind(['ctrl+up', 'command+up'], function(){
    switch (PANEL()){
        case 'STRUCTURE': navigateHTML('UP', true); break
    }
})

Mousetrap.bind(['ctrl+down', 'command+down'], function(){
    switch (PANEL()){
        case 'STRUCTURE': navigateHTML('DOWN', true); break
    }
})

Mousetrap.bind(['ctrl+right','command+right'], function(){
    switch (PANEL()){
        case 'STRUCTURE': navigateSECTION('RIGHT'); break
    }
})

Mousetrap.bind(['ctrl+left','command+left'], function(){
    switch (PANEL()){
        case 'STYLE': navigateSECTION('LEFT'); break
    }
})

Mousetrap.bind(['esc'], function(){
    switch (PANEL()){
        case 'STRUCTURE_ADD': closeStructureAdd(); break
        case 'STRUCTURE_ADD_SEARCH': blurStructureAddSearch(); break
    }
})

Mousetrap.bind(['del'], function(){
    switch (PANEL()){
        case 'STRUCTURE': removeStructureRemove(TAB().FOCUSED_HTML); break
    }
})

Mousetrap.bind(['backspace'], function(){
    switch (PANEL()){
        case 'STRUCTURE': removeStructureRemove(TAB().FOCUSED_HTML); break
    }
})

Mousetrap.bind(['enter'], function(){
    switch (PANEL()){
        case 'STRUCTURE': editHTML('CURRENT'); break
        case 'STRUCTURE_ADD': focusStructureAddSearch(); break
        case 'STRUCTURE_ADD_SEARCH': addStructureAdd( getAbsoluteStructureID(TAB().UI_DATA.structureAddSearchSelected, 'STRUCTURE_ADD_SEARCH'), TAB().UI_DATA.structureAddTrace, TAB().UI_DATA.structureAddDirection ); break
    } 
})

Mousetrap.bind(['plus'], function(){
    switch (PANEL()){
        case 'STRUCTURE': openStructureAdd(TAB().FOCUSED_HTML, 'INTO'); break
    }
})

Mousetrap.bind(['shift+plus'], function(){
    switch (PANEL()){
        case 'STRUCTURE': openStructureAdd(TAB().FOCUSED_HTML, 'ABOVE'); break
    }
})

Mousetrap.bind(['ctrl+plus','command+plus'], function(){
    switch (PANEL()){
        case 'STRUCTURE': openStructureAdd(TAB().FOCUSED_HTML, 'BELOW'); break
    }
})

Mousetrap.bind(['1'], function(){
    switch (PANEL()){
        case 'STRUCTURE_ADD': selectStructureAddSuggestion('1'); break
    }
})

Mousetrap.bind(['2'], function(){
    switch (PANEL()){
        case 'STRUCTURE_ADD': selectStructureAddSuggestion('2'); break
    }
})

Mousetrap.bind(['3'], function(){
    switch (PANEL()){
        case 'STRUCTURE_ADD': selectStructureAddSuggestion('3'); break
    }
})

Mousetrap.bind(['4'], function(){
    switch (PANEL()){
        case 'STRUCTURE_ADD': selectStructureAddSuggestion('4'); break
    }
})

Mousetrap.bind(['5'], function(){
    switch (PANEL()){
        case 'STRUCTURE_ADD': selectStructureAddSuggestion('5'); break
    }
})

Mousetrap.bind(['6'], function(){
    switch (PANEL()){
        case 'STRUCTURE_ADD': selectStructureAddSuggestion('6'); break
    }
})
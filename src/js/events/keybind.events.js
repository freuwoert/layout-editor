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

Mousetrap.bind(['shift+right'], function(){
    switch (PANEL()){
        case 'STRUCTURE': navigateSECTION('RIGHT'); break
    }
})

Mousetrap.bind(['shift+left'], function(){
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

Mousetrap.bind(['enter'], function(){
    switch (PANEL()){
        case 'STRUCTURE': editHTML('CURRENT'); break
        case 'STRUCTURE_ADD': focusStructureAddSearch(); break
        case 'STRUCTURE_ADD_SEARCH': addStructureAdd( getAbsoluteStructureID(TAB().UI_DATA.structureAddSearchSelected, 'STRUCTURE_ADD_SEARCH'), TAB().UI_DATA.structureAddTrace, TAB().UI_DATA.structureAddDirection ); break
    } 
})

Mousetrap.bind(['plus'], function(){
    switch (PANEL()){
        case 'STRUCTURE': openStructureAdd(TAB().FOCUSED_HTML, 'BELOW'); break
    }
})

Mousetrap.bind(['shift+plus'], function(){
    switch (PANEL()){
        case 'STRUCTURE': openStructureAdd(TAB().FOCUSED_HTML, 'ABOVE'); break
    }
})

Mousetrap.bind(['ctrl+plus','command+plus'], function(){
    switch (PANEL()){
        case 'STRUCTURE': openStructureAdd(TAB().FOCUSED_HTML, 'INTO'); break
    }
})
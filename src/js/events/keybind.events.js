Mousetrap.bind(['up'], function(){
    switch (PANEL()){
        case 'STRUCTURE': navigateSTRUCTURE('UP', false); break
        case 'STRUCTURE_ADD_SEARCH': navigateStructureAddSearch('UP'); break
        case 'STYLE': navigateSTYLE('UP', false); break
    }
})

Mousetrap.bind(['down'], function(){
    switch (PANEL()){
        case 'STRUCTURE': navigateSTRUCTURE('DOWN', false); break
        case 'STRUCTURE_ADD_SEARCH': navigateStructureAddSearch('DOWN'); break
        case 'STYLE': navigateSTYLE('DOWN', false); break
    }
})

Mousetrap.bind(['ctrl+up', 'command+up'], function(){
    switch (PANEL()){
        case 'STRUCTURE': navigateSTRUCTURE('UP', true); break
        case 'STYLE': navigateSTYLE('UP', true); break
    }
})

Mousetrap.bind(['ctrl+down', 'command+down'], function(){
    switch (PANEL()){
        case 'STRUCTURE': navigateSTRUCTURE('DOWN', true); break
        case 'STYLE': navigateSTYLE('DOWN', true); break
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
        case 'STYLE_ADD': closeStyleAdd(); break
        case 'STRUCTURE_ADD': closeStructureAdd(); break
        case 'STRUCTURE_ADD_SEARCH': blurStructureAddSearch(); break
    }
})

Mousetrap.bind(['del'], function(){
    switch (PANEL()){
        case 'STRUCTURE': removeStructureRemove(TAB().FOCUSED_HTML); break
        case 'STYLE': removeStyleRemove(TAB().FOCUSED_CSS); break
    }
})

Mousetrap.bind(['backspace'], function(){
    switch (PANEL()){
        case 'STRUCTURE': removeStructureRemove(TAB().FOCUSED_HTML); break
    }
})

Mousetrap.bind(['enter'], function(){
    switch (PANEL()){
        case 'STYLE': console.log('STYLE:ADD:PROP'); break
        case 'STRUCTURE': openStructureAdd(TAB().FOCUSED_HTML, 'INTO'); break
        case 'STRUCTURE_ADD': focusStructureAddSearch(); break
        case 'STRUCTURE_ADD_SEARCH': addStructureAdd( getAbsoluteStructureID(TAB().UI_DATA.structureAddSearchSelected, 'STRUCTURE_ADD_SEARCH'), TAB().UI_DATA.structureAddTrace, TAB().UI_DATA.structureAddDirection ); break
    } 
})

Mousetrap.bind(['ctrl+enter','command+enter'], function(){
    switch (PANEL()){
        case 'STRUCTURE': editSTRUCTURE('CURRENT'); break
        case 'STYLE': console.log('STYLE:EDIT:PROP_OR_NAME'); break
    }
})

Mousetrap.bind(['plus'], function(){
    switch (PANEL()){
        case 'STYLE': openStyleAdd(TAB().FOCUSED_CSS, 'INTO'); break
    }
})

Mousetrap.bind(['shift+plus'], function(){
    switch (PANEL()){
        case 'STRUCTURE': openStructureAdd(TAB().FOCUSED_HTML, 'ABOVE'); break
        case 'STYLE': console.log('STYLE:ADD:NAME:ABOVE'); break
    }
})

Mousetrap.bind(['ctrl+plus','command+plus'], function(){
    switch (PANEL()){
        case 'STRUCTURE': openStructureAdd(TAB().FOCUSED_HTML, 'BELOW'); break
        case 'STYLE': console.log('STYLE:ADD:NAME:BELOW'); break
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



// CONTEXT FREE

Mousetrap.bind(['ctrl+shift+i','command+shift+i'], function(){
    remote.getCurrentWindow().toggleDevTools()
})

Mousetrap.bind(['ctrl+s','command+s'], function(){
    switch (VIEW()){
        case 'EDIT': new Toast('INFO', 'SAVED in EDIT-VIEW'); break
    }
})

Mousetrap.bind(['ctrl+shift+s','command+shift+s'], function(){
    switch (VIEW()){
        case 'EDIT': new Toast('INFO', 'SAVED in EDIT-VIEW AS'); break
    }
})
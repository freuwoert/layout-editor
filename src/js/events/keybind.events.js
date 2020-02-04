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
        case 'STYLE_PROP_ADD': addStylePropSetStep(0); break
    }
})

Mousetrap.bind(['ctrl+down', 'command+down'], function(){
    switch (PANEL()){
        case 'STRUCTURE': navigateSTRUCTURE('DOWN', true); break
        case 'STYLE': navigateSTYLE('DOWN', true); break
        case 'STYLE_PROP_ADD': addStylePropSetStep(1); break
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
        case 'STYLE_PROP_ADD': closeStylePropAdd(); break
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
        case 'STYLE': openStyleAddDist( TAB().FOCUSED_CSS, 'INTO' ); break
        case 'STYLE_ADD': addStyleAdd( TAB().UI_DATA.styleAddInput, TAB().UI_DATA.styleAddTrace, TAB().UI_DATA.styleAddDirection ); break
        case 'STYLE_PROP_ADD': addStylePropSetStep('NEXT', ()=>{ addStylePropAddHELPER() }); break
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
    // switch (PANEL()){
    //     case 'STYLE': openStyleAdd(TAB().FOCUSED_CSS, 'INTO'); break
    // }
})

Mousetrap.bind(['shift+plus'], function(){
    switch (PANEL()){
        case 'STRUCTURE': openStructureAdd(TAB().FOCUSED_HTML, 'ABOVE'); break
        case 'STYLE': openStyleAdd(TAB().FOCUSED_CSS, 'ABOVE'); break
    }
})

Mousetrap.bind(['ctrl+plus','command+plus'], function(){
    switch (PANEL()){
        case 'STRUCTURE': openStructureAdd(TAB().FOCUSED_HTML, 'BELOW'); break
        case 'STYLE': openStyleAdd(TAB().FOCUSED_CSS, 'BELOW'); break
    }
})

// Mousetrap.bind(['tab'], function(){
//     switch (PANEL()){
//         case 'STYLE_ADD': toggleStyleAddMode(); break
//     }
// })

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

Mousetrap.bind(['ctrl+1','command+1'], function(){
    if (VIEW() == 'START') {
        TAB().VIEW = 'ASSET'
    }
})

Mousetrap.bind(['ctrl+2','command+2'], function(){
    if (VIEW() == 'START') {
        TAB().VIEW = 'EDIT'
    }
})

Mousetrap.bind(['ctrl+3','command+3'], function(){
    if (VIEW() == 'START') {
        TAB().VIEW = 'STORE'
    }
})



// CONTEXT FREE

Mousetrap.bind(['ctrl+shift+e','command+shift+e'], function(){
    app.GENERAL_UI.settings = true
})

Mousetrap.bind(['ctrl+shift+i','command+shift+i'], function(){
    remote.getCurrentWindow().toggleDevTools()
})

Mousetrap.bind(['ctrl+g','command+g'], function(){
    switch (VIEW()){
        case 'EDIT': generateCode(); break
    }
})

Mousetrap.bind(['ctrl+s','command+s'], function(){
    switch (VIEW()){
        case 'EDIT': saveLayout({tab: app.TAB, force: false}, (tab)=>{ app.TAB = unlink(tab)}); break
    }
})

Mousetrap.bind(['ctrl+shift+s','command+shift+s'], function(){
    switch (VIEW()){
        case 'EDIT': saveLayout({tab: app.TAB, force: true}, (tab)=>{ app.TAB = unlink(tab)}); break
    }
})

Mousetrap.bind(['ctrl+o','command+o'], function(){
    switch (VIEW()){
        case 'EDIT': openLayout({paths: null}, ()=>{selectTab(app.TABS.length-1)}); break
    }
})
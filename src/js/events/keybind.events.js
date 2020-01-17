Mousetrap.bind(['up'], function(){
    if(PANEL('STRUCTURE')) navigateHTML('UP', false)
})

Mousetrap.bind(['down'], function(){
    if(PANEL('STRUCTURE')) navigateHTML('DOWN', false)
})

Mousetrap.bind(['shift+up'], function(){
    if(PANEL('STRUCTURE')) navigateHTML('UP', true)
})

Mousetrap.bind(['shift+down'], function(){
    if(PANEL('STRUCTURE')) navigateHTML('DOWN', true)
})

Mousetrap.bind(['shift+right'], function(){
    if(PANEL('STRUCTURE')) navigateSECTION('RIGHT')
})

Mousetrap.bind(['shift+left'], function(){
    if(PANEL('STYLE')) navigateSECTION('LEFT')
})

Mousetrap.bind(['esc'], function(){
    if(PANEL('STRUCTURE_ADD')) closeStructureAdd()
    if(PANEL('STRUCTURE_ADD_SEARCH')) blurStructureAddSearch()
})

Mousetrap.bind(['enter'], function(){
    if(PANEL('STRUCTURE')) editHTML('CURRENT')
    if(PANEL('STRUCTURE_ADD')) focusStructureAddSearch()
})

Mousetrap.bind(['plus'], function(){
    if(PANEL('STRUCTURE')) openStructureAdd()
})

Mousetrap.bind(['shift+enter'], function(){
    addHTML('CURRENT')
})
window.rotateCoupledViewport = () => {
    let X = JSON.parse(JSON.stringify(TAB().VIEWPORT.X))
    let Y = JSON.parse(JSON.stringify(TAB().VIEWPORT.Y))
    
    TAB().VIEWPORT.X = Y
    TAB().VIEWPORT.Y = X
}

window.decoupleViewport = () => {
    TAB().VIEWPORT.DECOUPLED = !TAB().VIEWPORT.DECOUPLED
}
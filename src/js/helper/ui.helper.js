window.rotateCoupledViewport = () => {
    let X = unlink(TAB().VIEWPORT.X)
    let Y = unlink(TAB().VIEWPORT.Y)
    
    TAB().VIEWPORT.X = Y
    TAB().VIEWPORT.Y = X
}

window.decoupleViewport = () => {
    TAB().VIEWPORT.DECOUPLED = !TAB().VIEWPORT.DECOUPLED
}



window.updateCoupledViewport = (html) => {
    app.$refs.coupledViewport.contentWindow.document.open()
    app.$refs.coupledViewport.contentWindow.document.write(html)
    app.$refs.coupledViewport.contentWindow.document.close()
}
window.renderHTML = (structureObject) => {

    let object = unlink(structureObject)
    let htmlstring = ''
    
    let recursive = (children) => {

        let html = ''

        children.forEach(child => {

            let attr = ''
            let selfClosing = ['img','br','meta','link','hr','input','source']

            child.attributes.forEach(attribute => {
                attr += ` ${attribute.label}="${attribute.value.join(' ')}"`
            })

            html += `<${child.label}${attr}>`

            if(child.children && child.children.length > 0)
            {
                html += recursive(child.children)
            }

            if( !selfClosing.includes(child.label.toLowerCase()) )
            {
                html += `</${child.label}>`
            }

        })

        return html
    }

    htmlstring = recursive(object)

    //console.log(pretty(htmlstring, {ocd: true}))

    return htmlstring
}

window.renderCSS = (styleObject) => {

    let object = unlink(styleObject)
    let cssstring = ''
    
    let recursive = (children, depth, selector) => {

        let css = ''

        children.forEach(child => {

            let prop = ''

            child.properties.forEach(property => {
                prop += `  ${property.label}: ${property.value};\n`
            })

            css += `${selector}${child.label}{\n`
            css += prop
            css += `}\n\n`

            if(child.children && child.children.length > 0)
            {
                css += recursive(child.children, depth+1, selector+''+child.label+' ')
            }


        })

        return css
    }

    cssstring = recursive(object, 0, '')

    return cssstring
}

window.renderViewport = (HTML, CSS) => {
    let HTMLstring = renderHTML(HTML)
    let CSSstring = '<style>'+renderCSS(CSS)+'</style>'

    let viewportstring = HTMLstring + CSSstring

    return viewportstring
}



window.generateCode = () => {
    let htmlstring = pretty(renderHTML(TAB().DOCUMENT.HTML.children), {ocd: true})
    let html = Prism.highlight(htmlstring, Prism.languages.html, 'html')

    let cssstring = renderCSS(TAB().DOCUMENT.CSS.children)
    let css = Prism.highlight(cssstring, Prism.languages.css, 'css')

    TAB().UI_DATA.html = html
    TAB().UI_DATA.css = css
    TAB().UI.code = true
}
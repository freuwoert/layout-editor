window.renderHTML = (structureObject) => {

    let object = JSON.parse(JSON.stringify(structureObject))
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

    console.log(pretty(htmlstring, {ocd: true}))

    return htmlstring
}
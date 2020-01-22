return {
    HTML: { children: [
        {
            label: 'html',
            attributes: [],
            children: [
                {
                    label: 'head',
                    attributes: [],
                    children: []
                },
                {
                    label: 'body',
                    attributes: [],
                    children: [
                        {
                            label: 'div',
                            attributes: [
                                {
                                    label: 'class',
                                    value: ['container']
                                }
                            ],
                            children: [
                                {
                                    label: 'div',
                                    attributes: [
                                        {
                                            label: 'class',
                                            value: ['headline']
                                        }
                                    ],
                                    children: []
                                }
                            ]
                        },
                        {
                            label: 'div',
                            attributes: [
                                {
                                    label: 'class',
                                    value: ['divider']
                                }
                            ],
                            children: []
                        }
                    ]
                }
            ]
        }
    ]},
    CSS: { children: [
        {
            label: '.container',
            properties: [
                {
                    label: 'width',
                    value: '100%'
                },
            ],
            children: [
                {
                    label: '.headline',
                    properties: [
                        {
                            label: 'font-size',
                            value: '16px'
                        },
                        {
                            label: 'color',
                            value: '#676767'
                        }
                    ],
                    children: []
                }
            ]
        },
        {
            label: '.divider',
            properties: [],
            children: []
        }
    ]}
}
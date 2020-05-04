const state = {
    swatches: [
        { vendor: 'Flat UI Colors', name: 'Defaults', format: 'HEX', swatches: [
            '#1abc9c','#16a085','#2ecc71','#27ae60','#3498db','#2980b9','#9b59b6','#8e44ad','#34495e','#2c3e50',
            '#f1c40f','#f39c12','#e67e22','#d35400','#e74c3c','#c0392b','#ecf0f1','#bdc3c7','#95a5a6','#7f8c8d'
        ]},
        { vendor: 'Flat UI Colors', name: 'Chinese', format: 'HEX', swatches: [
            '#eccc68','#ffa502','#ff7f50','#ff6348','#ff6b81','#ff4757','#a4b0be','#747d8c','#57606f','#2f3542',
            '#7bed9f','#2ed573','#70a1ff','#1e90ff','#5352ed','#3742fa','#ffffff','#f1f2f6','#dfe4ea','#ced6e0'
        ]},
    ]
}

const getters = {
    swatches: (state) => state.swatches,
}

const actions = {}

const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations,
}
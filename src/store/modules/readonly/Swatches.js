const state = {
    swatches: [
        { vendor: 'VuDesigner', name: 'Theme', swatches: [
            '#0984E3','#3742FA','#FF5959','#FFDD2A','#00CC33','#21252B','#282C34','#323742',
        ]},
        { vendor: 'Discord', name: 'Theme', swatches: [
            '#7289DA','#FFFFFF','#99AAB5','#2C2F33','#23272A',
        ]},
        { vendor: 'Adobe', name: 'Theme', swatches: [
            '#26C9FF','#FF7D02','#FF26BE','#EF1C06','#FF4393','#3DF0F0','#E472FF','#D1A3FF',
            '#061E26','#261300','#2E001F','#351916','#26000F','#022326','#2A0033','#1D0E34',
            '#3CF2A6','#00E6BE','#9E8FFE','#BF80FF','#B6F200','#FEBB00','#42F500','#FE3F1D',
            '#00261A','#002620','#0C004C','#260D40','#1D2600','#261C00','#092600','#260600',
        ]},
        { vendor: 'Twitch', name: 'Theme', swatches: [
            '#6441a5','#b9a3e3','#262626','#f1f1f1',
        ]},
        { vendor: 'Microsoft', name: 'Office Theme', swatches: [
            '#B7472A','#217346','#2B579A','#106EBE','#F3F3F3',
        ]},
        { vendor: 'One Dark Pro', name: 'Classic', swatches: [
            '#c678dd','#f44747','#e06c75','#d19a66','#e5c07b','#7f848e','#5c6370','#61afef',
            '#98c379','#56b6c2','#ffffff',
        ]},
        { vendor: 'One Dark Pro', name: 'Vivid', swatches: [
            '#d55fde','#f44747','#ef596f','#d19a66','#e5c07b','#7f848e','#5c6370','#61afef',
            '#89ca78','#2bbac5','#ffffff',
        ]},
        { vendor: 'Flat UI Colors', name: 'Original', swatches: [
            '#1abc9c','#16a085','#2ecc71','#27ae60','#3498db','#2980b9','#34495e','#2c3e50',
            '#f1c40f','#f39c12','#e67e22','#d35400','#e74c3c','#c0392b','#9b59b6','#8e44ad',
            '#ecf0f1','#bdc3c7','#95a5a6','#7f8c8d',
        ]},
        { vendor: 'Flat UI Colors', name: 'America', swatches: [
            '#55efc4','#00b894','#81ecec','#00cec9','#74b9ff','#0984e3','#a29bfe','#6c5ce7',
            '#ffeaa7','#fdcb6e','#fab1a0','#e17055','#ff7675','#d63031','#fd79a8','#e84393',
            '#dfe6e9','#b2bec3','#636e72','#2d3436',
        ]},
        { vendor: 'Flat UI Colors', name: 'Australia', swatches: [
            '#f6e58d','#f9ca24','#ffbe76','#f0932b','#ff7979','#eb4d4b','#badc58','#6ab04c',
            '#e056fd','#be2edd','#7ed6df','#22a6b3','#686de0','#4834d4','#30336b','#130f40',
            '#dff9fb','#c7ecee','#95afc0','#535c68',
        ]},
        { vendor: 'Flat UI Colors', name: 'Britain', swatches: [
            '#353b48','#2f3640','#e84118','#c23616','#fbc531','#e1b12c','#4cd137','#44bd32',
            '#9c88ff','#8c7ae6','#00a8ff','#0097e6','#487eb0','#40739e','#273c75','#192a56',
            '#f5f6fa','#dcdde1','#7f8fa6','#718093',
        ]},
        { vendor: 'Flat UI Colors', name: 'Canada', swatches: [
            '#48dbfb','#0abde3','#54a0ff','#2e86de','#5f27cd','#341f97','#feca57','#ff9f43',
            '#00d2d3','#01a3a4','#1dd1a1','#10ac84','#ff6b6b','#ee5253','#ff9ff3','#f368e0',
            '#c8d6e5','#8395a7','#576574','#222f3e',
        ]},
        { vendor: 'Flat UI Colors', name: 'China', swatches: [
            '#eccc68','#ffa502','#ff7f50','#ff6348','#ff6b81','#ff4757','#ffffff','#f1f2f6',
            '#7bed9f','#2ed573','#70a1ff','#1e90ff','#5352ed','#3742fa','#dfe4ea','#ced6e0',
            '#a4b0be','#747d8c','#57606f','#2f3542',
        ]},
        { vendor: 'Flat UI Colors', name: 'France', swatches: [
            '#e58e26','#fa983a','#f6b93b','#fad390','#f8c291','#e55039','#eb2f06','#b71540',
            '#0c2461','#1e3799','#4a69bd','#6a89cc','#82ccdd','#60a3bc','#3c6382','#0a3d62',
            '#079992','#38ada9','#78e08f','#b8e994',
        ]},
        { vendor: 'Flat UI Colors', name: 'German', swatches: [
            '#a55eea','#8854d0','#fc5c65','#eb3b5a','#fd9644','#fa8231','#fed330','#f7b731',
            '#26de81','#20bf6b','#2bcbba','#0fb9b1','#45aaf2','#2d98da','#4b7bec','#3867d6',
            '#d1d8e0','#a5b1c2','#778ca3','#4b6584',
        ]},
        { vendor: 'Flat UI Colors', name: 'India', swatches: [
            '#6D214F','#B33771','#FC427B','#FD7272','#F97F51','#FEA47F','#F8EFBA','#EAB543',
            '#182C61','#3B3B98','#1B9CFC','#25CCF7','#55E6C1','#58B19F','#9AECDB','#CAD3C8',
            '#82589F','#D6A2E8','#BDC581','#2C3A47',
        ]},
        { vendor: 'Flat UI Colors', name: 'Netherlands', swatches: [
            '#6F1E51','#833471','#B53471','#ED4C67','#FDA7DF','#D980FA','#9980FA','#5758BB',
            '#EA2027','#EE5A24','#F79F1F','#FFC312','#C4E538','#A3CB38','#009432','#006266',
            '#1B1464','#0652DD','#1289A7','#12CBC4',
        ]},
        { vendor: 'Flat UI Colors', name: 'Russia', swatches: [
            '#e15f41','#e77f67','#f19066','#f3a683','#ea8685','#e66767','#f7d794','#f5cd79',
            '#c44569','#cf6a87','#f8a5c2','#f78fb3','#546de5','#778beb','#786fa6','#574b90',
            '#303952','#596275','#63cdda','#3dc1d3',
        ]},
        { vendor: 'Flat UI Colors', name: 'Spain', swatches: [
            '#ff5252','#b33939','#ff793f','#cd6133','#ffb142','#cc8e35','#ffda79','#ccae62',
            '#40407a','#2c2c54','#706fd3','#474787','#34ace0','#227093','#33d9b2','#218c74',
            '#84817a','#d1ccc0','#aaa69d','#f7f1e3',
        ]},
        { vendor: 'Flat UI Colors', name: 'Sweden', swatches: [
            '#575fcf','#3c40c6','#4bcffa','#0fbcf9','#34e7e4','#00d8d6','#0be881','#05c46b',
            '#ef5777','#f53b57','#ff5e57','#ff3f34','#ffc048','#ffa801','#ffdd59','#ffd32a',
            '#d2dae2','#808e9b','#485460','#1e272e',
        ]},
        { vendor: 'Flat UI Colors', name: 'Turkey', swatches: [
            '#32ff7e','#3ae374','#ff4d4d','#ff3838','#ffaf40','#ff9f1a','#fffa65','#fff200',
            '#7efff5','#67e6dc','#18dcff','#17c0eb','#cd84f1','#c56cf0','#7d5fff','#7158e2',
            '#ffcccc','#ffb8b8','#4b4b4b','#3d3d3d',
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

uniMap = [
    ["--","--","CH","D1"],
    ["DS","CB","U1","TD"],
    ["--","UA","U2","A1"],
    ["--","UB","U3","A2"]
]


mapUniverses = {
    '--': {
        //placeholder
        tree: []
    },
    'U1': {
        universe: 'U1',
        ux: 0,
        uy: 0,
        tree: [
            ['r','f','t'],
            ['p','blank','g'],
            ['pt','m','gh'],
            ['U1sep'],
            ['d','rf','cr','ste'],
            ['i','pyA','tr']
        ],
    },
    'U2': {
        universe: 'U2',
        ux: 0,
        uy: 1,
        tree: [
            ['minipol','ad','minicha'],
            ['ip','ta'],
            ['pol','bi','cha'],
            ['om','pyP','ca'],
            ['id','U2sep','gd'],
            [],
        ]
    },
    'U3': {
        universe: 'U3',
        ux: 0,
        uy: 2,
        tree: [
            ['ra','s','pyR'],
            ['co','cof','ro'],
            ['cs','py','fa'],
            ['sma','sme'],
            ['bh'],
            [],
        ]
    },
    'CB': {
        universe: 'CB',
        ux: -1,
        uy: 0,
        tree: [
            ["cb"],
            ["ev0", "ev1", "ev2"],
            ["ev15", "ev8"],
            ["ep0", "ep1", "ep2"],
            ["sp"],
            []
        ],
    },
    'UA': {
        universe: 'UA',
        ux: -1,
        uy: 1,
        tree: [
            ["hpr"],
            ["hsa", "hre", "hcu"],
            ["hpu", "hbl", "hve"],
            ["hrm","hpw"],
            [],
            []
        ],
    },
    'A1': {
        universe: 'A1',
        ux: 1,
        uy: 1,
        tree: [
            ['ar','pr','rt'],
            ['an','blank','rg'],
            ['oi','pm','gs'],
            ['cp'],
            ['fu'],
            ['en']
        ],
    },
    'UB': {
        universe: 'UB',
        ux: -1,
        uy: 2,
        tree: [
            ["bee"],
            ["bpl","ne"],
            ["bb","fl", "ho"],
            ["al", "wa"],
            ["n", "tw"],
            []
        ],
    },
    'D1': {
        universe: 'D1',
        ux: 1,
        uy: -1,
        tree: [
            ["dr"],
            ["dp"],
            ["dg","dgr","db"],
            ["dn","le","dgj"],
            ["ds","funify","bl","rp","dv"],
            []
        ],
    },
    'CH': {
        universe: 'CH',
        ux: 0,
        uy: -1,
        tree: [
            ["ch"],
            [],
            [],
            [],
            [],
            []
        ],
    },
    'TD': {
        universe: 'TD',
        ux: 1,
        uy: 0,
        tree: [
            ["tac"],
            ["tco"],
            ["tma"],
            ["tex"],
            [],
            ["tad"]
        ]
    },
    'A2': {
        universe: 'A2',
        ux: 1,
        uy: 2,
        tree: [
            [],
            ["st"],
            ["pl", "se"],
            ["ir"],
            ["sb"],
            [],            
        ]
    },
    'DS': {
        universe: 'DS',
        ux: -2,
        uy: 0,
        tree: [
           ["cf"],
           ["wof"],
           ["blank","sm","cbs"],
           ["car"],
           [],
           ["zd"],
        ],
    },
}


mapBridgeNodes = [
    {
        universes: ['U1','U2'],
        shown() {
            return true
        }
    },
    {
        universes: ['U2','U3'],
        shown() {
            return true
        }
    },
    {
        universes: ['U1','CB'],
        row: 3,
        shown() {
            return true
        }
    },
    {
        universes: ['U2','UA'],
        row: 0,
        shown() {
            return true
        },
        id0: 'hex_bridge_A',
        id1: 'hex_bridge_B'
    },
    {
        universes: ['U2','UA'],
        row: 4,
        shown() {
            return true
        },
    },
    {
        universes: ['U1','TD'],
        row: 3,
        shown() {
            return true
        },
    },
    {
        universes: ['U2','A1'],
        row: 4, 
        shown() {
            return true
        },
    },
    {
        universes: ['U3','UB'],
        row: 1,
        shown() {
            return true
        },
    },
    {
        universes: ['U3','A2'],
        row: 1,
        shown() {
            return true
        },
    },
    {
        universes: ['U1','CH'],
        shown() {
            return true
        },
    },
    
    
]


mapConnections = [

    // U1
    ['p','r'],
    ['p','f'],
    ['g','t'],
    ['pt','p'],
    ['pt','t'],
    ['gh','p'],
    ['gh','g'],
    ['m','p'],
    ['m','g'],
    ['U1sep','pt'],
    ['U1sep','m'],
    ['U1sep','gh'],

    ['d','U1sep'],
    ['rf','U1sep'],
    ['cr','U1sep'],
    ['ste','U1sep'],
    // ['ste','cha'], // this connection should really be here but there's no good way to put it in
    
    // infinity
    {
        connections: [
            ['i','d'],
            ['i','rf'],
            ['ip','minipol'],
            // ['ip','U2_to_U1'],
            // ['U1_to_U2','i'],
            ['ip','i'],
            ['ip','minicha']
        ],
        shown() {return tmp.ip.layerShown},
        style: {color: '#FFCC88'}
    },
    ['i','hex_bridge_A'],



    //hex
    ['hre','hpr'],
    ['hsa','hpr'],
    ['hpu','hre'],
    ['hbl','hre'],
    ['hve','hcu'],
    ['hpw','hbl'],
    ['hpw','hve'],
    ['hrm','hpw'],


    //U2
    ['ip','ad'],
    ['ta','ad'],

    ['bi','ip'],
    ['bi','ta'],
    ['gd','ca'],

    ['pol','minipol'],
    ['cha','minicha'],

    //aesthetic lines
    // {
    //     connections: [
    //         ["ta","tr"],
    //         ["ta","pol"],
    //     ],
    //     style: {'background-color': '#666666', 'z-index': -20}

    // },
    
    //TD
    ['tad','tac'],

    // A1
    ["an","ar"],
    ["rg","pr"],
    ["rg","rt"],
    ["oi","an"],
    ["oi","rg"],
    ["pm","an"],
    ["pm","rg"],
    ["gs","an"],
    ["gs","rg"],
    ["cp","oi"],
    ["cp","pm"],
    ["cp","gs"],
    ["fu","cp"],
    ["en","fu"],

    //sing resets
    {
        connections: [
            ["s","U3_to_U2"],
            ["U2_to_U3", "U2_to_UA"],["UA_to_U2", "hpw"],
            ["U2_to_U3", "id"],["id","om"],
            ["U2_to_U3", "U2sep"],
            ["U2sep","bi"],
            // ["U2sep","ip"],
            // ["U2sep","ta"],
            ["U2sep","pol"],
            ["U2sep","cha"],
            ['tr','cr'], ['tr','ste'],
            ["U2_to_U3", "U2_to_A1"], ["A1_to_U2", "cp"],
            ["U2_to_U3", "gd"],
            
        ],
        shown() {return tmp.s.layerShown},
        style: {color: '#FF8888'}
    },
    {
        connections: [
            ["U2_to_U3", "tad"],
            ["U2_to_U3", "cb"],
            ["U2sep", "tr"], 

        ],
        shown() {return tmp.s.layerShown},
        style: {gradient: 'singularityFadeout'}
    },
    // U3
    ["ra","s"],
    ["co","s"],
    ["cof","s"],
    ["cs","co"],
    ["cs","cof"],
    ["ro","s"],["ro","U3_to_A2"],["A2_to_U3","st"],
    ["py","cof"],

    ["sma","sme"],

    //D1

    ["dp","dr"],
    ["dg","dp"],
    ["db","dp"],
    ["dn","dg"],
    ["dn","dgr"],
    ["le","dg"],
    ["le","dgr"],
    ["le","db"],
    ["gj","dgr"],
    ["ds","dn"],
    ["ds","le"],
    ["funify","le"],
    ["bl","le"],
    ["rp","le"],
    ["dv","le"],
    

    //hive
    ["bpl","bee"],
    ["bb","bpl"],
    ["ne","bee"],
    ["ho","ne"],
    ["al","bb"],
    ["al","ho"],
    ["al","fl"],
    ["n","al"],


    //A2
    ["pl","st"],
    ["sb","ir"],

    //DS
    ["zd","cf"]

]




let gradientStyles = {
    singularityFadeout: {
        id: 'singularityFadeout',
        stops: [
            {offset: 0.1, color: '#FF8888'},
            {offset: 0.2, color: 'transparent'},
            {offset: 0.8, color: 'transparent'},
            {offset: 0.9, color: '#FF8888'},
        ]
    }
}


addNode('U1sep', {
    name: "U1sep", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U1",
    nodeStyle() {
        return { color: '#FFFFFF', 'background-color': '#FFFFFF', 'border-color': "#FFFFFF", 'scale': '50%'}
    },
    tooltip() {return ""},
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},

})

addNode('U2sep', {
    name: "U2sep", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U2",
    nodeStyle() {
        return { color: '#FF8888', 'background-color': '#FF8888', 'border-color': "#FF8888", 'scale': '50%'}
    },
    tooltip() {return ""},
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})

addNode('minipol', {
    name: "Pollinators", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🐝", // This appears on the layer's node. Default is the id with the first letter capitalized
    size: 'tiny',

    universe: "U2",
    nodeStyle() {
        return { color: "#cb8e00", 'background-color': '#cb8e00'}
    },
    tooltip() {return ""},
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})

addNode('minicha', {
    name: "Charger", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⚡", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U2",
    nodeStyle() {
        return { color: "#f7f774", borderColor: "gray", backgroundColor: "#222222"}
    },
    size: 'tiny',
    // tooltip() {return ""},
    layerShown() { return true},
})



addLayer('maptree', {

    pxSource: 0,
    pySource: 0,
    pxTarget: 0,
    pyTarget: 0,
    transitionStartTime: Date.now(),
    uniTarget: "",




    mapData() {
        let mapTreeDiv = document.getElementById('mapTree')

        if(mapTreeDiv == null) return {}
        let clientWidth = mapTreeDiv.clientWidth
            // if(clientWidth == 0) clientWidth = 400
        let clientHeight = mapTreeDiv.clientHeight
            // if(clientHeight == 0) clientHeight = 700

        let uxMin = 0
        let uxMax = 0
        let uyMin = 0
        let uyMax = 0
        let nodes = {}

        for(let uni in mapUniverses) {

            if(uni !== '--') {
                uxMin = Math.min(uxMin, mapUniverses[uni].ux)
                uyMin = Math.min(uyMin, mapUniverses[uni].uy)
                uxMax = Math.max(uxMax, mapUniverses[uni].ux)
                uyMax = Math.max(uyMax, mapUniverses[uni].uy)
            }
        }


        // LAYER NODES
        for(let uni in mapUniverses) {
            for(let rowNum in mapUniverses[uni].tree) {
                let rowNodeCount = mapUniverses[uni].tree[rowNum].filter(lay => lay == 'blank' || (tmp[lay] && (tmp[lay].layerShown !== false))).length

                let shownLayerNum = 0
                for(let layerNum in mapUniverses[uni].tree[rowNum]) {
                    let layerID = mapUniverses[uni].tree[rowNum][layerNum]
                    if(layerID == 'blank') {
                        shownLayerNum++
                        continue
                    }

                    if(tmp[layerID].layerShown == true) {
                        let newNode = {
                            id: layerID,
                            x: clientWidth * ((mapUniverses[uni].ux - uxMin) + 0.5 + (85/800) * (shownLayerNum*2 - rowNodeCount+1)), //horizontally centered within universe, spaced apart by 2/10 of universe length 
                            y: clientHeight * ((mapUniverses[uni].uy - uyMin)+ (Number(rowNum)+1)/7) 
                        }
                        nodes[layerID] = newNode
                    }
                    if(tmp[layerID].layerShown !== false)
                        shownLayerNum++
                }
            }
        }



        // BRIDGE NODES
        let bridgeNodes = {}

        for(let u in mapUniverses) {
            bridgeNodes[u] = {
                top: [],
                left: [null,null,null,null,null,null],
                right: [null,null,null,null,null,null],
                bottom: [],
            }
        }

        for(let bn of mapBridgeNodes) {
            let u0 = bn.universes[0]
            let u1 = bn.universes[1]

            let ux0 = mapUniverses[bn.universes[0]].ux - uxMin
            let ux1 = mapUniverses[bn.universes[1]].ux - uxMin
            let uy0 = mapUniverses[bn.universes[0]].uy - uyMin
            let uy1 = mapUniverses[bn.universes[1]].uy - uyMin
        


            let look = {
                'font-size': '20px',
                'z-index': 1,
                'background-color': "#000000",
                'color': '#ffffff',
                'border-color': '#ffffff',
            }

            let id0 = bn.id0 || u0 + '_to_' + u1
            let id1 = bn.id1 || u1 + '_to_' + u0


            if(ux0 == ux1 && uy0 == uy1) continue;

            //vertical bridge
            if(ux0 == ux1 && uy0 !== uy1) {
                if(uy0 < uy1) {
                    bridgeNodes[u0].bottom.push({uniTo: u1, uniFrom: u0, id: id0, style: look})
                    bridgeNodes[u1].top.push({uniTo: u0, uniFrom: u1, id: id1, style: look})
                }
                else {
                    bridgeNodes[u0].top.push({uniTo: u1, uniFrom: u0, id: id0, style: look})
                    bridgeNodes[u1].bottom.push({uniTo: u0, uniFrom: u1, id: id1, style: look})
                }

                nodes[id0] = {
                    id: id0,
                    x: clientWidth * ((ux0+ux1)/2 + 0.5), 
                    y: clientHeight * (((uy0+uy1)/2 - uyMin) - 0.5) 
                }
                nodes[id1] = {
                    id: id1,
                    x: clientWidth * ((ux0+ux1)/2 + 0.5), 
                    y: clientHeight * (((uy0+uy1)/2 - uyMin) - 0.5) 
                }
            }

            //horizontal bridge
            if(ux0 !== ux1 && uy0 == uy1) {
                if(ux0 < ux1) {
                    bridgeNodes[u0].right[bn.row] = ({uniTo: u1, uniFrom: u0, id: id0, style: look})
                    bridgeNodes[u1].left[bn.row] = ({uniTo: u0, uniFrom: u1, id: id1, style: look})
                }
                else {
                    bridgeNodes[u0].left[bn.row] = ({uniTo: u1, uniFrom: u0, id: id0, style: look})
                    bridgeNodes[u1].right[bn.row] = ({uniTo: u0, uniFrom: u1, id: id1, style: look})
                }
                nodes[id0] = {
                    id: id0,
                    x: clientWidth * ((ux0+ux1)/2 + 0.5), 
                    y: clientHeight * (((uy0+uy1)/2 - uyMin) - 1 + (bn.row+1)/7) 
                }
                nodes[id1] = {
                    id: id1,
                    x: clientWidth * ((ux0+ux1)/2 + 0.5), 
                    y: clientHeight * (((uy0+uy1)/2 - uyMin) - 1 + (bn.row+1)/7) 
                }
            }
        }
        

        // CONNECTIONS
        let connections = []
        let connectionGradients = []
        for(let c of mapConnections) {
            
            if(c instanceof Array) c = {nodes: [c[0],c[1]]}
            if(readData(c.shown) == false) continue

            let defaultStyle = {
                color: '#FFFFFF'
            }

            if(c.connections) {
                for(co of c.connections) {
                    let n1 = nodes[co[0]] || bridgeNodes[co[0]]
                    let n2 = nodes[co[1]] || bridgeNodes[co[1]]
                    if(!n1 || !n2) continue
                    let look = {...defaultStyle, ...c.style}
                    if(look.gradient) {
                        let gID = look.gradient+"_"+n1.id+"_"+n2.id
                        connectionGradients.push({id: gID, x1: n1.x, y1: n1.y, x2: n2.x, y2: n2.y, stops: gradientStyles[c.style.gradient].stops})
                        look.gradient = gID
                    }
                    connections.push({x1: n1.x, y1: n1.y, x2: n2.x, y2: n2.y,style: look})

                }
            }
            else
            {
                let n1 = nodes[c.nodes[0]] || bridgeNodes[c.nodes[0]]
                let n2 = nodes[c.nodes[1]] || bridgeNodes[c.nodes[1]]
                if(!n1 || !n2) continue

                let look = {...defaultStyle, ...c.style}
                    if(look.gradient) {
                        let gID = look.gradient+"_"+n1.id+"_"+n2.id
                        connectionGradients.push({id: gID, x1: n1.x, y1: n1.y, x2: n2.x, y2: n2.y, stops: gradientStyles[c.style.gradient].stops})
                        look.gradient = gID
                    }
                    connections.push({x1: n1.x, y1: n1.y, x2: n2.x, y2: n2.y,style: look})
            }
        }


        if(mapUniverses[player.universe])
        {
            if(this.uniTarget !== player.universe) {
                transitionStartTime = Date.now()
                this.uniTarget = player.universe
                this.pxSource = this.pxTarget
                this.pySource = this.pyTarget
            }

            this.pxTarget = (mapUniverses[player.universe].ux - uxMin)* clientWidth
            this.pyTarget = (mapUniverses[player.universe].uy - uyMin)* clientHeight

        }


        // set scroll position
        if(options.menuType == 'Map') {
            let c = document.getElementById('mapTree')
            if(c) {
                c.scrollLeft = inOutSine( (Date.now() - transitionStartTime)/300, this.pxSource, this.pxTarget) 
                c.scrollTop = inOutSine( (Date.now() - transitionStartTime)/300, this.pySource, this.pyTarget) 
            }
        }
        

        return {
            clientWidth,
            clientHeight,
            width: (uxMax - uxMin + 1) * clientWidth,
            height: (uyMax - uyMin + 1) * clientHeight,
            nodes,
            bridgeNodes,
            connections,
            uniMap,
            connectionGradients
        }
    },

    tryMove(dx,dy) {
        let targetUx = mapUniverses[player.universe].ux + dx
        let targetUy = mapUniverses[player.universe].uy + dy
        for(let u in mapUniverses) {
            if(mapUniverses[u].ux == targetUx && mapUniverses[u].uy == targetUy)
                player.universe = mapUniverses[u].universe
        }
    },

    hotkeys: [
        {
            key: "ArrowUp", 
            description: "ArrowUp",
            onPress() {
                layers[this.layer].tryMove(0,-1)
            },
            global: true
        },
        {
            key: "ArrowDown", 
            description: "ArrowDown",
            onPress() {
                layers[this.layer].tryMove(0,1)
            },
            global: true
        },
        {
            key: "ArrowLeft", 
            description: "ArrowLeft",
            onPress() {
                layers[this.layer].tryMove(-1,0)
            },
            global: true
        },
        {
            key: "ArrowRight", 
            description: "ArrowRight",
            onPress() {
                layers[this.layer].tryMove(1,0)
            },
            global: true
        },
    ]
})


function createConnection(nodes, n1, n2) {
    let look = {
            position: "relative",
            left: ((n1.x + n2.x) / 2) + "px",
            top: ((n1.y + n2.y) / 2) + "px",
            transform: "rotate(" + (Math.atan2(n2.y - n1.y, n2.x - n1.x) + Math.PI/2) + "rad)",
            height: Math.sqrt(Math.pow(n2.y - n1.y, 2) + Math.pow(n2.x - n1.x, 2)) + "px",
            width: "10px", 'background-color': "#dddddd",
            'z-index': 0
        }
    return look
}

function inOutSine(t,start,end) {
    if(t<=0) return start
    if(t>=1 || isNaN(start)) return end
    return (start + end + (end-start)*Math.sin(t*Math.PI/2))/2
}



function drawBranch(id1, id2, style) {
	let color_id = "#ffffff"
	let width = 15

	if (document.getElementById(id1) == null || document.getElementById(id2) == null) return
	if(tmp[id2].layerShown == 'ghost') return

	let start = document.getElementById(id1).getBoundingClientRect();
    let end = document.getElementById(id2).getBoundingClientRect();
    let x1 = start.left + (start.width / 2) + document.body.scrollLeft;
    let y1 = start.top + (start.height / 2) + document.body.scrollTop;
    let x2 = end.left + (end.width / 2) + document.body.scrollLeft;
    let y2 = end.top + (end.height / 2) + document.body.scrollTop;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.strokeStyle = color_id
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}





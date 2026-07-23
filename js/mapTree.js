mapUniverses = {
    'U1': {
        universe: 'U1',
        ux: 0,
        uy: 0,
        tree: [
            ['r','f','t'],
            ['p','blank','g'],
            ['m','gh'],
            ['i']
        ],
    },
    'U2': {
        universe: 'U2',
        ux: 0,
        uy: 1,
        tree: [
            ['d','rf','blank','blank'],
            ['po','blank','blank','blank'],
            ['blank','pol','ad','blank'],
            ['om','ip','ta','bi'],
            ['id','blank','blank','ca'],
        ]
    },
    'U3': {
        universe: 'U3',
        ux: 0,
        uy: 2,
        tree: [
            ['ra','s','fa'],
            ['co','cof','ro'],
            ['cs'],
            ['sma','sme'],
            ['bh']
        ]
    },
    'CB': {
        universe: 'CB',
        ux: -1,
        uy: 0,
        tree: [["cb"], ["ev0", "ev1", "ev2"], ["ev15", "ev8"], ["ep0", "ep1", "ep2"], ["sp"]],
    },
    'UA': {
        universe: 'UA',
        ux: -1,
        uy: 1,
        tree: [["hpr"],
        ["hsa", "hre", "hcu"],
        ["hpu", "hbl", "hve"],
        ["hpw", "hrm"]],
    },
    'A1': {
        universe: 'U1',
        ux: 1,
        uy: 1,
        tree: [
            ['ar','pr','rt'],
            ['an','blank','rg'],
            ['oi','gs'],
            ['cp'],
            ['fu'],
            ['en']
        ],
    }
}

// nodes are by default placed exactly between the two universes
// offsets can be added with offsetX and offsetY
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
        shown() {
            return true
        }
    },
    {
        universes: ['U2','UA'],
        shown() {
            return true
        },
        offsetY: 3/14,
    },
    {
        universes: ['U2','A1'],
        shown() {
            return true
        },
        offsetY: 3/14,
        
    }
]


mapConnections = [

    // U1
    ['p','r'],
    ['p','f'],
    ['g','t'],
    ['gh','p'],
    ['gh','g'],
    ['m','p'],
    ['m','g'],
    ['i','m'],
    ['i','gh'],
    ['i','U1_to_U2'],

    //hex
    ['hre','hpr'],
    ['hsa','hpr'],
    ['hpu','hre'],
    ['hbl','hre'],
    ['hve','hcu'],
    ['hpw','hbl'],
    ['hpw','hve'],
    ['hre','hpw'],


    //U2
    ['d','U2_to_U1'],
    ['rf','U2_to_U1'],
    ['po','d'],
    ['po','rf'],
    ['ip','po'],
    ['ip','pol'],
    ['ip','ad'],
    ['ta','ad'],
    
    //post-OTF "U1"
    ["cr","U2_to_U1"],
    ["ste","U2_to_U1"],
    ["tr","cr"],
    ["tr","st"],

    // A1
    ["an","ar"],
    ["rg","pr"],
    ["rg","rt"],
    ["oi","an"],
    ["oi","rg"],
    ["gs","an"],
    ["gs","rg"],
    ["cp","oi"],
    ["cp","gs"],
    ["fu","cp"],
    ["en","fu"],

    //sing resets
    {
        connections: [
            ["s","U3_to_U2"],
            ["U2_to_U3", "U2_to_UA"],
            ["U2_to_U3", "id"],
            ["U2_to_U3", "om"],
            ["U2_to_U3", "ip"],
            ["U2_to_U3", "ta"],
            ["U2_to_U3", "bi"],["bi", "tr"],
            ["U2_to_U3", "U2_to_A1"], ["A1_to_U2", "cp"],
            ["U2_to_U3", "ca"]
        ],
        shown() {return tmp.s.layerShown},
        style: {'background-color': '#FFaaaa'}
    },
    // U3
    ["ra","s"],
    ["co","s"],
    ["cof","s"],
    ["cs","co"],
    ["cs","cof"],
    ["ro","s"],

    ["sma","sme"],

    
    

]



/*
--- MAP ---
 -1  0  1
    CH D1
 CB U1 TD
 Hx U2 A1
 Hv U3 Sp
*/
addLayer('maptree', {
    mapData() {
        let mapTreeDiv = document.getElementById('mapTree')

        if(mapTreeDiv == null) return {}
        let clientWidth = mapTreeDiv.clientWidth
        let clientHeight = mapTreeDiv.clientHeight

        let uxMin = 0
        let uxMax = 0
        let uyMin = 0
        let uyMax = 0
        let nodes = {}

        for(let uni in mapUniverses) {

            uxMin = Math.min(uxMin, mapUniverses[uni].ux)
            uyMin = Math.min(uyMin, mapUniverses[uni].uy)
            uxMax = Math.max(uxMax, mapUniverses[uni].ux)
            uyMax = Math.max(uyMax, mapUniverses[uni].uy)
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
                            x: clientWidth * ((mapUniverses[uni].ux - uxMin) + 0.6 + 0.1 * (shownLayerNum*2 - rowNodeCount)), //horizontally centered within universe, spaced apart by 2/10 of universe length 
                            y: clientHeight * ((mapUniverses[uni].uy - uyMin) - 0.5 + (Number(rowNum)+1)/7) 
                        }
                        nodes[layerID] = newNode
                    }
                    if(tmp[layerID].layerShown !== false)
                        shownLayerNum++
                }
            }
        }
        //add node to create empty space at bottom of lowest-level universes
        nodes['dontCropOffBottomRightPlease'] = {id: 'blank',x: clientWidth * (uxMax-uxMin + 1), y: clientHeight * (uyMax-uyMin + 1)}


        // BRIDGE NODES
        let bridgeNodes = {}
        for(let bn of mapBridgeNodes) {


            let u0 = bn.universes[0]
            let u1 = bn.universes[1]

            let ux0 = mapUniverses[bn.universes[0]].ux - uxMin
            let ux1 = mapUniverses[bn.universes[1]].ux - uxMin
            let uy0 = mapUniverses[bn.universes[0]].uy - uyMin
            let uy1 = mapUniverses[bn.universes[1]].uy - uyMin

            let bnX = (ux0 + ux1)/2 + 0.5
            let bnY = (uy0 + uy1)/2 
            let angle = Math.atan2(uy1-uy0,ux1-ux0) - Math.PI/2

            if(bn.offsetX) bnX += bn.offsetX
            if(bn.offsetY) bnY += bn.offsetY

            let x = (bnX * clientWidth)
            let y = (bnY * clientHeight) - 75/4 //should scale with node size

            let look = {position:'relative',
                left: x+'px',
                top: y+'px',
                'border-radius': '75px 75px 0 0',
                height: '37.5px !important',
                'font-size': '20px',
                'transform-origin': 'bottom',
                'transform':'rotate('+angle+'rad)',
                'z-index': 1,
                'background-color': "#000000",
                'color': '#ffffff',
                'border-color': '#ffffff',
                'border-bottom': 'none'
            }

            let id0 = bn.id0 || u0 + '_to_' + u1
            let id1 = bn.id1 || u1 + '_to_' + u0

            bridgeNodes[id0] = {uniTo: bn.universes[1], uniFrom: bn.universes[0], id: id0, x, y, style: look}
            angle += Math.PI
            bridgeNodes[id1] = {uniTo: bn.universes[0], uniFrom: bn.universes[1], id: id1, x, y, style: {...look, 'transform':'rotate('+angle+'rad)'}}
        }

        let px = 0
        let py = 0

        // CONNECTIONS
        let connections = []
        for(let c of mapConnections) {
            
            if(c instanceof Array) c = {nodes: [c[0],c[1]]}
            if(readData(c.shown) == false) continue

            if(c.connections) {
                for(co of c.connections) {
                        let n1 = nodes[co[0]] || bridgeNodes[co[0]]
                        let n2 = nodes[co[1]] || bridgeNodes[co[1]]
                        if(!n1 || !n2) continue

                    connections.push({...createConnection(nodes, n1, n2), ...c.style})
                }
            }
            else
            {
                let n1 = nodes[c.nodes[0]] || bridgeNodes[c.nodes[0]]
                let n2 = nodes[c.nodes[1]] || bridgeNodes[c.nodes[1]]
                if(!n1 || !n2) continue

                connections.push({...createConnection(nodes, n1, n2), ...c.style})
            }
        }



        if(mapUniverses[player.universe])
        {
            px = (mapUniverses[player.universe].ux - uxMin)* clientWidth
            py = (mapUniverses[player.universe].uy - uyMin)* clientHeight
        }

        if(options.menuType == 'Map') {
            let c = document.getElementById('mapTree')
            if(c) {
                console.log('c',px,py)
                c.scrollLeft = px 
			    c.scrollTop = py 
            }
        }
        

        return {
            width: (uxMax - uxMin + 1) * clientWidth,
            height: (uyMax - uyMin + 1) * clientHeight,
            px,
            py,
            nodes,
            bridgeNodes,
            connections
        }
    }
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


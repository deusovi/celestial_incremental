mapUniverses = {
    'U1': {
        universe: 'U1',
        ux: 0,
        uy: 0,
        tree: [
            ['r','f','t'],
            ['p','blank','g'],
            ['pt','m','gh'],
            ['i']
        ],
    },
    'U2': {
        universe: 'U2',
        ux: 0,
        uy: 1,
        tree: [
            ['d','rf','cr','ste'],
            ['po','blank','blank','tr'],
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
            ['cs','py'],
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
        ["hrm","hpw"]],
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
            ["bee"], ["bpl","ne"], ["bb","fl", "ho"], ["al", "wa"], ["n", "tw"]
        ],
    },
    'D1': {
        universe: 'D1',
        ux: 1,
        uy: -1,
        tree: [["dr"],["dp"],["dg","dgr","db"],["dn","le","dgj"],["ds","funify","bl","rp","dv"],],
    },
    'CH': {
        universe: 'CH',
        ux: 0,
        uy: -1,
        tree: [["ch"],],
    },
    'TD': {
        universe: 'TD',
        ux: 1,
        uy: 0,
        tree: [["tac"],["tco"],["tma"],["tex"],["tad"]]
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
        universes: ['U1','TD'],
        shown() {
            return true
        },
    },
    {
        universes: ['U2','A1'],
        shown() {
            return true
        },
        offsetY: 3/14, 
    },
    {
        universes: ['U3','UB'],
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
    ['i','m'],
    ['i','gh'],
    ['i','pt'],
    ['i','U1_to_U2'],

    //hex
    ['hre','hpr'],
    ['hsa','hpr'],
    ['hpu','hre'],
    ['hbl','hre'],
    ['hve','hcu'],
    ['hpw','hbl'],
    ['hpw','hve'],
    ['hrm','hpw'],

    //post-OTF "U1"
    ['d','U2_to_U1'],
    ['rf','U2_to_U1'],
    ['po','d'],
    ['po','rf'],

    ["cr","U2_to_U1"],
    ["ste","U2_to_U1"],
    ["tr","cr"],
    ["tr","ste"],

    //U2
    ['ip','po'],
    ['ip','pol'],
    ['ip','ad'],
    ['ta','ad'],

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
            ["U2_to_U3", "id"],
            ["U2_to_U3", "om"],["om","po"],
            ["U2_to_U3", "ip"],
            ["U2_to_U3", "ta"],
            ["U2_to_U3", "bi"],["bi", "tr"],
            ["U2_to_U3", "U2_to_A1"], ["A1_to_U2", "cp"],
            ["U2_to_U3", "ca"]
        ],
        shown() {return tmp.s.layerShown},
        style: {'background-color': '#FF8888'}
    },
    // U3
    ["ra","s"],
    ["co","s"],
    ["cof","s"],
    ["cs","co"],
    ["cs","cof"],
    ["ro","s"],
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
    ["n","al"]

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
                            x: clientWidth * ((mapUniverses[uni].ux - uxMin) + 0.5 + (rowNodeCount > 3 ? 0.1 : 0.12) * (shownLayerNum*2 - rowNodeCount+1)), //horizontally centered within universe, spaced apart by 2/10 of universe length 
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
            if(this.uniTarget !== player.universe) {
                transitionStartTime = Date.now()
                this.uniTarget = player.universe
                this.pxSource = this.pxTarget
                this.pySource = this.pyTarget
            }

            this.pxTarget = (mapUniverses[player.universe].ux - uxMin)* clientWidth
            this.pyTarget = (mapUniverses[player.universe].uy - uyMin)* clientHeight
        }


        // scroll position
        if(options.menuType == 'Map') {
            let c = document.getElementById('mapTree')
            if(c) {
                c.scrollLeft = inOutSine( (Date.now() - transitionStartTime)/300, this.pxSource, this.pxTarget) 
                c.scrollTop = inOutSine( (Date.now() - transitionStartTime)/300, this.pySource, this.pyTarget) 
            }
        }
        

        return {
            width: (uxMax - uxMin + 1) * clientWidth,
            height: (uyMax - uyMin + 1) * clientHeight,
            nodes,
            bridgeNodes,
            connections
        }
    },
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
    if(t>=1) return end
    return (start + end + (end-start)*Math.sin(t*Math.PI/2))/2
}
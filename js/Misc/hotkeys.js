addLayer("hk", {
    name: "Hotkeys", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "HK", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    tooltip: "Hotkeys",
    color: "white",

    tabFormat: [
        ["display-text","Hotkeys",{ fontSize: "24px" }],
        ["display-text","Hotkeys only work in their respective universes."],
        // ["column",() => keyTable('global')]
        ["microtabs","stuff",{'border':'none'}],
        "blank",
        ["clickable",11],

    ],

    microtabs: {
        stuff: {
            'Global': {
                content: [["column",() => keyTable('global')]],
            },
            'U1': {
                content: [["column",() => keyTable('U1')]],
            },
            'U2': {
                content: [["column",() => keyTable('U2')]],
                unlocked() {
                    return keyTable('U2').length > 0 && universes['U2'].uniShown()
                }
            },
            'U3': {
                content: [["column",() => keyTable('U3')]],
                unlocked() {
                    return keyTable('U3').length > 0 && universes['U3'].uniShown()
                }
            },
            'A1': {
                content: [["column",() => keyTable('A1')]],
                unlocked() {
                    return keyTable('A1').length > 0 && universes['A1'].uniShown()
                }
            },
            'A2': {
                content: [["column",() => keyTable('A2')]],
                unlocked() {
                    return keyTable('A2').length > 0 && universes['A2'].uniShown()
                }
            },
            'D1': {
                content: [["column",() => keyTable('D1')]],
                unlocked() {
                    return keyTable('D1').length > 0 && universes['D1'].uniShown()
                }
            },
            'α': {
                content: [["column",() => keyTable('UA')]],
                unlocked() {
                    return keyTable('UA').length > 0 && universes['UA'].uniShown()
                }
            },
            'β': {
                content: [["column",() => keyTable('UB')]],
                unlocked() {
                    return keyTable('UB').length > 0 && universes['UB'].uniShown()
                }
            },
            'δ': {
                content: [["column",() => keyTable('UD')]],
                unlocked() {
                    keyTable('UD').length > 0
                }
            },
            'ε': {
                content: [["column",() => keyTable('DS')]],
                unlocked() {
                    return keyTable('DS').length > 0 && universes['DS'].uniShown()
                }
            },
            // 'ζ': {
            //     content: [["column",() => keyTable('UZ')]],
            // },
        }
    },
    clickables: {
        11: {
            title: "Return to Settings",
            canClick: true,
            onClick() {
                player.tab = "settings"
            },
            style: { width: '306px', minHeight: '60px', color: "var(--textColor)", background: "var(--miscButton)", fontSize: "9px", lineHeight: "1.1", borderRadius: '0', border: "3px solid var(--miscButtonDisable)"},
        }
    },
    layerShown() { return true }
})



function keyTable(uniID) {
    let table = []
    if(uniID == 'global') {

        //hotkeys in settings node come first
        for(k in knownHotkeys.global) { 
            hk = knownHotkeys.global[k]
            if(hk.layer == "settings")
                table.push(["row",[
                    formatKey(hk.key,layers[hk.layer]),
                            ["raw-html","<div style='width:300px;'>"+hk.description+"</div>"]
                    ],{'border-style':'solid','border-top':''}
                ])            
        }
        for(u in universes){ //sort other global hotkeys by universe
            for(k in knownHotkeys.global) { 
                hk = knownHotkeys.global[k]
                if(hk.uni == u)
                    table.push(["row",[
                        formatKey(hk.key,layers[hk.layer]),
                                ["raw-html","<div style='width:300px;'>"+hk.description+"</div>"]
                        ],{'border-style':'solid','border-top':''}
                    ])            
            }
        }
    }

    else for(let r = 0; r < uniMap.length*6;r++) { 
        let ur = Math.floor(r/6)
        for(let u of uniMap[ur]) {
            for(let node of mapUniverses[u].tree[r%6]) {
                if(layers[node].hotkeys)
                    for(hk of layers[node].hotkeys) {
                        if(layers[node].universe == uniID)
                            if(knownHotkeys[uniID][hk.key] && !hk.global) table.push(["row",[
                                formatKey(hk,layers[node]),
                                ["raw-html","<div style='width:300px;'>"+hk.description+"</div>"]
                            ],{'border-style':'solid'}
                        ])
                    }
            }
        }
    }


    return table
}


function formatKey(keyStr, layer) {

    let basicKeyStyle = {'font-family':'monospace','font-size':'16px','display':'block','width':'24px','height':'24px','color':'black','align-content':'center','border-style':'solid','margin':'4px','border-color':'rgba(0, 0, 0, 0.3)'}
    let keyStyle = layer.nodeStyle ? 
        {...basicKeyStyle,'background-color': layer.color,...readData(layer.nodeStyle)} :
        {...basicKeyStyle,'background-color': layer.color}
    let keyIcons = []

    keyStyle.transform = ''

    if(keyStr.startsWith('ctrl+'))
    {
        keyIcons.push(["display-text","Ctrl", keyStyle])
    }

    if(keyStr.toLowerCase() !== keyStr)
    {
        keyIcons.push(["display-text","⇧", keyStyle])   
    }
    keyIcons.push(["display-text",hk.key.toUpperCase(), keyStyle])
    return ["row",keyIcons]
}
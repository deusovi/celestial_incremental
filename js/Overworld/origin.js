let preOTFlayers = ['r','f','p','pt','t','g','gh','m']
let postOTFlayers = ['pol','cha','cr','ste','tr']



addLayer("or", {
    name: "Origin", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OR", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        otfKeeperStatus: 'CLEAR',
    }},
    automate() {
    },
    nodeStyle: {
        background: "linear-gradient(315deg, #bababa 0%, #efefef 100%)",
        backgroundOrigin: "border-box",
        borderColor: "#333",
    },
    tooltip: "Origin",
    update(delta) {
    },
    wipeLayer() {
        if (!hasMilestone("ip", 25)) {
            for (let i = 0; i < player.i.upgrades.length; i++) {
                if (+player.i.upgrades[i] < 22) {
                    player.i.upgrades.splice(i, 1);
                    i--;
                }
            }
        }

        // OTFs
        // mastery, etc
        if (hasUpgrade("ta", 17)) {
            if (player.d.dicePoints.gt(player.ta.highestDicePoints)) {
                player.ta.highestDicePoints = player.d.dicePoints
            }
            if (player.rf.rocketFuel.gt(player.ta.highestRocketFuel)) {
                player.ta.highestRocketFuel = player.rf.rocketFuel
            }
            if (player.h.hexPoint.gt(player.ta.highestHexPoints)) {
                if (player.po.hex || hasUpgrade("s", 18)) player.ta.highestHexPoints = player.h.hexPoint
            }
        }
        if (hasUpgrade("bi", 14)) {
            if (player.po.dice) player.om.diceMasteryPoints = player.om.diceMasteryPoints.add(player.om.diceMasteryPointsToGet)
            if (player.po.rocketFuel) player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.add(player.om.rocketFuelMasteryPointsToGet)
            if (player.po.hex || hasUpgrade("s", 18)) player.om.hexMasteryPoints = player.om.hexMasteryPoints.add(player.om.hexMasteryPointsToGet)
        }

        //OTF claiming
        if(player.or.otfKeeperStatus == 'CLEAR') {
            player.po.dice = false
            player.po.rocketFuel = false
            player.po.hex = false
            player.po.breakInfinity = false
            player.po.gwaTemple = false
            player.in.breakInfinity = false
            player.po.featureSlots = player.po.featureSlotsMax
        }
        if(player.or.otfKeeperStatus == 'CYCLE') {
            let unlockedOTFs = []
            if(tmp.po.clickables[11].unlocked) unlockedOTFs.push('dice')
            if(tmp.po.clickables[12].unlocked) unlockedOTFs.push('rocketFuel')
            if(tmp.po.clickables[13].unlocked) unlockedOTFs.push('hex')
            if(tmp.po.clickables[15].unlocked) unlockedOTFs.push('gwaTemple')

            let otfChoices = unlockedOTFs.map(o => player.po[o])
            console.log(unlockedOTFs, otfChoices)
            for(let i in unlockedOTFs) {
                player.po[unlockedOTFs[i]] = otfChoices[(i-1 + otfChoices.length) % otfChoices.length]
            }
            
        }
    },
    layerChildren: ['pt','m','gh','minipol','pe','minicha'],
    clickables: {
        999: {
            title() { return "<h1>OTF Claimer</h1>" },
            display() {
                return "<h2>Current action: " + player.or.otfKeeperStatus+"</h2>"
            },
            canClick() { return true },
            unlocked() { return (hasMilestone("ip", 18) || player.s.highestSingularityPoints.gt(0) || player.po.breakInfinity) },
            onClick() {
                if(player.or.otfKeeperStatus == 'CLEAR') {
                    player.or.otfKeeperStatus = 'KEEP'
                    return
                }
                else if(player.or.otfKeeperStatus == 'KEEP') {
                    player.or.otfKeeperStatus = 'CYCLE'
                    return
                }
                else player.or.otfKeeperStatus = 'CLEAR'
            },
            style: {
                "border-color": "white",
                "background-origin": "border-box",
                "color": "black",
                borderRadius: "20px",
                width: "250px"
            },
        }
    },
    tabFormat:[
        ["layer-proxy",
            ["i",
                [
                    ["raw-html", () => {return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.gain.gt(player.i.doomSoftcapStart) ? "SOFTCAP OF DOOM: Gain past " + format(player.i.doomSoftcapStart) + " is raised by ^" + format(player.i.doomSoftcap, 3) + "." : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
                    ["bar", "infbar"],
                    ["style-row", [
                            ["style-row", [
                                [
                                    "style-column", () => {return [
                                        ["raw-html", "<h3>Pre-OTF Mult</h3><br>x" + format(player.i.preOTFMult), {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                                        ["row",preOTFlayers.map(l => formatNode(layers[l]))]
                                    ]}
                                ],
                            ], {width: "300px"}],
                            ["style-row", [
                                [
                                    "style-column", () => {return [
                                        ["raw-html", "<h3>Post-OTF Mult</h3><br>x" + format(player.i.postOTFMult), {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                                        ["row",postOTFlayers.map(l => formatNode(layers[l]))]
                                    ]}
                                ],
                            ], () => {return player.i.postOTFMult.neq(1) ? {width: "300px", height: "100px", borderLeft: "3px solid #ccc"} : {display: "none !important"}}],

                        ], () => {return player.i.postOTFMult.neq(1) ? {width: "603px", height: "100px", background: "rgba(0,0,0,0.5)", border: "3px solid #ccc", borderRadius: "25px", margin: "10px auto"} : player.i.preOTFMult.neq(1) ? {width: "300px", height: "100px", background: "var(--miscButton)", border: "3px solid var(--regBorder)", borderRadius: "25px", margin: "10px auto"} : {display: "none !important"}}
                    ],
                    ["blank", "25px"],
                    ["style-row", [
                        ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16],
                        ["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21],
                    ], {maxWidth: "800px"}],
               ]
            ]
        ],
        ["blank",25],
        //OTF stuff
        ["layer-proxy",
            ["po",
                [
                    ["row",
                        [
                            ["clickable",11],
                            ["clickable",12],
                            ["clickable",13],
                            ["clickable",14],
                            ["clickable",15]
                        ]
                    ],
               ]
            ]
        ],
        ["clickable",999],

    ],
    layerShown() { return player.startedGame == true},
})





let formatNode = (layer) => {
    let basicNodeIconStyle = {'font-family':'monospace','font-size':'16px','display':'block','width':'24px','height':'24px','color':'black','align-content':'center','border-style':'solid','margin':'2px','border-color':'rgba(0, 0, 0, 0.3)'}
    let nodeIconStyle = layer.nodeStyle ? 
        {...basicNodeIconStyle,'background-color': readData(layer.color),...readData(layer.nodeStyle)} :
        {...basicNodeIconStyle,'background-color': readData(layer.color)}
    nodeIconStyle['border-radius'] = '24px'
    nodeIconStyle.transform = ''
    return["display-text",layer.symbol.toUpperCase(), nodeIconStyle]
    
}
// NOTE: this layer keeps all its actual data in layer "oi" 

addLayer("pm", {
    name: "Proto-Memories", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PM",
    universe: "A1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    
    tooltip: "Proto-Memories",
    color: "#eee",
    branches: ["an", "rg"],
    update(delta) {
      
    },
    bars: {
        replicantiBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 400,
            height: 25,
            progress() {
                if (player.cp.replicantiPoints.lt(player.cp.replicantiPointCap)) {
                    return player.cp.replicantiPointsTimer.div(player.cp.replicantiPointsTimerReq)
                } else {
                    return new Decimal(1)
                }
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#193ceb"},
            display() {
                if (player.cp.replicantiPoints.lt(player.cp.replicantiPointCap)) {
                    return "Time: " + formatTime(player.cp.replicantiPointsTimer) + "/" + formatTime(player.cp.replicantiPointsTimerReq);
                } else {
                    return "<p style='color:red'>[HARDCAPPED]</p>"
                }
            },
        },
    },
    clickables: {
        14: {
            title() {
                if (!player.oi.linkerBought) {
                    return "<h2>Gaining production time locked until all linking powers obtained.</h2>"
                } else {
                    return "<h2>Reset linking power for production time.</h2><br><h3>Req: 1e60 replicanti points<br>(Based on replicanti points)</h3>"
                }
            },
            canClick() { return player.cp.replicantiPoints.gte(1e60) && player.oi.linkerBought },
            unlocked() { return true },
            onClick() {
                player.oi.protoMemorySeconds = player.oi.protoMemorySeconds.add(player.oi.protoMemorySecondsToGet)
                player.oi.oilPause = new Decimal(4)

                player.oi.linkingPower[0] = new Decimal(0)
                player.oi.linkingPower[1] = new Decimal(0)
                player.oi.linkingPower[2] = new Decimal(0)
                player.oi.linkingPower[3] = new Decimal(0)
                player.oi.linkingPower[4] = new Decimal(0)
                player.oi.linkingPower[5] = new Decimal(0)
            },
            style() {
                let look = { width: '600px', "min-height": '120px', border: "3px solid rgba(0,0,0,0.5)", borderRadius: '15px' }
                look.backgroundColor = this.canClick() ? "#e0ffff" : "#bf8f8f"
                return look
            }
        }
    },
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Proto Memories": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("cp", 18) },
                content:
                [
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Point Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "20px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[0]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[0]) + "/s)</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "27px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "50px", borderRight: "3px solid #0c1a36"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Factor Power Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "20px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[1]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[1]) + "/s)</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "27px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "50px", borderRight: "3px solid #0c1a36"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Prestige Point Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "20px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[2]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[2]) + "/s)</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "27px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "50px"}],
                    ], {width: "825px", border: "3px solid #0c1a36"}],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Tree Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "20px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[3]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[3]) + "/s)</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "27px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "50px", borderRight: "3px solid #0c1a36"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Grass Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "20px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[4]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[4]) + "/s)</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "27px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "50px", borderRight: "3px solid #0c1a36"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Grasshopper Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "20px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[5]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[5]) + "/s)</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "27px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "50px"}],
                    ], {width: "825px", borderLeft: "3px solid #0c1a36", borderRight: "3px solid #0c1a36", borderBottom: "3px solid #0c1a36"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.protoMemories) + "</h3> proto memories." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.oi.protoMemorySeconds.gt(0) ? "You are gaining <h3>" + format(player.oi.protoMemoriesPerSecond) + "</h3> proto memories per second. (based on total linking power)" : "You currently have no proto memory production time." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatTime(player.oi.protoMemorySeconds) + "</h3> to produce proto memories." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + formatTime(player.oi.protoMemorySecondsToGet) + "</h3> of proto memory production on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 14]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23], ["ex-buyable", 24]], {maxWidth: "1200px"}],
                ]
            },
            "Remembrance Cores": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("cp", 18) },
                content: [
                    ["layer-proxy", ["ca", [
                        ["blank", "25px"],
                        ["raw-html", () => {return "You have <h3>" + formatWhole(player.ca.rememberanceCores) + "</h3> rememberance cores."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "Boosts cante energy gain by x<h3>" + format(player.ca.rememberanceCoresEffect) + "</h3>."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["raw-html", () => {return "You have <h3>" + formatWhole(player.ca.canteCores) + "</h3> Cante cores."}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You have <h3>" + format(player.oi.protoMemories) + "</h3> proto memories."}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["clickable", 15],
                    ]]],
                ]
            },
    }},
    tabFormat: [
        ["raw-html", () => {return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", () => {return "Replicanti Mult: " + format(player.cp.replicantiPointsMult, 4) + "x"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["row", [["bar", "replicantiBar"]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("cp", 18)},

    hotkeys: [
        {
            key: "p", 
            description: "Gain Proto Memories",
            onPress() {
                clickClickable(this.layer, 14)
            },
        },
        {
            key: "c", 
            description: "Convert a Cante core into a remembrance core",
            onPress() {
                clickClickable('ca', 15)
            },
        }
    ]
})

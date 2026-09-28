addLayer("tr", {
    name: "Time Reversal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TR", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
    }},
    automate() {
    },
    nodeStyle() {
        return {color: "white", borderColor: "grey", backgroundColor: "#d82cd4"}
    },
    tooltip: "Time Reversal",
    update(delta) {
        if (!player.r.timeReversed && !hasChallenge("fu", 11)) {
            player.r.timeCubesPerSecond = new Decimal(0)
        } else {
            player.r.timeCubesPerSecond = player.points.plus(1).log10().pow(0.3)
            player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(buyableEffect("id", 23))
            if (!hasUpgrade("depth2", 103)) player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(buyableEffect("oi", 23))
            player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(levelableEffect("pet", 209)[2])
            if (hasUpgrade("ep0", 12)) player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(upgradeEffect("ep0", 12))
            if (hasUpgrade("ep2", 2)) player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(upgradeEffect("ep2", 2))
            if (hasUpgrade("s", 14)) player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(upgradeEffect("s", 14))
            player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(player.d.boosterEffects[17])
            player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(levelableEffect("pu", 207)[1])
            player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(player.i.postOTFMult)

            // EXPONENTS
            if (hasUpgrade("cs", 103)) player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.pow(1.1)
            if (hasUpgrade("depth2", 103)) player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.pow(buyableEffect("oi", 23))

            // SOFTCAP
            if (player.r.timeCubesPerSecond.gte("1e10000")) player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.div("1e10000").pow(0.1).mul("1e10000")
        }

        player.r.timeCubes = player.r.timeCubes.add(player.r.timeCubesPerSecond.mul(delta))

        if (player.points.gte("1e1000")) {
            player.r.timeCubesEffect = player.r.timeCubes.pow(1.15)
        } else {
            player.r.timeCubesEffect = new Decimal(0)
        }

        if (!hasMilestone("r", 27)) {
            player.r.timeCubeEffects[0] = player.r.timeCubesEffect.pow(1.15).mul(100).add(1)
            player.r.timeCubeEffects[1] = player.r.timeCubesEffect.pow(1.1).mul(10).add(1)
            player.r.timeCubeEffects[2] = player.r.timeCubesEffect.pow(0.9).mul(6).add(1)
            player.r.timeCubeEffects[3] = player.r.timeCubesEffect.pow(0.7).mul(3).add(1)
        } else {
            player.r.timeCubeEffects[0] = player.r.timeCubesEffect.pow(2.3).mul(100).add(1)
            player.r.timeCubeEffects[1] = player.r.timeCubesEffect.pow(2.2).mul(10).add(1)
            player.r.timeCubeEffects[2] = player.r.timeCubesEffect.pow(1.8).mul(6).add(1)
            player.r.timeCubeEffects[3] = player.r.timeCubesEffect.pow(1.4).mul(3).add(1)
        }

        for (let i = 0; i < 4; i++) {
            player.r.timeCubeEffects[i] = player.r.timeCubeEffects[i].pow(player.cs.scraps.point.effect)
            if (hasUpgrade("cs", 104)) player.r.timeCubeEffects[i] = player.r.timeCubeEffects[i].pow(2)
        }
    },
    wipeLayer() {
        player.r.timeCubes = new Decimal(0)
        player.r.timeCubesPerSecond = new Decimal(0)
        for (let i in player.r.buyables) {
            player.r.buyables[i] = new Decimal(0)
        }
        player.r.timeReversed = false

    },
    layerChildren: ["cr","ste"],

    tabFormat:[
        ["layer-proxy",
            ["r",
                [
                    ["blank", "25px"],
                    ["style-row", [
                        ["row", [["clickable", 15], ["clickable", 16]]],
                        ["style-column", [
                            ["raw-html", function () { return "When time is reversed, points are drained and all pre-OTF resource production stops." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ], {width: "490px", paddingLeft: "5px", paddingRight: "5px"}],
                    ], {width: "700px", backgroundColor: "#333333", border: "2px solid white", borderBottom: "2px solid white", borderRadius: "15px"}],
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-row", [
                            ["raw-html", () => {return "You have " + format(player.r.timeCubes) + " time cubes"}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                            ["raw-html", () => {return "(" + format(player.r.timeCubesPerSecond) + "/s)"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "12px"}],
                            ["raw-html", () => {return player.r.timeCubesPerSecond.gte("1e10000") ? "<small style='margin-left:10px'>[SOFTCAPPED]</small>" : ""}, {color: "red", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "650px", height: "50px", borderBottom: "2px solid #d82cd4"}],
                        ["style-column", [
                            ["raw-html", function () { return "Points: x" + format(player.r.timeCubeEffects[0]) }, () => { return player.points.gte("1e1000") ? {color: "white", fontSize: "20px", fontFamily: "monospace"} : {color: "grey", fontSize: "20px", fontFamily: "monospace"} }],
                            ["raw-html", function () { return "Tree: x" + format(player.r.timeCubeEffects[1]) }, () => { return player.points.gte("1e1000") ? {color: "white", fontSize: "20px", fontFamily: "monospace"} : {color: "grey", fontSize: "20px", fontFamily: "monospace"} }],
                            ["raw-html", function () { return "Grass: x" + format(player.r.timeCubeEffects[2]) }, () => { return player.points.gte("1e1000") ? {color: "white", fontSize: "20px", fontFamily: "monospace"} : {color: "grey", fontSize: "20px", fontFamily: "monospace"} }],
                            ["raw-html", function () { return "Fertilizer: x" + format(player.r.timeCubeEffects[3]) }, () => { return player.points.gte("1e1000") ? {color: "white", fontSize: "20px", fontFamily: "monospace"} : {color: "grey", fontSize: "20px", fontFamily: "monospace"} }],
                            ["raw-html", function () { return "<i>(Only active at >1e1,000 Points)</i>" }, { color: "#ddd", fontSize: "16px", fontFamily: "monospace" }],        
                        ], {width: "650px", height: "125px"}],
                    ], {width: "650px", height:"175px", backgroundColor: "#561154", border: "2px solid #d82cd4", borderRadius: "15px"}],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14]], {maxWidth: "1200px"}],
               ]
            ]
        ]
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 26)},
    hotkeys: [
        {
            key: "t", 
            description: "Reverse Time",
            unlocked() {
                return hasUpgrade("i", 26)
            },
            onPress() {
                if(!player.r.timeReversed){
                    clickClickable(this.layer, 16)
                    doPopup("none", "Time Reversal turned on!", "Toggle", 5, "#d82cd4", false)
                }
                else {
                    clickClickable(this.layer, 12)
                    doPopup("none", "Time Reversal turned off!", "Toggle", 5, "#d82cd4", false)
                }
            },
            style: {color: "white", borderColor: "grey", backgroundColor: "#d82cd4"},
        }
    ]
})

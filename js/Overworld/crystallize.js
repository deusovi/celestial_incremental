addLayer("cr", {
    name: "Crystallize", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CR", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U1",
    startData() { return {
    }},
    automate() {
    },
    nodeStyle() {
        return { color: "white", borderColor: "#31aeb0", backgroundColor: "#98245c"}
    },
    tooltip: "Crystallize",
    update(delta) {

        // START OF CRYSTAL MODIFIERS
        player.p.crystalsToGet = player.r.tier.pow(0.002).mul(4)
        player.p.crystalsToGet = player.p.crystalsToGet.mul(buyableEffect("id", 22))
        player.p.crystalsToGet = player.p.crystalsToGet.mul(buyableEffect("r", 12))
        if (hasUpgrade("hpw", 1023)) player.p.crystalsToGet = player.p.crystalsToGet.mul(upgradeEffect("hpw", 1023))
        if (!hasUpgrade("depth2", 103)) player.p.crystalsToGet = player.p.crystalsToGet.mul(buyableEffect("oi", 22))
        if (hasUpgrade("pol", 17)) player.p.crystalsToGet = player.p.crystalsToGet.mul(upgradeEffect("pol", 17))
        if (hasUpgrade("ep1", 11)) player.p.crystalsToGet = player.p.crystalsToGet.mul(upgradeEffect("ep1", 11))
        if (hasUpgrade("ep2", 4)) player.p.crystalsToGet = player.p.crystalsToGet.mul(upgradeEffect("ep2", 4))
        if (hasUpgrade("s", 14)) player.p.crystalsToGet = player.p.crystalsToGet.mul(upgradeEffect("s", 14))
        player.p.crystalsToGet = player.p.crystalsToGet.mul(buyableEffect("ra", 14))
        player.p.crystalsToGet = player.p.crystalsToGet.mul(player.co.cores.prestige.effect[2])
        player.p.crystalsToGet = player.p.crystalsToGet.mul(player.i.postOTFMult)

        // POWER MODIFIERS
        if (hasUpgrade("depth2", 103)) player.p.crystalsToGet = player.p.crystalsToGet.pow(buyableEffect("oi", 22))

        // CRYSTALS PER SECOND
        player.p.crystals = player.p.crystals.add(player.p.crystalsToGet.mul(Decimal.mul(buyableEffect("fa", 202), delta)))

        // CRYSTAL EFFECT
        player.p.crystalEffect = player.p.crystals.plus(1).log(10).pow(0.265).mul(0.045).add(1)
        if (hasUpgrade("cs", 303)) player.p.crystalEffect = player.p.crystals.plus(1).log(10).pow(0.3).mul(0.05).add(1)
        if (!hasUpgrade("cs", 304)) {
            player.p.crystalEffect = player.p.crystalEffect.min(1.5)
        } else {
            if (player.p.crystalEffect.gte(1.5)) player.p.crystalEffect = player.p.crystals.plus(1).log("1e100").pow(0.7).mul(0.01).add(1.41)
            player.p.crystalEffect = player.p.crystalEffect.min(2)
        }
    },

    wipeLayer() {
        player.p.crystals = new Decimal(0)
        player.p.crystalEffect = new Decimal(0)
        player.p.crystalsToGet = new Decimal(0)
    },
    layerChildren: ["pt","m","gh"],

    
    tabFormat: [
         ["layer-proxy",
            ["p",
                [
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.p.crystals) + "</h3> crystals."}, {color: "#b6658c", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.p.crystalsToGet) + ")"}, () => {
                            let look = {color: "#b6658c", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.p.crystalsToGet.gte(1) ? look.color = "#b6658c" : look.color = "gray"
                            return look
                        }],
                    ]],
                    ["raw-html", "(Gain based on Tetr)", { color: "#b6658c", fontSize: "16px", fontFamily: "monospace" }],
                    ["row", [
                        ["raw-html", () => {return "Boosts ranks, tiers, tetr, and pent effect by <h3>^" + format(player.p.crystalEffect, 5) + "</h3>."}, {color: "#b6658c", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return (!hasUpgrade("cs", 304) && player.p.crystalEffect.gte(1.5)) || player.p.crystalEffect.gte(2) ? "<small style='margin-left:8px'>[HARDCAPPED]</small>" : hasUpgrade("cs", 304) && player.p.crystalEffect.gte(1.5) ? "<small style='margin-left:8px'>[SOFTCAPPED]</small>" : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
                    ]],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14],
                        ["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17], ["ex-buyable", 18]], {maxWidth: "1200px"}],
                ]
            ]
        ]
    ],
        
    layerShown() { return player.startedGame == true && hasUpgrade("i", 24)},
    hotkeys: [
        {
            key: "y", 
            description: "Crystallize",

            unlocked() {
                return hasUpgrade("i", 24)
            },
            isAutomated() {
                return hasMilestone("s", 16)
            },
            onPress() {
                clickClickable(this.layer, 12)
            },
        },
    ]
})

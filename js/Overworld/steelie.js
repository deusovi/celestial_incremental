addLayer("ste", {
    name: "Steelie", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ST", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
    }},
    automate() {
    },
    nodeStyle() {
        return { color: "white", borderColor: "black", backgroundColor: "grey" }
    },
    tooltip: "Steelie",
    update(delta) {
        if (player.m.codeExperience.pow(0.08).lt("1e500")) player.gh.steelToGet = player.m.codeExperience.pow(0.08)
        if (player.m.codeExperience.pow(0.08).gte("1e500")) player.gh.steelToGet = Decimal.mul("1e500", player.m.codeExperience.plus(10).log10().pow(10))
        if (hasUpgrade("cs", 604)) player.gh.steelToGet = player.gh.steelToGet.pow(2)
        if (hasUpgrade("bi", 107)) player.gh.steelToGet = player.gh.steelToGet.mul(upgradeEffect("bi", 107))
        player.gh.steelToGet = player.gh.steelToGet.mul(buyableEffect("p", 14))
        player.gh.steelToGet = player.gh.steelToGet.mul(buyableEffect("id", 21))
        if (hasUpgrade("hpw", 1023)) player.gh.steelToGet = player.gh.steelToGet.mul(upgradeEffect("hpw", 1023))
        if (!hasUpgrade("depth2", 103)) player.gh.steelToGet = player.gh.steelToGet.mul(buyableEffect("oi", 21))
        if (hasUpgrade("ep2", 9)) player.gh.steelToGet = player.gh.steelToGet.mul(upgradeEffect("ep2", 9))
        if (hasUpgrade("s", 14)) player.gh.steelToGet = player.gh.steelToGet.mul(upgradeEffect("s", 14))
        player.gh.steelToGet = player.gh.steelToGet.mul(player.fa.foundryEffect)
        if (player.pol.pollinatorEffects.mechanical.enabled) player.gh.steelToGet = player.gh.steelToGet.mul(player.pol.pollinatorEffects.mechanical.effects[0])
        if (hasMilestone("fa", 14)) player.gh.steelToGet = player.gh.steelToGet.mul(player.fa.milestoneEffect[3])
        player.gh.steelToGet = player.gh.steelToGet.mul(buyableEffect("s", 13))
        player.gh.steelToGet = player.gh.steelToGet.mul(buyableEffect("fu", 18))
        player.gh.steelToGet = player.gh.steelToGet.mul(player.fu.happinessEffect2)
        player.gh.steelToGet = player.gh.steelToGet.mul(player.co.cores.grasshopper.effect[2])
        player.gh.steelToGet = player.gh.steelToGet.mul(buyableEffect("st", 104))
        player.gh.steelToGet = player.gh.steelToGet.mul(player.i.postOTFMult)

        // POWER MODIFIERS
        player.gh.steelToGet = player.gh.steelToGet.pow(player.se.starsExploreEffect[0][5])
        player.gh.steelToGet = player.gh.steelToGet.pow(player.cof.coreFragmentEffects[2])
        player.gh.steelToGet = player.gh.steelToGet.pow(buyableEffect("laboratory", 12))
        if (hasUpgrade("depth2", 103)) player.gh.steelToGet = player.gh.steelToGet.pow(buyableEffect("oi", 21))

        // STEEL PER SECOND
        if (hasUpgrade("sma", 103)) player.gh.steel = player.gh.steel.add(Decimal.mul(player.uni["U1"].tickspeed.div(10), player.gh.steelToGet.mul(delta)))

        // STEEL EFFECT
        player.gh.steelEffect = player.gh.steel.pow(0.75).add(1)

    },

    wipeLayer() {
        player.p.prestigePoints = new Decimal(0)
        player.p.prestigePointsToGet = new Decimal(0)
        player.p.prestigeEffect = new Decimal(1)
        player.p.prestigeEffect2 = new Decimal(1)
        player.p.upgrades = []
    },
    layerChildren: ["pt","m","gh"],

    
    tabFormat: [
         ["layer-proxy",
            ["gh",
                [
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.gh.steel) + "</h3> steel." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.gh.steelToGet) + ")" }, () => {
                            let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.gh.steelToGet.gte(1) ? look.color = "white" : look.color = "gray"
                            return look
                        }],
                    ]],
                    ["raw-html", () => { return "Boosts grasshopper gain by x" + format(player.gh.steelEffect)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 31], ["ex-buyable", 32], ["ex-buyable", 33], ["ex-buyable", 34],
                        ["ex-buyable", 35], ["ex-buyable", 36], ["ex-buyable", 37], ["ex-buyable", 38]], {maxWidth: "1200px"}],
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

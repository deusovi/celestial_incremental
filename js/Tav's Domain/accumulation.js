addLayer("tac", {
    name: "Accumulation", 
    color: "#5b629a",
    symbol: "Ac",
    universe: "TD",
    tooltip: "Accumulation",
    startData() { return {} },
    wipeLayer() {
        for (let i = 11; i < 45; ) {
            player.tad.buyables[i] = new Decimal(0)
            if (i % 10 == 4) {i = i+7} else {i++}
        }
    },
    automate() {
        if (player.tad.auto) {
            for (let i = 11; i < 45; ) {
                buyBuyable("tad", i)
                if (i % 10 == 4) i = i + 7
                else i++
            }
        }
    },
    layerChildren: ["tm"],
    tabFormat: [
        ["tooltip-row", [
            ["raw-html", () => {return "You have " + formatSimple(player.tad.matter) + " matter"}, {color: "black", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + formatSimple(player.tad.matterGain) + "/s)"}, () => {
                look = {color: "black", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}
                player.tad.matterGain.gt(0) ? look.color = "black" : look.color = "#666"
                return look
            }],
            ["raw-html", () => {return "<div class='bottomTooltip'>Base Gain<hr><small>(+" + formatSimple(player.tad.matterBase) + "/s)</small></div>"}],
        ]],
        ["raw-html", () => {return player.tad.matterGain.gte(1.79e308) ? "Matter Limiter: Gain past 1.79e308 is raised by ^" + formatSimple(player.tad.matterSoftcap, 3) : ""}, {color: "red", fontSize: "20px", fontFamily: "monospace"}],
        ["tooltip-row", [
            ["raw-html", () => {return player.tad.matter.gte(player.tad.domainCap) ? "Domain limit reached." : "Domain collapses at " + formatWhole(player.tad.domainCap) + " matter."}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return player.tad.matterGain.gt(0) ? "<div class='bottomTooltip'>Time till collapse<hr><small>" + formatTime(player.tad.domainCap.sub(player.tad.matter).div(player.tad.matterGain)) + "</small></div>" : "<div class='bottomTooltip'>Time till collapse<hr><small>∞y ∞d ∞h ∞m ∞s</small></div>"}],
        ]],

        [
            "layer-proxy",[
                "tad",
                [
                    ["row", [["clickable", 21], ["clickable", 22], ["clickable", 25]]],
                    ["blank", "10px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                    ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23], ["buyable", 24]]],
                    ["row", [["buyable", 31], ["buyable", 32], ["buyable", 33], ["buyable", 34]]],
                    ["row", [["buyable", 41], ["buyable", 42], ["buyable", 43], ["buyable", 44]]],
                ]
            ]
        ]
    ],
    layerShown() {return true},
    hotkeys: [
        {
            key: "a", 
            description: "Max Accumulators",
            onPress() {
                clickClickable("tad", 25)
            },
        }
	]
})
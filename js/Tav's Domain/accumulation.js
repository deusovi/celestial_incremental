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
addLayer("tco", {
    color: "#094242",
    symbol: "Co",
    universe: "TD",
    tooltip: "Compression",
    branches: ["tac"],

    wipeLayer() {
        player.tad.compression = player.tad.compressionKept
        player.tad.compressionTotal = player.tad.compressionKept
        player.tad.compressionGain = new Decimal(0)

        for (let i = 101; i < 105; i++) {
            player.tad.buyables[i] = new Decimal(0)
        }
    },
    layerChildren: ["tac"],
    tabFormat: [
        [
            "layer-proxy",[
                "tad",
                [
                    ["row", [
                        ["raw-html", () => {return player.tad.compression.neq(1) ? "You are at <h3>" + formatWhole(player.tad.compression) + "</h3> compressions." : "You are at <h3>" + formatWhole(player.tad.compression) + "</h3> compression." }, {color: "black", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + formatWhole(player.tad.compressionGain) + ")"}, () => {
                            let look = {color: "black", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.tad.compressionGain.gt(0) ? look.color = "black" : look.color = "#666"
                            return look
                        }],
                    ]],
                    ["blank", "10px"],
                    ["clickable", 11],
                    ["blank", "10px"],
                    ["row", [["clickable", 23], ["clickable", 24]]],
                    ["blank", "10px"],
                    ["row", [["buyable", 101], ["buyable", 102], ["buyable", 103], ["buyable", 104]]],
                    ["blank", "10px"],
                    ["clickable", 12],
                ]
            ]
        ]
    ],

    layerShown() {return hasUpgrade("tad", 125)},
    hotkeys: [
        {
            key: "k", 
            description: "Compress",
            onPress() {
                clickClickable("tad", 41)
            },
        }
	]
})
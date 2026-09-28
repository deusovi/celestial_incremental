addNode("tst", {
    canClick: true,
    onClick() {
        player.subtabs["tad"]["Domain"] = "Stabilization"
    },
})



addLayer("tst", {
    color: "#b9bcd5",
    symbol: "St",
    universe: "U2",
    tooltip: "Stabilization",
    branches: ["tco"],

    wipeLayer() {
        
    },
    layerChildren: [],
    tabFormat: [
        [
            "layer-proxy",[
                "tad",
                [
                    ["row", [
                        ["raw-html", () => {return player.tad.magnification.neq(1) ? "You are at <h3>" + formatWhole(player.tad.magnification) + "</h3> magnifications." : "You are at <h3>" + formatWhole(player.tad.magnification) + "</h3> magnification." }, {color: "black", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + formatWhole(player.tad.magnificationGain) + ")"}, () => {
                            let look = {color: "black", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.tad.magnificationGain.gt(0) ? look.color = "black" : look.color = "#666"
                            return look
                        }],
                    ]],
                    ["blank", "10px"],
                    ["clickable", 31],
                    ["blank", "25px"],
                    ["milestone", 1],
                    ["milestone", 2],
                    ["milestone", 3],
                    ["milestone", 4],
                    ["milestone", 5],
                    ["milestone", 6],
                ]
            ]
        ]
    ],

    layerShown() {return hasMilestone("s", 11)},
})
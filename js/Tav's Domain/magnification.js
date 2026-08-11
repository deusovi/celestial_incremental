addLayer("tma", {
    color: "#6d228b",
    symbol: "Ma",
    universe: "U2",
    tooltip: "Magnification",
    branches: ["tco"],

    wipeLayer() {
        if (!hasMilestone("tad", 6)) {
            player.tad.magnification = new Decimal(0)
            player.tad.magnificationGain = new Decimal(0)
            for (let i = 0; i < player.tad.milestones.length; i++) {
                if (+player.tad.milestones[i] < 10) {
                    player.tad.milestones.splice(i, 1);
                    i--;
                }
            }
        }
    },
    layerChildren: ["tco"],
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

    layerShown() {return hasUpgrade("tad", 145)},
    hotkeys: [
        {
            key: "q", 
            description: "Magnify",
            onPress() {
                clickClickable(this.layer, 31)
            },
        }
	]
})
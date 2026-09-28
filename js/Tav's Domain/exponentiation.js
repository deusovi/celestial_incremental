addLayer("tex", {
    color: "#ffd5b3",
    symbol: "Ex",
    universe: "TD",
    tooltip: "Exponentiation",


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
    layerChildren: ["tma"],
    tabFormat: [
        [
            "layer-proxy",[
                "tad",
                [
                    ["clickable", 41],
                    ["blank", "25px"],
                    ["style-row", [
                        ["raw-html", () => {return player.tad.exponentiate.neq(1) ? "You have exponentiated " + formatWhole(player.tad.exponentiate) + " times" : "You have exponentiated " + formatWhole(player.tad.exponentiate) + " time"}, {color: "rgba(0,0,0,0.6)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {backgroundColor: "#ffd5b3", border: "3px solid #997f6b", borderRadius: "13px 13px 0px 0px", width: "588px", height: "40px"}],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "1", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#ffd5b3", border: "3px solid #997f6b", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 101],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "2", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#ffd5b3", border: "3px solid #997f6b", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 102],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "4", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#ffd5b3", border: "3px solid #997f6b", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 103],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "8", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#ffd5b3", border: "3px solid #997f6b", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 104],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "16", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#ffd5b3", border: "3px solid #997f6b", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 105],
                    ]],
                    ["style-row", [
                        ["raw-html", "Exponentiation content is kept on all resets", {color: "rgba(0,0,0,0.6)", fontSize: "20px", fontFamily: "monospace"}],
                    ], {backgroundColor: "#ffd5b3", border: "3px solid #997f6b", borderTop: "0px", borderRadius: "0px 0px 13px 13px", width: "588px", height: "30px"}],
                ],
            ]
        ]
    ],

    layerShown() {return hasUpgrade("depth1", 103)},
    hotkeys: [
        {
            key: "e", 
            description: "Exponentiate",
            onPress() {
                clickClickable("tad", 41)
            },
        }
	]
})
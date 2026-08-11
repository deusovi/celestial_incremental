addLayer("cha", {
    name: "Charger", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CH", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U1",
    startData() { return {
    }},
    automate() {
    },
    nodeStyle() {
        return { color: "#f7f774", borderColor: "gray", backgroundColor: "#222222"}
    },
    tooltip: "Charger",
    update(delta) {
    },
    tabFormat: [
        ["layer-proxy",
            ["fa",
                [
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", () => { return "You have <h3>" + format(player.fa.charge) + "</h3> Charge" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "(+" + format(player.fa.chargeRate) + "/s)" }, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => { return "Best charge: " + format(player.fa.bestCharge) + ""}, {color: "white", fontSize: "20px", fontFamily: "monospace" }],
                    ["raw-html", () => { return "(Charge is reset on steel and infinity resets, and best charge is reset on singularity resets.)"}, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
                    ["raw-html", () => { return "(Charge gain is based on factory buyables)"}, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", () => { return "Charger Milestones"}, {color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["blank", "10px"],
                    ["milestone", 11],
                    ["milestone", 12],
                    ["milestone", 13],
                    ["milestone", 14],
                    ["milestone", 15],
                    ["milestone", 16],
                    ["milestone", 17],
                    ["milestone", 18],
                    ["milestone", 19],
                    ["milestone", 21],
                    ["milestone", 22],
                ]
            ]
        ]
    ],
    layerShown() { return player.fa.buyables[13].gte(1) },
})

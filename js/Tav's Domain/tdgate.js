addLayer("tdg", {
    color: "#b9bcd5",
    symbol: "TD",
    universe: "U2",
    tooltip: "TD Gate",
    wipeLayer() {
        
    },
    layerChildren: [],
    tabFormat: [
        [
            "layer-proxy",[
                "ta",
                [
                    ["upgrade", 21],
                ]
            ]
        ]
    ],

    gateOpen() {
        return hasUpgrade('ta',21)
    },
    layerShown() {
        return true
    }
})
addLayer("pt", {
    name: "Pent", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Π", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
    }},
    automate() {
    },
    color: '#217777',
    tooltip: "Pent",
    update(delta) {
    },
    tabFormat: [
        ["raw-html", () => { return "Placeholder" }, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
        ],
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})

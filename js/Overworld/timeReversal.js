addLayer("tr", {
    name: "Time Reversal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TR", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
    }},
    automate() {
    },
    nodeStyle() {
        return {color: "white", borderColor: "grey", backgroundColor: "#d82cd4"}
    },
    tooltip: "Time Reversal",
    update(delta) {
    },
    tabFormat: [
        ["raw-html", () => { return "Placeholder" }, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
        ],
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})

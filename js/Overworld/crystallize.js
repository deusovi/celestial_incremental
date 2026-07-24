addLayer("cr", {
    name: "Crystallize", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CR", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U1",
    startData() { return {
    }},
    automate() {
    },
    nodeStyle() {
        return { color: "white", borderColor: "#31aeb0", backgroundColor: "#98245c"}
    },
    tooltip: "Crystallize",
    update(delta) {
    },
    tabFormat: [
        ["raw-html", () => { return "Placeholder" }, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
        ],
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})

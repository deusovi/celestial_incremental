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
        ["raw-html", () => { return "Placeholder" }, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
        ],
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})

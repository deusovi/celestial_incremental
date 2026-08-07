addLayer("gd", {
    name: "Galaxy Dust", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GD", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U2",
    startData() { return {
    }},
    automate() {
    },
    nodeStyle() {
        return { borderColor: "#241c44", backgroundColor: "#333c81", color: "white",}
    },
    tooltip: "Charger",
    update(delta) {
    },
    tabFormat: [
        ["raw-html", () => { return "Placeholder" }, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
        ],
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})

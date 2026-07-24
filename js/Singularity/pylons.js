addLayer("py", {
    name: "Pylons", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Py", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
    }},
    automate() {
    },
    color: '#8B664B',
    tooltip: "Pylons",
    update(delta) {
    },
    tabFormat: [
        ["raw-html", () => { return "Placeholder" }, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
        ],
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})

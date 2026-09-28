addNode("tm", {
    name: "Matter", 
    color: "#5b629a",
    symbol: "μ",
    universe: "TD",
    tooltip: "Matter",
    size: 'tiny',
    nodeStyle() {
        return {
            background: "linear-gradient(150deg, #b2d8d8, 50%, #094242 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#b2d8d8",
            color: "#b2d8d8",
        }
    }, 
    startData() { return {} },
    wipeLayer() {
        player.tad.matter = new Decimal(1)
        player.tad.matterGain = new Decimal(0)
    },
    layerShown() {
        return true
    }
})
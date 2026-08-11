addNode('_preOTF', {
    symbol: "",
    nodeStyle() {
        return { color: '#FFFFFF', 'background-color': '#FFFFFF', 'border-color': "#FFFFFF", 'scale': '50%'}
    },
    tooltip() {return ""},
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})

addNode('_preOTF2', {
    symbol: "",
    nodeStyle() {
        return { color: '#FFFFFF', 'background-color': '#FFFFFF', 'border-color': "#FFFFFF", 'scale': '50%'}
    },
    tooltip() {return ""},
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})

addNode('_CrSt', {
    symbol: "",
    nodeStyle() {
        return { color: '#FFFFFF', 'background-color': '#FFFFFF', 'border-color': "#FFFFFF", 'scale': '50%'}
    },
    tooltip() {return ""},
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})

addNode('minipol', {
    symbol: "🐝",
    size: 'tiny',

    universe: "U2",
    nodeStyle() {
        return { color: "#cb8e00", 'background-color': '#cb8e00'}
    },
    tooltip() {return ""},
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})

addNode('minicp', {
    symbol: "¢", 
    nodeStyle() {
        return {         
            background: "linear-gradient(315deg, #bababa 0%, #efefef 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#333",
        }
    },
    size: 'tiny',
    // tooltip() {return ""},
    layerShown() { return true},
})

addNode('minicha', {
    symbol: "⚡", 
    nodeStyle() {
        return { color: "#f7f774", borderColor: "gray", backgroundColor: "#222222"}
    },
    size: 'tiny',
    // tooltip() {return ""},
    layerShown() { return true},
})


addNode('_inf', {
    symbol: "", 
    universe: "U2",
    nodeStyle() {
        return { color: '#FFCC88', 'background-color': '#FFCC88', 'border-color': "#FFCC88", 'scale': '50%'}
    },
    // tooltip() {return ""},
    layerShown() { return true},
})

addNode('_U2L', {
    symbol: "", 
    nodeStyle() {
        return { color: '#FF8888', 'background-color': '#FF8888', 'border-color': "#FF8888", 'scale': '50%'}
    },
    tooltip() {return ""},
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})
addNode('_U2R', {
    symbol: "", 
    nodeStyle() {
        return { color: '#FF8888', 'background-color': '#FF8888', 'border-color': "#FF8888", 'scale': '50%'}
    },
    tooltip() {return ""},
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})
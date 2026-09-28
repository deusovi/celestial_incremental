addNode('_preOTF', {
    symbol: "",
    nodeStyle() {
        return { color: '#FFFFFF', 'background-color': '#FFFFFF', 'border-color': "#FFFFFF", 'scale': '50%'}
    },
    tooltip() {return ""},
    layerShown() { return player.startedGame == true && (layers.d.layerShown() || layers.ip.layerShown() || layers.rf.layerShown())},
})

addNode('_CrSt', {
    symbol: "",
    nodeStyle() {
        return { color: '#FFFFFF', 'background-color': '#FFFFFF', 'border-color': "#FFFFFF", 'scale': '50%'}
    },
    tooltip() {return ""},
    layerShown() { return player.startedGame == true && (layers.cr.layerShown() || layers.ste.layerShown())},
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
    tooltip() {
        return "<p>"+ format(player.points) + " ¢ " + "</p><p>" + format(player.gain) + " ¢/s</p>"
        // format(player.h.hexPointGain) + "/s"
    },
    canClick: true,
    onClick() {
        player.tab = "or"
    },
})

addNode('minipol', {
    symbol: "🐝",
    size: 'tiny',

    universe: "U2",
    nodeStyle() {
        return { color: "#cb8e00", 'background-color': '#cb8e00'}
    },
    tooltip() {return ""},
    wipeLayer() {
        player.pol.pollinators = new Decimal(0)
        player.pol.pollinatorsPerSecond = new Decimal(0)
    },
    layerShown() { return tmp.pol.layerShown},
})

addNode('minicha', {
    symbol: "⚡", 
    nodeStyle() {
        return { color: "#f7f774", borderColor: "gray", backgroundColor: "#222222"}
    },
    size: 'tiny',
    tooltip() {return ""},
    wipeLayer() {
        player.fa.charge = new Decimal(0)
        player.fa.chargeRate = new Decimal(0)
    },
    layerShown() { return tmp.cha.layerShown},
})


addNode('hp', {
    symbol: '⬡',
    size: 'tiny',
    
    wipeLayer() {
        player.fa.charge = new Decimal(0)
        player.fa.chargeRate = new Decimal(0)
    },
    layerShown() { return tmp.uni.UA.uniShown},
    canClick: true,
    onClick() {
        player.tab = 'hpr'
    },
    tooltip() {return
        format(player.h.hexPoint) + " hex points "
        // format(player.h.hexPointGain) + "/s"
    },
})



addNode('_U2L', {
    symbol: "", 
    nodeStyle() {
        return { color: '#FF8888', 'background-color': '#FF8888', 'border-color': "#FF8888", 'scale': '50%'}
    },
    tooltip() {return ""},
    layerShown() { return player.startedGame == true && (tmp.s.layerShown)},
})
addNode('_U2R', {
    symbol: "", 
    nodeStyle() {
        return { color: '#FF8888', 'background-color': '#FF8888', 'border-color': "#FF8888", 'scale': '50%'}
    },
    tooltip() {return ""},
    layerShown() { return player.startedGame == true && (tmp.s.layerShown)},
})



addNode('U1_center_spacer', {
    symbol: "", 
    layerShown() { return (layers.p.layerShown() && layers.t.layerShown()) ? 'ghost' : false},
})
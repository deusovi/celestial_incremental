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
        ["microtabs", "stuff", { 'border-width': '0px' }],,
        ],
    microtabs: {
        stuff: {
            "Ancient": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: ["raw-html", () => { return "Placeholder" }, {color: "white", fontSize: "12px", fontFamily: "monospace"}]
            },
            "Natural": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: ["raw-html", () => { return "Placeholder" }, {color: "white", fontSize: "12px", fontFamily: "monospace"}]
            },
            "Technological": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: ["raw-html", () => { return "Placeholder" }, {color: "white", fontSize: "12px", fontFamily: "monospace"}]
            },
            "Paradox": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: ["raw-html", () => { return "Placeholder" }, {color: "white", fontSize: "12px", fontFamily: "monospace"}]
            },
            "Radioactive": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: ["raw-html", () => { return "Placeholder" }, {color: "white", fontSize: "12px", fontFamily: "monospace"}]
            },
            "Cosmic": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: ["raw-html", () => { return "Placeholder" }, {color: "white", fontSize: "12px", fontFamily: "monospace"}]
            },
            "Temporal": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: ["raw-html", () => { return "Placeholder" }, {color: "white", fontSize: "12px", fontFamily: "monospace"}]
            },
        }
    },
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))},
})




let pylonStyle = {'scale': '50%','border-radius': '0px',
    'background-size': 'cover','background-repeat': 'no-repeat',
    'cursor': 'pointer'
        }

addNode("pyA", {
    color: '#8B664B',
    symbol: '',
    tooltip: '',
    layerShown() {return 'ghost'},
    nodeStyle: {
        ...pylonStyle,
        'background-image': 'url(resources/fragments/ancientFragment.png)',
    },
    onClick() {
        player.universe = "U3"
        player.tab = "py"
        player.subtabs["py"]["stuff"] = "Ancient"
    }
})

addNode("pyC", {
    color: '#310075',
    symbol: '',
    layerShown() {return 'ghost'},
    nodeStyle: {
        ...pylonStyle,
        'background-image': 'url(resources/fragments/cosmicFragment.png)',
    },
    onClick() {
        player.universe = "U3"
        player.tab = "py"
        player.subtabs["py"]["stuff"] = "Cosmic"
    }
})

addNode("pyN", {
    color: '#006614',
    symbol: '',
    layerShown() {return 'ghost'},
    nodeStyle: {
        ...pylonStyle,
        'background-image': 'url(resources/fragments/naturalFragment.png)',
    },
    onClick() {
        player.universe = "U3"
        player.tab = "py"
        player.subtabs["py"]["stuff"] = "Natural"
    }
})

addNode("pyP", {
    color: '#1300C3',
    symbol: '',
    layerShown() {return 'ghost'},
    nodeStyle: {
        ...pylonStyle,
        'background-image': 'url(resources/fragments/paradoxFragment.png)',
    },
    onClick() {
        player.universe = "U3"
        player.tab = "py"
        player.subtabs["py"]["stuff"] = "Paradox"
    }
})

addNode("pyR", {
    color: '#350000',
    symbol: '',
    layerShown() {return 'ghost'},
    nodeStyle: {
        ...pylonStyle,
        'background-image': 'url(resources/fragments/radioactiveFragment.png)',
    },
    onClick() {
        player.universe = "U3"
        player.tab = "py"
        player.subtabs["py"]["stuff"] = "Radioactive"
    }
})

addNode("pyTc", {
    color: '#350000',
    symbol: '',
    layerShown() {return 'ghost'},
    nodeStyle: {
        ...pylonStyle,
        'background-image': 'url(resources/fragments/technologicalFragment.png)',
    },
    onClick() {
        player.universe = "U3"
        player.tab = "py"
        player.subtabs["py"]["stuff"] = "Technological"
    }
})

addNode("pyTm", {
    color: '#350000',
    symbol: '',
    layerShown() {return 'ghost'},
    nodeStyle: {
        ...pylonStyle,
        'background-image': 'url(resources/fragments/temporalFragment.png)',
    },
    onClick() {
        player.universe = "U3"
        player.tab = "py"
        player.subtabs["py"]["stuff"] = "Temporal"
    }
})
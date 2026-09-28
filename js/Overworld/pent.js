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
        player.r.pentEffect = player.r.pent.add(1).pow(3)
        if (hasUpgrade("cs", 102)) player.r.pentEffect = player.r.pentEffect.mul(Decimal.pow(1.08, player.r.pent))
        player.r.pentEffect = player.r.pentEffect.pow(player.p.crystalEffect)
        if (hasUpgrade("hpw", 1011)) player.r.pentEffect = player.r.pentEffect.pow(1.18)

        let pentDiv = new Decimal(1)
        if (hasAchievement("achievements", 17)) pentDiv = pentDiv.mul(8)
        if (hasAchievement("achievements", 112)) pentDiv = pentDiv.mul(10)
        if (hasAchievement("achievements", 304)) pentDiv = pentDiv.mul(100)
        pentDiv = pentDiv.mul(buyableEffect("g", 19))
        if (hasUpgrade("ep2", 8)) pentDiv = pentDiv.mul(upgradeEffect("ep2", 8))
        
        if (player.r.pent.lt(5)) player.r.pentReq = player.r.pent.add(1).pow(42.5).mul(1e28)
        if (player.r.pent.gte(5)) player.r.pentReq = player.r.pent.add(1).pow(75).mul(1e32).pow(1.1)
        if (player.r.pent.gte(30)) player.r.pentReq = Decimal.pow(1e10, player.r.pent)
        player.r.pentReq = player.r.pentReq.div(pentDiv)


        player.r.pentToGet = new Decimal(1)
        if (hasUpgrade("i", 32) && !inChallenge("ip", 14)) {
            if (player.points.lt(new Decimal(6e57).div(pentDiv))) {
                player.r.pentToGet = player.points.mul(pentDiv).div(1e28).pow(1/42.5).floor().sub(player.r.pent)
            } else if (player.points.gte(new Decimal(6e57).div(pentDiv)) && player.points.lt(new Decimal(4e152).div(pentDiv))) {
                player.r.pentToGet = player.points.mul(pentDiv).pow(10/11).div(1e32).pow(1/75).floor().sub(player.r.pent)
            } else if (player.points.gte(new Decimal(4e152).div(pentDiv))) {
                player.r.pentToGet = Decimal.ln(player.points.mul(pentDiv)).div(Decimal.ln(1e10)).add(1).floor().sub(player.r.pent)
            }
        }
        if (player.points.lt(player.r.pentReq)) {
            player.r.pentToGet = new Decimal(0)
        }

        player.r.pentMilestone9Effect = [player.r.pent.pow(2).add(1), player.r.pent.pow(1.2).add(1)]
        if (player.r.pent.gt(12500)) {player.r.pentMilestone11Effect = Decimal.pow(100, player.r.pent.sub(12500).div(2500))} else {player.r.pentMilestone11Effect = new Decimal(1)}
        if (player.r.pent.gt(17500)) {player.r.pentMilestone13Effect = Decimal.pow(100, player.r.pent.sub(17500).div(2500))} else {player.r.pentMilestone13Effect = new Decimal(1)}
        if (player.r.pent.gt(22500)) {
            player.r.pentMilestone15Effect = Decimal.pow(10, player.r.pent.sub(22500).div(2500))
            if (player.r.pent.gte(150000)) player.r.pentMilestone15Effect = Decimal.pow(10, player.r.pent.div(25000)).mul(1e45)
        } else {player.r.pentMilestone15Effect = new Decimal(1)}
        player.r.pentMilestone18Effect = player.r.timeCubes.add(1).log(1000).div(10).add(1)

        player.r.challengeIVEffect = Decimal.pow(400, player.r.pent)

        if (!inChallenge("ip", 14) && player.points.gte(player.r.pentReq)) {
            if (hasUpgrade("i", 32)) {
                player.r.pent = player.r.pent.add(player.r.pentToGet)
            } else if (hasUpgrade("i", 27)) {
                player.r.pent = player.r.pent.add(1)
            }
        }
    },
    wipeLayer() {
        player.r.pent = new Decimal(0)
        if (!hasMilestone("ip", 15) && !inChallenge("ip", 14) && !hasMilestone("s", 25)) {
            for (let i = 0; i < player.r.milestones.length; i++) {
                if ((!hasMilestone("s", 12) && +player.r.milestones[i] < 20) || +player.r.milestones[i] >= 20) {
                    player.r.milestones.splice(i, 1);
                    i--;
                }
            }
        }
    },
    layerChildren: ['p','t'],
    tabFormat:[
        ["layer-proxy",
            ["r",
                [
                    ["raw-html", () => { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.gain.gt(player.i.doomSoftcapStart) ? "SOFTCAP OF DOOM: Gain past " + format(player.i.doomSoftcapStart) + " is raised by ^" + format(player.i.doomSoftcap, 3) + "." : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["row", [
                                ["raw-html", () => {return "Pent " + formatWhole(player.r.pent)}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", () => {return (hasUpgrade("i", 32) && !inChallenge("ip", 14)) ? "(+" + formatWhole(player.r.pentToGet) + ")" : ""}, () => {
                                    let look = {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}
                                    player.r.pentToGet.gt(0) ? look.color = "white" : look.color = "gray"
                                    return look
                                }],
                            ]],
                            ["raw-html", () => { return "x" + format(player.r.pentEffect) + " Prestige Points" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => { return inChallenge("ip", 14) ? "/" + format(player.r.challengeIVEffect) + " Points" : "" }, {color: "red", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "399px", height: "100px"}],
                        ["clickable", 14],
                    ], {width: "800px", height: "100px", backgroundColor: "#333333", border: "2px solid white", borderBottom: "2px solid white", borderRadius: "15px"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "<h3>Milestones" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["milestone", 11],
                    ["milestone", 12],
                    ["milestone", 13],
                    ["milestone", 14],
                    ["milestone", 15],
                    ["milestone", 16],
                    ["milestone", 17],
                    ["milestone", 18],
                    ["milestone", 19],
                    ["milestone", 20],
                    ["milestone", 21],
                    ["milestone", 22],
                    ["milestone", 23],
                    ["milestone", 24],
                    ["milestone", 25],
                    ["milestone", 26],
                    ["milestone", 27],
                    ["milestone", 28],
                    ["milestone", 29],
               ]
            ]
        ]
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 18)},
    hotkeys: [
        {
            key: "5", 
            description: "Pent Up",
            unlocked() {
                return hasUpgrade("i", 18)
            },
            isAutomated() {
                return hasUpgrade("i", 27)
            },
            onPress() {
                clickClickable('r', 14)
            },
        },
    ]
})

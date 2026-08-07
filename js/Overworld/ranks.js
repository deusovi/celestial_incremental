﻿addLayer("r", {
    name: "Ranks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        //Ranks and Tiers and stuff
        rank: new Decimal(0),
        rankReq: new Decimal(10), //Points
        rankEffect: new Decimal(1),
        ranksToGet: new Decimal(0),
        tier: new Decimal(0),
        tierReq: new Decimal(3), //Ranks
        tierEffect: new Decimal(1),
        tiersToGet: new Decimal(0),
        tetr: new Decimal(0),
        tetrReq: new Decimal(2), //Tiers
        tetrEffect: new Decimal(1),
        tetrEffect2: new Decimal(1),
        tetrsToGet: new Decimal(0),

        //PENT
        pent: new Decimal(0),
        pentReq: new Decimal(1e28),
        pentEffect: new Decimal(1),
        pentToGet: new Decimal(0),
        pentPause: new Decimal(0),

        pentMilestone9Effect: [new Decimal(1), new Decimal(1)],
        pentMilestone11Effect: new Decimal(1),
        pentMilestone13Effect: new Decimal(1),
        pentMilestone15Effect: new Decimal(1),
        pentMilestone18Effect: new Decimal(1),

        challengeIVEffect: new Decimal(1),

        //Time rev
        timeReversed: false,

        timeCubes: new Decimal(0),
        timeCubesEffect: new Decimal(1),
        timeCubesPerSecond: new Decimal(0),
        timeMax: false,

        timeCubeEffects: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
    }},
    automate() {
        if (hasMilestone("s", 16))
        {
            buyBuyable("r", 11)
            buyBuyable("r", 12)
            buyBuyable("r", 13)
            buyBuyable("r", 14)
        }
    },
    nodeStyle() {},
    tooltip: "Ranks",
    color: "#eaf6f7",
    update(delta) {
        let onepersec = new Decimal(1)

        //Rank effects/costs
        let rankDiv = new Decimal(1)
        if (hasAchievement("achievements", 2)) rankDiv = rankDiv.mul(1.2)
        if (hasAchievement("achievements", 4)) rankDiv = rankDiv.mul(1.15)
        if (hasAchievement("achievements", 5)) rankDiv = rankDiv.mul(1.1)
        rankDiv = rankDiv.mul(levelableEffect("pet", 204)[0])


        let ranksGainPreS = player.points.div(10).mul(rankDiv).pow(Decimal.div(20, 29)).floor()
        let ranksGainPostS = player.points.div(10).mul(rankDiv).pow(0.25).floor()
        let ranksGainPostS2 = player.points.div(10).mul(rankDiv).pow(Decimal.div(1, 10)).floor()
        let ranksGainHardcap = player.points.plus(1).mul(rankDiv).log10().div(10).pow(Decimal.div(1, 50)).floor()
        let ranksGainPostS3 = Decimal.pow(10, player.points.div("1e100000").mul(rankDiv).log("1e100")).mul("1e4000")

        player.r.rankEffect = player.r.rank.mul(0.4).add(1).pow(1.055)
        if (hasUpgrade("ad", 13)) player.r.rankEffect = player.r.rankEffect.mul(upgradeEffect("ad", 13))
        player.r.rankEffect = player.r.rankEffect.pow(player.p.crystalEffect)
        if (hasUpgrade("hpw", 1011)) player.r.rankEffect = player.r.rankEffect.pow(1.18)
        player.r.rankEffect = player.r.rankEffect.pow(buyableEffect("sb", 106))
        player.r.rankReq = layers.r.getRankReq(rankDiv)
        if (player.points.gte(player.r.rankReq) && player.r.rank.add(player.r.ranksToGet).lte(20) && hasUpgrade("p", 14)) {
            player.r.ranksToGet = ranksGainPreS.sub(player.r.rank)
        }
        if (player.points.gte(player.r.rankReq) && player.r.rank.add(player.r.ranksToGet).gt(20) && hasUpgrade("p", 14)) {
            player.r.ranksToGet = ranksGainPostS.sub(player.r.rank).add(18)
        }
        if (player.points.gte(player.r.rankReq) && player.r.rank.add(player.r.ranksToGet).gt(100) && hasUpgrade("p", 14)) {
            player.r.ranksToGet = ranksGainPostS2.sub(player.r.rank).add(98)
        }
        if (player.points.gte(player.r.rankReq) && player.r.rank.add(player.r.ranksToGet).gt("1e4000") && hasUpgrade("p", 14) && !hasUpgrade("cs", 101)) {
            player.r.ranksToGet = ranksGainHardcap.sub(player.r.rank).add("1e4000")
        }
        if (player.points.gte(player.r.rankReq) && player.r.rank.add(player.r.ranksToGet).gt("1e4000") && hasUpgrade("p", 14) && hasUpgrade("cs", 101)) {
            player.r.ranksToGet = ranksGainPostS3.sub(player.r.rank)
        }
        if (!hasUpgrade("p", 14)) player.r.ranksToGet = new Decimal(1)
        if (player.points.lt(player.r.rankReq) || player.r.ranksToGet.lt(0)) {
            player.r.ranksToGet = new Decimal(0)
        }
        if (hasUpgrade("p", 17)) {
            player.r.rank = player.r.rank.add(player.r.ranksToGet)
        }

        // Tier Effects/costs
        let tierDiv = new Decimal(1)
        if (hasAchievement("achievements", 4)) tierDiv = tierDiv.mul(1.15)
        if (hasAchievement("achievements", 5)) tierDiv = tierDiv.mul(1.1)
        tierDiv = tierDiv.mul(levelableEffect("pet", 204)[1])

        let tiersGain = player.r.rank.div(3).mul(tierDiv).pow(Decimal.div(10, 11)).floor()

        player.r.tierEffect = player.r.tier.mul(0.55).add(1).pow(1.1)
        player.r.tierEffect = player.r.tierEffect.pow(player.p.crystalEffect)
        player.r.tierEffect = player.r.tierEffect.pow(buyableEffect("sb", 106))
        if (hasUpgrade("hpw", 1011)) player.r.tierEffect = player.r.tierEffect.pow(1.18)
        player.r.tierReq = layers.r.getTierReq(tierDiv)
        if (player.r.rank.gte(player.r.tierReq) && hasUpgrade("p", 14)) {
             player.r.tiersToGet = tiersGain.sub(player.r.tier)
        }
        if (!hasUpgrade("p", 14)) player.r.tiersToGet = new Decimal(1)
        if (player.r.rank.lt(player.r.tierReq)) {
            player.r.tiersToGet = new Decimal(0)
        }
        if (hasUpgrade("p", 18)) {
            player.r.tier = player.r.tier.add(player.r.tiersToGet)
        }

        // Tetr Effects/costs
        let tetrDiv = new Decimal(1)
        if (hasAchievement("achievements", 5)) tetrDiv = tetrDiv.mul(1.1)
        tetrDiv = tetrDiv.mul(levelableEffect("pet", 204)[2])

        let tetrGain = player.r.tier.div(2).mul(tetrDiv).pow(Decimal.div(25, 27)).floor()
        
        player.r.tetrEffect = player.r.tetr.add(1).pow(1.2)
        player.r.tetrEffect = player.r.tetrEffect.pow(player.p.crystalEffect)
        player.r.tetrEffect = player.r.tetrEffect.pow(buyableEffect("sb", 106))
        if (hasUpgrade("hpw", 1011)) player.r.tetrEffect = player.r.tetrEffect.pow(1.18)
        
        player.r.tetrEffect2 = player.r.tetr.pow(0.6).add(1)
        player.r.tetrEffect2 = player.r.tetrEffect2.pow(player.p.crystalEffect)
        player.r.tetrEffect2 = player.r.tetrEffect2.pow(buyableEffect("sb", 106))
        if (hasUpgrade("hpw", 1011)) player.r.tetrEffect2 = player.r.tetrEffect2.pow(1.18)
        player.r.tetrReq = layers.r.getTetrReq(tetrDiv)
        if (player.r.tier.gte(player.r.tetrReq) && hasUpgrade("p", 14)) {
            player.r.tetrsToGet = tetrGain.sub(player.r.tetr)
        }
        if (!hasUpgrade("p", 14)) player.r.tetrsToGet = new Decimal(1)
        if (player.r.tier.lt(player.r.tetrReq)) {
            player.r.tetrsToGet = new Decimal(0)
        }
        if (hasUpgrade("p", 22)) {
            player.r.tetr = player.r.tetr.add(player.r.tetrsToGet)
        }
    },
    
    wipeLayer() {
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        if (hasMilestone("r", 14) && !inChallenge("ip", 14)) {player.r.tetr = new Decimal(10)} else {player.r.tetr = new Decimal(0)}
    },
    layerChildren: [],

    getRankReq(divider = new Decimal(1)) {
        if (player.r.rank.lte(20)) {
            return player.r.rank.add(1).pow(1.45).div(divider).mul(10)
        } else if (player.r.rank.gt(20) && player.r.rank.lte(100)) {
            return (player.r.rank.sub(17)).pow(4).div(divider).mul(10)
        } else if (player.r.rank.gt(100) && player.r.rank.lt("1e4000")) {
            return (player.r.rank.sub(97)).pow(10).div(divider).mul(10)
        } else if (player.r.rank.gte("1e4000") && !hasUpgrade("cs", 101)) {
            return Decimal.pow(10, player.r.rank.pow(50).mul(10)).div(divider).sub(1)
        } else if (player.r.rank.gte("1e4000") && hasUpgrade("cs", 101)) {
            return Decimal.pow("1e100", player.r.rank.div("1e4000").ln(10).div(Decimal.ln(10))).div(divider).mul("1e100000")
        }
    },
    getTierReq(divider = new Decimal(1)) {
        return player.r.tier.add(1).pow(1.1).div(divider).mul(3).ceil()
    },
    getTetrReq(divider = new Decimal(1)) {
        return player.r.tetr.add(1).pow(1.08).div(divider).mul(2).ceil()
    },
    rankReset() {
        player.points = new Decimal(0)
        player.r.ranksToGet = new Decimal(0)
    },
    tierReset() {
        player.points = new Decimal(0)
        player.r.rank = new Decimal(0)
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
    },
    tetrReset() {
        player.points = new Decimal(0)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
    },
    
    clickables: {
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.r.timeMax == false },
            unlocked() { return true },
            onClick() {
                player.r.timeMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.r.timeMax == true  },
            unlocked() { return true },
            onClick() {
                player.r.timeMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        11: {
            title() {
                if (player.r.rank.lte(20)) {
                    return "<h2>Reset celestial points, but rank up.</h2><br><h3>Req: " + format(player.r.rankReq) + " Points</h3>"
                } else if (player.r.rank.lte(100)) {
                    return "<h2>Reset celestial points, but rank up.</h2><br><h3>Req: " + format(player.r.rankReq) + " Points<br><small style='color:darkred'>[SOFTCAPPED]</small></h3>"
                } else if (player.r.rank.lt("1e4000")) {
                    return "<h2>Reset celestial points, but rank up.</h2><br><h3>Req: " + format(player.r.rankReq) + " Points<br><small style='color:darkred'>[SOFTCAPPED<sup>2</sup>]</small></h3>"
                } else if (!hasUpgrade("cs", 101)) {
                    return "<h2>Reset celestial points, but rank up.</h2><br><h3><small style='color:darkred'>[HARDCAPPED]</small></h3>"
                } else {
                    return "<h2>Reset celestial points, but rank up.</h2><br><h3>Req: " + format(player.r.rankReq) + " Points<br><small style='color:darkred'>[SOFTCAPPED<sup>3</sup>]</small></h3>"
                }
            },
            canClick() { return player.points.gte(player.r.rankReq) && !hasUpgrade("p", 17) },
            unlocked() { return true },
            onClick() {
                if (!hasAchievement("achievements", 1)) completeAchievement("achievements", 1)
                player.r.rank = player.r.rank.add(player.r.ranksToGet)
                layers.r.rankReset()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "404px", minHeight: "78.7px", borderRadius: "0px 15px 0px 0px", color: "black", border: "2px solid white", margin: "-2px", fontSize: "8px"}
                this.canClick() ? look.backgroundColor = "#bbbbbb" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        12: {
            title() { return "<h2>Reset celestial points and ranks, but tier up.</h2><br><h3>Req: " + formatWhole(player.r.tierReq) + " Rank</h3>" },
            canClick() { return player.r.rank.gte(player.r.tierReq) && !hasUpgrade("p", 18) },
            unlocked() { return true },
            onClick() {
                if (!hasAchievement("achievements", 2)) completeAchievement("achievements", 2)
                player.r.tier = player.r.tier.add(player.r.tiersToGet)
                layers.r.tierReset()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "404px", minHeight: "78.7px", borderRadius: "0px", color: "black", border: "2px solid white", margin: "-2px", fontSize: "8px"}
                this.canClick() ? look.backgroundColor = "#bbbbbb" : look.backgroundColor = "#bf8f8f"
                hasUpgrade("i", 13) ? look.borderRadius = "0px" : look.borderRadius = "0px 0px 15px 0px"
                return look
            },
        },
        13: {
            title() { return "<h2>Reset celestial points, ranks, and tiers, but tetr up.</h2><br><h3>Req: " + formatWhole(player.r.tetrReq) + " Tier</h3>" },
            canClick() { return player.r.tier.gte(player.r.tetrReq) && !hasUpgrade("p", 22) && !hasMilestone("s", 19)},
            unlocked() { return hasUpgrade("i", 13) },
            onClick() {
                if (!hasAchievement("achievements", 4)) completeAchievement("achievements", 4)
                player.r.tetr = player.r.tetr.add(player.r.tetrsToGet)
                layers.r.tetrReset()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "404px", minHeight: "78.7px", borderRadius: "0px 0px 15px 0px", color: "black", border: "2px solid white", margin: "-2px", fontSize: "8px"}
                this.canClick() ? look.backgroundColor = "#bbbbbb" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        14: {
            title() {
                if (player.r.pent.lt(5)) {
                    return "<h2>Reset all content before grass, but pent.</h2><br><h3>Req: " + formatWhole(player.r.pentReq) + " Points</h3>"
                } else if (player.r.pent.gte(5) && player.r.pent.lt(30)) {
                    return "<h2>Reset all content before grass, but pent.</h2><br><h3>Req: " + formatWhole(player.r.pentReq) + " Points<br><small style='color:darkred'>[SOFTCAPPED]</small></h3>"
                } else if (player.r.pent.gte(30)) {
                    return "<h2>Reset all content before grass, but pent.</h2><br><h3>Req: " + formatWhole(player.r.pentReq) + " Points<br><small style='color:darkred'>[SOFTCAPPED<sup>2</sup>]</small></h3>"
                }
            },
            canClick() { return player.r.pentToGet.gt(0) && (!hasUpgrade("i", 32) || inChallenge("ip", 14)) },
            unlocked() { return true },
            onClick() {
                if (!hasAchievement("achievements", 10)) completeAchievement("achievements", 10)
                if (!hasAchievement("achievements", 24) && player.r.pent.gte(30)) completeAchievement("achievements", 24)
                player.r.pent = player.r.pent.add(player.r.pentToGet)
                doReset('pt')
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "404px", minHeight: "103.7px", borderRadius: "0px 15px 15px 0px", color: "black", border: "2px solid white", margin: "-2px", fontSize: "8px"}
                this.canClick() ? look.backgroundColor = "#bbbbbb" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        15: {
            title() { return "Time Reversal<br>On" },
            canClick() { return true },
            unlocked() { return player.r.timeReversed },
            onClick() {
                player.r.timeReversed = false
            },
            style: { width: '200px', "min-height": '100px', fontSize: '16px', backgroundColor: '#d82cd4', color: 'white', borderRadius: '13px'},
        },
        16: {
            title() { return "Time Reversal<br>Off" },
            canClick() { return true },
            unlocked() { return !player.r.timeReversed },
            onClick() {
                player.r.timeReversed = true
            },
            style: { width: '200px', "min-height": '100px', fontSize: '16px', backgroundColor: '#d82cd4', color: 'white', borderRadius: '13px'},
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        11: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.r.timeCubes},
            pay(amt) { player.r.timeCubes = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).pow(1.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Golden Grass Reverser"
            },
            display() {
                return "which are multiplying golden grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Cubes"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#d82cd4', color: 'white'}
        },
        12: {
            costBase() { return new Decimal(300) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.r.timeCubes},
            pay(amt) { player.r.timeCubes = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).pow(0.8).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Crystal Reverser"
            },
            display() {
                return "which are multiplying crystal gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Cubes"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#d82cd4', color: 'white'}
        },
        13: {
            costBase() { return new Decimal(700) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.r.timeCubes},
            pay(amt) { player.r.timeCubes = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02).pow(0.75).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Negative Infinity Reverser"
            },
            display() {
                return "which are multiplying negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Cubes"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#d82cd4', color: 'white'}
        },
        14: {
            costBase() { return new Decimal(1500) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.r.timeCubes},
            pay(amt) { player.r.timeCubes = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).pow(0.6).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Infinity Dimension Reverser"
            },
            display() {
                return "which are boosting infinity dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Cubes"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#d82cd4', color: 'white'}
        },
    },
    milestones: {
        11: {
            requirementDescription: "<h3>Pent 1",
            effectDescription: "Unlocks a new type of factor and grass upgrades.",
            done() { return player.r.pent.gte(1) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        12: {
            requirementDescription: "<h3>Pent 2",
            effectDescription: "Autobuy tree buyables and unlocks grasshop.",
            done() { return player.r.pent.gte(2) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        13: {
            requirementDescription: "<h3>Pent 3",
            effectDescription: "Autobuys grass buyables, and unlocks tree factor VI.<br>Second grass effect now multiplies celestial points.",
            done() { return player.r.pent.gte(3) },
            style: {width: "600px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        14: {
            requirementDescription: "<h3>Pent 5",
            effectDescription() { return "Unlock mods and new grasshopper studies,<br>and start with 10 Tetr on resets." },
            done() { return player.r.pent.gte(5) },
            style: {width: "600px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        15: {
            requirementDescription: "<h3>Pent 7",
            effectDescription() { return "Autobuy grass and prestige upgrades." },
            done() { return player.r.pent.gte(7) },
            style: {width: "600px", height: "90px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
            toggles: [
                ["p", "auto"], // Each toggle is defined by a layer and the data toggled for that layer
                ["g", "auto"]
            ],
        },
        16: {
            requirementDescription: "<h3>Pent 8",
            effectDescription() { return "Unlock tree factor VIII and autobuy tree and grass factors." },
            done() { return player.r.pent.gte(8) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        17: {
            requirementDescription: "<h3>Pent 11",
            effectDescription() { return "Unlocks a new check back button." },
            done() { return player.r.pent.gte(11) && this.unlocked() },
            unlocked() { return layerShown("cb") },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        18: {
            requirementDescription: "<h3>Pent 15",
            effectDescription() { return "Unlocks new grasshopper studies." },
            done() { return player.r.pent.gte(15) && this.unlocked() },
            unlocked() { return layerShown("cb") },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        19: {
            requirementDescription: "<h3>Pent 30",
            effectDescription() { return "Boosts tree and mod gain based on pent.<br>Currently: x" + format(player.r.pentMilestone9Effect[0]) + " and x" + format(player.r.pentMilestone9Effect[1]) + " respectively" },
            done() { return player.r.pent.gte(30) && this.unlocked() },
            unlocked() { return layerShown("cb") },
            style: {width: "600px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        20: {
            requirementDescription: "<h3>Pent 10,000",
            effectDescription() { return "Good luck on increasing pent, you will need it.<br>Boosts Pre-OTF currencies by x100" },
            done() { return player.r.pent.gte(10000) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && layerShown("cb") },
            style: {width: "600px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        21: {
            requirementDescription: "<h3>Pent 12,500",
            effectDescription() { return "Boosts infinity points based on pent above 12,500.<br>Currently: x" + format(player.r.pentMilestone11Effect) },
            done() { return player.r.pent.gte(12500) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 20) },
            style: {width: "600px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        22: {
            requirementDescription: "<h3>Pent 15,000",
            effectDescription() { return "Unlocks more booster dice effects." },
            done() { return player.r.pent.gte(15000) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 21) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        23: {
            requirementDescription: "<h3>Pent 17,500",
            effectDescription() { return "Boosts negative infinity points based on pent above 17,500.<br>Currently: x" + format(player.r.pentMilestone13Effect) },
            done() { return player.r.pent.gte(17500) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 22) },
            style: {width: "600px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        24: {
            requirementDescription: "<h3>Pent 20,000",
            effectDescription() { return "Unlocks even more booster dice effects." },
            done() { return player.r.pent.gte(20000) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 23) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        25: {
            requirementDescription: "<h3>Pent 22,500",
            effectDescription() {
                let str = "Boosts singularity points based on pent above 22,500.<br>Currently: x" + format(player.r.pentMilestone15Effect)
                if (player.r.pent.gte(150000)) str = str.concat(" <small style='color:red'>[SOFTCAPPED]</small>")
                return str
            },
            done() { return player.r.pent.gte(22500) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 24) },
            style: {width: "600px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        26: {
            requirementDescription: "<h3>Pent 25,000",
            effectDescription() { return "Improve the negative infinity point formula." },
            done() { return player.r.pent.gte(25000) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 25) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        27: {
            requirementDescription: "<h3>Pent 27,500",
            effectDescription() { return "Boosts time cubes effect by ^2." },
            done() { return player.r.pent.gte(27500) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 26) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        28: {
            requirementDescription: "<h3>Pent 30,000",
            effectDescription() { return "Boosts moonstone value based on time cubes.<br>Currently: x" + format(player.r.pentMilestone18Effect) },
            done() { return player.r.pent.gte(30000) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 27) },
            style: {width: "600px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        29: {
            requirementDescription: "<h3>Pent 50,000",
            effectDescription() { return "Produce 0.2% of moonstone value per second." },
            done() { return (player.r.pent.gte(50000) || player.st.buyables[304].gte(1)) && this.unlocked()  },
            unlocked() { return (hasUpgrade("s", 16) && hasMilestone("r", 28)) || player.st.buyables[304].gte(1) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["row", [
                                ["raw-html", () => {return "Rank " + formatWhole(player.r.rank)}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", () => {return hasUpgrade("p", 14) ? "(+" + formatWhole(player.r.ranksToGet) + ")" : ""}, () => {
                                    let look = {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}
                                    player.r.ranksToGet.gt(0) ? look.color = "white" : look.color = "gray"
                                    return look
                                }],
                            ]],
                            ["raw-html", () => { return "x" + format(player.r.rankEffect) + " Points" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "399px", height: "75px"}],
                        ["clickable", 11],
                    ], {width: "800px", height: "75px", backgroundColor: "#333333", border: "2px solid white", borderBottom: "0px", borderRadius: "15px 15px 0px 0px"}],
                    ["style-row", [
                        ["style-column", [
                            ["row", [
                                ["raw-html", () => {return "Tier " + formatWhole(player.r.tier)}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", () => {return hasUpgrade("p", 14) ? "(+" + formatWhole(player.r.tiersToGet) + ")" : ""}, () => {
                                    let look = {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}
                                    player.r.tiersToGet.gt(0) ? look.color = "white" : look.color = "gray"
                                    return look
                                }],
                            ]],
                            ["raw-html", () => { return "x" + format(player.r.tierEffect) + " Points" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "399px", height: "75px"}],
                        ["clickable", 12],
                    ], () => {return hasUpgrade("i", 13) ? {width: "800px", height: "75px", backgroundColor: "#333333", border: "2px solid white", borderBottom: "0px", borderRadius: "0px"} : {width: "800px", height: "75px", backgroundColor: "#333333", border: "2px solid white", borderRadius: "0px 0px 15px 15px"}}],
                    ["style-row", [
                        ["style-column", [
                            ["row", [
                                ["raw-html", () => {return "Tetr " + formatWhole(player.r.tetr)}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", () => {return hasUpgrade("p", 14) ? "(+" + formatWhole(player.r.tetrsToGet) + ")" : ""}, () => {
                                    let look = {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}
                                    player.r.tetrsToGet.gt(0) ? look.color = "white" : look.color = "gray"
                                    return look
                                }],
                            ]],
                            ["raw-html", () => {return "x" + format(player.r.tetrEffect) + " Points" }, () => {
                                let look = {color: "white", fontFamily: "monospace"}
                                if (hasUpgrade("p", 16)) {look.fontSize = "16px"} else {look.fontSize = "20px"}
                                return look
                            }],
                            ["raw-html", () => {return hasUpgrade("p", 16) ? "x" + format(player.r.tetrEffect2) + " Factor Power" : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "399px", height: "75px"}],
                        ["clickable", 13],
                    ], () => {return hasUpgrade("i", 13) ? {width: "800px", height: "75px", backgroundColor: "#333333", border: "2px solid white", borderRadius: "0px 0px 15px 15px"} : {display: "none !important"}}],
                    ["style-column", [
                        ["raw-html", function () { return "Total Mult: x" + format(player.r.rankEffect.mul(player.r.tierEffect.mul(player.r.tetrEffect))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ], {width: "400px", height: "50px", backgroundColor: "#333333", border: "2px solid white", borderTop: "0px", borderRadius: "0px 0px 15px 15px"}],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => {return player.gain.gt(player.i.doomSoftcapStart) ? "SOFTCAP OF DOOM: Gain past " + format(player.i.doomSoftcapStart) + " is raised by ^" + format(player.i.doomSoftcap, 3) + "." : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 11) },

    hotkeys: [
        {
            key: "2", 
            description: "Rank Up",
            unlocked() {
                return hasUpgrade("i", 11)
            },
            isAutomated() {
                return hasUpgrade("p", 17)
            },
            onPress() {
                clickClickable(this.layer, 11)
            },
        },
        {
            key: "3", 
            description: "Tier Up",
            unlocked() {
                return hasUpgrade("i", 11)
            },
            isAutomated() {
                return hasUpgrade("p", 18)
            },
            onPress() {
                clickClickable(this.layer, 12)
            },
        },
        {
            key: "4", 
            description: "Tetr Up",
            unlocked() {
                return hasUpgrade("i", 13)
            },
            isAutomated() {
                return hasUpgrade("p", 22)
            },
            onPress() {
                clickClickable(this.layer, 13)
            },
        },

        
    ],

})
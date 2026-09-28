addLayer("in", {
    name: "Roots", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RO", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        unlockedInfinity: false,
        unlockedBreak: false,
        breakInfinity: false,

        infinityPoints: new Decimal(0),
        infinityPointsToGet: new Decimal(0),

        infinities: new Decimal(0),
        infinitiesToGet: new Decimal(1),

        delay: new Decimal(0),

        pylonBuilt: false,
        pylonEnergyMax: new Decimal(1e308),
        pylonEnergy: new Decimal(0),
        pylonEnergyEffect: new Decimal(1),
        pylonEnergyEffect2: new Decimal(1),
        pylonEnergyEffect3: new Decimal(1),
        pylonEnergyPerSecond: new Decimal(0),
        
        pylonPassiveEffect: new Decimal(1),

        pylonTier: new Decimal(1),
        pylonTierEffect: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(140deg, #1e6 0%, #181 100%)",
            "background-origin": "border-box",
            "border-color": "#333",
        }
    },
    tooltip: "Roots",
    color: "#1b4",
    branches: ["ad", "ip"],
    update(delta) {
        let onepersec = new Decimal(1)

        // USED FOR RESETTING OLD FILES
        if (player.in.delay.gt(0)) {
            player.in.delay = player.in.delay.sub(delta)
            if (player.in.delay.gt(0) && player.in.delay.lte(1)) {
                queueReset('ip')
                layers.ta.negativeInfinityReset()
                for (let i = 0; i < player.r.milestones.length; i++) {
                    if (+player.r.milestones[i] > 20) {
                        player.r.milestones.splice(i, 1);
                        i--;
                    }
                }
                player.in.delay = new Decimal(0)
            }
        }
        if(player.po.breakInfinity) {
            player.ip.crunchMode = "BREAK"
        }

        // UNI 2 UNLOCK VARIABLE
        if (player.in.infinityPoints.gt(0) && !player.in.unlockedInfinity) {
            player.in.unlockedInfinity = true
            player.universe == "U2"
        }

        // REACH INFINITY CODE (1e308 POINTS ROUGHLY)
        if (player.points.gte(Number.MAX_VALUE)) {
            if (player.ip.crunchMode !== "BREAK") {
                if (inChallenge("ip", 11) && !hasChallenge("ip", 11)) {
                    if (!hasAchievement("achievements", 107)) completeAchievement("achievements", 107)
                    player.ip.challenges[11] = 1
                    completeChallenge("ip", 11)
                }
                if (inChallenge("ip", 12) && !hasChallenge("ip", 12)) {
                    if (!hasAchievement("achievements", 109)) completeAchievement("achievements", 109)
                    player.ip.challenges[12] = 1
                    completeChallenge("ip", 12)
                }
                if (inChallenge("ip", 14)) {
                    if (!hasAchievement("achievements", 112)) completeAchievement("achievements", 112)
                }
                if (inChallenge("ip", 15) && !hasChallenge("ip", 15)) {
                    if (!hasAchievement("achievements", 116)) completeAchievement("achievements", 116)
                    player.ip.challenges[15] = 1
                    completeChallenge("ip", 15)
                }
                if (inChallenge("ip", 16) && !hasChallenge("ip", 16)) {
                    if (!hasAchievement("achievements", 120)) completeAchievement("achievements", 120)
                    player.ip.challenges[16] = 1
                    completeChallenge("ip", 16)
                }
                if (player.ip.crunchMode == "BIG CRUNCH") {
                    player.tab = "bigc"
                } else if(player.ip.crunchMode == "INSTANT") {
                    queueReset("ip")
                }
            }
        }

        //----------------------------------------

        // INFINITY POINT BASE
        if (!player.in.breakInfinity) player.in.infinityPointsToGet = new Decimal(1)
        if (player.in.breakInfinity && !hasUpgrade("bi", 111)) player.in.infinityPointsToGet = player.points.div(1e308).plus(1).log(10).div(10).pow(1.1)
        if (player.in.breakInfinity && hasUpgrade("bi", 111)) player.in.infinityPointsToGet = player.points.div(1e308).plus(1).log(10).div(2).pow(1.3)
        if (player.in.breakInfinity && hasUpgrade("bi", 115)) player.in.infinityPointsToGet = player.points.div(1e308).plus(1).log(10).pow(1.5)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(player.cs.scraps.infinity.effect)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(player.depth1.negComboEffect)


        // START OF INFINITY POINT MODIFIERS
        if (hasAchievement("achievements", 211)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(1.5)
        if (hasAchievement("achievements", 301)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(2)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.hbl.boosters[2].effect)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ip", 11))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.d.boosterEffects[11])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.rf.abilityEffects[5])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("cb", 12))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ta", 33))
        if (hasUpgrade("ip", 42)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("ip", 42))
        if (hasUpgrade("bi", 101)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("bi", 101))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.om.diceMasteryPointsEffect)
        if (player.tad.altInfinities.disfigured.milestone.gte(2)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.tad.altInfinities.disfigured.effect2)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("gh", 38))
        if (hasUpgrade("bi", 23)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("bi", 23))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.ca.replicantiEffect)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("id", 24))
        if (hasUpgrade("hpw", 1063)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("hpw", 1063))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ca", 24))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(levelableEffect("pet", 403)[1])
        if (hasMilestone("fa", 11)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.fa.milestoneEffect[0])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.sd.singularityPowerEffect)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("s", 12))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("fu", 17))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.fu.sadnessEffect2)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.co.cores.infinity.effect[0])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(levelableEffect("pu", 101)[2])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.depth1.comboEffect)
        if (hasMilestone("r", 21)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.r.pentMilestone11Effect)
        if (player.pol.pollinatorEffects.water.enabled) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.pol.pollinatorEffects.water.effects[0])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("st", 301))
        if (player.matosLair.milestone[25] > 0) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul("1e600")
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.i.pylonPassiveEffect)

        // POWER MODIFIERS
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(player.co.cores.infinity.effect[1])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(levelableEffect("pet", 404)[0])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(buyableEffect("sb", 103))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(levelableEffect("ir", 4)[1]).floor()
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(player.cof.coreFragmentEffects[3])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(buyableEffect("gwaTemple", 24))

        // ABNORMAL MODIFIERS
        if (player.po.halter.ip.enabled == 1) player.in.infinityPointsToGet = player.in.infinityPointsToGet.div(player.po.halter.ip.halt)
        if (player.po.halter.ip.enabled == 2 && player.in.infinityPointsToGet.gt(player.po.halter.ip.halt)) player.in.infinityPointsToGet = player.po.halter.ip.halt

        // AUTOMATION
        if (hasUpgrade("s", 24)) player.in.infinityPoints = player.in.infinityPoints.add(player.in.infinityPointsToGet.mul(delta))

        //----------------------------------------

        // START OF INFINITIES MODIFIERS
        player.in.infinitiesToGet = new Decimal(1)
        // ADD A BUNCH OF INFINITY BUFF ACHIEVEMENTS (AT LEAST ENOUGH TO REACH x2 BEFORE ALT-INFINITIES)
        if (hasAchievement("achievements", 107)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)
        if (hasAchievement("achievements", 109)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)
        if (hasAchievement("achievements", 111)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)
        if (hasAchievement("achievements", 113)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)
        if (hasAchievement("achievements", 116)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)
        if (hasAchievement("achievements", 120)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)
        if (hasAchievement("achievements", 122)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)
        if (hasAchievement("achievements", 124)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)

        if (player.tad.altInfinities.shattered.milestone.gte(2)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(player.tad.altInfinities.shattered.effect2)
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("om", 11))
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("p", 15))
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(levelableEffect("pet", 1101)[0])
        if (hasMilestone("ip", 28)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(player.points.add(1).log("1.79e308").pow(0.7).max(1))
        if (hasUpgrade("ep2", 14)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(upgradeEffect("ep2", 14))
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(player.co.cores.infinity.effect[2])
        if (hasMilestone("fa", 13)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(player.fa.milestoneEffect[2])
        if (hasUpgrade("tad", 152)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(player.tad.infinitumEffect2)
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(levelableEffect("ir", 2)[1])
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("cof", 23))
        if (hasUpgrade("tad", 152)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(player.in.pylonEnergyEffect2)

        // POWER MODIFIERS
        if (player.tad.altInfinities.infected.milestone.gte(2)) player.in.infinitiesToGet = player.in.infinitiesToGet.pow(player.tad.altInfinities.infected.effect2)
        player.in.infinitiesToGet = player.in.infinitiesToGet.pow(levelableEffect("car", 307)[0])

        // ABNORMAL MODIFIERS
        if (player.po.halter.infinities.enabled == 1) player.in.infinitiesToGet = player.in.infinitiesToGet.div(player.po.halter.infinities.halt)
        if (player.po.halter.infinities.enabled == 2 && player.in.infinitiesToGet.gt(player.po.halter.infinities.halt)) player.in.infinitiesToGet = player.po.halter.infinities.halt

        // PASSIVE GAIN
        if (player.tad.altInfinities.fragmented.milestone.gte(3)) player.in.infinities = player.in.infinities.add(player.in.infinitiesToGet.div(4).mul(delta))


        player.in.pylonEnergyMax = Decimal.pow(1e15, player.in.pylonTier)

        if (player.in.pylonBuilt)
        {
            player.in.pylonEnergyPerSecond = new Decimal(1.1)
            player.in.pylonEnergyPerSecond = player.in.pylonEnergyPerSecond.add(levelableEffect("pu", 214)[1])
            player.in.pylonEnergyPerSecond = player.in.pylonEnergyPerSecond.add(player.cbs.pylonEnergyEffect4)
            player.in.pylonEnergyPerSecond = player.in.pylonEnergyPerSecond.pow(buyableEffect("in", 11))
            player.in.pylonEnergyPerSecond = player.in.pylonEnergyPerSecond.pow(buyableEffect("in", 12))
            player.in.pylonEnergyPerSecond = player.in.pylonEnergyPerSecond.pow(buyableEffect("in", 13))
            player.in.pylonEnergyPerSecond = player.in.pylonEnergyPerSecond.pow(levelableEffect("ir", 9)[1])

            player.in.pylonPassiveEffect = player.in.infinityPoints.add(1).pow(player.in.pylonTierEffect).log(10).div(200).pow(0.75).pow_base(10).add(1)
        } else
        {
            player.in.pylonEnergyPerSecond = new Decimal(0)

            player.in.pylonPassiveEffect = new Decimal(1)
        }

        if (player.in.pylonEnergy.gte(player.in.pylonEnergyMax))
        {
            player.in.pylonEnergy = player.in.pylonEnergyMax
            player.in.pylonEnergyPerSecond = new Decimal(0)
        }
        player.in.pylonEnergy = player.in.pylonEnergy.add(player.in.pylonEnergyPerSecond.mul(delta))

        player.in.pylonEnergyEffect = player.in.pylonEnergy.add(1).pow(player.in.pylonTierEffect).log(10).pow(0.75).pow_base(10).sub(1).div(10).add(1)
        player.in.pylonEnergyEffect2 = player.in.pylonEnergy.add(1).pow(player.in.pylonTierEffect).log(10).pow(0.5).pow_base(10).sub(1).div(10).add(1)
        player.in.pylonEnergyEffect3 = player.in.pylonEnergy.add(1).pow(player.in.pylonTierEffect).log(10).pow(0.4).pow_base(10).sub(1).div(10).pow(2).add(1)
        

        player.in.pylonTierEffect = player.in.pylonTier.sub(1).div(10).add(1)

        //tickspeed
        player.uni["U2"].tickspeed = new Decimal(1)
        player.uni["U2"].tickspeed = player.uni["U2"].tickspeed.mul(player.in.pylonEnergyEffect)
        player.uni["U2"].tickspeed = player.uni["U2"].tickspeed.mul(buyableEffect("gwaTemple", 23))
    },
    wipeLayer() {
        for(let n=22;n<=31;n++) {
            let ind = player.i.upgrades.indexOf(n)
            if(ind > -1) player.i.upgrades.splice(ind,1)
        }
        let ind = player.i.upgrades.indexOf(101)
        if(ind > -1) player.i.upgrades.splice(ind,1)
    },
    layerChildren: ['or','d','rf','pe'],
    afterPrestige() {
        player.points = new Decimal(10)
    },

    clickables: {
        11: {
            title() { return "<h2>Build the Universe 2 Pylon<br>Cost: 4,000 Paradox Core Fragments" },
            canClick() { return player.cof.coreFragments[3].gte(4000) },
            unlocked() { return !player.in.pylonBuilt },
            onClick() {
                player.cof.coreFragments[3] = player.cof.coreFragments[3].sub(4000)

                player.in.pylonBuilt = true
            },
            style: {width: "600px", minHeight: "200px", color: "#1b110eff", backgroundImage: "radial-gradient(circle, #1FF4B0 80%, #20ABC1 95%, #2161D2 110%)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px"},
        },
        12: {
            title() { return "<h2>Tier up the Paradox Pylon" },
            canClick() { return player.in.pylonEnergy.gte(player.in.pylonEnergyMax) },
            unlocked() { return player.in.pylonEnergy.gte(player.in.pylonEnergyMax) },
            onClick() {
                player.in.pylonEnergy = new Decimal(0)

                player.in.pylonTier = player.in.pylonTier.add(1)
            },
            style: {width: "600px", minHeight: "200px", color: "#1b110eff", backgroundImage: "radial-gradient(circle, #1FF4B0 80%, #20ABC1 95%, #2161D2 110%)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px"},
        },
    },
    bars: {},
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cof.coreFragments[3] },
            pay(amt) { player.cof.coreFragments[3] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked() { return player.in.pylonBuilt },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Paradox Pylon Factor I"
            },
            display() {
                return 'which are boosting paradox pylon energy by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#20BBBD7f", backgroundImage: "linear-gradient(120deg, #20A3C2 0%, #20BBBD 100%)" }
        },
        12: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cof.coreFragments[3] },
            pay(amt) { player.cof.coreFragments[3] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked() { return player.in.pylonBuilt },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Paradox Pylon Factor II"
            },
            display() {
                return 'which are boosting paradox pylon energy by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#20BBBD7f", backgroundImage: "linear-gradient(120deg, #20A3C2 0%, #20BBBD 100%)" }
        },
        13: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cof.coreFragments[3] },
            pay(amt) { player.cof.coreFragments[3] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked() { return player.in.pylonBuilt },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Paradox Pylon Factor III"
            },
            display() {
                return 'which are boosting paradox pylon energy by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#20BBBD7f", backgroundImage: "linear-gradient(120deg, #20A3C2 0%, #20BBBD 100%)" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {
        1: {
            title: "Infinity",
            body() { return "Tav, the celestial of limits, has placed a barrier on the superphysical value of celestial points. He introduced the magic number: 1.7976931...e308. A constant value that represented the point at which celestial points condensed into an infinity. When celestial points are condensed into an infinity, it also produces infinity points as a byproduct. This process is called a big crunch. Infinities are an ancient power, tracing back to the time of the original seven." },
            unlocked() { return true },      
        },
        2: {
            title: "Celestial",
            body() { return "It is safe to conclude the following information about a celestial: Celestials are comprised of a physical aspect, and a superphysical aspect. Both aspects contain immense powers that are incomprehensible by normal life forms. Most of us were once a different life form, humans included. It is unknown what causes us to be celestials. It can be very hard for us to travel between universes, only the most skilled of celestials can. Many unknowns are still present. We don't know who rules the celestials. We don't know why celestials exist. We don't know what our true limits are. It is only a matter of time until I figure everything out." },
            unlocked() { return hasUpgrade("bi", 18) },      
        },
        3: {
            title: "Otherworldly Features",
            body() { return "Otherworldly Features were created by a group of celestials called the Novasent. So far, I have only discovered three of them: Dice, Rocket Fuel, and Hex. The superphysical values that are a part of OTFs are artificial. I find dice to be the most intriguing. The entropic value of these OTFs are fascinating. Randomness isn't too common within SPVs, and especially not artificial SPVs. Zar, the celestial that created this OTF, is a very mysterious celestial. I've heard that he is the strongest of all the novasent. Rocket fuel is also very powerful, as it can lead into multiple universes. It was created by Iridite, the Astral Celestial. I've spoken with her once. She is an insanely smart celestial, but she seems to have psychopathic tendencies. Apparently Iridite and Zar don't get along very well... Hex is the last of the main three OTFs.  This SPV is extremely rare, as instead of representing one number, it is a list of numbers. This one was created by Tera, the Celestial of Tiers. Tera is the most mysterious of the three novasent. I don't have any information on this celestial... Apparently there is an entire universe dedicated to Hex. How strange is that??" },
            unlocked() { return hasUpgrade("bi", 26) },      
        },
    },
    microtabs: {
        stuff: {
            "Upgrades": {
                unlocked() { return true },
                content: [
                    ["layer-proxy",
                        ["i",
                            [
                                ["raw-html", () => {return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", () => {return player.gain.gt(player.i.doomSoftcapStart) ? "SOFTCAP OF DOOM: Gain past " + format(player.i.doomSoftcapStart) + " is raised by ^" + format(player.i.doomSoftcap, 3) + "." : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
                                ["blank", "25px"],
                                ["style-row", [
                                    ["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ["upgrade", 25], ["upgrade", 26], ["upgrade", 27], ["upgrade", 28], ["upgrade", 32],
                                    ["upgrade", 29], ["upgrade", 30], ["upgrade", 31], ["upgrade", 101],
                                ], {maxWidth: "800px"}],
                            ]
                        ]
                    ]
                ],
            },
            "Lore": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["infobox", "1"],
                    ["infobox", "2"],
                    ["infobox", "3"],
                ],
            },
            "Pylon": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.i.pylonTier.gte(2) },
                content: [
                    ["blank", "25px"],
                    ["left-row", [
                        ["tooltip-row", [
                            ["raw-html", "<img src='resources/fragments/paradoxFragment.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                            ["raw-html", () => { return formatWhole(player.cof.coreFragments[3])}, {width: "103px", height: "50px", color: "white", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                            ["raw-html", "<div class='bottomTooltip'>Paradox Core Fragments</div>"],
                        ], {width: "158px", height: "50px",}],
                    ], {width: "158px", height: "50px", background: "black", border: "2px solid #1FD3B7", borderRadius: "10px", userSelect: "none"}],
                    ["blank", "25px"],
                    ["clickable", 11],
                    ["raw-html", () => { return player.in.pylonBuilt ? "You have <h3>" + format(player.in.pylonEnergy) + "/" + format(player.in.pylonEnergyMax) +  "</h3> paradox pylon energy (+" + format(player.in.pylonEnergyPerSecond) + "/s)." : "" }, {color: "black", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Boosts U2 tickspeed by x" + format(player.in.pylonEnergyEffect) + "." : ""}, {color: "black", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Boosts infinities by x" + format(player.in.pylonEnergyEffect2) + "." : ""}, {color: "black", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Boosts ancient pylon energy gain by x" + format(player.in.pylonEnergyEffect3) + "." : ""}, {color: "black", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Passive effect: Boosts singularity point gain by x" + format(player.in.pylonPassiveEffect) + " (Based on infinity points)" : ""}, {color: "black", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Your paradox pylon is tier " + formatWhole(player.in.pylonTier) + ", which boosts effective pylon energy and the passive effect by ^" + formatSimple(player.in.pylonTierEffect) + "." : ""}, {color: "black", fontSize: "12px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["row", [["rounded-ex-buyable", 11], ["blank", "3px", {width: "3px"}], ["rounded-ex-buyable", 12], ["blank", "3px", {width: "3px"}], ["rounded-ex-buyable", 13],]], 
                    ["blank", "10px"],
                    ["clickable", 12],
                ],
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.ad.antimatter) + "</h3> antimatter"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.ad.antimatterPerSecond) + "/s)"}, () => {
                look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                player.ad.antimatterPerSecond.gt(0) ? look.color = "white" : look.color = "gray"
                return look
            }],
        ]],
        ["raw-html", () => {return "Boosts points by x" + format(player.ad.antimatterEffect) + " (based on points and antimatter)"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && player.in.unlockedBreak && !player.cp.cantepocalypseActive && !player.sma.inStarmetalChallenge}
})
addLayer("bigc", {
    name: "Big Crunch", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BC", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        spawnedWisps: false,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Big Crunch",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.tab == "bigc" && !player.bigc.spawnedWisps)
        {
            player.bigc.spawnedWisps = true
        } else if (player.tab != "bigc" && player.bigc.spawnedWisps) {
            player.bigc.spawnedWisps = false
            removeWisps();
        }



        if ((player.tab == "bigc") && !player.points.gte(Number.MAX_VALUE)) {
            console.log("what")
            player.tab = "ip"
        }
    },
    branches: ["branch"],
    clickables: {
        11: {
            title() { return "<h2>BIG CRUNCH" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                queueReset("ip")
            },
            style: {width: "300px", minHeight: "120px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px"},
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    tabFormat: [
        ["raw-html", function () { return "<h2>1e308 celestial points- impossible." }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "150px"],
        ["row", [["clickable", 11]]],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true }
})
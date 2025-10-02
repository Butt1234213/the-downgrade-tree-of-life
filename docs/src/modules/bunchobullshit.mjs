export var gameData = {
    lastUpdate: new Decimal(Date.now()),
    leaves: new Decimal(0),
    leavesIsSoftcapped: false,
    leavesPerTick: new Decimal(0),
    tickSpeedMultiplier: new Decimal(0),
    treeAge: new Decimal(0),
    treeAgePerTick: new Decimal(0),
    gameStarted: false,

    leafUpgradeCounter: new Decimal(0),

    baseSeedFactor: new Decimal(1e7),
    seedsSoftcap: new Decimal(1),
    visualSeedFactor: new Decimal(1e7),
    seedChecker: true,
    seedQuotient: new Decimal(0),
    baseSeedQuotient: new Decimal(0),
    canDecompolize: false,
    seeds: new Decimal(0),
    currentSeedsOnDecompolize: new Decimal(0),
    highestSeedsOnDecompolize: new Decimal(0),
    seedsOnDecompolize: new Decimal(0),
    seedsMult: new Decimal(1),
    seedUpgradeCounter: new Decimal(0),
    seedsIsSoftcapped: false,

    leavesStartingPerTick: new Decimal(1),

    fruits: new Decimal(0),
    fruitsOnHarvest: new Decimal(0),
    canHarvest: false,

    refreshRate: 40
}

import * as seedUpgrades from './seedupgrades.mjs'

export var upgradesResetByDecompolization = [
    document.getElementById("L1"),
    document.getElementById("L2"),
    document.getElementById("L3"),
    document.getElementById("L4"),
    document.getElementById("L5"),
    document.getElementById("L6"),
    document.getElementById("L7"),
    document.getElementById("L8"),
    document.getElementById("L9"),
    document.getElementById("L10"),
    document.getElementById("L11"),
    document.getElementById("L12"),
    document.getElementById("L13"),
    document.getElementById("L14"),
    document.getElementById("L15"),
    document.getElementById("L16")
]


document.getElementById("refreshRate").textContent = 40;
document.getElementById("refreshRateCounter").addEventListener("change", updateRefreshRate);

export function updateRefreshRate() {
  let newValue = document.getElementById("refreshRateCounter").value;
  gameData.refreshRate = newValue;
  document.getElementById("refreshRate").textContent = gameData.refreshRate;
}

document.getElementById("cheaterValue").textContent = 1;
document.getElementById("cheaterBox").addEventListener("change", debugMult);

export function debugMult() {
  let newValue = document.getElementById("cheaterBox").value;
  gameData.leavesPerTick = gameData.leavesPerTick.times(newValue);
  document.getElementById("cheaterValue").textContent = newValue;
}


export const leafUpgradeCost = {
    LU2: new Decimal(10),
    LU3: new Decimal(35),
    LU4: new Decimal(150),
    LU5: new Decimal(500),
    LU6: new Decimal(1500),
    LU7: new Decimal(5000),
    LU8: new Decimal(7500),
    LU9: new Decimal(24000),
    LU10: new Decimal(200000),
    LU11: new Decimal(650000),
    LU12: new Decimal(2.25e7),
    LU13: new Decimal(1.75e8),
    LU14: new Decimal(6e10),
    LU15: new Decimal(1e9),
    LU16: new Decimal(1e12)
}

export var leafUpgradeFactor = {
    L4: new Decimal(1),
    L4Bought: false,
    L4AtUpgradeBought: new Decimal(1),
    L4Amt: new Decimal(10),
    L10: new Decimal(1),
    L10Bought: false,
    L10AtUpgradeBought: new Decimal(1),
    L11: new Decimal(1),
    L11Mult: new Decimal(1),
    L11Bought: false,
    L11AtUpgradeBought: new Decimal(1),
    L15Bought: false,
    L16: new Decimal(1),
    L16Bought: false,
    L16AtUpgradeBought: new Decimal(1)
}

export var seedUpgradeCost = {
    SU1: new Decimal(1),
    SU2: new Decimal(3),
    SU3: new Decimal(5),
    SU4: new Decimal(35),
    SU5: new Decimal(175),
    SU6: new Decimal(2500),
    SU7: new Decimal(20000),
    SU8: new Decimal(150000)
}

export var seedUpgradeFactor = {
    S3: new Decimal(0),
    S3Bought: false,
    S3OnUpgradeBought: new Decimal(0),
    S3Total: new Decimal(1e7),
    S4: new Decimal(0),
    S4Bought: false,
    S4OnUpgradeBought: new Decimal(0),
    S4Total: new Decimal(1),
    S8: new Decimal(1),
    S8Bought: false,
    S8OnUpgradeBought: new Decimal(0)
}


export function tab(tab, tabObject) {
    document.getElementById('buttons-lu').style.display = 'none';
    document.getElementById('buttons-su').style.display = 'none';
    document.getElementById('leafTab').style.borderWidth = '2px';
    document.getElementById('seedTab').style.borderWidth = '2px';
    document.getElementById('achievementTab').style.borderWidth = '2px';
    document.getElementById(tab).style.display = 'inline-block';
    document.getElementById(tabObject).style.borderWidth = '5px';
}

export function truncateToDecimalPlaces(num, decimalPlaces) {
    if (num.layer === 1 && num >= 1000000000000000) {
        const numStr = num.toString();
        const decimalIndex = numStr.indexOf('.');
        const exponentIndex = numStr.indexOf('e');
        if (decimalIndex === -1 || decimalPlaces < 0) {
            return num; 
        }

        const numPart1 = numStr.slice(0, exponentIndex);
        const numPart2 = numStr.slice(exponentIndex);

        const endIndex = decimalIndex + 1 + decimalPlaces;
        const parsedNumber = parseFloat(numPart1.substring(0, endIndex));
        const finalNumber = parsedNumber + numPart2;
        return finalNumber;
    }
    else {
        if (num >= 1000000) {
            const expoNum = num.toExponential()
            const numStr = expoNum.toString();
            const decimalIndex = numStr.indexOf('.');
            const exponentIndex = numStr.indexOf('e');
            if (decimalIndex === -1 || decimalPlaces < 0) {
                return num; 
            }

            const numPart1 = expoNum.slice(0, exponentIndex);
            const numPart2 = expoNum.slice(exponentIndex);

            const endIndex = decimalIndex + 1 + decimalPlaces;
            const parsedNumber = parseFloat(numPart1.substring(0, endIndex));
            const finalNumber = parsedNumber + numPart2;
            if (finalNumber.includes("+")) {
                const finalString = finalNumber.replace("+", "");
                return finalString;
            }
            else {
                return finalNumber;
            }
        }
        else {
            const numStr = num.toString();
            const decimalIndex = numStr.indexOf('.');
            if (decimalIndex === -1 || decimalPlaces < 0) {
                return num; 
            }
            const endIndex = decimalIndex + 1 + decimalPlaces;
            const parsedNumber = parseFloat(numStr.substring(0, endIndex));
            return parsedNumber;
        }
    }
  } 
  
export function toExp(num) {
    if (num >= new Decimal(1000000) && num.layer === 0) { 
        num = num.toExponential()
    }
}

export function seedsFormula(leaves, factor) {
    gameData.seedQuotient = leaves.div(gameData.baseSeedFactor);
    gameData.currentSeedsOnDecompolize = gameData.seedQuotient;
    if (gameData.seedChecker == true) {
        if (gameData.currentSeedsOnDecompolize > gameData.highestSeedsOnDecompolize) {
        gameData.highestSeedsOnDecompolize = gameData.currentSeedsOnDecompolize;
        }

        gameData.visualSeedFactor = leaves.plus(gameData.baseSeedFactor);
        gameData.baseSeedFactor = gameData.baseSeedFactor.times(factor);

        gameData.seedChecker = false;
    }
    else {
        if (leaves >= gameData.visualSeedFactor) {
            gameData.seedChecker = true;
        }
    }
    gameData.seedsOnDecompolize = gameData.currentSeedsOnDecompolize;
}

export function leavesSoftCalculation(elementID, capFactor) {
    if (gameData.leaves >= (Decimal.max(seedUpgradeFactor.S3.toNumber(), new Decimal(1e7))).toNumber()) {
        while (gameData.leavesIsSoftcapped == false) {
            gameData.leavesPerTick = gameData.leavesPerTick.pow(capFactor);
            console.log(gameData.leaves + " is softcapped, gameData.leavesPerTick is now " + gameData.leavesPerTick);
            document.getElementById(elementID).innerHTML = "(Softcapped)"
            gameData.leavesIsSoftcapped = true;
        }
    }
}
export function seedsSoftCalculation(elementID, capFactor) {
    if (seedsVisualCalculation("false") >= (new Decimal(1e8)).toNumber()) {
        while (gameData.seedsIsSoftcapped == false) {
            gameData.seedsSoftcap = capFactor;
            console.log(gameData.seeds + " is softcapped, gameData.seedsOnDecompolize is now " + gameData.seedsOnDecompolize);
            document.getElementById(elementID).innerHTML = "(Softcapped)"
            gameData.seedsIsSoftcapped = true;
        }
    }
}
//calculates if you're soft or hard hehe
export function seedsVisualCalculation(ifTrunc) {
    var w = 1;
    if (ifTrunc == "true") {
        const x = gameData.seedsOnDecompolize
        const y = x.times(gameData.seedsMult)
        const z = y.pow(gameData.seedsSoftcap)
        w = z.trunc()
    }
    else {
        const x = gameData.seedsOnDecompolize
        const y = x.times(gameData.seedsMult)
        const z = y.pow(gameData.seedsSoftcap)
        w = z
    }
    return w;
}

export function seedsCalculation(leaves) {
    if (leaves >= new Decimal(1e7).toNumber()) {
        gameData.canDecompolize = true;

        const seedsClass = document.querySelector('.seeds');
        seedsClass.style.color = '#ffffffff';
        seedsClass.style.backgroundColor = '#dc8616ff';
        seedsClass.style.borderColor = '#dc4b16ff';
        seedsClass.style.borderStyle = 'solid';
        seedsClass.style.borderWidth = '5px';
        seedsClass.style.borderRadius = '5px';
        
        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces((gameData.seeds.trunc()), 3) + " Seeds + (" + truncateToDecimalPlaces(seedsVisualCalculation("true"), 3) + ")"
        document.getElementById("seedUpdateCounter").innerHTML = "Due to radioactive decay,<br>your seeds will die out over time"
        document.querySelector('.seeds-reset-button').style.visibility = 'visible';
        if (gameData.seedsIsSoftcapped == false) {
            document.querySelector('.seeds-reset-button').style.top = '80px';
        }
        else {
            document.querySelector('.seeds-reset-button').style.top = '97.5px';
        }
        
        document.querySelector('.fruits').style.left = '505px';
        document.querySelector('.fruits-reset-button').style.left = '545px';
    }
}

export function decompolize() {
    if (gameData.canDecompolize = true) {
        console.log("Decompolizing");
        for (let i = 0; i < upgradesResetByDecompolization.length; i++) {
            upgradesResetByDecompolization[i].disabled = false;
            upgradesResetByDecompolization[i].style.color = '#ffffffff';
        }
        document.getElementById("L1").innerHTML = `L1 <br> Start Generating <br> Leaves`;
        document.getElementById("L2").innerHTML = `L2 <br> Grow I <br> x2 Leaves <br> Cost: 10 Leaves`;
        document.getElementById("L3").innerHTML = `L3 <br> Grow II <br> x3 Leaves <br> Cost: 35 Leaves`;
        document.getElementById("L4").innerHTML = `L4 <br> Develop I <br> Tree Age boosts Leaves <br> Cost: 150 Leaves`;
        document.getElementById("L5").innerHTML = `L5 <br> Grow III <br> x2.5 Leaves <br> Cost: 600 Leaves`;
        document.getElementById("L6").innerHTML = `L6 <br> Grow IV <br> x3 Leaves <br> Cost: 1500 Leaves`;
        document.getElementById("L7").innerHTML = `L7 <br> Grow V <br> xπ Leaves for no reason <br> Cost: 5000 Leaves`;
        document.getElementById("L8").innerHTML = `L8 <br> Grow VI <br> x1.75 Leaves <br> Cost: 7500 Leaves`;
        document.getElementById("L9").innerHTML = `L9 <br> Develop II <br> Increase L4's Boost <br> Cost: 24000 Leaves <br> Effect: x/10 -> x/4`;
        document.getElementById("L10").innerHTML = `L10 <br> Grow Power <br> Every LU Bought <br> Multiplies Leaves by 1.1 <br> Cost: 200000 Leaves`;
        document.getElementById("L11").innerHTML = `L11 <br> Self-Synergy <br> Leaves boost their own production <br> Cost: 650000 Leaves`;
        document.getElementById("L12").innerHTML = `L12 <br> Grow VII <br> x5 Leaves <br> Cost: 2.25e7 Leaves`;
        document.getElementById("L13").innerHTML = `L13 <br> Grow VIII <br> x4 Leaves <br> Cost: 1.75e8 Leaves`;
        document.getElementById("L14").innerHTML = `L14 <br> Grow IX <br> x5 Leaves <br> Cost: 6e10 Leaves`;
        document.getElementById("L15").innerHTML = `L15 <br> Booster <br> L11 boost is doubled <br> Cost: 1e9 Leaves`;
        document.getElementById("L16").innerHTML = `L16 <br> Develop III <br> Tree Age boosts Leaves(again) <br> Cost: 1e12 Leaves`;

        gameData.seeds = gameData.seeds.plus(seedsVisualCalculation("true"));
        seedUpgrades.S3UpgradeUpdater();
        seedUpgrades.S4UpgradeUpdater();
        seedUpgrades.S8UpgradeUpdater();

        fruitsCalculation(gameData.seeds);

        gameData.lastUpdate = new Decimal(Date.now());
        gameData.leaves = new Decimal(0);
        gameData.leavesIsSoftcapped = false;
        gameData.leavesPerTick = new Decimal(0);
        gameData.tickSpeedMultiplier = new Decimal(0);
        gameData.treeAge = new Decimal(0);
        gameData.treeAgePerTick = new Decimal(0);
        gameData.gameStarted = false;

        gameData.leafUpgradeCounter = new Decimal(0);

        gameData.baseSeedFactor = new Decimal(1e7);
        gameData.seedsSoftcap = new Decimal(1);
        gameData.visualSeedFactor = new Decimal(1e7);
        gameData.seedChecker = true;
        gameData.seedQuotient = new Decimal(0);
        gameData.baseSeedQuotient = new Decimal(0);
        gameData.canDecompolize = false;
        gameData.currentSeedsOnDecompolize = new Decimal(0);
        gameData.highestSeedsOnDecompolize = new Decimal(0);
        gameData.seedsIsSoftcapped = false;
        gameData.seedsOnDecompolize = new Decimal(0);
        
        leafUpgradeFactor.L4 = new Decimal(1);
        leafUpgradeFactor.L4Bought = false;
        leafUpgradeFactor.L4AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L4Amt = new Decimal(10);
        leafUpgradeFactor.L10 = new Decimal(1);
        leafUpgradeFactor.L10Bought = false;
        leafUpgradeFactor.L10AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L11 = new Decimal(1);
        leafUpgradeFactor.L11Mult = new Decimal(1);
        leafUpgradeFactor.L11Bought = false;
        leafUpgradeFactor.L11AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L15Bought = false;
        leafUpgradeFactor.L16 = new Decimal(1);
        leafUpgradeFactor.L16Bought = false;
        leafUpgradeFactor.L16AtUpgradeBought = new Decimal(1);

        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces((gameData.seeds.trunc()), 3) + " Seeds"
        document.querySelector('.seeds-reset-button').style.top = '60px';
        document.querySelector('.seeds-reset-button').style.visibility = 'hidden';
        const seedsClass = document.querySelector('.seeds');
        seedsClass.style.color = '#000000ff';
        seedsClass.style.backgroundColor = '#ffffffff';
        seedsClass.style.borderWidth = '0px';
        document.getElementById("seedUpdateCounter").innerHTML = "1e7 Leaves Required"
        
        document.getElementById("pleaseWork").innerHTML = "0 Leaves";
        document.getElementById("leavesPerSecond").innerHTML = "0 Leaves/s";
        document.getElementById("treeAgeCounter").innerHTML = "0 Seconds";
        document.getElementById("treeAgePerSecond").innerHTML = "0 Seconds/s"; 
        document.getElementById("leafSoftcap").innerHTML = ""
        document.getElementById("seedSoftcap").innerHTML = ""
        
        document.querySelector('.fruits').style.left = '435px';
        document.querySelector('.fruits-reset-button').style.left = '475px';
    }
}

export function fruitsCalculation(seeds) {
    if (seeds >= new Decimal(1e7).toNumber()) {
        gameData.canHarvest = true;

        const fruitsClass = document.querySelector('.fruits');
        fruitsClass.style.color = '#ffffffff';
        fruitsClass.style.backgroundColor = '#9a1616ff';
        fruitsClass.style.borderColor = '#de0e0eff';
        fruitsClass.style.borderStyle = 'solid';
        fruitsClass.style.borderWidth = '5px';
        fruitsClass.style.borderRadius = '5px';
        
        document.getElementById("fruitCounter").innerHTML = truncateToDecimalPlaces((gameData.fruits.trunc()), 3) + " Fruits + (" + gameData.fruitsOnHarvest + ")"
        document.getElementById("fruitUpdateCounter").innerHTML = "1e7 Seeds = 1 Fruit"
        document.querySelector('.fruits-reset-button').style.visibility = 'visible'
    }
}
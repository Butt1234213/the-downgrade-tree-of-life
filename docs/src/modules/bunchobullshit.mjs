import { achievements, massAchievementChecker } from './achievements.mjs';
import * as seedUpgrades from './seedupgrades.mjs'

export var gameData = {
    lastUpdate: new Decimal(Date.now()),
    leaves: new Decimal(0),
    leavesIsSoftcapped: false,
    leavesPerTick: new Decimal(0),
    tickSpeedMultiplier: new Decimal(0),
    treeAge: new Decimal(0),
    treeAgePerTick: new Decimal(0),
    gameStarted: false,

    cheaterMult: new Decimal(1),

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

    ticksToUpdateComposter: new Decimal(0),
    compostingSpeed: new Decimal(1),

    leafComposterCost: new Decimal(1),
    leafComposterAmount: new Decimal(0),
    leafComposterTime: new Decimal(500),
    leafComposterCount: new Decimal(0),
    leafComposterEffect: new Decimal(1),
    leafComposterIsActive: false,

    refreshRate: 40
}


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
    document.getElementById("L16"),
    document.getElementById("L17")
]

export var upgradesResetByHarvest = [
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
    document.getElementById("L16"),
    document.getElementById("L17"),
    document.getElementById("S1"),
    document.getElementById("S2"),
    document.getElementById("S3"),
    document.getElementById("S4"),
    document.getElementById("S5"),
    document.getElementById("S6"),
    document.getElementById("S7"),
    document.getElementById("S8")
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
  gameData.cheaterMult = gameData.cheaterMult.times(newValue);
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
    LU16: new Decimal(4.5e12),
    LU17: new Decimal(1e15),
    LU18: new Decimal(7.5e15),
    LU19: new Decimal(5e17),
    LU20: new Decimal(1e23)
}

export var leafUpgradeFactor = {
    L2Bought: false,
    L3Bought: false,
    L4: new Decimal(1),
    L4Bought: false,
    L4AtUpgradeBought: new Decimal(1),
    L4Amt: new Decimal(10),
    L5Bought: false,
    L6Bought: false,
    L7Bought: false,
    L8Bought: false,
    L9Bought: false,
    L9: new Decimal(1),
    L10: new Decimal(1),
    L10Bought: false,
    L10AtUpgradeBought: new Decimal(1),
    L11: new Decimal(1),
    L11Mult: new Decimal(1),
    L11Bought: false,
    L11AtUpgradeBought: new Decimal(1),
    L12Bought: false,
    L13Bought: false,
    L14Bought: false,
    L15Bought: false,
    L15: new Decimal(1),
    L16: new Decimal(1),
    L16Bought: false,
    L16AtUpgradeBought: new Decimal(1),
    L17: new Decimal(1),
    L17Bought: false,
    L17AtUpgradeBought: new Decimal(1)
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
    S1Bought: false,
    S2Bought: false,
    S3Bought: false,
    S3: new Decimal(0),
    S3OnUpgradeBought: new Decimal(0),
    S3Total: new Decimal(1e7),
    S4Bought: false,
    S4: new Decimal(0),
    S4OnUpgradeBought: new Decimal(0),
    S4Total: new Decimal(1),
    S5Bought: false,
    S6Bought: false,
    S7Bought: false,
    S8Bought: false,
    S8: new Decimal(1),
    S8OnUpgradeBought: new Decimal(0)
}

export var fruitUpgradeCost = {
    FU1: new Decimal(1),
    FU2: new Decimal(4),
    FU3: new Decimal(9)
}

export var fruitUpgradeFactor = {
    F1Bought: false,
    F2Bought: false,
    F3Bought: false,
    F3: new Decimal(0)
}

export function truncateToDecimalPlaces(num, decimalPlaces) {
    if (num.layer === 1 && num.greaterThanOrEqualTo(new Decimal(1e15))) {
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
        if (num.greaterThanOrEqualTo(new Decimal(1e6))) {
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

export function calculateLeavesPerTick() {
    let totalMultiplier = new Decimal(1);
    
    totalMultiplier = totalMultiplier.times(gameData.cheaterMult);

    if (leafUpgradeFactor.L2Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2));
        document.getElementById("L2").innerHTML = `L2 (Bought)<br>Grow I<br>x2 Leaves<br>Cost: 10 Leaves`
    }
    if (leafUpgradeFactor.L3Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("L3").innerHTML = `L3 (Bought)<br>Grow II<br>x3 Leaves<br>Cost: 35 Leaves`
    }
    if (leafUpgradeFactor.L4Bought) {
        const x = gameData.treeAge.dividedBy(new Decimal(1000));
        const y = x.dividedBy(new Decimal(10));
        const z = y.pow(new Decimal(0.5));
        leafUpgradeFactor.L4 = z.plus(new Decimal(1));

        document.getElementById("L4").innerHTML = `L4 (Bought)<br>Develop I (Bought)<br>Tree Age boosts Leaves<br>Cost: 150 Leaves<br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L4, 3)}x`;

        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L4);
    }
    if (leafUpgradeFactor.L5Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2.5));
        document.getElementById("L5").innerHTML = `L5 (Bought)<br>Grow III<br>x2.5 Leaves<br>Cost: 500 Leaves`
    }
    if (leafUpgradeFactor.L6Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("L6").innerHTML = `L6 (Bought)<br>Grow IV<br>x3 Leaves<br>Cost: 1500 Leaves`
    }
    if (leafUpgradeFactor.L7Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3.14));
        document.getElementById("L7").innerHTML = `L7 (Bought)<br>Grow V<br>xπ Leaves for no reason<br>Cost: 5000 Leaves`
    }
    if (leafUpgradeFactor.L8Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(1.75));
        document.getElementById("L8").innerHTML = `L8 (Bought)<br>Grow VI<br>x1.75 Leaves<br>Cost: 7500 Leaves`
    }
    if (leafUpgradeFactor.L9Bought) {
        const x = gameData.treeAge.dividedBy(new Decimal(1000));
        const y = x.dividedBy(new Decimal(4));
        const z = y.pow(new Decimal(0.5));
        leafUpgradeFactor.L9 = z.plus(new Decimal(1));

        document.getElementById("L9").innerHTML = `L9 (Bought)<br>Develop II<br>Tree Age boosts Leaves (again)<br>Cost: 24000 Leaves<br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L9, 3)}x`

        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L9);
    }
    if (leafUpgradeFactor.L10Bought) {
        const x = new Decimal(1.1).pow(gameData.leafUpgradeCounter);
        leafUpgradeFactor.L10 = x;

        document.getElementById("L10").innerHTML = `L10 (Bought)<br>Grow Power<br>Every LU Bought<br>Multiplies Leaves by 1.1<br>Cost: 200000 Leaves<br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L10, 3)}x`;

        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L10);
    }
    if (leafUpgradeFactor.L11Bought) {
        const x = Decimal.log10(gameData.leaves.plus(new Decimal(1)));
        const y = x.plus(new Decimal(1));
        const z = y.pow(leafUpgradeFactor.L15)
        leafUpgradeFactor.L11 = z;

        document.getElementById("L11").innerHTML = `L11 (Bought)<br>Self-Synergy<br>Leaves boost their own production<br>Cost: 650000 Leaves<br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L11, 3)}x`;

        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L11);
    }
    if (leafUpgradeFactor.L12Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(5));
        document.getElementById("L12").innerHTML = `L12 (Bought)<br>Grow VII<br>x5 Leaves<br>Cost: 2.25e7 Leaves`
    }
    if (leafUpgradeFactor.L13Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(4));
        document.getElementById("L13").innerHTML = `L13 (Bought)<br>Grow VIII<br>x4 Leaves<br>Cost: 1.75e8 Leaves`
    }
    if (leafUpgradeFactor.L14Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(5));
        document.getElementById("L14").innerHTML = `L14 (Bought)<br>Grow IX<br>x5 Leaves<br>Cost: 6e10 Leaves`
    }
    if (leafUpgradeFactor.L15Bought) {
        const x = new Decimal(2);
        leafUpgradeFactor.L15 = x;

        document.getElementById("L15").innerHTML = `L15 (Bought)<br>Booster<br>L11's effect is squared<br>Cost: 1e9 Leaves`;
    }
    if (leafUpgradeFactor.L16Bought) {
        const x = gameData.treeAge.dividedBy(new Decimal(1000));
        const y = x.dividedBy(new Decimal(25));
        const z = y.pow(new Decimal(1).div(new Decimal(3)));
        const w = z.plus(new Decimal(1))
        leafUpgradeFactor.L16 = w;

        document.getElementById("L16").innerHTML = `L16 (Bought)<br>Develop III<br>Tree Age boosts Leaves (again)<br>Cost: 4.5e12 Leaves<br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L16, 3)}x`

        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L16);
    }
    if (seedUpgradeFactor.S1Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(6));
        document.getElementById("S1").innerHTML = `S1 (Bought)<br>Branch I<br>x6 Leaves<br>Cost: 1 Seed`
    }
    if (seedUpgradeFactor.S2Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("S2").innerHTML = `S2 (Bought)<br>Branch II<br>x3 Leaves<br>Cost: 3 Seeds`
    }
    if (seedUpgradeFactor.S3Bought) {
        const x = gameData.treeAge.dividedBy(new Decimal(1000));
        const y = x.dividedBy(new Decimal(25));
        const z = y.pow(new Decimal(1).div(new Decimal(3)));
        const w = (z.plus(new Decimal(1))).times(new Decimal(2))
        seedUpgradeFactor.S3 = w;

        document.getElementById("S3").innerHTML = `S3 (Bought)<br>Develop IV<br>Tree Age boosts Leaves (again)<br>Cost: 5 Seeds<br>Effect: ${truncateToDecimalPlaces(seedUpgradeFactor.S3, 3)}x`

        totalMultiplier = totalMultiplier.times(seedUpgradeFactor.S3);
    }
    if (seedUpgradeFactor.S4Bought) {
        const x = (gameData.seeds.log(new Decimal(15))).clamp(new Decimal(1), new Decimal(100));
        const y = (x.pow(new Decimal(1).div(new Decimal(3)))).clamp(new Decimal(1), new Decimal(3))
        const z = gameData.seeds.pow(y.div(new Decimal(2)));
        const w = Decimal.log(z, new Decimal(5));
        seedUpgradeFactor.S4 = w.times(new Decimal(2));

        document.getElementById("S4").innerHTML = `S4<br>Nutritious Leaves<br>Seeds multiply Leaves<br>Cost: 35 Seeds<br>Effect: ${truncateToDecimalPlaces(seedUpgradeFactor.S4, 3)}x`

        totalMultiplier = totalMultiplier.times(seedUpgradeFactor.S4);
    }
    if (seedUpgradeFactor.S5Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(10));
        document.getElementById("S5").innerHTML = `S5 (Bought)<br>Branch III<br>x10 Leaves<br>Cost: 175 Seeds`
    }
    if (seedUpgradeFactor.S7Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("S7").innerHTML = `S7 (Bought)<br>Branch IV<br>x3 Leaves<br>Cost: 20000 Seeds`
    }


    if (gameData.leavesIsSoftcapped) {
        totalMultiplier = totalMultiplier.pow(new Decimal(0.75))
        document.getElementById('leafSoftcap').innerHTML = '(Softcapped)';
        achievements.ach22 = true;
    }

  gameData.leavesPerTick = gameData.leavesStartingPerTick.times(totalMultiplier);
}

export function calculateSeedsMult() {
    let totalMultiplier = new Decimal(1);

    if (seedUpgradeFactor.S6Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("S6").innerHTML = `S6 (Bought)<br>Decompolize Method I<br>x3 Seeds<br>Cost: 2500 Seeds`
    }      

    if (seedUpgradeFactor.S8Bought) {
        const x = (gameData.seeds.div(new Decimal(100))).plus(new Decimal(1));
        const y = (Decimal.log10(x)).plus(new Decimal(1))
        seedUpgradeFactor.S8 = y;

        document.getElementById("S8").innerHTML = `S8 (Bought)<br>Seeds-ergy<br>Seeds boost themselves<br>Cost: 150000 Seeds<br>Effect: ${truncateToDecimalPlaces(seedUpgradeFactor.S8, 3)}x`

        totalMultiplier = totalMultiplier.times(seedUpgradeFactor.S8);
    }
        
    if (leafUpgradeFactor.L17Bought) {
        const x = new Decimal(1e13);
        const y = (gameData.leaves.div(x)).plus(new Decimal(1));
        const z = Decimal.log10(y);
        const w = z.plus(new Decimal(1));
        leafUpgradeFactor.L17 = w; 

        document.getElementById("L17").innerHTML = `L17 (Bought)<br>Bigger Leaves<br>Leaves boost Seeds (again)<br>Cost: 1e15 Leaves<br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L17, 3)}x`

        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L17);
    }

    gameData.seedsMult = new Decimal(1).times(totalMultiplier);
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
    gameData.seedsOnDecompolize = Decimal.abs(gameData.currentSeedsOnDecompolize);
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
        const x = gameData.seedsOnDecompolize.abs();
        const y = x.times(gameData.seedsMult.abs());
        const z = y.pow(gameData.seedsSoftcap.abs());
        w = (z.trunc()).plus(new Decimal(1));
    }
    else {
        const x = gameData.seedsOnDecompolize.abs();
        const y = x.times(gameData.seedsMult.abs());
        const z = y.pow(gameData.seedsSoftcap.abs());
        w = z.plus(new Decimal(1));
    }
    return w;
}

export function seedsCalculation(leaves) {
    if (leaves >= new Decimal(1e7).toNumber()) {
        gameData.canDecompolize = true;
        document.querySelector('.seeds').style.visibility = 'visible';

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
        document.getElementById("L9").innerHTML = `L9<br>Develop II<br>Tree Age boosts Leaves (again)<br>Cost: 24000 Leaves`;
        document.getElementById("L10").innerHTML = `L10 <br> Grow Power <br> Every LU Bought <br> Multiplies Leaves by 1.1 <br> Cost: 200000 Leaves`;
        document.getElementById("L11").innerHTML = `L11 <br> Self-Synergy <br> Leaves boost their own production <br> Cost: 650000 Leaves`;
        document.getElementById("L12").innerHTML = `L12 <br> Grow VII <br> x5 Leaves <br> Cost: 2.25e7 Leaves`;
        document.getElementById("L13").innerHTML = `L13 <br> Grow VIII <br> x4 Leaves <br> Cost: 1.75e8 Leaves`;
        document.getElementById("L14").innerHTML = `L14 <br> Grow IX <br> x5 Leaves <br> Cost: 6e10 Leaves`;
        document.getElementById("L15").innerHTML = `L15 <br> Booster <br> L11 boost is squared <br> Cost: 1e9 Leaves`;
        document.getElementById("L16").innerHTML = `L16 <br> Develop III <br> Tree Age boosts Leaves(again) <br> Cost: 4.5e12 Leaves`;
        document.getElementById("L17").innerHTML = `L17 <br> Bigger Leaves<br>Leaves boost Seeds (again)<br>Cost: 1e15 Leaves`;

        gameData.seeds = gameData.seeds.plus(seedsVisualCalculation("true"));
        
        if (achievements.ach14 === false) {
            document.querySelector('.buttons-su-tab-color').style.visibility = 'visible';
            achievements.ach14 = true;
            massAchievementChecker();
        }


        fruitsCalculation(gameData.seeds);

        gameData.lastUpdate = new Decimal(Date.now());
        gameData.leaves = new Decimal(0);
        gameData.leavesIsSoftcapped = false;
        gameData.leavesPerTick = new Decimal(0);
        gameData.tickSpeedMultiplier = new Decimal(0);
        gameData.treeAge = new Decimal(0);
        gameData.treeAgePerTick = new Decimal(0);
        gameData.gameStarted = false;

        gameData.cheaterMult = new Decimal(1);

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

        gameData.ticksToUpdateComposter = new Decimal(0);
        gameData.compostingSpeed = new Decimal(1);

        gameData.leafComposterCost = new Decimal(1);
        gameData.leafComposterAmount = new Decimal(0);
        gameData.leafComposterTime = new Decimal(500);
        gameData.leafComposterCount = new Decimal(0);
        gameData.leafComposterEffect = new Decimal(1);
        gameData.leafComposterIsActive = false;
            
        leafUpgradeFactor.L2Bought = false;
        leafUpgradeFactor.L3Bought = false;
        leafUpgradeFactor.L4 = new Decimal(1);
        leafUpgradeFactor.L4Bought = false;
        leafUpgradeFactor.L4AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L4Amt = new Decimal(10);
        leafUpgradeFactor.L5Bought = false;
        leafUpgradeFactor.L6Bought = false;
        leafUpgradeFactor.L7Bought = false;
        leafUpgradeFactor.L8Bought = false;
        leafUpgradeFactor.L9Bought = false;
        leafUpgradeFactor.L9 = new Decimal(1);
        leafUpgradeFactor.L10 = new Decimal(1);
        leafUpgradeFactor.L10Bought = false;
        leafUpgradeFactor.L10AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L11 = new Decimal(1);
        leafUpgradeFactor.L11Mult = new Decimal(1);
        leafUpgradeFactor.L11Bought = false;
        leafUpgradeFactor.L11AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L12Bought = false;
        leafUpgradeFactor.L13Bought = false;
        leafUpgradeFactor.L14Bought = false;
        leafUpgradeFactor.L15Bought = false;
        leafUpgradeFactor.L15 = new Decimal(1);
        leafUpgradeFactor.L16 = new Decimal(1);
        leafUpgradeFactor.L16Bought = false;
        leafUpgradeFactor.L16AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L17 = new Decimal(1);
        leafUpgradeFactor.L17Bought = false;
        leafUpgradeFactor.L17AtUpgradeBought = new Decimal(1);

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

        document.getElementById('leafCompostingTimer').innerHTML = `Composting takes 0.5 seconds`;
        document.getElementById('leafFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
        document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made 0 Fertilizers,`;
        document.getElementById('leafComposterButton').disabled = false;
        document.getElementById('leafComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Leaf`;
        
        document.querySelector('.fruits').style.left = '435px';
        document.querySelector('.fruits-reset-button').style.left = '475px';
    }
}

export function fruitsFormula(seeds, factor) {
    const x = seeds.div(new Decimal(1e7));
    const y = x.pow(new Decimal(factor));
    gameData.fruitsOnHarvest = y;
}

export function fruitsCalculation(seeds) {
    if (seeds >= new Decimal(1e7).toNumber()) {
        gameData.canHarvest = true;
        document.querySelector('.fruits').style.visibility = 'visible';

        const fruitsClass = document.querySelector('.fruits');
        fruitsClass.style.color = '#ffffffff';
        fruitsClass.style.backgroundColor = '#de0e0eff';
        fruitsClass.style.borderColor = '#9a1616ff';
        fruitsClass.style.borderStyle = 'solid';
        fruitsClass.style.borderWidth = '5px';
        fruitsClass.style.borderRadius = '5px';
        
        document.getElementById("fruitCounter").innerHTML = truncateToDecimalPlaces((gameData.fruits.trunc()), 3) + " Fruits + (" + gameData.fruitsOnHarvest.trunc() + ")"
        document.getElementById("fruitUpdateCounter").innerHTML = "xe7 Seeds = x^0.75 Fruits"
        document.querySelector('.fruits-reset-button').style.visibility = 'visible'
    }
}

export function harvest() {
    if (gameData.canHarvest = true) {
        console.log("Harvesting");
        for (let i = 0; i < upgradesResetByHarvest.length; i++) {
            upgradesResetByHarvest[i].disabled = false;
            upgradesResetByHarvest[i].style.color = '#ffffffff';
        }
        document.getElementById("L1").innerHTML = `L1<br>Start Generating<br>Leaves`;
        document.getElementById("L2").innerHTML = `L2<br>Grow I<br>x2 Leaves<br>Cost: 10 Leaves`;
        document.getElementById("L3").innerHTML = `L3<br>Grow II<br>x3 Leaves<br>Cost: 35 Leaves`;
        document.getElementById("L4").innerHTML = `L4<br>Develop I<br>Tree Age boosts Leaves<br>Cost: 150 Leaves`;
        document.getElementById("L5").innerHTML = `L5<br>Grow III<br>x2.5 Leaves<br>Cost: 600 Leaves`;
        document.getElementById("L6").innerHTML = `L6<br>Grow IV<br>x3 Leaves<br>Cost: 1500 Leaves`;
        document.getElementById("L7").innerHTML = `L7<br>Grow V<br>xπ Leaves for no reason<br>Cost: 5000 Leaves`;
        document.getElementById("L8").innerHTML = `L8<br>Grow VI<br>x1.75 Leaves<br>Cost: 7500 Leaves`;
        document.getElementById("L9").innerHTML = `L9<br>Develop II<br>Tree Age boosts Leaves (again)<br>Cost: 24000 Leaves`;
        document.getElementById("L10").innerHTML = `L10<br>Grow Power<br>Every LU Bought<br>Multiplies Leaves by 1.1<br>Cost: 200000 Leaves`;
        document.getElementById("L11").innerHTML = `L11<br>Self-Synergy<br>Leaves boost their own production<br>Cost: 650000 Leaves`;
        document.getElementById("L12").innerHTML = `L12<br>Grow VII<br>x5 Leaves<br>Cost: 2.25e7 Leaves`;
        document.getElementById("L13").innerHTML = `L13<br>Grow VIII<br>x4 Leaves<br>Cost: 1.75e8 Leaves`;
        document.getElementById("L14").innerHTML = `L14<br>Grow IX<br>x5 Leaves<br>Cost: 6e10 Leaves`;
        document.getElementById("L15").innerHTML = `L15<br>Booster<br>L11 boost is squared<br>Cost: 1e9 Leaves`;
        document.getElementById("L16").innerHTML = `L16<br>Develop III<br>Tree Age boosts Leaves(again)<br>Cost: 4.5e12 Leaves`;
        document.getElementById("L17").innerHTML = `L17<br>Bigger Leaves<br>Leaves boost Seeds (again)<br>Cost: 1e15 Leaves`;

        document.getElementById("S1").innerHTML = `S1<br>Branch I<br>x6 Leaves<br>Cost: 1 Seed`
        document.getElementById("S2").innerHTML = `S2<br>Branch II<br>x3 Leaves<br>Cost: 3 Seeds`
        document.getElementById("S3").innerHTML = `S3<br>Anti-Cap I<br>Leaves Softcap starts later<br>based upon Seeds<br>Cost: 5 Seeds`
        document.getElementById("S4").innerHTML = `S4<br>Nutritious Leaves<br>Seeds multiply Leaves<br>Cost: 35 Seeds`
        document.getElementById("S5").innerHTML = `S5<br>Branch III<br>x10 Leaves<br>Cost: 175 Seeds`
        document.getElementById("S6").innerHTML = `S6<br>Decompolize Method I<br>x3 Seeds<br>Cost: 2500 Seeds`
        document.getElementById("S7").innerHTML = `S7<br>Branch IV<br>x3 Leaves<br>Cost: 20000 Seeds`
        document.getElementById("S8").innerHTML = `S8<br>Seeds-ergy<br>Leaves boost themselves<br>Cost: 150000 Seeds`

        gameData.fruits = gameData.fruits.plus(gameData.fruitsOnHarvest);
        
        if (achievements.ach23 === false) {
            document.querySelector('.buttons-fu-tab-color').style.visibility = 'visible';
            achievements.ach23 = true;
            massAchievementChecker();
        }

        gameData.lastUpdate = new Decimal(Date.now());
        gameData.leaves = new Decimal(0);
        gameData.leavesIsSoftcapped = false;
        gameData.leavesPerTick = new Decimal(0);
        gameData.tickSpeedMultiplier = new Decimal(0);
        gameData.treeAge = new Decimal(0);
        gameData.treeAgePerTick = new Decimal(0);
        gameData.gameStarted = false;

        gameData.cheaterMult = new Decimal(1);

        gameData.leafUpgradeCounter = new Decimal(0);

        gameData.baseSeedFactor = new Decimal(1e7),
        gameData.seedsSoftcap = new Decimal(1),
        gameData.visualSeedFactor = new Decimal(1e7),
        gameData.seedChecker = true,
        gameData.seedQuotient = new Decimal(0),
        gameData.baseSeedQuotient = new Decimal(0),
        gameData.canDecompolize = false,
        gameData.seeds = new Decimal(0),
        gameData.currentSeedsOnDecompolize = new Decimal(0),
        gameData.highestSeedsOnDecompolize = new Decimal(0),
        gameData.seedsOnDecompolize = new Decimal(0),
        gameData.seedsMult = new Decimal(1),
        gameData.seedUpgradeCounter = new Decimal(0),
        gameData.seedsIsSoftcapped = false,

        gameData.ticksToUpdateComposter = new Decimal(0);
        gameData.compostingSpeed = new Decimal(1);

        gameData.leafComposterCost = new Decimal(1);
        gameData.leafComposterAmount = new Decimal(0);
        gameData.leafComposterTime = new Decimal(500);
        gameData.leafComposterCount = new Decimal(0);
        gameData.leafComposterEffect = new Decimal(1);
        gameData.leafComposterIsActive = false;

        gameData.leavesStartingPerTick = new Decimal(1),
             
        leafUpgradeFactor.L2Bought = false;
        leafUpgradeFactor.L3Bought = false;
        leafUpgradeFactor.L4 = new Decimal(1);
        leafUpgradeFactor.L4Bought = false;
        leafUpgradeFactor.L4AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L4Amt = new Decimal(10);
        leafUpgradeFactor.L5Bought = false;
        leafUpgradeFactor.L6Bought = false;
        leafUpgradeFactor.L7Bought = false;
        leafUpgradeFactor.L8Bought = false;
        leafUpgradeFactor.L9Bought = false;
        leafUpgradeFactor.L9 = new Decimal(1);
        leafUpgradeFactor.L10 = new Decimal(1);
        leafUpgradeFactor.L10Bought = false;
        leafUpgradeFactor.L10AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L11 = new Decimal(1);
        leafUpgradeFactor.L11Mult = new Decimal(1);
        leafUpgradeFactor.L11Bought = false;
        leafUpgradeFactor.L11AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L12Bought = false;
        leafUpgradeFactor.L13Bought = false;
        leafUpgradeFactor.L14Bought = false;
        leafUpgradeFactor.L15Bought = false;
        leafUpgradeFactor.L15 = new Decimal(1);
        leafUpgradeFactor.L16 = new Decimal(1);
        leafUpgradeFactor.L16Bought = false;
        leafUpgradeFactor.L16AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L17 = new Decimal(1);
        leafUpgradeFactor.L17Bought = false;
        leafUpgradeFactor.L17AtUpgradeBought = new Decimal(1);

        seedUpgradeFactor.S1Bought = false;
        seedUpgradeFactor.S2Bought = false;
        seedUpgradeFactor.S3Bought = false;
        seedUpgradeFactor.S3 = new Decimal(0);
        seedUpgradeFactor.S3OnUpgradeBought = new Decimal(0);
        seedUpgradeFactor.S3Total = new Decimal(1e7);
        seedUpgradeFactor.S4Bought = false;
        seedUpgradeFactor.S4 = new Decimal(0);
        seedUpgradeFactor.S4OnUpgradeBought = new Decimal(0);
        seedUpgradeFactor.S4Total = new Decimal(1);
        seedUpgradeFactor.S5Bought = false;
        seedUpgradeFactor.S6Bought = false;
        seedUpgradeFactor.S7Bought = false;
        seedUpgradeFactor.S8Bought = false;
        seedUpgradeFactor.S8 = new Decimal(1);
        seedUpgradeFactor.S8OnUpgradeBought = new Decimal(0);

        document.getElementById("fruitCounter").innerHTML = truncateToDecimalPlaces((gameData.fruits.trunc()), 3) + " Fruits"
        document.querySelector('.fruits-reset-button').style.top = '60px';
        document.querySelector('.fruits-reset-button').style.visibility = 'hidden';
        const fruitsClass = document.querySelector('.fruits');
        fruitsClass.style.color = '#000000ff';
        fruitsClass.style.backgroundColor = '#ffffffff';
        fruitsClass.style.borderWidth = '0px';
        document.getElementById("fruitUpdateCounter").innerHTML = "1e7 Seeds Required"

        document.getElementById('leafCompostingTimer').innerHTML = `Composting takes 0.5 seconds`;
        document.getElementById('leafFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
        document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made 0 Fertilizers,`;
        document.getElementById('leafComposterButton').disabled = false;
        document.getElementById('leafComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Leaf`;
        
        document.getElementById("pleaseWork").innerHTML = "0 Leaves";
        document.getElementById("leavesPerSecond").innerHTML = "0 Leaves/s";
        document.getElementById("treeAgeCounter").innerHTML = "0 Seconds";
        document.getElementById("treeAgePerSecond").innerHTML = "0 Seconds/s"; 
        document.getElementById("seedCounter").innerHTML = "0 Seeds"; 
        document.getElementById("leafSoftcap").innerHTML = ""
        document.getElementById("seedSoftcap").innerHTML = ""
        
    }
}


export function gameSavedTextAnimation() {
    let element = document.querySelector('.game-saved-text')
    element.classList.add('show');
    setTimeout(() => {element.classList.remove('show');}, 3000);
}
export function gameLoadedTextAnimation() {
    let element = document.querySelector('.game-loaded-text')
    element.classList.add('show');
    setTimeout(() => {element.classList.remove('show');}, 3000);
}

export function updateGameData(newData) {
    gameData = newData;
}
export function updateLeafUpgradeFactor(newData) {
    leafUpgradeFactor = newData;
}
export function updateSeedUpgradeFactor(newData) {
    seedUpgradeFactor = newData;
}
export function updateFruitUpgradeFactor(newData) {
    fruitUpgradeFactor = newData;
}

console.log(typeof gameData.leaves);
console.log(gameData.leaves instanceof Decimal);
//should return Object, then true

Object.entries(gameData).forEach(([key, value]) => {
    console.log(key);
    console.log(value);
    if (value instanceof Decimal) {
        console.log("this is a decimal");
    }
    if (value.toString() == "true" || value.toString() == "false") {
        console.log("this is a boolean");
    }
    console.log(value.toString());
    console.log("/n");
});
//oh boy time for 800 lines of bullcrap in the console
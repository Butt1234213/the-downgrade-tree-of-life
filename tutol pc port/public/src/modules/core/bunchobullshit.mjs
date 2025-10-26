import { achievements, secretAchievements, massAchievementChecker, massSecretAchievementChecker } from '../achievements.mjs';
import * as leafUpgrades from '../leafupgrades.mjs'
import * as seedUpgrades from '../seedupgrades.mjs'
import * as fruitUpgrades from '../fruitupgrades.mjs'
import * as composter from '../composter.mjs'
import { hasInitialized } from '../savefile.mjs';
import * as upgradeBuilder from './upgradebuilder.mjs'
import * as moss from '../moss.mjs'

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

    leafSoftcapStart: new Decimal(1e15),

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
    fruitsMult: new Decimal(1),
    fruitsOnHarvest: new Decimal(0),
    canHarvest: false,

    fruitUpgradeCounter: new Decimal(0),

    ticksToUpdateComposter: new Decimal(0),
    compostingSpeed: new Decimal(1),

    leafComposterCost: new Decimal(1),
    leafComposterAmount: new Decimal(0),
    leafComposterTime: new Decimal(500),
    leafComposterCount: new Decimal(0),
    leafComposterEffect: new Decimal(1),
    leafComposterIsActive: false,

    seedComposterCost: new Decimal(1),
    seedComposterAmount: new Decimal(0),
    seedComposterTime: new Decimal(500),
    seedComposterCount: new Decimal(0),
    seedComposterEffect: new Decimal(1),
    seedComposterIsActive: false,

    fruitComposterCost: new Decimal(1),
    fruitComposterAmount: new Decimal(0),
    fruitComposterTime: new Decimal(500),
    fruitComposterCount: new Decimal(0),
    fruitComposterEffect: new Decimal(1),
    fruitComposterIsActive: false,

    mossUnlocked: false,
    mossEffect: new Decimal(0),

    potentialEnergy: new Decimal(0),
    entropyOnTransform: new Decimal(0),
    canTransform: false,
    entropy: new Decimal(0),

    refreshRate: 40
}

export var upgradesResetByDecompolization = []

export var upgradesResetByHarvest = []

export var upgradesResetByTransform = []

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

    secretAchievements.secret12 = true;
    massSecretAchievementChecker();
}

export var leafUpgradeCost = {
    LU1: new Decimal(0),
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
    LU20: new Decimal(1e23),
    LU21: new Decimal(1e33),
    LU22: new Decimal(2.5e36),
    LU23: new Decimal(5e39),
    LU24: new Decimal(5e43),
    LU25: new Decimal(5e45),
    LU26: new Decimal(3.5e51),
    LU27: new Decimal(1e57),
    LU28: new Decimal(5e64)
}

export var leafUpgradeFactor = {
    L4: new Decimal(1),
    L4AtUpgradeBought: new Decimal(1),
    L4Amt: new Decimal(10),
    L9: new Decimal(1),
    L10: new Decimal(1),
    L10AtUpgradeBought: new Decimal(1),
    L11: new Decimal(1),
    L11Mult: new Decimal(1),
    L11AtUpgradeBought: new Decimal(1),
    L15: new Decimal(1),
    L16: new Decimal(1),
    L16AtUpgradeBought: new Decimal(1),
    L17: new Decimal(1),
    L17AtUpgradeBought: new Decimal(1),
    L22Leaves: new Decimal(1),
    L22Seeds: new Decimal(1),
    L22Fruits: new Decimal(1),
    L28Leaves: new Decimal(1),
    L28Seeds: new Decimal(1),
    L28Fruits: new Decimal(1),
}

export var seedUpgradeCost = {
    SU1: new Decimal(1),
    SU2: new Decimal(3),
    SU3: new Decimal(5),
    SU4: new Decimal(35),
    SU5: new Decimal(175),
    SU6: new Decimal(2500),
    SU7: new Decimal(20000),
    SU8: new Decimal(150000),
    SU9: new Decimal(4e6),
    SU10: new Decimal(1e9),
    SU11: new Decimal(1e8),
    SU12: new Decimal(5e8),
    SU13: new Decimal(5e9),
    SU14: new Decimal(1e12),
    SU15: new Decimal(1e13),
    SU16: new Decimal(1e14),
    SU17: new Decimal(1e15),
    SU18: new Decimal(1.5e17),
    SU19: new Decimal(1e19),
    SU20: new Decimal(5e28),
    SU21: new Decimal(1e30),
    SU22: new Decimal(5e31),
}

export var seedUpgradeFactor = {
    S3: new Decimal(0),
    S3OnUpgradeBought: new Decimal(0),
    S3Total: new Decimal(1e7),
    S4: new Decimal(0),
    S4OnUpgradeBought: new Decimal(0),
    S4Total: new Decimal(1),
    S8: new Decimal(1),
    S8OnUpgradeBought: new Decimal(0),
    S9: new Decimal(0),
}

export var fruitUpgradeCost = {
    FU1: new Decimal(1),
    FU2: new Decimal(4),
    FU3: new Decimal(9),
    FU4: new Decimal(10),
    FU5: new Decimal(10),
    FU6: new Decimal(15),
    FU7: new Decimal(150),
    FU8: new Decimal(250),
    FU9: new Decimal(400),
    FU10: new Decimal(1000),
    FU11: new Decimal(1500),
    FU12: new Decimal(2000),
    FU13: new Decimal(7000),
    FU14: new Decimal(25000),
    FU15: new Decimal(75000),
    FU16: new Decimal(100000),
    FU17: new Decimal(700000),
    FU18: new Decimal(1e8),
    FU19: new Decimal(2.5e8),
    FU20: new Decimal(1e13),
    FU21: new Decimal(7.5e15),
    FU22: new Decimal(5e16),
}

export var fruitUpgradeFactor = {
    F3: new Decimal(0),
    F5: new Decimal(1),
    F20: new Decimal(1),
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
    if (seedsVisualCalculation("false") >= (new Decimal(1e15)).toNumber()) {
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
            document.querySelector('.seeds-reset-button').style.top = '85px';
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
            console.log(upgradeBuilder.decompolizationResetText);
            upgradesResetByDecompolization[i].innerHTML = upgradeBuilder.decompolizationResetText[i];

            const decompolizationResetFlags = upgradeBuilder.decompolizationResetFlags[i];
            leafUpgradeFactor[decompolizationResetFlags] = false;
        }

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

        gameData.leafComposterCost = new Decimal(1);
        gameData.leafComposterAmount = new Decimal(0);
        gameData.leafComposterTime = new Decimal(500);
        gameData.leafComposterCount = new Decimal(0);
        gameData.leafComposterEffect = new Decimal(1);
        gameData.leafComposterIsActive = false;
            
        leafUpgradeFactor.L4 = new Decimal(1);
        leafUpgradeFactor.L4AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L4Amt = new Decimal(10);
        leafUpgradeFactor.L9 = new Decimal(1);
        leafUpgradeFactor.L10 = new Decimal(1);
        leafUpgradeFactor.L10Bought = false;
        leafUpgradeFactor.L10AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L11 = new Decimal(1);
        leafUpgradeFactor.L11Mult = new Decimal(1);
        leafUpgradeFactor.L11AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L15 = new Decimal(1);
        leafUpgradeFactor.L16 = new Decimal(1);
        leafUpgradeFactor.L16AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L17 = new Decimal(1);
        leafUpgradeFactor.L17AtUpgradeBought = new Decimal(1);
        
        gameData.moss = new Decimal(0);
        moss.mossMilestoneFactor.MM1Achieved = false;
        document.getElementById('mm1Background').style.backgroundImage = '';
        document.getElementById('mm1').innerHTML = '1e100 Moss Required';
        moss.mossMilestoneFactor.MM2Achieved = false;
        document.getElementById('mm2Background').style.backgroundImage = '';
        document.getElementById('mm2').innerHTML = '1e140 Moss Required';
        moss.mossMilestoneFactor.MM3Achieved = false;
        document.getElementById('mm3Background').style.backgroundImage = '';
        document.getElementById('mm3').innerHTML = '1e200 Moss Required';
        moss.mossMilestoneFactor.MM4Achieved = false;
        document.getElementById('mm4Background').style.backgroundImage = '';
        document.getElementById('mm4').innerHTML = '1e250 Moss Required';
        moss.mossMilestoneFactor.MM5Achieved = false;
        document.getElementById('mm5Background').style.backgroundImage = '';
        document.getElementById('mm5').innerHTML = '1.79e308 Moss Required';

        gameData.potentialEnergy = new Decimal(0);
        document.getElementById('entropyUpdateCounter').innerHTML = `5e22 PE Required`

        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces((gameData.seeds.trunc()), 3) + " Seeds"
        document.querySelector('.seeds-reset-button').style.top = '60px';
        document.querySelector('.seeds-reset-button').style.visibility = 'hidden';
        const seedsClass = document.querySelector('.seeds');
        seedsClass.style.color = '#000000ff';
        seedsClass.style.backgroundColor = '#ffffffff';
        seedsClass.style.borderWidth = '0px';
        document.getElementById("seedUpdateCounter").innerHTML = "1e7 Leaves Required"

        updateResourceGUI();
        
        document.getElementById("pleaseWork").innerHTML = "0 Leaves";
        document.getElementById("leavesPerSecond").innerHTML = "0 Leaves/s";
        document.getElementById("treeAgeCounter").innerHTML = "0 Seconds";
        document.getElementById("treeAgePerSecond").innerHTML = "0 Seconds/s"; 
        document.getElementById("leafSoftcap").innerHTML = ""
        document.getElementById("seedSoftcap").innerHTML = ""

        const x = new Decimal(500).div(gameData.compostingSpeed);
        const y = x.div(new Decimal(1000));
        document.getElementById('leafCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
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
    const z = Decimal.log10(x);
    const w = y.times(z);
    gameData.fruitsOnHarvest = w.times(gameData.fruitsMult);
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
        
        document.getElementById("fruitCounter").innerHTML = truncateToDecimalPlaces((gameData.fruits.trunc()), 3) + " Fruits + (" + truncateToDecimalPlaces((gameData.fruitsOnHarvest.trunc()), 3) + ")"
        document.getElementById("fruitUpdateCounter").innerHTML = "xe7 Seeds = &radic;x * log(x) Fruits"
        document.querySelector('.fruits-reset-button').style.visibility = 'visible'
    }
}

export function harvest() {
    if (gameData.canHarvest = true) {
        console.log("Harvesting");
        console.log(upgradesResetByHarvest);
        for (let i = 0; i < upgradesResetByHarvest.length; i++) {
            upgradesResetByHarvest[i].disabled = false;
            upgradesResetByHarvest[i].style.color = '#ffffffff';
            upgradesResetByHarvest[i].innerHTML = upgradeBuilder.harvestResetText[i];

            const harvestResetFlags = upgradeBuilder.harvestResetFlags[i];
            leafUpgradeFactor[harvestResetFlags] = false;
            seedUpgradeFactor[harvestResetFlags] = false;
        }

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

        gameData.canHarvest = false;

        gameData.ticksToUpdateComposter = new Decimal(0);

        gameData.leafComposterCost = new Decimal(1);
        gameData.leafComposterAmount = new Decimal(0);
        gameData.leafComposterTime = new Decimal(500);
        gameData.leafComposterCount = new Decimal(0);
        gameData.leafComposterEffect = new Decimal(1);
        gameData.leafComposterIsActive = false;

        gameData.seedComposterCost = new Decimal(1);
        gameData.seedComposterAmount = new Decimal(0);
        gameData.seedComposterTime = new Decimal(500);
        gameData.seedComposterCount = new Decimal(0);
        gameData.seedComposterEffect = new Decimal(1);
        gameData.seedComposterIsActive = false;

        gameData.leavesStartingPerTick = new Decimal(1),
             
        leafUpgradeFactor.L4 = new Decimal(1);
        leafUpgradeFactor.L4AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L4Amt = new Decimal(10);
        leafUpgradeFactor.L9 = new Decimal(1);
        leafUpgradeFactor.L10 = new Decimal(1);
        leafUpgradeFactor.L10Bought = false;
        leafUpgradeFactor.L10AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L11 = new Decimal(1);
        leafUpgradeFactor.L11Mult = new Decimal(1);
        leafUpgradeFactor.L11AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L15 = new Decimal(1);
        leafUpgradeFactor.L16 = new Decimal(1);
        leafUpgradeFactor.L16AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L17 = new Decimal(1);
        leafUpgradeFactor.L17AtUpgradeBought = new Decimal(1);

        seedUpgradeFactor.S3 = new Decimal(0);
        seedUpgradeFactor.S3OnUpgradeBought = new Decimal(0);
        seedUpgradeFactor.S3Total = new Decimal(1e7);
        seedUpgradeFactor.S4 = new Decimal(0);
        seedUpgradeFactor.S4OnUpgradeBought = new Decimal(0);
        seedUpgradeFactor.S4Total = new Decimal(1);
        seedUpgradeFactor.S8 = new Decimal(1);
        seedUpgradeFactor.S8OnUpgradeBought = new Decimal(0);
        
        gameData.moss = new Decimal(0);
        moss.mossMilestoneFactor.MM1Achieved = false;
        document.getElementById('mm1Background').style.backgroundImage = '';
        document.getElementById('mm1').innerHTML = '1e100 Moss Required';
        moss.mossMilestoneFactor.MM2Achieved = false;
        document.getElementById('mm2Background').style.backgroundImage = '';
        document.getElementById('mm2').innerHTML = '1e140 Moss Required';
        moss.mossMilestoneFactor.MM3Achieved = false;
        document.getElementById('mm3Background').style.backgroundImage = '';
        document.getElementById('mm3').innerHTML = '1e200 Moss Required';
        moss.mossMilestoneFactor.MM4Achieved = false;
        document.getElementById('mm4Background').style.backgroundImage = '';
        document.getElementById('mm4').innerHTML = '1e250 Moss Required';
        moss.mossMilestoneFactor.MM5Achieved = false;
        document.getElementById('mm5Background').style.backgroundImage = '';
        document.getElementById('mm5').innerHTML = '1.79e308 Moss Required';

        gameData.potentialEnergy = new Decimal(0);
        document.getElementById('entropyUpdateCounter').innerHTML = `5e22 PE Required`

        document.querySelector('.fruits').style.left = '435px';

        document.getElementById("fruitCounter").innerHTML = truncateToDecimalPlaces((gameData.fruits.trunc()), 3) + " Fruits"
        document.querySelector('.fruits-reset-button').style.top = '60px';
        document.querySelector('.fruits-reset-button').style.visibility = 'hidden';
        const fruitsClass = document.querySelector('.fruits');
        fruitsClass.style.color = '#000000ff';
        fruitsClass.style.backgroundColor = '#ffffffff';
        fruitsClass.style.borderWidth = '0px';
        document.getElementById("fruitUpdateCounter").innerHTML = "1e7 Seeds Required"

        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces((gameData.seeds.trunc()), 3) + " Seeds"
        document.querySelector('.seeds-reset-button').style.top = '60px';
        document.querySelector('.seeds-reset-button').style.visibility = 'hidden';
        const seedsClass = document.querySelector('.seeds');
        seedsClass.style.color = '#000000ff';
        seedsClass.style.backgroundColor = '#ffffffff';
        seedsClass.style.borderWidth = '0px';
        document.getElementById("seedUpdateCounter").innerHTML = "1e7 Leaves Required"

        updateResourceGUI();

        const x = new Decimal(500).div(gameData.compostingSpeed);
        const y = x.div(new Decimal(1000));
        document.getElementById('leafCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
        document.getElementById('leafFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
        document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made 0 Fertilizers,`;
        document.getElementById('leafComposterButton').disabled = false;
        document.getElementById('leafComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Leaf`;

        document.getElementById('seedCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
        document.getElementById('seedFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
        document.getElementById('seedFertilizerCounter').innerHTML = `The Seed Composter has made 0 Fertilizers,`;
        document.getElementById('seedComposterButton').disabled = false;
        document.getElementById('seedComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Seed`;
        
        document.getElementById("pleaseWork").innerHTML = "0 Leaves";
        document.getElementById("leavesPerSecond").innerHTML = "0 Leaves/s";
        document.getElementById("treeAgeCounter").innerHTML = "0 Seconds";
        document.getElementById("treeAgePerSecond").innerHTML = "0 Seconds/s"; 
        document.getElementById("seedCounter").innerHTML = "0 Seeds"; 
        document.getElementById("leafSoftcap").innerHTML = ""
        document.getElementById("seedSoftcap").innerHTML = ""
        
    }
}

export function potentialEnergyCalculation() {
    const x = gameData.leaves.pow(new Decimal(1).div(new Decimal(12)));
    const y = gameData.seeds.pow(new Decimal(1).div(new Decimal(6)));
    const z = gameData.fruits.pow(new Decimal(1).div(new Decimal(4)));
    gameData.potentialEnergy = x.times(y.times(z));
}

export function entropyCalculation() {
    const x = gameData.potentialEnergy;
    const y = x.pow(new Decimal(1).div(new Decimal(50)));
    gameData.entropyOnTransform = y;
}

export function entropyGUI() {
    if (gameData.potentialEnergy.greaterThanOrEqualTo(new Decimal(5e22))) {
        gameData.canTransform = true;

        const entropyClass = document.querySelector('.entropy');
        entropyClass.style.color = '#ffffffff';
        entropyClass.style.backgroundColor = '#2077ba';
        entropyClass.style.borderColor = '#5ea4da';
        entropyClass.style.borderStyle = 'solid';
        entropyClass.style.borderWidth = '5px';
        entropyClass.style.borderRadius = '5px';
        
        document.getElementById("entropyCounter").innerHTML = truncateToDecimalPlaces((gameData.entropy.trunc()), 3) + " Entropy + (" + truncateToDecimalPlaces((gameData.entropyOnTransform.trunc()), 3) + ")";
        document.querySelector(".entropy-reset-button").style.visibility = "visible";
    }
}

export function transform() {
    if (gameData.canTransform) {
        console.log("Transforming");
        console.log(upgradesResetByTransform);
        for (let i = 0; i < upgradesResetByTransform.length; i++) {
            upgradesResetByTransform[i].disabled = false;
            upgradesResetByTransform[i].style.color = '#ffffffff';
            upgradesResetByTransform[i].innerHTML = upgradeBuilder.transformResetText[i];

            const transformResetFlags = upgradeBuilder.transformResetFlags[i];
            leafUpgradeFactor[transformResetFlags] = false;
            seedUpgradeFactor[transformResetFlags] = false;
            fruitUpgradeFactor[transformResetFlags] = false;
        }

        gameData.entropy = gameData.entropy.plus(gameData.entropyOnTransform);
        
        if (!achievements.ach41) {
            document.querySelector('.buttons-eu-tab-color').style.visibility = 'visible';
            achievements.ach41 = true;
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

        gameData.leafSoftcapStart = new Decimal(1e15);

        gameData.baseSeedFactor = new Decimal(1e7);
        gameData.seedsSoftcap = new Decimal(1);
        gameData.visualSeedFactor = new Decimal(1e7);
        gameData.seedChecker = true;
        gameData.seedQuotient = new Decimal(0);
        gameData.baseSeedQuotient = new Decimal(0);
        gameData.canDecompolize = false;
        gameData.seeds = new Decimal(0);
        gameData.currentSeedsOnDecompolize = new Decimal(0);
        gameData.highestSeedsOnDecompolize = new Decimal(0);
        gameData.seedsOnDecompolize = new Decimal(0);
        gameData.seedsMult = new Decimal(1);
        gameData.seedUpgradeCounter = new Decimal(0);
        gameData.seedsIsSoftcapped = false;

        gameData.leavesStartingPerTick = new Decimal(1);

        gameData.fruits = new Decimal(0);
        gameData.fruitsMult = new Decimal(1);
        gameData.fruitsOnHarvest = new Decimal(0);
        gameData.canHarvest = false;

        gameData.fruitUpgradeCounter = new Decimal(0);

        gameData.ticksToUpdateComposter = new Decimal(0);
        gameData.compostingSpeed = new Decimal(1);

        gameData.leafComposterCost = new Decimal(1);
        gameData.leafComposterAmount = new Decimal(0);
        gameData.leafComposterTime = new Decimal(500);
        gameData.leafComposterCount = new Decimal(0);
        gameData.leafComposterEffect = new Decimal(1);
        gameData.leafComposterIsActive = false;

        gameData.seedComposterCost = new Decimal(1);
        gameData.seedComposterAmount = new Decimal(0);
        gameData.seedComposterTime = new Decimal(500);
        gameData.seedComposterCount = new Decimal(0);
        gameData.seedComposterEffect = new Decimal(1);
        gameData.seedComposterIsActive = false;

        gameData.fruitComposterCost = new Decimal(1);
        gameData.fruitComposterAmount = new Decimal(0);
        gameData.fruitComposterTime = new Decimal(500);
        gameData.fruitComposterCount = new Decimal(0);
        gameData.fruitComposterEffect = new Decimal(1);
        gameData.fruitComposterIsActive = false;

        gameData.mossUnlocked = false;
        gameData.mossEffect = new Decimal(0);

        gameData.potentialEnergy = new Decimal(0);
        gameData.entropyOnTransform = new Decimal(0);
        gameData.canTransform = false;
             
        leafUpgradeFactor.L4 = new Decimal(1);
        leafUpgradeFactor.L4AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L4Amt = new Decimal(10);
        leafUpgradeFactor.L9 = new Decimal(1);
        leafUpgradeFactor.L10 = new Decimal(1);
        leafUpgradeFactor.L10Bought = false;
        leafUpgradeFactor.L10AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L11 = new Decimal(1);
        leafUpgradeFactor.L11Mult = new Decimal(1);
        leafUpgradeFactor.L11AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L15 = new Decimal(1);
        leafUpgradeFactor.L16 = new Decimal(1);
        leafUpgradeFactor.L16AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L17 = new Decimal(1);
        leafUpgradeFactor.L17AtUpgradeBought = new Decimal(1);

        seedUpgradeFactor.S3 = new Decimal(0);
        seedUpgradeFactor.S3OnUpgradeBought = new Decimal(0);
        seedUpgradeFactor.S3Total = new Decimal(1e7);
        seedUpgradeFactor.S4 = new Decimal(0);
        seedUpgradeFactor.S4OnUpgradeBought = new Decimal(0);
        seedUpgradeFactor.S4Total = new Decimal(1);
        seedUpgradeFactor.S8 = new Decimal(1);
        seedUpgradeFactor.S8OnUpgradeBought = new Decimal(0);
        
        fruitUpgradeFactor.F3 = new Decimal(0);
        fruitUpgradeFactor.F5 = new Decimal(1);
        fruitUpgradeFactor.F20 = new Decimal(1);
        
        gameData.moss = new Decimal(0);
        moss.mossMilestoneFactor.MM1Achieved = false;
        document.getElementById('mm1Background').style.backgroundImage = '';
        document.getElementById('mm1').innerHTML = '1e100 Moss Required';
        moss.mossMilestoneFactor.MM2Achieved = false;
        document.getElementById('mm2Background').style.backgroundImage = '';
        document.getElementById('mm2').innerHTML = '1e140 Moss Required';
        moss.mossMilestoneFactor.MM3Achieved = false;
        document.getElementById('mm3Background').style.backgroundImage = '';
        document.getElementById('mm3').innerHTML = '1e200 Moss Required';
        moss.mossMilestoneFactor.MM4Achieved = false;
        document.getElementById('mm4Background').style.backgroundImage = '';
        document.getElementById('mm4').innerHTML = '1e250 Moss Required';
        moss.mossMilestoneFactor.MM5Achieved = false;
        document.getElementById('mm5Background').style.backgroundImage = '';
        document.getElementById('mm5').innerHTML = '1.79e308 Moss Required';

        gameData.potentialEnergy = new Decimal(0);
        document.getElementById('entropyUpdateCounter').innerHTML = `5e22 PE Required`

        document.querySelector('.fruits').style.left = '435px';

        document.getElementById("entropyCounter").innerHTML = truncateToDecimalPlaces((gameData.entropy.trunc()), 3) + " Entropy"
        document.querySelector('.entropy-reset-button').style.top = '62.5px';
        document.querySelector('.entropy-reset-button').style.visibility = 'hidden';
        const entropyClass = document.querySelector('.entropy');
        entropyClass.style.color = '#000000ff';
        entropyClass.style.backgroundColor = '#ffffffff';
        entropyClass.style.borderWidth = '0px';

        document.getElementById("fruitCounter").innerHTML = truncateToDecimalPlaces((gameData.fruits.trunc()), 3) + " Fruits"
        document.querySelector('.fruits-reset-button').style.top = '60px';
        document.querySelector('.fruits-reset-button').style.visibility = 'hidden';
        const fruitsClass = document.querySelector('.fruits');
        fruitsClass.style.color = '#000000ff';
        fruitsClass.style.backgroundColor = '#ffffffff';
        fruitsClass.style.borderWidth = '0px';
        document.getElementById("fruitUpdateCounter").innerHTML = "1e7 Seeds Required"

        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces((gameData.seeds.trunc()), 3) + " Seeds"
        document.querySelector('.seeds-reset-button').style.top = '60px';
        document.querySelector('.seeds-reset-button').style.visibility = 'hidden';
        const seedsClass = document.querySelector('.seeds');
        seedsClass.style.color = '#000000ff';
        seedsClass.style.backgroundColor = '#ffffffff';
        seedsClass.style.borderWidth = '0px';
        document.getElementById("seedUpdateCounter").innerHTML = "1e7 Leaves Required"

        updateResourceGUI();

        const x = new Decimal(500).div(gameData.compostingSpeed);
        const y = x.div(new Decimal(1000));
        document.getElementById('leafCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
        document.getElementById('leafFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
        document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made 0 Fertilizers,`;
        document.getElementById('leafComposterButton').disabled = false;
        document.getElementById('leafComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Leaf`;

        document.getElementById('seedCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
        document.getElementById('seedFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
        document.getElementById('seedFertilizerCounter').innerHTML = `The Seed Composter has made 0 Fertilizers,`;
        document.getElementById('seedComposterButton').disabled = false;

        document.getElementById('fruitComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Fruit`;
        document.getElementById('fruitCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
        document.getElementById('fruitFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
        document.getElementById('fruitFertilizerCounter').innerHTML = `The Fruit Composter has made 0 Fertilizers,`;
        document.getElementById('fruitComposterButton').disabled = false;
        document.getElementById('fruitComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Fruit`;
        
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

export function laggyAnusFunction() {
    if (hasInitialized) {
        try {
            if (typeof leafUpgradeCost !== undefined) {
                leafUpgrades.laggyAssFunction();
                seedUpgrades.laggyAssFunction();
                fruitUpgrades.laggyAssFunction();
                gameData.gameStarted = true;
            }
        } catch (error) {
            console.log("the costs for the upgrades haven't been initialized yet")
            return;
        }
    }
}

export function updateGUIBasedOnAchievements() {
    if (hasInitialized) {
        if (achievements.ach14) {
            document.querySelector('.seeds').style.visibility = 'visible';
            document.querySelector('.buttons-su-tab-color').style.visibility = 'visible';
            document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces((gameData.seeds.trunc()), 3) + " Seeds"
        }
        if (achievements.ach23) {
            document.querySelector('.fruits').style.visibility = 'visible';
            document.querySelector('.buttons-fu-tab-color').style.visibility = 'visible';
            document.getElementById("fruitCounter").innerHTML = truncateToDecimalPlaces((gameData.fruits.trunc()), 3) + " Fruits"
        }
        if (achievements.ach24) {
            document.querySelector('.buttons-composter-tab-color').style.visibility = 'visible';
            document.querySelector('.leaf-composter-background').style.visibility = 'visible';
            document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made ${truncateToDecimalPlaces(gameData.leafComposterCount, 3)} Fertilizers,`;
            document.getElementById('leafFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${truncateToDecimalPlaces(gameData.leafComposterEffect, 3)}x`;
            document.getElementById('leafComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${truncateToDecimalPlaces(gameData.leafComposterCost, 3)} Leaves`;
            const x = gameData.leafComposterTime.div(new Decimal(1000));
            const y = x.div(gameData.compostingSpeed);
            document.getElementById('leafCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
            gameData.leafComposterIsActive = false;
        }
        if (achievements.ach25) {
            document.querySelector('.seed-composter-background').style.visibility = 'visible';
            document.getElementById('seedFertilizerCounter').innerHTML = `The Seed Composter has made ${truncateToDecimalPlaces(gameData.seedComposterCount, 3)} Fertilizers,`;
            document.getElementById('seedFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${truncateToDecimalPlaces(gameData.seedComposterEffect, 3)}x`;
            document.getElementById('seedComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${truncateToDecimalPlaces(gameData.seedComposterCost, 3)} Seeds`;
            const x = gameData.seedComposterTime.div(new Decimal(1000));
            const y = x.div(gameData.compostingSpeed);
            document.getElementById('seedCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
            gameData.seedComposterIsActive = false;
        }
        if (achievements.ach32) {
            document.querySelector('.fruit-composter-background').style.visibility = 'visible';
            document.getElementById('fruitFertilizerCounter').innerHTML = `The Fruit Composter has made ${truncateToDecimalPlaces(gameData.fruitComposterCount, 3)} Fertilizers,`;
            document.getElementById('fruitFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${truncateToDecimalPlaces(gameData.fruitComposterEffect, 3)}x`;
            document.getElementById('fruitComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${truncateToDecimalPlaces(gameData.fruitComposterCost, 3)} Fruits`;
            const x = gameData.fruitComposterTime.div(new Decimal(1000));
            const y = x.div(gameData.compostingSpeed);
            document.getElementById('fruitCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
            gameData.fruitComposterIsActive = false;
        }
        if (achievements.ach43) {
            document.getElementById('mossTab').style.visibility = 'visible';
            gameData.mossUnlocked = true;
        }
        if (achievements.ach41) {
            document.querySelector('.entropy').style.visibility = 'visible';
            document.querySelector('.buttons-eu-tab-color').style.visibility = 'visible';
            document.getElementById("entropyCounter").innerHTML = truncateToDecimalPlaces((gameData.entropy.trunc()), 3) + " Entropy"
        }
    }
}

export function updateResourceGUI() {
    let fruitsOffset = 0;
    let entropyOffset = 0;
    const decompolizeOffset = 70;
    const harvestOffset = 70;

    if (gameData.canDecompolize) {
        fruitsOffset = fruitsOffset + decompolizeOffset;
        entropyOffset = entropyOffset + decompolizeOffset;
    }
    if (gameData.canHarvest) {
        entropyOffset = entropyOffset + harvestOffset;
    }
    document.querySelector('.fruits').style.left = `${fruitsOffset + 435}px`;
    document.querySelector('.fruits-reset-button').style.left = `${fruitsOffset + 475}px`;

    document.querySelector('.entropy').style.left = `${entropyOffset + 600}px`;
}
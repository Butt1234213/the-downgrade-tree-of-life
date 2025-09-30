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
    visualSeedFactor: new Decimal(1e7),
    seedChecker: true,
    seedQuotient: new Decimal(0),
    baseSeedQuotient: new Decimal(0),
    canDecompolize: false,
    seeds: new Decimal(0),
    seedsOnDecompolize: new Decimal(0),
    seedsMult: new Decimal(0),

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
    document.getElementById("L15")
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
    LU15: new Decimal(1e9)
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
    L15Bought: false
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

export function seedsFormula(leaves) {
    gameData.seedQuotient = leaves.div(gameData.baseSeedFactor);
    gameData.seedsOnDecompolize = gameData.seedQuotient;
    if (gameData.seedChecker == true) {
        gameData.visualSeedFactor = leaves.plus(gameData.baseSeedFactor);
        gameData.seedChecker = false;
    }
    else {
        if (leaves >= gameData.visualSeedFactor) {
            gameData.seedChecker = true;
        }
    }
}

export function softCalculation(elementID, cap, capFactor) {
    if (gameData.leaves >= cap.toNumber()) {
        while (gameData.leavesIsSoftcapped == false) {
            gameData.leavesPerTick = gameData.leavesPerTick.pow(capFactor);
            console.log(gameData.leaves + " is softcapped, gameData.leavesPerTick is now " + gameData.leavesPerTick);
            document.getElementById(elementID).innerHTML = "(Softcapped)"
            gameData.leavesIsSoftcapped = true;
        }
    }
}
//calculates if you're soft or hard hehe

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
        
        seedsFormula(leaves);
        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces((gameData.seeds.trunc()), 3) + " Seeds + (" + truncateToDecimalPlaces((gameData.seedsOnDecompolize.trunc()),3) + ")"
        document.getElementById("seedUpdateCounter").innerHTML = "Next Seed at " + truncateToDecimalPlaces((gameData.visualSeedFactor.trunc()), 3)
        document.querySelector('.seeds-reset-button').style.visibility = 'visible';
    }
}

export function decompolize() {
    if (gameData.canDecompolize = true) {
        console.log("Decompolizing");
        for (let i = 0; i < upgradesResetByDecompolization.length; i++) {
            upgradesResetByDecompolization[i].disabled = false;
        }

        gameData.seeds = gameData.seedsOnDecompolize;

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
        gameData.visualSeedFactor = new Decimal(1e7);
        gameData.seedChecker = true;
        gameData.seedQuotient = new Decimal(0);
        gameData.baseSeedQuotient = new Decimal(0);
        gameData.canDecompolize = false;
        gameData.seedsOnDecompolize = new Decimal(0);
        gameData.seedsMult = new Decimal(0);

        
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

        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces((gameData.seeds.trunc()), 3) + " Seeds"
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
    }
}
document.getElementById("decompolize").addEventListener("click", decompolize);
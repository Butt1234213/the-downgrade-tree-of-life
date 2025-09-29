export var gameData = {
    lastUpdate: new Decimal(Date.now()),
    leaves: new Decimal(0),
    leavesPerTick: new Decimal(0),
    tickSpeedMultiplier: new Decimal(0),
    treeAge: new Decimal(0),
    treeAgePerTick: new Decimal(0),
    gameStarted: false,
    leafUpgradeCounter: new Decimal(0),

    refreshRate: 40
}


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
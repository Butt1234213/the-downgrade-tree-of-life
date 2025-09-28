export var gameData = {
    lastUpdate: Date.now(),
    leaves: 0,
    leavesPerTick: 0,
    tickSpeedMultiplier: 0,
    treeAge: 0,
    treeAgePerTick: 0,
    gameStarted: false,
    leafUpgradeCounter: 0,

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
  gameData.leavesPerTick *= newValue;
  document.getElementById("cheaterValue").textContent = newValue;
}

export const leafUpgradeCost = {
    LU2: 10,
    LU3: 35,
    LU4: 150,
    LU5: 500,
    LU6: 1500,
    LU7: 5000,
    LU8: 7500,
    LU9: 24000,
    LU10: 200000,
    LU11: 650000,
    LU12: 2.25e+7,
    LU13: 1.75e+8,
    LU14: 6e+10,
    LU15: 1e+9
}

export var leafUpgradeFactor = {
    L4: 1,
    L4Bought: false,
    L4AtUpgradeBought: 1,
    L4Amt: 10,
    L10: 1,
    L10Bought: false,
    L10AtUpgradeBought: 1,
    L11: 1,
    L11Bought: false,
    L11AtUpgradeBought: 1
}

export function truncateToDecimalPlaces(num, decimalPlaces) {
  const numStr = num.toString();
  const decimalIndex = numStr.indexOf('.');
/* 
  if (numStr.includes("e")) {
    const exponentIndex = numStr.indexOf('e');

    if (decimalIndex === -1 || decimalPlaces < 0) {
        return num; 
        // No decimal part or invalid decimalPlaces
    }
    else {
        const beforeExponent = numStr.slice(0, exponentIndex);
        const afterExponent = numStr.slice(exponentIndex);
        //separating the exponent and the mantissa
        const endIndex = decimalIndex + 1 + decimalPlaces;
        const parsedMantissa = parseFloat(beforeExponent.substring(0, endIndex));
        return parsedMantissa + afterExponent;
    } 
  } */ // add else in this second loop
    if (decimalIndex === -1 || decimalPlaces < 0) {
        return num; 
    }
    const endIndex = decimalIndex + 1 + decimalPlaces;
    const parsedNumber = parseFloat(numStr.substring(0, endIndex));

    if (parsedNumber >= 1000000) {
        function expo(x) {
        return Number.parseFloat(x).toExponential(3);
        }   
        return expo(parsedNumber);
    }
    else {
        return parsedNumber;
    }
}

export function easierCalculations(num) {
    if (num >= 1000000) {
        function expo(x) {
        return Number.parseFloat(x).toExponential(5);
        }   
        return expo(num);
    }
}
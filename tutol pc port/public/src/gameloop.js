//js wants me to package this into all one giant file
//there's gotta be a jollier way to do this

//import { gameData, leafUpgradeCost, leafUpgradeFactor } from './modules/bunchobullshit.mjs'

 var gameData = {
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

const leafUpgradeCost = {
    LU2: 10,
    LU3: 35,
    LU4: 150,
    LU5: 500,
    LU6: 1500,
    LU7: 5000,
    LU8: 7500,
    LU9: 24000,
    LU10: 200000
}

var leafUpgradeFactor = {
    L4: 1,
    L4Bought: false,
    L4AtUpgradeBought: 1,
    L4Amt: 10,
    L10: 1,
    L10Bought: false,
    L10AtUpgradeBought: 1
}


document.getElementById("L1").disabled = false;
document.getElementById("L2").disabled = false;
document.getElementById("L3").disabled = false;
document.getElementById("L4").disabled = false;
document.getElementById("L5").disabled = false;
document.getElementById("L6").disabled = false;
document.getElementById("L7").disabled = false;
document.getElementById("L8").disabled = false;
document.getElementById("L9").disabled = false;
document.getElementById("L10").disabled = false;

document.getElementById("refreshRate").textContent = gameData.refreshRate;

console.log(`on startup, gameData.gameData.leavesPerTick is ${gameData.leavesPerTick}`);
console.log(`on startup, gameData.tickSpeedMultiplier is ${gameData.tickSpeedMultiplier}`);

function gameLoop() {
  if (gameData.gameStarted == true) {
  const now = Date.now();
  const deltaTime = now - gameData.lastUpdate;
  gameData.lastUpdate = now;
  const ticksToProcess = (deltaTime / 1000) * gameData.tickSpeedMultiplier;
  
  L4UpgradeUpdater();
  L10UpgradeUpdater();

  gameData.leaves += gameData.leavesPerTick * ticksToProcess;
  gameData.treeAge += ((deltaTime * gameData.tickSpeedMultiplier) / 2);
  gameData.treeAgePerTick = (gameData.tickSpeedMultiplier / 2);
  
  /* if (leafUpgradeFactor.L4Bought == true) {
    leafUpgradeFactor.L4 = (((gameData.treeAge / leafUpgradeFactor.L4Amt) ** 0.5) + 1);
    var deltaLUFL4 = leafUpgradeFactor.L4 - leafUpgradeFactor.L4AtUpgradeBought;
    gameData.leavesPerTick *= leafUpgradeFactor.L4;
    gameData.leavesPerTick + deltaLUFL4.L4;
    leafUpgradeFactor.L4AtUpgradeBought = leafUpgradeFactor.L4;
    document.getElementById("L4").innerHTML = `L4 <br> Develop I (Bought) <br> Tree Age boosts Leaves <br> Cost: ` + leafUpgradeCost.LU4 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L4, 3)}x`;
  } */

  document.getElementById("pleaseWork").innerHTML = truncateToDecimalPlaces(gameData.leaves, 3) + " Leaves";
  document.getElementById("leavesPerSecond").innerHTML = truncateToDecimalPlaces(gameData.leavesPerTick, 3) + " Leaves/s";
  document.getElementById("treeAgeCounter").innerHTML = truncateToDecimalPlaces((gameData.treeAge / 1000), 3) + " Seconds";
  document.getElementById("treeAgePerSecond").innerHTML = truncateToDecimalPlaces(gameData.treeAgePerTick, 3) + " Seconds/s";

  //setInterval(gameLoop, gameData.refreshRate);
  setTimeout(gameLoop, gameData.refreshRate);

  }
}

function truncateToDecimalPlaces(num, decimalPlaces) {
  const numStr = num.toString();
  const decimalIndex = numStr.indexOf('.');

  if (decimalIndex === -1 || decimalPlaces < 0) {
    return num; // No decimal part or invalid decimalPlaces
  }

  const endIndex = decimalIndex + 1 + decimalPlaces;
  return parseFloat(numStr.substring(0, endIndex));
}

function startGeneration() {
  gameData.gameStarted = true;
  gameData.leavesPerTick = 1;
  gameData.tickSpeedMultiplier = 1;
  gameData.treeAgePerTick = 1;
  gameData.leafUpgradeCounter = 1;
  leafUpgradeFactor.L4Bought = false;

  document.getElementById("L1").disabled = true;
  console.log(`startGeneration function called, value of gameData.gameStarted is ${gameData.gameStarted}`);
  gameLoop();
}

/* function UpgradeBuilder (name, effect, resource, resourceName, resourceBeingUpgraded, cost, upgrade, upgradeType, resourceCounterID, buttonID) {
  if (resource >= cost) {
    resource -= cost;
    if (upgradeType === "+") {resourceBeingUpgraded += upgrade;}
    else {resourceBeingUpgraded * upgrade;}
    document.getElementById(`${resourceCounterID}`).innerHTML = resource + ` ${resourceName}`;
    document.getElementById(`${buttonID}`).innerHTML = `${name} (Bought) <br> ${effect} <br> Cost: ` + cost + ` ${resourceName}`;
    document.getElementById(`${buttonID}`).disabled = true;
    }
  } */

 //didn't work initially, so I'm commenting this out for now, but will re-add later

function L2() {
    if (gameData.leaves >= leafUpgradeCost.LU2) {
    gameData.leaves -= leafUpgradeCost.LU2;
    gameData.leavesPerTick *= 2;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L2").innerHTML = `L2 <br> Grow I (Bought) <br> x2 Leaves <br> Cost: ` + leafUpgradeCost.LU2 + ` Leaves`;
    document.getElementById("L2").disabled = true;
    console.log(`L2 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}
function L3() {
    if (gameData.leaves >= leafUpgradeCost.LU3) {
    gameData.leaves -= leafUpgradeCost.LU3;
    gameData.leavesPerTick *= 3;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L3").innerHTML = `L3 <br> Grow II (Bought) <br> x3 Leaves <br> Cost: ` + leafUpgradeCost.LU3 + ` Leaves`;
    document.getElementById("L3").disabled = true;
    console.log(`L3 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}

function L4UpgradeFormula() {
  leafUpgradeFactor.L4 = ((((gameData.treeAge / 1000) / leafUpgradeFactor.L4Amt) ** 0.5) + 1);
}

function L4() {
    if (gameData.leaves >= leafUpgradeCost.LU4) {
        while (leafUpgradeFactor.L4Bought == false) {
            gameData.leaves -= leafUpgradeCost.LU4;
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L4").disabled = true;
            leafUpgradeFactor.L4Bought = true;
        }
        if (leafUpgradeFactor.L4Bought == true) {
            L4UpgradeFormula();
            gameData.leafUpgradeCounter += 1;
            gameData.leavesPerTick *= leafUpgradeFactor.L4;
            document.getElementById("L4").innerHTML = `L4 <br> Develop I (Bought) <br> Tree Age boosts Leaves <br> Cost: ` + leafUpgradeCost.LU4 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L4, 3)}x`;
            console.log(`L4 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
            leafUpgradeFactor.L4AtUpgradeBought = leafUpgradeFactor.L4;
        }
    }
}
function L4UpgradeUpdater() {
  if (leafUpgradeFactor.L4Bought == true) {
  setTimeout(L4UpgradeFormula, (gameData.refreshRate * 2));
  const deltaL4U = leafUpgradeFactor.L4 - leafUpgradeFactor.L4AtUpgradeBought;
  gameData.leavesPerTick *= (deltaL4U + 1);
  document.getElementById("L4").innerHTML = `L4 <br> Develop I (Bought) <br> Tree Age boosts Leaves <br> Cost: ` + leafUpgradeCost.LU4 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L4, 3)}x`;
  leafUpgradeFactor.L4AtUpgradeBought = leafUpgradeFactor.L4;
  }
}

function updateRefreshRate() {
  let newValue = document.getElementById("refreshRateCounter").value;
  gameData.refreshRate = newValue;
  document.getElementById("refreshRate").textContent = gameData.refreshRate;
}

function L5() {
    if (gameData.leaves >= leafUpgradeCost.LU5) {
    gameData.leaves -= leafUpgradeCost.LU5;
    gameData.leavesPerTick *= 2.5;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L5").innerHTML = `L5 <br> Grow III (Bought) <br> x2.5 Leaves <br> Cost: ` + leafUpgradeCost.LU5 + ` Leaves`;
    document.getElementById("L5").disabled = true;
    console.log(`L5 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}
function L6() {
    if (gameData.leaves >= leafUpgradeCost.LU6) {
    gameData.leaves -= leafUpgradeCost.LU6;
    gameData.leavesPerTick *= 3;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L6").innerHTML = `L6 <br> Grow IV (Bought) <br> x3 Leaves <br> Cost: ` + leafUpgradeCost.LU6 + ` Leaves`;
    document.getElementById("L6").disabled = true;
    console.log(`L6 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}
function L7() {
    if (gameData.leaves >= leafUpgradeCost.LU7) {
    gameData.leaves -= leafUpgradeCost.LU7;
    gameData.leavesPerTick *= 3.14;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L7").innerHTML = `L5 <br> Grow V (Bought) <br> xpi Leaves for no reason <br> Cost: ` + leafUpgradeCost.LU7 + ` Leaves`;
    document.getElementById("L7").disabled = true;
    console.log(`L7 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}
function L8() {
    if (gameData.leaves >= leafUpgradeCost.LU8) {
    gameData.leaves -= leafUpgradeCost.LU8;
    gameData.leavesPerTick *= 1.75;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L8").innerHTML = `L8 <br> Grow VI (Bought) <br> x1.75 Leaves <br> Cost: ` + leafUpgradeCost.LU8 + ` Leaves`;
    document.getElementById("L8").disabled = true;
    console.log(`L8 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}
function L9() {
    if (gameData.leaves >= leafUpgradeCost.LU9) {
    gameData.leaves -= leafUpgradeCost.LU9;
    leafUpgradeFactor.L4Amt = 4;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L9").innerHTML = `L9 <br> Develop II (Bought) <br> Increase L4's Boost <br> Cost: ` + leafUpgradeCost.LU9 + ` Leaves <br> Effect: 2.5x`;
    document.getElementById("L9").disabled = true;
    console.log(`L9 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}

function L10UpgradeFormula() {
  leafUpgradeFactor.L10 = 1.1 ** gameData.leafUpgradeCounter;
}
function L10() {
    if (gameData.leaves >= leafUpgradeCost.LU10) {
        while (leafUpgradeFactor.L10Bought == false) {
            gameData.leaves -= leafUpgradeCost.LU10;
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L10").disabled = true;
            leafUpgradeFactor.L10Bought = true;
        }
        if (leafUpgradeFactor.L10Bought == true) {
            gameData.leafUpgradeCounter += 1;
            L10UpgradeFormula();
            gameData.leavesPerTick *= leafUpgradeFactor.L10;
            document.getElementById("L10").innerHTML = `L10 <br> Grow Power (Bought) <br> Every Leaf Upgrade Bought Multiplies Leaves by 1.1 <br> Cost: ` + leafUpgradeCost.LU10 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L10, 3)}x`;
            console.log(`L10 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
            leafUpgradeFactor.L10AtUpgradeBought = leafUpgradeFactor.L10;
        }
    }
}
function L10UpgradeUpdater() {
  if (leafUpgradeFactor.L10Bought == true) {
  setTimeout(L10UpgradeFormula, (gameData.refreshRate * 2));
  const deltaL10U = leafUpgradeFactor.L10 - leafUpgradeFactor.L10AtUpgradeBought;
  gameData.leavesPerTick *= (deltaL10U + 1);
  document.getElementById("L10").innerHTML = `L10 <br> Grow Power (Bought) <br> Every LU Bought <br> Multiplies Leaves by 1.1 <br> Cost: ` + leafUpgradeCost.LU10 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L10, 3)}x`;
  leafUpgradeFactor.L10AtUpgradeBought = leafUpgradeFactor.L10;
  }
}
gameLoop();
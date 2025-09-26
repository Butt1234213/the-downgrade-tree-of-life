//js wants me to package this into all one giant file
//there's gotta be a jollier way to do this

var gameData = {
 lastUpdate: Date.now(),
 leaves: 0,
 leavesPerTick: 0,
 tickSpeedMultiplier: 0,
 treeAge: 0,
 treeAgePerTick: 0,
 gameStarted: false,

 refreshRate: 10
}

const leafUpgradeCost = {
    LU2: 10,
    LU3: 35,
    LU4: 150
}

var leafUpgradeFactor = {
    L4: 1,
    L4Bought: false,
    L4AtUpgradeBought: 1,
    L4Amt: 10

}


document.getElementById("L1").disabled = false;
document.getElementById("L2").disabled = false;
document.getElementById("L3").disabled = false;
document.getElementById("L4").disabled = false;

console.log(`on startup, gameData.gameData.leavesPerTick is ${gameData.leavesPerTick}`);
console.log(`on startup, gameData.tickSpeedMultiplier is ${gameData.tickSpeedMultiplier}`);

function gameLoop() {
  if (gameData.gameStarted == true) {
  const now = Date.now();
  const deltaTime = now - gameData.lastUpdate;
  gameData.lastUpdate = now;
  const ticksToProcess = (deltaTime / 1000) * gameData.tickSpeedMultiplier;

  gameData.leaves += gameData.leavesPerTick * ticksToProcess;
  gameData.treeAge += deltaTime;
  gameData.treeAgePerTick = gameData.tickSpeedMultiplier;
  
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

  setInterval(gameLoop, gameData.refreshRate);

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
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L3").innerHTML = `L3 <br> Grow II (Bought) <br> x3 Leaves <br> Cost: ` + leafUpgradeCost.LU3 + ` Leaves`;
    document.getElementById("L3").disabled = true;
    console.log(`L3 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}
function L4() {
    if (gameData.leaves >= leafUpgradeCost.LU4) {
    gameData.leaves -= leafUpgradeCost.LU4;
    leafUpgradeFactor.L4 = (((gameData.treeAge / leafUpgradeFactor.L4Amt) ** 0.5) + 1);
    gameData.leavesPerTick *= leafUpgradeFactor.L4;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L4").innerHTML = `L4 <br> Develop I (Bought) <br> Tree Age boosts Leaves <br> Cost: ` + leafUpgradeCost.LU4 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L4, 3)}x`;
    document.getElementById("L4").disabled = true;
    console.log(`L4 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    leafUpgradeFactor.L4AtUpgradeBought = leafUpgradeFactor.L4;
    leafUpgradeFactor.L4Bought = true;
    }
}



gameLoop();
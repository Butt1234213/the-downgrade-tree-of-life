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
    LU3: 35
}

document.getElementById("L1").disabled = false;
document.getElementById("L2").disabled = false;
document.getElementById("L3").disabled = false;

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
  gameData.leavesPerTick = 1000;
  gameData.tickSpeedMultiplier = 1;
  gameData.treeAgePerTick = 1;

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



gameLoop();
var gameData = {
 lastUpdate: Date.now(),
 leaves: 0,
 leavesPerTick: 1,
 tickSpeedMultiplier: 1,
 gameStarted: false,

 refreshRate: 10
}

const leafUpgradeCost = {
    LU1: 10
}

document.getElementById("L1").disabled = false;

function gameLoop() {
  if (gameData.gameStarted == true) {
  const now = Date.now();
  const deltaTime = now - gameData.lastUpdate;
  gameData.lastUpdate = now;
  const ticksToProcess = (deltaTime / 1000) * gameData.tickSpeedMultiplier;

  gameData.leaves += gameData.leavesPerTick * ticksToProcess;
  
  document.getElementById("pleaseWork").innerHTML = truncateToDecimalPlaces(gameData.leaves, 3) + " Leaves";

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
  console.log(`startGeneration function called, value of gameData.gameStarted is ${gameData.gameStarted}`);
  gameLoop();
}

function L1() {
  if (gameData.leaves >= leafUpgradeCost.LU1) {
    gameData.leaves -= leafUpgradeCost.LU1;
    gameData.leavesPerTick += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L1").innerHTML = "Grow I (Bought) <br> x2 Leaves <br> Cost: " + leafUpgradeCost.LU1 + " Leaves";
    document.getElementById("L1").disabled = true;
  }
}

gameLoop();
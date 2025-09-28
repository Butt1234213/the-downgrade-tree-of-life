import {gameData, truncateToDecimalPlaces, easierCalculations } from './bunchobullshit.mjs';
import * as leafUpgrades from './leafupgrades.mjs';

const testBEDecimal = new Decimal.fromComponents(1, 1, 80.1);
const testBEString = testBEDecimal.toString();
console.log(`if BE is working, the testBEDecimal should be ~1e80`);
console.log(`testBEDecimal is`);
console.log(testBEDecimal);
console.log(`or`);
console.log(`${testBEDecimal} is the Decimal()`);
console.log(`${testBEString} is the Decimal().toString()`)

console.log(gameData.leaves);

export function gameLoop() {
  if (gameData.gameStarted == true) {
  const now = Date.now();
  const deltaTime = now - gameData.lastUpdate;
  gameData.lastUpdate = now;
  const ticksToProcess = gameData.tickSpeedMultiplier * (deltaTime * 0.001);
  
  leafUpgrades.L4UpgradeUpdater();
  leafUpgrades.L10UpgradeUpdater();
  leafUpgrades.L11UpgradeUpdater();

  gameData.treeAgePerTick = gameData.tickSpeedMultiplier * 0.5;
  gameData.leaves += gameData.leavesPerTick * ticksToProcess;
  gameData.treeAge += deltaTime * (gameData.tickSpeedMultiplier * 0.5);

  easierCalculations(gameData.leaves);
  easierCalculations(gameData.leavesPerTick);
  easierCalculations(gameData.treeAge);
  easierCalculations(gameData.treeAgePerTick);

  document.getElementById("pleaseWork").innerHTML = truncateToDecimalPlaces(gameData.leaves, 3) + " Leaves";
  document.getElementById("leavesPerSecond").innerHTML = truncateToDecimalPlaces(gameData.leavesPerTick, 3) + " Leaves/s";
  document.getElementById("treeAgeCounter").innerHTML = truncateToDecimalPlaces((gameData.treeAge * 0.001), 3) + " Seconds";
  document.getElementById("treeAgePerSecond").innerHTML = truncateToDecimalPlaces(gameData.treeAgePerTick, 3) + " Seconds/s"; 

  setTimeout(gameLoop, gameData.refreshRate);
  }
}

import {gameData, truncateToDecimalPlaces, toExp } from './bunchobullshit.mjs';
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
  
  toExp(gameData.leaves);
  toExp(gameData.leavesPerTick);
  toExp(gameData.treeAge);
  toExp(gameData.treeAgePerTick);

  const now = new Decimal(Date.now());
  const deltaTime = now.minus(gameData.lastUpdate);
  gameData.lastUpdate = now;
  const ticksToProcess = gameData.tickSpeedMultiplier.times(deltaTime.times(new Decimal(0.001)));
  
  leafUpgrades.L4UpgradeUpdater();
  leafUpgrades.L10UpgradeUpdater();
  leafUpgrades.L11UpgradeUpdater();

  gameData.treeAgePerTick = gameData.tickSpeedMultiplier.times(new Decimal(0.5));
  gameData.leaves = gameData.leaves.plus(gameData.leavesPerTick.times(ticksToProcess));
  gameData.treeAge = gameData.treeAge.plus(deltaTime.times(gameData.tickSpeedMultiplier.times(new Decimal(0.5))));

  document.getElementById("pleaseWork").innerHTML = truncateToDecimalPlaces(gameData.leaves, 3) + " Leaves";
  document.getElementById("leavesPerSecond").innerHTML = truncateToDecimalPlaces(gameData.leavesPerTick, 3) + " Leaves/s";
  document.getElementById("treeAgeCounter").innerHTML = truncateToDecimalPlaces((gameData.treeAge.times(0.001)), 3) + " Seconds";
  document.getElementById("treeAgePerSecond").innerHTML = truncateToDecimalPlaces(gameData.treeAgePerTick, 3) + " Seconds/s"; 

  setTimeout(gameLoop, gameData.refreshRate);
  }
}

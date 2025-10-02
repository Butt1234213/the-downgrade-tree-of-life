import * as storage from './bunchobullshit.mjs';
import * as leafUpgrades from './leafupgrades.mjs';
import * as seedUpgrades from './seedupgrades.mjs';

const testBEDecimal = new Decimal.fromComponents(1, 1, 80.1);
const testBEString = testBEDecimal.toString();
console.log(`if BE is working, the testBEDecimal should be ~1e80`);
console.log(`testBEDecimal is`);
console.log(testBEDecimal);
console.log(`or`);
console.log(`${testBEDecimal} is the Decimal()`);
console.log(`${testBEString} is the Decimal().toString()`)

export function gameLoop() {
  if (storage.gameData.gameStarted == true) {

  const now = new Decimal(Date.now());
  const deltaTime = now.minus(storage.gameData.lastUpdate);
  storage.gameData.lastUpdate = now;
  const ticksToProcess = storage.gameData.tickSpeedMultiplier.times(deltaTime.times(new Decimal(0.001)));
  
  leafUpgrades.L4UpgradeUpdater();
  leafUpgrades.L10UpgradeUpdater();
  leafUpgrades.L11UpgradeUpdater();
  leafUpgrades.L16UpgradeUpdater();
  
  seedUpgrades.S3UpgradeUpdater();

  storage.gameData.treeAgePerTick = storage.gameData.tickSpeedMultiplier.times(new Decimal(1));
  storage.gameData.leaves = storage.gameData.leaves.plus(storage.gameData.leavesPerTick.times(ticksToProcess));
  storage.gameData.treeAge = storage.gameData.treeAge.plus(deltaTime.times(storage.gameData.tickSpeedMultiplier.times(storage.gameData.treeAgePerTick)));

  storage.leavesSoftCalculation("leafSoftcap", new Decimal(0.75));
  storage.seedsSoftCalculation("seedSoftcap", new Decimal(0.75));

  if (storage.gameData.leaves >= new Decimal(1e7).toNumber()) {
    storage.seedsFormula(storage.gameData.leaves, new Decimal(1.1));
  }
  storage.seedsCalculation(storage.gameData.leaves);
  storage.fruitsCalculation(storage.gameData.seeds);

  document.getElementById("pleaseWork").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.leaves, 3) + " Leaves";
  document.getElementById("leavesPerSecond").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.leavesPerTick, 3) + " Leaves/s";
  document.getElementById("treeAgeCounter").innerHTML = storage.truncateToDecimalPlaces((storage.gameData.treeAge.times(0.001)), 3) + " Seconds";
  document.getElementById("treeAgePerSecond").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.treeAgePerTick, 3) + " Seconds/s";

  setTimeout(gameLoop, storage.gameData.refreshRate);
  }
}

import * as storage from './bunchobullshit.mjs';
import { loadSave } from './savefile.mjs';
import * as composter from './composter.mjs'
import { achievements, massAchievementChecker } from './achievements.mjs';

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
      storage.gameData.ticksToUpdateComposter = deltaTime;

      storage.calculateLeavesPerTick();
      storage.calculateSeedsMult();
      composter.updateLeafComposter();

      storage.gameData.leaves = storage.gameData.leaves.plus(storage.gameData.leavesPerTick.times(ticksToProcess));
      storage.gameData.treeAge = storage.gameData.treeAge.plus(deltaTime.times(storage.gameData.tickSpeedMultiplier.times(storage.gameData.treeAgePerTick)));

      if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal(1e15).plus(storage.fruitUpgradeFactor.F3))) {
        storage.gameData.leavesIsSoftcapped = true;
      }

      storage.seedsSoftCalculation("seedSoftcap", new Decimal(0.5));

      if (storage.gameData.leaves >= new Decimal(1e7).toNumber()) {
        storage.seedsFormula(storage.gameData.leaves, new Decimal(1.1));
      }
      if (storage.gameData.seeds >= new Decimal(1e7).toNumber()) {
        storage.fruitsFormula(storage.gameData.seeds, new Decimal(0.75));
      }
      storage.seedsCalculation(storage.gameData.leaves);
      storage.fruitsCalculation(storage.gameData.seeds);

      massAchievementChecker();

      document.getElementById("pleaseWork").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.leaves, 3) + " Leaves";
      document.getElementById("leavesPerSecond").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.leavesPerTick, 3) + " Leaves/s";
      document.getElementById("treeAgeCounter").innerHTML = storage.truncateToDecimalPlaces((storage.gameData.treeAge.times(0.001)), 3) + " Seconds";
      document.getElementById("treeAgePerSecond").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.treeAgePerTick, 3) + " Seconds/s";

      setTimeout(gameLoop, storage.gameData.refreshRate);
    }
}

loadSave();
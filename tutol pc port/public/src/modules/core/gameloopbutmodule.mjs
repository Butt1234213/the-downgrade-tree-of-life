import * as storage from './bunchobullshit.mjs';
import * as calculations from './calculations.mjs';
import { loadSave, gameLoading } from '../savefile.mjs';
import * as composter from '../composter.mjs'
import * as moss from '../moss.mjs'
import { achievements, massAchievementChecker } from '../achievements.mjs';

const testBEDecimal = new Decimal.fromComponents(1, 1, 80.1);
const testBEString = testBEDecimal.toString();
console.log(`if BE is working, the testBEDecimal should be ~1e80`);
console.log(`testBEDecimal is`);
console.log(testBEDecimal);
console.log(`or`);
console.log(`${testBEDecimal} is the Decimal()`);
console.log(`${testBEString} is the Decimal().toString()`)

export function gameLoop() {
    if (storage.gameData.gameStarted) {
        if (!gameLoading) {
            const now = new Decimal(Date.now());
            const deltaTime = now.minus(storage.gameData.lastUpdate);
            storage.gameData.lastUpdate = now;
            const ticksToProcess = storage.gameData.tickSpeedMultiplier.times(deltaTime.times(new Decimal(0.001)));
            storage.gameData.ticksToUpdateComposter = deltaTime;

            calculations.calculateLeavesPerTick();
            calculations.calculateLeavesSoftcap();
            calculations.calculateSeedsMult();
            calculations.calculateFruitsMult();

            calculations.calculateCompostingSpeed();
            composter.updateLeafComposter();
            composter.updateSeedComposter();
            composter.updateFruitComposter();

            moss.mossChecker();
            moss.mossMilestoneChecker();

            storage.potentialEnergyCalculation();
            storage.entropyCalculation();
            storage.entropyGUI();

            if (storage.leafUpgradeFactor.L28Bought) {
              document.getElementById('entropyUpdateCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.potentialEnergy, 3)} Potential Energy`
            }
            
            calculations.calculateGameSpeed();

            storage.gameData.leaves = storage.gameData.leaves.plus(storage.gameData.leavesPerTick.times(ticksToProcess));
            storage.gameData.treeAge = storage.gameData.treeAge.plus(deltaTime.times(storage.gameData.tickSpeedMultiplier.times(storage.gameData.treeAgePerTick)));

            if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal(1e15).times(storage.gameData.leafSoftcapStart))) {
              storage.gameData.leavesIsSoftcapped = true;
            }

            if (storage.gameData.leaves >= new Decimal(1e7).toNumber()) {
              storage.seedsFormula(storage.gameData.leaves, new Decimal(1.1));
            }
            if (storage.gameData.seeds >= new Decimal(1e7).toNumber()) {
              storage.fruitsFormula(storage.gameData.seeds, new Decimal(0.5));
            }
            storage.seedsCalculation(storage.gameData.leaves);
            storage.fruitsCalculation(storage.gameData.seeds);

            storage.updateResourceGUI();

            massAchievementChecker();

            document.getElementById("pleaseWork").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.leaves, 3) + " Leaves";
            document.getElementById("leavesPerSecond").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.leavesPerTick, 3) + " Leaves/s";
            document.getElementById("treeAgeCounter").innerHTML = storage.truncateToDecimalPlaces((storage.gameData.treeAge.times(0.001)), 3) + " Seconds";
            document.getElementById("treeAgePerSecond").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.treeAgePerTick, 3) + " Seconds/s";

            setTimeout(gameLoop, storage.gameData.refreshRate);
        }
    }
}
import * as storage from './bunchobullshit.mjs';
import * as calculations from './calculations.mjs';
import { loadSave, gameLoading } from '../savefile.mjs';
import * as challenges from '../radar.mjs';
import * as proteins from '../proteins.mjs';
import * as composter from '../composter.mjs';
import * as moss from '../moss.mjs';
import * as temple from '../temple.mjs';
import * as cellularLab from '../cellularlab.mjs';
import * as automation from '../automation.mjs';
import * as bacteria from '../bacteria.mjs';
import * as rootMilestones from '../rootmilestones.mjs';
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
            storage.gameData.ticksToProcess = ticksToProcess;

            calculations.calculateLeavesPerTick();
            calculations.calculateBaseLeafSoftcapFactor();
            calculations.calculateLeavesSoftcap();
			calculations.calculateSupercaps();
            calculations.calculateBaseSeedSoftcapFactor();
            calculations.calculateSeedsSoftcap();
            calculations.calculateBaseFruitSoftcapFactor();
            calculations.calculateFruitsSoftcap();
            calculations.calculateSeedsMult();
            calculations.calculateFruitsMult();
            calculations.calculateEntropyMult();
            calculations.calculateRootsMult();

            challenges.stormCalculation();
            challenges.wildfireCalculation();
            challenges.droughtCalculation();
            challenges.blizzardCalculation();

            calculations.calculateCompostingSpeed();
            calculations.calculateComposterScalingStart();
            calculations.calculateComposterSuperScalingStart();
            calculations.calculateComposterSuperScalingEffect();
			calculations.calculateFertilizerCostDivision();
            calculations.calculateFreeLeafFertilizers();
            calculations.calculateFreeSeedFertilizers();
            calculations.calculateFreeFruitFertilizers();
            calculations.calculateLeafComposterCost();
            calculations.calculateSeedComposterCost();
			
			composter.composterButtonUpdater();
			
            calculations.calculateFertilizerBulk();
            composter.updateLeafComposter();
            composter.updateSeedComposter();
            composter.updateFruitComposter();
            composter.updateEntropyComposter();
            composter.checkTotalComposter();

            calculations.calculateMossEffect();
            moss.mossChecker();
            moss.mossMilestoneChecker();

            calculations.calculatePotentialEnergyPower();
            storage.potentialEnergyCalculation();
            storage.entropyCalculation();
            storage.entropyGUI();

            calculations.calculateCellUpgradesBulk();
            calculations.calculateCellsEffectMult();
            calculations.calculateCellsIntervalDiv();
            calculations.calculateCellsMult();
            cellularLab.cellsCalculation();
            cellularLab.bacteriaChecker();
            
            calculations.calculateBacteriaMult();
            calculations.calculateBacteriaPower();
            calculations.calculateBacteriaCapMult();
            bacteria.bacteriaCalculation();
			
			calculations.calculateFreeRuBisCoProteins();
			calculations.calculateFreeExtensinProteins();
			calculations.calculateFreeArganineProteins();
			calculations.calculateFreeGlutamineProteins();
			calculations.calculateFreeGlutamateProteins();
			calculations.calculateFreeAsparagineProteins();
			calculations.calculateFreeAGPProteins();
			calculations.calculateFreeTRBProteins();
			proteins.proteinEffects();
			proteins.DNACalculation();
			proteins.updateDNABlueprints();
			proteins.RNACalculation();

            automation.circuitsCalculation();
            automation.upgradeAutobuyerChecker();
            automation.composterAutobuyerChecker();
            automation.bacteriaTypesAutobuyerChecker();
            automation.cellUpgradesAutobuyerChecker();

            calculations.calculateM1Effect();
            calculations.calculateM3Effect();
			
            storage.rootsCalculation();
            storage.rootsGUI();
			rootMilestones.rootMilestoneChecker();
			
			temple.repeatableUnlocks();
            calculations.calculateLR1Cap();
            calculations.calculateLR1Effect();
            calculations.calculateLR2Cap();
            calculations.calculateLR2Effect();
            calculations.calculateSR1Cap();
            calculations.calculateSR1Effect();
            calculations.calculateFR1Cap();
            calculations.calculateFR1Effect();

            if (storage.leafUpgradeFactor.L28Bought) {
              document.getElementById('entropyUpdateCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.potentialEnergy, 3)} Potential Energy`
            }
            
            calculations.calculateGameSpeed();
            calculations.calculateTreeAge();

            storage.gameData.leaves = storage.gameData.leaves.plus(storage.gameData.leavesPerTick.times(ticksToProcess));
            storage.gameData.treeAge = storage.gameData.treeAge.plus(deltaTime.times(storage.gameData.tickSpeedMultiplier.times(storage.gameData.treeAgePerTick)));

            if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal(1e20).times(storage.gameData.leafSoftcapStart))) {
              storage.gameData.leavesIsSoftcapped = true;
				if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal(1.79e308))) {
				  storage.gameData.leavesIsSoftcapped2 = true;
				}
				else {
				  storage.gameData.leavesIsSoftcapped2 = false;
				}
				if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 500))) {
				  storage.gameData.leavesIsSoftcapped3 = true;
				}
				else {
				  storage.gameData.leavesIsSoftcapped3 = false;
				}
				if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 1000))) {
				  storage.gameData.leavesIsSoftcapped4 = true;
				}
				else {
				  storage.gameData.leavesIsSoftcapped4 = false;
				}
				if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 2000))) {
				  storage.gameData.leavesIsSoftcapped5 = true;
				}
				else {
					storage.gameData.leavesIsSoftcapped5 = false;
				}
            }
            else {
				storage.gameData.leavesIsSoftcapped = false;
            }
			if (storage.gameData.leaves.greaterThanOrEqualTo(storage.gameData.leafSupercapStart)) {
				storage.gameData.leavesIsSupercapped = true;
				achievements.ach95 = true;
				massAchievementChecker();
				document.getElementById('leafSupercap').style.display = 'block';
			}
			if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 1500))) {
			  achievements.ach84 = true;
			  massAchievementChecker();
			}
			if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 10000))) {
			  achievements.ach115 = true;
			  massAchievementChecker();
			}
			
            if (storage.seedsVisualCalculation("true").greaterThanOrEqualTo(storage.gameData.seedSoftcapStart)) {
				storage.gameData.seedsIsSoftcapped = true;
            }
            if (storage.seedsVisualCalculation("true").greaterThanOrEqualTo(storage.gameData.seedSoftcap2Start)) {
				storage.gameData.seedsIsSoftcapped2 = true;
            }
			if (storage.seedsVisualCalculation("true").greaterThanOrEqualTo(storage.gameData.leafSupercapStart)) {
				storage.gameData.seedsIsSupercapped = true;
				document.getElementById('seedSupercap').style.display = 'block';
			}
            if (storage.gameData.fruitsOnHarvest.greaterThanOrEqualTo(new Decimal(1.79e308))) {
              storage.gameData.fruitsIsSoftcapped = true;
            }
            if (storage.gameData.fruitsOnHarvest.greaterThanOrEqualTo(storage.gameData.leafSupercapStart)) {
              storage.gameData.fruitsIsSupercapped = true;
				document.getElementById('fruitSupercap').style.display = 'block';
            }
            if (storage.entropyUpgradeFactor.B1Amount.greaterThanOrEqualTo(new Decimal(100))) {
              achievements.ach92 = true;
			  massAchievementChecker();
            }
            if (storage.gameData.leafSoftcapStart.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 2000))) {
              achievements.ach93 = true;
			  massAchievementChecker();
            }
            if (storage.gameData.droughtLevel.greaterThan(new Decimal(1))) {
              achievements.ach102 = true;
			  massAchievementChecker();
            }
            if (storage.gameData.blizzardLevel.greaterThan(new Decimal(1))) {
              achievements.ach114 = true;
			  massAchievementChecker();
            }
			if (storage.gameData.highestCircuits.greaterThanOrEqualTo(new Decimal(1000))) {
				achievements.ach103 = true;
				massAchievementChecker();
			}
			if (storage.gameData.gameSpeed.greaterThanOrEqualTo(new Decimal(3.155e7))) {
				achievements.ach104 = true;
				massAchievementChecker();
			}
            if (storage.gameData.bacteria.greaterThanOrEqualTo(new Decimal(1.79e308))) {
              achievements.ach122 = true;
			  massAchievementChecker();
            }
            if (storage.gameData.leaves >= new Decimal(1e7).toNumber()) {
              storage.seedsFormula(storage.gameData.leaves, (new Decimal(2).div(new Decimal(3))));
            }
            if (storage.gameData.seeds >= new Decimal(1e7).toNumber()) {
              storage.fruitsFormula(storage.gameData.seeds, (new Decimal(2).div(new Decimal(3))));
            }
            storage.seedsCalculation(storage.gameData.leaves);
            if (storage.gameData.fuAutomationUnlocked) {
              const x = storage.seedsVisualCalculation("false");
              const y = x.times(new Decimal(0.01));
              storage.gameData.seeds = storage.gameData.seeds.plus(y);
            }

            storage.fruitsCalculation(storage.gameData.seeds);

            storage.updateResourceGUI();

            massAchievementChecker();

            document.getElementById("pleaseWork").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.leaves, 3) + " Leaves";
            document.getElementById("leavesPerSecond").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.leavesPerTick, 3) + " Leaves/s";
            document.getElementById("treeAgeCounter").innerHTML = storage.truncateToDecimalPlaces((storage.gameData.treeAge.times(0.001)), 3) + " Seconds";
            document.getElementById("treeAgePerSecond").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.treeAgePerTick, 3) + " Seconds/s";
			document.getElementById("gameSpeedCounter").innerHTML = "x" + storage.truncateToDecimalPlaces(storage.gameData.gameSpeed, 3) + " &#x23F3";

            setTimeout(gameLoop, storage.gameData.refreshRate);
        }
    }
}
import * as storage from './bunchobullshit.mjs';
import * as calculations from './calculations.mjs';
import { loadSave, gameLoading, resetButtonUpdater } from '../savefile.mjs';
import * as challenges from '../radar.mjs';
import * as proteins from '../proteins.mjs';
import * as composter from '../composter.mjs';
import * as moss from '../moss.mjs';
import * as temple from '../temple.mjs';
import * as cellularLab from '../cellularlab.mjs';
import * as automation from '../automation.mjs';
import * as bacteria from '../bacteria.mjs';
import * as rootMilestones from '../rootmilestones.mjs';
import * as petriDish from '../petridish.mjs';
import * as welder from '../welder.mjs';
import { runFallenLeaves } from '../fallenleaves.mjs';
import { achievements, massAchievementChecker } from '../achievements.mjs';

export var microorganismTimer = new Decimal(0);

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
			
			microorganismTimer = microorganismTimer.plus(deltaTime.clamp(new Decimal(1), storage.gameData.refreshRate));

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
            challenges.fallCalculation();

            calculations.calculateCompostingSpeed();
            calculations.calculateComposterScalingStart();
            calculations.calculateComposterSuperScalingStart();
            calculations.calculateComposterSuperScalingEffect();
            calculations.calculateCompostingSpeedScalingStart();
            calculations.calculateCompostingSpeedSuperScalingStart();
			
			calculations.calculateFertilizerCostDivision();
            calculations.calculateFertilizerBaseEffect();
            calculations.calculateFreeLeafFertilizers();
            calculations.calculateFreeSeedFertilizers();
            calculations.calculateFreeFruitFertilizers();
            calculations.calculateFreeEntropyFertilizers();
            calculations.calculateLeafComposterCost();
            calculations.calculateSeedComposterCost();
			
			composter.composterButtonUpdater();
			
            calculations.calculateCellUpgradesBulk();
            calculations.calculateRepeatableUpgradesBulk();
            calculations.calculateFertilizerBulk();
            calculations.calculateMossUpgradesBulk();
            calculations.calculateBacteriaTypesBulk();
            calculations.calculateDNABlueprintsBulk();
            calculations.calculateBacteriaUpgradesBulk();
            calculations.calculateRNAUpgradesBulk();
			
            composter.updateLeafComposter();
            composter.updateSeedComposter();
            composter.updateFruitComposter();
            composter.updateEntropyComposter();
            composter.updateRootComposter();
            composter.checkTotalComposter();

			calculations.calculateMossFactorPow();
            calculations.calculateMossPow();
            calculations.calculateMossEffect();
            moss.mossChecker();
            moss.mossMilestoneChecker();

            calculations.calculatePotentialEnergyPower();
            calculations.calculateLeafPERoot();
            calculations.calculateSeedPERoot();
            storage.potentialEnergyCalculation();
            storage.entropyCalculation();
            storage.entropyGUI();

            calculations.calculateCellsEffectMult();
            calculations.calculateCellsIntervalDiv();
            calculations.calculateCellsReplicationCap();
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
			calculations.calculateDNAMult();
			proteins.DNACalculation();
			calculations.calculateTotalDNABlueprint();
			proteins.updateDNABlueprints();
			calculations.calculateRNAMult();
			proteins.RNACalculation();

            automation.circuitsCalculation();
            automation.automateLeafUpgrades();
            automation.automateSeedUpgrades();
            automation.automateFruitUpgrades();
            automation.automateEntropyUpgrades();
            automation.composterAutobuyerChecker();
            automation.bacteriaTypesAutobuyerChecker();
            automation.cellUpgradesAutobuyerChecker();
            automation.mossUpgradesAutobuyerChecker();
            automation.bacteriaUpgradesAutobuyerChecker();
            automation.rnaUpgradesAutobuyerChecker();
			automation.dnaBlueprintsAutobuyerChecker();

            calculations.calculateM1Effect();
            calculations.calculateM1SoftcapDelay();
            calculations.calculateM3Effect();
			
            storage.rootsCalculation();
            storage.rootsGUI();
			calculations.calculateReinforcementMult();
			rootMilestones.rootMilestoneChecker();
			
			temple.repeatableUnlocks();
			calculations.calculateRepeatableCostDiscount();
			
            calculations.calculateLR1Cap();
            calculations.calculateLR1Effect();
            calculations.calculateLR2Cap();
            calculations.calculateLR2Effect();
            calculations.calculateLR3Cap();
            calculations.calculateLR3Effect();
			
            calculations.calculateSR1Cap();
            calculations.calculateSR1Effect();
            calculations.calculateSR2Cap();
            calculations.calculateSR2Effect();
            calculations.calculateSR3Cap();
            calculations.calculateSR3Effect();
			
            calculations.calculateFR1Cap();
            calculations.calculateFR1Effect();
            calculations.calculateFR2Cap();
            calculations.calculateFR2Effect();
            calculations.calculateFR3Cap();
            calculations.calculateFR3Effect();
			
            calculations.calculateER1Cap();
            calculations.calculateER1Effect();
			
			calculations.calculateFLFallSpeed();
			calculations.calculateFallenLeafCap();
			runFallenLeaves();
			
			calculations.calculateWelderEffect();
			welder.welderGUI();

            if (storage.leafUpgradeFactor.L28Bought) {
				if (storage.gameData.potentialEnergy.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 100000))) {
					document.getElementById('entropyUpdateCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.potentialEnergy, 3)} PE`;
				}
				else {
					document.getElementById('entropyUpdateCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.potentialEnergy, 3)} Potential Energy`;
				}
            }
            
            calculations.calculateGameSpeed();
            calculations.calculateTreeAge();
			
			petriDish.checkMicroorganisms();

            storage.gameData.leaves = storage.gameData.leaves.plus(storage.gameData.leavesPerTick.times(ticksToProcess));
            storage.gameData.treeAge = storage.gameData.treeAge.plus(deltaTime.times(storage.gameData.tickSpeedMultiplier.times(storage.gameData.treeAgePerTick)));

            if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal(1e20).times(storage.gameData.leafSoftcapStart))) {
				storage.gameData.leavesIsSoftcapped = true;
				storage.gameData.leavesIsSoftcappedThisDecompolization = true;
				if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal(1.79e308))) {
					storage.gameData.leavesIsSoftcapped2 = true;
					storage.gameData.leavesIsSoftcapped2ThisDecompolization = true;
				}
				else {
					storage.gameData.leavesIsSoftcapped2 = false;
				}
				if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 500))) {
					storage.gameData.leavesIsSoftcapped3 = true;
					storage.gameData.leavesIsSoftcapped3ThisDecompolization = true;
				}
				else {
					storage.gameData.leavesIsSoftcapped3 = false;
				}
				if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 1000))) {
					storage.gameData.leavesIsSoftcapped4 = true;
					storage.gameData.leavesIsSoftcapped4ThisDecompolization = true;
				}
				else {
					storage.gameData.leavesIsSoftcapped4 = false;
				}
				if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 2000))) {
					storage.gameData.leavesIsSoftcapped5 = true;
					storage.gameData.leavesIsSoftcapped5ThisDecompolization = true;
				}
				else {
					storage.gameData.leavesIsSoftcapped5 = false;
				}
            }
            else {
				storage.gameData.leavesIsSoftcapped = false;
				storage.gameData.leavesIsSoftcapped2 = false;
				storage.gameData.leavesIsSoftcapped3 = false;
				storage.gameData.leavesIsSoftcapped4 = false;
				storage.gameData.leavesIsSoftcapped5 = false;
            }
			if (storage.gameData.leaves.greaterThanOrEqualTo(storage.gameData.leafSupercapStart)) {
				storage.gameData.leavesIsSupercapped = true;
				achievements.ach95 = true;
				document.getElementById('leafSupercap').style.display = 'block';
				document.getElementById('leafMaximum').style.display = 'block';
			}
			if (storage.gameData.leaves.greaterThanOrEqualTo(storage.gameData.leafMaximumStart)) {
				storage.gameData.leaves = storage.gameData.leafMaximumStart;
				achievements.ach133 = true;
			}
			if (storage.gameData.leavesPerTick.greaterThanOrEqualTo(storage.gameData.leafMaximumStart)) {
				storage.gameData.leavesPerTick = storage.gameData.leafMaximumStart;
			}
			
			if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 1500))) {
			  achievements.ach84 = true;
			}
			if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 10000))) {
			  achievements.ach115 = true;
			}
			if (storage.gameData.leaves.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 100000))) {
			  achievements.ach135 = true;
			}
			if (storage.gameData.seeds.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 100000).times(storage.gameData.leaves))) {
			  achievements.ach151 = true;
			}
			
            if (storage.seedsVisualCalculation("true").greaterThanOrEqualTo(storage.gameData.seedSoftcapStart)) {
				storage.gameData.seedsIsSoftcapped = true;
				storage.gameData.seedsIsSoftcappedThisHarvest = true;
				if (storage.seedsVisualCalculation("true").greaterThanOrEqualTo(storage.gameData.seedSoftcap2Start)) {
					storage.gameData.seedsIsSoftcapped2 = true;
					storage.gameData.seedsIsSoftcapped2ThisHarvest = true;
				}
				else {
					storage.gameData.seedsIsSoftcapped2 = false;
				}
            }
			else {
				storage.gameData.seedsIsSoftcapped = false;
				storage.gameData.seedsIsSoftcapped2 = false;
			}
			
			if (storage.seedsVisualCalculation("true").greaterThanOrEqualTo(storage.gameData.seedSupercapStart)) {
				storage.gameData.seedsIsSupercapped = true;
				document.getElementById('seedSupercap').style.display = 'block';
				document.getElementById('seedMaximum').style.display = 'block';
			}
			if (storage.gameData.seeds.greaterThanOrEqualTo(storage.gameData.seedMaximumStart)) {
				storage.gameData.seeds = storage.gameData.seedMaximumStart;
				achievements.ach133 = true;
			}
			
            if (storage.gameData.fruitsOnHarvest.greaterThanOrEqualTo(new Decimal(1.79e308))) {
				storage.gameData.fruitsIsSoftcapped = true;
				storage.gameData.fruitsIsSoftcappedThisTransformation = true;
            }
			else {
				storage.gameData.fruitsIsSoftcapped = false;
			}
            if (storage.gameData.fruitsOnHarvest.greaterThanOrEqualTo(storage.gameData.fruitSupercapStart)) {
				storage.gameData.fruitsIsSupercapped = true;
				document.getElementById('fruitSupercap').style.display = 'block';
				document.getElementById('fruitMaximum').style.display = 'block';
            }
			if (storage.gameData.fruits.greaterThanOrEqualTo(storage.gameData.fruitMaximumStart)) {
				storage.gameData.fruits = storage.gameData.fruitMaximumStart;
				achievements.ach133 = true;
			}
			
			
            if (storage.entropyUpgradeFactor.B1Amount.greaterThanOrEqualTo(new Decimal(100))) {
				achievements.ach92 = true;
            }
            if (storage.gameData.leafSoftcapStart.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 2000))) {
				achievements.ach93 = true;
            }
            if (storage.gameData.droughtLevel.greaterThan(new Decimal(1))) {
				achievements.ach102 = true;
            }
            if (storage.gameData.blizzardLevel.greaterThan(new Decimal(1))) {
				achievements.ach114 = true;
            }
            if (storage.gameData.fallLevel.greaterThan(new Decimal(1))) {
				achievements.ach145 = true;
				document.querySelector('.buttons-fallen-leaves-tab-color').style.visibility = 'visible';
            }
			if (storage.gameData.highestCircuits.greaterThanOrEqualTo(new Decimal(1000))) {
				achievements.ach103 = true;
			}
			if (storage.gameData.highestCircuits.greaterThanOrEqualTo(new Decimal(1e6))) {
				achievements.ach143 = true;
			}
			if (storage.gameData.gameSpeed.greaterThanOrEqualTo(new Decimal(3.155e7))) {
				achievements.ach104 = true;
			}
            if (storage.gameData.bacteria.greaterThanOrEqualTo(new Decimal(1.79e308))) {
				achievements.ach122 = true;
            }
			if ((storage.entropyUpgradeFactor.B2Amount.greaterThanOrEqualTo(new Decimal(10))) && (storage.fruitUpgradeFactor.M2.greaterThanOrEqualTo(new Decimal(10))) && (storage.entropyUpgradeFactor.R3Amount.greaterThanOrEqualTo(new Decimal(10)))) {
				achievements.ach134 = true;
			}
			if (!achievements.ach132 && achievements.ach131) {
				if (Object.keys(storage.rootUpgradeFactor.microorganisms).length > 9) {
					achievements.ach132 = true;
				}
			}
			if (!achievements.ach153 && achievements.ach145) {
				if (!(storage.rootUpgradeFactor.fallenLeavesBOOM.fallen.amount instanceof Decimal)) {
					//do nothing
				}
				else if (storage.rootUpgradeFactor.fallenLeavesBOOM.fallen.amount.greaterThanOrEqualTo(new Decimal(1))) {
					achievements.ach153 = true;
				}
			}
			if (!achievements.ach154 && achievements.ach145) {
				if (!(storage.rootUpgradeFactor.fallenLeavesBOOM.mossy.amount instanceof Decimal)) {
					//do nothing
				}
				else if (storage.rootUpgradeFactor.fallenLeavesBOOM.mossy.amount.greaterThanOrEqualTo(new Decimal(1))) {
					achievements.ach154 = true;
				}
			}
			if (!achievements.ach155 && achievements.ach145) {
				if (!(storage.rootUpgradeFactor.fallenLeavesBOOM.marbled.amount instanceof Decimal)) {
					//do nothing
				}
				else if (storage.rootUpgradeFactor.fallenLeavesBOOM.marbled.amount.greaterThanOrEqualTo(new Decimal(1))) {
					achievements.ach155 = true;
				}
			}
			
			
            if (storage.gameData.leaves >= new Decimal(1e7).toNumber()) {
              storage.seedsFormula(storage.gameData.leaves, (new Decimal(2).div(new Decimal(3))));
            }
            if (storage.gameData.seeds >= new Decimal(1e7).toNumber()) {
              storage.fruitsFormula(storage.gameData.seeds, (new Decimal(2).div(new Decimal(3))));
            }
            storage.seedsCalculation(storage.gameData.leaves);
            if (storage.gameData.fuAutomationUnlocked) {
				let x = storage.seedsVisualCalculation("false").clamp(new Decimal(0), storage.gameData.seedMaximumStart);
				const y = x.times(new Decimal(0.01));
				const z = y.times(storage.gameData.gameSpeed);
				storage.gameData.seeds = storage.gameData.seeds.plus(z);
            }
			if (storage.rootUpgradeFactor.RO19Bought) {
				let x = storage.gameData.fruitsOnHarvest.clamp(new Decimal(0), storage.gameData.fruitMaximumStart);
				const y = x.times(new Decimal(0.01));
				const z = y.times(storage.gameData.gameSpeed);
				storage.gameData.fruits = storage.gameData.fruits.plus(z);
			}
			if (storage.rootUpgradeFactor.RO27Bought) {
				let x = storage.gameData.entropyOnTransform;
				const y = x.times(new Decimal(0.01));
				storage.gameData.entropy = storage.gameData.entropy.plus(y);
			}

            storage.fruitsCalculation(storage.gameData.seeds);

            storage.updateResourceGUI();

			massAchievementChecker();
			resetButtonUpdater();

            document.getElementById("pleaseWork").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.leaves, 3);
            document.getElementById("leavesPerSecond").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.leavesPerTick, 3, true) + "/s";
            document.getElementById("treeAgeCounter").innerHTML = storage.truncateToDecimalPlaces((storage.gameData.treeAge.times(0.001)), 3);
            document.getElementById("treeAgePerSecond").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.treeAgePerTick, 3) + "/s";
			document.getElementById("gameSpeedCounter").innerHTML = "x" + storage.truncateToDecimalPlaces(storage.gameData.gameSpeed, 3) + " &#x23F3";

            setTimeout(gameLoop, storage.gameData.refreshRate);
        }
    }
}
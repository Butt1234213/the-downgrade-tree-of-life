import * as storage from './core/bunchobullshit.mjs';
import { achievements, massAchievementChecker } from './achievements.mjs';

export function rootMilestoneChecker() {
	if (storage.gameData.reinforcements.greaterThanOrEqualTo(new Decimal(1))) {
		document.getElementById("reinforcementCounter").innerHTML = `You have Reinforced ${storage.truncateToDecimalPlaces(storage.gameData.reinforcements, 3)} times,`;
		document.getElementById("reinforcementEffectCounter").innerHTML = `x${storage.truncateToDecimalPlaces(storage.rootUpgradeFactor.leafReinforcementMult, 3)}L, x${storage.truncateToDecimalPlaces(storage.rootUpgradeFactor.seedReinforcementMult, 3)}S, x${storage.truncateToDecimalPlaces(storage.rootUpgradeFactor.fruitReinforcementMult, 3)}F,`;
		
		if (storage.gameData.reinforcements.greaterThanOrEqualTo(storage.rootUpgradeCost.RM1)) {
			storage.rootUpgradeFactor.RM1Achieved = true;
			document.getElementById("RM1").style.backgroundImage = `radial-gradient(#edac13, #55d941)`;
		}
		if (storage.gameData.reinforcements.greaterThanOrEqualTo(storage.rootUpgradeCost.RM2)) {
			storage.rootUpgradeFactor.RM2Achieved = true;
			document.getElementById("RM2").style.backgroundImage = `radial-gradient(#edac13, #55d941)`;
		}
		if (storage.gameData.reinforcements.greaterThanOrEqualTo(storage.rootUpgradeCost.RM3)) {
			storage.rootUpgradeFactor.RM3Achieved = true;
			document.getElementById("RM3").style.backgroundImage = `radial-gradient(#edac13, #55d941)`;
		}
		if (storage.gameData.reinforcements.greaterThanOrEqualTo(storage.rootUpgradeCost.RM4)) {
			storage.rootUpgradeFactor.RM4Achieved = true;
			document.getElementById("RM4").style.backgroundImage = `radial-gradient(#edac13, #55d941)`;
			document.querySelector('.cell-upgrades-automation-background').style.visibility = `visible`;
		}
		if (storage.gameData.reinforcements.greaterThanOrEqualTo(storage.rootUpgradeCost.RM5)) {
			storage.rootUpgradeFactor.RM5Achieved = true;
			document.getElementById("RM5").style.backgroundImage = `radial-gradient(#edac13, #55d941)`;
			document.getElementById("B3").style.display = `inline-block`;
		}
		if (storage.gameData.reinforcements.greaterThanOrEqualTo(storage.rootUpgradeCost.RM6)) {
			storage.rootUpgradeFactor.RM6Achieved = true;
			document.getElementById("RM6").style.backgroundImage = `radial-gradient(#edac13, #55d941)`;
		}
		if (storage.gameData.reinforcements.greaterThanOrEqualTo(storage.rootUpgradeCost.RM7)) {
			storage.rootUpgradeFactor.RM7Achieved = true;
			document.getElementById("RM7").style.backgroundImage = `radial-gradient(#edac13, #55d941)`;
			achievements.ach123 = true;
		}
		if (storage.gameData.reinforcements.greaterThanOrEqualTo(storage.rootUpgradeCost.RM8)) {
			storage.rootUpgradeFactor.RM8Achieved = true;
			document.getElementById("RM8").style.backgroundImage = `radial-gradient(#edac13, #55d941)`;
			document.querySelector('.moss-upgrades-automation-background').style.visibility = `visible`;
		}
		if (storage.gameData.reinforcements.greaterThanOrEqualTo(storage.rootUpgradeCost.RM9)) {
			storage.rootUpgradeFactor.RM9Achieved = true;
			document.getElementById("RM9").style.backgroundImage = `radial-gradient(#edac13, #55d941)`;
			document.querySelector('.bacteria-upgrades-automation-background').style.visibility = `visible`;
		}
		if (storage.gameData.reinforcements.greaterThanOrEqualTo(storage.rootUpgradeCost.RM10)) {
			storage.rootUpgradeFactor.RM10Achieved = true;
			document.getElementById("RM10").style.backgroundImage = `radial-gradient(#edac13, #55d941)`;
			document.querySelector('.rna-upgrades-automation-background').style.visibility = `visible`;
		}
		if (storage.gameData.reinforcements.greaterThanOrEqualTo(storage.rootUpgradeCost.RM11)) {
			storage.rootUpgradeFactor.RM11Achieved = true;
			document.getElementById("RM11").style.backgroundImage = `radial-gradient(#edac13, #55d941)`;
			document.querySelector('.dna-blueprints-automation-background').style.visibility = `visible`;
		}
	}
}
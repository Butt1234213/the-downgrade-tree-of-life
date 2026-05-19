import * as storage from './core/bunchobullshit.mjs';
import * as temple from './temple.mjs';
import * as automation from './automation.mjs';

export function welderGUI() {
	if (storage.gameData.highestCircuits.lt(new Decimal(1e6))) {
		return;
	}
	document.getElementById("welderCircuitsIndicator").innerHTML = `You currently have (${storage.truncateToDecimalPlaces(storage.gameData.circuits, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.highestCircuits, 3)}) Circuits, ${storage.truncateToDecimalPlaces(storage.gameData.circuitsUsedOnWelder, 3)} of them being spent on Welder upgrades.`;
	
	if (storage.gameData.cellUpgradesBulk.gt(new Decimal(1))) {document.getElementById("cellUpgradeBulkIndicator").innerHTML = `You can currently buy ${storage.truncateToDecimalPlaces(storage.gameData.cellUpgradesBulk, 3)} Cell upgrades at once.`;}
	else {document.getElementById("cellUpgradeBulkIndicator").innerHTML = `You can currently buy 1 Cell upgrade at once.`;}
	document.getElementById("buyCellUpgradeBulk").innerHTML = `+${storage.truncateToDecimalPlaces(storage.gameData.welderEffectMult, 3)} bulk buy amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.cellUpgradeBulkCost, 3)} Circuits`;
	
	if (temple.repeatableUpgradeFactor.repeatableUpgradesBulk.gt(new Decimal(1))) {document.getElementById("repeatableUpgradeBulkIndicator").innerHTML = `You can currently buy ${storage.truncateToDecimalPlaces(temple.repeatableUpgradeFactor.repeatableUpgradesBulk, 3)} Repeatable upgrades at once.`;}
	else {document.getElementById("repeatableUpgradeBulkIndicator").innerHTML = `You can currently buy 1 Repeatable upgrade at once.`;}
	document.getElementById("buyRepeatableUpgradeBulk").innerHTML = `+${storage.truncateToDecimalPlaces(storage.gameData.welderEffectMult, 3)} bulk buy amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.repeatableUpgradeBulkCost, 3)} Circuits`;
	
	if (storage.gameData.fertilizerBulk.gt(new Decimal(1))) {document.getElementById("fertilizerBulkIndicator").innerHTML = `You can currently compost ${storage.truncateToDecimalPlaces(storage.gameData.fertilizerBulk, 3)} Fertilizers at once.`;}
	else {document.getElementById("fertilizerBulkIndicator").innerHTML = `You can currently compost 1 Fertilizer at once.`;}
	document.getElementById("buyFertilizerBulk").innerHTML = `+${storage.truncateToDecimalPlaces(storage.gameData.welderEffectMult, 3)} bulk compost amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.fertilizerBulkCost, 3)} Circuits`;
	
	if (storage.fruitUpgradeFactor.mossUpgradesBulk.gt(new Decimal(1))) {document.getElementById("mossUpgradeBulkIndicator").innerHTML = `You can currently buy ${storage.truncateToDecimalPlaces(storage.fruitUpgradeFactor.mossUpgradesBulk, 3)} Moss upgrades at once.`;}
	else {document.getElementById("mossUpgradeBulkIndicator").innerHTML = `You can currently buy 1 Moss upgrade at once.`;}
	document.getElementById("buyMossUpgradeBulk").innerHTML = `+${storage.truncateToDecimalPlaces(storage.gameData.welderEffectMult, 3)} bulk buy amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.mossUpgradeBulkCost, 3)} Circuits`;
	
	if (storage.gameData.bacteriaTypesBulk.gt(new Decimal(1))) {document.getElementById("bacteriaTypeBulkIndicator").innerHTML = `You can currently make up to ${storage.truncateToDecimalPlaces(storage.gameData.bacteriaTypesBulk, 3)} Bacteria Types at once.`;}
	else {document.getElementById("weatherChallengeBulkIndicator").innerHTML = `You can currently make up to 1 Bacteria Type at once.`;}
	document.getElementById("buyBacteriaTypeBulk").innerHTML = `+${storage.truncateToDecimalPlaces(storage.gameData.welderEffectMult, 3)} bulk buy amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.bacteriaTypeBulkCost, 3)} Circuits`;
	
	if (storage.gameData.dnaBlueprintBulk.gt(new Decimal(1))) {document.getElementById("dnaBlueprintBulkIndicator").innerHTML = `You can currently make ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintBulk, 3)} DNA Blueprints at once.`;}
	else {document.getElementById("dnaBlueprintBulkIndicator").innerHTML = `You can currently make 1 DNA Blueprint at once.`;}
	document.getElementById("buyDNABlueprintBulk").innerHTML = `+${storage.truncateToDecimalPlaces(storage.gameData.welderEffectMult, 3)} bulk buy amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.dnaBlueprintBulkCost, 3)} Circuits`;
	
	if (storage.entropyUpgradeFactor.bacteriaUpgradesBulk.gt(new Decimal(1))) {document.getElementById("bacteriaUpgradeBulkIndicator").innerHTML = `You can currently buy ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.bacteriaUpgradesBulk, 3)} Bacteria upgrades at once.`;}
	else {document.getElementById("bacteriaUpgradeBulkIndicator").innerHTML = `You can currently buy 1 Bacteria upgrade at once.`;}
	document.getElementById("buyBacteriaUpgradeBulk").innerHTML = `+${storage.truncateToDecimalPlaces(storage.gameData.welderEffectMult, 3)} bulk buy amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.bacteriaUpgradeBulkCost, 3)} Circuits`;
	
	if (storage.entropyUpgradeFactor.rnaUpgradesBulk.gt(new Decimal(1))) {document.getElementById("rnaUpgradeBulkIndicator").innerHTML = `You can currently buy ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rnaUpgradesBulk, 3)} RNA upgrades at once.`;}
	else {document.getElementById("rnaUpgradeBulkIndicator").innerHTML = `You can currently buy 1 RNA upgrade at once.`;}
	document.getElementById("buyRNAUpgradeBulk").innerHTML = `+${storage.truncateToDecimalPlaces(storage.gameData.welderEffectMult, 3)} bulk buy amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.rnaUpgradeBulkCost, 3)} Circuits`;
}

document.getElementById("buyCellUpgradeBulk").addEventListener("click", function() {
	if (storage.gameData.circuits.minus(automation.circuits.cellUpgradeBulkCost).lt(new Decimal(0))) {
		return;
	}
	storage.gameData.circuitsUsedOnWelder = storage.gameData.circuitsUsedOnWelder.plus(automation.circuits.cellUpgradeBulkCost);
	automation.circuits.cellUpgradeBulkCost = automation.circuits.cellUpgradeBulkCost.times(new Decimal(5));
	automation.circuits.cellUpgradeBulk = automation.circuits.cellUpgradeBulk.plus(new Decimal(1));
});

document.getElementById("buyRepeatableUpgradeBulk").addEventListener("click", function() {
	if (storage.gameData.circuits.minus(automation.circuits.repeatableUpgradeBulkCost).lt(new Decimal(0))) {
		return;
	}
	storage.gameData.circuitsUsedOnWelder = storage.gameData.circuitsUsedOnWelder.plus(automation.circuits.repeatableUpgradeBulkCost);
	automation.circuits.repeatableUpgradeBulkCost = automation.circuits.repeatableUpgradeBulkCost.times(new Decimal(5));
	automation.circuits.repeatableUpgradeBulk = automation.circuits.repeatableUpgradeBulk.plus(new Decimal(1));
});

document.getElementById("buyFertilizerBulk").addEventListener("click", function() {
	if (storage.gameData.circuits.minus(automation.circuits.fertilizerBulkCost).lt(new Decimal(0))) {
		return;
	}
	storage.gameData.circuitsUsedOnWelder = storage.gameData.circuitsUsedOnWelder.plus(automation.circuits.fertilizerBulkCost);
	automation.circuits.fertilizerBulkCost = automation.circuits.fertilizerBulkCost.times(new Decimal(5));
	automation.circuits.fertilizerBulk = automation.circuits.fertilizerBulk.plus(new Decimal(1));
});

document.getElementById("buyMossUpgradeBulk").addEventListener("click", function() {
	if (storage.gameData.circuits.minus(automation.circuits.mossUpgradeBulkCost).lt(new Decimal(0))) {
		return;
	}
	storage.gameData.circuitsUsedOnWelder = storage.gameData.circuitsUsedOnWelder.plus(automation.circuits.mossUpgradeBulkCost);
	automation.circuits.mossUpgradeBulkCost = automation.circuits.mossUpgradeBulkCost.times(new Decimal(5));
	automation.circuits.mossUpgradeBulk = automation.circuits.mossUpgradeBulk.plus(new Decimal(1));
});

document.getElementById("buyBacteriaTypeBulk").addEventListener("click", function() {
	if (storage.gameData.circuits.minus(automation.circuits.bacteriaTypeBulkCost).lt(new Decimal(0))) {
		return;
	}
	storage.gameData.circuitsUsedOnWelder = storage.gameData.circuitsUsedOnWelder.plus(automation.circuits.bacteriaTypeBulkCost);
	automation.circuits.bacteriaTypeBulkCost = automation.circuits.bacteriaTypeBulkCost.times(new Decimal(5));
	automation.circuits.bacteriaTypeBulk = automation.circuits.bacteriaTypeBulk.plus(new Decimal(1));
});

document.getElementById("buyDNABlueprintBulk").addEventListener("click", function() {
	if (storage.gameData.circuits.minus(automation.circuits.dnaBlueprintBulkCost).lt(new Decimal(0))) {
		return;
	}
	storage.gameData.circuitsUsedOnWelder = storage.gameData.circuitsUsedOnWelder.plus(automation.circuits.dnaBlueprintBulkCost);
	automation.circuits.dnaBlueprintBulkCost = automation.circuits.dnaBlueprintBulkCost.times(new Decimal(5));
	automation.circuits.dnaBlueprintBulk = automation.circuits.dnaBlueprintBulk.plus(new Decimal(1));
});

document.getElementById("buyBacteriaUpgradeBulk").addEventListener("click", function() {
	if (storage.gameData.circuits.minus(automation.circuits.bacteriaUpgradeBulkCost).lt(new Decimal(0))) {
		return;
	}
	storage.gameData.circuitsUsedOnWelder = storage.gameData.circuitsUsedOnWelder.plus(automation.circuits.bacteriaUpgradeBulkCost);
	automation.circuits.bacteriaUpgradeBulkCost = automation.circuits.bacteriaUpgradeBulkCost.times(new Decimal(5));
	automation.circuits.bacteriaUpgradeBulk = automation.circuits.bacteriaUpgradeBulk.plus(new Decimal(1));
});

document.getElementById("buyRNAUpgradeBulk").addEventListener("click", function() {
	if (storage.gameData.circuits.minus(automation.circuits.rnaUpgradeBulkCost).lt(new Decimal(0))) {
		return;
	}
	storage.gameData.circuitsUsedOnWelder = storage.gameData.circuitsUsedOnWelder.plus(automation.circuits.rnaUpgradeBulkCost);
	automation.circuits.rnaUpgradeBulkCost = automation.circuits.rnaUpgradeBulkCost.times(new Decimal(5));
	automation.circuits.rnaUpgradeBulk = automation.circuits.rnaUpgradeBulk.plus(new Decimal(1));
});

document.getElementById("respecWelder").addEventListener("click", function() {
	if (storage.gameData.circuitsUsedOnWelder.lt(new Decimal(1))) {
		return;
	}
	automation.circuits.cellUpgradeBulkCost = new Decimal(100000);
	automation.circuits.cellUpgradeBulk = new Decimal(0);
	document.getElementById("buyCellUpgradeBulk").innerHTML = `+1 bulk buy amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.cellUpgradeBulkCost, 3)} Circuits`;
	automation.circuits.repeatableUpgradeBulkCost = new Decimal(100000);
	automation.circuits.repeatableUpgradeBulk = new Decimal(0);
	document.getElementById("buyRepeatableUpgradeBulk").innerHTML = `+1 bulk buy amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.repeatableUpgradeBulkCost, 3)} Circuits`;
	automation.circuits.fertilizerBulkCost = new Decimal(100000);
	automation.circuits.fertilizerBulk = new Decimal(0);
	document.getElementById("buyFertilizerBulk").innerHTML = `+1 bulk compost amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.fertilizerBulkCost, 3)} Circuits`;
	automation.circuits.mossUpgradeBulkCost = new Decimal(100000);
	automation.circuits.mossUpgradeBulk = new Decimal(0);
	document.getElementById("buyMossUpgradeBulk").innerHTML = `+1 bulk buy amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.mossUpgradeBulkCost, 3)} Circuits`;
	automation.circuits.bacteriaTypeBulkCost = new Decimal(1e6);
	automation.circuits.bacteriaTypeBulk = new Decimal(0);
	document.getElementById("buyBacteriaTypeBulk").innerHTML = `+1 bulk completion amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.bacteriaTypeBulkCost, 3)} Circuits`;
	automation.circuits.dnaBlueprintBulkCost = new Decimal(1e6);
	automation.circuits.dnaBlueprintBulk = new Decimal(0);
	document.getElementById("buyDNABlueprintBulk").innerHTML = `+1 bulk buy amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.dnaBlueprintBulkCost, 3)} Circuits`;
	automation.circuits.bacteriaUpgradeBulkCost = new Decimal(1e7);
	automation.circuits.bacteriaUpgradeBulk = new Decimal(0);
	document.getElementById("buyBacteriaUpgradeBulk").innerHTML = `+1 bulk buy amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.bacteriaUpgradeBulkCost, 3)} Circuits`;
	automation.circuits.rnaUpgradeBulkCost = new Decimal(1e12);
	automation.circuits.rnaUpgradeBulk = new Decimal(0);
	document.getElementById("buyRNAUpgradeBulk").innerHTML = `+1 bulk buy amount<br>Cost: ${storage.truncateToDecimalPlaces(automation.circuits.rnaUpgradeBulkCost, 3)} Circuits`;
	storage.gameData.circuitsUsedOnWelder = new Decimal(0);
});

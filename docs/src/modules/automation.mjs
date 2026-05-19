import { achievements, massAchievementChecker } from './achievements.mjs';
import * as storage from './core/bunchobullshit.mjs';
import * as leafUpgrades from './leafupgrades.mjs';
import * as seedUpgrades from './seedupgrades.mjs';
import * as fruitUpgrades from './fruitupgrades.mjs';
import * as entropyUpgrades from './entropyupgrades.mjs';
import * as composter from './composter.mjs';
import * as moss from './moss.mjs';
import * as cellularLab from './cellularlab.mjs';
import * as bacteria from './bacteria.mjs';
import * as proteins from './proteins.mjs';
import * as temple from './temple.mjs';

export function circuitsCalculation() {
    if (storage.entropyUpgradeFactor.E1Bought) {
        //I wish I could insert a screenshot of Desmos's Logarithmic regression formula here,
        //but f(x) = 0.028953 * ln(x) gives f(1e15^n) = n exactly
        //just trust me, this works
        const evenSpookierConstant = new Decimal(0.028953).times(Decimal.ln(storage.gameData.cells));
        //I'm just truncating evenSpookierConstant because to be completely honest with you I'm not really that confident this works lol
		const evenClampierConstant = evenSpookierConstant.clamp(storage.gameData.highestCircuitsTrue, new Decimal(Infinity));
        storage.gameData.highestCircuits = evenClampierConstant.trunc();
		storage.gameData.highestCircuitsTrue = storage.gameData.highestCircuits;
        document.getElementById('circuitsTotalCounter').innerHTML = `You have built ${storage.truncateToDecimalPlaces(storage.gameData.highestCircuits, 3)} Circuits in total,`;

        const x = new Decimal(1.5).pow(storage.gameData.highestCircuits);
        const y = x.div(new Decimal(10));
        document.getElementById('circuitsFLOPSTotal').innerHTML = `computing ${storage.truncateToDecimalPlaces(y, 3)} FLOPs/s in total.`;

		const welderUsedCircuits = storage.gameData.highestCircuits.minus(storage.gameData.circuitsUsedOnWelder);
        storage.gameData.circuits = welderUsedCircuits.minus(storage.gameData.circuitsUsed);
        document.getElementById('circuitsCounter').innerHTML = `You currently have ${storage.truncateToDecimalPlaces(storage.gameData.circuits, 3)} Circuits,`;

        storage.gameData.nextCircuit = new Decimal(1e15).times(new Decimal(1e15).pow(storage.gameData.highestCircuits));
        document.getElementById('circuitsNextCounter').innerHTML = `(next Circuit at ${storage.truncateToDecimalPlaces(storage.gameData.nextCircuit, 3)} Cells).`;
    }
}

export var circuits = {
    upgradeAutobuyer: new Decimal(0),
    upgradeAutobuyerFLOPS: new Decimal(0),
    composterAutobuyer: new Decimal(0),
    composterAutobuyerFLOPS: new Decimal(0),
    bacteriaTypesAutobuyer: new Decimal(0),
    bacteriaTypesAutobuyerFLOPS: new Decimal(0),
    cellUpgradesAutobuyer: new Decimal(0),
    cellUpgradesAutobuyerFLOPS: new Decimal(0),
    mossUpgradesAutobuyer: new Decimal(0),
    mossUpgradesAutobuyerFLOPS: new Decimal(0),
    bacteriaUpgradesAutobuyer: new Decimal(0),
    bacteriaUpgradesAutobuyerFLOPS: new Decimal(0),
    rnaUpgradesAutobuyer: new Decimal(0),
    rnaUpgradesAutobuyerFLOPS: new Decimal(0),
    dnaBlueprintsAutobuyer: new Decimal(0),
    dnaBlueprintsAutobuyerFLOPS: new Decimal(0),
	
	cellUpgradeBulk: new Decimal(0),
	cellUpgradeBulkCost: new Decimal(100000),
	repeatableUpgradeBulk: new Decimal(0),
	repeatableUpgradeBulkCost: new Decimal(100000),
	fertilizerBulk: new Decimal(0),
	fertilizerBulkCost: new Decimal(100000),
	mossUpgradeBulk: new Decimal(0),
	mossUpgradeBulkCost: new Decimal(100000),
	bacteriaTypeBulk: new Decimal(0),
	bacteriaTypeBulkCost: new Decimal(1e6),
	dnaBlueprintBulk: new Decimal(0),
	dnaBlueprintBulkCost: new Decimal(1e6),
	bacteriaUpgradeBulk: new Decimal(0),
	bacteriaUpgradeBulkCost: new Decimal(1e7),
	rnaUpgradeBulk: new Decimal(0),
	rnaUpgradeBulkCost: new Decimal(1e12),
}

function flopsFormula(circuits) {
    if (circuits.greaterThan(new Decimal(0))) {
        const x = new Decimal(1.5).pow(circuits);
        const y = x.div(new Decimal(10));
        return y;
    }
    else {
        return new Decimal(0);
    }
}

function updateAutobuyerCircuits() {
    let newValue = new Decimal(document.getElementById("upgradeAutomationCircuitsAssigner").value);
    if (newValue.greaterThanOrEqualTo(storage.gameData.circuits)) {
        newValue = storage.gameData.circuits;
    }
    circuits.upgradeAutobuyer = circuits.upgradeAutobuyer.plus(newValue);
    storage.gameData.circuitsUsed = storage.gameData.circuitsUsed.plus(newValue);
    document.getElementById('upgradeAutomationCircuitsAssigner').value = '';

    document.getElementById("upgradeAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.upgradeAutobuyer, 3)} Circuits assigned to Upgrade automation,`;
    document.getElementById("upgradeAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.upgradeAutobuyer), 3)} FLOPs/s.`;

    achievements.ach54 = true;
    massAchievementChecker();
}

export function loadCircuits(newValue) {
    circuits = newValue;
    document.getElementById("upgradeAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.upgradeAutobuyer, 3)} Circuits assigned to Upgrade automation,`;
    document.getElementById("upgradeAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.upgradeAutobuyer), 3)} FLOPs/s.`;
    document.getElementById("composterAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.composterAutobuyer, 3)} Circuits assigned to Composter automation,`;
	document.getElementById('composterAutomationFLOPSCounter').innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.composterAutobuyer), 3)} FLOPs/s, composting every ${storage.truncateToDecimalPlaces(composterAutobuyerFomula('w'), 3)}s.`;
    document.getElementById("bacteriaTypesAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.bacteriaTypesAutobuyer, 3)} Circuits assigned to Bacteria Types automation,`;
    document.getElementById("bacteriaTypesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.bacteriaTypesAutobuyer), 3)} FLOPs/s, resetting every ${storage.truncateToDecimalPlaces(bacteriaTypesAutobuyerFormula('w'), 3)}s`;
    document.getElementById("cellUpgradesAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.cellUpgradesAutobuyer, 3)} Circuits assigned to Cell Upgrades automation,`;
    document.getElementById("cellUpgradesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.cellUpgradesAutobuyer), 3)} FLOPs/s, buying every ${storage.truncateToDecimalPlaces(cellUpgradesAutobuyerFormula('w'), 3)}s`;
    document.getElementById("mossUpgradesAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.mossUpgradesAutobuyer, 3)} Circuits assigned to Moss Upgrades automation,`;
    document.getElementById("mossUpgradesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.mossUpgradesAutobuyer), 3)} FLOPs/s, buying every ${storage.truncateToDecimalPlaces(mossUpgradesAutobuyerFormula('w'), 3)}s`;
    document.getElementById("bacteriaUpgradesAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.bacteriaUpgradesAutobuyer, 3)} Circuits assigned to Bacteria Upgrades automation,`;
    document.getElementById("bacteriaUpgradesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.bacteriaUpgradesAutobuyer), 3)} FLOPs/s, buying every ${storage.truncateToDecimalPlaces(bacteriaUpgradesAutobuyerFormula('w'), 3)}s`;
    document.getElementById("rnaUpgradesAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.rnaUpgradesAutobuyer, 3)} Circuits assigned to RNA Upgrades automation,`;
    document.getElementById("rnaUpgradesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.rnaUpgradesAutobuyer), 3)} FLOPs/s, buying every ${storage.truncateToDecimalPlaces(rnaUpgradesAutobuyerFormula('w'), 3)}s`;
    document.getElementById("dnaBlueprintsAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.dnaBlueprintsAutobuyer, 3)} Circuits assigned to DNA Blueprint &amp; Protein automation,`;
    document.getElementById("dnaBlueprintsAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.dnaBlueprintsAutobuyer), 3)} FLOPs/s, making every ${storage.truncateToDecimalPlaces(dnaBlueprintsAutobuyerFormula('w'), 3)}s`;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export async function automateLeafUpgrades() {
    if ((storage.entropyUpgradeFactor.E1Bought) || (storage.gameData.reinforcements.greaterThanOrEqualTo(new Decimal(1)))) {
        circuits.upgradeAutobuyerFLOPS = circuits.upgradeAutobuyerFLOPS.plus((flopsFormula(circuits.upgradeAutobuyer)).times(storage.gameData.ticksToProcess));
        document.getElementById("upgradeAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.upgradeAutobuyer), 3)} FLOPs/s. (${storage.truncateToDecimalPlaces(circuits.upgradeAutobuyerFLOPS, 3)} FLOPs)`;

        for (let i = 1; i < 76; i++) {
            if (circuits.upgradeAutobuyerFLOPS.greaterThanOrEqualTo(storage.leafAutomationFactor[`L${i}`]))  {
                if (!storage.leafUpgradeFactor[`L${i}Bought`]) {
                    leafUpgrades.functions[`L${i}`]();
                    await sleep(100);
                }
            }
        }
        if (storage.leafUpgradeFactor.L53Bought) {
            for (let i = 1; i < 4; i++) {
				if (temple.repeatableUpgradeFactor[`LR${i}Unlocked`]) {
					if (circuits.upgradeAutobuyerFLOPS.greaterThanOrEqualTo(temple.repeatableAutomationFactor[`LR${i}`]))  {
						temple.functions[`LR${i}`]();
						await sleep(100);
					}	
				}
            }
        }
    }
}

export async function automateSeedUpgrades() {
	if (storage.gameData.suAutomationUnlocked) {
		for (let i = 1; i < 64; i++) {
			if (circuits.upgradeAutobuyerFLOPS.greaterThanOrEqualTo(storage.seedAutomationFactor[`S${i}`]))  {
				if (!storage.seedUpgradeFactor[`S${i}Bought`]) {
					seedUpgrades.functions[`S${i}`]();
					await sleep(100);
				}
			}
		}
		if (storage.seedUpgradeFactor.S42Bought) {
			for (let i = 1; i < 4; i++) {
				if (temple.repeatableUpgradeFactor[`SR${i}Unlocked`]) {
					if (circuits.upgradeAutobuyerFLOPS.greaterThanOrEqualTo(temple.repeatableAutomationFactor[`SR${i}`]))  {
						temple.functions[`SR${i}`]();
						await sleep(100);
					}	
				}
			}
		}
	}
}

export async function automateFruitUpgrades() {
	if (storage.gameData.fuAutomationUnlocked) {
		for (let i = 1; i < 56; i++) {
			if (circuits.upgradeAutobuyerFLOPS.greaterThanOrEqualTo(storage.fruitAutomationFactor[`F${i}`]))  {
				if (!storage.fruitUpgradeFactor[`F${i}Bought`]) {
					fruitUpgrades.functions[`F${i}`]();
					await sleep(100);
				}
			}
		}
		if (storage.fruitUpgradeFactor.F41Bought) {
			for (let i = 1; i < 4; i++) {
				if (temple.repeatableUpgradeFactor[`FR${i}Unlocked`]) {
					if (circuits.upgradeAutobuyerFLOPS.greaterThanOrEqualTo(temple.repeatableAutomationFactor[`FR${i}`]))  {
						temple.functions[`FR${i}`]();
						await sleep(100);
					}
				}
			}
		} 
	}
}

export async function automateEntropyUpgrades() {
	if (storage.gameData.euAutomationUnlocked) {
		for (let i = 1; i < 52; i++) {
			if (circuits.upgradeAutobuyerFLOPS.greaterThanOrEqualTo(storage.entropyAutomationFactor[`E${i}`]))  {
				if (!storage.entropyUpgradeFactor[`E${i}Bought`]) {
					entropyUpgrades.functions[`E${i}`]();
					await sleep(100);
				}
			}
		}
		if (storage.entropyUpgradeFactor.E45Bought) {
			for (let i = 1; i < 2; i++) {
				if (temple.repeatableUpgradeFactor[`ER${i}Unlocked`]) {
					if (circuits.upgradeAutobuyerFLOPS.greaterThanOrEqualTo(temple.repeatableAutomationFactor[`ER${i}`]))  {
						temple.functions[`ER${i}`]();
						await sleep(100);
					}
				}
			}
		} 
	}
}

function updateComposterAutobuyerCircuits() {
    let newValue = new Decimal(document.getElementById("composterAutomationCircuitsAssigner").value);
    if (newValue.greaterThanOrEqualTo(storage.gameData.circuits)) {
        newValue = storage.gameData.circuits;
    }
    else if (newValue.greaterThanOrEqualTo(new Decimal(74))) {
        newValue = new Decimal(74);
    }

    newValue = newValue.minus(circuits.composterAutobuyer);

    circuits.composterAutobuyer = circuits.composterAutobuyer.plus(newValue);
    storage.gameData.circuitsUsed = storage.gameData.circuitsUsed.plus(newValue);
    document.getElementById('composterAutomationCircuitsAssigner').value = '';

    document.getElementById("composterAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.composterAutobuyer, 3)} Circuits assigned to Composter automation,`;
    document.getElementById('composterAutomationFLOPSCounter').innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.composterAutobuyer), 3)} FLOPs/s, composting every ${storage.truncateToDecimalPlaces(composterAutobuyerFomula('w'), 3)}s.`;
}

function composterAutobuyerFomula(type) {
	const x = circuits.composterAutobuyer.minus(new Decimal(1));
	const y = new Decimal(1).div(new Decimal(1.1));
	const z = y.pow(x);
	const u = z.clamp(new Decimal(0.001), new Decimal(Infinity));
	const w = new Decimal(100).times(u);
	const v = w.times(1000);
	if (type === 'w') {
		return w;
	}
	else {
		return v;
	}
}

export async function composterAutobuyerChecker() {
    if ((storage.gameData.stormLevel.greaterThan(new Decimal(1))) || (achievements.ach65)) {
        if (circuits.composterAutobuyer.lessThan(new Decimal(1))) {
            document.getElementById('composterAutomationFLOPSCounter').innerHTML = `computing 0 FLOPs/s, composting every ∞s.`;
            return;
        }
        if (circuits.composterAutobuyer.lessThan(new Decimal(74))) {
            document.getElementById('composterAutomationFLOPSCounter').innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.composterAutobuyer), 3)} FLOPs/s, composting every ${storage.truncateToDecimalPlaces(composterAutobuyerFomula('w'), 3)}s.`;
            //this should calculate the delay for each automation
			const v = composterAutobuyerFormula('v');
            await sleep(v.toNumber());
        }
        else {
            await sleep(100);
        }
        if (storage.gameData.leaves.greaterThanOrEqualTo(storage.gameData.leafComposterCost)) {
            composter.checkLeafComposter();
        }
        if (storage.gameData.seeds.greaterThanOrEqualTo(storage.gameData.seedComposterCost)) {
            composter.checkSeedComposter();
        }
        if (storage.gameData.fruits.greaterThanOrEqualTo(storage.gameData.fruitComposterCost)) {
            composter.checkFruitComposter();
        }
		if (storage.gameData.entropyComposterUnlocked) {
			if (storage.gameData.entropy.greaterThanOrEqualTo(storage.gameData.entropyComposterCost)) {
				composter.checkEntropyComposter();
			}
		}
		if (storage.gameData.rootComposterUnlocked) {
			if (storage.gameData.roots.greaterThanOrEqualTo(storage.gameData.rootComposterCost)) {
				composter.checkRootComposter();
			}
		}
    }
}

function bacteriaTypesAutobuyerFormula(type) {
	const x = circuits.bacteriaTypesAutobuyer;
	const m = new Decimal(-99.9).div(new Decimal(599));
	const z = x.minus(new Decimal(1));
	const y = (z.times(m)).plus(new Decimal(100));
	const w = y.clamp(new Decimal(0.1), new Decimal(100));
	const v = w.times(new Decimal(1000));
	if (type === 'w') {
		return w;
	}
	else {
		return v;
	}
}

function updateBacteriaTypesAutobuyerCircuits() {
    let newValue = new Decimal(document.getElementById("bacteriaTypesAutomationCircuitsAssigner").value);
    if (newValue.greaterThanOrEqualTo(storage.gameData.circuits)) {
        newValue = storage.gameData.circuits;
    }
    else if (newValue.greaterThanOrEqualTo(new Decimal(600))) {
        newValue = new Decimal(600);
    }

    newValue = newValue.minus(circuits.bacteriaTypesAutobuyer);

    circuits.bacteriaTypesAutobuyer = circuits.bacteriaTypesAutobuyer.plus(newValue);
    storage.gameData.circuitsUsed = storage.gameData.circuitsUsed.plus(newValue);
    document.getElementById('bacteriaTypesAutomationCircuitsAssigner').value = '';

    document.getElementById("bacteriaTypesAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.bacteriaTypesAutobuyer, 3)} Circuits assigned to Bacteria Types automation,`;
    document.getElementById("bacteriaTypesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.bacteriaTypesAutobuyer), 3)} FLOPs/s, resetting every ${storage.truncateToDecimalPlaces(bacteriaTypesAutobuyerFormula('w'), 3)}s`;
}

export async function bacteriaTypesAutobuyerChecker() {
    if ((storage.entropyUpgradeFactor.E36Bought) || (achievements.ach121)) {
        if (circuits.bacteriaTypesAutobuyer.lessThan(new Decimal(1))) {
            document.getElementById('bacteriaTypesAutomationFLOPSCounter').innerHTML = `computing 0 FLOPs/s, resetting every ∞s.`;
            return;
        }
        if (circuits.bacteriaTypesAutobuyer.lessThan(new Decimal(600))) {
            document.getElementById("bacteriaTypesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.bacteriaTypesAutobuyer), 3)} FLOPs/s, resetting every ${storage.truncateToDecimalPlaces(bacteriaTypesAutobuyerFormula('w'), 3)}s`;
            //this should calculate the delay for each automation
			const v = bacteriaTypesAutobuyerFormula('v');
            await sleep(v.toNumber());
        }
        else {
            await sleep(100);
        }
		if (storage.gameData.cells.greaterThanOrEqualTo(storage.gameData.cellsCap)) {
			bacteria.resetCells();
		}
    }
}

function cellUpgradesAutobuyerFormula(type) {
	const x = circuits.cellUpgradesAutobuyer;
	const m = new Decimal(-99.9).div(new Decimal(999));
	const z = x.minus(new Decimal(1));
	const y = (z.times(m)).plus(new Decimal(100));
	const w = y.clamp(new Decimal(0.1), new Decimal(100));
	const v = w.times(new Decimal(1000));
	if (type === 'w') {
		return w;
	}
	else {
		return v;
	}
}

function updateCellUpgradesAutobuyerCircuits() {
    let newValue = new Decimal(document.getElementById("cellUpgradesAutomationCircuitsAssigner").value);
    if (newValue.greaterThanOrEqualTo(storage.gameData.circuits)) {
        newValue = storage.gameData.circuits;
    }
    else if (newValue.greaterThanOrEqualTo(new Decimal(1000))) {
        newValue = new Decimal(1000);
    }

    newValue = newValue.minus(circuits.cellUpgradesAutobuyer);

    circuits.cellUpgradesAutobuyer = circuits.cellUpgradesAutobuyer.plus(newValue);
    storage.gameData.circuitsUsed = storage.gameData.circuitsUsed.plus(newValue);
    document.getElementById('cellUpgradesAutomationCircuitsAssigner').value = '';

    document.getElementById("cellUpgradesAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.cellUpgradesAutobuyer, 3)} Circuits assigned to Cell Upgrades automation,`;
    document.getElementById("cellUpgradesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.cellUpgradesAutobuyer), 3)} FLOPs/s, buying every ${storage.truncateToDecimalPlaces(cellUpgradesAutobuyerFormula('w'), 3)}s`;
}

export async function cellUpgradesAutobuyerChecker() {
    if (storage.rootUpgradeFactor.RM4Achieved) {
        if (circuits.cellUpgradesAutobuyer.lessThan(new Decimal(1))) {
            document.getElementById('cellUpgradesAutomationFLOPSCounter').innerHTML = `computing 0 FLOPs/s, buying every ∞s.`;
            return;
        }
        if (circuits.cellUpgradesAutobuyer.lessThan(new Decimal(1000))) {
            document.getElementById("cellUpgradesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.cellUpgradesAutobuyer), 3)} FLOPs/s, buying every ${storage.truncateToDecimalPlaces(cellUpgradesAutobuyerFormula('w'), 3)}s`;
            //this should calculate the delay for each automation
			const v = cellUpgradesAutobuyerFormula('v');
            await sleep(v.toNumber());
        }
        else {
            await sleep(100);
        }
		
		if (storage.gameData.entropy.greaterThanOrEqualTo(storage.entropyUpgradeFactor.C1Cost)) {
			cellularLab.C1();
		}
		if (storage.gameData.fruits.greaterThanOrEqualTo(storage.entropyUpgradeFactor.C2Cost)) {
			cellularLab.C2();
		}
		if (storage.entropyUpgradeFactor.E18Bought) {
			if (storage.gameData.entropy.greaterThanOrEqualTo(storage.entropyUpgradeFactor.C3Cost)) {
				cellularLab.C3();
			}
		}
    }
}

function mossUpgradesAutobuyerFormula(type) {
	const x = circuits.mossUpgradesAutobuyer;
	const m = new Decimal(-99.9).div(new Decimal(2000));
	const z = x.minus(new Decimal(1));
	const y = (z.times(m)).plus(new Decimal(99.9));
	const w = y.clamp(new Decimal(0.1), new Decimal(100));
	const v = w.times(new Decimal(1000));
	if (type === 'w') {
		return w;
	}
	else {
		return v;
	}
}

function updateMossUpgradesAutobuyerCircuits() {
    let newValue = new Decimal(document.getElementById("mossUpgradesAutomationCircuitsAssigner").value);
    if (newValue.greaterThanOrEqualTo(storage.gameData.circuits)) {
        newValue = storage.gameData.circuits;
    }
    else if (newValue.greaterThanOrEqualTo(new Decimal(2000))) {
        newValue = new Decimal(2000);
    }

    newValue = newValue.minus(circuits.mossUpgradesAutobuyer);

    circuits.mossUpgradesAutobuyer = circuits.mossUpgradesAutobuyer.plus(newValue);
    storage.gameData.circuitsUsed = storage.gameData.circuitsUsed.plus(newValue);
    document.getElementById('mossUpgradesAutomationCircuitsAssigner').value = '';

    document.getElementById("mossUpgradesAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.mossUpgradesAutobuyer, 3)} Circuits assigned to Moss Upgrades automation,`;
    document.getElementById("mossUpgradesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.mossUpgradesAutobuyer), 3)} FLOPs/s, buying every ${storage.truncateToDecimalPlaces(mossUpgradesAutobuyerFormula('w'), 3)}s`;
}

export async function mossUpgradesAutobuyerChecker() {
    if (storage.rootUpgradeFactor.RM8Achieved) {
        if (circuits.mossUpgradesAutobuyer.lessThan(new Decimal(1))) {
            document.getElementById('mossUpgradesAutomationFLOPSCounter').innerHTML = `computing 0 FLOPs/s, buying every ∞s.`;
            return;
        }
        if (circuits.mossUpgradesAutobuyer.lessThan(new Decimal(2000))) {
            document.getElementById("mossUpgradesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.mossUpgradesAutobuyer), 3)} FLOPs/s, buying every ${storage.truncateToDecimalPlaces(mossUpgradesAutobuyerFormula('w'), 3)}s`;
            //this should calculate the delay for each automation
			const v = mossUpgradesAutobuyerFormula('v');
            await sleep(v.toNumber());
        }
        else {
            await sleep(100);
        }
		
		if (storage.gameData.moss.greaterThanOrEqualTo(moss.mossUpgradeCost.M1)) {
			moss.M1();
		}
		if (storage.gameData.moss.greaterThanOrEqualTo(moss.mossUpgradeCost.M2)) {
			moss.M2();
		}
		if (storage.gameData.moss.greaterThanOrEqualTo(moss.mossUpgradeCost.M3)) {
			moss.M3();
		}
		if (storage.gameData.moss.greaterThanOrEqualTo(moss.mossUpgradeCost.M4)) {
			moss.M4();
		}
		if (storage.gameData.moss.greaterThanOrEqualTo(moss.mossUpgradeCost.M5)) {
			moss.M5();
		}
		if (storage.gameData.moss.greaterThanOrEqualTo(moss.mossUpgradeCost.M6)) {
			moss.M6();
		}
    }
}

function bacteriaUpgradesAutobuyerFormula(type) {
	const x = circuits.bacteriaUpgradesAutobuyer;
	const m = new Decimal(-99.9).div(new Decimal(10000));
	const z = x.minus(new Decimal(1));
	const y = (z.times(m)).plus(new Decimal(99.9));
	const w = y.clamp(new Decimal(0.1), new Decimal(100));
	const v = w.times(new Decimal(1000));
	if (type === 'w') {
		return w;
	}
	else {
		return v;
	}
}

function updateBacteriaUpgradesAutobuyerCircuits() {
    let newValue = new Decimal(document.getElementById("bacteriaUpgradesAutomationCircuitsAssigner").value);
    if (newValue.greaterThanOrEqualTo(storage.gameData.circuits)) {
        newValue = storage.gameData.circuits;
    }
    else if (newValue.greaterThanOrEqualTo(new Decimal(10000))) {
        newValue = new Decimal(10000);
    }

    newValue = newValue.minus(circuits.bacteriaUpgradesAutobuyer);

    circuits.bacteriaUpgradesAutobuyer = circuits.bacteriaUpgradesAutobuyer.plus(newValue);
    storage.gameData.circuitsUsed = storage.gameData.circuitsUsed.plus(newValue);
    document.getElementById('bacteriaUpgradesAutomationCircuitsAssigner').value = '';

    document.getElementById("bacteriaUpgradesAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.bacteriaUpgradesAutobuyer, 3)} Circuits assigned to Bacteria Upgrades automation,`;
    document.getElementById("bacteriaUpgradesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.bacteriaUpgradesAutobuyer), 3)} FLOPs/s, buying every ${storage.truncateToDecimalPlaces(bacteriaUpgradesAutobuyerFormula('w'), 3)}s`;
}

export async function bacteriaUpgradesAutobuyerChecker() {
    if (storage.rootUpgradeFactor.RM9Achieved) {
        if (circuits.bacteriaUpgradesAutobuyer.lessThan(new Decimal(1))) {
            document.getElementById('bacteriaUpgradesAutomationFLOPSCounter').innerHTML = `computing 0 FLOPs/s, buying every ∞s.`;
            return;
        }
        if (circuits.bacteriaUpgradesAutobuyer.lessThan(new Decimal(10000))) {
            document.getElementById("bacteriaUpgradesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.bacteriaUpgradesAutobuyer), 3)} FLOPs/s, buying every ${storage.truncateToDecimalPlaces(bacteriaUpgradesAutobuyerFormula('w'), 3)}s`;
            //this should calculate the delay for each automation
			const v = bacteriaUpgradesAutobuyerFormula('v');
            await sleep(v.toNumber());
        }
        else {
            await sleep(100);
        }
		
		if (storage.gameData.bacteria.greaterThanOrEqualTo(storage.entropyUpgradeFactor.B1Cost)) {
			bacteria.B1();
		}
		if (storage.gameData.bacteria.greaterThanOrEqualTo(storage.entropyUpgradeFactor.B2Cost)) {
			bacteria.B2();
		}
		if (storage.gameData.roots.greaterThanOrEqualTo(storage.entropyUpgradeFactor.B3Cost)) {
			bacteria.B3();
		}
    }
}

function rnaUpgradesAutobuyerFormula(type) {
	const x = circuits.rnaUpgradesAutobuyer;
	const m = new Decimal(-99.9).div(new Decimal(250000));
	const z = x.minus(new Decimal(1));
	const y = (z.times(m)).plus(new Decimal(99.9));
	const w = y.clamp(new Decimal(0.1), new Decimal(100));
	const v = w.times(new Decimal(1000));
	if (type === 'w') {
		return w;
	}
	else {
		return v;
	}
}

function updateRNAUpgradesAutobuyerCircuits() {
    let newValue = new Decimal(document.getElementById("rnaUpgradesAutomationCircuitsAssigner").value);
    if (newValue.greaterThanOrEqualTo(storage.gameData.circuits)) {
        newValue = storage.gameData.circuits;
    }
    else if (newValue.greaterThanOrEqualTo(new Decimal(250000))) {
        newValue = new Decimal(250000);
    }

    newValue = newValue.minus(circuits.rnaUpgradesAutobuyer);

    circuits.rnaUpgradesAutobuyer = circuits.rnaUpgradesAutobuyer.plus(newValue);
    storage.gameData.circuitsUsed = storage.gameData.circuitsUsed.plus(newValue);
    document.getElementById('rnaUpgradesAutomationCircuitsAssigner').value = '';

    document.getElementById("rnaUpgradesAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.rnaUpgradesAutobuyer, 3)} Circuits assigned to RNA Upgrades automation,`;
    document.getElementById("rnaUpgradesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.rnaUpgradesAutobuyer), 3)} FLOPs/s, buying every ${storage.truncateToDecimalPlaces(rnaUpgradesAutobuyerFormula('w'), 3)}s`;
}

export async function rnaUpgradesAutobuyerChecker() {
    if (storage.rootUpgradeFactor.RM10Achieved) {
        if (circuits.rnaUpgradesAutobuyer.lessThan(new Decimal(1))) {
            document.getElementById('rnaUpgradesAutomationFLOPSCounter').innerHTML = `computing 0 FLOPs/s, buying every ∞s.`;
            return;
        }
        if (circuits.rnaUpgradesAutobuyer.lessThan(new Decimal(250000))) {
            document.getElementById("rnaUpgradesAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.rnaUpgradesAutobuyer), 3)} FLOPs/s, buying every ${storage.truncateToDecimalPlaces(rnaUpgradesAutobuyerFormula('w'), 3)}s`;
            //this should calculate the delay for each automation
			const v = rnaUpgradesAutobuyerFormula('v');
            await sleep(v.toNumber());
        }
        else {
            await sleep(100);
        }
		
		if (storage.gameData.rna.greaterThanOrEqualTo(storage.entropyUpgradeFactor.R1Cost)) {
			proteins.buyR1();
		}
		if (storage.gameData.rna.greaterThanOrEqualTo(storage.entropyUpgradeFactor.R2Cost)) {
			proteins.buyR2();
		}
		if (storage.gameData.rna.greaterThanOrEqualTo(storage.entropyUpgradeFactor.R3Cost)) {
			proteins.buyR3();
		}
		if (storage.gameData.rna.greaterThanOrEqualTo(storage.entropyUpgradeFactor.R4Cost)) {
			proteins.buyR4();
		}
		if (storage.gameData.rna.greaterThanOrEqualTo(storage.entropyUpgradeFactor.R5Cost)) {
			proteins.buyR5();
		}
		if (storage.gameData.rna.greaterThanOrEqualTo(storage.entropyUpgradeFactor.R6Cost)) {
			proteins.buyR6();
		}
    }
}

function dnaBlueprintsAutobuyerFormula(type) {
	const x = circuits.dnaBlueprintsAutobuyer;
	const divisor = new Decimal(1.502e7);
	const base = new Decimal(-2);
	let y = (base.pow(x.div(divisor))).plus(new Decimal(101));
	if (x.greaterThanOrEqualTo(new Decimal(1e8))) {
		y = new Decimal(0.1);
	}
	const w = y.clamp(new Decimal(0.1), new Decimal(100));
	const v = w.times(new Decimal(1000));
	if (type === 'w') {
		return w;
	}
	else {
		return v;
	}
}

function updateDNABlueprintsAutobuyerCircuits() {
    let newValue = new Decimal(document.getElementById("dnaBlueprintsAutomationCircuitsAssigner").value);
    if (newValue.greaterThanOrEqualTo(storage.gameData.circuits)) {
        newValue = storage.gameData.circuits;
    }
    else if (newValue.greaterThanOrEqualTo(new Decimal(1e8))) {
        newValue = new Decimal(1e8);
    }

    newValue = newValue.minus(circuits.dnaBlueprintsAutobuyer);

    circuits.dnaBlueprintsAutobuyer = circuits.dnaBlueprintsAutobuyer.plus(newValue);
    storage.gameData.circuitsUsed = storage.gameData.circuitsUsed.plus(newValue);
    document.getElementById('dnaBlueprintsAutomationCircuitsAssigner').value = '';

    document.getElementById("dnaBlueprintsAutomationCircuitsCounter").innerHTML = `You currently have ${storage.truncateToDecimalPlaces(circuits.dnaBlueprintsAutobuyer, 3)} Circuits assigned to DNA Blueprint &amp; Protein automation,`;
    document.getElementById("dnaBlueprintsAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.dnaBlueprintsAutobuyer), 3)} FLOPs/s, making every ${storage.truncateToDecimalPlaces(dnaBlueprintsAutobuyerFormula('w'), 3)}s`;
}

export async function dnaBlueprintsAutobuyerChecker() {
    if (storage.rootUpgradeFactor.RM11Achieved) {
		if ((!storage.entropyUpgradeFactor.isLoadingProteinPreset) || (storage.entropyUpgradeFactor.currentlyLoadedProteinPreset.length < 1)) {
			return;
		}

        if (circuits.dnaBlueprintsAutobuyer.lessThan(new Decimal(1))) {
            document.getElementById('dnaBlueprintsAutomationFLOPSCounter').innerHTML = `computing 0 FLOPs/s, buying every ∞s.`;
            return;
        }
        if (circuits.dnaBlueprintsAutobuyer.lessThan(new Decimal(1e8))) {
            document.getElementById("dnaBlueprintsAutomationFLOPSCounter").innerHTML = `computing ${storage.truncateToDecimalPlaces(flopsFormula(circuits.dnaBlueprintsAutobuyer), 3)} FLOPs/s, making every ${storage.truncateToDecimalPlaces(dnaBlueprintsAutobuyerFormula('w'), 3)}s`;
            //this should calculate the delay for each automation
			const v = dnaBlueprintsAutobuyerFormula('v');
            await sleep(v.toNumber());
        }
        else {
            await sleep(100);
        }
		proteins.checkDNABlueprints();
		proteins.autoRuBisCo(storage.entropyUpgradeFactor.currentlyLoadedProteinPreset[0]);
		proteins.autoExtensin(storage.entropyUpgradeFactor.currentlyLoadedProteinPreset[1]);
		proteins.autoArganine(storage.entropyUpgradeFactor.currentlyLoadedProteinPreset[2]);
		proteins.autoGlutamine(storage.entropyUpgradeFactor.currentlyLoadedProteinPreset[3]);
		proteins.autoGlutamate(storage.entropyUpgradeFactor.currentlyLoadedProteinPreset[4]);
		proteins.autoAsparagine(storage.entropyUpgradeFactor.currentlyLoadedProteinPreset[5]);
		proteins.autoAGP(storage.entropyUpgradeFactor.currentlyLoadedProteinPreset[6]);
		proteins.autoTRB(storage.entropyUpgradeFactor.currentlyLoadedProteinPreset[7]);
		
		//stops the autobuyer automatically
		if ((storage.gameData.dnaBlueprintsTotal.greaterThan(storage.gameData.dnaBlueprints.plus(new Decimal(50)))) && (storage.gameData.dnaBlueprintBulk.greaterThan(storage.gameData.dnaBlueprints))) {
			storage.entropyUpgradeFactor.currentlyLoadedProteinPreset = [];
			storage.entropyUpgradeFactor.isLoadingProteinPreset = false;
			document.getElementById(`proteinPreset${storage.entropyUpgradeFactor.currentlyLoadedProteinPresetID}Running`).innerHTML = "STOPPED";
			document.getElementById(`proteinPreset${storage.entropyUpgradeFactor.currentlyLoadedProteinPresetID}Running`).classList.remove("softcap5");
			document.getElementById(`proteinPreset${storage.entropyUpgradeFactor.currentlyLoadedProteinPresetID}Running`).classList.add("softcap");
			storage.entropyUpgradeFactor.currentlyLoadedProteinPresetID = null;
			return;
		}
    }
}

function respecCircuits() {
    circuits.upgradeAutobuyer = new Decimal(0);
    circuits.composterAutobuyer = new Decimal(0);
    circuits.bacteriaTypesAutobuyer = new Decimal(0);
    circuits.cellUpgradesAutobuyer = new Decimal(0);
    circuits.mossUpgradesAutobuyer = new Decimal(0);
    circuits.bacteriaUpgradesAutobuyer = new Decimal(0);
    circuits.rnaUpgradesAutobuyer = new Decimal(0);
    document.getElementById("upgradeAutomationCircuitsCounter").innerHTML = `You currently have 0 Circuits assigned to Upgrade automation,`;
    document.getElementById("upgradeAutomationFLOPSCounter").innerHTML = `computing 0 FLOPs/s.`;
    document.getElementById("composterAutomationCircuitsCounter").innerHTML = `You currently have 0 Circuits assigned to Composter automation,`;
    document.getElementById("composterAutomationFLOPSCounter").innerHTML = `computing 0 FLOPs/s, composting every ∞s`;
    document.getElementById("bacteriaTypesAutomationCircuitsCounter").innerHTML = `You currently have 0 Circuits assigned to Bacteria Types automation,`;
    document.getElementById("bacteriaTypesAutomationFLOPSCounter").innerHTML = `computing 0 FLOPs/s, resetting every ∞s`;
    document.getElementById("cellUpgradesAutomationCircuitsCounter").innerHTML = `You currently have 0 Circuits assigned to Cell Upgrades automation,`;
    document.getElementById("cellUpgradesAutomationFLOPSCounter").innerHTML = `computing 0 FLOPs/s, buying every ∞s`;
    document.getElementById("mossUpgradesAutomationCircuitsCounter").innerHTML = `You currently have 0 Circuits assigned to Moss Upgrades automation,`;
    document.getElementById("mossUpgradesAutomationFLOPSCounter").innerHTML = `computing 0 FLOPs/s, buying every ∞s`;
    document.getElementById("bacteriaUpgradesAutomationCircuitsCounter").innerHTML = `You currently have 0 Circuits assigned to Bacteria Upgrades automation,`;
    document.getElementById("bacteriaUpgradesAutomationFLOPSCounter").innerHTML = `computing 0 FLOPs/s, buying every ∞s`;
    document.getElementById("rnaUpgradesAutomationCircuitsCounter").innerHTML = `You currently have 0 Circuits assigned to RNA Upgrades automation,`;
    document.getElementById("rnaUpgradesAutomationFLOPSCounter").innerHTML = `computing 0 FLOPs/s, buying every ∞s`;
    document.getElementById("dnaBlueprintsAutomationCircuitsCounter").innerHTML = `You currently have 0 Circuits assigned to DNA Blueprint &amp; Protein automation,`;
    document.getElementById("dnaBlueprintsAutomationFLOPSCounter").innerHTML = `computing 0 FLOPs/s, making every ∞s`;
    storage.gameData.circuitsUsed = new Decimal(0);
    storage.gameData.circuits = storage.gameData.highestCircuits;
}

document.getElementById("upgradeAutomationCircuitsAssigner").addEventListener("change", updateAutobuyerCircuits);
document.getElementById("composterAutomationCircuitsAssigner").addEventListener("change", updateComposterAutobuyerCircuits);
document.getElementById("bacteriaTypesAutomationCircuitsAssigner").addEventListener("change", updateBacteriaTypesAutobuyerCircuits);
document.getElementById("cellUpgradesAutomationCircuitsAssigner").addEventListener("change", updateCellUpgradesAutobuyerCircuits);
document.getElementById("mossUpgradesAutomationCircuitsAssigner").addEventListener("change", updateMossUpgradesAutobuyerCircuits);
document.getElementById("bacteriaUpgradesAutomationCircuitsAssigner").addEventListener("change", updateBacteriaUpgradesAutobuyerCircuits);
document.getElementById("rnaUpgradesAutomationCircuitsAssigner").addEventListener("change", updateRNAUpgradesAutobuyerCircuits);
document.getElementById("dnaBlueprintsAutomationCircuitsAssigner").addEventListener("change", updateDNABlueprintsAutobuyerCircuits);
document.getElementById("respecCircuits").addEventListener("click", respecCircuits);
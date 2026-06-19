import * as storage from './core/bunchobullshit.mjs'
import * as cellularLab from './cellularlab.mjs'
import { achievements } from './achievements.mjs';

export function resetCells() {
    storage.gameData.bacteriaTypes = storage.gameData.bacteriaTypes.plus(storage.gameData.bacteriaTypesBulk);
    cellularLab.resetCells();
	var x = new Decimal(1.79e308).pow(storage.gameData.bacteriaTypes.plus(storage.gameData.bacteriaTypesBulk));
	if (storage.gameData.bacteriaTypes.gte(new Decimal(100))) {
		let totalBase = new Decimal(1.79e308);
		let operations = ((storage.gameData.bacteriaTypes.div(new Decimal(100))).trunc()).toNumber();
		
		for (let i = 0; i < operations; i++) {
			const y = storage.gameData.bacteriaTypes.minus(new Decimal(i + 1).times(new Decimal(100)));
			const z = y.div(new Decimal(10));
			const w = z.plus(new Decimal(1));
			const v = new Decimal(1.79e308).pow(w);
			if (i < 1) {
				totalBase = v;
			}
			else {
				const power = (new Decimal(i + 1).div(new Decimal(5))).plus(new Decimal(1));
				totalBase = totalBase.times(v.pow(power));
				achievements.ach141 = true;
			}
			
		}
		x = totalBase.pow(storage.gameData.bacteriaTypes.plus(storage.gameData.bacteriaTypesBulk));
		
		document.getElementById("bacteriaTypesScaling").style.display = "block";
		document.getElementById("cellsIsCapped").style.display = "none";
		achievements.ach112 = true;
	}
    storage.gameData.cellsCap = x;
    document.getElementById('bacteriaTypesCounter').innerHTML = `You have created ${storage.truncateToDecimalPlaces(storage.gameData.bacteriaTypes, 3)} Bacteria Types, capping Cell count at ${storage.truncateToDecimalPlaces(storage.gameData.cellsCap, 3)}`;
    document.querySelector('.buttons-bacteria-tab-color').style.visibility = 'visible';
    document.getElementById('cellsIsCapped').style.display = 'none';
    document.getElementById('bacteriaResetButton').style.display = 'none';
    achievements.ach55 = true;
}

document.getElementById('bacteriaResetButton').addEventListener("click", resetCells);

export function bacteriaCalculation() {
    //more spooky numbers
    const x = new Decimal(0.015625);
    const y = x.times(storage.gameData.treeAge.pow(new Decimal(0.060206)));
    const z = new Decimal(100).pow(storage.gameData.bacteriaTypes.minus(new Decimal(1)));
    storage.gameData.bacteriaCap = z.times(storage.gameData.bacteriaCapMult)
	if (storage.gameData.stormLevel.gt(new Decimal(1))) {
        const w = x.times(storage.gameData.treeAge.pow(new Decimal(0.0752575)));
        var v = w.times(storage.gameData.bacteriaMult);
	}
	if (storage.gameData.isInChallengeBlizzard) {
		v = new Decimal(1);
	}
	var a = y.times(storage.gameData.bacteriaMult);
	storage.gameData.bacteria = a.pow(storage.gameData.bacteriaPow).clamp(new Decimal(0), storage.gameData.bacteriaCap);
	
    if (storage.gameData.stormLevel.gt(new Decimal(1))) {
        document.getElementById('bacteriaCounter').innerHTML = `You have ${storage.truncateToDecimalPlaces(storage.gameData.bacteria, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.bacteriaCap, 3)} Bacteria (x2 every 1e4 Tree Age starting at 1e24 Tree Age)`;
    }
    else {
        document.getElementById('bacteriaCounter').innerHTML = `You have ${storage.truncateToDecimalPlaces(storage.gameData.bacteria, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.bacteriaCap, 3)} Bacteria (x2 every 1e5 Tree Age starting at 1e30 Tree Age)`;
    }
    document.getElementById('bacteriaTypeCounterButActual').innerHTML = `You have a total of ${storage.truncateToDecimalPlaces(storage.gameData.bacteriaTypes, 3)} Bacteria Types, boosting the Bacteria cap by x${storage.truncateToDecimalPlaces(z, 3)}`;

    const w = storage.gameData.bacteria;
    if (w.lt(new Decimal(0.0001))) {
        storage.gameData.bacteriaCellsCSMult = new Decimal(1);
        storage.gameData.bacteriaFertilizerMult = new Decimal(0);
        document.getElementById('bacteriaEffectCounter').innerHTML = `Your current Bacteria boosts the base Fertilizer effectiveness by +0, and Cell Replication and Composting speeds by x1.`;
    }
    else {
        const z = storage.gameData.bacteria.pow(new Decimal(0.875061)).clamp(new Decimal(1), new Decimal(Infinity));;
        storage.gameData.bacteriaCellsCSMult = z;
        const v = Decimal.ln(w).plus(new Decimal(10));
        const u = Decimal.log10(v);
        const t = Decimal.log10(u.plus(new Decimal(1))).clamp(new Decimal(0), new Decimal(Infinity));
        storage.gameData.bacteriaFertilizerMult = t;
        document.getElementById('bacteriaEffectCounter').innerHTML = `Your current Bacteria boosts the base Fertilizer effectiveness by +${storage.truncateToDecimalPlaces(storage.gameData.bacteriaFertilizerMult, 3)}, and Cell Replication and Composting speeds by x${storage.truncateToDecimalPlaces(storage.gameData.bacteriaCellsCSMult, 3)}.`;
    }
}

export function B1() {
	buyB1();
}
function buyB1() {
    if (storage.gameData.bacteria.gte(storage.entropyUpgradeFactor.B1Cost)) {
		if (storage.entropyUpgradeFactor.B1Amount.gte(new Decimal(200))) {
			storage.entropyUpgradeFactor.B1Cost = storage.entropyUpgradeFactor.B1Cost.pow(new Decimal(1.01));
		}
        storage.entropyUpgradeFactor.B1Cost = storage.entropyUpgradeFactor.B1Cost.times(new Decimal(3));
        storage.entropyUpgradeFactor.B1Amount = storage.entropyUpgradeFactor.B1Amount.plus(new Decimal(1));
        storage.entropyUpgradeFactor.B1Effect = storage.entropyUpgradeFactor.B1Amount;

        document.getElementById('B1').innerHTML = `Free Fertilizers (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.B1Amount.trunc(), 3)})<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.B1Cost, 3)} Bacteria<br>Effect: +${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.B1Effect, 3)} Fertilizers to all Composters`;
    }
}
export function B2() {
	buyB2();
}
function buyB2() {
    if (storage.gameData.bacteria.gte(storage.entropyUpgradeFactor.B2Cost)) {
        storage.entropyUpgradeFactor.B2Cost = storage.entropyUpgradeFactor.B2Cost.pow(new Decimal(2.5));
        storage.entropyUpgradeFactor.B2Amount = storage.entropyUpgradeFactor.B2Amount.plus(new Decimal(1));
        storage.entropyUpgradeFactor.B2Effect = storage.entropyUpgradeFactor.B2Amount.times(new Decimal(0.01));
		if (storage.entropyUpgradeFactor.B2Amount.gte(new Decimal(10))) {
			storage.entropyUpgradeFactor.B2Cost = new Decimal(Infinity);
		}

        document.getElementById('B2').innerHTML = `Softcap Dampener (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.B2Amount.trunc(), 3)} / 10)<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.B2Cost, 3)} Bacteria<br>Effect: -${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.B2Effect, 3)} to Leaf softcap root`;
    }
}
export function B3() {
	buyB3();
}
function buyB3() {
    if (storage.gameData.roots.gte(storage.entropyUpgradeFactor.B3Cost)) {
        storage.entropyUpgradeFactor.B3Cost = storage.entropyUpgradeFactor.B3Cost.times(new Decimal(1.5));
        storage.entropyUpgradeFactor.B3Amount = storage.entropyUpgradeFactor.B3Amount.plus(new Decimal(1));
        storage.entropyUpgradeFactor.B3Effect = new Decimal(1e3).pow(storage.entropyUpgradeFactor.B3Amount);

        document.getElementById('B3').innerHTML = `Cleanroom (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.B3Amount.trunc(), 3)})<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.B3Cost, 3)} Roots<br>Effect: x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.B3Effect, 3)} Bacteria`;
    }
}

document.getElementById("B1").addEventListener("click", B1);
document.getElementById("B2").addEventListener("click", B2);
document.getElementById("B3").addEventListener("click", B3);
import * as storage from './core/bunchobullshit.mjs'
import { achievements, massAchievementChecker } from './achievements.mjs'

export function cellsCalculation() {
    if (storage.entropyUpgradeFactor.E1Bought) {
        if (storage.gameData.cells.lessThan(new Decimal(1))) {
            storage.gameData.cells = new Decimal(1);
        }

        var x = storage.gameData.cellsInterval;
        if (storage.gameData.overpopulationFactor.greaterThanOrEqualTo(new Decimal(2))) {
            x = x.times(storage.gameData.overpopulationFactor);
            x = x.times(storage.gameData.intervalDivision);
			x = x.times(new Decimal(1).div(storage.gameData.cellsMult));
            document.getElementById('overpopulation').style.visibility = 'visible';
            document.getElementById('overpopulation').innerHTML = `Due to overpopulation, x${storage.truncateToDecimalPlaces(storage.gameData.overpopulationFactor, 3)} Replication Interval`;
            document.getElementById('replicationInterval').innerHTML = `Decrease Replication Interval (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.C2Amount, 3)})<br>Cost: ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.C2Cost.trunc(), 3)} Fruits<br>Currently ${storage.truncateToDecimalPlaces(x, 3)}ms`;
        }
        else {
            x = x.times(storage.gameData.intervalDivision);
			x = x.times(new Decimal(1).div(storage.gameData.cellsMult));
            document.getElementById('overpopulation').style.visibility = 'hidden';
            document.getElementById('replicationInterval').innerHTML = `Decrease Replication Interval (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.C2Amount, 3)})<br>Cost: ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.C2Cost.trunc(), 3)} Fruits<br>Currently ${storage.truncateToDecimalPlaces(x, 3)}ms`;
        }
        const y = storage.gameData.cellsReplicationChance;
        const z = storage.gameData.cellsReplicationAmount;

        const w = new Decimal(1).div(x);
        const v = w.times(y.times(z));
        const u = new Decimal(2).pow(v);
		const clampingConstant = storage.gameData.cellsReplicationCap.pow(new Decimal(0.1));
		const t = u.clamp(new Decimal(1), clampingConstant);
        var s = t;
		if (storage.gameData.isInChallengeBlizzard) {
			s = new Decimal(1);
		}

        storage.gameData.cells = storage.gameData.cells.times(s);

        //spooky number found with desmos
        //x^0.0150515 gives integers at x = e20^n 
        
        const r = storage.gameData.cells.pow(new Decimal(0.0150515));
        var q = r.clamp(storage.gameData.baseOverpopulationFactor, new Decimal(Infinity));
		if (storage.entropyUpgradeFactor.agp.greaterThanOrEqualTo(new Decimal(1))) {
			q = q.pow(storage.entropyUpgradeFactor.agpEffect);
		}
        storage.gameData.overpopulationFactor = q;

        document.getElementById('cellsCounter').innerHTML = `You have created ${storage.truncateToDecimalPlaces(storage.gameData.cells, 3)} Cells (x${storage.truncateToDecimalPlaces(s.pow(new Decimal(10)), 3)}/s),`

        storage.gameData.cellsLeafEffect = ((new Decimal(2).times(Decimal.log2(storage.gameData.cells.plus(new Decimal(1))))).plus(new Decimal(1))).times(storage.gameData.cellsEffectMult);
        storage.gameData.cellsSeedEffect = ((Decimal.log2(storage.gameData.cells.plus(new Decimal(1)))).plus(new Decimal(1))).times(storage.gameData.cellsEffectMult.pow(new Decimal(0.5)));
        storage.gameData.cellsFruitEffect = ((new Decimal(0.5).times(Decimal.log2(storage.gameData.cells.plus(new Decimal(1))))).plus(new Decimal(1))).times(storage.gameData.cellsEffectMult.pow(new Decimal(0.25)));
        document.getElementById('cellsEffectCounter').innerHTML = `x${storage.truncateToDecimalPlaces(storage.gameData.cellsLeafEffect, 3)}, x${storage.truncateToDecimalPlaces(storage.gameData.cellsSeedEffect, 3)}, and x${storage.truncateToDecimalPlaces(storage.gameData.cellsFruitEffect, 3)}`
		
		if (storage.gameData.cells.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 100000))) {
			achievements.ach125 = true;
		}
    }
}
export function C1() {
	let bulk = storage.gameData.cellUpgradesBulk.toNumber();
	for (let i = 0; i < bulk; i++) {
		buyC1();
	}
}
function buyC1() {
    if (storage.gameData.entropy.greaterThanOrEqualTo(storage.entropyUpgradeFactor.C1Cost.trunc())) {
        storage.gameData.entropy = storage.gameData.entropy.minus(storage.entropyUpgradeFactor.C1Cost.trunc());
        document.getElementById('entropyCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.entropy, 3)}`;
        storage.entropyUpgradeFactor.C1Cost = storage.entropyUpgradeFactor.C1Cost.times(storage.entropyUpgradeFactor.C1Increase);
        storage.entropyUpgradeFactor.C1Amount = storage.entropyUpgradeFactor.C1Amount.plus(new Decimal(1));

        storage.gameData.cellsReplicationChance = new Decimal(0.01).times(storage.entropyUpgradeFactor.C1Amount);

        document.getElementById('replicationChance').innerHTML = `Increase Replication Chance (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.C1Amount, 3)})<br>Cost: ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.C1Cost.trunc(), 3)} Entropy<br>Currently ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.C1Amount.plus(new Decimal(1)), 3)}%`;
    }
}
export function C2() {
	let bulk = storage.gameData.cellUpgradesBulk.toNumber();
	for (let i = 0; i < bulk; i++) {
		buyC2();
	}
}
function buyC2() {
    if (storage.gameData.fruits.greaterThanOrEqualTo(storage.entropyUpgradeFactor.C2Cost.trunc())) {
        storage.gameData.fruits = storage.gameData.fruits.minus(storage.entropyUpgradeFactor.C2Cost.trunc());
        document.getElementById('fruitCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.fruits, 3)}`;
        storage.entropyUpgradeFactor.C2Cost = storage.entropyUpgradeFactor.C2Cost.times(storage.entropyUpgradeFactor.C2Increase);
        storage.entropyUpgradeFactor.C2Amount = storage.entropyUpgradeFactor.C2Amount.plus(new Decimal(1));
		
		if (storage.entropyUpgradeFactor.E20Bought) {storage.gameData.cellsInterval = new Decimal(1000).div(storage.entropyUpgradeFactor.C2Amount.plus(storage.entropyUpgradeFactor.C3Amount.plus(new Decimal(1))));}
		else {storage.gameData.cellsInterval = new Decimal(1000).div(storage.entropyUpgradeFactor.C2Amount.plus(new Decimal(1)));}

        document.getElementById('replicationInterval').innerHTML = `Decrease Replication Interval (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.C2Amount, 3)})<br>Cost: ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.C2Cost.trunc(), 3)} Fruits<br>Currently ${storage.truncateToDecimalPlaces(storage.gameData.cellsInterval, 3)}ms`;
    }
}
export function C3() {
	let bulk = storage.gameData.cellUpgradesBulk.toNumber();
	for (let i = 0; i < bulk; i++) {
		buyC3();
	}
}
function buyC3() {
    if (storage.gameData.entropy.greaterThanOrEqualTo(storage.entropyUpgradeFactor.C3Cost.trunc())) {
        storage.gameData.entropy = storage.gameData.entropy.minus(storage.entropyUpgradeFactor.C3Cost.trunc());
        document.getElementById('entropyCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.entropy, 3)}`;
        storage.entropyUpgradeFactor.C3Cost = storage.entropyUpgradeFactor.C3Cost.times(storage.entropyUpgradeFactor.C3Increase);
        storage.entropyUpgradeFactor.C3Amount = storage.entropyUpgradeFactor.C3Amount.plus(new Decimal(1));

        storage.gameData.cellsReplicationAmount = new Decimal(2).pow(storage.entropyUpgradeFactor.C3Amount);

        document.getElementById('replicationAmount').innerHTML = `Increase Replication Amount (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.C3Amount, 3)})<br>Cost: ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.C3Cost.trunc(), 3)} Entropy<br>Currently ${storage.truncateToDecimalPlaces((new Decimal(2).pow(storage.entropyUpgradeFactor.C3Amount)), 3)}x`;
    }
}

export function resetCells() {
    storage.gameData.highestCells = storage.gameData.cells;
	if (storage.rootUpgradeFactor.RM6Achieved) {
		storage.gameData.cells = storage.gameData.cells.pow(new Decimal(0.75));
		return;
	}
    storage.gameData.cells = new Decimal(1);
}

export function bacteriaChecker() {
    if (storage.gameData.cells.greaterThanOrEqualTo(storage.gameData.cellsCap)) {
        storage.gameData.cells = storage.gameData.cellsCap;
        document.getElementById('cellsIsCapped').style.display = 'inline-block';
        document.getElementById('bacteriaResetButton').style.display = 'inline-block';
    }
    else {
        document.getElementById('cellsIsCapped').style.display = 'none';
        document.getElementById('bacteriaResetButton').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("resetCells").addEventListener("click", resetCells);
    document.getElementById("replicationChance").addEventListener("click", C1);
    document.getElementById("replicationInterval").addEventListener("click", C2);
    document.getElementById("replicationAmount").addEventListener("click", C3);
});
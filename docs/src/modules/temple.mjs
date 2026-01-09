import * as storage from './core/bunchobullshit.mjs';

export var functions = {};
export var repeatableAutomationFactor = {
    LR1: new Decimal(1e15),
    LR2: new Decimal(1e100),
	
    SR1: new Decimal(1e25),
    SR2: new Decimal(1e200),
	
    FR1: new Decimal(1e50),
};
export var repeatableUpgradeFactor = {
	LR1Unlocked: true,
    LR1: new Decimal(0),
    LR1Cap: new Decimal(10),
    LR1Effect: new Decimal(2),
	LR2Unlocked: false,
    LR2: new Decimal(0),
    LR2Cap: new Decimal(10),
    LR2Effect: new Decimal(0.05),
	
	SR1Unlocked: true,
    SR1: new Decimal(0),
    SR1Cap: new Decimal(10),
    SR1Effect: new Decimal(4),
	SR2Unlocked: false,
    SR2: new Decimal(0),
    SR2Cap: new Decimal(10),
    SR2Effect: new Decimal(1.5),
	
	FR1Unlocked: true,
    FR1: new Decimal(0),
    FR1Cap: new Decimal(10),
    FR1Effect: new Decimal(1),
};
export function updateRepeatableUpgradeFactor(newData) {
    repeatableUpgradeFactor = newData;
}

export function repeatableUnlocks() {
	if (repeatableUpgradeFactor.LR1.greaterThanOrEqualTo(new Decimal(100))) {
		repeatableUpgradeFactor.LR2Unlocked = true;
		document.getElementById("LR2").style.display = `inline-block`;
	}
	if (repeatableUpgradeFactor.SR1.greaterThanOrEqualTo(new Decimal(100))) {
		repeatableUpgradeFactor.SR2Unlocked = true;
		document.getElementById("SR2").style.display = `inline-block`;
	}
}

export function LR1CostCalculation() {
    const x = repeatableUpgradeFactor.LR1;
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.LR1Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.5).times(x.pow(new Decimal(2)));
    const z = new Decimal(4).times(x);
    const w = new Decimal(500);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u;
}
function LR1() {
    if (storage.gameData.leaves.greaterThanOrEqualTo(LR1CostCalculation())) {
        storage.gameData.leaves = storage.gameData.leaves.minus(LR1CostCalculation());
        repeatableUpgradeFactor.LR1 = repeatableUpgradeFactor.LR1.plus(new Decimal(1));
        document.getElementById('pleaseWork').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.leaves, 3)} Leaves`;
    }
}

document.getElementById("LR1").addEventListener("click", LR1);

export function LR2CostCalculation() {
    const x = repeatableUpgradeFactor.LR2;
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.LR2Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.85).times(x.pow(new Decimal(2.5)));
    const z = new Decimal(4).times(x);
    const w = new Decimal(5800);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u;
}
function LR2() {
	if (repeatableUpgradeFactor.LR2Unlocked) {
		if (storage.gameData.leaves.greaterThanOrEqualTo(LR2CostCalculation())) {
			storage.gameData.leaves = storage.gameData.leaves.minus(LR2CostCalculation());
			repeatableUpgradeFactor.LR2 = repeatableUpgradeFactor.LR2.plus(new Decimal(1));
			document.getElementById('pleaseWork').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.leaves, 3)} Leaves`;
		}
	}
}

document.getElementById("LR2").addEventListener("click", LR2);

export function SR1CostCalculation() {
    const x = repeatableUpgradeFactor.SR1;
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.SR1Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.5).times(x.pow(new Decimal(2)));
    const z = new Decimal(4).times(x);
    const w = new Decimal(1000);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u;
}
function SR1() {
    if (storage.gameData.seeds.greaterThanOrEqualTo(SR1CostCalculation())) {
        storage.gameData.seeds = storage.gameData.seeds.minus(SR1CostCalculation());
        repeatableUpgradeFactor.SR1 = repeatableUpgradeFactor.SR1.plus(new Decimal(1));
        document.getElementById('seedCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.seeds, 3)} Seeds`;
    }
}

document.getElementById("SR1").addEventListener("click", SR1);

export function SR2CostCalculation() {
    const x = repeatableUpgradeFactor.SR2;
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.SR2Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.5).times(x.pow(new Decimal(2)));
    const z = new Decimal(8).times(x);
    const w = new Decimal(8000);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u;
}
function SR2() {
    if (storage.gameData.seeds.greaterThanOrEqualTo(SR2CostCalculation())) {
        storage.gameData.seeds = storage.gameData.seeds.minus(SR2CostCalculation());
        repeatableUpgradeFactor.SR2 = repeatableUpgradeFactor.SR2.plus(new Decimal(1));
        document.getElementById('seedCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.seeds, 3)} Seeds`;
    }
}

document.getElementById("SR2").addEventListener("click", SR2);

export function FR1CostCalculation() {
    const x = repeatableUpgradeFactor.FR1;
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.FR1Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.5).times(x.pow(new Decimal(2)));
    const z = new Decimal(4).times(x);
    const w = new Decimal(1000);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u;
}
function FR1() {
    if (storage.gameData.fruits.greaterThanOrEqualTo(FR1CostCalculation())) {
        storage.gameData.fruits = storage.gameData.fruits.minus(FR1CostCalculation());
        repeatableUpgradeFactor.FR1 = repeatableUpgradeFactor.FR1.plus(new Decimal(1));
        document.getElementById('fruitCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.fruits, 3)} Fruits`;
    }
}

document.getElementById("FR1").addEventListener("click", FR1);

document.addEventListener('DOMContentLoaded', () => {
    functions.LR1 = LR1;
    functions.LR2 = LR2;
	
    functions.SR1 = SR1;
    functions.SR2 = SR2;
	
    functions.FR1 = FR1;
});
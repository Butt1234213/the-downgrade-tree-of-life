import * as storage from './core/bunchobullshit.mjs';

export var functions = {};
export var repeatableAutomationFactor = {
    LR1: new Decimal(1e15),
    LR2: new Decimal(1e100),
    LR3: new Decimal.fromComponents(1, 1, 1000),
	
    SR1: new Decimal(1e25),
    SR2: new Decimal(1e200),
    SR3: new Decimal.fromComponents(1, 1, 2000),
	
    FR1: new Decimal(1e50),
    FR2: new Decimal.fromComponents(1, 1, 500),
    FR3: new Decimal.fromComponents(1, 1, 5000),
	
    ER1: new Decimal(1e100),
};
export var repeatableUpgradeFactor = {
    repeatableUpgradesBulk: new Decimal(1),
	repeatableUpgradeDiscount: new Decimal(1),
	
	LR1Unlocked: true,
    LR1: new Decimal(0),
    LR1Cap: new Decimal(10),
    LR1Effect: new Decimal(2),
	LR2Unlocked: false,
    LR2: new Decimal(0),
    LR2Cap: new Decimal(10),
    LR2Effect: new Decimal(0.05),
	LR3Unlocked: false,
    LR3: new Decimal(0),
    LR3Cap: new Decimal(10),
    LR3Effect: new Decimal(1.1),
	
	SR1Unlocked: true,
    SR1: new Decimal(0),
    SR1Cap: new Decimal(10),
    SR1Effect: new Decimal(4),
	SR2Unlocked: false,
    SR2: new Decimal(0),
    SR2Cap: new Decimal(10),
    SR2Effect: new Decimal(1.5),
	SR3Unlocked: false,
    SR3: new Decimal(0),
    SR3Cap: new Decimal(10),
    SR3Effect: new Decimal(0.005),
	
	FR1Unlocked: true,
    FR1: new Decimal(0),
    FR1Cap: new Decimal(10),
    FR1Effect: new Decimal(1),
	FR2Unlocked: false,
    FR2: new Decimal(0),
    FR2Cap: new Decimal(10),
    FR2Effect: new Decimal(0.005),
    FR3: new Decimal(0),
    FR3Cap: new Decimal(10),
    FR3Effect: new Decimal(5),
	
	ER1Unlocked: true,
    ER1: new Decimal(0),
    ER1Cap: new Decimal(10),
    ER1Effect: new Decimal(0.008),
};
export function updateRepeatableUpgradeFactor(newData) {
    repeatableUpgradeFactor = newData;
}
export function productOfAllCaps() {
	let base = new Decimal(1)
	for (let i = 0; i < 3; i++) {
		if (repeatableUpgradeFactor[`LR${i}Unlocked`]) {
			base = base.times(repeatableUpgradeFactor[`LR${i}Cap`])
		}
	}
	for (let i = 0; i < 3; i++) {
		if (repeatableUpgradeFactor[`SR${i}Unlocked`]) {
			base = base.times(repeatableUpgradeFactor[`SR${i}Cap`])
		}
	}
	for (let i = 0; i < 3; i++) {
		if (repeatableUpgradeFactor[`FR${i}Unlocked`]) {
			base = base.times(repeatableUpgradeFactor[`FR${i}Cap`])
		}
	}
	for (let i = 0; i < 1; i++) {
		if (repeatableUpgradeFactor[`ER${i}Unlocked`]) {
			base = base.times(repeatableUpgradeFactor[`ER${i}Cap`])
		}
	}
	return base;
}

export function repeatableUnlocks() {
	if (repeatableUpgradeFactor.LR1.greaterThanOrEqualTo(new Decimal(100))) {
		repeatableUpgradeFactor.LR2Unlocked = true;
		document.getElementById("LR2").style.display = `inline-block`;
	}
	else {
		repeatableUpgradeFactor.LR2Unlocked = false;
	}
	if (repeatableUpgradeFactor.LR2.greaterThanOrEqualTo(new Decimal(100))) {
		repeatableUpgradeFactor.LR3Unlocked = true;
		document.getElementById("LR3").style.display = `inline-block`;
	}
	else {
		repeatableUpgradeFactor.LR3Unlocked = false;
	}
	
	if (repeatableUpgradeFactor.SR1.greaterThanOrEqualTo(new Decimal(100))) {
		repeatableUpgradeFactor.SR2Unlocked = true;
		document.getElementById("SR2").style.display = `inline-block`;
	}
	else {
		repeatableUpgradeFactor.SR2Unlocked = false;
	}
	if (repeatableUpgradeFactor.SR2.greaterThanOrEqualTo(new Decimal(100))) {
		repeatableUpgradeFactor.SR3Unlocked = true;
		document.getElementById("SR3").style.display = `inline-block`;
	}
	else {
		repeatableUpgradeFactor.SR3Unlocked = false;
	}
	
	if (repeatableUpgradeFactor.FR1.greaterThanOrEqualTo(new Decimal(100))) {
		repeatableUpgradeFactor.FR2Unlocked = true;
		document.getElementById("FR2").style.display = `inline-block`;
	}
	else {
		repeatableUpgradeFactor.FR2Unlocked = false;
	}
	if (repeatableUpgradeFactor.FR2.greaterThanOrEqualTo(new Decimal(100))) {
		repeatableUpgradeFactor.FR3Unlocked = true;
		document.getElementById("FR3").style.display = `inline-block`;
	}
	else {
		repeatableUpgradeFactor.FR3Unlocked = false;
	}
}

export function LR1CostCalculation() {
    const x = repeatableUpgradeFactor.LR1.plus(repeatableUpgradeFactor.repeatableUpgradesBulk.minus(new Decimal(1)));
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.LR1Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.5).times(x.pow(new Decimal(2)));
    const z = new Decimal(4).times(x);
    const w = new Decimal(500);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u.pow(repeatableUpgradeFactor.repeatableUpgradeDiscount);
}
function LR1() {
    if (storage.gameData.leaves.greaterThanOrEqualTo(LR1CostCalculation())) {
        storage.gameData.leaves = storage.gameData.leaves.minus(LR1CostCalculation());
        repeatableUpgradeFactor.LR1 = repeatableUpgradeFactor.LR1.plus(repeatableUpgradeFactor.repeatableUpgradesBulk);
        document.getElementById('pleaseWork').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.leaves, 3)}`;
    }
}

document.getElementById("LR1").addEventListener("click", LR1);

export function LR2CostCalculation() {
    const x = repeatableUpgradeFactor.LR2.plus(repeatableUpgradeFactor.repeatableUpgradesBulk.minus(new Decimal(1)));
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.LR2Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.85).times(x.pow(new Decimal(2.5)));
    const z = new Decimal(4).times(x);
    const w = new Decimal(5800);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u.pow(repeatableUpgradeFactor.repeatableUpgradeDiscount);
}
function LR2() {
	if (repeatableUpgradeFactor.LR2Unlocked) {
		if (storage.gameData.leaves.greaterThanOrEqualTo(LR2CostCalculation())) {
			storage.gameData.leaves = storage.gameData.leaves.minus(LR2CostCalculation());
			repeatableUpgradeFactor.LR2 = repeatableUpgradeFactor.LR2.plus(repeatableUpgradeFactor.repeatableUpgradesBulk);
			document.getElementById('pleaseWork').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.leaves, 3)}`;
		}
	}
}

document.getElementById("LR2").addEventListener("click", LR2);

export function LR3CostCalculation() {
    const x = repeatableUpgradeFactor.LR3.plus(repeatableUpgradeFactor.repeatableUpgradesBulk.minus(new Decimal(1)));
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.LR3Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.85).times(x.pow(new Decimal(4.5)));
    const z = new Decimal(40000).times(x);
    const w = new Decimal(100000);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u.pow(repeatableUpgradeFactor.repeatableUpgradeDiscount);
}
function LR3() {
	if (repeatableUpgradeFactor.LR3Unlocked) {
		if (storage.gameData.leaves.greaterThanOrEqualTo(LR3CostCalculation())) {
			storage.gameData.leaves = storage.gameData.leaves.minus(LR3CostCalculation());
			repeatableUpgradeFactor.LR3 = repeatableUpgradeFactor.LR3.plus(repeatableUpgradeFactor.repeatableUpgradesBulk);
			document.getElementById('pleaseWork').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.leaves, 3)}`;
		}
	}
}

document.getElementById("LR3").addEventListener("click", LR3);

export function SR1CostCalculation() {
    const x = repeatableUpgradeFactor.SR1.plus(repeatableUpgradeFactor.repeatableUpgradesBulk.minus(new Decimal(1)));
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.SR1Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.5).times(x.pow(new Decimal(2)));
    const z = new Decimal(4).times(x);
    const w = new Decimal(1000);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u.pow(repeatableUpgradeFactor.repeatableUpgradeDiscount);
}
function SR1() {
    if (storage.gameData.seeds.greaterThanOrEqualTo(SR1CostCalculation())) {
        storage.gameData.seeds = storage.gameData.seeds.minus(SR1CostCalculation());
        repeatableUpgradeFactor.SR1 = repeatableUpgradeFactor.SR1.plus(repeatableUpgradeFactor.repeatableUpgradesBulk);
        document.getElementById('seedCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.seeds, 3)}`;
    }
}

document.getElementById("SR1").addEventListener("click", SR1);

export function SR2CostCalculation() {
    const x = repeatableUpgradeFactor.SR2.plus(repeatableUpgradeFactor.repeatableUpgradesBulk.minus(new Decimal(1)));
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.SR2Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.6).times(x.pow(new Decimal(2.5)));
    const z = new Decimal(8).times(x);
    const w = new Decimal(8000);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u.pow(repeatableUpgradeFactor.repeatableUpgradeDiscount);
}
function SR2() {
    if (storage.gameData.seeds.greaterThanOrEqualTo(SR2CostCalculation())) {
        storage.gameData.seeds = storage.gameData.seeds.minus(SR2CostCalculation());
        repeatableUpgradeFactor.SR2 = repeatableUpgradeFactor.SR2.plus(repeatableUpgradeFactor.repeatableUpgradesBulk);
        document.getElementById('seedCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.seeds, 3)}`;
    }
}

document.getElementById("SR2").addEventListener("click", SR2);

export function SR3CostCalculation() {
    const x = repeatableUpgradeFactor.SR3.plus(repeatableUpgradeFactor.repeatableUpgradesBulk.minus(new Decimal(1)));
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.SR3Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.6).times(x.pow(new Decimal(4.5)));
    const z = new Decimal(10000).times(x);
    const w = new Decimal(75000);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u.pow(repeatableUpgradeFactor.repeatableUpgradeDiscount);
}
function SR3() {
    if (storage.gameData.seeds.greaterThanOrEqualTo(SR3CostCalculation())) {
        storage.gameData.seeds = storage.gameData.seeds.minus(SR3CostCalculation());
        repeatableUpgradeFactor.SR3 = repeatableUpgradeFactor.SR3.plus(repeatableUpgradeFactor.repeatableUpgradesBulk);
        document.getElementById('seedCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.seeds, 3)}`;
    }
}

document.getElementById("SR3").addEventListener("click", SR3);

export function FR1CostCalculation() {
    const x = repeatableUpgradeFactor.FR1.plus(repeatableUpgradeFactor.repeatableUpgradesBulk.minus(new Decimal(1)));
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.FR1Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.5).times(x.pow(new Decimal(2)));
    const z = new Decimal(4).times(x);
    const w = new Decimal(1000);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u.pow(repeatableUpgradeFactor.repeatableUpgradeDiscount);
}
function FR1() {
    if (storage.gameData.fruits.greaterThanOrEqualTo(FR1CostCalculation())) {
        storage.gameData.fruits = storage.gameData.fruits.minus(FR1CostCalculation());
        repeatableUpgradeFactor.FR1 = repeatableUpgradeFactor.FR1.plus(repeatableUpgradeFactor.repeatableUpgradesBulk);
        document.getElementById('fruitCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.fruits, 3)}`;
    }
}

document.getElementById("FR1").addEventListener("click", FR1);

export function FR2CostCalculation() {
    const x = repeatableUpgradeFactor.FR2.plus(repeatableUpgradeFactor.repeatableUpgradesBulk.minus(new Decimal(1)));
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.FR2Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.5).times(x.pow(new Decimal(3)));
    const z = new Decimal(16).times(x);
    const w = new Decimal(10000);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u.pow(repeatableUpgradeFactor.repeatableUpgradeDiscount);
}
function FR2() {
    if (storage.gameData.fruits.greaterThanOrEqualTo(FR2CostCalculation())) {
        storage.gameData.fruits = storage.gameData.fruits.minus(FR2CostCalculation());
        repeatableUpgradeFactor.FR2 = repeatableUpgradeFactor.FR2.plus(repeatableUpgradeFactor.repeatableUpgradesBulk);
        document.getElementById('fruitCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.fruits, 3)}`;
    }
}

document.getElementById("FR2").addEventListener("click", FR2);

export function FR3CostCalculation() {
    const x = repeatableUpgradeFactor.FR3.plus(repeatableUpgradeFactor.repeatableUpgradesBulk.minus(new Decimal(1)));
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.FR3Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.5).times(x.pow(new Decimal(4.5)));
    const z = new Decimal(100000).times(x);
    const w = new Decimal(500000);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u.pow(repeatableUpgradeFactor.repeatableUpgradeDiscount);
}
function FR3() {
    if (storage.gameData.fruits.greaterThanOrEqualTo(FR3CostCalculation())) {
        storage.gameData.fruits = storage.gameData.fruits.minus(FR3CostCalculation());
        repeatableUpgradeFactor.FR3 = repeatableUpgradeFactor.FR3.plus(repeatableUpgradeFactor.repeatableUpgradesBulk);
        document.getElementById('fruitCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.fruits, 3)}`;
    }
}

document.getElementById("FR3").addEventListener("click", FR3);


export function ER1CostCalculation() {
    const x = repeatableUpgradeFactor.ER1.plus(repeatableUpgradeFactor.repeatableUpgradesBulk.minus(new Decimal(1)));
    if (x.greaterThanOrEqualTo(repeatableUpgradeFactor.ER1Cap)) {
        return new Decimal(Infinity);
    }
    const y = new Decimal(0.5).times(x.pow(new Decimal(3.5)));
    const z = new Decimal(750).times(x);
    const w = new Decimal(1000);
    const v = y.plus(z.plus(w));
    const u = new Decimal(10).pow(v);
    return u.pow(repeatableUpgradeFactor.repeatableUpgradeDiscount);
}
function ER1() {
    if (storage.gameData.entropy.greaterThanOrEqualTo(ER1CostCalculation())) {
        storage.gameData.entropy = storage.gameData.entropy.minus(ER1CostCalculation());
        repeatableUpgradeFactor.ER1 = repeatableUpgradeFactor.ER1.plus(repeatableUpgradeFactor.repeatableUpgradesBulk);
        document.getElementById('entropyCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.entropy, 3)}`;
    }
}

document.getElementById("ER1").addEventListener("click", ER1);

document.addEventListener('DOMContentLoaded', () => {
    functions.LR1 = LR1;
    functions.LR2 = LR2;
    functions.LR3 = LR3;
	
    functions.SR1 = SR1;
    functions.SR2 = SR2;
    functions.SR3 = SR3;
	
    functions.FR1 = FR1;
    functions.FR2 = FR2;
    functions.FR3 = FR3;
	
    functions.ER1 = ER1;
});
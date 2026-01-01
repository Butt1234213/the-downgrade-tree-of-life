import * as storage from './core/bunchobullshit.mjs';
import { achievements, massAchievementChecker } from './achievements.mjs';

export function composterScaling(type) {
    let baseScalingAmount;
    let baseFertilizerAmount;
	let baseCostDiv;
	let baseBulkAmount;

    if (type === 'leaf') {
        baseScalingAmount = new Decimal(1e6).times(storage.gameData.leafComposterDiscount);
        baseFertilizerAmount = storage.gameData.leafComposterCount;
		baseCostDiv = storage.gameData.composterCostDivision;
		baseBulkAmount = storage.gameData.fertilizerBulk;
    }
    if (type === 'seed') {
        baseScalingAmount = new Decimal(1e2).times(storage.gameData.seedComposterDiscount);
        baseFertilizerAmount = storage.gameData.seedComposterCount;
		baseCostDiv = storage.gameData.composterCostDivision;
		baseBulkAmount = storage.gameData.fertilizerBulk;
    }
    if (type === 'fruit') {
        baseScalingAmount = new Decimal(2).times(storage.gameData.fruitComposterDiscount);
        baseFertilizerAmount = storage.gameData.fruitComposterCount;
		baseCostDiv = storage.gameData.composterCostDivision;
		baseBulkAmount = storage.gameData.fertilizerBulk;
    }
    if (type === 'entropy') {
        baseScalingAmount = new Decimal(1e6).times(storage.gameData.entropyComposterDiscount);
        baseFertilizerAmount = storage.gameData.entropyComposterCount;
		baseCostDiv = new Decimal(1);
		baseBulkAmount = new Decimal(1);
    }
    baseFertilizerAmount = baseFertilizerAmount.plus(baseBulkAmount.minus(new Decimal(1)));
    
    const preScaling = baseScalingAmount.pow(storage.gameData.composterScalingStart.plus(new Decimal(1)));
    const preSuperScaling = baseScalingAmount.pow(storage.gameData.composterSuperScalingStart.plus(new Decimal(1)));
    let scalingMult = baseScalingAmount.pow(baseFertilizerAmount.plus(new Decimal(1)));

    const scaling = baseFertilizerAmount.greaterThanOrEqualTo(storage.gameData.composterScalingStart);
    const superScaling = baseFertilizerAmount.greaterThanOrEqualTo(storage.gameData.composterSuperScalingStart);

    if (scaling) {
        const operations = baseFertilizerAmount.minus(storage.gameData.composterScalingStart);
        let scalingMult = preScaling;

        const x = new Decimal(1.1).pow(operations);
        const y = baseFertilizerAmount.pow(operations);
        scalingMult = preScaling.times(x.times(y));

        if (superScaling) {
            const superOperations = baseFertilizerAmount.minus(storage.gameData.composterSuperScalingStart);

            for (let i = 0; i < superOperations; i++) {
                const z = scalingMult.pow(storage.gameData.composterSuperScalingEffect);
                scalingMult = z;
            }
			scalingMult = scalingMult.div(baseCostDiv);
            return scalingMult;
        }
		scalingMult = scalingMult.div(baseCostDiv);
        return scalingMult;
    }
    if ((superScaling) && (!scaling)) {
        const superOperations = baseFertilizerAmount.minus(storage.gameData.composterSuperScalingStart);
        let scalingMult = preSuperScaling;

        for (let i = 0; i < superOperations; i++) {
            const z = scalingMult.pow(storage.gameData.composterSuperScalingEffect);
            scalingMult = z;
        }
		scalingMult = scalingMult.div(baseCostDiv);
        return scalingMult;
    }
    if ((!scaling) && (!superScaling)) {
        var x = baseScalingAmount.pow(baseFertilizerAmount.plus(new Decimal(1)));
		x = x.div(baseCostDiv);
        return x;
    }
	scalingMult = scalingMult.div(baseCostDiv);
    return scalingMult;
}

export function compostingSpeedScaling(type) {
    let baseScalingAmount;
    let baseFertilizerAmount;
	let baseBulkAmount;

    if (type === 'leaf') {
        baseScalingAmount = new Decimal(2);
        baseFertilizerAmount = storage.gameData.leafComposterCount;
		baseBulkAmount = storage.gameData.fertilizerBulk;
    }
    if (type === 'seed') {
        baseScalingAmount = new Decimal(2);
        baseFertilizerAmount = storage.gameData.seedComposterCount;
		baseBulkAmount = storage.gameData.fertilizerBulk;
    }
    if (type === 'fruit') {
        baseScalingAmount = new Decimal(2);
        baseFertilizerAmount = storage.gameData.fruitComposterCount;
		baseBulkAmount = storage.gameData.fertilizerBulk;
    }
    if (type === 'entropy') {
        baseScalingAmount = new Decimal(1e6);
        baseFertilizerAmount = storage.gameData.entropyComposterCount;
		baseBulkAmount = new Decimal(1);
    }
    baseFertilizerAmount = baseFertilizerAmount.plus(baseBulkAmount.minus(new Decimal(1)));
    
    let scalingMult = baseScalingAmount;

    const scaling = baseFertilizerAmount.greaterThanOrEqualTo(storage.gameData.compostingSpeedScalingStart);
    const superScaling = baseFertilizerAmount.greaterThanOrEqualTo(storage.gameData.compostingSpeedSuperScalingStart);

    if (scaling) {
        const operations = baseFertilizerAmount.minus(storage.gameData.compostingSpeedScalingStart);
		const technicalOperations = operations.toNumber();
		
		for (let i = 0; i < technicalOperations; i++) {
			let currentNum = new Decimal(i);
			const scalingEffect = new Decimal(1.1);
			scalingMult = scalingMult.times(scalingEffect);
		}
		
        return scalingMult;
    }
	if (baseFertilizerAmount.lessThan(new Decimal(1))) {
		scalingMult = new Decimal(1);
		return scalingMult;
	}
    return scalingMult;
}

export function composterButtonUpdater() {
	let leafCost = composterScaling('leaf');
	storage.gameData.leafComposterCost = leafCost;
	document.getElementById('leafComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${storage.truncateToDecimalPlaces(leafCost, 3)} Leaves`;
	let v = storage.gameData.leafComposterTime.div(new Decimal(1000));
    let u = v.div(storage.gameData.compostingSpeed);
    document.getElementById('leafCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;
	document.getElementById('leafComposterTimeIncreaseCounter').innerHTML = `x${storage.truncateToDecimalPlaces(compostingSpeedScaling('leaf'), 3)} per Fertilizer`;
	let seedCost = composterScaling('seed');
	storage.gameData.seedComposterCost = seedCost;
	document.getElementById('seedComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${storage.truncateToDecimalPlaces(seedCost, 3)} Seeds`;
	v = storage.gameData.seedComposterTime.div(new Decimal(1000));
    u = v.div(storage.gameData.compostingSpeed);
    document.getElementById('seedCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;
	document.getElementById('seedComposterTimeIncreaseCounter').innerHTML = `x${storage.truncateToDecimalPlaces(compostingSpeedScaling('seed'), 3)} per Fertilizer`;
	let fruitCost = composterScaling('fruit');
	storage.gameData.fruitComposterCost = fruitCost;
	document.getElementById('fruitComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${storage.truncateToDecimalPlaces(fruitCost, 3)} Fruits`;
	v = storage.gameData.fruitComposterTime.div(new Decimal(1000));
    u = v.div(storage.gameData.compostingSpeed);
    document.getElementById('fruitCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;
	document.getElementById('fruitComposterTimeIncreaseCounter').innerHTML = `x${storage.truncateToDecimalPlaces(compostingSpeedScaling('fruit'), 3)} per Fertilizer`;
	let entropyCost = composterScaling('entropy');
	storage.gameData.entropyComposterCost = entropyCost;
	document.getElementById('entropyComposterButton').innerHTML = `Make a Complex Fertilizer<br>Cost: ${storage.truncateToDecimalPlaces(entropyCost, 3)} Entropy`;
	v = storage.gameData.entropyComposterTime.div(new Decimal(1000));
    u = v.div(storage.gameData.compostingSpeed);
    document.getElementById('entropyCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;
	document.getElementById('entropyComposterTimeIncreaseCounter').innerHTML = `x${storage.truncateToDecimalPlaces(compostingSpeedScaling('entropy'), 3)} per Fertilizer`;
}

export function checkTotalComposter() {
    const x = storage.gameData.leafComposterCount;
    const y = storage.gameData.seedComposterCount;
    const z = storage.gameData.fruitComposterCount;
    const w = storage.gameData.entropyComposterCount;
    var v = new Decimal(1);
    var u = new Decimal(1);
    var t = new Decimal(1);
    if (!storage.gameData.isInChallengeWildfire) {
        v = storage.gameData.freeLeafFertilizers;
        u = storage.gameData.freeSeedFertilizers;
        t = storage.gameData.freeFruitFertilizers;
    }
	else if ((storage.gameData.isInChallengeWildfire) && (storage.entropyUpgradeFactor.E35Bought)) {
		v = new Decimal(15);
		u = new Decimal(15);
		t = new Decimal(15);
	}
    storage.gameData.totalFertilizers = x.plus(y.plus(z.plus(w.plus(v.plus(u.plus(t))))));
    document.getElementById('composterTotalCounter').innerHTML = `You have built ${storage.truncateToDecimalPlaces(storage.gameData.totalComposters, 3)} Composters which have created ${storage.truncateToDecimalPlaces(storage.gameData.totalFertilizers, 3)} Fertilizers, boosting Tree Aging speed by x${storage.truncateToDecimalPlaces(calculateComposterMult(), 3)}. You also have x${storage.truncateToDecimalPlaces(storage.gameData.compostingSpeed, 3)} Composting speed.<br>Composter Scaling starts at ${storage.truncateToDecimalPlaces(storage.gameData.composterScalingStart, 3)} Fertilizers (x1.1 per), and Super Composter Scaling starts at ${storage.truncateToDecimalPlaces(storage.gameData.composterSuperScalingStart, 3)} Fertilizers (^${storage.truncateToDecimalPlaces(storage.gameData.composterSuperScalingEffect, 3)} per).<br>Composting Speed Scaling starts at 500 Fertilizers (x1.1 per), and Super Composting Speed Scaling starts at 1000 Fertilizers (^1.1 per)`;

    if (storage.gameData.totalFertilizers.greaterThanOrEqualTo(new Decimal(500))) {
        achievements.ach73 = true;
        massAchievementChecker();
    }
    if (storage.gameData.totalFertilizers.greaterThanOrEqualTo(new Decimal(1500))) {
        achievements.ach94 = true;
        massAchievementChecker();
    }
}

function leafComposterOperation(bulk) {
    //in theory if I call this multiple times this should bulk buy fertilizers
    storage.gameData.leafComposterCount = storage.gameData.leafComposterCount.plus(bulk);
    storage.gameData.totalFertilizers = storage.gameData.totalFertilizers.plus(bulk);

    if (storage.gameData.freeLeafFertilizers.greaterThanOrEqualTo(new Decimal(1))) {document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made ${storage.truncateToDecimalPlaces(storage.gameData.leafComposterCount, 3)} (+${storage.truncateToDecimalPlaces(storage.gameData.freeLeafFertilizers, 3)}) Fertilizers,`;}
    else {document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made ${storage.truncateToDecimalPlaces(storage.gameData.leafComposterCount, 3)} Fertilizers,`;}
    document.getElementById('leafFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${storage.truncateToDecimalPlaces(storage.gameData.leafComposterEffect, 3)}x`;

    storage.gameData.leafComposterTime = storage.gameData.leafComposterTime.times(compostingSpeedScaling('leaf'));
    const v = storage.gameData.leafComposterTime.div(new Decimal(1000));
    const u = v.div(storage.gameData.compostingSpeed);
    document.getElementById('leafCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;

    storage.gameData.leafComposterAmount = new Decimal(0);
    document.querySelector('.leaf-progress-bar').style.width = '100%';
}

export function checkLeafComposter() {
    if ((storage.gameData.leaves.greaterThanOrEqualTo(storage.gameData.leafComposterCost)) && !storage.gameData.leafComposterIsActive) {
        storage.gameData.leaves = storage.gameData.leaves.minus(storage.gameData.leafComposterCost);
        document.getElementById("pleaseWork").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.leaves, 3) + " Leaves";

        storage.gameData.leafComposterCost = composterScaling('leaf');
        document.getElementById('leafComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${storage.truncateToDecimalPlaces(storage.gameData.leafComposterCost, 3)} Leaves`;

        storage.gameData.leafComposterIsActive = true;
        document.getElementById('leafComposterButton').disabled = true;
        document.getElementById("leafComposterButton").style.color = '#000000ff'
        document.getElementById("leafComposterButton").style.borderColor = '#000000ff'
    }
	const v = storage.gameData.leafComposterTime.div(new Decimal(1000));
    const u = v.div(storage.gameData.compostingSpeed);
    document.getElementById('leafCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;
	document.getElementById('leafComposterTimeIncreaseCounter').innerHTML = `x${storage.truncateToDecimalPlaces(compostingSpeedScaling('leaf'), 3)} per Fertilizer`;
}

export function updateLeafComposter() {
    if (storage.gameData.leafComposterIsActive) {
        if (storage.gameData.leafComposterAmount.lessThan(storage.gameData.leafComposterTime)) {
            const x = storage.gameData.ticksToUpdateComposter.times(storage.gameData.compostingSpeed);
            storage.gameData.leafComposterAmount = storage.gameData.leafComposterAmount.plus(x);

            const y = storage.gameData.leafComposterAmount.div(storage.gameData.leafComposterTime);
            const z = y.times(new Decimal(100));
            const w = storage.truncateToDecimalPlaces(z, 0);
            document.querySelector('.leaf-progress-bar').style.width = w + '%';
        }
        else {
            storage.gameData.leafComposterIsActive = false;
            document.getElementById('leafComposterButton').disabled = false;
            document.getElementById('leafComposterButton').style.color = '#ffffffff'

            leafComposterOperation(storage.gameData.fertilizerBulk);
            //pass in a Decimal() to test the bulk capabilities :)
        }
    }
}

function seedComposterOperation(bulk) {
    //in theory if I call this multiple times this should bulk buy fertilizers
    storage.gameData.seedComposterCount = storage.gameData.seedComposterCount.plus(bulk);
    storage.gameData.totalFertilizers = storage.gameData.totalFertilizers.plus(bulk);

    if (storage.gameData.freeSeedFertilizers.greaterThanOrEqualTo(new Decimal(1))) {document.getElementById('seedFertilizerCounter').innerHTML = `The Seed Composter has made ${storage.truncateToDecimalPlaces(storage.gameData.seedComposterCount, 3)} (+${storage.truncateToDecimalPlaces(storage.gameData.freeSeedFertilizers, 3)}) Fertilizers,`;}
    else {document.getElementById('seedFertilizerCounter').innerHTML = `The Seed Composter has made ${storage.truncateToDecimalPlaces(storage.gameData.seedComposterCount, 3)} Fertilizers,`;}
    document.getElementById('seedFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${storage.truncateToDecimalPlaces(storage.gameData.seedComposterEffect, 3)}x`;

    storage.gameData.seedComposterTime = storage.gameData.seedComposterTime.times(compostingSpeedScaling('seed'));
    const v = storage.gameData.seedComposterTime.div(new Decimal(1000));
    const u = v.div(storage.gameData.compostingSpeed);
    document.getElementById('seedCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;

    storage.gameData.seedComposterAmount = new Decimal(0);
    document.querySelector('.seed-progress-bar').style.width = '100%';
}

export function checkSeedComposter() {
    if ((storage.gameData.seeds.greaterThanOrEqualTo(storage.gameData.seedComposterCost)) && !storage.gameData.seedComposterIsActive) {
        storage.gameData.seeds = storage.gameData.seeds.minus(storage.gameData.seedComposterCost);
        document.getElementById("seedCounter").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.seeds, 3) + " Seeds";

        storage.gameData.seedComposterCost = composterScaling('seed');
        document.getElementById('seedComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${storage.truncateToDecimalPlaces(storage.gameData.seedComposterCost, 3)} Seeds`;

        storage.gameData.seedComposterIsActive = true;
        document.getElementById('seedComposterButton').disabled = true;
        document.getElementById("seedComposterButton").style.color = '#000000ff'
        document.getElementById("seedComposterButton").style.borderColor = '#000000ff'
    }
	const v = storage.gameData.seedComposterTime.div(new Decimal(1000));
    const u = v.div(storage.gameData.compostingSpeed);
    document.getElementById('seedCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;
	document.getElementById('seedComposterTimeIncreaseCounter').innerHTML = `x${storage.truncateToDecimalPlaces(compostingSpeedScaling('seed'), 3)} per Fertilizer`;
}

export function updateSeedComposter() {
    if (storage.gameData.seedComposterIsActive) {
        if (storage.gameData.seedComposterAmount.lessThan(storage.gameData.seedComposterTime)) {
            const x = storage.gameData.ticksToUpdateComposter.times(storage.gameData.compostingSpeed);
            storage.gameData.seedComposterAmount = storage.gameData.seedComposterAmount.plus(x);

            const y = storage.gameData.seedComposterAmount.div(storage.gameData.seedComposterTime);
            const z = y.times(new Decimal(100));
            const w = storage.truncateToDecimalPlaces(z, 0);
            document.querySelector('.seed-progress-bar').style.width = w + '%';
        }
        else {
            storage.gameData.seedComposterIsActive = false;
            document.getElementById('seedComposterButton').disabled = false;
            document.getElementById('seedComposterButton').style.color = '#ffffffff'

            seedComposterOperation(storage.gameData.fertilizerBulk);
            //pass in a Decimal() to test the bulk capabilities :)
        }
    }
}

function fruitComposterOperation(bulk) {
    //in theory if I call this multiple times this should bulk buy fertilizers
    storage.gameData.fruitComposterCount = storage.gameData.fruitComposterCount.plus(bulk);
    storage.gameData.totalFertilizers = storage.gameData.totalFertilizers.plus(bulk);

    if (storage.gameData.freeFruitFertilizers.greaterThanOrEqualTo(new Decimal(1))) {document.getElementById('fruitFertilizerCounter').innerHTML = `The Fruit Composter has made ${storage.truncateToDecimalPlaces(storage.gameData.fruitComposterCount, 3)} (+${storage.truncateToDecimalPlaces(storage.gameData.freeFruitFertilizers, 3)}) Fertilizers,`;}
    else {document.getElementById('fruitFertilizerCounter').innerHTML = `The Fruit Composter has made ${storage.truncateToDecimalPlaces(storage.gameData.fruitComposterCount, 3)} Fertilizers,`;}
    document.getElementById('fruitFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${storage.truncateToDecimalPlaces(storage.gameData.fruitComposterEffect, 3)}x`;

    storage.gameData.fruitComposterTime = storage.gameData.fruitComposterTime.times(compostingSpeedScaling('fruit'));
    const v = storage.gameData.fruitComposterTime.div(new Decimal(1000));
    const u = v.div(storage.gameData.compostingSpeed);
    document.getElementById('fruitCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;

    storage.gameData.fruitComposterAmount = new Decimal(0);
    document.querySelector('.fruit-progress-bar').style.width = '100%';
}

export function checkFruitComposter() {
    if ((storage.gameData.fruits.greaterThanOrEqualTo(storage.gameData.fruitComposterCost)) && !storage.gameData.fruitComposterIsActive) {
        storage.gameData.fruits = storage.gameData.fruits.minus(storage.gameData.fruitComposterCost);
        document.getElementById("fruitCounter").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.fruits, 3) + " Fruits";

        storage.gameData.fruitComposterCost = composterScaling('fruit');
        document.getElementById('fruitComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${storage.truncateToDecimalPlaces(storage.gameData.fruitComposterCost, 3)} Fruits`;

        storage.gameData.fruitComposterIsActive = true;
        document.getElementById('fruitComposterButton').disabled = true;
        document.getElementById("fruitComposterButton").style.color = '#000000ff'
        document.getElementById("fruitComposterButton").style.borderColor = '#000000ff'
    }
	const v = storage.gameData.fruitComposterTime.div(new Decimal(1000));
    const u = v.div(storage.gameData.compostingSpeed);
    document.getElementById('fruitCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;
	document.getElementById('fruitComposterTimeIncreaseCounter').innerHTML = `x${storage.truncateToDecimalPlaces(compostingSpeedScaling('fruit'), 3)} per Fertilizer`;
}

export function updateFruitComposter() {
    if (storage.gameData.fruitComposterIsActive) {
        if (storage.gameData.fruitComposterAmount.lessThan(storage.gameData.fruitComposterTime)) {
            const x = storage.gameData.ticksToUpdateComposter.times(storage.gameData.compostingSpeed);
            storage.gameData.fruitComposterAmount = storage.gameData.fruitComposterAmount.plus(x);

            const y = storage.gameData.fruitComposterAmount.div(storage.gameData.fruitComposterTime);
            const z = y.times(new Decimal(100));
            const w = storage.truncateToDecimalPlaces(z, 0);
            document.querySelector('.fruit-progress-bar').style.width = w + '%';
        }
        else {
            storage.gameData.fruitComposterIsActive = false;
            document.getElementById('fruitComposterButton').disabled = false;
            document.getElementById('fruitComposterButton').style.color = '#ffffffff'

            
            fruitComposterOperation(storage.gameData.fertilizerBulk);
            //pass in a Decimal() to test the bulk capabilities :)
        }
    }
}

function entropyComposterOperation(bulk) {
    //in theory if I call this multiple times this should bulk buy fertilizers
    storage.gameData.entropyComposterCount = storage.gameData.entropyComposterCount.plus(bulk);
	var a = new Decimal(1.002);
	if (storage.entropyUpgradeFactor.E40Bought) {
		const x = storage.gameData.bacteriaFertilizerMult;
		const y = x.div(new Decimal(100));
		a = a.plus(y);
        document.getElementById("E40").innerHTML = `E40 (Bought)<br>Bacteria Cytoplasm<br>Bacteria's Fertilizer Base effectiveness<br>very slightly affects the Entropy Composter<br>Cost: 1e89 Entropy<br>Effect: +${storage.truncateToDecimalPlaces(y, 3)}`;
	}
	var x = a.pow(storage.gameData.entropyComposterCount.plus(storage.gameData.freeEntropyFertilizers));
	storage.gameData.entropyComposterEffect = x;
    storage.gameData.totalFertilizers = storage.gameData.totalFertilizers.plus(bulk);

    if (storage.gameData.freeEntropyFertilizers.greaterThanOrEqualTo(new Decimal(1))) {document.getElementById('entropyFertilizerCounter').innerHTML = `The Entropy Composter has made ${storage.truncateToDecimalPlaces(storage.gameData.entropyComposterCount, 3)} (+${storage.truncateToDecimalPlaces(storage.gameData.freeEntropyFertilizers, 3)}) Fertilizers,`;}
    else {document.getElementById('entropyFertilizerCounter').innerHTML = `The Entropy Composter has made ${storage.truncateToDecimalPlaces(storage.gameData.entropyComposterCount, 3)} Fertilizers,`;}
    document.getElementById('entropyFertilizerEffect').innerHTML = `boosting Fertilizer effect by ^${storage.truncateToDecimalPlaces(storage.gameData.entropyComposterEffect, 3)}`;

    storage.gameData.entropyComposterTime = storage.gameData.entropyComposterTime.times(compostingSpeedScaling('entropy'));
    const v = storage.gameData.entropyComposterTime.div(new Decimal(1000));
    const u = v.div(storage.gameData.compostingSpeed);
    document.getElementById('entropyCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;

    storage.gameData.entropyComposterAmount = new Decimal(0);
    document.querySelector('.entropy-progress-bar').style.width = '100%';
}

export function checkEntropyComposter() {
    if ((storage.gameData.entropy.greaterThanOrEqualTo(storage.gameData.entropyComposterCost)) && !storage.gameData.entropyComposterIsActive) {
        storage.gameData.entropy = storage.gameData.entropy.minus(storage.gameData.entropyComposterCost);
        document.getElementById("entropyCounter").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.entropy, 3) + " Entropy";

        storage.gameData.entropyComposterCost = composterScaling('entropy');
        document.getElementById('entropyComposterButton').innerHTML = `Make a Complex Fertilizer<br>Cost: ${storage.truncateToDecimalPlaces(storage.gameData.entropyComposterCost, 3)} Entropy`;

        storage.gameData.entropyComposterIsActive = true;
        document.getElementById('entropyComposterButton').disabled = true;
        document.getElementById("entropyComposterButton").style.color = '#000000ff'
        document.getElementById("entropyComposterButton").style.borderColor = '#000000ff'
    }
	const v = storage.gameData.entropyComposterTime.div(new Decimal(1000));
    const u = v.div(storage.gameData.compostingSpeed);
    document.getElementById('entropyCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;
	document.getElementById('entropyComposterTimeIncreaseCounter').innerHTML = `x${storage.truncateToDecimalPlaces(compostingSpeedScaling('entropy'), 3)} per Fertilizer`;
}

export function updateEntropyComposter() {
    if (storage.gameData.entropyComposterIsActive) {
        if (storage.gameData.entropyComposterAmount.lessThan(storage.gameData.entropyComposterTime)) {
            const x = storage.gameData.ticksToUpdateComposter.times(storage.gameData.compostingSpeed);
            storage.gameData.entropyComposterAmount = storage.gameData.entropyComposterAmount.plus(x);

            const y = storage.gameData.entropyComposterAmount.div(storage.gameData.entropyComposterTime);
            const z = y.times(new Decimal(100));
            const w = storage.truncateToDecimalPlaces(z, 0);
            document.querySelector('.entropy-progress-bar').style.width = w + '%';
        }
        else {
            storage.gameData.entropyComposterIsActive = false;
            document.getElementById('entropyComposterButton').disabled = false;
            document.getElementById('entropyComposterButton').style.color = '#ffffffff'

            entropyComposterOperation(new Decimal(1));
            //pass in a Decimal() to test the bulk capabilities :)
        }
    }
}

export function calculateComposterMult() {
    let totalMultiplier = new Decimal(1);
    const x = new Decimal(1.5).plus(storage.gameData.bacteriaFertilizerMult);
    document.getElementById('leafComposterBaseEffect').innerHTML = `(${storage.truncateToDecimalPlaces(x, 3)}x every Fertilizer)`
    document.getElementById('seedComposterBaseEffect').innerHTML = `(${storage.truncateToDecimalPlaces(x, 3)}x every Fertilizer)`
    document.getElementById('fruitComposterBaseEffect').innerHTML = `(${storage.truncateToDecimalPlaces(x, 3)}x every Fertilizer)`
	var v = new Decimal(1.002);
	if (storage.entropyUpgradeFactor.E40Bought) {
		const x = storage.gameData.bacteriaFertilizerMult;
		const y = x.div(new Decimal(100));
		v = v.plus(y);
        document.getElementById("E40").innerHTML = `E40 (Bought)<br>Bacteria Cytoplasm<br>Bacteria's Fertilizer Base effectiveness<br>very slightly affects the Entropy Composter<br>Cost: 1e89 Entropy<br>Effect: +${storage.truncateToDecimalPlaces(y, 3)}`;
	}
    document.getElementById('entropyComposterBaseEffect').innerHTML = `(x${storage.truncateToDecimalPlaces(v, 3)} every Fertilizer)`

    var y = x.pow(storage.gameData.leafComposterCount.plus(storage.gameData.freeLeafFertilizers));
    storage.gameData.leafComposterEffect = y;
    totalMultiplier = totalMultiplier.times(storage.gameData.leafComposterEffect);
    document.getElementById('leafFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${storage.truncateToDecimalPlaces(storage.gameData.leafComposterEffect, 3)}x`;
    var z = x.pow(storage.gameData.seedComposterCount.plus(storage.gameData.freeSeedFertilizers));
    storage.gameData.seedComposterEffect = z;
    totalMultiplier = totalMultiplier.times(storage.gameData.seedComposterEffect);
    document.getElementById('seedFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${storage.truncateToDecimalPlaces(storage.gameData.seedComposterEffect, 3)}x`;
    var w = x.pow(storage.gameData.fruitComposterCount.plus(storage.gameData.freeFruitFertilizers));
    storage.gameData.fruitComposterEffect = w;
    totalMultiplier = totalMultiplier.times(storage.gameData.fruitComposterEffect);
    document.getElementById('fruitFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${storage.truncateToDecimalPlaces(storage.gameData.fruitComposterEffect, 3)}x`;
	var u = v.pow(storage.gameData.entropyComposterCount.plus(storage.gameData.freeEntropyFertilizers));
	storage.gameData.entropyComposterEffect = u;
	totalMultiplier = totalMultiplier.pow(storage.gameData.entropyComposterEffect);
    document.getElementById('entropyFertilizerEffect').innerHTML = `boosting Fertilizer effect by ^${storage.truncateToDecimalPlaces(storage.gameData.entropyComposterEffect, 3)}`;

    return totalMultiplier;
}

document.getElementById('leafComposterButton').addEventListener("click", checkLeafComposter);
document.getElementById('seedComposterButton').addEventListener("click", checkSeedComposter);
document.getElementById('fruitComposterButton').addEventListener("click", checkFruitComposter);
document.getElementById('entropyComposterButton').addEventListener("click", checkEntropyComposter);
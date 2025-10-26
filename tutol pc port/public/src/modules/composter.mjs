import * as storage from './core/bunchobullshit.mjs'

function checkLeafComposter() {
    console.log("checkLeafComposter is being called");
    if ((storage.gameData.leaves.greaterThanOrEqualTo(storage.gameData.leafComposterCost)) && !storage.gameData.leafComposterIsActive) {
        console.log("checkLeafComposter has passed");
        storage.gameData.leaves = storage.gameData.leaves.minus(storage.gameData.leafComposterCost);
        document.getElementById("pleaseWork").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.leaves, 3) + " Leaves";

        storage.gameData.leafComposterCost = storage.gameData.leafComposterCost.times(new Decimal(1e6));
        document.getElementById('leafComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${storage.truncateToDecimalPlaces(storage.gameData.leafComposterCost, 3)} Leaves`;

        storage.gameData.leafComposterIsActive = true;
        document.getElementById('leafComposterButton').disabled = true;
        document.getElementById("leafComposterButton").style.color = '#000000ff'
        document.getElementById("leafComposterButton").style.borderColor = '#000000ff'
    }
}

export function updateLeafComposter() {
    if (storage.gameData.leafComposterIsActive) {
        if (storage.gameData.leafComposterAmount.lessThan(storage.gameData.leafComposterTime)) {
            const x = storage.gameData.ticksToUpdateComposter.times(storage.gameData.compostingSpeed);
            storage.gameData.leafComposterAmount = storage.gameData.leafComposterAmount.plus(x);
            console.log(storage.gameData.leafComposterAmount);

            const y = storage.gameData.leafComposterAmount.div(storage.gameData.leafComposterTime);
            const z = y.times(new Decimal(100));
            const w = storage.truncateToDecimalPlaces(z, 0);
            document.querySelector('.leaf-progress-bar').style.width = w + '%';
            console.log(w);
        }
        else {
            storage.gameData.leafComposterIsActive = false;
            document.getElementById('leafComposterButton').disabled = false;
            document.getElementById('leafComposterButton').style.color = '#ffffffff'

            storage.gameData.leafComposterCount = storage.gameData.leafComposterCount.plus(new Decimal(1));
            document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made ${storage.truncateToDecimalPlaces(storage.gameData.leafComposterCount, 3)} Fertilizers,`;

            storage.gameData.leafComposterEffect = storage.gameData.leafComposterEffect.times(new Decimal(1.5));
            document.getElementById('leafFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${storage.truncateToDecimalPlaces(storage.gameData.leafComposterEffect, 3)}x`;

            storage.gameData.leafComposterTime = storage.gameData.leafComposterTime.times(new Decimal(2));
            const v = storage.gameData.leafComposterTime.div(new Decimal(1000));
            const u = v.div(storage.gameData.compostingSpeed);
            document.getElementById('leafCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;

            storage.gameData.leafComposterAmount = new Decimal(0);
        }
    }
}
function checkSeedComposter() {
    console.log("checkSeedComposter is being called");
    if ((storage.gameData.seeds.greaterThanOrEqualTo(storage.gameData.seedComposterCost)) && !storage.gameData.seedComposterIsActive) {
        console.log("checkSeedComposter has passed");
        storage.gameData.seeds = storage.gameData.seeds.minus(storage.gameData.seedComposterCost);
        document.getElementById("seedCounter").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.seeds, 3) + " Seeds";

        storage.gameData.seedComposterCost = storage.gameData.seedComposterCost.times(new Decimal(1e2));
        document.getElementById('seedComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${storage.truncateToDecimalPlaces(storage.gameData.seedComposterCost, 3)} Seeds`;

        storage.gameData.seedComposterIsActive = true;
        document.getElementById('seedComposterButton').disabled = true;
        document.getElementById("seedComposterButton").style.color = '#000000ff'
        document.getElementById("seedComposterButton").style.borderColor = '#000000ff'
    }
}

export function updateSeedComposter() {
    if (storage.gameData.seedComposterIsActive) {
        if (storage.gameData.seedComposterAmount.lessThan(storage.gameData.seedComposterTime)) {
            const x = storage.gameData.ticksToUpdateComposter.times(storage.gameData.compostingSpeed);
            storage.gameData.seedComposterAmount = storage.gameData.seedComposterAmount.plus(x);
            console.log(storage.gameData.seedComposterAmount);

            const y = storage.gameData.seedComposterAmount.div(storage.gameData.seedComposterTime);
            const z = y.times(new Decimal(100));
            const w = storage.truncateToDecimalPlaces(z, 0);
            document.querySelector('.seed-progress-bar').style.width = w + '%';
            console.log(w);
        }
        else {
            storage.gameData.seedComposterIsActive = false;
            document.getElementById('seedComposterButton').disabled = false;
            document.getElementById('seedComposterButton').style.color = '#ffffffff'

            storage.gameData.seedComposterCount = storage.gameData.seedComposterCount.plus(new Decimal(1));
            document.getElementById('seedFertilizerCounter').innerHTML = `The Seed Composter has made ${storage.truncateToDecimalPlaces(storage.gameData.seedComposterCount, 3)} Fertilizers,`;

            storage.gameData.seedComposterEffect = storage.gameData.seedComposterEffect.times(new Decimal(1.5));
            document.getElementById('seedFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${storage.truncateToDecimalPlaces(storage.gameData.seedComposterEffect, 3)}x`;

            storage.gameData.seedComposterTime = storage.gameData.seedComposterTime.times(new Decimal(2));
            const v = storage.gameData.seedComposterTime.div(new Decimal(1000));
            const u = v.div(storage.gameData.compostingSpeed);
            document.getElementById('seedCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;

            storage.gameData.seedComposterAmount = new Decimal(0);
        }
    }
}

function checkFruitComposter() {
    console.log("checkFruitComposter is being called");
    if ((storage.gameData.fruits.greaterThanOrEqualTo(storage.gameData.fruitComposterCost)) && !storage.gameData.fruitComposterIsActive) {
        console.log("checkFruitComposter has passed");
        storage.gameData.fruits = storage.gameData.fruits.minus(storage.gameData.fruitComposterCost);
        document.getElementById("fruitCounter").innerHTML = storage.truncateToDecimalPlaces(storage.gameData.fruits, 3) + " Fruits";

        storage.gameData.fruitComposterCost = storage.gameData.fruitComposterCost.times(new Decimal(2));
        document.getElementById('fruitComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${storage.truncateToDecimalPlaces(storage.gameData.fruitComposterCost, 3)} Fruits`;

        storage.gameData.fruitComposterIsActive = true;
        document.getElementById('fruitComposterButton').disabled = true;
        document.getElementById("fruitComposterButton").style.color = '#000000ff'
        document.getElementById("fruitComposterButton").style.borderColor = '#000000ff'
    }
}

export function updateFruitComposter() {
    if (storage.gameData.fruitComposterIsActive) {
        if (storage.gameData.fruitComposterAmount.lessThan(storage.gameData.fruitComposterTime)) {
            const x = storage.gameData.ticksToUpdateComposter.times(storage.gameData.compostingSpeed);
            storage.gameData.fruitComposterAmount = storage.gameData.fruitComposterAmount.plus(x);
            console.log(storage.gameData.fruitComposterAmount);

            const y = storage.gameData.fruitComposterAmount.div(storage.gameData.fruitComposterTime);
            const z = y.times(new Decimal(100));
            const w = storage.truncateToDecimalPlaces(z, 0);
            document.querySelector('.fruit-progress-bar').style.width = w + '%';
            console.log(w);
        }
        else {
            storage.gameData.fruitComposterIsActive = false;
            document.getElementById('fruitComposterButton').disabled = false;
            document.getElementById('fruitComposterButton').style.color = '#ffffffff'

            storage.gameData.fruitComposterCount = storage.gameData.fruitComposterCount.plus(new Decimal(1));
            document.getElementById('fruitFertilizerCounter').innerHTML = `The Fruit Composter has made ${storage.truncateToDecimalPlaces(storage.gameData.fruitComposterCount, 3)} Fertilizers,`;

            storage.gameData.fruitComposterEffect = storage.gameData.fruitComposterEffect.times(new Decimal(1.5));
            document.getElementById('fruitFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${storage.truncateToDecimalPlaces(storage.gameData.fruitComposterEffect, 3)}x`;

            storage.gameData.fruitComposterTime = storage.gameData.fruitComposterTime.times(new Decimal(2));
            const v = storage.gameData.fruitComposterTime.div(new Decimal(1000));
            const u = v.div(storage.gameData.compostingSpeed);
            document.getElementById('fruitCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(u, 3)} seconds`;

            storage.gameData.fruitComposterAmount = new Decimal(0);
        }
    }
}

export function calculateComposterMult() {
    let totalMultiplier = new Decimal(1);

    totalMultiplier = totalMultiplier.times(storage.gameData.leafComposterEffect);
    totalMultiplier = totalMultiplier.times(storage.gameData.seedComposterEffect);
    totalMultiplier = totalMultiplier.times(storage.gameData.fruitComposterEffect);

    return totalMultiplier;
}

document.getElementById('leafComposterButton').addEventListener("click", checkLeafComposter);
document.getElementById('seedComposterButton').addEventListener("click", checkSeedComposter);
document.getElementById('fruitComposterButton').addEventListener("click", checkFruitComposter);
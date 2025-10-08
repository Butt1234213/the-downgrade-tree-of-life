import * as storage from './bunchobullshit.mjs'

function checkLeafComposter() {
    console.log("checkLeafComposter is being called");
    if ((storage.gameData.leaves.greaterThanOrEqualTo(storage.gameData.leafComposterCost)) && !storage.gameData.leafComposterIsActive) {
        console.log("checkLeafComposter has passed");
        storage.gameData.leaves = storage.gameData.leaves.minus(storage.gameData.leafComposterCost);
        document.getElementById("pleaseWork").innerHTML = storage.gameData.leaves + " Leaves";

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
            console.log(z);
        }
        else {
            storage.gameData.leafComposterIsActive = false;
            document.getElementById('leafComposterButton').disabled = false;
            document.getElementById('leafComposterButton').style.color = '#ffffffff'

            storage.gameData.leafComposterCount = storage.gameData.leafComposterCount.plus(new Decimal(1));
            document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made ${storage.truncateToDecimalPlaces(storage.gameData.leafComposterCount, 3)} Fertilizers,`;

            storage.gameData.leafComposterEffect = storage.gameData.leafComposterEffect.times(new Decimal(1.5));
            storage.gameData.treeAgePerTick = storage.gameData.treeAgePerTick.times(new Decimal(1.5));
            document.getElementById('leafFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${storage.truncateToDecimalPlaces(storage.gameData.leafComposterEffect, 3)}x`;

            storage.gameData.leafComposterTime = storage.gameData.leafComposterTime.times(new Decimal(2));
            const v = storage.gameData.leafComposterTime.div(new Decimal(1000));
            document.getElementById('leafCompostingTimer').innerHTML = `Composting takes ${storage.truncateToDecimalPlaces(v, 3)} seconds`;
        }
    }
}
document.getElementById('leafComposterButton').addEventListener("click", checkLeafComposter);
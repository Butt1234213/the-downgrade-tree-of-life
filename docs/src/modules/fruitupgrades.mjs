import { gameData, fruitUpgradeCost, fruitUpgradeFactor, truncateToDecimalPlaces } from './bunchobullshit.mjs'
import { achievements, massAchievementChecker } from './achievements.mjs';
import { startGeneration } from './leafupgrades.mjs'
import { gameLoop } from './gameloopbutmodule.mjs'

export function F1() { 
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU1)) {
        gameData.fruits = gameData.fruits.minus(fruitUpgradeCost.FU1);
        fruitUpgradeFactor.F1Bought = true;
        document.getElementById("fruitCounter").innerHTML = truncateToDecimalPlaces(gameData.fruits, 3) + " Fruits";
        document.getElementById("F1").innerHTML = `F1 (Bought)<br>The Composter I<br>Unlock the Composter<br>Cost: 1 Fruit`;
        document.getElementById("F1").disabled = true;
        document.getElementById("F1").style.color = '#000000ff'
        document.getElementById("F1").style.borderColor = '#000000ff'

        achievements.ach24 = true;
        massAchievementChecker();
    }
}

function F3Formula() {
    const x = gameData.fruits.times(new Decimal(1e15));
    fruitUpgradeFactor.F3 = x;
}

export function F3() {
    if (gameData.fruits.greaterThanOrEqualTo(seedUpgradeCost.FU3)) {
        gameData.fruits = gameData.fruits.minus(seedUpgradeCost.FU3);
        seedUpgradeFactor.F3Bought = true;

        achievements.ach31 = true;
        massAchievementChecker();

        F3Formula();

        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        document.getElementById("fruitCounter").innerHTML = truncateToDecimalPlaces(gameData.fruits, 3) + " Fruits";
        document.getElementById("F3").innerHTML = `F3 (Bought)<br>Anti-Cap I<br>Fruits push back Leaves Softcap<br>Cost: 9 Fruits<br>Effect: ${truncateToDecimalPlaces(fruitUpgradeFactor.F3, 3)}`;
        document.getElementById("F3").disabled = true;
        document.getElementById("F3").style.color = '#000000ff'
        document.getElementById("F3").style.borderColor = '#000000ff'
    }
}
import { gameData } from './modules/bunchobullshit.js'

function L2() {
    if (gameData.leaves >= leafUpgradeCost.LU2) {
    gameData.leaves -= leafUpgradeCost.LU2;
    gameData.leavesPerTick *= 2;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L2").innerHTML = `L2 <br> Grow I (Bought) <br> x2 Leaves <br> Cost: ` + leafUpgradeCost.LU2 + ` Leaves`;
    document.getElementById("L2").disabled = true;
    console.log(`L2 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}
function L3() {
    if (gameData.leaves >= leafUpgradeCost.LU3) {
    gameData.leaves -= leafUpgradeCost.LU3;
    gameData.leavesPerTick *= 3;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L3").innerHTML = `L3 <br> Grow II (Bought) <br> x3 Leaves <br> Cost: ` + leafUpgradeCost.LU3 + ` Leaves`;
    document.getElementById("L3").disabled = true;
    console.log(`L3 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}
function L4() {
    if (gameData.leaves >= leafUpgradeCost.LU4) {
        if (leafUpgradeFactor.L4Bought == false) {
            gameData.leaves -= leafUpgradeCost.LU4;
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L4").innerHTML = `L4 <br> Develop I (Bought) <br> Tree Age boosts Leaves <br> Cost: ` + leafUpgradeCost.LU4 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L4, 3)}x`;
            document.getElementById("L4").disabled = true;
            leafUpgradeFactor.L4Bought = true;
            L4()
        }
        else {
            leafUpgradeFactor.L4 = (((gameData.treeAge / leafUpgradeFactor.L4Amt) ** 0.5) + 1);
            gameData.leavesPerTick *= leafUpgradeFactor.L4;
            console.log(`L4 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
            leafUpgradeFactor.L4AtUpgradeBought = leafUpgradeFactor.L4;
        }
    }
}
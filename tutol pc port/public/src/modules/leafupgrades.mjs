import { gameData, leafUpgradeCost, leafUpgradeFactor, truncateToDecimalPlaces } from './bunchobullshit.mjs'
import { gameLoop } from './gameloopbutmodule.mjs'
import { achievements } from './achievements.mjs';

export function laggyAssFunction() {
    startGeneration();
    L2();
    L3();
    L4();
    L5();
    L6();
    L7();
    L8();
    L9();
    L10();
    L11();
    L12();
    L13();
    L14();
    L15();
    L16();
    L17();
}

export function startGeneration() {
    gameData.gameStarted = true;
    gameData.tickSpeedMultiplier = new Decimal(1);
    gameData.treeAgePerTick = new Decimal(1);
    gameData.leavesPerTick = gameData.leavesStartingPerTick;
    console.log(gameData.leavesPerTick);
    gameData.leafUpgradeCounter = new Decimal(1);
    leafUpgradeFactor.L4Bought = false;

    achievements.ach11 = true;

    document.getElementById("L1").innerHTML = `L1 (Bought) <br> Start Generating <br> Leaves`;
    document.getElementById("L1").style.color = '#000000ff'
    document.getElementById("L1").style.borderColor = '#000000ff'
    document.getElementById("L1").disabled = true;
    console.log(`startGeneration function called, value of gameData.gameStarted is ${gameData.gameStarted}`);
    gameLoop();
}

 //didn't work initially, so I'm commenting this out for now, but will re-add later

export function L2() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU2)) {
        if (leafUpgradeFactor.L2Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU2);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L2").disabled = true;
            document.getElementById("L2").style.color = '#000000ff'
            document.getElementById("L2").style.borderColor = '#000000ff'
            leafUpgradeFactor.L2Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("L2").disabled = true;
            document.getElementById("L2").style.color = '#000000ff'
            document.getElementById("L2").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}
export function L3() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU3)) {
        if (leafUpgradeFactor.L3Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU3);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L3").disabled = true;
            document.getElementById("L3").style.color = '#000000ff'
            document.getElementById("L3").style.borderColor = '#000000ff'
            leafUpgradeFactor.L3Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("L3").disabled = true;
            document.getElementById("L3").style.color = '#000000ff'
            document.getElementById("L3").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}

export function L4() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU4)) {
        if (leafUpgradeFactor.L4Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU4);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L4").disabled = true;
            document.getElementById("L4").style.color = '#000000ff'
            document.getElementById("L4").style.borderColor = '#000000ff'
            leafUpgradeFactor.L4Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
            
            achievements.ach12 = true;
        }
        else {
            document.getElementById("L4").disabled = true;
            document.getElementById("L4").style.color = '#000000ff'
            document.getElementById("L4").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}

export function L5() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU5)) {
        if (leafUpgradeFactor.L5Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU5);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L5").disabled = true;
            document.getElementById("L5").style.color = '#000000ff'
            document.getElementById("L5").style.borderColor = '#000000ff'
            leafUpgradeFactor.L5Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("L5").disabled = true;
            document.getElementById("L5").style.color = '#000000ff'
            document.getElementById("L5").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}
export function L6() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU6)) {
        if (leafUpgradeFactor.L6Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU6);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L6").disabled = true;
            document.getElementById("L6").style.color = '#000000ff'
            document.getElementById("L6").style.borderColor = '#000000ff'
            leafUpgradeFactor.L6Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("L6").disabled = true;
            document.getElementById("L6").style.color = '#000000ff'
            document.getElementById("L6").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}
export function L7() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU7)) {
        if (leafUpgradeFactor.L7Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU7);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L7").disabled = true;
            document.getElementById("L7").style.color = '#000000ff'
            document.getElementById("L7").style.borderColor = '#000000ff'
            leafUpgradeFactor.L7Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("L7").disabled = true;
            document.getElementById("L7").style.color = '#000000ff'
            document.getElementById("L7").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}
export function L8() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU8)) {
        if (leafUpgradeFactor.L8Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU8);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L8").disabled = true;
            document.getElementById("L8").style.color = '#000000ff'
            document.getElementById("L8").style.borderColor = '#000000ff'
            leafUpgradeFactor.L8Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("L8").disabled = true;
            document.getElementById("L8").style.color = '#000000ff'
            document.getElementById("L8").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}

export function L9() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU9)) {
        if (leafUpgradeFactor.L9Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU9);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L9").disabled = true;
            document.getElementById("L9").style.color = '#000000ff'
            document.getElementById("L9").style.borderColor = '#000000ff'
            leafUpgradeFactor.L9Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("L9").disabled = true;
            document.getElementById("L9").style.color = '#000000ff'
            document.getElementById("L9").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}

export function L10() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU10)) {
        if (leafUpgradeFactor.L10Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU10);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L10").disabled = true;
            document.getElementById("L10").style.color = '#000000ff'
            document.getElementById("L10").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
            leafUpgradeFactor.L10Bought = true;
        }
        else {
            document.getElementById("L10").disabled = true;
            document.getElementById("L10").style.color = '#000000ff'
            document.getElementById("L10").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}

export function L11() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU11)) {
        if (leafUpgradeFactor.L11Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU11);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L11").disabled = true;
            document.getElementById("L11").style.color = '#000000ff'
            document.getElementById("L11").style.borderColor = '#000000ff'
            leafUpgradeFactor.L11Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
            
            achievements.ach13 = true;
        }
        else {
            document.getElementById("L11").disabled = true;
            document.getElementById("L11").style.color = '#000000ff'
            document.getElementById("L11").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}

export function L12() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU12)) {
        if (leafUpgradeFactor.L12Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU12);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L12").disabled = true;
            document.getElementById("L12").style.color = '#000000ff'
            document.getElementById("L12").style.borderColor = '#000000ff'
            leafUpgradeFactor.L12Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("L12").disabled = true;
            document.getElementById("L12").style.color = '#000000ff'
            document.getElementById("L12").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}
export function L13() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU13)) {
        if (leafUpgradeFactor.L13Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU13);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L13").disabled = true;
            document.getElementById("L13").style.color = '#000000ff'
            document.getElementById("L13").style.borderColor = '#000000ff'
            leafUpgradeFactor.L13Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("L13").disabled = true;
            document.getElementById("L13").style.color = '#000000ff'
            document.getElementById("L13").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}
export function L14() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU14)) {
        if (leafUpgradeFactor.L14Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU14);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L14").disabled = true;
            document.getElementById("L14").style.color = '#000000ff'
            document.getElementById("L14").style.borderColor = '#000000ff'
            leafUpgradeFactor.L14Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("L14").disabled = true;
            document.getElementById("L14").style.color = '#000000ff'
            document.getElementById("L14").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}
export function L15() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU15)) {
        if (leafUpgradeFactor.L15Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU15);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L15").disabled = true;
            document.getElementById("L15").style.color = '#000000ff'
            document.getElementById("L15").style.borderColor = '#000000ff'
            leafUpgradeFactor.L15Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));

            achievements.ach15 = true;
        }
        else {
            document.getElementById("L15").disabled = true;
            document.getElementById("L15").style.color = '#000000ff'
            document.getElementById("L15").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}

export function L16() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU16)) {
        if (leafUpgradeFactor.L16Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU16);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L16").disabled = true;
            document.getElementById("L16").style.color = '#000000ff'
            document.getElementById("L16").style.borderColor = '#000000ff'
            leafUpgradeFactor.L16Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("L16").disabled = true;
            document.getElementById("L16").style.color = '#000000ff'
            document.getElementById("L16").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}

export function L17() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU17)) {
        if (leafUpgradeFactor.L17Bought == false) {
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU17);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L17").disabled = true;
            document.getElementById("L17").style.color = '#000000ff'
            document.getElementById("L17").style.borderColor = '#000000ff'
            leafUpgradeFactor.L17Bought = true;
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("L17").disabled = true;
            document.getElementById("L17").style.color = '#000000ff'
            document.getElementById("L17").style.borderColor = '#000000ff'
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        }
    }
}
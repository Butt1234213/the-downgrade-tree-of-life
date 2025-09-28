import { gameData, leafUpgradeCost, leafUpgradeFactor, truncateToDecimalPlaces } from './bunchobullshit.mjs'
import { gameLoop } from './gameloopbutmodule.mjs'

function startGeneration() {
  gameData.gameStarted = true;
  gameData.leavesPerTick = 0.5;
  console.log(gameData.leavesPerTick);
  gameData.tickSpeedMultiplier = 1;
  gameData.treeAgePerTick = 0.5;
  gameData.leafUpgradeCounter = 1;
  leafUpgradeFactor.L4Bought = false;

  document.getElementById("L1").disabled = true;
  console.log(`startGeneration function called, value of gameData.gameStarted is ${gameData.gameStarted}`);
  gameLoop();
}

/* function UpgradeBuilder (name, effect, resource, resourceName, resourceBeingUpgraded, cost, upgrade, upgradeType, resourceCounterID, buttonID) {
  if (resource >= cost) {
    resource -= cost;
    if (upgradeType === "+") {resourceBeingUpgraded += upgrade;}
    else {resourceBeingUpgraded * upgrade;}
    document.getElementById(`${resourceCounterID}`).innerHTML = resource + ` ${resourceName}`;
    document.getElementById(`${buttonID}`).innerHTML = `${name} (Bought) <br> ${effect} <br> Cost: ` + cost + ` ${resourceName}`;
    document.getElementById(`${buttonID}`).disabled = true;
    }
  } */

 //didn't work initially, so I'm commenting this out for now, but will re-add later

function L2() {
    if (gameData.leaves >= leafUpgradeCost.LU2) {
    gameData.leaves -= leafUpgradeCost.LU2;
    gameData.leavesPerTick *= 2;
    gameData.leafUpgradeCounter += 1;
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
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L3").innerHTML = `L3 <br> Grow II (Bought) <br> x3 Leaves <br> Cost: ` + leafUpgradeCost.LU3 + ` Leaves`;
    document.getElementById("L3").disabled = true;
    console.log(`L3 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}

function L4UpgradeFormula() {
  leafUpgradeFactor.L4 = ((((gameData.treeAge / 1000) / leafUpgradeFactor.L4Amt) ** 0.5) + 1);
}

function L4() {
    if (gameData.leaves >= leafUpgradeCost.LU4) {
        while (leafUpgradeFactor.L4Bought == false) {
            gameData.leaves -= leafUpgradeCost.LU4;
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L4").disabled = true;
            leafUpgradeFactor.L4Bought = true;
        }
        if (leafUpgradeFactor.L4Bought == true) {
            L4UpgradeFormula();
            gameData.leafUpgradeCounter += 1;
            gameData.leavesPerTick *= leafUpgradeFactor.L4;
            document.getElementById("L4").innerHTML = `L4 <br> Develop I (Bought) <br> Tree Age boosts Leaves <br> Cost: ` + leafUpgradeCost.LU4 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L4, 3)}x`;
            console.log(`L4 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
            leafUpgradeFactor.L4AtUpgradeBought = leafUpgradeFactor.L4;
        }
    }
}
export function L4UpgradeUpdater() {
  if (leafUpgradeFactor.L4Bought == true) {
  setTimeout(L4UpgradeFormula, (gameData.refreshRate * 2));
  const deltaL4U = leafUpgradeFactor.L4 - leafUpgradeFactor.L4AtUpgradeBought;
  gameData.leavesPerTick *= (deltaL4U + 1);
  document.getElementById("L4").innerHTML = `L4 <br> Develop I (Bought) <br> Tree Age boosts Leaves <br> Cost: ` + leafUpgradeCost.LU4 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L4, 3)}x`;
  leafUpgradeFactor.L4AtUpgradeBought = leafUpgradeFactor.L4;
  }
}

function L5() {
    if (gameData.leaves >= leafUpgradeCost.LU5) {
    gameData.leaves -= leafUpgradeCost.LU5;
    gameData.leavesPerTick *= 2.5;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L5").innerHTML = `L5 <br> Grow III (Bought) <br> x2.5 Leaves <br> Cost: ` + leafUpgradeCost.LU5 + ` Leaves`;
    document.getElementById("L5").disabled = true;
    console.log(`L5 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}
function L6() {
    if (gameData.leaves >= leafUpgradeCost.LU6) {
    gameData.leaves -= leafUpgradeCost.LU6;
    gameData.leavesPerTick *= 3;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L6").innerHTML = `L6 <br> Grow IV (Bought) <br> x3 Leaves <br> Cost: ` + leafUpgradeCost.LU6 + ` Leaves`;
    document.getElementById("L6").disabled = true;
    console.log(`L6 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}
function L7() {
    if (gameData.leaves >= leafUpgradeCost.LU7) {
    gameData.leaves -= leafUpgradeCost.LU7;
    gameData.leavesPerTick *= 3.14;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L7").innerHTML = `L5 <br> Grow V (Bought) <br> xpi Leaves for no reason <br> Cost: ` + leafUpgradeCost.LU7 + ` Leaves`;
    document.getElementById("L7").disabled = true;
    console.log(`L7 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}
function L8() {
    if (gameData.leaves >= leafUpgradeCost.LU8) {
    gameData.leaves -= leafUpgradeCost.LU8;
    gameData.leavesPerTick *= 1.75;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L8").innerHTML = `L8 <br> Grow VI (Bought) <br> x1.75 Leaves <br> Cost: ` + leafUpgradeCost.LU8 + ` Leaves`;
    document.getElementById("L8").disabled = true;
    console.log(`L8 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}
function L9() {
    if (gameData.leaves >= leafUpgradeCost.LU9) {
    gameData.leaves -= leafUpgradeCost.LU9;
    leafUpgradeFactor.L4Amt = 4;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L9").innerHTML = `L9 <br> Develop II (Bought) <br> Increase L4's Boost <br> Cost: ` + leafUpgradeCost.LU9 + ` Leaves <br> Effect: x/10 -> x/4`;
    document.getElementById("L9").disabled = true;
    console.log(`L9 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}

function L10UpgradeFormula() {
  leafUpgradeFactor.L10 = 1.1 ** gameData.leafUpgradeCounter;
}
function L10() {
    if (gameData.leaves >= leafUpgradeCost.LU10) {
        while (leafUpgradeFactor.L10Bought == false) {
            gameData.leaves -= leafUpgradeCost.LU10;
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L10").disabled = true;
            leafUpgradeFactor.L10Bought = true;
        }
        if (leafUpgradeFactor.L10Bought == true) {
            gameData.leafUpgradeCounter += 1;
            L10UpgradeFormula();
            gameData.leavesPerTick *= leafUpgradeFactor.L10;
            document.getElementById("L10").innerHTML = `L10 <br> Grow Power (Bought) <br> Every Leaf Upgrade Bought Multiplies Leaves by 1.1 <br> Cost: ` + leafUpgradeCost.LU10 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L10, 3)}x`;
            console.log(`L10 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
            leafUpgradeFactor.L10AtUpgradeBought = leafUpgradeFactor.L10;
        }
    }
}
export function L10UpgradeUpdater() {
  if (leafUpgradeFactor.L10Bought == true) {
  setTimeout(L10UpgradeFormula, (gameData.refreshRate * 2));
  const deltaL10U = leafUpgradeFactor.L10 - leafUpgradeFactor.L10AtUpgradeBought;
  gameData.leavesPerTick *= (deltaL10U + 1);
  document.getElementById("L10").innerHTML = `L10 <br> Grow Power (Bought) <br> Every LU Bought <br> Multiplies Leaves by 1.1 <br> Cost: ` + leafUpgradeCost.LU10 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L10, 3)}x`;
  leafUpgradeFactor.L10AtUpgradeBought = leafUpgradeFactor.L10;
  }
}

function L11UpgradeFormula() {
  leafUpgradeFactor.L11 = Math.log10(gameData.leaves + 1) + 1;
}
function L11() {
    if (gameData.leaves >= leafUpgradeCost.LU11) {
        while (leafUpgradeFactor.L11Bought == false) {
            gameData.leaves -= leafUpgradeCost.LU11;
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L11").disabled = true;
            leafUpgradeFactor.L11Bought = true;
        }
        if (leafUpgradeFactor.L11Bought == true) {
            gameData.leafUpgradeCounter += 1;
            L11UpgradeFormula();
            gameData.leavesPerTick *= leafUpgradeFactor.L11;
            document.getElementById("L11").innerHTML = `L11 <br> Self-Synergy (Bought) <br> Leaves boost their own production <br> Cost: ` + leafUpgradeCost.LU11 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L11, 3)}x`;
            console.log(`L11 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
            leafUpgradeFactor.L11AtUpgradeBought = leafUpgradeFactor.L11;
        }
    }
}
export function L11UpgradeUpdater() {
  if (leafUpgradeFactor.L11Bought == true) {
  setTimeout(L11UpgradeFormula, (gameData.refreshRate * 2));
  const deltaL11U = leafUpgradeFactor.L11 - leafUpgradeFactor.L11AtUpgradeBought;
  gameData.leavesPerTick *= (deltaL11U + 1);
  document.getElementById("L11").innerHTML = `L11 <br> Self-Synergy (Bought) <br> Leaves boost their own production <br> Cost: ` + leafUpgradeCost.LU11 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L11, 3)}x`;
  leafUpgradeFactor.L11AtUpgradeBought = leafUpgradeFactor.L11;
  }
}
function L12() {
    if (gameData.leaves >= leafUpgradeCost.LU12) {
    gameData.leaves -= leafUpgradeCost.LU12;
    gameData.leavesPerTick *= 4;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L12").innerHTML = `L12 <br> Grow VII (Bought) <br> x5 Leaves <br> Cost: ${leafUpgradeCost.LU12} Leaves`;
    document.getElementById("L12").disabled = true;
    console.log(`L12 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}
function L13() {
    if (gameData.leaves >= leafUpgradeCost.LU13) {
    gameData.leaves -= leafUpgradeCost.LU13;
    gameData.leavesPerTick *= 4;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L13").innerHTML = `L13 <br> Grow VIII (Bought) <br> x4 Leaves <br> Cost: ${leafUpgradeCost.LU13} Leaves`;
    document.getElementById("L13").disabled = true;
    console.log(`L13 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}
function L14() {
    if (gameData.leaves >= leafUpgradeCost.LU14) {
    gameData.leaves -= leafUpgradeCost.LU14;
    gameData.leavesPerTick *= 5;
    gameData.leafUpgradeCounter += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L14").innerHTML = `L14 <br> Grow IX (Bought) <br> x5 Leaves <br> Cost: ${leafUpgradeCost.LU14} Leaves`;
    document.getElementById("L14").disabled = true;
    console.log(`L14 is bought, gameData.leavesPerTick is now ${gameData.leavesPerTick}`);
    }
}

document.getElementById("L1").addEventListener("click", startGeneration);
document.getElementById("L2").addEventListener("click", L2);
document.getElementById("L3").addEventListener("click", L3);
document.getElementById("L4").addEventListener("click", L4);
document.getElementById("L5").addEventListener("click", L5);
document.getElementById("L6").addEventListener("click", L6);
document.getElementById("L7").addEventListener("click", L7);
document.getElementById("L8").addEventListener("click", L8);
document.getElementById("L9").addEventListener("click", L9);
document.getElementById("L10").addEventListener("click", L10);
document.getElementById("L11").addEventListener("click", L11);
document.getElementById("L12").addEventListener("click", L12);
document.getElementById("L13").addEventListener("click", L13);
document.getElementById("L14").addEventListener("click", L14);
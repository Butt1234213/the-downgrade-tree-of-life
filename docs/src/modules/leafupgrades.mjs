import { gameData, leafUpgradeCost, leafUpgradeFactor, truncateToDecimalPlaces } from './core/bunchobullshit.mjs'
import { gameLoop } from './core/gameloopbutmodule.mjs'
import { massAchievementChecker, achievements } from './achievements.mjs';
import { createCallableUpgrade } from './core/upgradebuilder.mjs';

export function laggyAssFunction() {
    L1();
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
    L18();
    L19();
    L20();
    L21();
    L22();
    L23();
    L24();
    L25();
    L26();
    L27();
    L28();
}
export function L1() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU1)) {
        leafUpgradeFactor.L1Bought = true;
        document.getElementById("L1").innerHTML = `L1 (Bought)<br>Start Generating Leaves<br>Cost: 0 Leaves`
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 1, leafUpgradeCost.LU1, true, startGeneration());
    }
}
function startGeneration() {
    gameData.gameStarted = true;
    gameData.tickSpeedMultiplier = new Decimal(1);
    gameData.treeAgePerTick = new Decimal(1);
    gameData.leavesPerTick = gameData.leavesStartingPerTick;
    achievements.ach11 = true;
    massAchievementChecker();
    gameLoop();
}
export function L2() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU2)) {
        leafUpgradeFactor.L2Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 2, leafUpgradeCost.LU2, false, null);
    }
}
export function L3() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU3)) {
        leafUpgradeFactor.L3Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 3, leafUpgradeCost.LU3, false, null);
    }
}
function ach12() {
    achievements.ach12 = true;
    massAchievementChecker();
}
export function L4() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU4)) {
        leafUpgradeFactor.L4Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 4, leafUpgradeCost.LU4, true, ach12());
    }
}
export function L5() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU5)) {
        leafUpgradeFactor.L5Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 5, leafUpgradeCost.LU5, false, null);
    }
}
export function L6() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU6)) {
        leafUpgradeFactor.L6Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 6, leafUpgradeCost.LU6, false, null);
    }
}
export function L7() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU7)) {
        leafUpgradeFactor.L7Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 7, leafUpgradeCost.LU7, false, null);
    }
}
export function L8() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU8)) {
        leafUpgradeFactor.L8Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 8, leafUpgradeCost.LU8, false, null);
    }
}
export function L9() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU9)) {
        leafUpgradeFactor.L9Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 9, leafUpgradeCost.LU9, false, null);
    }
}
export function L10() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU10)) {
        leafUpgradeFactor.L10Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 10, leafUpgradeCost.LU10, false, null);
    }
}
function ach13() {
    achievements.ach13 = true;
    massAchievementChecker();
}
export function L11() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU11)) {
        leafUpgradeFactor.L11Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 11, leafUpgradeCost.LU11, true, ach13());
    }
}
export function L12() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU12)) {
        leafUpgradeFactor.L12Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 12, leafUpgradeCost.LU12, false, null);
    }
}
export function L13() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU13)) {
        leafUpgradeFactor.L13Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 13, leafUpgradeCost.LU13, false, null);
    }
}
export function L14() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU14)) {
        leafUpgradeFactor.L14Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 14, leafUpgradeCost.LU14, false, null);
    }
}
function ach15() {
    achievements.ach15 = true;
    massAchievementChecker();
}
export function L15() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU15)) {
        leafUpgradeFactor.L15Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 15, leafUpgradeCost.LU15, true, ach15());
    }
}
export function L16() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU16)) {
        leafUpgradeFactor.L16Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 16, leafUpgradeCost.LU16, false, null);
    }
}
export function L17() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU17)) {
        leafUpgradeFactor.L17Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 17, leafUpgradeCost.LU17, false, null);
    }
}
export function L18() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU18)) {
        leafUpgradeFactor.L18Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 18, leafUpgradeCost.LU18, false, null);
    }
}
export function L19() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU19)) {
        leafUpgradeFactor.L19Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 19, leafUpgradeCost.LU19, false, null);
    }
}
export function L20() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU20)) {
        leafUpgradeFactor.L20Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 20, leafUpgradeCost.LU20, false, null);
    }
}
export function L21() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU21)) {
        leafUpgradeFactor.L21Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 21, leafUpgradeCost.LU21, false, null);
    }
}
function ach33() {
    achievements.ach33 = true;
    massAchievementChecker();
}
export function L22() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU22)) {
        leafUpgradeFactor.L22Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 22, leafUpgradeCost.LU22, true, ach33());
    }
}
export function L23() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU23)) {
        leafUpgradeFactor.L23Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 23, leafUpgradeCost.LU23, false, null);
    }
}
export function L24() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU24)) {
        leafUpgradeFactor.L24Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 24, leafUpgradeCost.LU24, false, null);
    }
}
export function L25() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU25)) {
        leafUpgradeFactor.L25Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 25, leafUpgradeCost.LU25, false, null);
    }
}
export function L26() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU26)) {
        leafUpgradeFactor.L26Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 26, leafUpgradeCost.LU26, false, null);
    }
}
export function L27() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU27)) {
        leafUpgradeFactor.L27Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 27, leafUpgradeCost.LU27, false, null);
    }
}
function ach35() {
    achievements.ach35 = true;
    massAchievementChecker();
}
export function L28() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU28)) {
        leafUpgradeFactor.L28Bought = true;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 28, leafUpgradeCost.LU28, true, ach35());
    }
}
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
    L29();
    L30();
    L31();
    L32();
    L33();
    L34();
    L35();
    L36();
    L37();
    L38();
    L39();
    L40();
    L41();
    L42();
    L43();
    L44();
    L45();
    L46();
    L47();
    L48();
    L49();
    L50();
    L51();
    L52();
    L53();
    L54();
    L55();
    L56();
    L57();
    L58();
    L59();
    L60();
    L61();
    L62();
    L63();
    L64();
}

export var functions = {};

export function L1() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU1)) {
        leafUpgradeFactor.L1Bought = true;
        document.getElementById("L1").innerHTML = `L1 (Bought)<br>Start Generating Leaves<br>Cost: 0 Leaves`;
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 1, leafUpgradeCost.LU1, true, startGeneration());
    }
}
function startGeneration() {
    gameData.refreshRate = 40;
    gameData.tickSpeedMultiplier = new Decimal(1);
    gameData.treeAgePerTick = new Decimal(1);
    gameData.leavesPerTick = new Decimal(1);
    achievements.ach11 = true;
    massAchievementChecker();
    gameData.gameStarted = true;
    gameLoop();
}
export function L2() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU2)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 2, leafUpgradeCost.LU2, false, null);
        leafUpgradeFactor.L2Bought = true;
    }
}
export function L3() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU3)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 3, leafUpgradeCost.LU3, false, null);
        leafUpgradeFactor.L3Bought = true;
    }
}
function ach12() {
    achievements.ach12 = true;
    massAchievementChecker();
}
export function L4() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU4)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 4, leafUpgradeCost.LU4, true, ach12());
        leafUpgradeFactor.L4Bought = true;
    }
}
export function L5() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU5)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 5, leafUpgradeCost.LU5, false, null);
        leafUpgradeFactor.L5Bought = true;
    }
}
export function L6() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU6)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 6, leafUpgradeCost.LU6, false, null);
        leafUpgradeFactor.L6Bought = true;
    }
}
export function L7() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU7)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 7, leafUpgradeCost.LU7, false, null);
        leafUpgradeFactor.L7Bought = true;
    }
}
export function L8() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU8)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 8, leafUpgradeCost.LU8, false, null);
        leafUpgradeFactor.L8Bought = true;
    }
}
export function L9() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU9)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 9, leafUpgradeCost.LU9, false, null);
        leafUpgradeFactor.L9Bought = true;
    }
}
export function L10() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU10)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 10, leafUpgradeCost.LU10, false, null);
        leafUpgradeFactor.L10Bought = true;
    }
}
function ach13() {
    achievements.ach13 = true;
    massAchievementChecker();
}
export function L11() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU11)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 11, leafUpgradeCost.LU11, true, ach13());
        leafUpgradeFactor.L11Bought = true;
    }
}
export function L12() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU12)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 12, leafUpgradeCost.LU12, false, null);
        leafUpgradeFactor.L12Bought = true;
    }
}
export function L13() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU13)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 13, leafUpgradeCost.LU13, false, null);
        leafUpgradeFactor.L13Bought = true;
    }
}
export function L14() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU14)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 14, leafUpgradeCost.LU14, false, null);
        leafUpgradeFactor.L14Bought = true;
    }
}
function ach15() {
    achievements.ach15 = true;
    massAchievementChecker();
}
export function L15() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU15)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 15, leafUpgradeCost.LU15, true, ach15());
        leafUpgradeFactor.L15Bought = true;
    }
}
export function L16() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU16)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 16, leafUpgradeCost.LU16, false, null);
        leafUpgradeFactor.L16Bought = true;
    }
}
export function L17() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU17)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 17, leafUpgradeCost.LU17, false, null);
        leafUpgradeFactor.L17Bought = true;
    }
}
export function L18() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU18)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 18, leafUpgradeCost.LU18, false, null);
        leafUpgradeFactor.L18Bought = true;
    }
}
export function L19() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU19)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 19, leafUpgradeCost.LU19, false, null);
        leafUpgradeFactor.L19Bought = true;
    }
}
export function L20() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU20)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 20, leafUpgradeCost.LU20, false, null);
        leafUpgradeFactor.L20Bought = true;
    }
}
export function L21() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU21)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 21, leafUpgradeCost.LU21, false, null);
        leafUpgradeFactor.L21Bought = true;
    }
}
function ach33() {
    achievements.ach33 = true;
    massAchievementChecker();
}
export function L22() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU22)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 22, leafUpgradeCost.LU22, true, ach33());
        leafUpgradeFactor.L22Bought = true;
    }
}
export function L23() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU23)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 23, leafUpgradeCost.LU23, false, null);
        leafUpgradeFactor.L23Bought = true;
    }
}
export function L24() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU24)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 24, leafUpgradeCost.LU24, false, null);
        leafUpgradeFactor.L24Bought = true;
    }
}
export function L25() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU25)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 25, leafUpgradeCost.LU25, false, null);
        leafUpgradeFactor.L25Bought = true;
    }
}
export function L26() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU26)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 26, leafUpgradeCost.LU26, false, null);
        leafUpgradeFactor.L26Bought = true;
    }
}
export function L27() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU27)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 27, leafUpgradeCost.LU27, false, null);
        leafUpgradeFactor.L27Bought = true;
    }
}
function ach35() {
    achievements.ach35 = true;
    massAchievementChecker();
}
export function L28() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU28)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 28, leafUpgradeCost.LU28, true, ach35());
        leafUpgradeFactor.L28Bought = true;
    }
}
export function L29() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU29)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 29, leafUpgradeCost.LU29, false, null);
        document.getElementById('L29').innerHTML = 'L29 (Bought)<br>More Potential I<br>-2.5 Leaf root in the PE formula<br>Cost: 1e75 Leaves';
        leafUpgradeFactor.L29Bought = true;
    }
}
export function L30() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU30)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 30, leafUpgradeCost.LU30, false, null);
        leafUpgradeFactor.L30Bought = true;
    }
}
export function L31() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU31)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 31, leafUpgradeCost.LU31, false, null);
        leafUpgradeFactor.L31Bought = true;
    }
}
export function L32() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU32)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 32, leafUpgradeCost.LU32, false, null);
        leafUpgradeFactor.L32Bought = true;
    }
}
export function L33() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU33)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 33, leafUpgradeCost.LU33, false, null);
        leafUpgradeFactor.L33Bought = true;
    }
}
export function L34() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU34)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 34, leafUpgradeCost.LU34, false, null);
        leafUpgradeFactor.L34Bought = true;
    }
}
export function L35() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU35)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 35, leafUpgradeCost.LU35, false, null);
        leafUpgradeFactor.L35Bought = true;
    }
}
export function L36() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU36)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 36, leafUpgradeCost.LU36, false, null);
        leafUpgradeFactor.L36Bought = true;
    }
}
export function L37() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU37)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 37, leafUpgradeCost.LU37, false, null);
        leafUpgradeFactor.L37Bought = true;
    }
}
export function L38() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU38)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 38, leafUpgradeCost.LU38, false, null);
        leafUpgradeFactor.L38Bought = true;
    }
}
export function L39() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU39)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 39, leafUpgradeCost.LU39, false, null);
        leafUpgradeFactor.L39Bought = true;
    }
}
export function L40() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU40)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 40, leafUpgradeCost.LU40, false, null);
        leafUpgradeFactor.L40Bought = true;
    }
}
export function L41() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU41)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 41, leafUpgradeCost.LU41, false, null);
        leafUpgradeFactor.L41Bought = true;
    }
}
export function L42() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU42)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 42, leafUpgradeCost.LU42, false, null);
        leafUpgradeFactor.L42Bought = true;
    }
}
export function L43() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU43)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 43, leafUpgradeCost.LU43, false, null);
        leafUpgradeFactor.L43Bought = true;
    }
}
export function L44() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU44)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 44, leafUpgradeCost.LU44, false, null);
        leafUpgradeFactor.L44Bought = true;
    }
}
export function L45() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU45)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 45, leafUpgradeCost.LU45, false, null);
        leafUpgradeFactor.L45Bought = true;
    }
}
export function L46() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU46)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 46, leafUpgradeCost.LU46, false, null);
        leafUpgradeFactor.L46Bought = true;
    }
}
export function L47() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU47)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 47, leafUpgradeCost.LU47, false, null);
        leafUpgradeFactor.L47Bought = true;
    }
}
export function L48() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU48)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 48, leafUpgradeCost.LU48, false, null);
        leafUpgradeFactor.L48Bought = true;
    }
}
export function L49() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU49)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 49, leafUpgradeCost.LU49, false, null);
        leafUpgradeFactor.L49Bought = true;
    }
}
export function L50() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU50)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 50, leafUpgradeCost.LU50, false, null);
        leafUpgradeFactor.L50Bought = true;
    }
}
export function L51() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU51)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 51, leafUpgradeCost.LU51, false, null);
        leafUpgradeFactor.L51Bought = true;
    }
}
export function L52() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU52)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 52, leafUpgradeCost.LU52, false, null);
        leafUpgradeFactor.L52Bought = true;
    }
}
function ach71() {
    document.querySelector('.buttons-temple-tab-color').style.visibility = 'visible';
    document.querySelector('.buttons-lru-holder').style.visibility = 'visible';
    achievements.ach71 = true;
    massAchievementChecker();
}
export function L53() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU53)) {
        document.getElementById('L53').innerHTML = `L53 (Bought)<br>The Statue<br>Unlock the Leaves repeatable upgrade<br>Cost: 1e500 Leaves`
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 53, leafUpgradeCost.LU53, true, ach71());
        leafUpgradeFactor.L53Bought = true;
    }
}
export function L54() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU54)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 54, leafUpgradeCost.LU54, false, null);
        leafUpgradeFactor.L54Bought = true;
    }
}
export function L55() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU55)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 55, leafUpgradeCost.LU55, false, null);
        leafUpgradeFactor.L55Bought = true;
    }
}
export function L56() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU56)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 56, leafUpgradeCost.LU56, false, null);
        leafUpgradeFactor.L56Bought = true;
    }
}
export function L57() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU57)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 57, leafUpgradeCost.LU57, false, null);
        leafUpgradeFactor.L57Bought = true;
    }
}
export function L58() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU58)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 58, leafUpgradeCost.LU58, false, null);
        leafUpgradeFactor.L58Bought = true;
    }
}
export function L59() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU59)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 59, leafUpgradeCost.LU59, false, null);
        leafUpgradeFactor.L59Bought = true;
    }
}
export function L60() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU60)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 60, leafUpgradeCost.LU60, false, null);
        leafUpgradeFactor.L60Bought = true;
    }
}
export function L61() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU61)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 61, leafUpgradeCost.LU61, false, null);
        leafUpgradeFactor.L61Bought = true;
    }
}
export function L62() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU62)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 62, leafUpgradeCost.LU62, false, null);
        leafUpgradeFactor.L62Bought = true;
    }
}
export function L63() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU63)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 63, leafUpgradeCost.LU63, false, null);
        leafUpgradeFactor.L63Bought = true;
    }
}
export function L64() {
    if (gameData.leaves.greaterThanOrEqualTo(leafUpgradeCost.LU64)) {
        gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('leaf', 64, leafUpgradeCost.LU64, false, null);
        leafUpgradeFactor.L64Bought = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    functions.L1 = L1;
    functions.L2 = L2;
    functions.L3 = L3;
    functions.L4 = L4;
    functions.L5 = L5;
    functions.L6 = L6;
    functions.L7 = L7;
    functions.L8 = L8;
    functions.L9 = L9;
    functions.L10 = L10;
    functions.L11 = L11;
    functions.L12 = L12;
    functions.L13 = L13;
    functions.L14 = L14;
    functions.L15 = L15;
    functions.L16 = L16;
    functions.L17 = L17;
    functions.L18 = L18;
    functions.L19 = L19;
    functions.L20 = L20;
    functions.L21 = L21;
    functions.L22 = L22;
    functions.L23 = L23;
    functions.L24 = L24;
    functions.L25 = L25;
    functions.L26 = L26;
    functions.L27 = L27;
    functions.L28 = L28;
    functions.L29 = L29;
    functions.L30 = L30;
    functions.L31 = L31;
    functions.L32 = L32;
    functions.L33 = L33;
    functions.L34 = L34;
    functions.L35 = L35;
    functions.L36 = L36;
    functions.L37 = L37;
    functions.L38 = L38;
    functions.L39 = L39;
    functions.L40 = L40;
    functions.L41 = L41;
    functions.L42 = L42;
    functions.L43 = L43;
    functions.L44 = L44;
    functions.L45 = L45;
    functions.L46 = L46;
    functions.L47 = L47;
    functions.L48 = L48;
    functions.L49 = L49;
    functions.L50 = L50;
    functions.L51 = L51;
    functions.L52 = L52;
    functions.L53 = L53;
    functions.L54 = L54;
    functions.L55 = L55;
    functions.L56 = L56;
    functions.L57 = L57;
    functions.L58 = L58;
    functions.L59 = L59;
    functions.L60 = L60;
    functions.L61 = L61;
    functions.L62 = L62;
    functions.L63 = L63;
    functions.L64 = L64;
});
import { gameData, fruitUpgradeCost, fruitUpgradeFactor, truncateToDecimalPlaces } from './core/bunchobullshit.mjs'
import { achievements, massAchievementChecker } from './achievements.mjs';
import { createCallableUpgrade } from './core/upgradebuilder.mjs';

export function laggyAssFunction() {
    F1();
    F2();
    F3();
    F4();
    F5();
    F6();
    F7();
    F8();
    F9();
    F10();
    F11();
    F12();
    F13();
    F14();
    F15();
    F16();
    F17();
    F18();
    F19();
    F20();
    F21();
    F22();
    F23();
    F24();
    F25();
    F26();
    F27();
    F28();
    F29();
    F30();
    F31();
    F32();
    F33();
    F34();
    F35();
    F36();
    F37();
    F38();
    F39();
    F40();
    F41();
    F42();
    F43();
    F44();
    F45();
    F46();
}

export var functions = {};

function ach24() {
    document.querySelector('.buttons-composter-tab-color').style.visibility = 'visible';
    document.querySelector('.leaf-composter-background').style.visibility = 'visible';
    gameData.leafComposterUnlocked = true;
    gameData.totalComposters = new Decimal(1);
    achievements.ach24 = true;
    massAchievementChecker();
}
export function F1() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU1)) {
        document.getElementById("F1").innerHTML = `F1 (Bought)<br>The Composter I<br>Unlock the Composter<br>Cost: 1 Fruits`
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 1, fruitUpgradeCost.FU1, true, ach24());
        fruitUpgradeFactor.F1Bought = true;
    }
}
function ach25() {
    document.querySelector('.seed-composter-background').style.visibility = 'visible';
    gameData.seedComposterUnlocked = true;
    gameData.totalComposters = new Decimal(2);
    achievements.ach25 = true;
    massAchievementChecker();
}
export function F2() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU2)) {
        document.getElementById("F2").innerHTML = `F2 (Bought)<br>The Composter II<br>Unlock the second Composter<br>Cost: 4 Fruits`
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 2, fruitUpgradeCost.FU2, true, ach25());
        fruitUpgradeFactor.F2Bought = true;
    }
}
function ach31() {
    achievements.ach31 = true;
    massAchievementChecker();
}
export function F3() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU3)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 3, fruitUpgradeCost.FU3, true, ach31());
        fruitUpgradeFactor.F3Bought = true;
    }
}
export function F4() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU4)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 4, fruitUpgradeCost.FU4, false, null);
        fruitUpgradeFactor.F4Bought = true;
    }
}
export function F5() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU5)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 5, fruitUpgradeCost.FU5, false, null);
        fruitUpgradeFactor.F5Bought = true;
    }
}
export function F6() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU6)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 6, fruitUpgradeCost.FU6, false, null);
        fruitUpgradeFactor.F6Bought = true;
    }
}
function ach32() {
    document.querySelector('.fruit-composter-background').style.visibility = 'visible';
    gameData.fruitComposterUnlocked = true;
    gameData.totalComposters = new Decimal(3);
    achievements.ach32 = true;
    massAchievementChecker();
}
export function F7() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU7)) {
        document.getElementById("F7").innerHTML = `F7 (Bought)<br>The Composter III<br>Unlock the third Composter<br>Cost: 150 Fruits`
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 7, fruitUpgradeCost.FU7, true, ach32());
        fruitUpgradeFactor.F7Bought = true;
    }
}
export function F8() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU8)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 8, fruitUpgradeCost.FU8, false, null);
        fruitUpgradeFactor.F8Bought = true;
    }
}
export function F9() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU9)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 9, fruitUpgradeCost.FU9, false, null);
        fruitUpgradeFactor.F9Bought = true;
    }
}
export function F10() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU10)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 10, fruitUpgradeCost.FU10, false, null);
        fruitUpgradeFactor.F10Bought = true;
    }
}
export function F11() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU11)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 11, fruitUpgradeCost.FU11, false, null);
        fruitUpgradeFactor.F11Bought = true;
    }
}
export function F12() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU12)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 12, fruitUpgradeCost.FU12, false, null);
        fruitUpgradeFactor.F12Bought = true;
    }
}
export function F13() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU13)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 13, fruitUpgradeCost.FU13, false, null);
        fruitUpgradeFactor.F13Bought = true;
    }
}
export function F14() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU14)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 14, fruitUpgradeCost.FU14, false, null);
        fruitUpgradeFactor.F14Bought = true;
    }
}
export function F15() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU15)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 15, fruitUpgradeCost.FU15, false, null);
        fruitUpgradeFactor.F15Bought = true;
    }
}
export function F16() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU16)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 16, fruitUpgradeCost.FU16, false, null);
        fruitUpgradeFactor.F16Bought = true;
    }
}
function ach42() {
    document.querySelector('.entropy').style.visibility = 'visible';
    achievements.ach42 = true;
    massAchievementChecker();
}
export function F17() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU17)) {
        createCallableUpgrade('fruit', 17, fruitUpgradeCost.FU17, true, ach42());
        document.getElementById("F17").innerHTML = `F17 (Bought)<br>Chaotic Energy<br>Unlock Entropy<br>Cost: 700000 Fruits`
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        fruitUpgradeFactor.F17Bought = true;
    }
}
export function F18() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU18)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 18, fruitUpgradeCost.FU18, false, null);
        fruitUpgradeFactor.F18Bought = true;
    }
}
function ach43() {
    document.getElementById('mossTab').style.visibility = 'visible';
    document.querySelector('.moss-background').style.visibility = 'visible';
    document.querySelector('.moss-milestone-background').style.visibility = 'visible';
    gameData.mossUnlocked = true;
    achievements.ach43 = true;
    massAchievementChecker();
}
export function F19() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU19)) {
        createCallableUpgrade('fruit', 19, fruitUpgradeCost.FU19, true, ach43());
        document.getElementById("F19").innerHTML = `F19 (Bought)<br>Life in Upgrades<br>Unlock Moss<br>Cost: 2.5e8 Fruits`
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        fruitUpgradeFactor.F19Bought = true;
    }
}
export function F20() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU20)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 20, fruitUpgradeCost.FU20, false, null);
        fruitUpgradeFactor.F20Bought = true;
    }
}
export function F21() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU21)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 21, fruitUpgradeCost.FU21, false, null);
        fruitUpgradeFactor.F21Bought = true;
    }
}
export function F22() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU22)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 22, fruitUpgradeCost.FU22, false, null);
        fruitUpgradeFactor.F22Bought = true;
    }
}
export function F23() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU23)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 23, fruitUpgradeCost.FU23, false, null);
        fruitUpgradeFactor.F23Bought = true;
    }
}
export function F24() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU24)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 24, fruitUpgradeCost.FU24, false, null);
        fruitUpgradeFactor.F24Bought = true;
    }
}
export function F25() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU25)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 25, fruitUpgradeCost.FU25, false, null);
        fruitUpgradeFactor.F25Bought = true;
    }
}
export function F26() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU26)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 26, fruitUpgradeCost.FU26, false, null);
        fruitUpgradeFactor.F26Bought = true;
    }
}
export function F27() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU27)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 27, fruitUpgradeCost.FU27, false, null);
        fruitUpgradeFactor.F27Bought = true;
    }
}
export function F28() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU28)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 28, fruitUpgradeCost.FU28, false, null);
        fruitUpgradeFactor.F28Bought = true;
    }
}
export function F29() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU29)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 29, fruitUpgradeCost.FU29, false, null);
        fruitUpgradeFactor.F29Bought = true;
    }
}
export function F30() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU30)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 30, fruitUpgradeCost.FU30, false, null);
        fruitUpgradeFactor.F30Bought = true;
    }
}
export function F31() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU31)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 31, fruitUpgradeCost.FU31, false, null);
        fruitUpgradeFactor.F31Bought = true;
    }
}
export function F32() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU32)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 32, fruitUpgradeCost.FU32, false, null);
        fruitUpgradeFactor.F32Bought = true;
    }
}
export function F33() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU33)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 33, fruitUpgradeCost.FU33, false, null);
        fruitUpgradeFactor.F33Bought = true;
    }
}
function ach72() {
    achievements.ach72 = true;
    massAchievementChecker();
}
export function F34() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU34)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 34, fruitUpgradeCost.FU34, true, ach72());
        fruitUpgradeFactor.F34Bought = true;
    }
}
export function F35() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU35)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 35, fruitUpgradeCost.FU35, false, null);
        fruitUpgradeFactor.F35Bought = true;
    }
}
export function F36() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU36)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 36, fruitUpgradeCost.FU36, false, null);
        fruitUpgradeFactor.F36Bought = true;
    }
}
export function F37() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU37)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 37, fruitUpgradeCost.FU37, false, null);
        fruitUpgradeFactor.F37Bought = true;
    }
}
export function F38() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU38)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 38, fruitUpgradeCost.FU38, false, null);
        fruitUpgradeFactor.F38Bought = true;
    }
}
export function F39() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU39)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 39, fruitUpgradeCost.FU39, false, null);
        fruitUpgradeFactor.F39Bought = true;
    }
}
export function F40() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU40)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 40, fruitUpgradeCost.FU40, false, null);
        fruitUpgradeFactor.F40Bought = true;
    }
}
function ach91() {
	document.getElementById('F41').innerHTML = `F41 (Bought)<br>The Statue III<br>Unlock the Fruits repeatable upgrade<br>Cost: 1e1000 Fruits`;
    document.querySelector('.buttons-fru-holder').style.visibility = 'visible';
	achievements.ach91 = true;
	massAchievementChecker();
}
export function F41() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU41)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 41, fruitUpgradeCost.FU41, true, ach91());
        fruitUpgradeFactor.F41Bought = true;
    }
}
export function F42() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU42)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 42, fruitUpgradeCost.FU42, false, null);
        fruitUpgradeFactor.F42Bought = true;
    }
}
function ach105() {
	document.getElementById('F43').innerHTML = `F43 (Bought)<br>The Composter IV<br>Unlock the fourth Composter<br>Cost: 1e1500 Fruits`;
    document.querySelector('.entropy-composter-background').style.visibility = 'visible';
	gameData.entropyComposterUnlocked = true;
	achievements.ach105 = true;
	massAchievementChecker();
}
export function F43() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU43)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 43, fruitUpgradeCost.FU43, true, ach105());
        fruitUpgradeFactor.F43Bought = true;
    }
}
export function F44() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU44)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 44, fruitUpgradeCost.FU44, false, null);
        fruitUpgradeFactor.F44Bought = true;
    }
}
export function F45() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU45)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 45, fruitUpgradeCost.FU45, false, null);
        fruitUpgradeFactor.F45Bought = true;
    }
}
export function F46() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU46)) {
        gameData.fruitUpgradeCounter = gameData.fruitUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('fruit', 46, fruitUpgradeCost.FU46, false, null);
        fruitUpgradeFactor.F46Bought = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    functions.F1 = F1;
    functions.F2 = F2;
    functions.F3 = F3;
    functions.F4 = F4;
    functions.F5 = F5;
    functions.F6 = F6;
    functions.F7 = F7;
    functions.F8 = F8;
    functions.F9 = F9;
    functions.F10 = F10;
    functions.F11 = F11;
    functions.F12 = F12;
    functions.F13 = F13;
    functions.F14 = F14;
    functions.F15 = F15;
    functions.F16 = F16;
    functions.F17 = F17;
    functions.F18 = F18;
    functions.F19 = F19;
    functions.F20 = F20;
    functions.F21 = F21;
    functions.F22 = F22;
    functions.F23 = F23;
    functions.F24 = F24;
    functions.F25 = F25;
    functions.F26 = F26;
    functions.F27 = F27;
    functions.F28 = F28;
    functions.F29 = F29;
    functions.F30 = F30;
    functions.F31 = F31;
    functions.F32 = F32;
    functions.F33 = F33;
    functions.F34 = F34;
    functions.F35 = F35;
    functions.F36 = F36;
    functions.F37 = F37;
    functions.F38 = F38;
    functions.F39 = F39;
    functions.F40 = F40;
    functions.F41 = F41;
    functions.F42 = F42;
    functions.F43 = F43;
    functions.F44 = F44;
    functions.F45 = F45;
    functions.F46 = F46;
});
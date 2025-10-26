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
}

function ach24() {
    document.querySelector('.buttons-composter-tab-color').style.visibility = 'visible';
    document.querySelector('.leaf-composter-background').style.visibility = 'visible';
    achievements.ach24 = true;
    massAchievementChecker();
}
export function F1() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU1)) {
        fruitUpgradeFactor.F1Bought = true;
        document.getElementById("F1").innerHTML = `F1 (Bought)<br>The Composter I<br>Unlock the Composter<br>Cost: 1 Fruits`
        createCallableUpgrade('fruit', 1, fruitUpgradeCost.FU1, true, ach24());
    }
}
function ach25() {
    document.querySelector('.seed-composter-background').style.visibility = 'visible';
    achievements.ach25 = true;
    massAchievementChecker();
}
export function F2() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU2)) {
        fruitUpgradeFactor.F2Bought = true;
        document.getElementById("F2").innerHTML = `F2 (Bought)<br>The Composter II<br>Unlock the second Composter<br>Cost: 4 Fruits`
        createCallableUpgrade('fruit', 2, fruitUpgradeCost.FU2, true, ach25());
    }
}
function ach31() {
    achievements.ach31 = true;
    massAchievementChecker();
}
export function F3() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU3)) {
        fruitUpgradeFactor.F3Bought = true;
        createCallableUpgrade('fruit', 3, fruitUpgradeCost.FU3, true, ach31());
    }
}
export function F4() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU4)) {
        fruitUpgradeFactor.F4Bought = true;
        createCallableUpgrade('fruit', 4, fruitUpgradeCost.FU4, false, null);
    }
}
export function F5() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU5)) {
        fruitUpgradeFactor.F5Bought = true;
        createCallableUpgrade('fruit', 5, fruitUpgradeCost.FU5, false, null);
    }
}
export function F6() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU6)) {
        fruitUpgradeFactor.F6Bought = true;
        createCallableUpgrade('fruit', 6, fruitUpgradeCost.FU6, false, null);
    }
}
function ach32() {
    document.querySelector('.fruit-composter-background').style.visibility = 'visible';
    achievements.ach32 = true;
    massAchievementChecker();
}
export function F7() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU7)) {
        fruitUpgradeFactor.F7Bought = true;
        document.getElementById("F7").innerHTML = `F7 (Bought)<br>The Composter III<br>Unlock the third Composter<br>Cost: 150 Fruits`
        createCallableUpgrade('fruit', 7, fruitUpgradeCost.FU7, true, ach32());
    }
}
export function F8() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU8)) {
        createCallableUpgrade('fruit', 8, fruitUpgradeCost.FU8, false, null);
        fruitUpgradeFactor.F8Bought = true;
    }
}
export function F9() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU9)) {
        createCallableUpgrade('fruit', 9, fruitUpgradeCost.FU9, false, null);
        fruitUpgradeFactor.F9Bought = true;
    }
}
export function F10() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU10)) {
        createCallableUpgrade('fruit', 10, fruitUpgradeCost.FU10, false, null);
        fruitUpgradeFactor.F10Bought = true;
    }
}
export function F11() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU11)) {
        createCallableUpgrade('fruit', 11, fruitUpgradeCost.FU11, false, null);
        fruitUpgradeFactor.F11Bought = true;
    }
}
export function F12() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU12)) {
        createCallableUpgrade('fruit', 12, fruitUpgradeCost.FU12, false, null);
        fruitUpgradeFactor.F12Bought = true;
    }
}
export function F13() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU13)) {
        createCallableUpgrade('fruit', 13, fruitUpgradeCost.FU13, false, null);
        fruitUpgradeFactor.F13Bought = true;
    }
}
export function F14() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU14)) {
        createCallableUpgrade('fruit', 14, fruitUpgradeCost.FU14, false, null);
        fruitUpgradeFactor.F14Bought = true;
    }
}
export function F15() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU15)) {
        createCallableUpgrade('fruit', 15, fruitUpgradeCost.FU15, false, null);
        fruitUpgradeFactor.F15Bought = true;
    }
}
export function F16() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU16)) {
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
        fruitUpgradeFactor.F17Bought = true;
    }
}
export function F18() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU18)) {
        createCallableUpgrade('fruit', 18, fruitUpgradeCost.FU18, false, null);
        fruitUpgradeFactor.F18Bought = true;
    }
}
function ach43() {
    document.getElementById('mossTab').style.visibility = 'visible';
    gameData.mossUnlocked = true;
    achievements.ach43 = true;
    massAchievementChecker();
}
export function F19() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU19)) {
        createCallableUpgrade('fruit', 19, fruitUpgradeCost.FU19, true, ach43());
        document.getElementById("F19").innerHTML = `F19 (Bought)<br>Life in Upgrades<br>Unlock Moss<br>Cost: 2.5e8 Fruits`
        fruitUpgradeFactor.F19Bought = true;
    }
}
export function F20() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU20)) {
        createCallableUpgrade('fruit', 20, fruitUpgradeCost.FU20, false, null);
        fruitUpgradeFactor.F20Bought = true;
    }
}
export function F21() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU21)) {
        createCallableUpgrade('fruit', 21, fruitUpgradeCost.FU21, false, null);
        fruitUpgradeFactor.F21Bought = true;
    }
}
export function F22() {
    if (gameData.fruits.greaterThanOrEqualTo(fruitUpgradeCost.FU22)) {
        createCallableUpgrade('fruit', 22, fruitUpgradeCost.FU22, false, null);
        fruitUpgradeFactor.F22Bought = true;
    }
}
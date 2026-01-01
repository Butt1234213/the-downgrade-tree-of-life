import { gameData, seedUpgradeCost, seedUpgradeFactor, truncateToDecimalPlaces } from './core/bunchobullshit.mjs'
import { achievements, massAchievementChecker } from './achievements.mjs';
import { createCallableUpgrade } from './core/upgradebuilder.mjs';

export function laggyAssFunction() {
    S1();
    S2();
    S3();
    S4();
    S5();
    S6();
    S7();
    S8();
    S9();
    S10();
    S11();
    S12();
    S13();
    S14();
    S15();
    S16();
    S17();
    S18();
    S19();
    S20();
    S21();
    S22();
    S23();
    S24();
    S25();
    S26();
    S27();
    S28();
    S29();
    S30();
    S31();
    S32();
    S33();
    S34();
    S35();
    S36();
    S37();
    S38();
    S39();
    S40();
    S41();
    S42();
    S43();
    S44();
    S45();
    S46();
    S47();
    S48();
    S49();
    S50();
    S51();
}

export var functions = {};

export function S1() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU1)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 1, seedUpgradeCost.SU1, false, null);
        seedUpgradeFactor.S1Bought = true;
    }
}

export function S2() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU2)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 2, seedUpgradeCost.SU2, false, null);
        seedUpgradeFactor.S2Bought = true;
    }
}
function ach21() {
    achievements.ach21 = true;
    massAchievementChecker();
}
export function S3() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU3)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 3, seedUpgradeCost.SU3, true, ach21());
        seedUpgradeFactor.S3Bought = true;
    }
}
export function S4() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU4)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 4, seedUpgradeCost.SU4, false, null);
        seedUpgradeFactor.S4Bought = true;
    }
}
export function S5() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU5)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 5, seedUpgradeCost.SU5, false, null);
        seedUpgradeFactor.S5Bought = true;
    }
}
export function S6() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU6)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 6, seedUpgradeCost.SU6, false, null);
        seedUpgradeFactor.S6Bought = true;
    }
}
export function S7() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU7)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 7, seedUpgradeCost.SU7, false, null);
        seedUpgradeFactor.S7Bought = true;
    }
}
export function S8() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU8)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 8, seedUpgradeCost.SU8, false, null);
        seedUpgradeFactor.S8Bought = true;
    }
}
export function S9() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU9)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 9, seedUpgradeCost.SU9, false, null);
        seedUpgradeFactor.S9Bought = true;
    }
}
export function S10() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU10)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 10, seedUpgradeCost.SU10, false, null);
        seedUpgradeFactor.S10Bought = true;
    }
}
export function S11() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU11)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 11, seedUpgradeCost.SU11, false, null);
        seedUpgradeFactor.S11Bought = true;
    }
}
export function S12() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU12)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 12, seedUpgradeCost.SU12, false, null);
        seedUpgradeFactor.S12Bought = true;
    }
}
export function S13() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU13)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 13, seedUpgradeCost.SU13, false, null);
        seedUpgradeFactor.S13Bought = true;
    }
}
export function S14() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU14)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 14, seedUpgradeCost.SU14, false, null);
        seedUpgradeFactor.S14Bought = true;
    }
}
export function S15() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU15)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 15, seedUpgradeCost.SU15, false, null);
        seedUpgradeFactor.S15Bought = true;
    }
}
export function S16() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU16)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 16, seedUpgradeCost.SU16, false, null);
        seedUpgradeFactor.S16Bought = true;
    }
}
export function S17() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU17)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 17, seedUpgradeCost.SU17, false, null);
        seedUpgradeFactor.S17Bought = true;
    }
}
export function S18() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU18)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 18, seedUpgradeCost.SU18, false, null);
        seedUpgradeFactor.S18Bought = true;
    }
}
export function S19() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU19)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 19, seedUpgradeCost.SU19, false, null);
        seedUpgradeFactor.S19Bought = true;
    }
}
function ach34() {
    achievements.ach34 = true;
    massAchievementChecker();
}
export function S20() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU20)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 20, seedUpgradeCost.SU20, true, ach34());
        seedUpgradeFactor.S20Bought = true;
    }
}
export function S21() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU21)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 21, seedUpgradeCost.SU21, false, null);
        seedUpgradeFactor.S21Bought = true;
    }
}
export function S22() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU22)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 22, seedUpgradeCost.SU22, false, null);
        seedUpgradeFactor.S22Bought = true;
    }
}
export function S23() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU23)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 23, seedUpgradeCost.SU23, false, null);
        document.getElementById('S23').innerHTML = 'S23 (Bought)<br>More Potential II<br>-1.5 Seed root in the PE formula<br>Cost: 1e33 Seeds';
        seedUpgradeFactor.S23Bought = true;
    }
}
export function S24() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU24)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 24, seedUpgradeCost.SU24, false, null);
        seedUpgradeFactor.S24Bought = true;
    }
}
export function S25() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU25)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 25, seedUpgradeCost.SU25, false, null);
        seedUpgradeFactor.S25Bought = true;
    }
}
export function S26() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU26)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 26, seedUpgradeCost.SU26, false, null);
        seedUpgradeFactor.S26Bought = true;
    }
}
export function S27() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU27)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 27, seedUpgradeCost.SU27, false, null);
        seedUpgradeFactor.S27Bought = true;
    }
}
export function S28() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU28)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 28, seedUpgradeCost.SU28, false, null);
        seedUpgradeFactor.S28Bought = true;
    }
}
export function S29() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU29)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 29, seedUpgradeCost.SU29, false, null);
        seedUpgradeFactor.S29Bought = true;
    }
}
export function S30() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU30)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 30, seedUpgradeCost.SU30, false, null);
        seedUpgradeFactor.S30Bought = true;
    }
}
export function S31() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU31)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 31, seedUpgradeCost.SU31, false, null);
        seedUpgradeFactor.S31Bought = true;
    }
}
export function S32() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU32)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 32, seedUpgradeCost.SU32, false, null);
        seedUpgradeFactor.S32Bought = true;
    }
}
export function S33() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU33)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 33, seedUpgradeCost.SU33, false, null);
        seedUpgradeFactor.S33Bought = true;
    }
}
export function S34() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU34)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 34, seedUpgradeCost.SU34, false, null);
        seedUpgradeFactor.S34Bought = true;
    }
}
export function S35() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU35)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 35, seedUpgradeCost.SU35, false, null);
        seedUpgradeFactor.S35Bought = true;
    }
}
export function S36() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU36)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 36, seedUpgradeCost.SU36, false, null);
        seedUpgradeFactor.S36Bought = true;
    }
}
export function S37() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU37)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 37, seedUpgradeCost.SU37, false, null);
        seedUpgradeFactor.S37Bought = true;
    }
}
export function S38() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU38)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 38, seedUpgradeCost.SU38, false, null);
        seedUpgradeFactor.S38Bought = true;
    }
}
export function S39() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU39)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 39, seedUpgradeCost.SU39, false, null);
        seedUpgradeFactor.S39Bought = true;
    }
}
export function S40() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU40)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 40, seedUpgradeCost.SU40, false, null);
        seedUpgradeFactor.S40Bought = true;
    }
}
export function S41() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU41)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 41, seedUpgradeCost.SU41, false, null);
        seedUpgradeFactor.S41Bought = true;
    }
}
function ach83() {
	achievements.ach83 = true;
	massAchievementChecker();
	document.getElementById('S42').innerHTML = `S42 (Bought)<br>The Statue II<br>Unlock the Seeds repeatable upgrade<br>Cost: 1e1000 Seeds`;
    document.querySelector('.buttons-sru-holder').style.visibility = 'visible';
}
export function S42() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU42)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 42, seedUpgradeCost.SU42, true, ach83());
        seedUpgradeFactor.S42Bought = true;
    }
}
export function S43() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU43)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 43, seedUpgradeCost.SU43, false, null);
        seedUpgradeFactor.S43Bought = true;
    }
}
export function S44() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU44)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 44, seedUpgradeCost.SU44, false, null);
        seedUpgradeFactor.S44Bought = true;
    }
}
export function S45() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU45)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 45, seedUpgradeCost.SU45, false, null);
        seedUpgradeFactor.S45Bought = true;
    }
}
export function S46() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU46)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 46, seedUpgradeCost.SU46, false, null);
        seedUpgradeFactor.S46Bought = true;
    }
}
export function S47() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU47)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 47, seedUpgradeCost.SU47, false, null);
        seedUpgradeFactor.S47Bought = true;
    }
}
export function S48() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU48)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 48, seedUpgradeCost.SU48, false, null);
        seedUpgradeFactor.S48Bought = true;
    }
}
export function S49() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU49)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 49, seedUpgradeCost.SU49, false, null);
        seedUpgradeFactor.S49Bought = true;
    }
}
export function S50() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU50)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 50, seedUpgradeCost.SU50, false, null);
        seedUpgradeFactor.S50Bought = true;
    }
}
export function S51() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU51)) {
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 51, seedUpgradeCost.SU51, false, null);
        seedUpgradeFactor.S51Bought = true;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    functions.S1 = S1;
    functions.S2 = S2;
    functions.S3 = S3;
    functions.S4 = S4;
    functions.S5 = S5;
    functions.S6 = S6;
    functions.S7 = S7;
    functions.S8 = S8;
    functions.S9 = S9;
    functions.S10 = S10;
    functions.S11 = S11;
    functions.S12 = S12;
    functions.S13 = S13;
    functions.S14 = S14;
    functions.S15 = S15;
    functions.S16 = S16;
    functions.S17 = S17;
    functions.S18 = S18;
    functions.S19 = S19;
    functions.S20 = S20;
    functions.S21 = S21;
    functions.S22 = S22;
    functions.S23 = S23;
    functions.S24 = S24;
    functions.S25 = S25;
    functions.S26 = S26;
    functions.S27 = S27;
    functions.S28 = S28;
    functions.S29 = S29;
    functions.S30 = S30;
    functions.S31 = S31;
    functions.S32 = S32;
    functions.S33 = S33;
    functions.S34 = S34;
    functions.S35 = S35;
    functions.S36 = S36;
    functions.S37 = S37;
    functions.S38 = S38;
    functions.S39 = S39;
    functions.S40 = S40;
    functions.S41 = S41;
    functions.S42 = S42;
    functions.S43 = S43;
    functions.S44 = S44;
    functions.S45 = S45;
    functions.S46 = S46;
    functions.S47 = S47;
    functions.S48 = S48;
    functions.S49 = S49;
    functions.S50 = S50;
    functions.S51 = S51;
});
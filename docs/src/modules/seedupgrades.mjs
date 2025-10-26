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
}

export function S1() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU1)) {
        seedUpgradeFactor.S1Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 1, seedUpgradeCost.SU1, false, null);
    }
}

export function S2() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU2)) {
        seedUpgradeFactor.S2Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 2, seedUpgradeCost.SU2, false, null);
    }
}
function ach21() {
    achievements.ach21 = true;
    massAchievementChecker();
}
export function S3() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU3)) {
        seedUpgradeFactor.S3Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 3, seedUpgradeCost.SU3, true, ach21());
    }
}
export function S4() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU4)) {
        seedUpgradeFactor.S4Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 4, seedUpgradeCost.SU4, false, null);
    }
}
export function S5() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU5)) {
        seedUpgradeFactor.S5Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 5, seedUpgradeCost.SU5, false, null);
    }
}
export function S6() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU6)) {
        seedUpgradeFactor.S6Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 6, seedUpgradeCost.SU6, false, null);
    }
}
export function S7() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU7)) {
        seedUpgradeFactor.S7Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 7, seedUpgradeCost.SU7, false, null);
    }
}
export function S8() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU8)) {
        seedUpgradeFactor.S8Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 8, seedUpgradeCost.SU8, false, null);
    }
}
export function S9() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU9)) {
        seedUpgradeFactor.S9Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 9, seedUpgradeCost.SU9, false, null);
    }
}
export function S10() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU10)) {
        seedUpgradeFactor.S10Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 10, seedUpgradeCost.SU10, false, null);
    }
}
export function S11() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU11)) {
        seedUpgradeFactor.S11Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 11, seedUpgradeCost.SU11, false, null);
    }
}
export function S12() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU12)) {
        seedUpgradeFactor.S12Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 12, seedUpgradeCost.SU12, false, null);
    }
}
export function S13() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU13)) {
        seedUpgradeFactor.S13Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 13, seedUpgradeCost.SU13, false, null);
    }
}
export function S14() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU14)) {
        seedUpgradeFactor.S14Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 14, seedUpgradeCost.SU14, false, null);
    }
}
export function S15() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU15)) {
        seedUpgradeFactor.S15Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 15, seedUpgradeCost.SU15, false, null);
    }
}
export function S16() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU16)) {
        seedUpgradeFactor.S16Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 16, seedUpgradeCost.SU16, false, null);
    }
}
export function S17() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU17)) {
        seedUpgradeFactor.S17Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 17, seedUpgradeCost.SU17, false, null);
    }
}
export function S18() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU18)) {
        seedUpgradeFactor.S18Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 18, seedUpgradeCost.SU18, false, null);
    }
}
export function S19() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU19)) {
        seedUpgradeFactor.S19Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 19, seedUpgradeCost.SU19, false, null);
    }
}
function ach34() {
    achievements.ach34 = true;
    massAchievementChecker();
}
export function S20() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU20)) {
        seedUpgradeFactor.S20Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 20, seedUpgradeCost.SU20, true, ach34());
    }
}
export function S21() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU21)) {
        seedUpgradeFactor.S21Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 21, seedUpgradeCost.SU21, false, null);
    }
}
export function S22() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU22)) {
        seedUpgradeFactor.S22Bought = true;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('seed', 22, seedUpgradeCost.SU22, false, null);
    }
}
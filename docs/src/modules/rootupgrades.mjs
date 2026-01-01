import { gameData, rootUpgradeCost, rootUpgradeFactor } from './core/bunchobullshit.mjs'
import { createCallableUpgrade } from './core/upgradebuilder.mjs';
import { achievements, massAchievementChecker } from './achievements.mjs';

export function laggyAssFunction() {
    RO1();
    RO2();
    RO3();
    RO4();
    RO5();
    RO6();
    RO7();
    RO8();
}

export function RO1() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU1) || rootUpgradeFactor.RO1Bought) {
        document.getElementById("RO1").innerHTML = `RO1 (Bought)<br>Price of Power<br>^1.1 RuBisCo's effect<br>Cost: 0.5 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 1, rootUpgradeCost.ROU1, false, null);
        rootUpgradeFactor.RO1Bought = true;
    }
}
export function RO2() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU2) || rootUpgradeFactor.RO2Bought) {
        document.getElementById("RO2").innerHTML = `RO2 (Bought)<br>Price of Power<br>Storm reward boosts Seeds base mult<br>with reduced rate<br>Cost: 0.5 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 2, rootUpgradeCost.ROU2, false, null);
        rootUpgradeFactor.RO2Bought = true;
    }
}
export function RO3() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU3) || rootUpgradeFactor.RO3Bought) {
        document.getElementById("RO3").innerHTML = `RO3 (Bought)<br>Price of Power<br>x2.5 FR1's effect<br>Cost: 0.5 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 3, rootUpgradeCost.ROU3, false, null);
        rootUpgradeFactor.RO3Bought = true;
    }
}
export function RO4() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU4) || rootUpgradeFactor.RO4Bought) {
        document.getElementById("RO4").innerHTML = `RO4 (Bought)<br>Price of Power<br>Moss divides L, S, and F Composter costs<br>with reduced rate<br>Cost: 0.5 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 4, rootUpgradeCost.ROU4, false, null);
        rootUpgradeFactor.RO4Bought = true;
    }
}
export function RO5() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU5) || rootUpgradeFactor.RO5Bought) {
        document.getElementById("RO5").innerHTML = `RO5 (Bought)<br>Price of Power<br>Extensin's formula is better<br>+10<sup>1.05x</sup> per Protein -> +10<sup>1.5x</sup> per Protein<br>Cost: 0.5 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 5, rootUpgradeCost.ROU5, false, null);
        rootUpgradeFactor.RO5Bought = true;
    }
}
export function RO6() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU6) || rootUpgradeFactor.RO6Bought) {
        document.getElementById("RO6").innerHTML = `RO6 (Bought)<br>Price of Power<br>Every Protein gains 1 free level<br>Cost: 0.5 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 6, rootUpgradeCost.ROU6, false, null);
        rootUpgradeFactor.RO6Bought = true;
    }
}
export function RO7() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU7) || rootUpgradeFactor.RO7Bought) {
        document.getElementById("RO7").innerHTML = `RO7 (Bought)<br>Price of Power<br>x100 Game speed<br>Cost: 0.5 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 7, rootUpgradeCost.ROU7, false, null);
        rootUpgradeFactor.RO7Bought = true;
    }
}
export function RO8() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU8) || rootUpgradeFactor.RO8Bought) {
        document.getElementById("RO8").innerHTML = `RO8 (Bought)<br>Price of Power<br>LR2 increases all supercap roots<br>with reduced rate<br>Cost: 0.5 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 8, rootUpgradeCost.ROU8, false, null);
        rootUpgradeFactor.RO8Bought = true;
    }
}
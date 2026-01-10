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
    RO9();
    RO10();
    RO11();
    RO12();
    RO13();
    RO14();
    RO15();
    RO16();
    RO17();
    RO18();
    RO19();
    RO20();
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
export function RO9() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU9) || rootUpgradeFactor.RO9Bought) {
        document.getElementById("RO9").innerHTML = `RO9 (Bought)<br>Price of Power<br>^5 Cell replication cap<br>Cost: 0.5 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 9, rootUpgradeCost.ROU9, false, null);
        rootUpgradeFactor.RO9Bought = true;
    }
}
export function RO10() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU10) || rootUpgradeFactor.RO10Bought) {
        document.getElementById("RO10").innerHTML = `RO10 (Bought)<br>Price of Power<br>x1.15 Roots<br>Cost: 0.5 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 10, rootUpgradeCost.ROU10, false, null);
        rootUpgradeFactor.RO10Bought = true;
    }
}
export function RO11() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU11) || rootUpgradeFactor.RO11Bought) {
        document.getElementById("RO11").innerHTML = `RO11 (Bought)<br>Statue Power VII<br>+15 to LR2's cap<br>Cost: 2 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 11, rootUpgradeCost.ROU11, false, null);
        rootUpgradeFactor.RO11Bought = true;
    }
}
export function RO12() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU12) || rootUpgradeFactor.RO12Bought) {
        document.getElementById("RO12").innerHTML = `RO12 (Bought)<br>Statue Power VIII<br>+15 to SR2's cap<br>Cost: 2 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 12, rootUpgradeCost.ROU12, false, null);
        rootUpgradeFactor.RO12Bought = true;
    }
}
export function RO13() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU13) || rootUpgradeFactor.RO13Bought) {
        document.getElementById("RO13").innerHTML = `RO13 (Bought)<br>Composting Journies<br>Keep the Entropy Composter<br>on Reinforcement and x1.5 its effect<br>Cost: 5 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 13, rootUpgradeCost.ROU13, false, null);
        rootUpgradeFactor.RO13Bought = true;
    }
}
export function RO14() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU14) || rootUpgradeFactor.RO14Bought) {
        document.getElementById("RO14").innerHTML = `RO14 (Bought)<br>Mossy Roots I<br>MM1 - MM5 becomes<br>permanentally active<br>Cost: 5 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 14, rootUpgradeCost.ROU14, false, null);
        rootUpgradeFactor.RO14Bought = true;
    }
}
export function RO15() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU15) || rootUpgradeFactor.RO15Bought) {
        document.getElementById("RO15").innerHTML = `RO15 (Bought)<br>Mossy Roots II<br>M1's effect softcap is pushed back<br>+100 -> +300<br>Cost: 5 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 15, rootUpgradeCost.ROU15, false, null);
        rootUpgradeFactor.RO15Bought = true;
    }
}
export function RO16() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU16) || rootUpgradeFactor.RO16Bought) {
        document.getElementById("RO16").innerHTML = `RO16 (Bought)<br>Protein Shake<br>Every Protein gains another free level<br>Cost: 10 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 16, rootUpgradeCost.ROU16, false, null);
        rootUpgradeFactor.RO16Bought = true;
    }
}
export function RO17() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU17) || rootUpgradeFactor.RO17Bought) {
        document.getElementById("RO17").innerHTML = `RO17 (Bought)<br>Tap-root<br>Entropy boosts Roots<br>Cost: 15 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 17, rootUpgradeCost.ROU17, false, null);
        rootUpgradeFactor.RO17Bought = true;
    }
}
export function RO18() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU18) || rootUpgradeFactor.RO18Bought) {
        document.getElementById("RO18").innerHTML = `RO18 (Bought)<br>Bacterial Rooting<br>+1 Bacteria Types bulk<br>Cost: 20 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 18, rootUpgradeCost.ROU18, false, null);
        rootUpgradeFactor.RO18Bought = true;
    }
}
export function RO19() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU19) || rootUpgradeFactor.RO19Bought) {
        document.getElementById("RO19").innerHTML = `RO19 (Bought)<br>Growth Hormones<br>Unlock Fruit generation<br>Cost: 50 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 19, rootUpgradeCost.ROU19, false, null);
        rootUpgradeFactor.RO19Bought = true;
    }
}
function ach131() {
	achievements.ach131 = true;
	massAchievementChecker();
}
export function RO20() {
    if (gameData.roots.greaterThanOrEqualTo(rootUpgradeCost.ROU20) || rootUpgradeFactor.RO20Bought) {
        document.getElementById("RO20").innerHTML = `RO20 (Bought)<br>Microscopic Life<br>Manufacture a Petri Dish<br>Cost: 100 Roots`
        gameData.rootUpgradeCounter = gameData.rootUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('root', 20, rootUpgradeCost.ROU20, true, ach131());
        rootUpgradeFactor.RO20Bought = true;
    }
}
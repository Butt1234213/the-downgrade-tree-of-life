import { gameData, seedUpgradeCost, seedUpgradeFactor, truncateToDecimalPlaces } from './bunchobullshit.mjs'
import { achievements, massAchievementChecker } from './achievements.mjs';
import { startGeneration } from './leafupgrades.mjs'
import { gameLoop } from './gameloopbutmodule.mjs'

export function laggyAssFunction() {
    S1();
    S2();
    S3();
    S4();
    S5();
    S6();
    S7();
    S8();
}

export function S1() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU1)) {
        if (seedUpgradeFactor.S1Bought == false) {
            gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU1);
            document.getElementById("seedCounter").innerHTML = gameData.seeds + " Seeds";
            document.getElementById("S1").disabled = true;
            document.getElementById("S1").style.color = '#000000ff'
            document.getElementById("S1").style.borderColor = '#000000ff'
            seedUpgradeFactor.S1Bought = true;
            gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("S1").disabled = true;
            document.getElementById("S1").style.color = '#000000ff'
            document.getElementById("S1").style.borderColor = '#000000ff'
        }
    }
}

export function S2() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU2)) {
        if (seedUpgradeFactor.S2Bought == false) {
            gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU2);
            document.getElementById("seedCounter").innerHTML = gameData.seeds + " Seeds";
            document.getElementById("S2").disabled = true;
            document.getElementById("S2").style.color = '#000000ff'
            document.getElementById("S2").style.borderColor = '#000000ff'
            seedUpgradeFactor.S2Bought = true;
            gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("S2").disabled = true;
            document.getElementById("S2").style.color = '#000000ff'
            document.getElementById("S2").style.borderColor = '#000000ff'
        }
    }
}

export function S3() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU3)) {
        if (seedUpgradeFactor.S3Bought == false) {
            gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU3);
            document.getElementById("seedCounter").innerHTML = gameData.seeds + " Seeds";
            document.getElementById("S3").disabled = true;
            document.getElementById("S3").style.color = '#000000ff'
            document.getElementById("S3").style.borderColor = '#000000ff'
            seedUpgradeFactor.S3Bought = true;
            gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));

            achievements.ach21 = true;
        }
        else {
            document.getElementById("S3").disabled = true;
            document.getElementById("S3").style.color = '#000000ff'
            document.getElementById("S3").style.borderColor = '#000000ff'
        }
    }
}

export function S4() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU4)) {
        if (seedUpgradeFactor.S4Bought == false) {
            gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU4);
            document.getElementById("seedCounter").innerHTML = gameData.seeds + " Seeds";
            document.getElementById("S4").disabled = true;
            document.getElementById("S4").style.color = '#000000ff'
            document.getElementById("S4").style.borderColor = '#000000ff'
            seedUpgradeFactor.S4Bought = true;
            gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("S4").disabled = true;
            document.getElementById("S4").style.color = '#000000ff'
            document.getElementById("S4").style.borderColor = '#000000ff'
        }
    }
}

export function S5() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU5)) {
        if (seedUpgradeFactor.S5Bought == false) {
            gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU5);
            document.getElementById("seedCounter").innerHTML = gameData.seeds + " Seeds";
            document.getElementById("S5").disabled = true;
            document.getElementById("S5").style.color = '#000000ff'
            document.getElementById("S5").style.borderColor = '#000000ff'
            seedUpgradeFactor.S5Bought = true;
            gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("S5").disabled = true;
            document.getElementById("S5").style.color = '#000000ff'
            document.getElementById("S5").style.borderColor = '#000000ff'
        }
    }
}

export function S6() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU6)) {
        if (seedUpgradeFactor.S6Bought == false) {
            gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU6);
            document.getElementById("seedCounter").innerHTML = gameData.seeds + " Seeds";
            document.getElementById("S6").disabled = true;
            document.getElementById("S6").style.color = '#000000ff'
            document.getElementById("S6").style.borderColor = '#000000ff'
            seedUpgradeFactor.S6Bought = true;
            gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("S6").disabled = true;
            document.getElementById("S6").style.color = '#000000ff'
            document.getElementById("S6").style.borderColor = '#000000ff'
        }
    }
}

export function S7() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU7)) {
        if (seedUpgradeFactor.S7Bought == false) {
            gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU7);
            document.getElementById("seedCounter").innerHTML = gameData.seeds + " Seeds";
            document.getElementById("S7").disabled = true;
            document.getElementById("S7").style.color = '#000000ff'
            document.getElementById("S7").style.borderColor = '#000000ff'
            seedUpgradeFactor.S7Bought = true;
            gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("S7").disabled = true;
            document.getElementById("S7").style.color = '#000000ff'
            document.getElementById("S7").style.borderColor = '#000000ff'
        }
    }
}

export function S8() {
    if (gameData.seeds.greaterThanOrEqualTo(seedUpgradeCost.SU8)) {
        if (seedUpgradeFactor.S8Bought == false) {
            gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU8);
            document.getElementById("seedCounter").innerHTML = gameData.seeds + " Seeds";
            document.getElementById("S8").disabled = true;
            document.getElementById("S8").style.color = '#000000ff'
            document.getElementById("S8").style.borderColor = '#000000ff'
            seedUpgradeFactor.S8Bought = true;
            gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        }
        else {
            document.getElementById("S8").disabled = true;
            document.getElementById("S8").style.color = '#000000ff'
            document.getElementById("S8").style.borderColor = '#000000ff'
        }
    }
}
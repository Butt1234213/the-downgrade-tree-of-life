import { gameData, entropyUpgradeCost, entropyUpgradeFactor } from './core/bunchobullshit.mjs'
import { createCallableUpgrade } from './core/upgradebuilder.mjs';
import { achievements, massAchievementChecker } from './achievements.mjs';

export function laggyAssFunction() {
    E1();
    E2();
    E3();
    E4();
    E5();
    E6();
    E7();
    E8();
    E9();
    E10();
    E11();
    E12();
    E13();
    E14();
    E15();
    E16();
    E17();
    E18();
    E19();
    E20();
    E21();
    E22();
    E23();
    E24();
    E25();
    E26();
    E27();
    E28();
    E29();
    E30();
    E31();
    E32();
    E33();
    E34();
    E35();
    E36();
    E37();
    E38();
    E39();
    E40();
    E41();
    E42();
}
function ach45() {
    achievements.ach45 = true;
    massAchievementChecker();
    document.querySelector('.buttons-cellular-lab-tab-color').style.visibility = 'visible';
}
export function E1() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU1)) {
        document.getElementById("E1").innerHTML = `E1 (Bought)<br>Cellular Lab<br>Unlock the Cellular Lab<br>Cost: 1 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 1, entropyUpgradeCost.EU1, true, ach45());
        entropyUpgradeFactor.E1Bought = true;
    }
}
export function E2() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU2) || entropyUpgradeFactor.E2Bought) {
        document.getElementById("E2").innerHTML = `E2 (Bought)<br>Split of Decisions<br>Base Leaf Multiplier is ^ 1.5<br>Cost: 1 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 2, entropyUpgradeCost.EU2, false, null);
        entropyUpgradeFactor.E2Bought = true;
    }
}
export function E3() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU3) || entropyUpgradeFactor.E3Bought) {
        document.getElementById("E3").innerHTML = `E3 (Bought)<br>Split of Decisions<br>x15 Seeds<br>Cost: 1 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 3, entropyUpgradeCost.EU3, false, null);
        entropyUpgradeFactor.E3Bought = true;
    }
}
export function E4() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU4) || entropyUpgradeFactor.E4Bought) {
        document.getElementById("E4").innerHTML = `E4 (Bought)<br>Split of Decisions<br>Fruits boost themselves<br>Cost: 1 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 4, entropyUpgradeCost.EU4, false, null);
        entropyUpgradeFactor.E4Bought = true;
    }
}
export function E5() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU5) || entropyUpgradeFactor.E5Bought) {
        gameData.leafComposterUnlocked = true;
        gameData.seedComposterUnlocked = true;
        gameData.fruitComposterUnlocked = true;
        document.querySelector('.leaf-composter-background').style.visibility = 'visible';
        document.querySelector('.seed-composter-background').style.visibility = 'visible';
        document.querySelector('.fruit-composter-background').style.visibility = 'visible';
        document.getElementById("E5").innerHTML = `E5 (Bought)<br>Composting Experiences<br>Keep all Composters<br>on Transform<br>Cost: 2 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 5, entropyUpgradeCost.EU5, false, null);
        entropyUpgradeFactor.E5Bought = true;
    }
}
export function E6() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU6) || entropyUpgradeFactor.E6Bought) {
        document.getElementById("E6").innerHTML = `E6 (Bought)<br>Composting Power<br>Fertilizers boost Composting speed<br>Cost: 3 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 6, entropyUpgradeCost.EU6, false, null);
        entropyUpgradeFactor.E6Bought = true;
    }
}
export function E7() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU7) || entropyUpgradeFactor.E7Bought) {
        document.getElementById("E7").innerHTML = `E7 (Bought)<br>Size Expansion<br>L17's effect is boosted by Entropy<br>Cost: 5 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 7, entropyUpgradeCost.EU7, false, null);
        entropyUpgradeFactor.E7Bought = true;
    }
}
function ach53() {
    achievements.ach53 = true;
    massAchievementChecker();
}
export function E8() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU8) || entropyUpgradeFactor.E8Bought) {
        document.getElementById("E8").innerHTML = `E8 (Bought)<br>FINALLY<br>Keep all Fertilizers on all resets<br>(except Transform)<br>Cost: 8 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 8, entropyUpgradeCost.EU8, true, ach53());
        entropyUpgradeFactor.E8Bought = true;
    }
}
export function E9() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU9) || entropyUpgradeFactor.E9Bought) {
        document.getElementById("E9").innerHTML = `E9 (Bought)<br>Super Growth<br>L10 is boosted by Fruits<br>Cost: 7 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 9, entropyUpgradeCost.EU9, false, null);
        entropyUpgradeFactor.E9Bought = true;
    }
}
export function E10() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU10) || entropyUpgradeFactor.E10Bought) {
        document.getElementById("E10").innerHTML = `E10 (Bought)<br>Entropic Cheapener<br>Entropy delays Fertilizer scaling<br>Cost: 15 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 10, entropyUpgradeCost.EU10, false, null);
        entropyUpgradeFactor.E10Bought = true;
    }
}
export function E11() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU11) || entropyUpgradeFactor.E11Bought) {
        document.getElementById("E11").innerHTML = `E11 (Bought)<br>Cells Formation<br>Cells effect formula is better<br>Cost: 35 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 11, entropyUpgradeCost.EU11, false, null);
        entropyUpgradeFactor.E11Bought = true;
    }
}
export function E12() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU12) || entropyUpgradeFactor.E12Bought) {
        document.getElementById("E12").innerHTML = `E12 (Bought)<br>Power of Potential<br>Cells interval is divided<br>based on Entropy<br>Cost: 170 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 12, entropyUpgradeCost.EU12, false, null);
        entropyUpgradeFactor.E12Bought = true;
    }
}
export function E13() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU13) || entropyUpgradeFactor.E13Bought) {
        document.getElementById("E13").innerHTML = `E13 (Bought)<br>Split of Power<br>x50000 Leaves<br>Cost: 2500 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 13, entropyUpgradeCost.EU13, false, null);
        entropyUpgradeFactor.E13Bought = true;
    }
}
export function E14() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU14) || entropyUpgradeFactor.E14Bought) {
        document.getElementById("E14").innerHTML = `E14 (Bought)<br>Split of Power<br>x500 Seeds<br>Cost: 2500 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 14, entropyUpgradeCost.EU14, false, null);
        entropyUpgradeFactor.E14Bought = true;
    }
}
export function E15() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU15) || entropyUpgradeFactor.E15Bought) {
        document.getElementById("E15").innerHTML = `E15 (Bought)<br>Split of Power<br>x50 Fruits<br>Cost: 2500 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 15, entropyUpgradeCost.EU15, false, null);
        entropyUpgradeFactor.E15Bought = true;
    }
}
export function E16() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU16) || entropyUpgradeFactor.E16Bought) {
        document.getElementById("E16").innerHTML = `E16 (Bought)<br>Split of Power<br>x1.5 Entropy<br>Cost: 2500 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 16, entropyUpgradeCost.EU16, false, null);
        entropyUpgradeFactor.E16Bought = true;
    }
}
export function E17() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU17) || entropyUpgradeFactor.E17Bought) {
        document.getElementById("E17").innerHTML = `E17 (Bought)<br>Split of Power<br>-0.05 from Leaf softcap root<br>Cost: 2500 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 17, entropyUpgradeCost.EU17, false, null);
        entropyUpgradeFactor.E17Bought = true;
    }
}
function ach61() {
    document.getElementById("replicationAmount").style.visibility = 'visible';
    achievements.ach61 = true;
    massAchievementChecker();
}
export function E18() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU18) || entropyUpgradeFactor.E18Bought) {
        document.getElementById("E18").innerHTML = `E18 (Bought)<br>Multiplication<br>Unlock a new Cells upgrade<br>Cost: 10000 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 18, entropyUpgradeCost.EU18, true, ach61());
        entropyUpgradeFactor.E18Bought = true;
    }
}
export function E19() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU19) || entropyUpgradeFactor.E19Bought) {
        document.getElementById("E19").innerHTML = `E19 (Bought)<br>Conservation of Energy<br>x2 Entropy<br>Cost: 20000 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 19, entropyUpgradeCost.EU19, false, null);
        entropyUpgradeFactor.E19Bought = true;
    }
}
export function E20() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU20) || entropyUpgradeFactor.E20Bought) {
        document.getElementById("E20").innerHTML = `E20 (Bought)<br>Super Cells<br>C3 adds free C2 levels<br>Cost: 200000 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 20, entropyUpgradeCost.EU20, false, null);
        entropyUpgradeFactor.E20Bought = true;
    }
}
function ach64() {
    achievements.ach64 = true;
    massAchievementChecker();
    document.querySelector('.buttons-radar-tab-color').style.visibility = 'visible';
    document.querySelector('.challenge-storm').style.visibility = 'visible';
}
export function E21() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU21) || entropyUpgradeFactor.E21Bought) {
        document.getElementById("E21").innerHTML = `E21 (Bought)<br>Storm's a Brewin'<br>Unlock the Radar<br>Cost: 1.5e7 Entropy`
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 21, entropyUpgradeCost.EU21, true, ach64());
        entropyUpgradeFactor.E21Bought = true;
    }
}
export function E22() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU22) || entropyUpgradeFactor.E22Bought) {
        document.getElementById("E22").innerHTML = `E22 (Bought)<br>Bacteria Nucleoid<br>^1.05 Bacteria<br>Cost: 1e10 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 22, entropyUpgradeCost.EU22, false, null);
        entropyUpgradeFactor.E22Bought = true;
    }
}
export function E23() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU23) || entropyUpgradeFactor.E23Bought) {
        document.getElementById("E23").innerHTML = `E23 (Bought)<br>Compact Fertilizers<br>Divide Fertilizer<br>Super Scaling exponent by 1.075<br>Cost: 8.5e12 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 23, entropyUpgradeCost.EU23, false, null);
        entropyUpgradeFactor.E23Bought = true;
    }
}
export function E24() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU24) || entropyUpgradeFactor.E24Bought) {
        document.getElementById("E24").innerHTML = `E24 (Bought)<br>Statue Power I<br>+15 levels to LR1's cap<br>Cost: 1.6e16 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 24, entropyUpgradeCost.EU24, false, null);
        entropyUpgradeFactor.E24Bought = true;
    }
}
export function E25() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU25) || entropyUpgradeFactor.E25Bought) {
        document.getElementById("E25").innerHTML = `E25 (Bought)<br>Statue Power II<br>Entropy boosts LR1's effect<br>Cost: 1e18 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 25, entropyUpgradeCost.EU25, false, null);
        entropyUpgradeFactor.E25Bought = true;
    }
}
export function E26() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU26) || entropyUpgradeFactor.E26Bought) {
        document.getElementById("E26").innerHTML = `E26 (Bought)<br>Empower<br>Fruits boost E4's effect<br>Cost: 1e20 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 26, entropyUpgradeCost.EU26, false, null);
        entropyUpgradeFactor.E26Bought = true;
    }
}
export function E27() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU27) || entropyUpgradeFactor.E27Bought) {
        document.getElementById("E27").innerHTML = `E27 (Bought)<br>Statue Power III<br>+10 levels to LR1's cap<br>Cost: 1e22 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 27, entropyUpgradeCost.EU27, false, null);
        entropyUpgradeFactor.E27Bought = true;
    }
}
function ach81() {
    achievements.ach81 = true;
    massAchievementChecker();
    document.querySelector('.challenge-wildfire').style.visibility = 'visible';
}
export function E28() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU28) || entropyUpgradeFactor.E28Bought) {
        document.getElementById("E28").innerHTML = `E28 (Bought)<br>AAGGHHH I'M BURNING<br>Unlock the Wildfire Challenge<br>Cost: 1e22 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 28, entropyUpgradeCost.EU28, true, ach81());
        entropyUpgradeFactor.E28Bought = true;
    }
}
export function E29() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU29) || entropyUpgradeFactor.E29Bought) {
        document.getElementById("E29").innerHTML = `E29 (Bought)<br>Bacteria Ribosomes<br>Entropy boosts Bacteria cap<br>Cost: 7.5e23 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 29, entropyUpgradeCost.EU29, false, null);
        entropyUpgradeFactor.E29Bought = true;
    }
}
export function E30() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU30) || entropyUpgradeFactor.E30Bought) {
        document.getElementById("E30").innerHTML = `E30 (Bought)<br>Bacteria Flagellum<br>^1.25 Bacteria<br>Cost: 1e25 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 30, entropyUpgradeCost.EU30, false, null);
        entropyUpgradeFactor.E30Bought = true;
    }
}
export function E31() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU31) || entropyUpgradeFactor.E31Bought) {
        document.getElementById("E31").innerHTML = `E31 (Bought)<br>Helping Hand I<br>The Stormcap for Seeds and Fruits<br>is lowered from ^5 to ^3.5<br>Cost: 1e30 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 31, entropyUpgradeCost.EU31, false, null);
        entropyUpgradeFactor.E31Bought = true;
    }
}
export function E32() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU32) || entropyUpgradeFactor.E32Bought) {
        document.getElementById("E32").innerHTML = `E32 (Bought)<br>Free Fruits<br>-0.025 from Fruit softcap root<br>Cost: 3.33e33 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 32, entropyUpgradeCost.EU32, false, null);
        entropyUpgradeFactor.E32Bought = true;
    }
}
export function E33() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU33) || entropyUpgradeFactor.E33Bought) {
        document.getElementById("E33").innerHTML = `E33 (Bought)<br>Mitochondria<br>^1.5 CRS<br>Cost: 3e40 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 33, entropyUpgradeCost.EU33, false, null);
        entropyUpgradeFactor.E33Bought = true;
    }
}
function ach101() {
	achievements.ach101 = true;
	massAchievementChecker();
    document.querySelector('.challenge-drought').style.visibility = 'visible';
}
export function E34() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU34) || entropyUpgradeFactor.E34Bought) {
        document.getElementById("E34").innerHTML = `E34 (Bought)<br>Dry Out<br>Unlock the Drought Challenge<br>Cost: 2.5e45 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 34, entropyUpgradeCost.EU34, true, ach101());
        entropyUpgradeFactor.E34Bought = true;
    }
}
export function E35() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU35) || entropyUpgradeFactor.E35Bought) {
        document.getElementById("E35").innerHTML = `E35 (Bought)<br>Helping Hand II<br>Each composter gets 15 free Fertilizers,<br>not affected by the Wildfire<br>Cost: 1e50 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 35, entropyUpgradeCost.EU35, false, null);
        entropyUpgradeFactor.E35Bought = true;
    }
}
export function E36() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU36) || entropyUpgradeFactor.E36Bought) {
        document.getElementById("E36").innerHTML = `E36 (Bought)<br>"robloxretrotycoon"<br>Unlock Bacteria Types automation<br>Cost: 5e55 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 36, entropyUpgradeCost.EU36, false, null);
        entropyUpgradeFactor.E36Bought = true;
    }
}
export function E37() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU37) || entropyUpgradeFactor.E37Bought) {
        document.getElementById("E37").innerHTML = `E37 (Bought)<br>DNA Polymerase I<br>DNA's formula is better<br>1e10000<sup>1.5x</sup> -> 1e10000<sup>1.25x</sup><br>Cost: 1e64 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 37, entropyUpgradeCost.EU37, false, null);
        entropyUpgradeFactor.E37Bought = true;
    }
}
function ach111() {
	achievements.ach111 = true;
	massAchievementChecker();
}
export function E38() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU38) || entropyUpgradeFactor.E38Bought) {
        document.getElementById("E38").innerHTML = `E38 (Bought)<br>Nice<br>x6.9 Game speed<br>Cost: 6.9e69 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 38, entropyUpgradeCost.EU38, true, ach111());
        entropyUpgradeFactor.E38Bought = true;
    }
}
export function E39() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU39) || entropyUpgradeFactor.E39Bought) {
        document.getElementById("E39").innerHTML = `E39 (Bought)<br>Catalyzing Agent<br>^1.1 RuBisCo's effect<br>Cost: 4e73 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 39, entropyUpgradeCost.EU39, false, null);
        entropyUpgradeFactor.E39Bought = true;
    }
}
export function E40() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU40) || entropyUpgradeFactor.E40Bought) {
        document.getElementById("E40").innerHTML = `E40 (Bought)<br>Bacteria Cytoplasm<br>Bacteria's Fertilizer Base effectiveness<br>very slightly affects the Entropy Composter<br>Cost: 1e89 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 40, entropyUpgradeCost.EU40, false, null);
        entropyUpgradeFactor.E40Bought = true;
    }
}
export function E41() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU41) || entropyUpgradeFactor.E41Bought) {
        document.getElementById("E41").innerHTML = `E41 (Bought)<br>Helping Hand III<br>^1.5 Fruit base mult in the Drought<br>Cost: 1e95 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 41, entropyUpgradeCost.EU41, false, null);
        entropyUpgradeFactor.E41Bought = true;
    }
}
function ach113() {
	achievements.ach113 = true;
	massAchievementChecker();
    document.querySelector('.challenge-blizzard').style.visibility = 'visible';
}
export function E42() {
    if (gameData.entropy.greaterThanOrEqualTo(entropyUpgradeCost.EU42) || entropyUpgradeFactor.E42Bought) {
        document.getElementById("E42").innerHTML = `E42 (Bought)<br>30 Below Zero<br>Unlock the Blizzard Challenge<br>Cost: 1e100 Entropy`;
        gameData.entropyUpgradeCounter = gameData.entropyUpgradeCounter.plus(new Decimal(1));
        gameData.totalUpgradeCounter = gameData.totalUpgradeCounter.plus(new Decimal(1));
        createCallableUpgrade('entropy', 42, entropyUpgradeCost.EU42, true, ach113());
        entropyUpgradeFactor.E42Bought = true;
    }
}
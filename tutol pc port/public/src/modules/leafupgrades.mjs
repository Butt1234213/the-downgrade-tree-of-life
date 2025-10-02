import { gameData, leafUpgradeCost, leafUpgradeFactor, truncateToDecimalPlaces } from './bunchobullshit.mjs'
import { gameLoop } from './gameloopbutmodule.mjs'

export function startGeneration() {
  gameData.gameStarted = true;
  gameData.tickSpeedMultiplier = new Decimal(1);
  gameData.treeAgePerTick = new Decimal(1);
  gameData.leavesPerTick = gameData.leavesStartingPerTick;
  console.log(gameData.leavesPerTick);
  gameData.leafUpgradeCounter = new Decimal(1);
  leafUpgradeFactor.L4Bought = false;

  document.getElementById("L1").innerHTML = `L1 (Bought) <br> Start Generating <br> Leaves`;
  document.getElementById("L1").style.color = '#000000ff'
  document.getElementById("L1").style.borderColor = '#000000ff'
  document.getElementById("L1").disabled = true;
  console.log(`startGeneration function called, value of gameData.gameStarted is ${gameData.gameStarted}`);
  gameLoop();
}

 //didn't work initially, so I'm commenting this out for now, but will re-add later

export function L2() {
    if (gameData.leaves >= leafUpgradeCost.LU2.toNumber()) {
    setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
    gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU2);
    gameData.leavesPerTick = gameData.leavesPerTick.times(new Decimal(2));
    gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L2").innerHTML = `L2 (Bought) <br> Grow I <br> x2 Leaves <br> Cost: ` + leafUpgradeCost.LU2 + ` Leaves`;
    document.getElementById("L2").disabled = true;
    document.getElementById("L2").style.color = '#000000ff'
    document.getElementById("L2").style.borderColor = '#000000ff'
    console.log(`L2 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}
export function L3() {
    if (gameData.leaves >= leafUpgradeCost.LU3.toNumber()) {
    setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
    gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU3);
    gameData.leavesPerTick = gameData.leavesPerTick.times(new Decimal(3));
    gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L3").innerHTML = `L3 (Bought) <br> Grow II <br> x3 Leaves <br> Cost: ` + leafUpgradeCost.LU3 + ` Leaves`;
    document.getElementById("L3").disabled = true;
    document.getElementById("L3").style.color = '#000000ff'
    document.getElementById("L3").style.borderColor = '#000000ff'
    console.log(`L3 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}

function L4UpgradeFormula() {
    const msToS = gameData.treeAge.dividedBy(new Decimal(1000));
    const divByFactor = msToS.dividedBy(leafUpgradeFactor.L4Amt);
    const sqrtFactor = divByFactor.pow(new Decimal(0.5));
    const finalAdd = sqrtFactor.plus(new Decimal (1));
    leafUpgradeFactor.L4 = finalAdd; 
}

export function L4() {
    if (gameData.leaves >= leafUpgradeCost.LU4.toNumber()) {
        while (leafUpgradeFactor.L4Bought == false) {
            setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU4);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L4").disabled = true;
            document.getElementById("L4").style.color = '#000000ff'
            document.getElementById("L4").style.borderColor = '#000000ff'
            leafUpgradeFactor.L4Bought = true;
        }
        if (leafUpgradeFactor.L4Bought == true) {
            L4UpgradeFormula();
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
            gameData.leavesPerTick = gameData.leavesPerTick.times(leafUpgradeFactor.L4);
            document.getElementById("L4").innerHTML = `L4 (Bought) <br> Develop I <br> Tree Age boosts Leaves <br> Cost: ` + leafUpgradeCost.LU4 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L4, 3)}x`;
            console.log(`L4 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
            leafUpgradeFactor.L4AtUpgradeBought = leafUpgradeFactor.L4;
        }
    }
}
export function L4UpgradeUpdater() {
  if (leafUpgradeFactor.L4Bought == true) {
  setTimeout(L4UpgradeFormula, (gameData.refreshRate * 2));
  const leavesPerTickAtThisMoment = gameData.leavesPerTick;
  const firstMult = leavesPerTickAtThisMoment.times(leafUpgradeFactor.L4AtUpgradeBought);
  const secondMult = leavesPerTickAtThisMoment.times(leafUpgradeFactor.L4);
  const deltaMult = secondMult.minus(firstMult);
  gameData.leavesPerTick = gameData.leavesPerTick.plus(deltaMult);
  document.getElementById("L4").innerHTML = `L4 <br> Develop I (Bought) <br> Tree Age boosts Leaves <br> Cost: ` + leafUpgradeCost.LU4 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L4, 3)}x`;
  leafUpgradeFactor.L4AtUpgradeBought = leafUpgradeFactor.L4;
  }
}

export function L5() {
    if (gameData.leaves >= leafUpgradeCost.LU5.toNumber()) {
    setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
    gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU5);
    gameData.leavesPerTick = gameData.leavesPerTick.times(new Decimal(2.5));
    gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L5").innerHTML = `L5 (Bought) <br> Grow III <br> x2.5 Leaves <br> Cost: ` + leafUpgradeCost.LU5 + ` Leaves`;
    document.getElementById("L5").disabled = true;
    document.getElementById("L5").style.color = '#000000ff'
    document.getElementById("L5").style.borderColor = '#000000ff'
    console.log(`L5 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}
export function L6() {
    if (gameData.leaves >= leafUpgradeCost.LU6.toNumber()) {
    setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
    gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU6);
    gameData.leavesPerTick = gameData.leavesPerTick.times(new Decimal(3));
    gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L6").innerHTML = `L6 (Bought) <br> Grow IV <br> x3 Leaves <br> Cost: ` + leafUpgradeCost.LU6 + ` Leaves`;
    document.getElementById("L6").disabled = true;
    document.getElementById("L6").style.color = '#000000ff'
    document.getElementById("L6").style.borderColor = '#000000ff'
    console.log(`L6 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}
export function L7() {
    if (gameData.leaves >= leafUpgradeCost.LU7.toNumber()) {
    setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
    gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU7);
    gameData.leavesPerTick = gameData.leavesPerTick.times(new Decimal(3.1415));
    gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L7").innerHTML = `L7 (Bought) <br> Grow V <br> xπ Leaves for no reason <br> Cost: ` + leafUpgradeCost.LU7 + ` Leaves`;
    document.getElementById("L7").disabled = true;
    document.getElementById("L7").style.color = '#000000ff'
    document.getElementById("L7").style.borderColor = '#000000ff'
    console.log(`L7 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}
export function L8() {
    if (gameData.leaves >= leafUpgradeCost.LU8.toNumber()) {
    setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
    gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU8);
    gameData.leavesPerTick = gameData.leavesPerTick.times(new Decimal(1.75));
    gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L8").innerHTML = `L8 (Bought) <br> Grow VI <br> x1.75 Leaves <br> Cost: ` + leafUpgradeCost.LU8 + ` Leaves`;
    document.getElementById("L8").disabled = true;
    document.getElementById("L8").style.color = '#000000ff'
    document.getElementById("L8").style.borderColor = '#000000ff'
    console.log(`L8 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}
export function L9() {
    if (gameData.leaves >= leafUpgradeCost.LU9.toNumber()) {
    setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
    gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU9);
    leafUpgradeFactor.L4Amt = 4;
    gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L9").innerHTML = `L9 (Bought) <br> Develop II <br> Increase L4's Boost <br> Cost: ` + leafUpgradeCost.LU9 + ` Leaves <br> Effect: x/10 -> x/4`;
    document.getElementById("L9").disabled = true;
    document.getElementById("L9").style.color = '#000000ff'
    document.getElementById("L9").style.borderColor = '#000000ff'
    console.log(`L9 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}

function L10UpgradeFormula() {
  leafUpgradeFactor.L10 = new Decimal(1.1).pow(gameData.leafUpgradeCounter);
}
export function L10() {
    if (gameData.leaves >= leafUpgradeCost.LU10.toNumber()) {
        while (leafUpgradeFactor.L10Bought == false) {
            setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU10);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L10").disabled = true;
            document.getElementById("L10").style.color = '#000000ff'
            document.getElementById("L10").style.borderColor = '#000000ff'
            leafUpgradeFactor.L10Bought = true;
        }
        if (leafUpgradeFactor.L10Bought == true) {
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
            L10UpgradeFormula();
            gameData.leavesPerTick = gameData.leavesPerTick.times(leafUpgradeFactor.L10);
            document.getElementById("L10").innerHTML = `L10 (Bought) <br> Grow Power <br> Every Leaf Upgrade Bought Multiplies Leaves by 1.1 <br> Cost: ` + leafUpgradeCost.LU10 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L10, 3)}x`;
            console.log(`L10 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
            leafUpgradeFactor.L10AtUpgradeBought = leafUpgradeFactor.L10;
        }
    }
}
export function L10UpgradeUpdater() {
  if (leafUpgradeFactor.L10Bought == true) {
  setTimeout(L10UpgradeFormula, (gameData.refreshRate * 2));
  const deltaL10U = leafUpgradeFactor.L10.minus(leafUpgradeFactor.L10AtUpgradeBought);
  gameData.leavesPerTick = gameData.leavesPerTick.times(deltaL10U.plus(new Decimal (1)));
  document.getElementById("L10").innerHTML = `L10 <br> Grow Power (Bought) <br> Every LU Bought <br> Multiplies Leaves by 1.1 <br> Cost: ` + leafUpgradeCost.LU10 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L10, 3)}x`;
  leafUpgradeFactor.L10AtUpgradeBought = leafUpgradeFactor.L10;
  }
}

function L11UpgradeFormula() {
    if (leafUpgradeFactor.L15Bought == true) {
        leafUpgradeFactor.L11 = ((Decimal.log10(gameData.leaves.plus(new Decimal(1)))).plus(1)).times(2);
    }
    else {
        leafUpgradeFactor.L11 = (Decimal.log10(gameData.leaves.plus(new Decimal(1)))).plus(1);
    }
}
export function L11() {
    if (gameData.leaves >= leafUpgradeCost.LU11.toNumber()) {
        while (leafUpgradeFactor.L11Bought == false) {
            setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU11);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L11").disabled = true;
            document.getElementById("L11").style.color = '#000000ff'
            document.getElementById("L11").style.borderColor = '#000000ff'
            leafUpgradeFactor.L11Bought = true;
        }
        if (leafUpgradeFactor.L11Bought == true) {
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
            L11UpgradeFormula();
            leafUpgradeFactor.L11Mult = new Decimal(1).times(leafUpgradeFactor.L11);
            gameData.leavesPerTick = gameData.leavesPerTick.times(leafUpgradeFactor.L11Mult)
            document.getElementById("L11").innerHTML = `L11 (Bought) <br> Self-Synergy <br> Leaves boost their own production <br> Cost: ` + leafUpgradeCost.LU11 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L11, 3)}x`;
            console.log(`L11 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
            leafUpgradeFactor.L11AtUpgradeBought = leafUpgradeFactor.L11;
        }
    }
}
export function L11UpgradeUpdater() {
  if (leafUpgradeFactor.L11Bought == true) {
  setTimeout(L11UpgradeFormula, (gameData.refreshRate * 2));
  const leavesPerTickAtThisMoment = gameData.leavesPerTick;
  const firstMult = leavesPerTickAtThisMoment.times(leafUpgradeFactor.L11AtUpgradeBought);
  const secondMult = leavesPerTickAtThisMoment.times(leafUpgradeFactor.L11);
  const deltaMult = secondMult.minus(firstMult);
  gameData.leavesPerTick = gameData.leavesPerTick.plus(deltaMult);
  document.getElementById("L11").innerHTML = `L11 <br> Self-Synergy (Bought) <br> Leaves boost their own production <br> Cost: ` + leafUpgradeCost.LU11 + ` Leaves <br> Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L11, 3)}x`;
  leafUpgradeFactor.L11AtUpgradeBought = leafUpgradeFactor.L11;
  }
}
export function L12() {
    if (gameData.leaves >= leafUpgradeCost.LU12.toNumber()) {
    setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
    gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU12);
    gameData.leavesPerTick = gameData.leavesPerTick.times(new Decimal(5));
    gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L12").innerHTML = `L12 (Bought) <br> Grow VII <br> x5 Leaves <br> Cost: 2.25e7 Leaves`;
    document.getElementById("L12").disabled = true;
    document.getElementById("L12").style.color = '#000000ff'
    document.getElementById("L12").style.borderColor = '#000000ff'
    console.log(`L12 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}
export function L13() {
    if (gameData.leaves >= leafUpgradeCost.LU13.toNumber()) {
    setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
    gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU13);
    gameData.leavesPerTick = gameData.leavesPerTick.times(new Decimal(4));
    gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L13").innerHTML = `L13 (Bought) <br> Grow VIII <br> x4 Leaves <br> Cost: 1.75e8 Leaves`;
    document.getElementById("L13").disabled = true;
    document.getElementById("L13").style.color = '#000000ff'
    document.getElementById("L13").style.borderColor = '#000000ff'
    console.log(`L13 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}
export function L14() {
    if (gameData.leaves >= leafUpgradeCost.LU14.toNumber()) {
    setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
    gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU14);
    gameData.leavesPerTick = gameData.leavesPerTick.times(new Decimal(5));
    gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L14").innerHTML = `L14 (Bought) <br> Grow IX <br> x5 Leaves <br> Cost: 6e10 Leaves`;
    document.getElementById("L14").disabled = true;
    document.getElementById("L14").style.color = '#000000ff'
    document.getElementById("L14").style.borderColor = '#000000ff'
    console.log(`L14 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}
export function L15() {
    if (gameData.leaves >= leafUpgradeCost.LU15.toNumber()) {
    setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
    gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU15);
    leafUpgradeFactor.L15Bought = true;
    gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L15").innerHTML = `L15 (Bought) <br> Booster <br> L11 boost is doubled <br> Cost: 1e9 Leaves`;
    document.getElementById("L15").disabled = true;
    document.getElementById("L15").style.color = '#000000ff'
    document.getElementById("L15").style.borderColor = '#000000ff'
    console.log(`L15 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}

function L16UpgradeFormula() {
    const msToS = gameData.treeAge.dividedBy(new Decimal(1000));
    const divByFactor = msToS.dividedBy(new Decimal(25));
    const sqrtFactor = divByFactor.pow(new Decimal(1).div(new Decimal(3)));
    const finalAdd = sqrtFactor.plus(new Decimal (1));
    leafUpgradeFactor.L16 = finalAdd; 
}

export function L16() {
    if (gameData.leaves >= leafUpgradeCost.LU16.toNumber()) {
        while (leafUpgradeFactor.L16Bought == false) {
            setTimeout(console.log("doon"), (gameData.refreshRate * (10)));
            gameData.leaves = gameData.leaves.minus(leafUpgradeCost.LU16);
            document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
            document.getElementById("L16").disabled = true;
            document.getElementById("L16").style.color = '#000000ff'
            document.getElementById("L16").style.borderColor = '#000000ff'
            leafUpgradeFactor.L16Bought = true;
        }
        if (leafUpgradeFactor.L16Bought == true) {
            L16UpgradeFormula();
            gameData.leafUpgradeCounter = gameData.leafUpgradeCounter.plus(new Decimal(1));
            gameData.leavesPerTick = gameData.leavesPerTick.times(leafUpgradeFactor.L16);
            document.getElementById("L16").innerHTML = `L16 (Bought)<br>Develop III<br>Tree Age boosts Leaves (again)<br>Cost: 1e12 Leaves <br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L16, 3)}x`;
            console.log(`L16 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
            leafUpgradeFactor.L16AtUpgradeBought = leafUpgradeFactor.L16;
        }
    }
}
export function L16UpgradeUpdater() {
    if (leafUpgradeFactor.L16Bought == true) {
        setTimeout(L16UpgradeFormula, (gameData.refreshRate * 2));
        const leavesPerTickAtThisMoment = gameData.leavesPerTick;
        const firstMult = leavesPerTickAtThisMoment.times(leafUpgradeFactor.L16AtUpgradeBought);
        const secondMult = leavesPerTickAtThisMoment.times(leafUpgradeFactor.L16);
        const deltaMult = secondMult.minus(firstMult);
        gameData.leavesPerTick = gameData.leavesPerTick.plus(deltaMult);
        document.getElementById("L16").innerHTML = `L16 (Bought)<br>Develop III<br>Tree Age boosts Leaves (again)<br>Cost: 1e12 Leaves <br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L16, 3)}x`;
        leafUpgradeFactor.L16AtUpgradeBought = leafUpgradeFactor.L16;
    }
}

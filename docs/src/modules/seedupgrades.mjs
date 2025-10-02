import { gameData, seedUpgradeCost, seedUpgradeFactor, truncateToDecimalPlaces } from './bunchobullshit.mjs'
import { startGeneration } from './leafupgrades.mjs'
import { gameLoop } from './gameloopbutmodule.mjs'

export function S1() {
    if (gameData.seeds >= seedUpgradeCost.SU1.toNumber()) {
        setTimeout(console.log("doonSeed"), (gameData.refreshRate * (10)));
        gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU1.toNumber());
        S3UpgradeUpdater();
        S4UpgradeUpdater();
        S8UpgradeUpdater();
        if (gameData.gameStarted == true) {
            gameData.leavesStartingPerTick = gameData.leavesStartingPerTick.times(new Decimal(6));
            gameData.leavesPerTick = gameData.leavesPerTick.times(new Decimal(6));
        }
        else {
            gameData.leavesStartingPerTick = gameData.leavesStartingPerTick.times(new Decimal(6));
        }
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces(gameData.seeds, 3) + " Seeds";
        document.getElementById("S1").innerHTML = `S1 (Bought) <br> Branch I <br> x6 Leaves <br> Cost: 1 Seed`;
        document.getElementById("S1").disabled = true;
        document.getElementById("S1").style.color = '#000000ff'
        document.getElementById("S1").style.borderColor = '#000000ff'
        console.log(`S1 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}

export function S2() {
    if (gameData.seeds >= seedUpgradeCost.SU2.toNumber()) {
        setTimeout(console.log("doonSeed"), (gameData.refreshRate * (10)));
        gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU2.toNumber());
        S3UpgradeUpdater();
        S4UpgradeUpdater();
        S8UpgradeUpdater();
        if (gameData.gameStarted == true) {
            gameData.leavesStartingPerTick = gameData.leavesStartingPerTick.times(new Decimal(3));
            gameData.leavesPerTick = gameData.leavesPerTick.times(new Decimal(3));
        }
        else {
            gameData.leavesStartingPerTick = gameData.leavesStartingPerTick.times(new Decimal(3));
        }
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces(gameData.seeds, 3) + " Seeds";
        document.getElementById("S2").innerHTML = `S2 (Bought) <br> Branch II <br> x3 Leaves <br> Cost: 3 Seeds`;
        document.getElementById("S2").disabled = true;
        document.getElementById("S2").style.color = '#000000ff'
        document.getElementById("S2").style.borderColor = '#000000ff'
        console.log(`S2 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}

function S3Formula() {
    const x = gameData.seeds.times(new Decimal(1e7));
    seedUpgradeFactor.S3 = x;
}

export function S3() {
    if (gameData.seeds >= seedUpgradeCost.SU3.toNumber()) {
        setTimeout(console.log("doonSeed"), (gameData.refreshRate * (10)));
        gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU3.toNumber());
        seedUpgradeFactor.S3Bought = true;
        S3Formula();
        S3UpgradeUpdater();
        S4UpgradeUpdater();
        S8UpgradeUpdater();
        seedUpgradeFactor.S3OnUpgradeBought = seedUpgradeFactor.S3;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces(gameData.seeds, 3) + " Seeds";
        document.getElementById("S3").innerHTML = `S3 (Bought)<br>Anti-Cap I<br>Leaves Softcap starts later<br>based upon Seeds<br>Cost: 5 Seeds<br>Effect: +` + truncateToDecimalPlaces(seedUpgradeFactor.S3, 3) + ` Leaves Later`;
        document.getElementById("S3").disabled = true;
        document.getElementById("S3").style.color = '#000000ff'
        document.getElementById("S3").style.borderColor = '#000000ff'
        console.log(`S3 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}

export function S3UpgradeUpdater() {
    if (seedUpgradeFactor.S3Bought == true) {
        setTimeout(S3Formula, (gameData.refreshRate * 4));
        const S3AtThisMoment = seedUpgradeFactor.S3;
        const firstExp = seedUpgradeFactor.S3Total.plus(seedUpgradeFactor.S3OnUpgradeBought);
        const secondExp = seedUpgradeFactor.S3Total.plus(S3AtThisMoment);
        const deltaExp = secondExp.minus(firstExp);
        seedUpgradeFactor.S3Total = seedUpgradeFactor.S3Total.plus(deltaExp);
        seedUpgradeFactor.S3AtUpgradeBought = seedUpgradeFactor.S3;
        document.getElementById("S3").innerHTML = `S3 (Bought)<br>Anti-Cap I<br>Leaves Softcap starts later<br>based upon Seeds<br>Cost: 5 Seeds<br>Effect: +` + truncateToDecimalPlaces(seedUpgradeFactor.S3, 3) + ` Leaves Later`;
    }
}

function S4Formula() {
    const x = (gameData.seeds.log(new Decimal(15))).clamp(new Decimal(1), new Decimal(100));
    const y = (x.pow(new Decimal(1).div(new Decimal(3)))).clamp(new Decimal(1), new Decimal(3))
    const z = gameData.seeds.pow(y.div(new Decimal(2)));
    const w = (Decimal.log(z, new Decimal(5))).clamp(1, 10);
    seedUpgradeFactor.S4 = w.times(new Decimal(2));
}

export function S4() {
    if (gameData.seeds >= seedUpgradeCost.SU4.toNumber()) {
        setTimeout(console.log("doonSeed"), (gameData.refreshRate * (10)));
        gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU4.toNumber());
        seedUpgradeFactor.S4Bought = true;
        S4Formula();
        if (gameData.gameStarted == true) {
            gameData.leavesStartingPerTick = gameData.leavesStartingPerTick.times(seedUpgradeFactor.S4);
            gameData.leavesPerTick = gameData.leavesPerTick.times(seedUpgradeFactor.S4);
        }
        else {
            gameData.leavesStartingPerTick = gameData.leavesStartingPerTick.times(seedUpgradeFactor.S4);
        }
        S3UpgradeUpdater();
        S4UpgradeUpdater();
        S8UpgradeUpdater();
        seedUpgradeFactor.S4OnUpgradeBought = seedUpgradeFactor.S4;
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces(gameData.seeds, 3) + " Seeds";
        document.getElementById("S4").innerHTML = `S4 (Bought)<br>Nutritious Seeds<br>Seeds multiply Leaves<br>Cost: 35 Seeds<br>Effect: x` + truncateToDecimalPlaces(seedUpgradeFactor.S4, 3);
        document.getElementById("S4").disabled = true;
        document.getElementById("S4").style.color = '#000000ff'
        document.getElementById("S4").style.borderColor = '#000000ff'
        console.log(`S4 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}

export function S4UpgradeUpdater () {
    if (seedUpgradeFactor.S4Bought == true) {
        setTimeout(S4Formula, (gameData.refreshRate * 4));
        const S4AtThisMoment = seedUpgradeFactor.S4;
        const firstAmt = gameData.leavesStartingPerTick.times(seedUpgradeFactor.S4OnUpgradeBought);
        const secondAmt = gameData.leavesStartingPerTick.times(S4AtThisMoment);
        const deltaAmt = secondAmt.minus(firstAmt);
        gameData.leavesStartingPerTick = gameData.leavesStartingPerTick.plus(deltaAmt);
        console.log(gameData.leavesStartingPerTick);
        console.log(gameData.leavesStartingPerTick);
        seedUpgradeFactor.S4AtUpgradeBought = seedUpgradeFactor.S4;
        document.getElementById("S4").innerHTML = `S4 (Bought)<br>Nutritious Seeds<br>Seeds multiply Leaves<br>Cost: 35 Seeds<br>Effect: x` + truncateToDecimalPlaces(seedUpgradeFactor.S4, 3);
    }
}

export function S5() {
    if (gameData.seeds >= seedUpgradeCost.SU5.toNumber()) {
        setTimeout(console.log("doonSeed"), (gameData.refreshRate * (10)));
        gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU5.toNumber());
        S3UpgradeUpdater();
        S4UpgradeUpdater();
        S8UpgradeUpdater();
        if (gameData.gameStarted == true) {
            gameData.leavesStartingPerTick = gameData.leavesStartingPerTick.times(new Decimal(10));
            gameData.leavesPerTick = gameData.leavesPerTick.times(new Decimal(10));
        }
        else {
            gameData.leavesStartingPerTick = gameData.leavesStartingPerTick.times(new Decimal(10));
        }
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces(gameData.seeds, 3) + " Seeds";
        document.getElementById("S5").innerHTML = `S5 (Bought) <br> Branch III <br> x10 Leaves <br> Cost: 175 Seeds`;
        document.getElementById("S5").disabled = true;
        document.getElementById("S5").style.color = '#000000ff'
        document.getElementById("S5").style.borderColor = '#000000ff'
        console.log(`S5 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}

export function S6() {
    if (gameData.seeds >= seedUpgradeCost.SU6.toNumber()) {
        setTimeout(console.log("doonSeed"), (gameData.refreshRate * (10)));
        gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU6.toNumber());
        S3UpgradeUpdater();
        S4UpgradeUpdater();
        S8UpgradeUpdater();

        gameData.seedsMult = gameData.seedsMult.times(new Decimal(3));

        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces(gameData.seeds, 3) + " Seeds";
        document.getElementById("S6").innerHTML = `S6 (Bought)<br>Decompolize Method I<br>x3 Seeds<br>Cost: 2500 Seeds`;
        document.getElementById("S6").disabled = true;
        document.getElementById("S6").style.color = '#000000ff'
        document.getElementById("S6").style.borderColor = '#000000ff'
        console.log(`S6 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}

export function S7() {
    if (gameData.seeds >= seedUpgradeCost.SU7.toNumber()) {
        setTimeout(console.log("doonSeed"), (gameData.refreshRate * (10)));
        gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU7.toNumber());
        S3UpgradeUpdater();
        S4UpgradeUpdater();
        S8UpgradeUpdater();
        if (gameData.gameStarted == true) {
            gameData.leavesStartingPerTick = gameData.leavesStartingPerTick.times(new Decimal(3));
            gameData.leavesPerTick = gameData.leavesPerTick.times(new Decimal(3));
        }
        else {
            gameData.leavesStartingPerTick = gameData.leavesStartingPerTick.times(new Decimal(3));
        }
        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces(gameData.seeds, 3) + " Seeds";
        document.getElementById("S7").innerHTML = `S7 (Bought) <br> Branch IV <br> x3 Leaves <br> Cost: 20000 Seeds`;
        document.getElementById("S7").disabled = true;
        document.getElementById("S7").style.color = '#000000ff'
        document.getElementById("S7").style.borderColor = '#000000ff'
        console.log(`S7 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}

function S8Formula() {
    const x = (gameData.seeds.div(new Decimal(100))).plus(new Decimal(1));
    const y = (Decimal.log10(x)).plus(new Decimal(1))
    seedUpgradeFactor.S8 = y;
}

export function S8() {
    if (gameData.seeds >= seedUpgradeCost.SU8.toNumber()) {
        setTimeout(console.log("doonSeed"), (gameData.refreshRate * (10)));
        gameData.seeds = gameData.seeds.minus(seedUpgradeCost.SU8.toNumber());
        S3UpgradeUpdater();
        S4UpgradeUpdater();
        S8Formula();

        gameData.seedsMult = gameData.seedsMult.times(seedUpgradeFactor.S8);
        
        S8UpgradeUpdater();


        gameData.seedUpgradeCounter = gameData.seedUpgradeCounter.plus(new Decimal(1));
        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces(gameData.seeds, 3) + " Seeds";
        document.getElementById("S8").innerHTML = `S8 (Bought)<br>Seeds-ergy<br>Seeds boost themselves<br>Cost: 150000 Seeds<br>Effect: x` + truncateToDecimalPlaces(seedUpgradeFactor.S8, 3);
        document.getElementById("S8").disabled = true;
        document.getElementById("S8").style.color = '#000000ff'
        document.getElementById("S8").style.borderColor = '#000000ff'
        console.log(`S8 is bought, gameData.leavesPerTick is now ` + gameData.leavesPerTick);
    }
}

export function S8UpgradeUpdater () {
    if (seedUpgradeFactor.S8Bought == true) {
        setTimeout(S8Formula, (gameData.refreshRate * 4));
        const S8AtThisMoment = seedUpgradeFactor.S8;
        const firstAmt = gameData.seedsMult.times(seedUpgradeFactor.S8OnUpgradeBought);
        const secondAmt = gameData.seedsMult.times(S8AtThisMoment);
        const deltaAmt = secondAmt.minus(firstAmt);
        gameData.seedsMult = gameData.seedsMult.plus(deltaAmt);
        console.log(gameData.seedsMult);
        console.log(gameData.seedsMult);
        seedUpgradeFactor.S8AtUpgradeBought = seedUpgradeFactor.S8;
        document.getElementById("S8").innerHTML = `S8 (Bought)<br>Seeds-ergy<br>Seeds boost themselves<br>Cost: 150000 Seeds<br>Effect: x` + truncateToDecimalPlaces(seedUpgradeFactor.S8, 3);
    }
}
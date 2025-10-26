import { truncateToDecimalPlaces, gameData, leafUpgradeFactor, seedUpgradeFactor, fruitUpgradeFactor } from "./bunchobullshit.mjs";
import { achievements } from "../achievements.mjs";
import * as composter from '../composter.mjs';
import * as moss from '../moss.mjs';

export function calculateLeavesPerTick() {
    let totalMultiplier = new Decimal(1);
    
    totalMultiplier = totalMultiplier.times(gameData.cheaterMult);

    if (leafUpgradeFactor.L2Bought) {
        const x = new Decimal(2);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L2").innerHTML = `L2 (Bought)<br>Grow I<br>x${truncateToDecimalPlaces(y, 3)} Leaves<br>Cost: 10 Leaves`
    }
    if (leafUpgradeFactor.L3Bought) {
        const x = new Decimal(3);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L3").innerHTML = `L3 (Bought)<br>Grow II<br>x${truncateToDecimalPlaces(y, 3)} Leaves<br>Cost: 35 Leaves`
    }
    if (leafUpgradeFactor.L4Bought) {
        const x = gameData.treeAge.dividedBy(new Decimal(1000));
        const y = x.dividedBy(new Decimal(10));
        const z = y.pow(new Decimal(0.5));
        const w = z.plus(new Decimal(1));
        const v = w.plus(gameData.mossEffect);
        leafUpgradeFactor.L4 = v;

        document.getElementById("L4").innerHTML = `L4 (Bought)<br>Develop I<br>Tree Age boosts Leaves<br>Cost: 150 Leaves<br>Effect: x${truncateToDecimalPlaces(leafUpgradeFactor.L4, 3)}`;

        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L4);
    }
    if (leafUpgradeFactor.L5Bought) {
        const x = new Decimal(2.5);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L5").innerHTML = `L5 (Bought)<br>Grow III<br>x${truncateToDecimalPlaces(y, 3)} Leaves<br>Cost: 500 Leaves`
    }
    if (leafUpgradeFactor.L6Bought) {
        const x = new Decimal(3);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L6").innerHTML = `L6 (Bought)<br>Grow IV<br>x${truncateToDecimalPlaces(y, 3)} Leaves<br>Cost: 1500 Leaves`
    }
    if (leafUpgradeFactor.L7Bought) {
        const x = new Decimal(new Decimal(3.14159265359));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L7").innerHTML = `L7 (Bought)<br>Grow V<br>xπ Leaves for no reason<br>Cost: 5000 Leaves<br>Effect: x${truncateToDecimalPlaces(y, 3)}`
    }
    if (leafUpgradeFactor.L8Bought) {
        const x = new Decimal(new Decimal(1.75));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L8").innerHTML = `L8 (Bought)<br>Grow VI<br>x${truncateToDecimalPlaces(y, 3)} Leaves<br>Cost: 7500 Leaves`
    }
    if (leafUpgradeFactor.L9Bought) {
        const x = gameData.treeAge.dividedBy(new Decimal(1000));
        const y = x.dividedBy(new Decimal(4));
        const z = y.pow(new Decimal(0.5));
        const w = z.plus(new Decimal(1));
        const v = w.plus(gameData.mossEffect);
        leafUpgradeFactor.L9 = v;

        document.getElementById("L9").innerHTML = `L9 (Bought)<br>Develop II<br>Tree Age boosts Leaves (again)<br>Cost: 24000 Leaves<br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L9, 3)}x`

        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L9);
    }
    if (leafUpgradeFactor.L10Bought) {
        const x = new Decimal(1.1).plus(gameData.mossEffect.div(new Decimal(10)));
        const y = x.pow(gameData.leafUpgradeCounter);
        leafUpgradeFactor.L10 = y;

        document.getElementById("L10").innerHTML = `L10 (Bought)<br>Grow Power<br>Every LU Bought<br>Multiplies Leaves by ${truncateToDecimalPlaces(x, 3)}<br>Cost: 200000 Leaves<br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L10, 3)}x`;

        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L10);
    }
    if (leafUpgradeFactor.L11Bought) {
        const x = Decimal.log10(gameData.leaves.plus(new Decimal(1)));
        const y = x.plus(new Decimal(1));
        const z = y.pow(leafUpgradeFactor.L15)
        const w = z.plus(gameData.mossEffect);
        leafUpgradeFactor.L11 = w;

        document.getElementById("L11").innerHTML = `L11 (Bought)<br>Self-Synergy<br>Leaves boost their own production<br>Cost: 650000 Leaves<br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L11, 3)}x`;

        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L11);
    }
    if (leafUpgradeFactor.L12Bought) {
        const x = new Decimal(new Decimal(5));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L12").innerHTML = `L12 (Bought)<br>Grow VII<br>x${truncateToDecimalPlaces(y, 3)} Leaves<br>Cost: 2.25e7 Leaves`
    }
    if (leafUpgradeFactor.L13Bought) {
        const x = new Decimal(new Decimal(4));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L13").innerHTML = `L13 (Bought)<br>Grow VIII<br>x${truncateToDecimalPlaces(y, 3)} Leaves<br>Cost: 1.75e8 Leaves`
    }
    if (leafUpgradeFactor.L14Bought) {
        const x = new Decimal(new Decimal(5));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L14").innerHTML = `L14 (Bought)<br>Grow IX<br>x${truncateToDecimalPlaces(y, 3)} Leaves<br>Cost: 6e10 Leaves`
    }
    if (leafUpgradeFactor.L15Bought) {
        const x = new Decimal(2);
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L15 = y;

        document.getElementById("L15").innerHTML = `L15 (Bought)<br>Booster<br>L11's effect is squared<br>Cost: 1e9 Leaves`;
    }
    if (leafUpgradeFactor.L16Bought) {
        const x = gameData.treeAge.dividedBy(new Decimal(1000));
        const y = x.dividedBy(new Decimal(25));
        const z = y.pow(new Decimal(1).div(new Decimal(3)));
        const w = z.plus(new Decimal(1))
        const v = w.plus(gameData.mossEffect);
        leafUpgradeFactor.L16 = v;

        document.getElementById("L16").innerHTML = `L16 (Bought)<br>Develop III<br>Tree Age boosts Leaves (again)<br>Cost: 4.5e12 Leaves<br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L16, 3)}x`

        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L16);
    }
    if (seedUpgradeFactor.S1Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(6));
        document.getElementById("S1").innerHTML = `S1 (Bought)<br>Branch I<br>x6 Leaves<br>Cost: 1 Seed`
    }
    if (seedUpgradeFactor.S2Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("S2").innerHTML = `S2 (Bought)<br>Branch II<br>x3 Leaves<br>Cost: 3 Seeds`
    }
    if (seedUpgradeFactor.S3Bought) {
        const x = gameData.treeAge.dividedBy(new Decimal(1000));
        const y = x.dividedBy(new Decimal(25));
        const z = y.pow(new Decimal(1).div(new Decimal(3)));
        const w = (z.plus(new Decimal(1))).times(new Decimal(2))
        seedUpgradeFactor.S3 = w;

        document.getElementById("S3").innerHTML = `S3 (Bought)<br>Soil Enrichment I<br>Tree Age boosts Leaves (again)<br>Cost: 5 Seeds<br>Effect: ${truncateToDecimalPlaces(seedUpgradeFactor.S3, 3)}x`

        totalMultiplier = totalMultiplier.times(seedUpgradeFactor.S3);
    }
    if (seedUpgradeFactor.S4Bought) {
        const x = (gameData.seeds.log(new Decimal(15))).clamp(new Decimal(1), new Decimal(100));
        const y = (x.pow(new Decimal(1).div(new Decimal(3)))).clamp(new Decimal(1), new Decimal(3))
        const z = gameData.seeds.pow(y.div(new Decimal(2)));
        const w = Decimal.log(z, new Decimal(5));
        seedUpgradeFactor.S4 = w.times(new Decimal(2));

        document.getElementById("S4").innerHTML = `S4<br>Nutritious Leaves<br>Seeds multiply Leaves<br>Cost: 35 Seeds<br>Effect: ${truncateToDecimalPlaces(seedUpgradeFactor.S4, 3)}x`

        totalMultiplier = totalMultiplier.times(seedUpgradeFactor.S4);
    }
    if (seedUpgradeFactor.S5Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(10));
        document.getElementById("S5").innerHTML = `S5 (Bought)<br>Branch III<br>x10 Leaves<br>Cost: 175 Seeds`
    }
    if (seedUpgradeFactor.S7Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("S7").innerHTML = `S7 (Bought)<br>Branch IV<br>x3 Leaves<br>Cost: 20000 Seeds`
    }
    if (seedUpgradeFactor.S12Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2));
        document.getElementById("S12").innerHTML = `S12 (Bought)<br>Branch V<br>x2 Leaves<br>Cost: 5e8 Seeds`
    }
    if (seedUpgradeFactor.S13Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2));
        document.getElementById("S13").innerHTML = `S13 (Bought)<br>Branch VI<br>x5 Leaves<br>Cost: 5e9 Seeds`
    }
    if (seedUpgradeFactor.S14Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("S14").innerHTML = `S14 (Bought)<br>Branch VII<br>x3 Leaves<br>Cost: 1e12 Seeds`
    }
    if (seedUpgradeFactor.S15Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2));
        document.getElementById("S15").innerHTML = `S15 (Bought)<br>Branch VIII<br>x2 Leaves<br>Cost: 1e13 Seeds`
    }
    if (seedUpgradeFactor.S16Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(4));
        document.getElementById("S16").innerHTML = `S16 (Bought)<br>Branch IX<br>x4 Leaves<br>Cost: 1e14 Seeds`
    }
    if (fruitUpgradeFactor.F4Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(5));
        document.getElementById("F4").innerHTML = `F4 (Bought)<br>Bloom I<br>x5 Leaves<br>Cost: 10 Fruits`
    }        
    if (leafUpgradeFactor.L20Bought) {
        const x = new Decimal(1).div(new Decimal(12.5));
        const y = gameData.leaves.pow(x);
        const z = y.plus(new Decimal(1));
        const w = z.plus(gameData.mossEffect);

        document.getElementById("L20").innerHTML = `L20 (Bought)<br>Exponentially Branching<br>Leaves exponentially<br>boost themselves<br>Cost: 1e23 Leaves<br>Effect: ${truncateToDecimalPlaces(w, 3)}x`

        totalMultiplier = totalMultiplier.times(z);
    }
    if (leafUpgradeFactor.L21Bought) {
        const x = new Decimal(new Decimal(2));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L21").innerHTML = `L21 (Bought)<br>Grow X<br>x${truncateToDecimalPlaces(y, 3)} Leaves and Seeds<br>Cost: 1e33 Leaves`
    }
    if (leafUpgradeFactor.L23Bought) {
        const x = new Decimal(new Decimal(3));
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L22Leaves = y;
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L23").innerHTML = `L23 (Bought)<br>Super Grow I<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L22Leaves, 3)} Leaves, x${truncateToDecimalPlaces(leafUpgradeFactor.L22Seeds, 3)} Seeds, x${truncateToDecimalPlaces(leafUpgradeFactor.L22Fruits, 3)} Fruits<br>Cost: 1e39 Leaves`
    }
    if (leafUpgradeFactor.L28Bought) {
        const x = new Decimal(new Decimal(50));
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L28Leaves = y;
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L28").innerHTML = `L28 (Bought)<br>Develop Life<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L28Leaves, 3)} Leaves, x${truncateToDecimalPlaces(leafUpgradeFactor.L28Seeds, 3)} Seeds, x${truncateToDecimalPlaces(leafUpgradeFactor.L28Fruits, 3)} Fruits,<br>and start generating Potential Energy<br>Cost: 5e64 Leaves`
    }
    if (seedUpgradeFactor.S21Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2));
        document.getElementById("S21").innerHTML = `S21 (Bought)<br>Vines I<br>x2 Leaves, Seeds, Fruits<br>Cost: 1e30 Seeds`
    }

    if (moss.mossMilestoneFactor.MM1Achieved) {
        totalMultiplier = totalMultiplier.pow(new Decimal(1.15));
    }
    if (moss.mossMilestoneFactor.MM2Achieved) {
        totalMultiplier = totalMultiplier.pow(new Decimal(1.1));
    }

    if (gameData.leavesIsSoftcapped) {
        totalMultiplier = totalMultiplier.pow(new Decimal(0.75))
        document.getElementById('leafSoftcap').innerHTML = '(Softcapped)';
        achievements.ach22 = true;
    }

  gameData.leavesPerTick = gameData.leavesStartingPerTick.times(totalMultiplier);
}

export function calculateSeedsMult() {
    let totalMultiplier = new Decimal(1);

    if (seedUpgradeFactor.S6Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("S6").innerHTML = `S6 (Bought)<br>Decompolize Method I<br>x3 Seeds<br>Cost: 2500 Seeds`
    }

    if (seedUpgradeFactor.S8Bought) {
        const x = (gameData.seeds.div(new Decimal(100))).plus(new Decimal(1));
        const y = (Decimal.log10(x)).plus(new Decimal(1))
        const z = y.pow(fruitUpgradeFactor.F20);
        seedUpgradeFactor.S8 = z;

        document.getElementById("S8").innerHTML = `S8 (Bought)<br>Seeds-energy<br>Seeds boost themselves<br>Cost: 150000 Seeds<br>Effect: ${truncateToDecimalPlaces(seedUpgradeFactor.S8, 3)}x`

        totalMultiplier = totalMultiplier.times(seedUpgradeFactor.S8);
    }

    if (seedUpgradeFactor.S9Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("S9").innerHTML = `S9 (Bought)<br>Decompolize Method II<br>x3 Seeds<br>Cost: 4e6 Seeds`
    }
        
    if (leafUpgradeFactor.L17Bought) {
        const x = new Decimal(1e13);
        const y = (gameData.leaves.div(x)).plus(new Decimal(1));
        const z = Decimal.log10(y);
        const w = z.plus(new Decimal(1));
        const v = w.plus(gameData.mossEffect);
        leafUpgradeFactor.L17 = v; 

        document.getElementById("L17").innerHTML = `L17 (Bought)<br>Bigger Leaves<br>Leaves boost Seeds (again)<br>Cost: 1e15 Leaves<br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L17, 3)}x`

        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L17);
    }
    if (leafUpgradeFactor.L18Bought) {
        const x = new Decimal(new Decimal(3));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L18").innerHTML = `L18 (Bought)<br>More Seeds I<br>x${truncateToDecimalPlaces(y, 3)} Seeds<br>Cost: 7.5e15 Leaves`
    }
    if (fruitUpgradeFactor.F6Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2.5));
        document.getElementById("F6").innerHTML = `F6 (Bought)<br>Bloom II<br>x2.5 Seeds<br>Cost: 15 Fruits`
    }
    if (leafUpgradeFactor.L19Bought) {
        const x = new Decimal(new Decimal(3));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L19").innerHTML = `L19 (Bought)<br>More Seeds II<br>x${truncateToDecimalPlaces(y, 3)} Seeds<br>Cost: 5e17 Leaves`
    }
    if (leafUpgradeFactor.L21Bought) {
        const x = new Decimal(new Decimal(2));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L21").innerHTML = `L21 (Bought)<br>Grow X<br>x${truncateToDecimalPlaces(y, 3)} Leaves and Seeds<br>Cost: 1e33 Leaves`
    }
    if (leafUpgradeFactor.L23Bought) {
        const x = new Decimal(new Decimal(2));
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L22Seeds = y;
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L23").innerHTML = `L22 (Bought)<br>Super Grow I<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L22Leaves, 3)} Leaves, x${truncateToDecimalPlaces(leafUpgradeFactor.L22Seeds, 3)} Seeds, x${truncateToDecimalPlaces(leafUpgradeFactor.L22Fruits, 3)} Fruits<br>Cost: 1e39 Leaves`
    }
    if (leafUpgradeFactor.L27Bought) {
        const x = new Decimal(new Decimal(3));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L27").innerHTML = `L27 (Bought)<br>More Seeds III<br>x${truncateToDecimalPlaces(y, 3)} Seeds<br>Cost: 1e57 Leaves`
    }
    if (leafUpgradeFactor.L28Bought) {
        const x = new Decimal(new Decimal(15));
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L28Seeds = y;
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L28").innerHTML = `L28 (Bought)<br>Develop Life<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L28Leaves, 3)} Leaves, x${truncateToDecimalPlaces(leafUpgradeFactor.L28Seeds, 3)} Seeds, x${truncateToDecimalPlaces(leafUpgradeFactor.L28Fruits, 3)} Fruits,<br>and start generating Potential Energy<br>Cost: 5e64 Leaves`
    }
    if (seedUpgradeFactor.S21Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2));
        document.getElementById("S21").innerHTML = `S21 (Bought)<br>Vines I<br>x2 Leaves, Seeds, Fruits<br>Cost: 1e30 Seeds`
    }
    if (fruitUpgradeFactor.F11Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("F11").innerHTML = `F11 (Bought)<br>Rich Nutrients<br>x3 Seeds<br>Cost: 1500 Fruits`
    }
    if (fruitUpgradeFactor.F20Bought) {
        const x = gameData.fruits.times(new Decimal(1e6));
        const y = x.plus(new Decimal(2));
        const z = Decimal.log10(y);
        const w = z.times(new Decimal(0.075));
        const v = w.plus(1);
        fruitUpgradeFactor.F20 = v;

        document.getElementById("F20").innerHTML = `F20 (Bought)<br>Fruits are Finally Useful<br>Fruits boost S8's effect<br>Cost: 1e13 Fruits<br>Effect: ^${truncateToDecimalPlaces(fruitUpgradeFactor.F20, 3)}`
    }

    gameData.seedsMult = new Decimal(1).times(totalMultiplier);
}

export function calculateFruitsMult() {
    let totalMultiplier = new Decimal(1);

    if (seedUpgradeFactor.S11Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2));
        document.getElementById("S11").innerHTML = `S11 (Bought)<br>Fruits in Seeds I<br>x2 Fruits<br>Cost: 1e8 Seeds`
    }
    if (seedUpgradeFactor.S17Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(1.5));
        document.getElementById("S17").innerHTML = `S17 (Bought)<br>Fruits in Seeds II<br>x1.5 Fruits<br>Cost: 1e15 Seeds`
    }
    if (leafUpgradeFactor.L23Bought) {
        const x = new Decimal(new Decimal(1.5));
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L22Fruits = y;
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L23").innerHTML = `L22 (Bought)<br>Super Grow I<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L22Leaves, 3)} Leaves, x${truncateToDecimalPlaces(leafUpgradeFactor.L22Seeds, 3)} Seeds, x${truncateToDecimalPlaces(leafUpgradeFactor.L22Fruits, 3)} Fruits<br>Cost: 1e39 Leaves`
    }
    if (leafUpgradeFactor.L28Bought) {
        const x = new Decimal(new Decimal(5));
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L28Fruits = y;
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L28").innerHTML = `L28 (Bought)<br>Develop Life<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L28Leaves, 3)} Leaves, x${truncateToDecimalPlaces(leafUpgradeFactor.L28Seeds, 3)} Seeds, x${truncateToDecimalPlaces(leafUpgradeFactor.L28Fruits, 3)} Fruits,<br>and start generating Potential Energy<br>Cost: 5e64 Leaves`
    }
    if (seedUpgradeFactor.S20Bought) {
        const x = gameData.leaves.div(1e45);
        const y = x.pow(new Decimal(0.5));
        const z = y.plus(new Decimal(1));

        totalMultiplier = totalMultiplier.times(z);
        document.getElementById("S20").innerHTML = `S20 (Bought)<br>Transport Power<br>Leaves boost Fruits<br>Cost: 5e28 Seeds<br>Effect: x${truncateToDecimalPlaces(z, 3)}`
    }
    if (seedUpgradeFactor.S21Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2));
        document.getElementById("S21").innerHTML = `S21 (Bought)<br>Vines I<br>x2 Leaves, Seeds, Fruits<br>Cost: 1e30 Seeds`
    }
    if (seedUpgradeFactor.S22Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(1.75));
        document.getElementById("S22").innerHTML = `S22 (Bought)<br>Fruits in Seeds III<br>x1.75 Fruits<br>Cost: 5e31 Seeds`
    }
    if (fruitUpgradeFactor.F8Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2));
        document.getElementById("F8").innerHTML = `F8 (Bought)<br>More Fruits<br>x2 Fruits<br>Cost: 250 Fruits`
    }
    if (fruitUpgradeFactor.F12Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(1.5));
        document.getElementById("F12").innerHTML = `F12 (Bought)<br>Basket<br>x1.5 Fruits<br>Cost: 2000 Fruits`
    }
    if (fruitUpgradeFactor.F16Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("F16").innerHTML = `F16 (Bought)<br>Net<br>x3 Fruits<br>Cost: 100000 Fruits`
    }
    if (fruitUpgradeFactor.F18Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(1.5));
        document.getElementById("F18").innerHTML = `F18 (Bought)<br>Gloves<br>x1.5 Fruits<br>Cost: 1e8 Fruits`
    }

    if (fruitUpgradeFactor.F21Bought) {
        totalMultiplier = totalMultiplier.pow(new Decimal(1.25));
        document.getElementById("F21").innerHTML = `F21 (Bought)<br>Wood Circuit<br>Base Fruits Mult ^ 1.25<br>Cost: 7.5e15 Fruits`
    }

    gameData.fruitsMult = totalMultiplier;
}

export function calculateGameSpeed() {
    let totalMultiplier = new Decimal(1);
    let composterMultiplier = composter.calculateComposterMult();

    totalMultiplier = totalMultiplier.times(composterMultiplier);

    if (fruitUpgradeFactor.F5Bought) {
        const x = gameData.leaves.div(new Decimal(1e18));
        const y = x.plus(new Decimal(1));
        const z = Decimal.log(y, 100);
        const w = z.plus(new Decimal(1));
        fruitUpgradeFactor.F5 = w;
        document.getElementById('F5').innerHTML = `F5 (Bought)<br>Photosynthesis<br>Leaves give a boost<br>to Tree Aging speed<br>Cost: 10 Fruits<br>Effect: ${truncateToDecimalPlaces(w, 3)}x`

        totalMultiplier = totalMultiplier.times(fruitUpgradeFactor.F5)
    }
    if (leafUpgradeFactor.L25Bought) {
        const x = new Decimal(new Decimal(2));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L25").innerHTML = `L25 (Bought)<br>Filtered Water II<br>x${truncateToDecimalPlaces(y, 3)} Tree Aging speed<br>Cost: 5e45 Leaves`
    }
    if (leafUpgradeFactor.L26Bought) {
        const x = new Decimal(new Decimal(10));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L26").innerHTML = `L26 (Bought)<br>Filtered Water III<br>x${truncateToDecimalPlaces(y, 3)} Tree Aging speed<br>Cost: 3.5e51 Leaves`
    }
    if (seedUpgradeFactor.S19Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2.5));
        document.getElementById("S19").innerHTML = `S19 (Bought)<br>Soil Enrichment II<br>x2.5 Tree Aging speed<br>Cost: 1e19 Seeds`
    }
    if (fruitUpgradeFactor.F9Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2));
        document.getElementById("F9").innerHTML = `F9 (Bought)<br>Bloom III<br>x2 Tree Aging speed<br>Cost: 400 Fruits`
    }
    if (fruitUpgradeFactor.F15Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("F15").innerHTML = `F15 (Bought)<br>Filtered Water I<br>x3 Tree Aging speed<br>Cost: 75000 Fruits`
    }

    gameData.treeAgePerTick = new Decimal(1).times(totalMultiplier);
}

export function calculateCompostingSpeed() {
    let totalMultiplier = new Decimal(1);
    if (leafUpgradeFactor.L22Bought) {
        const x = new Decimal(new Decimal(2));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L22").innerHTML = `L22 (Bought)<br>Heat I<br>x${truncateToDecimalPlaces(y, 3)} Composting speed<br>Cost: 2.5e36 Leaves`;
    }
    if (seedUpgradeFactor.S18Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(1.75));
        document.getElementById("S18").innerHTML = `S18 (Bought)<br>Heat II<br>x1.75 Composting speed<br>Cost: 1.5e17 Seeds`;
    }
    if (fruitUpgradeFactor.F14Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2.5));
        document.getElementById("F14").innerHTML = `F14 (Bought)<br>Heat III<br>x2.5 Composting speed<br>Cost: 25000 Fruits`;
    }
    if (leafUpgradeFactor.L24Bought) {
        const x = gameData.leaves.div(new Decimal(1e39));
        const y = x.plus(new Decimal(1));
        const z = Decimal.log(y, new Decimal(1000));
        const w = z.plus(new Decimal(1));
        const v = w.plus(gameData.mossEffect);

        document.getElementById("L24").innerHTML = `L24 (Bought)<br>Composting Techniques I<br>Leaves boost Composting speed<br>Cost: 5e43 Leaves<br>Effect: ${truncateToDecimalPlaces(v, 3)}x`;
    }
    if (fruitUpgradeFactor.F10Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(4));
        document.getElementById("F10").innerHTML = `F10 (Bought)<br>Fast Decomposition<br>x4 Composting speed<br>Cost: 1000 Fruits`
    }
    if (fruitUpgradeFactor.F13Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("F13").innerHTML = `F13 (Bought)<br>Dirt Nutrients<br>x3 Composting speed<br>Cost: 7000 Fruits`
    }
    if (fruitUpgradeFactor.F22Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(20));
        document.getElementById("F22").innerHTML = `F22 (Bought)<br>Composting Techniques II<br>x20 Composting speed<br>Cost: 5e16 Fruits`
    }

    gameData.compostingSpeed = totalMultiplier;
}

export function calculateLeavesSoftcap() {
    let totalMultiplier = new Decimal(1);
    if (fruitUpgradeFactor.F3Bought) {
        const x = gameData.fruits;
        const y = x.pow(new Decimal(0.75));
        const z = y.plus(new Decimal(1));
        totalMultiplier = totalMultiplier.times(z);
        document.getElementById('F3').innerHTML = `F3 (Bought)<br>Anti-Cap I<br>Fruits push back Leaves Softcap<br>Cost: 9 Fruits<br>Effect: ${truncateToDecimalPlaces(z, 3)}x`
    }
    if (seedUpgradeFactor.S10Bought) {
        const x = gameData.seeds;
        const y = x.pow(new Decimal(0.5));
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById('S10').innerHTML = `S10 (Bought)<br>Anti-Cap II<br>Seeds push back Leaves Softcap<br>Cost: 1e9 Seeds<br>Effect: ${truncateToDecimalPlaces(y, 3)}x`
    }

    gameData.leafSoftcapStart = totalMultiplier;
    if (gameData.leavesIsSoftcapped || achievements.ach22) {
        document.getElementById('leafSoftcapInfo').innerHTML = `The Leaf Softcap starts at ${truncateToDecimalPlaces(gameData.leafSoftcapStart.times(new Decimal(1e15)), 3)}`
    }
}
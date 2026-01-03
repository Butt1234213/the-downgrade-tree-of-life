import { truncateToDecimalPlaces, gameData, leafUpgradeFactor, seedUpgradeFactor, fruitUpgradeFactor, entropyUpgradeFactor, rootUpgradeFactor } from "./bunchobullshit.mjs";
import * as temple from "../temple.mjs";
import { achievements, massAchievementChecker } from "../achievements.mjs";
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
        const y = x.plus(entropyUpgradeFactor.E9);
        const z = y.pow(gameData.leafUpgradeCounter);
        leafUpgradeFactor.L10 = z;

        document.getElementById("L10").innerHTML = `L10 (Bought)<br>Grow Power<br>Every LU Bought<br>Multiplies Leaves by ${truncateToDecimalPlaces(y, 3)}<br>Cost: 200000 Leaves<br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L10, 3)}x`;

        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L10);
    }
    if (leafUpgradeFactor.L11Bought) {
        const x = Decimal.log10(gameData.leaves.plus(new Decimal(1)));
        const y = x.plus(new Decimal(1));
        const z = y.pow(leafUpgradeFactor.L15);
        const w = z.times(seedUpgradeFactor.S27);
        const v = w.plus(gameData.mossEffect);
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
        const w = z.plus(new Decimal(1));
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
        const w = z.plus(new Decimal(1))
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
        document.getElementById("L28").innerHTML = `L28 (Bought)<br>Develop Life<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L28Leaves, 3)} Leaves, x${truncateToDecimalPlaces(leafUpgradeFactor.L28Seeds, 3)} Seeds, x${truncateToDecimalPlaces(leafUpgradeFactor.L28Fruits, 3)} Fruits,<br>and start generating Potential Energy<br>Cost: 5e64 Leaves`;
    }
    if (seedUpgradeFactor.S21Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(2));
        document.getElementById("S21").innerHTML = `S21 (Bought)<br>Vines I<br>x2 Leaves, Seeds, Fruits<br>Cost: 1e30 Seeds`;
    }
    if (entropyUpgradeFactor.E1Bought) {
        totalMultiplier = totalMultiplier.times(gameData.cellsLeafEffect);
    }
    if (entropyUpgradeFactor.E9Bought) {
        const x = gameData.fruits.plus(new Decimal(1));
        const y = Decimal.log10(x);
        const z = y.times(new Decimal(0.005));
        entropyUpgradeFactor.E9 = z;
        document.getElementById("E9").innerHTML = `E9 (Bought)<br>Super Growth<br>L10 is boosted by Fruits<br>Cost: 7 Entropy<br>Effect: +${truncateToDecimalPlaces(entropyUpgradeFactor.E9, 3)}`;
    }
    if (leafUpgradeFactor.L30Bought) {
        const x = new Decimal(new Decimal(5));
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L30Leaves = y;
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L30").innerHTML = `L30 (Bought)<br>Super Grow II<br>Googol Leaves!<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L30Leaves, 3)}L, x${truncateToDecimalPlaces(leafUpgradeFactor.L30Seeds, 3)}S, x${truncateToDecimalPlaces(leafUpgradeFactor.L30Fruits, 3)}F<br>Cost: 1e100 Leaves`;
    }
    if (leafUpgradeFactor.L31Bought) {
        const x = new Decimal(new Decimal(10));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L31").innerHTML = `L31 (Bought)<br>Grow XI<br>x${truncateToDecimalPlaces(y, 3)} Leaves<br>Cost: 1e105 Leaves`;
    }
    if (leafUpgradeFactor.L33Bought) {
        const x = new Decimal(new Decimal(2));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L33").innerHTML = `L33 (Bought)<br>Extra Branches<br>x${truncateToDecimalPlaces(y, 3)} Leaves and Seeds<br>Cost: 2.5e118 Leaves`
    }
    if (leafUpgradeFactor.L34Bought) {
        const x = new Decimal(new Decimal(3));
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L34Leaves = y;
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L34").innerHTML = `L34 (Bought)<br>Super Grow III<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L34Leaves, 3)}L, x${truncateToDecimalPlaces(leafUpgradeFactor.L34Leaves, 3)}S, x${truncateToDecimalPlaces(leafUpgradeFactor.L34Fruits, 3)}F, x${truncateToDecimalPlaces(leafUpgradeFactor.L34TAS, 3)}TAS<br>(TAS stands for Tree Aging speed)<br>Cost: 1e127 Leaves`;
    }
    if (leafUpgradeFactor.L36Bought) {
        const x = new Decimal(3);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L36").innerHTML = `L36 (Bought)<br>Super Grow IV<br>x${truncateToDecimalPlaces(y, 3)}L, S, F<br>Cost: 2e149 Leaves`
    }
    if (seedUpgradeFactor.S25Bought) {
        const x = new Decimal(10);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("S25").innerHTML = `S25 (Bought)<br>Branch X<br>x10 Leaves<br>Cost: 1e50 Seeds`;
    }
    if (leafUpgradeFactor.L38Bought) {
        const x = new Decimal(100);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        leafUpgradeFactor.L38Leaves = y;
        document.getElementById('L38').innerHTML = `L38 (Bought)<br>Super Grow V<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L38Entropy, 3)}E, x${truncateToDecimalPlaces(leafUpgradeFactor.L38Leaves, 3)}L, x${truncateToDecimalPlaces(leafUpgradeFactor.L38CS, 3)}CS<br>(CS stands for Composting Speed)<br>Cost: 5e190 Leaves`;
    }
    if (entropyUpgradeFactor.E13Bought) {
        const x = new Decimal(50000);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('E13').innerHTML = `E13 (Bought)<br>Split of Power<br>x50000 Leaves<br>Cost: 2500 Entropy`;
    }
    if (leafUpgradeFactor.L41Bought) {
        const x = gameData.totalFertilizers.minus(new Decimal(140));
        const y = x.clamp(new Decimal(0), new Decimal(Infinity));
        const z = new Decimal(1.1).plus(gameData.mossEffect.times(0.1));
        const w = z.pow(y);
        totalMultiplier = totalMultiplier.times(w);
        document.getElementById('L41').innerHTML = `L41 (Bought)<br>Powered Fertilizers<br>After 140, total Fertilizers boost Leaves<br>Cost: 1e267 Leaves<br>Effect: x${truncateToDecimalPlaces(w, 3)}`;
    }
    if (leafUpgradeFactor.L42Bought) {
        const x = new Decimal(20);
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L42Leaves = y;
        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L42Leaves);
        document.getElementById('L42').innerHTML = `L42 (Bought)<br>Super Grow VI<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L42Leaves, 3)}L, x${truncateToDecimalPlaces(leafUpgradeFactor.L42Leaves, 3)}S, x${truncateToDecimalPlaces(leafUpgradeFactor.L42Fruits, 3)}F, x${truncateToDecimalPlaces(leafUpgradeFactor.L42TAS, 3)}TAS<br>Cost: 5.25e278 Leaves`;
    }
    if (leafUpgradeFactor.L43Bought) {
        const x = new Decimal(2);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById('L43').innerHTML = `L43 (Bought)<br>Final Stretch I<br>x${truncateToDecimalPlaces(y, 3)} Leaves<br>Hey, hope you've been having<br>fun with the mod so far!<br>Cost: 1e291 Leaves`;
    }
    if (leafUpgradeFactor.L44Bought) {
        const x = new Decimal(3);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById('L44').innerHTML = `L44 (Bought)<br>Final Stretch II<br>x${truncateToDecimalPlaces(y, 3)} Leaves<br>I know I've had fun making it!<br>Cost: 2e292 Leaves`;
    }
    if (leafUpgradeFactor.L47Bought) {
        const x = new Decimal(6);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById('L47').innerHTML = `L47 (Bought)<br>Final Stretch V<br>x${truncateToDecimalPlaces(y, 3)} Leaves<br>I'd imagine you'd even feel a wee bit nostalgic<br>over those first few upgrades—<br>Cost: 1.6e296 Leaves`;
    }
    if (seedUpgradeFactor.S27Bought) {
        const x = (gameData.seeds.div(new Decimal(1e48))).plus(new Decimal(1));
        const y = Decimal.log(x, new Decimal(1000));
        const z = (y.times(new Decimal(0.05))).plus(new Decimal(1));
        seedUpgradeFactor.S27 = z;
        document.getElementById('S27').innerHTML = `S27 (Bought)<br>Expander<br>Seeds boost L11<br>Cost: 1e55 Seeds<br>Effect: x${truncateToDecimalPlaces(seedUpgradeFactor.S27, 3)}`;
    }
    if (seedUpgradeFactor.S29Bought) {
        const x = new Decimal(25);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S29').innerHTML = `S29 (Bought)<br>Twig I<br>x25L, x5S<br>Cost: 1e72 Seeds`;
    }
    if (seedUpgradeFactor.S30Bought) {
        const x = new Decimal(10);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S30').innerHTML = `S30 (Bought)<br>Branch XI<br>x10L, x5S, x2F<br>Cost: 1.5e75 Seeds`;
    }
    if (seedUpgradeFactor.S31Bought) {
        const x = new Decimal(42);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S31').innerHTML = `S31 (Bought)<br>Branch XII<br>x42L, x5TAS<br>Cost: 5e83 Seeds`;
    }
    if (seedUpgradeFactor.S32Bought) {
        const x = new Decimal(5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S32').innerHTML = `S32 (Bought)<br>Twig II<br>x5L, x5F<br>Cost: 1e94 Seeds`;
    }
    if (seedUpgradeFactor.S35Bought) {
        const x = new Decimal(2);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S35').innerHTML = `S35 (Bought)<br>Branch XIV<br>x2L and F, x1.5E<br>Cost: 2e123 Seeds`;
    }
    if (seedUpgradeFactor.S37Bought) {
        const x = new Decimal(25);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S37').innerHTML = `S37 (Bought)<br>Twig III<br>x25L, x5S, x5F<br>Cost: 1e192 Seeds`;
    }
    if (seedUpgradeFactor.S39Bought) {
        const x = new Decimal(5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S39').innerHTML = `S39 (Bought)<br>Table Flip<br>x5L, x20S, x50F, but x0.1 TAS<br>Cost: 5.5e270 Seeds`;
    }
    if (fruitUpgradeFactor.F23Bought) {
        const x = new Decimal(2);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F23').innerHTML = `F23 (Bought)<br>Bloom IV<br>x2L, S, F, x5TAS<br>Cost: 1.28e21 Fruits`;
    }
    if (fruitUpgradeFactor.F25Bought) {
        const x = new Decimal(10);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F25').innerHTML = `F25 (Bought)<br>Bloom V<br>x10L and S<br>Cost: 5e27 Fruits`;
    }
    if (fruitUpgradeFactor.F26Bought) {
        const x = new Decimal(3);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F26').innerHTML = `F26 (Bought)<br>Bloom VI<br>x3L, F, and x100CS<br>Cost: 2e33 Fruits`;
    }
    if (fruitUpgradeFactor.F27Bought) {
        const x = new Decimal(20);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F27').innerHTML = `F27 (Bought)<br>Bloom VII<br>x20L, x7.5TAS<br>Cost: 2e37 Fruits`;
    }
    if (fruitUpgradeFactor.F28Bought) {
        const x = new Decimal(20);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F28').innerHTML = `F28 (Bought)<br>Bloom VIII<br>x20L, x5S, x3F, x2TAS<br>Cost: 7.5e45 Fruits`;
    }
    if (fruitUpgradeFactor.F30Bought) {
        const x = new Decimal(10);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F30').innerHTML = `F30 (Bought)<br>Bloom IX<br>x10L, S, F, and CRS<br>(CRS stands for Cell Replication speed)<br>Cost: 3.5e89 Fruits`;
    }
    if (fruitUpgradeFactor.F31Bought) {
        const x = new Decimal(100);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F31').innerHTML = `F31 (Bought)<br>Bloom X<br>Googol Fruits!<br>x100L, TAS, and x2E<br>Cost: 1e100 Fruits`;
    }
    if (fruitUpgradeFactor.F34Bought) {
        const x = new Decimal(3333);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F34').innerHTML = `F33 (Bought)<br>Stupidly Overpowered<br>x3E, x33F, x333S, x3333L, x33^3 TAS<br>Cost: 1.41e141 Fruits`;
    }
    if (seedUpgradeFactor.S40Bought) {
        const x = new Decimal(42);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("S40").innerHTML = `S40 (Bought)<br>Branch XV<br>x42L, S, F, TAS, CRS<br>Cost: 3.33e333 Seeds`;
    }
    if (seedUpgradeFactor.S41Bought) {
        const x = new Decimal(20);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("S41").innerHTML = `S41 (Bought)<br>Branch XVI<br>x20L, S, F, x3E<br>Cost: 1e430 Seeds`;
    }
    if (fruitUpgradeFactor.F35Bought) {
        const x = new Decimal(5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("F35").innerHTML = `F35 (Bought)<br>Bloom XII<br>x2E, x3F, x4S, x5L<br>Cost: 3.5e165 Fruits`;
    }
    if (fruitUpgradeFactor.F36Bought) {
        const x = new Decimal(10);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("F36").innerHTML = `F36 (Bought)<br>Bloom XIII<br>x10L, S, F, x2E<br>Cost: 1e281 Fruits`;
    }
    if (fruitUpgradeFactor.F37Bought) {
        const x = new Decimal(1e9);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("F37").innerHTML = `F37 (Bought)<br>Unstable I<br>x1e9L and TAS<br>Cost: 1e370 Fruits`;
    }
    if (fruitUpgradeFactor.F39Bought) {
        const x = new Decimal(1e9);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("F39").innerHTML = `F39 (Bought)<br>Unstable II<br>x1e9L and TAS again<br>Cost: 1e600 Fruits`;
    }
    if (seedUpgradeFactor.S45Bought) {
        const x = new Decimal(100);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S45').innerHTML = `S45 (Bought)<br>Twig IV<br>x100L, x2.5S<br>Cost: 1e1459 Seeds`;
    }
	if (leafUpgradeFactor.L61Bought) {
		const x = Decimal.log10(gameData.moss.plus(new Decimal(1)));
		const y = x.times(new Decimal(0.00833));
		const z = new Decimal(10).pow(y);
		totalMultiplier = totalMultiplier.times(z);
        document.getElementById('L61').innerHTML = `L61 (Bought)<br>Mossy Leaves<br>Moss boosts Leaves<br>Cost: 1e2750 Leaves<br>Effect: x${truncateToDecimalPlaces(z, 3)}`;
	}
	if (gameData.reinforcements.greaterThanOrEqualTo(new Decimal(1))) {
		const x = new Decimal(100);
		const y = gameData.reinforcements.times(x);
		totalMultiplier = totalMultiplier.times(y);
	}
	if (entropyUpgradeFactor.rubisco.greaterThanOrEqualTo(new Decimal(1))) {
		totalMultiplier = totalMultiplier.times(entropyUpgradeFactor.rubiscoEffect);
	}
    if (temple.repeatableUpgradeFactor.LR1.greaterThanOrEqualTo(new Decimal(1))) {
        const x = temple.repeatableUpgradeFactor.LR1Effect;
        const y = x.pow(temple.repeatableUpgradeFactor.LR1);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("LR1").innerHTML = `LR1 (${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR1, 3)} / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR1Cap, 3)})<br>x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR1Effect, 3)}L, x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR1Effect, 3)}F<br>Cost: ${truncateToDecimalPlaces(temple.LR1CostCalculation(), 3)} Leaves<br>Effect: x${truncateToDecimalPlaces(y, 3)}`;
    }
    else {
        document.getElementById("LR1").innerHTML = `LR1 (0 / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR1Cap, 3)})<br>x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR1Effect, 3)}L, x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR1Effect, 3)}F<br>Cost: 1e500 Leaves<br>Effect: 1x`;
    }
    if (temple.repeatableUpgradeFactor.SR1.greaterThanOrEqualTo(new Decimal(1))) {
        const x = temple.repeatableUpgradeFactor.SR1Effect;
        const y = x.pow(temple.repeatableUpgradeFactor.SR1);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("SR1").innerHTML = `SR1 (${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR1, 3)} / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR1Cap, 3)})<br>x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR1Effect, 3)}L, x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR1Effect, 3)}TAS<br>Cost: ${truncateToDecimalPlaces(temple.SR1CostCalculation(), 3)} Seeds<br>Effect: x${truncateToDecimalPlaces(y, 3)}`;
    }
    else {
        document.getElementById("SR1").innerHTML = `SR1 (0 / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR1Cap, 3)})<br>x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR1Effect, 3)}L, x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR1Effect, 3)}TAS<br>Cost: 1e1000 Seeds<br>Effect: 1x`;
    }
    if (moss.mossMilestoneFactor.MM1Achieved) {
        totalMultiplier = totalMultiplier.pow(new Decimal(1.15));
    }
    if (moss.mossMilestoneFactor.MM2Achieved) {
        totalMultiplier = totalMultiplier.pow(new Decimal(1.1));
    }
    if (entropyUpgradeFactor.E2Bought) {
        totalMultiplier = totalMultiplier.pow(new Decimal(1.5));
        document.getElementById("E2").innerHTML = `E2 (Bought)<br>Split of Decisions<br>Leaves Base Multiplier ^ 1.5<br>Cost: 1 Entropy`;
    }
    if (gameData.stormLevel.greaterThan(new Decimal(1))) {
		const x = new Decimal(0.000542868).times(Decimal.ln(gameData.stormBestScore.plus(new Decimal(1))));
		const y = x.plus(new Decimal(1));
		const z = y.pow(gameData.blizzardReward);
        totalMultiplier = totalMultiplier.pow(z);
		if (gameData.stormLevel.greaterThan(new Decimal(2))) {
			achievements.ach85 = true;
			massAchievementChecker();
		}
        document.getElementById('stormRewardCounter').innerHTML = `Unlock Composter and SU automation, ^${truncateToDecimalPlaces(z, 3)} Leaf base mult, and the Bacteria formula is better.`;
    }
    if (leafUpgradeFactor.L54Bought) {
        const x = gameData.seeds.plus(new Decimal(1));
        const y = Decimal.log(x, new Decimal(1e100));
        const z = y.pow(new Decimal(1).div(new Decimal(3)));
        const w = z.times(new Decimal(0.1));
        const v = w.plus(new Decimal(1));
        totalMultiplier = totalMultiplier.pow(v);
        document.getElementById('L54').innerHTML = `L54 (Bought)<br>Forbidden Powers III<br>Seeds raise the base Leaf multiplier<br>Cost: 6.66e666 Leaves<br>Effect: ^${truncateToDecimalPlaces(v, 3)}`;
    }

    if (gameData.leavesIsSoftcapped) {
        totalMultiplier = totalMultiplier.pow(gameData.baseLeafSoftcapFactor);
        document.getElementById('leafSoftcap').innerHTML = '(Softcapped)';
        achievements.ach22 = true;
        massAchievementChecker();
    }
    else {
        document.getElementById('leafSoftcap').innerHTML = '';
    }
    if (gameData.leavesIsSoftcapped2) {
        totalMultiplier = totalMultiplier.pow(gameData.baseLeafSoftcapFactor);
        achievements.ach62 = true;
        massAchievementChecker();
    }
    if (gameData.leavesIsSoftcapped3) {
        totalMultiplier = totalMultiplier.pow(gameData.baseLeafSoftcapFactor);
    }
    if (gameData.leavesIsSoftcapped4) {
        totalMultiplier = totalMultiplier.pow(gameData.baseLeafSoftcapFactor.pow(new Decimal(2)));
    }
    if (gameData.leavesIsSoftcapped5) {
        totalMultiplier = totalMultiplier.pow(gameData.baseLeafSoftcapFactor.pow(new Decimal(2)));
    }
    if (gameData.leavesIsSupercapped) {
        totalMultiplier = totalMultiplier.pow(gameData.baseLeafSupercapFactor);
    }
    if (gameData.isInChallengeStorm) {
        totalMultiplier = totalMultiplier.pow(gameData.stormcapBaseFactor);
    }
	if (gameData.isInChallengeDrought) {
        totalMultiplier = totalMultiplier.pow(gameData.droughtBaseFactor);
	}
	totalMultiplier = totalMultiplier.times(gameData.gameSpeed);

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
        const u = v.pow(entropyUpgradeFactor.E7);
        leafUpgradeFactor.L17 = u; 

        document.getElementById("L17").innerHTML = `L17 (Bought)<br>Bigger Leaves<br>Leaves boost Seeds (again)<br>Cost: 1e15 Leaves<br>Effect: ${truncateToDecimalPlaces(leafUpgradeFactor.L17, 3)}x`

        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L17);
    }
    if (entropyUpgradeFactor.E7Bought) {
        const x = gameData.entropy.plus(new Decimal(1));
        const y = Decimal.log2(x);
        const z = y.times(new Decimal(0.1));
        const w = z.plus(new Decimal(1.2));

        entropyUpgradeFactor.E7 = w;
        document.getElementById("E7").innerHTML = `E7 (Bought)<br>Size Expansion<br>L17's effect is boosted by Entropy<br>Cost: 5 Entropy<br>Effect: ^${truncateToDecimalPlaces(entropyUpgradeFactor.E7, 3)}`;
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
        const x = new Decimal(2);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L21").innerHTML = `L21 (Bought)<br>Grow X<br>x${truncateToDecimalPlaces(y, 3)} Leaves and Seeds<br>Cost: 1e33 Leaves`
    }
    if (leafUpgradeFactor.L23Bought) {
        const x = new Decimal(2);
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L22Seeds = y;
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L23").innerHTML = `L22 (Bought)<br>Super Grow I<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L22Leaves, 3)} Leaves, x${truncateToDecimalPlaces(leafUpgradeFactor.L22Seeds, 3)} Seeds, x${truncateToDecimalPlaces(leafUpgradeFactor.L22Fruits, 3)} Fruits<br>Cost: 1e39 Leaves`
    }
    if (leafUpgradeFactor.L27Bought) {
        const x = new Decimal(3);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L27").innerHTML = `L27 (Bought)<br>More Seeds III<br>x${truncateToDecimalPlaces(y, 3)} Seeds<br>Cost: 1e57 Leaves`
    }
    if (leafUpgradeFactor.L28Bought) {
        const x = new Decimal(15);
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
    if (entropyUpgradeFactor.E3Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(15));
        document.getElementById("E3").innerHTML = `E3 (Bought)<br>Split of Decisions<br>x15 Seeds<br>Cost: 1 Entropy`
    }
    if (leafUpgradeFactor.L30Bought) {
        const x = new Decimal(3);
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L30Seeds = y;
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L30").innerHTML = `L30 (Bought)<br>Super Grow II<br>Googol Leaves!<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L30Leaves, 3)}L, x${truncateToDecimalPlaces(leafUpgradeFactor.L30Seeds, 3)}S, x${truncateToDecimalPlaces(leafUpgradeFactor.L30Fruits, 3)}F<br>Cost: 1e100 Leaves`
    }
    if (leafUpgradeFactor.L32Bought) {
        const x = new Decimal(2.5);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L32").innerHTML = `L32 (Bought)<br>More Seeds IV<br>x${truncateToDecimalPlaces(y, 3)} Seeds<br>Cost: 1.11e111 Leaves`;
    }
    if (leafUpgradeFactor.L33Bought) {
        const x = new Decimal(2);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L33").innerHTML = `L33 (Bought)<br>Extra Branches<br>x${truncateToDecimalPlaces(y, 3)} Leaves and Seeds<br>Cost: 2.5e118 Leaves`
    }
    if (leafUpgradeFactor.L34Bought) {
        const x = new Decimal(3);
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L34Leaves = y;
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L34").innerHTML = `L34 (Bought)<br>Super Grow III<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L34Leaves, 3)}L, x${truncateToDecimalPlaces(leafUpgradeFactor.L34Leaves, 3)}S, x${truncateToDecimalPlaces(leafUpgradeFactor.L34Fruits, 3)}F, x${truncateToDecimalPlaces(leafUpgradeFactor.L34TAS, 3)}TAS<br>(TAS stands for Tree Aging speed)<br>Cost: 1e127 Leaves`;
    }
    if (leafUpgradeFactor.L36Bought) {
        const x = new Decimal(3);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L36").innerHTML = `L36 (Bought)<br>Super Grow IV<br>x${truncateToDecimalPlaces(y, 3)}L, S, F<br>Cost: 2e149 Leaves`
    }
    if (entropyUpgradeFactor.E14Bought) {
        const x = new Decimal(500);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('E14').innerHTML = `E14 (Bought)<br>Split of Power<br>x500 Seeds<br>Cost: 2500 Entropy`;
    }
    if (leafUpgradeFactor.L45Bought) {
        const x = new Decimal(4);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById('L45').innerHTML = `L45 (Bought)<br>Final Stretch III<br>x${truncateToDecimalPlaces(y, 3)} Seeds<br>These upgrades were ones you'd find<br>at the beginning of the game.<br>Cost: 4e293 Leaves`;
    }
    if (seedUpgradeFactor.S29Bought) {
        const x = new Decimal(5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S29').innerHTML = `S29 (Bought)<br>Twig I<br>x25L, x5S<br>Cost: 1e72 Seeds`;
    }
    if (seedUpgradeFactor.S30Bought) {
        const x = new Decimal(5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S30').innerHTML = `S30 (Bought)<br>Branch XI<br>x10L, x5S, x2F<br>Cost: 1.5e75 Seeds`;
    }
    if (seedUpgradeFactor.S33Bought) {
        const x = new Decimal(5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S33').innerHTML = `S33 (Bought)<br>Branch XIII<br>x1.2E, x5S<br>Cost: 1e97 Seeds`;
    }
    if (seedUpgradeFactor.S34Bought) {
        const x = gameData.totalUpgradeCounter.minus(new Decimal(100));
        const y = x.clamp(new Decimal(0), new Decimal(Infinity));
        const z = new Decimal(1.1).pow(y);
        totalMultiplier = totalMultiplier.times(z);
        document.getElementById('S34').innerHTML = `S34 (Bought)<br>Upgrades Booster<br>After 100, Upgrades bought boost Seeds<br>Cost: 1e115 Seeds<br>Effect: x${truncateToDecimalPlaces(z, 3)}`;
    }
    if (seedUpgradeFactor.S37Bought) {
        const x = new Decimal(5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S37').innerHTML = `S37 (Bought)<br>Twig III<br>x25L, x5S, x5F<br>Cost: 1e192 Seeds`;
    }
    if (seedUpgradeFactor.S39Bought) {
        const x = new Decimal(20);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S39').innerHTML = `S39 (Bought)<br>Table Flip<br>x5L, x20S, x50F, but x0.1 TAS<br>Cost: 5.5e270 Seeds`;
    }
    if (fruitUpgradeFactor.F23Bought) {
        const x = new Decimal(2);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F23').innerHTML = `F23 (Bought)<br>Bloom IV<br>x2L, S, F, x5TAS<br>Cost: 1.28e21 Fruits`;
    }
    if (fruitUpgradeFactor.F24Bought) {
        const x = gameData.fruits.div(new Decimal(1e18));
        const y = x.pow(new Decimal(0.2));
        const z = y.plus(new Decimal(1));
        const w = Decimal.log(z, new Decimal(5));
        const v = w.plus(new Decimal(1));
        totalMultiplier = totalMultiplier.times(v);
        document.getElementById('F24').innerHTML = `F24 (Bought)<br>Transport Network<br>Fruits boost Seeds again<br>Cost: 1e22 Fruits<br>Effect: x${truncateToDecimalPlaces(v, 3)}`;
    }
    if (fruitUpgradeFactor.F25Bought) {
        const x = new Decimal(10);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F25').innerHTML = `F25 (Bought)<br>Bloom V<br>x10L and S<br>Cost: 5e27 Fruits`;
    }
    if (fruitUpgradeFactor.F28Bought) {
        const x = new Decimal(5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F28').innerHTML = `F28 (Bought)<br>Bloom VIII<br>x20L, x5S, x3F, x2TAS<br>Cost: 7.5e45 Fruits`;
    }
    if (fruitUpgradeFactor.F30Bought) {
        const x = new Decimal(10);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F30').innerHTML = `F30 (Bought)<br>Bloom IX<br>x10L, S, F, and CRS<br>(CRS stands for Cell Replication speed)<br>Cost: 3.5e89 Fruits`;
    }
    if (fruitUpgradeFactor.F34Bought) {
        const x = new Decimal(333);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F34').innerHTML = `F34 (Bought)<br>Stupidly Overpowered<br>x3E, x33F, x333S, x3333L, x33^3 TAS<br>Cost: 1.41e141 Fruits`;
    }
    if (seedUpgradeFactor.S40Bought) {
        const x = new Decimal(42);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("S40").innerHTML = `S40 (Bought)<br>Branch XV<br>x42L, S, F, TAS, CRS<br>Cost: 3.33e333 Seeds`;
    }
    if (seedUpgradeFactor.S41Bought) {
        const x = new Decimal(20);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("S41").innerHTML = `S41 (Bought)<br>Branch XVI<br>x20L, S, F, x3E<br>Cost: 1e430 Seeds`;
    }
    if (fruitUpgradeFactor.F35Bought) {
        const x = new Decimal(4);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("F35").innerHTML = `F35 (Bought)<br>Bloom XII<br>x2E, x3F, x4S, x5L<br>Cost: 3.5e165 Fruits`;
    }
    if (fruitUpgradeFactor.F36Bought) {
        const x = new Decimal(10);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("F36").innerHTML = `F36 (Bought)<br>Bloom XIII<br>x10L, S, F, x2E<br>Cost: 1e281 Fruits`;
    }
	if (gameData.reinforcements.greaterThanOrEqualTo(new Decimal(1))) {
		const x = new Decimal(10);
		const y = gameData.reinforcements.times(x);
		totalMultiplier = totalMultiplier.times(y);
	}

    if (entropyUpgradeFactor.E1Bought) {
        totalMultiplier = totalMultiplier.times(gameData.cellsSeedEffect);
    }

    if (leafUpgradeFactor.L55Bought) {
        const x = gameData.fruits.plus(new Decimal(1));
        const y = Decimal.log(x, new Decimal(1e40));
        const z = y.pow(new Decimal(1).div(new Decimal(2)));
        const w = z.times(new Decimal(0.1));
        const v = w.plus(new Decimal(1));
        totalMultiplier = totalMultiplier.pow(v);
        document.getElementById('L55').innerHTML = `L55 (Bought)<br>Forbidden Powers IV<br>Fruits raise the base Seed multiplier<br>Cost: 1e850 Leaves<br>Effect: ^${truncateToDecimalPlaces(v, 3)}`;
    }
    if (seedUpgradeFactor.S24Bought) {
        const x = new Decimal(1.2);
        totalMultiplier = totalMultiplier.pow(x);
        document.getElementById("S24").innerHTML = `S24 (Bought)<br>Sieve Circuit<br>base Seeds Mult is ^ 1.2<br>Cost: 1e47 Seeds`;
    }
    if (rootUpgradeFactor.RO2Bought) {
		const x = new Decimal(0.000542868).times(Decimal.ln(gameData.stormBestScore.plus(new Decimal(1))));
		const y = x.plus(new Decimal(1));
		const z = y.pow(gameData.blizzardReward);
		const w = z.pow(new Decimal(0.35));
        totalMultiplier = totalMultiplier.pow(w);
        document.getElementById("RO2").innerHTML = `RO2 (Bought)<br>Price of Power<br>Storm reward boosts Seeds base mult<br>with reduced rate<br>Cost: 0.5 Roots<br>Effect: ^${truncateToDecimalPlaces(w, 3)}`;
    }
	totalMultiplier = totalMultiplier.times(gameData.gameSpeed);

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
        const w = Decimal.log(z, 5);
        const v = w.plus(new Decimal(1));

        totalMultiplier = totalMultiplier.times(v);
        document.getElementById("S20").innerHTML = `S20 (Bought)<br>Transport Power<br>Leaves boost Fruits<br>Cost: 5e28 Seeds<br>Effect: x${truncateToDecimalPlaces(v, 3)}`
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
    if (entropyUpgradeFactor.E4Bought) {
        const x = gameData.fruits.plus(new Decimal(1));
        const y = Decimal.log10(x);
        const z = y.plus(new Decimal(1));
        const w = z.times(entropyUpgradeFactor.E26);
        totalMultiplier = totalMultiplier.times(w);
        
        document.getElementById("E4").innerHTML = `E4 (Bought)<br>Split of Decisions<br>Fruits boost themselves<br>Cost: 1 Entropy<br>Effect: x${truncateToDecimalPlaces(w, 3)}`;
    }
    if (leafUpgradeFactor.L30Bought) {
        const x = new Decimal(new Decimal(2));
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L30Fruits = y;
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L30").innerHTML = `L30 (Bought)<br>Super Grow II<br>Googol Leaves!<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L30Leaves, 3)}L, x${truncateToDecimalPlaces(leafUpgradeFactor.L30Seeds, 3)}S, x${truncateToDecimalPlaces(leafUpgradeFactor.L30Fruits, 3)}F<br>Cost: 1e100 Leaves`
    }
    if (leafUpgradeFactor.L34Bought) {
        const x = new Decimal(new Decimal(2));
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L34Fruits = y;
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L34").innerHTML = `L34 (Bought)<br>Super Grow III<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L34Leaves, 3)}L, x${truncateToDecimalPlaces(leafUpgradeFactor.L34Leaves, 3)}S, x${truncateToDecimalPlaces(leafUpgradeFactor.L34Fruits, 3)}F, x${truncateToDecimalPlaces(leafUpgradeFactor.L34TAS, 3)}TAS<br>(TAS stands for Tree Aging speed)<br>Cost: 1e127 Leaves`;
    }
    if (leafUpgradeFactor.L36Bought) {
        const x = new Decimal(new Decimal(3));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L36").innerHTML = `L36 (Bought)<br>Super Grow IV<br>x${truncateToDecimalPlaces(y, 3)}L, S, F<br>Cost: 2e149 Leaves`
    }
    if (entropyUpgradeFactor.E15Bought) {
        const x = new Decimal(50);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('E15').innerHTML = `E15 (Bought)<br>Split of Power<br>x50 Fruits<br>Cost: 2500 Entropy`;
    }
    if (leafUpgradeFactor.L42Bought) {
        const x = new Decimal(2);
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L42Fruits = y;
        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L42Fruits);
        document.getElementById('L42').innerHTML = `L42 (Bought)<br>Super Grow VI<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L42Leaves, 3)}L, x${truncateToDecimalPlaces(leafUpgradeFactor.L42Leaves, 3)}S, x${truncateToDecimalPlaces(leafUpgradeFactor.L42Fruits, 3)}F, x${truncateToDecimalPlaces(leafUpgradeFactor.L42TAS, 3)}TAS<br>Cost: 5.25e278 Leaves`;
    }
    if (leafUpgradeFactor.L46Bought) {
        const x = new Decimal(5);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById('L46').innerHTML = `L46 (Bought)<br>Final Stretch IV<br>x${truncateToDecimalPlaces(y, 3)} Fruits<br>Trust me, you've made it very far.<br>Cost: 8e294 Leaves`;
    }
    if (seedUpgradeFactor.S30Bought) {
        const x = new Decimal(2);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S30').innerHTML = `S30 (Bought)<br>Branch XI<br>x10L, x5S, x2F<br>Cost: 1.5e75 Seeds`;
    }
    if (seedUpgradeFactor.S32Bought) {
        const x = new Decimal(5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S32').innerHTML = `S32 (Bought)<br>Twig II<br>x5L, x5F<br>Cost: 1e94 Seeds`;
    }
    if (seedUpgradeFactor.S35Bought) {
        const x = new Decimal(2);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S35').innerHTML = `S35 (Bought)<br>Branch XIV<br>x2L and F, x1.5E<br>Cost: 2e123 Seeds`;
    }
    if (seedUpgradeFactor.S37Bought) {
        const x = new Decimal(5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S37').innerHTML = `S37 (Bought)<br>Twig III<br>x25L, x5S, x5F<br>Cost: 1e192 Seeds`;
    }
    if (seedUpgradeFactor.S39Bought) {
        const x = new Decimal(50);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S39').innerHTML = `S39 (Bought)<br>Table Flip<br>x5L, x20S, x50F, but x0.1 TAS<br>Cost: 5.5e270 Seeds`;
    }
    if (fruitUpgradeFactor.F23Bought) {
        const x = new Decimal(2);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F23').innerHTML = `F23 (Bought)<br>Bloom IV<br>x2L, S, F, x5TAS<br>Cost: 1.28e21 Fruits`;
    }
    if (fruitUpgradeFactor.F26Bought) {
        const x = new Decimal(3);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F26').innerHTML = `F26 (Bought)<br>Bloom VI<br>x3L, F, and x100CS<br>Cost: 2e33 Fruits`;
    }
    if (fruitUpgradeFactor.F28Bought) {
        const x = new Decimal(3);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F28').innerHTML = `F28 (Bought)<br>Bloom VIII<br>x20L, x5S, x3F, x2TAS<br>Cost: 7.5e45 Fruits`;
    }
    if (fruitUpgradeFactor.F30Bought) {
        const x = new Decimal(10);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F30').innerHTML = `F30 (Bought)<br>Bloom IX<br>x10L, S, F, and CRS<br>(CRS stands for Cell Replication speed)<br>Cost: 3.5e89 Fruits`;
    }
    if (fruitUpgradeFactor.F34Bought) {
        const x = new Decimal(33);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F34').innerHTML = `F34 (Bought)<br>Stupidly Overpowered<br>x3E, x33F, x333S, x3333L, x33^3 TAS<br>Cost: 1.41e141 Fruits`;
    }
    if (seedUpgradeFactor.S40Bought) {
        const x = new Decimal(42);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("S40").innerHTML = `S40 (Bought)<br>Branch XV<br>x42L, S, F, TAS, CRS<br>Cost: 3.33e333 Seeds`;
    }
    if (seedUpgradeFactor.S41Bought) {
        const x = new Decimal(20);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("S41").innerHTML = `S41 (Bought)<br>Branch XVI<br>x20L, S, F, x3E<br>Cost: 1e430 Seeds`;
    }
    if (fruitUpgradeFactor.F35Bought) {
        const x = new Decimal(3);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("F35").innerHTML = `F35 (Bought)<br>Bloom XII<br>x2E, x3F, x4S, x5L<br>Cost: 3.5e165 Fruits`;
    }
    if (fruitUpgradeFactor.F36Bought) {
        const x = new Decimal(10);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("F36").innerHTML = `F36 (Bought)<br>Bloom XIII<br>x10L, S, F, x2E<br>Cost: 1e281 Fruits`;
    }
    if (entropyUpgradeFactor.E26Bought) {
        const x = gameData.fruits;
        const y = x.plus(new Decimal(2));
        const z = Decimal.log(y, new Decimal(1e100));
        const w = z.times(new Decimal(1).div(new Decimal(3)));
        const v = w.plus(new Decimal(1));
        entropyUpgradeFactor.E26 = v;
        document.getElementById("E26").innerHTML = `E26 (Bought)<br>Empower<br>Fruits boost E4's effect<br>Cost: 1e20 Entropy<br>Effect: x${truncateToDecimalPlaces(v, 3)}`;
    }
	if (gameData.reinforcements.greaterThanOrEqualTo(new Decimal(1))) {
		const x = new Decimal(2.5);
		const y = gameData.reinforcements.times(x);
		totalMultiplier = totalMultiplier.times(y);
	}

    if (temple.repeatableUpgradeFactor.LR1.greaterThanOrEqualTo(new Decimal(1))) {
        const x = temple.repeatableUpgradeFactor.LR1Effect;
        const y = x.pow(temple.repeatableUpgradeFactor.LR1);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("LR1").innerHTML = `LR1 (${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR1, 3)} / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR1Cap, 3)})<br>x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR1Effect, 3)}L, x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR1Effect, 3)}F<br>Cost: ${truncateToDecimalPlaces(temple.LR1CostCalculation(), 3)} Leaves<br>Effect: x${truncateToDecimalPlaces(y, 3)}`;
    }
    else {
        document.getElementById("LR1").innerHTML = `LR1 (0 / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR1Cap, 3)})<br>x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR1Effect, 3)}L, x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR1Effect, 3)}F<br>Cost: 1e500 Leaves<br>Effect: 1x`;
    }

    if (entropyUpgradeFactor.E1Bought) {
        totalMultiplier = totalMultiplier.times(gameData.cellsFruitEffect);
    }

    if (fruitUpgradeFactor.F21Bought) {
        totalMultiplier = totalMultiplier.pow(new Decimal(1.25));
        document.getElementById("F21").innerHTML = `F21 (Bought)<br>Wood Circuit<br>Base Fruits Mult ^ 1.25<br>Cost: 7.5e15 Fruits`
    }
    if (leafUpgradeFactor.L56Bought) {
        const x = gameData.entropy.plus(new Decimal(1));
        const y = Decimal.log(x, new Decimal(1e3));
        const z = y.pow(new Decimal(1).div(new Decimal(2)));
        const w = z.times(new Decimal(0.1));
        const v = w.plus(new Decimal(1));
        totalMultiplier = totalMultiplier.pow(v);
        document.getElementById('L56').innerHTML = `L56 (Bought)<br>Forbidden Powers V<br>Entropy raises the base Fruit multiplier<br>Cost: 1e940 Leaves<br>Effect: ^${truncateToDecimalPlaces(v, 3)}`;
    }
	if (gameData.isInChallengeDrought) {
		if (entropyUpgradeFactor.E41Bought) {
			totalMultiplier = totalMultiplier.pow(new Decimal(1.5));
		}
	}

    if (gameData.fruitsIsSoftcapped) {
        totalMultiplier = totalMultiplier.pow(new Decimal(0.75))
        document.getElementById('fruitSoftcap').innerHTML = '(Softcapped)';
    }
	totalMultiplier = totalMultiplier.times(gameData.gameSpeed);

    gameData.fruitsMult = totalMultiplier;
}

export function calculateTreeAge() {
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
    if (leafUpgradeFactor.L34Bought) {
        const x = new Decimal(new Decimal(5));
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L34TAS = y;
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L34").innerHTML = `L34 (Bought)<br>Super Grow III<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L34Leaves, 3)}L, x${truncateToDecimalPlaces(leafUpgradeFactor.L34Leaves, 3)}S, x${truncateToDecimalPlaces(leafUpgradeFactor.L34Fruits, 3)}F, x${truncateToDecimalPlaces(leafUpgradeFactor.L34TAS, 3)}TAS<br>(TAS stands for Tree Aging speed)<br>Cost: 1e127 Leaves`;
    }
    if (leafUpgradeFactor.L37Bought) {
        const x = new Decimal(new Decimal(9.869));
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("L37").innerHTML = `L37 (Bought)<br>Grow XII<br>xπ<sup>2</sup> Tree Aging speed<br>Cost: 2e164 Leaves<br>Effect: x${truncateToDecimalPlaces(y, 3)}`;
    }
    if (seedUpgradeFactor.S26Bought) {
        const x = gameData.cells.div(new Decimal(1e40));
        const y = Decimal.log((x.plus(new Decimal(1))), new Decimal(1e5));
        const z = y.pow(new Decimal(2));
        const w = z.plus(new Decimal(1));
        totalMultiplier = totalMultiplier.times(w);
        document.getElementById("S26").innerHTML = `S26 (Bought)<br>Cellular Worker<br>Cells boost Tree Aging speed<br>Cost: 1e51 Seeds<br>Effect: x${truncateToDecimalPlaces(w, 3)}`;
    }
    if (leafUpgradeFactor.L40Bought) {
        const x = (gameData.treeAge.div(new Decimal(1e23))).plus(new Decimal(1));
        const y = Decimal.log10(x);
        const z = y.pow(new Decimal(1.5));
        totalMultiplier = totalMultiplier.times(z);
        document.getElementById("L40").innerHTML = `L40 (Bought)<br>Accelerator<br>Tree Age boosts itself<br>Cost: 1e243 Leaves<br>Effect: x${truncateToDecimalPlaces(z, 3)}`;
    }
    if (leafUpgradeFactor.L42Bought) {
        const x = new Decimal(22.22);
        const y = x.plus(gameData.mossEffect);
        leafUpgradeFactor.L42TAS = y;
        totalMultiplier = totalMultiplier.times(leafUpgradeFactor.L42TAS);
        document.getElementById('L42').innerHTML = `L42 (Bought)<br>Super Grow VI<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L42Leaves, 3)}L, x${truncateToDecimalPlaces(leafUpgradeFactor.L42Leaves, 3)}S, x${truncateToDecimalPlaces(leafUpgradeFactor.L42Fruits, 3)}F, x${truncateToDecimalPlaces(leafUpgradeFactor.L42TAS, 3)}TAS<br>Cost: 5.25e278 Leaves`;
    }
    if (leafUpgradeFactor.L48Bought) {
        const x = new Decimal(7);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById('L48').innerHTML = `L48 (Bought)<br>Final Stretch VI<br>x${truncateToDecimalPlaces(y, 3)} Tree Aging speed<br>you were so innocent back then,<br>thinking L11 was a massive boost.<br>Cost: 3.2e297 Leaves`;
    }
    if (seedUpgradeFactor.S31Bought) {
        const x = new Decimal(5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S31').innerHTML = `S31 (Bought)<br>Branch XII<br>x42L, x5TAS<br>Cost: 5e83 Seeds`;
    }
    if (seedUpgradeFactor.S39Bought) {
        const x = new Decimal(0.1);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S39').innerHTML = `S39 (Bought)<br>Table Flip<br>x5L, x20S, x50F, but x0.1 TAS<br>Cost: 5.5e270 Seeds`;
    }
    if (fruitUpgradeFactor.F23Bought) {
        const x = new Decimal(5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F23').innerHTML = `F23 (Bought)<br>Bloom IV<br>x2L, S, F, x5TAS<br>Cost: 1.28e21 Fruits`;
    }
    if (fruitUpgradeFactor.F27Bought) {
        const x = new Decimal(7.5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F27').innerHTML = `F27 (Bought)<br>Bloom VII<br>x20L, x7.5TAS<br>Cost: 2e37 Fruits`;
    }
    if (fruitUpgradeFactor.F28Bought) {
        const x = new Decimal(2);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F28').innerHTML = `F28 (Bought)<br>Bloom VIII<br>x20L, x5S, x3F, x2TAS<br>Cost: 7.5e45 Fruits`;
    }
    if (fruitUpgradeFactor.F31Bought) {
        const x = new Decimal(100);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F31').innerHTML = `F31 (Bought)<br>Bloom X<br>Googol Fruits!<br>x100L, TAS, and x2E<br>Cost: 1e100 Fruits`;
    }
    if (fruitUpgradeFactor.F34Bought) {
        const x = new Decimal(35937);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F34').innerHTML = `F34 (Bought)<br>Stupidly Overpowered<br>x3E, x33F, x333S, x3333L, x33^3 TAS<br>Cost: 1.41e141 Fruits`;
    }
    if (seedUpgradeFactor.S40Bought) {
        const x = new Decimal(42);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("S40").innerHTML = `S40 (Bought)<br>Branch XV<br>x42L, S, F, TAS, CRS<br>Cost: 3.33e333 Seeds`;
    }
    if (fruitUpgradeFactor.F37Bought) {
        const x = new Decimal(1e9);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("F37").innerHTML = `F37 (Bought)<br>Unstable I<br>x1e9L and TAS<br>Cost: 1e370 Fruits`;
    }
    if (fruitUpgradeFactor.M3.greaterThanOrEqualTo(new Decimal(1))) {
        const x = new Decimal(2);
		const y = x.times(fruitUpgradeFactor.M3EffectMult);
        const z = y.pow(fruitUpgradeFactor.M3);
        totalMultiplier = totalMultiplier.times(z);
        document.getElementById('M3').innerHTML = `M3<br>Time is Slipping By (${truncateToDecimalPlaces(fruitUpgradeFactor.M3, 3)})<br>Little boost of x${truncateToDecimalPlaces((fruitUpgradeFactor.M3EffectMult.times(x)), 3)} TAS<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M3CostCalculation(), 3)} Moss<br>Effect: x${truncateToDecimalPlaces(z, 3)}`;
    }
    if (temple.repeatableUpgradeFactor.SR1.greaterThanOrEqualTo(new Decimal(1))) {
        const x = temple.repeatableUpgradeFactor.SR1Effect;
        const y = x.pow(temple.repeatableUpgradeFactor.SR1);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("SR1").innerHTML = `SR1 (${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR1, 3)} / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR1Cap, 3)})<br>x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR1Effect, 3)}L, x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR1Effect, 3)}TAS<br>Cost: ${truncateToDecimalPlaces(temple.SR1CostCalculation(), 3)} Seeds<br>Effect: x${truncateToDecimalPlaces(y, 3)}`;
    }
    else {
        document.getElementById("SR1").innerHTML = `SR1 (0 / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR1Cap, 3)})<br>x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR1Effect, 3)}L, x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR1Effect, 3)}TAS<br>Cost: 1e1000 Seeds<br>Effect: 1x`;
    }
	
	if (gameData.isInChallengeDrought) {
        totalMultiplier = totalMultiplier.pow(gameData.droughtBaseFactor);
	}
	
	totalMultiplier = totalMultiplier.times(gameData.gameSpeed);

    gameData.treeAgePerTick = new Decimal(1).times(totalMultiplier);
}

export function calculateGameSpeed() {
	let totalMultiplier = new Decimal(1);
	
	if (gameData.isInChallengeDrought) {
		const x = gameData.ticksToProcess;
		gameData.droughtTimeFactor = gameData.droughtTimeFactor.plus(x);
		const y = gameData.droughtTimeFactor.div(new Decimal(10));
		const z = y.clamp(new Decimal(1), new Decimal(Infinity));
		totalMultiplier = totalMultiplier.times(z);
	}
	else {
		gameData.droughtTimeFactor = new Decimal(0);
	}
	if (entropyUpgradeFactor.E38Bought) {
		const x = new Decimal(6.9);
		totalMultiplier = totalMultiplier.times(x);
	}
	if (fruitUpgradeFactor.F45Bought) {
		const x = new Decimal(4);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById("F45").innerHTML = `F45 (Bought)<br>Bloom XIV<br>x4 Game speed<br>Cost: 1.79e3008 Fruits`;
	}
	if (rootUpgradeFactor.RO7Bought) {
		const x = new Decimal(100);
		totalMultiplier = totalMultiplier.times(x);
	}
	if (gameData.rna.greaterThanOrEqualTo(new Decimal(1))) {
		const x = gameData.ticksToProcess;
		gameData.rnaTimeFactor = gameData.rnaTimeFactor.plus(x);
		var y = gameData.rna.div(new Decimal(10));
		if (entropyUpgradeFactor.trb.greaterThanOrEqualTo(new Decimal(1))) {
			y = y.times(entropyUpgradeFactor.trbEffect);
		}
		const z = gameData.rnaTimeFactor.times(y);
		const w = z.clamp(new Decimal(1), new Decimal(Infinity));
		
		totalMultiplier = totalMultiplier.times(w);
		
		document.getElementById('rnaEffectCounter').innerHTML = `+0.1 Game speed mult every second each strand (+${truncateToDecimalPlaces(y, 3)}/s)`;
	}
	if (entropyUpgradeFactor.R1Amount.greaterThanOrEqualTo(new Decimal(1))) {
		var x = entropyUpgradeFactor.R1Effect;
		if (entropyUpgradeFactor.trb.greaterThanOrEqualTo(new Decimal(1))) {
			x = x.times(entropyUpgradeFactor.trbEffect);
		}
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('R1').innerHTML = `More Game speed (${truncateToDecimalPlaces(entropyUpgradeFactor.R1Amount, 3)})<br>Requires ${truncateToDecimalPlaces(entropyUpgradeFactor.R1Cost, 3)} RNA strands<br>Effect: x${truncateToDecimalPlaces(x, 3)} Game speed`;
	}
	if (gameData.isInChallengeBlizzard) {
		totalMultiplier = totalMultiplier.div(gameData.blizzardBaseGameSpeedFactor);
	}
	
	gameData.gameSpeed = totalMultiplier;
	if ((gameData.gameSpeed.greaterThan(new Decimal(1))) || (gameData.droughtLevel.greaterThan(new Decimal(1)))) {
		document.getElementById("gameSpeedHolder").style.display = 'block';
	}
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
        document.getElementById("F10").innerHTML = `F10 (Bought)<br>Fast Decomposition<br>x4 Composting speed<br>Cost: 1000 Fruits`;
    }
    if (fruitUpgradeFactor.F13Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(3));
        document.getElementById("F13").innerHTML = `F13 (Bought)<br>Dirt Nutrients<br>x3 Composting speed<br>Cost: 7000 Fruits`;
    }
    if (fruitUpgradeFactor.F22Bought) {
        totalMultiplier = totalMultiplier.times(new Decimal(20));
        document.getElementById("F22").innerHTML = `F22 (Bought)<br>Composting Techniques II<br>x20 Composting speed<br>Cost: 5e16 Fruits`;
    }
    if (moss.mossMilestoneFactor.MM3Achieved) {
        totalMultiplier = totalMultiplier.times(new Decimal(20));
    }
    if (moss.mossMilestoneFactor.MM4Achieved) {
        totalMultiplier = totalMultiplier.times(new Decimal(5));
    }
    if (entropyUpgradeFactor.E6Bought) {
        const x = new Decimal(1.1).pow(gameData.totalFertilizers);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("E6").innerHTML = `E6 (Bought)<br>Composting Power<br>Fertilizers boost Composting speed<br>Cost: 3 Entropy<br>Effect: x${truncateToDecimalPlaces(x, 3)}`;
    }
    if (leafUpgradeFactor.L38Bought) {
        const x = new Decimal(20);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        leafUpgradeFactor.L38CS = y;
        document.getElementById('L38').innerHTML = `L38 (Bought)<br>Super Grow V<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L38Entropy, 3)}E, x${truncateToDecimalPlaces(leafUpgradeFactor.L38Leaves, 3)}L, x${truncateToDecimalPlaces(leafUpgradeFactor.L38CS, 3)}CS<br>(CS stands for Composting Speed)<br>Cost: 5e190 Leaves`;
    }
    if (leafUpgradeFactor.L49Bought) {
        const x = new Decimal(8);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById('L49').innerHTML = `L49 (Bought)<br>Final Stretch VII<br>x${truncateToDecimalPlaces(y, 3)} Composting speed<br>Now the only thing that really<br>could boost you that much<br>would be just straight up<br>raising your leaf count entirely.<br>Cost: 6.4e298 Leaves`;
    }
    if (fruitUpgradeFactor.F26Bought) {
        const x = new Decimal(100);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F26').innerHTML = `F26 (Bought)<br>Bloom VI<br>x3L, F, and x100CS<br>Cost: 2e33 Fruits`;
    }
    if (achievements.ach55) {
        totalMultiplier = totalMultiplier.times(gameData.bacteriaCellsCSMult)
    }
	totalMultiplier = totalMultiplier.times(gameData.gameSpeed);

    gameData.compostingSpeed = totalMultiplier;
}

export function calculatePotentialEnergyPower() {
	let totalMultiplier = new Decimal(1);
	
	if (leafUpgradeFactor.L58Bought) {
		const x = new Decimal(1.05);
		totalMultiplier = totalMultiplier.times(x);
        document.getElementById('L58').innerHTML = `L58 (Bought)<br>Base Power I<br>^1.05 Potential Energy<br>Cost: 1e1500 Leaves`;
	}
	if (seedUpgradeFactor.S46Bought) {
		const x = new Decimal(1.05);
		totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S46').innerHTML = `S46 (Bought)<br>Base Power IV<br>^1.05 Potential Energy<br>Cost: 1e1500 Seeds`;
	}
	if (gameData.isInChallengeBlizzard) {
		totalMultiplier = totalMultiplier.times(gameData.blizzardBasePEFactor);
	}
	gameData.potentialEnergyPow = totalMultiplier;
	totalMultiplier = totalMultiplier.times(gameData.gameSpeed);
}

export function calculateEntropyMult() {
    let totalMultiplier = new Decimal(1);

    if (moss.mossMilestoneFactor.MM5Achieved) {
        totalMultiplier = totalMultiplier.times(new Decimal(2));
    }
    if (leafUpgradeFactor.L38Bought) {
        const x = new Decimal(1.2);
        const y = x.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(y);
        leafUpgradeFactor.L38Entropy = y;
        document.getElementById('L38').innerHTML = `L38 (Bought)<br>Super Grow V<br>x${truncateToDecimalPlaces(leafUpgradeFactor.L38Entropy, 3)}E, x${truncateToDecimalPlaces(leafUpgradeFactor.L38Leaves, 3)}L, x${truncateToDecimalPlaces(leafUpgradeFactor.L38CS, 3)}CS<br>(CS stands for Composting Speed)<br>Cost: 5e190 Leaves`;
    }
    if (entropyUpgradeFactor.E16Bought) {
        const x = new Decimal(1.5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('E16').innerHTML = `E16 (Bought)<br>Split of Power<br>x1.5 Entropy<br>Cost: 2500 Entropy`;
    }
    if (leafUpgradeFactor.L50Bought) {
        const x = new Decimal(4.2);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('L50').innerHTML = `L50 (Bought)<br>THE BEGINNING OF THE END<br>Infinite Leaves!<br>x4.2 Entropy<br>This is not the end yet— at least,<br>but this is a pretty good point to stop<br>and reflect on what you've accomplished.<br>Cost: 1.79e308 Leaves`;
    }
    if (seedUpgradeFactor.S33Bought) {
        const x = new Decimal(1.2);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S33').innerHTML = `S33 (Bought)<br>Branch XIII<br>x1.2E, x5S<br>Cost: 1e97 Seeds`;
    }
    if (seedUpgradeFactor.S35Bought) {
        const x = new Decimal(1.5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S35').innerHTML = `S35 (Bought)<br>Branch XIV<br>x2L and F, x1.5E<br>Cost: 2e123 Seeds`;
    }
    if (fruitUpgradeFactor.F31Bought) {
        const x = new Decimal(2);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F31').innerHTML = `F31 (Bought)<br>Bloom X<br>Googol Fruits!<br>x100L, TAS, and x2E<br>Cost: 1e100 Fruits`;
    }
    if (fruitUpgradeFactor.F33Bought) {
        const x = new Decimal(2.81);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F33').innerHTML = `F33 (Bought)<br>Entropy Controller<br>x2.81 Entropy<br>Cost: 1.28e128 Fruits`;
    }
    if (fruitUpgradeFactor.F34Bought) {
        const x = new Decimal(3);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('F34').innerHTML = `F34 (Bought)<br>Stupidly Overpowered<br>x3E, x33F, x333S, x3333L, x33^3 TAS<br>Cost: 1.41e141 Fruits`;
    }
    if (seedUpgradeFactor.S41Bought) {
        const x = new Decimal(3);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("S41").innerHTML = `S41 (Bought)<br>Branch XVI<br>x20L, S, F, x3E<br>Cost: 1e430 Seeds`;
    }
    if (leafUpgradeFactor.L52Bought) {
        const x = gameData.cells;
        const y = Decimal.log(x, new Decimal(1.79e308));
        const z = y.plus(new Decimal(1));
        const w = z.plus(gameData.mossEffect);
        totalMultiplier = totalMultiplier.times(w);
        document.getElementById('L52').innerHTML = `L52 (Bought)<br>Forbidden Powers II<br>Cells boost Entropy<br>Cost: 1e485 Leaves<br>Effect: x${truncateToDecimalPlaces(w, 3)}`;
    }
    if (fruitUpgradeFactor.F35Bought) {
        const x = new Decimal(2);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("F35").innerHTML = `F35 (Bought)<br>Bloom XII<br>x2E, x3F, x4S, x5L<br>Cost: 3.5e165 Fruits`;
    }
    if (fruitUpgradeFactor.F36Bought) {
        const x = new Decimal(2);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById("F36").innerHTML = `F36 (Bought)<br>Bloom XIII<br>x10L, S, F, x2E<br>Cost: 1e281 Fruits`;
    }
	if (leafUpgradeFactor.L59Bought) {
		const x = new Decimal(10);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('L59').innerHTML = `L59 (Bought)<br>Grow XIII<br>x10 Entropy<br>Cost: 1e1781 Leaves`;
	}
    if (moss.mossMilestoneFactor.MM9Achieved) {
        const x = gameData.totalFertilizers;
        const y = x.times(new Decimal(0.2));
        const z = y.minus(new Decimal(150));
        const w = z.clamp(new Decimal(1), new Decimal(Infinity));
        moss.mossMilestoneFactor.MM9 = w;
        
        totalMultiplier = totalMultiplier.times(w);
    }
    if (seedUpgradeFactor.S45Bought) {
        const x = new Decimal(2.5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S45').innerHTML = `S45 (Bought)<br>Twig IV<br>x100L, x2.5S<br>Cost: 1e1459 Seeds`;
    }
	if (gameData.isInChallengeBlizzard) {
		totalMultiplier = new Decimal(1);
	}

    gameData.entropyMult = totalMultiplier;
}

export function calculateRootsMult() {
	let totalMultiplier = new Decimal(1);
	if (rootUpgradeFactor.RM7Achieved) {
		const x = Decimal.log10(gameData.potentialEnergy.plus(new Decimal(1)));
		const a = new Decimal(0.015625);
		const b = new Decimal(1.0006934);
		const y = a.times(b.pow(x));
		const z = y.clamp(new Decimal(1), new Decimal(Infinity));
		totalMultiplier = totalMultiplier.times(z);
		document.getElementById('RM7Effect').innerHTML = `Potential Energy multiplies Root gain<br>Effect: x${truncateToDecimalPlaces(z, 3)}`;
	}
	gameData.rootsMult = totalMultiplier;
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
	totalMultiplier = totalMultiplier.times(gameData.gameSpeed);

    gameData.leafSoftcapStart = totalMultiplier;
    if (gameData.leavesIsSoftcapped) {
        document.getElementById('leafSoftcapInfo').innerHTML = `The Leaf softcap starts at ${truncateToDecimalPlaces(gameData.leafSoftcapStart.times(new Decimal(1e20)), 3)} (^${truncateToDecimalPlaces(gameData.baseLeafSoftcapFactor, 3)})`;
    }
    if (gameData.leavesIsSoftcapped2) {
        document.getElementById('leafSoftcap2Info').innerHTML = `The Leaf softcap^2 starts at 1.79e308`;
    }
    if (gameData.leavesIsSoftcapped3) {
        document.getElementById('leafSoftcap3Info').innerHTML = `The Leaf softcap^3 starts at 1e500`;
    }
    if (gameData.leavesIsSoftcapped4) {
        document.getElementById('leafSoftcap4Info').innerHTML = `The (Leaf softcap^4)^2 starts at 1e1000`;
        achievements.ach75 = true;
        massAchievementChecker();
    }
    if (gameData.leavesIsSoftcapped5) {
        document.getElementById('leafSoftcap5Info').innerHTML = `The (Leaf softcap^5)^2 starts at 1e2000`;
    }
}

export function calculateFreeLeafFertilizers() {
    let totalAdd = new Decimal(0);
    if (entropyUpgradeFactor.B1Amount.greaterThanOrEqualTo(new Decimal(1))) {
        totalAdd = totalAdd.plus(entropyUpgradeFactor.B1Effect);
    }
    if (seedUpgradeFactor.S36Bought) {
        const x = gameData.seedComposterCount.minus(new Decimal(50));
        const y = x.clamp(new Decimal(0), new Decimal(Infinity));
        const z = (y.div(new Decimal(4))).trunc();
        totalAdd = totalAdd.plus(z);
        document.getElementById('S36').innerHTML = `S36 (Bought)<br>Staked Fertilizers<br>After 50 Fertilizers,<br>the Seed Composter makes Leaf Fertilizers<br>Cost: 2.5e146 Seeds<br>Effect: +${truncateToDecimalPlaces(z, 3)}`;
    }
    if (fruitUpgradeFactor.F29Bought) {
        const x = gameData.fruitComposterCount.minus(new Decimal(50));
        const y = x.clamp(new Decimal(0), new Decimal(Infinity));
        const z = (y.div(new Decimal(4))).trunc();
        totalAdd = totalAdd.plus(z);
        document.getElementById('F29').innerHTML = `F29 (Bought)<br>Super Staked Fertilizers<br>After 50 Fertilizers,<br>the Fruit Composter makes Leaf Fertilizers<br>Cost: 1e61 Fruits<br>Effect: +${truncateToDecimalPlaces(z, 3)}`;
    }
    if (gameData.isInChallengeWildfire) {
        totalAdd = totalAdd.times(new Decimal(0));
		if (entropyUpgradeFactor.E35Bought) {
			totalAdd = new Decimal(15);
		}
    }

    gameData.freeLeafFertilizers = totalAdd;
}
export function calculateFreeSeedFertilizers() {
    let totalAdd = new Decimal(0);
    if (entropyUpgradeFactor.B1Amount.greaterThanOrEqualTo(new Decimal(1))) {
        totalAdd = totalAdd.plus(entropyUpgradeFactor.B1Effect);
    }
    if (gameData.isInChallengeWildfire) {
        totalAdd = totalAdd.times(new Decimal(0));
		if (entropyUpgradeFactor.E35Bought) {
			totalAdd = new Decimal(15);
		}
    }

    gameData.freeSeedFertilizers = totalAdd;
}
export function calculateFreeFruitFertilizers() {
    let totalAdd = new Decimal(0);
    if (entropyUpgradeFactor.B1Amount.greaterThanOrEqualTo(new Decimal(1))) {
        totalAdd = totalAdd.plus(entropyUpgradeFactor.B1Effect);
    }
    if (gameData.isInChallengeWildfire) {
        totalAdd = totalAdd.times(new Decimal(0));
		if (entropyUpgradeFactor.E35Bought) {
			totalAdd = new Decimal(15);
		}
    }

    gameData.freeFruitFertilizers = totalAdd;
}

export function calculateLeafComposterCost() {
    let totalMultiplier = new Decimal(1);
    if (leafUpgradeFactor.L35Bought) {
        const x = new Decimal(1).div(new Decimal(15));
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('L35').innerHTML = `L35 (Bought)<br>Leaftic Cheapener I<br>1/15 base Leaf Composter costs<br>Cost: 1e137 Leaves`;
    }
    if (leafUpgradeFactor.L39Bought) {
        const x = new Decimal(1).div(new Decimal(50));
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('L39').innerHTML = `L39 (Bought)<br>Leaftic Cheapener II<br>1/50 base Leaf Composter costs<br>Cost: 2.5e231 Leaves`;
    }
    gameData.leafComposterDiscount = totalMultiplier;
}

export function calculateSeedComposterCost() {
    let totalMultiplier = new Decimal(1);
    if (seedUpgradeFactor.S28Bought) {
        const x = new Decimal(1).div(new Decimal(3));
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S28').innerHTML = `S28 (Bought)<br>Seedic Cheapener<br>1/3 base Seed Composter costs<br>Cost: 5e64 Seeds`;
    }

    gameData.seedComposterDiscount = totalMultiplier;
}

export function calculateComposterScalingStart() {
    let totalDelay = new Decimal(25);
    if (entropyUpgradeFactor.E10Bought) {
        const x = gameData.entropy.plus(new Decimal(2));
        const y = Decimal.log(x, new Decimal(2));
        totalDelay = totalDelay.plus(y);
        document.getElementById('E10').innerHTML = `E10 (Bought)<br>Entropic Cheapener<br>Entropy delays Fertilizer scaling<br>Cost: 15 Entropy<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
    }
    if (gameData.isInChallengeWildfire) {
        const x = new Decimal(0);
        totalDelay = totalDelay.times(x);
    }
    gameData.composterScalingStart = totalDelay.trunc();
}

export function calculateMossEffect() {
    let totalMultiplier = new Decimal(0);
    if (fruitUpgradeFactor.M4.greaterThanOrEqualTo(new Decimal(1))) {
        const x = new Decimal(1);
        const y = x.times(fruitUpgradeFactor.M4);
        totalMultiplier = totalMultiplier.plus(y);
        document.getElementById('M4').innerHTML = `M4<br>Moss Effect: Andromeda (${truncateToDecimalPlaces(fruitUpgradeFactor.M4, 3)})<br>+1 to the total Moss effect<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M4CostCalculation(), 3)} Moss<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
    }
    gameData.mossEffectMultiplier = totalMultiplier;
}

export function calculateComposterSuperScalingStart() {
    let totalDelay = new Decimal(100);
    if (fruitUpgradeFactor.M1.greaterThanOrEqualTo(new Decimal(1))) {
        const x = new Decimal(2);
		const y = x.times(fruitUpgradeFactor.M1EffectMult);
        var z = y.times(fruitUpgradeFactor.M1);
		if (z.greaterThanOrEqualTo(new Decimal(100))) {
			const w = z.pow(new Decimal(0.5));
			z = new Decimal(100).plus(w);
		}
        totalDelay = totalDelay.plus(z);
        document.getElementById('M1').innerHTML = `M1<br>Delay Super Scaling (${truncateToDecimalPlaces(fruitUpgradeFactor.M1, 3)})<br>Delays Fertilizer Super Scaling by +${truncateToDecimalPlaces((fruitUpgradeFactor.M1EffectMult.times(x)), 3)}<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M1CostCalculation(), 3)} Moss<br>Effect: +${truncateToDecimalPlaces(z, 3)}`;
    }
    if (temple.repeatableUpgradeFactor.FR1.greaterThanOrEqualTo(new Decimal(1))) {
        const x = temple.repeatableUpgradeFactor.FR1Effect;
        const y = x.times(temple.repeatableUpgradeFactor.FR1);
        totalDelay = totalDelay.plus(y);
        document.getElementById("FR1").innerHTML = `FR1 (${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.FR1, 3)} / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.FR1Cap, 3)})<br>+${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.FR1Effect, 3)} Super Scaling start<br>Cost: ${truncateToDecimalPlaces(temple.FR1CostCalculation(), 3)} Fruits<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
    }
    else {
        document.getElementById("FR1").innerHTML = `FR1 (0 / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.FR1Cap, 3)})<br>+${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.FR1Effect, 3)} Super Scaling start<br>Cost: 1e1000 Fruits<br>Effect: +0`;
    }
	if (entropyUpgradeFactor.R2Amount.greaterThanOrEqualTo(new Decimal(1))) {
		totalDelay = totalDelay.plus(entropyUpgradeFactor.R2Effect);
		document.getElementById('R2').innerHTML = `Delay Super Scaling (${truncateToDecimalPlaces(entropyUpgradeFactor.R2Amount, 3)})<br>Requires ${truncateToDecimalPlaces(entropyUpgradeFactor.R2Cost, 3)} RNA strands<br>Effect: +${truncateToDecimalPlaces(entropyUpgradeFactor.R2Effect, 3)} Super Scaling delay`;
	}
    if (gameData.isInChallengeWildfire) {
        const x = new Decimal(0);
        totalDelay = totalDelay.times(x);
    }
    gameData.composterSuperScalingStart = totalDelay.trunc();
}

export function calculateComposterSuperScalingEffect() {
    let totalMultiplier = new Decimal(1.1);
    if (entropyUpgradeFactor.E23Bought) {
        const x = new Decimal(1.075);
        totalMultiplier = totalMultiplier.div(x);
    }
    if (gameData.isInChallengeWildfire) {
        const x = gameData.wildfireBaseFactor;
        totalMultiplier = totalMultiplier.pow(x);
    }
    gameData.composterSuperScalingEffect = totalMultiplier;
}

export function calculateFertilizerCostDivision() {
    let totalDivision = new Decimal(1);
    if (fruitUpgradeFactor.F40Bought) {
        const x = new Decimal(4.5);
        const y = gameData.compostingSpeed.pow(x);
		totalDivision = totalDivision.times(y);
		document.getElementById('F40').innerHTML = `F40 (Bought)<br>Composting Techniques III<br>Composting speed divides Fertilizer cost<br>Cost: 1e750 Fruits<br>Effect: /${truncateToDecimalPlaces(y, 3)}`;
    }
    if (rootUpgradeFactor.RO4Bought) {
		const x = gameData.moss.plus(new Decimal(1));
		const y = x.pow(new Decimal(0.1));
        totalDivision = totalDivision.times(y);
        document.getElementById("RO4").innerHTML = `RO4 (Bought)<br>Price of Power<br>Moss divides L, S, and F Composter costs<br>with reduced rate<br>Cost: 0.5 Roots<br>Effect: /${truncateToDecimalPlaces(y, 3)}`;
    }
	
    gameData.composterCostDivision = totalDivision;
}

export function calculateFertilizerBulk() {
    let totalBulk = new Decimal(1);
    if (fruitUpgradeFactor.F38Bought) {
        const x = new Decimal(1);
        totalBulk = totalBulk.plus(x);
		document.getElementById('F38').innerHTML = `F38 (Bought)<br>Bulkier I<br>+1 Fertilizer Bulk<br>Cost: 1e500 Fruits`;
    }
    if (fruitUpgradeFactor.F42Bought) {
        const x = new Decimal(2);
        totalBulk = totalBulk.plus(x);
		document.getElementById('F42').innerHTML = `F42 (Bought)<br>Bulkier II<br>+2 Fertilizer Bulk<br>Cost: 1.2e1222 Fruits`;
    }
	
	
    gameData.fertilizerBulk = totalBulk;
}

export function calculateCellUpgradesBulk() {
    let totalBulk = new Decimal(1);
    if (rootUpgradeFactor.RM1) {
        const x = new Decimal(4);
        totalBulk = totalBulk.plus(x);
    }
    gameData.cellUpgradesBulk = totalBulk;
}

export function calculateCellsEffectMult() {
    let totalMultiplier = new Decimal(1);
    if (entropyUpgradeFactor.E11Bought) {
        const x = gameData.cells.div(new Decimal(1e80));
        const y = x.plus(new Decimal(2));
        const z = Decimal.log(y, new Decimal(1e5));
        const w = new Decimal(1.5).pow(z);
        const v = w.plus(new Decimal(1));
        totalMultiplier = totalMultiplier.times(v);
        document.getElementById('E11').innerHTML = `E11 (Bought)<br>Cells Formation<br>Cells effect formula is better<br>Cost: 35 Entropy<br>Effect: x${truncateToDecimalPlaces(v, 3)}`;
    }
    
    gameData.cellsEffectMult = totalMultiplier;
}

export function calculateCellsIntervalDiv() {
    let totalDivision = new Decimal(1);
    if (entropyUpgradeFactor.E12Bought) {
        const x = gameData.entropy.pow(new Decimal(0.75));
        const y = x.plus(new Decimal(1));
        const z = new Decimal(1).div(y);
        totalDivision = totalDivision.times(z);
        document.getElementById('E12').innerHTML = `E12 (Bought)<br>Power of Potential<br>Cells interval is divided<br>based on Entropy<br>Cost: 170 Entropy<br>Effect: /${truncateToDecimalPlaces(y, 3)}`;
    }
    if (achievements.ach55) {
        totalDivision = totalDivision.div(gameData.bacteriaCellsCSMult)
    }
    if (seedUpgradeFactor.S38Bought) {
        const x = gameData.bacteria.plus(new Decimal(1));
        const y = Decimal.log(x, new Decimal(1000));
        const z = new Decimal(2).pow(y);
        const w = z.plus(new Decimal(1));
        const v = new Decimal(1).div(w);
        totalDivision = totalDivision.times(v);
        document.getElementById('S38').innerHTML = `S38 (Bought)<br>Cell Nucleus<br>Bacteria's CRS boost is increased<br>Cost: 1e243 Seeds<br>Effect: x${truncateToDecimalPlaces(w, 3)}`;
    }
    if (fruitUpgradeFactor.F30Bought) {
        const x = new Decimal(1).div(new Decimal(10));
        totalDivision = totalDivision.times(x);
        document.getElementById('F30').innerHTML = `F30 (Bought)<br>Bloom IX<br>x10L, S, F, and CRS<br>(CRS stands for Cell Replication speed)<br>Cost: 3.5e89 Fruits`;
    }
    if (fruitUpgradeFactor.F32Bought) {
        const x = new Decimal(1).div(new Decimal(10));
        totalDivision = totalDivision.times(x);
        document.getElementById('F32').innerHTML = `F32 (Bought)<br>Bloom XI<br>x10CRS<br>Cost: 1e110 Fruits`;
    }
    if (seedUpgradeFactor.S40Bought) {
        const x = new Decimal(1).div(new Decimal(42));
        totalDivision = totalDivision.times(x);
        document.getElementById("S40").innerHTML = `S40 (Bought)<br>Branch XV<br>x42L, S, F, TAS, CRS<br>Cost: 3.33e333 Seeds`;
    }
    if (leafUpgradeFactor.L51Bought) {
        const x = new Decimal(1).div(new Decimal(3));
        const y = x.plus(gameData.mossEffect);
        totalDivision = totalDivision.times(y);
        document.getElementById('L51').innerHTML = `L51 (Bought)<br>Forbidden Powers I<br>x${truncateToDecimalPlaces(y, 3)} CRS<br>Cost: 1e450 Leaves`;
    }
	if (entropyUpgradeFactor.E33Bought) {
		const x = new Decimal(1.5);
		totalDivision = totalDivision.pow(x);
	}
	if (gameData.droughtLevel.greaterThan(new Decimal(1))) {
		const x = Decimal.log10(gameData.droughtBestScore.plus(new Decimal(1)));
        const y = x.pow(new Decimal(0.0413927));
		const z = y.times(new Decimal(0.909091));
        const w = z.clamp(new Decimal(1), new Decimal(Infinity));
		totalDivision = totalDivision.pow(w);
	}
	if (leafUpgradeFactor.L62Bought) {
		const x = gameData.potentialEnergy.plus(new Decimal(1));
		const y = (Decimal.log10(x)).plus(new Decimal(1));
		const z = (Decimal.log10(y)).div(new Decimal(25));
		const w = z.plus(new Decimal(1));
		const v = w.clamp(new Decimal(1), new Decimal(2));
		totalDivision = totalDivision.times(v);
		document.getElementById('L62').innerHTML = `L62 (Bought)<br>Base Power III<br>Potential Energy boosts CRS<br>Cost: 1.79e3008 Leaves<br>Effect: ^${truncateToDecimalPlaces(v, 3)}`;
	}
	totalDivision = totalDivision.times(gameData.gameSpeed);
	totalDivision = totalDivision.pow(gameData.dnaBlueprintNerf);
	
    gameData.intervalDivision = totalDivision;
}

export function calculateCellsMult() {
	let totalMultiplier = new Decimal(1);
	if (entropyUpgradeFactor.extensin.greaterThanOrEqualTo(new Decimal(1))) {
		totalMultiplier = totalMultiplier.times(entropyUpgradeFactor.extensinEffect);
	}
	gameData.cellsMult = totalMultiplier;
}

export function calculateBaseLeafSoftcapFactor() {
    let totalMultiplier = new Decimal(0.75);
    if (entropyUpgradeFactor.E17Bought) {
        totalMultiplier = totalMultiplier.plus(new Decimal(0.05));
        document.getElementById('E17').innerHTML = `E17 (Bought)<br>Split of Power<br>-0.05 from Leaf softcap root<br>Cost: 2500 Entropy`;
    }
    if (entropyUpgradeFactor.B2Amount.greaterThanOrEqualTo(new Decimal(1))) {
        totalMultiplier = totalMultiplier.plus(entropyUpgradeFactor.B2Effect);
    }

    gameData.baseLeafSoftcapFactor = totalMultiplier;
}

export function calculateBaseSeedSoftcapFactor() {
    let totalMultiplier = new Decimal(0.75);
    if (fruitUpgradeFactor.M2.greaterThanOrEqualTo(new Decimal(1))) {
        const x = fruitUpgradeFactor.M2.times(new Decimal(0.01));
        totalMultiplier = totalMultiplier.plus(x);
        document.getElementById('M2').innerHTML = `M2<br>Softcap Dampener II (${truncateToDecimalPlaces(fruitUpgradeFactor.M2, 3)} / 10)<br>-0.01 Seed softcap root<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M2CostCalculation(), 3)} Moss<br>Effect: -${truncateToDecimalPlaces(x, 3)}`;
    }
    gameData.baseSeedSoftcapFactor = totalMultiplier;
}

export function calculateBaseFruitSoftcapFactor() {
    let totalMultiplier = new Decimal(0.75);
    if (entropyUpgradeFactor.E17Bought) {
        totalMultiplier = totalMultiplier.plus(new Decimal(0.025));
        document.getElementById('E32').innerHTML = `E32 (Bought)<br>Free Fruits<br>-0.05 from Fruit softcap root<br>Cost: 3.33e33 Entropy`;
    }
	if (entropyUpgradeFactor.R3Amount.greaterThanOrEqualTo(new Decimal(1))) {
		totalMultiplier = totalMultiplier.plus(entropyUpgradeFactor.R3Effect);
		document.getElementById('R3').innerHTML = `Softcap Dampener (${truncateToDecimalPlaces(entropyUpgradeFactor.R3Amount, 3)})<br>Requires ${truncateToDecimalPlaces(entropyUpgradeFactor.R3Cost, 3)} RNA strands<br>Effect: -${truncateToDecimalPlaces(entropyUpgradeFactor.R3Effect, 3)} from Fruit softcap root`;
	}

    gameData.baseFruitSoftcapFactor = totalMultiplier;
}

export function calculateSeedsSoftcap() {
    let totalMultiplier = new Decimal.fromComponents(1, 1, 100);

    if (moss.mossMilestoneFactor.MM6Achieved) {
        const x = Decimal.log10(gameData.moss.plus(new Decimal(1)));
        const y = Decimal.log10(x.plus(new Decimal(1)));
        const z = (Decimal.log(y, new Decimal(1e6))).plus(new Decimal(1));
        const w = new Decimal(10000).pow((z.times(new Decimal(2))).times(y.pow(new Decimal(2))));
        var v = w.clamp(new Decimal(1), new Decimal(Infinity))
		if (seedUpgradeFactor.S43Bought) {
			v = v.pow(new Decimal(10));
			document.getElementById('S43').innerHTML = `S43 (Bought)<br>Anti-Cap III<br>^6 MM6's effect<br>Cost: 1e1270 Seeds`;
		}
        moss.mossMilestoneFactor.MM6 = v;

        totalMultiplier = totalMultiplier.times(v);
    }

    gameData.seedSoftcapStart = totalMultiplier;
    if (gameData.seedsIsSoftcapped) {
        document.getElementById('seedSoftcapInfo').innerHTML = `The Seed softcap starts at ${truncateToDecimalPlaces(gameData.seedSoftcapStart, 3)} (^${truncateToDecimalPlaces(gameData.baseSeedSoftcapFactor, 3)})`;
    }
    if (gameData.seedsIsSoftcapped2) {
        document.getElementById('seedSoftcap2Info').innerHTML = `The Seed softcap^2 starts at 1e2000`;
    }
}

export function calculateFruitsSoftcap() {
    if (gameData.fruitsIsSoftcapped) {
        document.getElementById('fruitSoftcapInfo').innerHTML = `The Fruit softcap starts at 1.79e308 (^${truncateToDecimalPlaces(gameData.baseFruitSoftcapFactor, 3)})`;
    }
}

export function calculateBacteriaMult() {
    let totalMultiplier = new Decimal(1);
    if (moss.mossMilestoneFactor.MM7Achieved) {
        const x = new Decimal(0.25).times(gameData.entropy.pow(new Decimal(0.150515)));
        totalMultiplier = totalMultiplier.times(x.clamp(new Decimal(1), new Decimal(Infinity)));
    }
	if (entropyUpgradeFactor.asparagine.greaterThanOrEqualTo(new Decimal(1))) {
		const x = entropyUpgradeFactor.asparagine;
		const y = x.times(gameData.gameSpeed);
		const z = y.div(new Decimal(100000));
		entropyUpgradeFactor.asparagineEffect = z;
		totalMultiplier = totalMultiplier.times(entropyUpgradeFactor.asparagineEffect);
		document.getElementById('asparagineCounter').innerHTML = `${truncateToDecimalPlaces(entropyUpgradeFactor.asparagine, 3)} Asparagine Proteins<br> Game speed boosts Bacteria base mult (x${truncateToDecimalPlaces(entropyUpgradeFactor.asparagineEffect, 3)})`;
	}
    if (entropyUpgradeFactor.B3Amount.greaterThanOrEqualTo(new Decimal(1))) {
        const x = entropyUpgradeFactor.B3Effect;
        totalMultiplier = totalMultiplier.times(x);
    }
	totalMultiplier = totalMultiplier.times(gameData.gameSpeed);
    gameData.bacteriaMult = totalMultiplier;
}

export function calculateBacteriaPower() {
	let totalMultiplier = new Decimal(1);
    if (leafUpgradeFactor.L57Bought) {
        const x = new Decimal(1.05);
        totalMultiplier = totalMultiplier.times(x);
		document.getElementById('L57').innerHTML = `L57 (Bought)<br>Bacteria Pilus<br>^1.05 Bacteria<br>Cost: 1e1379 Leaves`;
    }
    if (entropyUpgradeFactor.E22Bought) {
        const x = new Decimal(1.05);
        totalMultiplier = totalMultiplier.times(x);
    }
    if (entropyUpgradeFactor.E30Bought) {
        const x = new Decimal(1.25);
        totalMultiplier = totalMultiplier.times(x);
    }
	if (leafUpgradeFactor.L60Bought) {
		const x = gameData.potentialEnergy.plus(new Decimal(1));
		const y = (Decimal.log10(x)).plus(new Decimal(1));
		const z = (Decimal.log10(y)).div(new Decimal(100));
		const w = z.plus(new Decimal(1));
		const v = w.clamp(new Decimal(1), new Decimal(2));
		totalMultiplier = totalMultiplier.times(v);
		document.getElementById('L60').innerHTML = `L60 (Bought)<br>Base Power II<br>Potential Energy boosts Bacteria<br>Cost: 1e2000 Leaves<br>Effect: ^${truncateToDecimalPlaces(v, 3)}`;
	}
	if (seedUpgradeFactor.S49Bought) {
		const x = gameData.potentialEnergy.plus(new Decimal(1));
		const y = (Decimal.log10(x)).plus(new Decimal(1));
		const z = (Decimal.log10(y)).div(new Decimal(100));
		const w = z.plus(new Decimal(1));
		const v = w.clamp(new Decimal(1), new Decimal(2));
		totalMultiplier = totalMultiplier.times(v);
		document.getElementById('S49').innerHTML = `S49 (Bought)<br>Base Power V<br>Potential Energy boosts Bacteria again<br>Cost: 1.08e2466 Seeds<br>Effect: ^${truncateToDecimalPlaces(v, 3)}`;
	}
    if (moss.mossMilestoneFactor.MM10Achieved) {
        const x = gameData.bacteriaTypes;
        const y = x.minus(new Decimal(29));
		const z = y.times(new Decimal(0.01));
        const w = z.plus(new Decimal(1));
        moss.mossMilestoneFactor.MM10 = w;
        
        totalMultiplier = totalMultiplier.times(w);
		totalMultiplier = totalMultiplier.times(gameData.dnaBlueprintNerf);
    }
	gameData.bacteriaPow = totalMultiplier;
}

export function calculateBacteriaCapMult() {
    let totalMultiplier = new Decimal(1);
    if (moss.mossMilestoneFactor.MM7Achieved) {
        const x = new Decimal(0.375).times(gameData.entropy.pow(new Decimal(0.150515)));
        totalMultiplier = totalMultiplier.times(x.clamp(new Decimal(1), new Decimal(Infinity)));
    }
	if (entropyUpgradeFactor.E29Bought) {
		const x = gameData.entropy.plus(new Decimal(1));
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('E29').innerHTML = `E29 (Bought)<br>Bacteria Ribosomes<br>Entropy boosts Bacteria cap<br>Cost: 7.5e23 Entropy<br>Effect: x${truncateToDecimalPlaces(x, 3)}`;
	}
    gameData.bacteriaCapMult = totalMultiplier;
}

export function calculateM1Effect() {
	let totalMultiplier = new Decimal(1);
	if (gameData.wildfireLevel.greaterThanOrEqualTo(new Decimal(1))) {
        const x = new Decimal(1.00814).pow(gameData.wildfireBestScore);
        const y = x.clamp(new Decimal(1), new Decimal(Infinity));
		totalMultiplier = totalMultiplier.times(y);
	}
	fruitUpgradeFactor.M1EffectMult = totalMultiplier;
}
export function calculateM3Effect() {
	let totalMultiplier = new Decimal(1);
	if (gameData.wildfireLevel.greaterThanOrEqualTo(new Decimal(1))) {
        const x = new Decimal(1.00814).pow(gameData.wildfireBestScore);
        const y = x.clamp(new Decimal(1), new Decimal(Infinity));
		totalMultiplier = totalMultiplier.times(y);
	}
	fruitUpgradeFactor.M3EffectMult = totalMultiplier;
}


export function calculateLR1Cap() {
    let totalMultiplier = new Decimal(10);
    if (fruitUpgradeFactor.M5.greaterThanOrEqualTo(new Decimal(1))) {
        const x = new Decimal(2);
        const y = x.times(fruitUpgradeFactor.M5);
        totalMultiplier = totalMultiplier.plus(y);
        document.getElementById('M5').innerHTML = `M5<br>Vermeil (${truncateToDecimalPlaces(fruitUpgradeFactor.M5, 3)})<br>+2 to LR1 cap<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M5CostCalculation(), 3)} Moss<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
    }
    if (entropyUpgradeFactor.E23Bought) {
        const x = new Decimal(15);
        totalMultiplier = totalMultiplier.plus(x);
    }
    if (entropyUpgradeFactor.E27Bought) {
        const x = new Decimal(10);
        totalMultiplier = totalMultiplier.plus(x);
    }
    if (entropyUpgradeFactor.glutamate.greaterThanOrEqualTo(new Decimal(1))) {
		const x = entropyUpgradeFactor.glutamateEffect;
		totalMultiplier = totalMultiplier.plus(x);
    }
    temple.repeatableUpgradeFactor.LR1Cap = totalMultiplier;
}

export function calculateLR1Effect() {
    let totalMultiplier = new Decimal(2);
    if (fruitUpgradeFactor.M6.greaterThanOrEqualTo(new Decimal(1))) {
        const x = new Decimal(0.5);
        const y = x.times(fruitUpgradeFactor.M6);
        totalMultiplier = totalMultiplier.plus(y);
        document.getElementById('M6').innerHTML = `M6<br>Gild (${truncateToDecimalPlaces(fruitUpgradeFactor.M6, 3)})<br>+0.5 to LR1 effect<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M6CostCalculation(), 3)} Moss<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
    }
    if (entropyUpgradeFactor.E25Bought) {
        const x = gameData.entropy;
        const y = x.div(new Decimal(1e12));
        const z = y.plus(new Decimal(1));
        const w = Decimal.log10(z);
        totalMultiplier = totalMultiplier.plus(w);
        document.getElementById('E25').innerHTML = `E25 (Bought)<br>Statue Power II<br>Entropy boosts LR1's effect<br>Cost: 1e18 Entropy<br>Effect: +${truncateToDecimalPlaces(w, 3)}`;
    }
    temple.repeatableUpgradeFactor.LR1Effect = totalMultiplier;
}

export function calculateLR2Cap() {
    let totalMultiplier = new Decimal(10);
	
	if (fruitUpgradeFactor.M5.greaterThanOrEqualTo(new Decimal(1))) {
		const x = new Decimal(0.2);
		const y = x.times(fruitUpgradeFactor.M5);
		totalMultiplier = totalMultiplier.plus(y);
		document.getElementById('S51').innerHTML = `S51 (Bought)<br>Statue Power VII<br>Every five M5 Levels, +1 to LR2's cap<br>Cost: 1e5000 Seeds<br>Effect: +${truncateToDecimalPlaces(y.trunc(), 3)}`;
	}
    temple.repeatableUpgradeFactor.LR2Cap = totalMultiplier.trunc();
}

export function calculateLR2Effect() {
    let totalMultiplier = new Decimal(0.05);
    temple.repeatableUpgradeFactor.LR2Effect = totalMultiplier;
}

export function calculateSR1Cap() {
    let totalMultiplier = new Decimal(10);
    if (seedUpgradeFactor.S44Bought) {
        const x = new Decimal(20);
        totalMultiplier = totalMultiplier.plus(x);
        document.getElementById('S44').innerHTML = `S44 (Bought)<br>Statue Power IV<br>+20 levels to SR1's cap<br>Cost: 1e1322 Seeds`;
    }
	if (seedUpgradeFactor.S48Bought) {
		if (fruitUpgradeFactor.M5.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(1);
			const y = x.times(fruitUpgradeFactor.M5);
			totalMultiplier = totalMultiplier.plus(y);
		document.getElementById('S48').innerHTML = `S48 (Bought)<br>Statue Power V<br>Every M5 Level, +1 to SR1's cap<br>Cost: 2.22e2222 Seeds<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
		}
		else {
			document.getElementById('S48').innerHTML = `S48 (Bought)<br>Statue Power V<br>Every M5 Level, +1 to SR1's cap<br>Cost: 2.22e2222 Seeds<br>Effect: +0`;	
		}
	}
    if (entropyUpgradeFactor.glutamate.greaterThanOrEqualTo(new Decimal(1))) {
		const x = entropyUpgradeFactor.glutamateEffect;
		totalMultiplier = totalMultiplier.plus(x);
    }
	if (entropyUpgradeFactor.glutamateFree.greaterThan(new Decimal(0))) {
		const y = new Decimal(10).times(entropyUpgradeFactor.glutamateFree);
		totalMultiplier = totalMultiplier.plus(y);
		document.getElementById("glutamateCounter").innerHTML = `${truncateToDecimalPlaces(entropyUpgradeFactor.glutamate, 3)} (+${truncateToDecimalPlaces(entropyUpgradeFactor.glutamateFree, 3)}) Glutamate Proteins<br>+${truncateToDecimalPlaces(y, 3)} to LR1, SR1, and FR1 caps`
	}
    temple.repeatableUpgradeFactor.SR1Cap = totalMultiplier;
}

export function calculateSR1Effect() {
    let totalMultiplier = new Decimal(4);
	if (seedUpgradeFactor.S47Bought) {
		if (fruitUpgradeFactor.M6.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(0.15);
			const y = x.times(fruitUpgradeFactor.M6);
			totalMultiplier = totalMultiplier.plus(y);
			document.getElementById('S47').innerHTML = `S47 (Bought)<br>Statue Power V<br>Every M6 Level, +0.15 to SR1's effect<br>Cost: 1e2000 Seeds<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
		}
		else {
			document.getElementById('S47').innerHTML = `S47 (Bought)<br>Statue Power V<br>Every M6 Level, +0.15 to SR1's effect<br>Cost: 1e2000 Seeds<br>Effect: +0`;
		}
	}
    temple.repeatableUpgradeFactor.SR1Effect = totalMultiplier;
}

export function calculateFR1Cap() {
    let totalMultiplier = new Decimal(10);
    if (entropyUpgradeFactor.glutamate.greaterThanOrEqualTo(new Decimal(1))) {
		const x = entropyUpgradeFactor.glutamateEffect;
		totalMultiplier = totalMultiplier.plus(x);
    }
	if (entropyUpgradeFactor.glutamateFree.greaterThan(new Decimal(0))) {
		const x = new Decimal(10).times(entropyUpgradeFactor.glutamateFree);
		const y = entropyUpgradeFactor.glutamateEffect.plus(x);
		totalMultiplier = totalMultiplier.plus(x);
		document.getElementById("glutamateCounter").innerHTML = `${truncateToDecimalPlaces(entropyUpgradeFactor.glutamate, 3)} (+${truncateToDecimalPlaces(entropyUpgradeFactor.glutamateFree, 3)}) Glutamate Proteins<br>+${truncateToDecimalPlaces(y, 3)} to LR1, SR1, and FR1 caps`
	}
    temple.repeatableUpgradeFactor.FR1Cap = totalMultiplier;
}

export function calculateFR1Effect() {
    let totalMultiplier = new Decimal(1);
	if (rootUpgradeFactor.RO3Bought) {
		const x = new Decimal(2.5);
		totalMultiplier = totalMultiplier.times(x);
	}
    temple.repeatableUpgradeFactor.FR1Effect = totalMultiplier;
}

export function calculateSupercaps() {
	let totalMultiplier = new Decimal(0);
	let totalLeafMultiplier = new Decimal(0);
	if (entropyUpgradeFactor.arganine.greaterThanOrEqualTo(new Decimal(1))) {
		totalMultiplier = totalMultiplier.plus(entropyUpgradeFactor.arganineEffect);
	} 
	if (seedUpgradeFactor.S50Bought) {
		totalMultiplier = totalMultiplier.plus(new Decimal(0.1));
		document.getElementById('S50').innerHTML = `S50 (Bought)<br>Fortification<br>+0.1 to all supercap roots<br>Cost: 1.79e3008 Seeds`;
	}
    if (temple.repeatableUpgradeFactor.LR2.greaterThanOrEqualTo(new Decimal(1))) {
        const x = temple.repeatableUpgradeFactor.LR2Effect;
        const y = x.times(temple.repeatableUpgradeFactor.LR2);
        totalLeafMultiplier = totalLeafMultiplier.plus(y);
        document.getElementById("LR2").innerHTML = `LR2 (${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR2, 3)} / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR2Cap, 3)})<br>+${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR2Effect, 3)} to Leaf supercap root<br>Cost: ${truncateToDecimalPlaces(temple.LR2CostCalculation(), 3)} Leaves<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
    }
	else {
        document.getElementById("LR2").innerHTML = `LR2 (0 / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR2Cap, 3)})<br>+${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR2Effect, 3)} to Leaf supercap root<br>Cost: ${truncateToDecimalPlaces(temple.LR2CostCalculation(), 3)} Leaves<br>Effect: +0`;
	}
	if (rootUpgradeFactor.RO8Bought) {
        const x = temple.repeatableUpgradeFactor.LR2Effect;
        const y = x.times(temple.repeatableUpgradeFactor.LR2);
		const z = y.div(new Decimal(3));
		totalMultiplier = totalMultiplier.plus(z);
		document.getElementById('RO8').innerHTML = `RO8 (Bought)<br>Price of Power<br>LR2 increases all supercap roots<br>with reduced rate<br>Cost: 0.5 Roots<br>Effect: +${truncateToDecimalPlaces(z, 3)}`;
	}
	
	if (gameData.leavesIsSupercapped) {
		const x = Decimal.log10(gameData.leaves);
		const y = new Decimal(-0.0002).times(x);
		const z = y.plus(new Decimal(1.4932));
		const w = z.plus(totalMultiplier);
		const v = w.plus(totalLeafMultiplier);
		const u = v.clamp(new Decimal(0), new Decimal(1));
		gameData.baseLeafSupercapFactor = u;
		document.getElementById('leafSupercapInfo').innerHTML = `The Leaf supercap starts at 1.08e2466 (^${truncateToDecimalPlaces(u, 3)})`;
	}
	if (gameData.seedsIsSupercapped) {
		const x = Decimal.log10(gameData.seeds.plus(new Decimal(1)));
		const y = new Decimal(-0.0002).times(x);
		const z = y.plus(new Decimal(1.4932));
		const w = z.plus(totalMultiplier.times(new Decimal(0.5)));
		const v = w.clamp(new Decimal(0), new Decimal(1));
		gameData.baseSeedSupercapFactor = v;
		document.getElementById('seedSupercapInfo').innerHTML = `The Seed supercap starts at 1.08e2466 (^${truncateToDecimalPlaces(v, 3)})`;
	}
	if (gameData.fruitsIsSupercapped) {
		const x = Decimal.log10(gameData.fruits.plus(new Decimal(1)));
		const y = new Decimal(-0.0002).times(x);
		const z = y.plus(new Decimal(1.4932));
		const w = z.plus(totalMultiplier.times(new Decimal(0.25)));
		const v = w.clamp(new Decimal(0), new Decimal(1));
		gameData.baseFruitSupercapFactor = v;
		document.getElementById('fruitSupercapInfo').innerHTML = `The Fruit supercap starts at 1.08e2466 (^${truncateToDecimalPlaces(v, 3)})`;
	}
}

export function calculateFreeRuBisCoProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	entropyUpgradeFactor.rubiscoFree = totalAdd;
}
export function calculateFreeExtensinProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (rootUpgradeFactor.RM3) {
		const x = gameData.rna;
		const y = x.pow(new Decimal(0.5));
		totalAdd = totalAdd.plus(y);
		document.getElementById("RM3Effect").innerHTML = `Gain free Extensin and AGP Proteins based on your strands of RNA<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
	}
	entropyUpgradeFactor.extensinFree = totalAdd;
}
export function calculateFreeArganineProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	entropyUpgradeFactor.arganineFree = totalAdd;
}
export function calculateFreeGlutamineProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	entropyUpgradeFactor.glutamineFree = totalAdd;
}
export function calculateFreeGlutamateProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (rootUpgradeFactor.RM2) {
		const x = gameData.dnaBlueprintsTotal;
		const y = x.div(new Decimal(2));
		totalAdd = totalAdd.plus(y);
		document.getElementById("RM2Effect").innerHTML = `Gain free Glutamate Proteins based on your DNA Blueprints<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
	}
	entropyUpgradeFactor.glutamateFree = totalAdd;
}
export function calculateFreeAsparagineProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	entropyUpgradeFactor.asparagineFree = totalAdd;
}
export function calculateFreeAGPProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (rootUpgradeFactor.RM3) {
		const x = gameData.rna;
		const y = x.pow(new Decimal(0.5));
		totalAdd = totalAdd.plus(y);
		document.getElementById("RM3Effect").innerHTML = `Gain free Extensin and AGP Proteins based on your strands of RNA<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
	}
	entropyUpgradeFactor.agpFree = totalAdd;
}
export function calculateFreeTRBProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	entropyUpgradeFactor.trbFree = totalAdd;
}
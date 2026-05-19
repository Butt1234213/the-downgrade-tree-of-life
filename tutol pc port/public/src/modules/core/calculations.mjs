import { truncateToDecimalPlaces, SC, gameData, leafUpgradeFactor, seedUpgradeFactor, fruitUpgradeFactor, entropyUpgradeFactor, rootUpgradeFactor } from "./bunchobullshit.mjs";
import { circuits } from "../automation.mjs";
import * as temple from "../temple.mjs";
import { achievements, massAchievementChecker } from "../achievements.mjs";
import * as composter from '../composter.mjs';
import * as moss from '../moss.mjs';
import * as fallenLeaves from '../fallenleaves.mjs';
import { MicroorganismOnReinforcement, activeMicroorganismCounter } from "../petridish.mjs";
import { microorganismTimer } from "./gameloopbutmodule.mjs";

//if this works correctly, this should create an object that contains all of the current microorganism effects
export var activeMicroorganisms = [];
export var activeMicroorganismEffects = {};

export function loadMicroorganisms() {
	activeMicroorganisms = [];
	for (let i = 0; i < rootUpgradeFactor.activeMicroorganisms.length; i++) {
		activeMicroorganisms.push(rootUpgradeFactor.activeMicroorganisms[i][1]);
	}
	
	activeMicroorganismEffects = {};
	for (let i = 0; i < activeMicroorganisms.length; i++) {
		let effects = activeMicroorganisms[i].effects();
		for (let [key, value] of Object.entries(effects)) {
			if (Object.hasOwn(activeMicroorganismEffects, key)) {
				//for clarity, if there are two or more microorganisms that have the same effect, then this re-applies the effect onto the effect listed in the activeMicroorganismEffects object
				activeMicroorganismEffects[key] = activeMicroorganisms[i].effectOperators(activeMicroorganismEffects[key], value, key);
			}
			else {
				activeMicroorganismEffects[key] = value;
			}
		}
	}
}

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
		const mossNerf = Decimal.log10(gameData.mossEffect.plus(new Decimal(1)));
        const y = x.plus(mossNerf);
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
        const w = Decimal.log(z.plus(new Decimal(1)), new Decimal(5));
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
		let y = gameData.reinforcements.times(x);
		if (Object.hasOwn(activeMicroorganismEffects, 'amoebareinforcementMultPow')) {
			let z = new Decimal(activeMicroorganismEffects.amoebareinforcementMultPow.mag);
			if (z.greaterThanOrEqualTo(new Decimal(500))) {
				z = SC(z, new Decimal(500), new Decimal(0.75));
				document.getElementById('amoebareinforcementMultPow').innerHTML = `+^<span class="softcap">${truncateToDecimalPlaces(z, 3)}</span> Reinforcement multipliers<br>`;
			}
			else {
				document.getElementById('amoebareinforcementMultPow').innerHTML = `+^${truncateToDecimalPlaces(z, 3)} Reinforcement multipliers<br>`;
			}
			y = y.pow(z);
		}
		rootUpgradeFactor.leafReinforcementMult = y;
		totalMultiplier = totalMultiplier.times(rootUpgradeFactor.leafReinforcementMult);
	}
	let totalRuBisCo = entropyUpgradeFactor.rubisco.plus(entropyUpgradeFactor.rubiscoFree);
	if (totalRuBisCo.greaterThanOrEqualTo(new Decimal(1))) {
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
		let base = new Decimal(1.15);
		if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossMilestoneEffect')) {
			const x = new Decimal(activeMicroorganismEffects.mossSporemossMilestoneEffect.mag);
			base = base.times(x);
			document.getElementById('mossSporemossMilestoneEffect').innerHTML = `x${truncateToDecimalPlaces(x, 3)} Moss Milestone effect<br>`;
		}
		moss.mossMilestoneFactor.MM1 = base;
        totalMultiplier = totalMultiplier.pow(base);
    }
    if (moss.mossMilestoneFactor.MM2Achieved) {
		let base = new Decimal(1.1);
		if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossMilestoneEffect')) {
			const x = new Decimal(activeMicroorganismEffects.mossSporemossMilestoneEffect.mag);
			base = base.times(x);
		}
		moss.mossMilestoneFactor.MM2 = base;
        totalMultiplier = totalMultiplier.pow(base);
    }
    if (entropyUpgradeFactor.E2Bought) {
        totalMultiplier = totalMultiplier.pow(new Decimal(1.5));
        document.getElementById("E2").innerHTML = `E2 (Bought)<br>Split of Decisions<br>Leaves Base Multiplier ^ 1.5<br>Cost: 1 Entropy`;
    }
	if (gameData.blizzardLevel.greaterThan(new Decimal(1))) {
		const x = Decimal.log10(gameData.blizzardBestScore.plus(new Decimal(1)));
		const y = (x.times(new Decimal(0.270346))).plus(new Decimal(1));
        let z = y.clamp(new Decimal(1), new Decimal(Infinity));
		
		if (Object.hasOwn(activeMicroorganismEffects, 'reinforcedblizzardReward')) {
			const w = new Decimal(activeMicroorganismEffects.reinforcedblizzardReward.mag);
			z = z.times(w);
			document.getElementById('reinforcedblizzardReward').innerHTML = `x${truncateToDecimalPlaces(w, 3)} Blizzard rewards<br>`;
		}
		gameData.blizzardReward = z;
		document.getElementById('blizzardRewardCounter').innerHTML = `Unlock Roots and ^${truncateToDecimalPlaces(z, 3)} Storm rewards`;
	}
    if (gameData.stormLevel.greaterThan(new Decimal(1))) {
		const x = new Decimal(0.000542868).times(Decimal.ln(gameData.stormBestScore.plus(new Decimal(1))));
		const y = x.plus(new Decimal(1));
		let z = y.pow(gameData.blizzardReward);
		if (Object.hasOwn(activeMicroorganismEffects, 'livelystormReward')) {
			const w = new Decimal(activeMicroorganismEffects.livelystormReward.mag);
			z = z.pow(w);
			document.getElementById('livelystormReward').innerHTML = `^${truncateToDecimalPlaces(w, 3)} Storm rewards<br>`;
		}
        totalMultiplier = totalMultiplier.pow(z);
		if (gameData.stormLevel.greaterThan(new Decimal(2))) {
			achievements.ach85 = true;
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
	if (Object.hasOwn(activeMicroorganismEffects, 'livelyleafBasePow')) {
		const x = new Decimal(activeMicroorganismEffects.livelyleafBasePow.mag);
		totalMultiplier = totalMultiplier.pow(x);
		document.getElementById('livelyleafBasePow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Leaf base mult<br>`;
	}

    if (gameData.leavesIsSoftcapped) {
        totalMultiplier = SC(totalMultiplier, gameData.leafSoftcapStart, gameData.baseLeafSoftcapFactor);
        document.getElementById('leafSoftcap').innerHTML = '(Softcapped)';
        achievements.ach22 = true;
    }
    else {
        document.getElementById('leafSoftcap').innerHTML = '';
    }
    if (gameData.leavesIsSoftcapped2) {
        totalMultiplier = SC(totalMultiplier, gameData.leafSoftcap2Start, gameData.baseLeafSoftcapFactor);
        achievements.ach62 = true;
    }
    if (gameData.leavesIsSoftcapped3) {
        totalMultiplier = SC(totalMultiplier, gameData.leafSoftcap3Start, gameData.baseLeafSoftcapFactor);
    }
    if (gameData.leavesIsSoftcapped4) {
        totalMultiplier = SC(totalMultiplier, gameData.leafSoftcap4Start, gameData.baseLeafSoftcapFactor.pow(new Decimal(2)));
    }
    if (gameData.leavesIsSoftcapped5) {
        totalMultiplier = SC(totalMultiplier, gameData.leafSoftcap5Start, gameData.baseLeafSoftcapFactor.pow(new Decimal(2)));
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
	if (gameData.isInChallengeFall) {
		if (rootUpgradeFactor.RO29Bought) {
			totalMultiplier = totalMultiplier.pow(gameData.fallBaseDebuffFactor.times(new Decimal(10)));
		}
		else {
			totalMultiplier = totalMultiplier.pow(gameData.fallBaseDebuffFactor);
		}
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallResources')) {
		let x = new Decimal(activeMicroorganismEffects.amoebaallResources.mag);
		if (x.greaterThanOrEqualTo(new Decimal(15))) {
			x = x.pow(new Decimal(0.4)).clamp(x, new Decimal(Infinity));
			document.getElementById('amoebaallResources').innerHTML = `x<span class="softcap">${truncateToDecimalPlaces(x, 3)}</span> All resources<br>`;
		}
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('amoebaallResources').innerHTML = `x${truncateToDecimalPlaces(x, 3)} All resources<br>`;
	}
	totalMultiplier = totalMultiplier.times(gameData.gameSpeed);

	gameData.leavesPerTick.max(new Decimal(0)) ? gameData.leavesPerTick = gameData.leavesStartingPerTick.times(totalMultiplier) : window.location.reload();
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
		let y = gameData.reinforcements.times(x);
		if (Object.hasOwn(activeMicroorganismEffects, 'amoebareinforcementMultPow')) {
			const z = new Decimal(activeMicroorganismEffects.amoebareinforcementMultPow.mag);
			y = y.pow(z);
		}
		rootUpgradeFactor.seedReinforcementMult = y;
		totalMultiplier = totalMultiplier.times(rootUpgradeFactor.seedReinforcementMult);
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
		let z = y.pow(gameData.blizzardReward);
		if (Object.hasOwn(activeMicroorganismEffects, 'livelystormReward')) {
			const w = new Decimal(activeMicroorganismEffects.livelystormReward.mag);
			z = z.pow(w);
		}
		const v = z.pow(new Decimal(0.35));
        totalMultiplier = totalMultiplier.pow(v);
        document.getElementById("RO2").innerHTML = `RO2 (Bought)<br>Price of Power<br>Storm reward boosts Seeds base mult<br>with reduced rate<br>Cost: 0.5 Roots<br>Effect: ^${truncateToDecimalPlaces(v, 3)}`;
    }
	if (Object.hasOwn(activeMicroorganismEffects, 'groundedseedBasePow')) {
		const x = new Decimal(activeMicroorganismEffects.groundedseedBasePow.mag);
		totalMultiplier = totalMultiplier.pow(x);
		document.getElementById('groundedseedBasePow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Seed base mult<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallResources')) {
		let x = new Decimal(activeMicroorganismEffects.amoebaallResources.mag);
		if (x.greaterThanOrEqualTo(new Decimal(15))) {
			x = x.pow(new Decimal(0.4)).clamp(x, new Decimal(Infinity));
		}
		totalMultiplier = totalMultiplier.times(x);
	}
	totalMultiplier = totalMultiplier.times(gameData.gameSpeed);

	gameData.seedsMult.max(new Decimal(0)) ? gameData.seedsMult = totalMultiplier : window.location.reload();
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
		let y = gameData.reinforcements.times(x);
		if (Object.hasOwn(activeMicroorganismEffects, 'amoebareinforcementMultPow')) {
			const z = new Decimal(activeMicroorganismEffects.amoebareinforcementMultPow.mag);
			y = y.pow(z);
		}
		rootUpgradeFactor.fruitReinforcementMult = y;
		totalMultiplier = totalMultiplier.times(rootUpgradeFactor.fruitReinforcementMult);
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
	if (Object.hasOwn(activeMicroorganismEffects, 'bountifulfruitBasePow')) {
		const x = new Decimal(activeMicroorganismEffects.bountifulfruitBasePow.mag);
		totalMultiplier = totalMultiplier.pow(x);
		document.getElementById('bountifulfruitBasePow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Fruit base mult<br>`;
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
	else {
        document.getElementById('fruitSoftcap').innerHTML = '';
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallResources')) {
		let x = new Decimal(activeMicroorganismEffects.amoebaallResources.mag);
		if (x.greaterThanOrEqualTo(new Decimal(15))) {
			x = x.pow(new Decimal(0.4)).clamp(x, new Decimal(Infinity));
		}
		totalMultiplier = totalMultiplier.times(x);
	}
	totalMultiplier = totalMultiplier.times(gameData.gameSpeed);

	gameData.fruitsMult.max(new Decimal(0)) ? gameData.fruitsMult = totalMultiplier : window.location.reload();
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
        let z = y.pow(fruitUpgradeFactor.M3);
		if (seedUpgradeFactor.S55Bought) {
			z = z.pow(new Decimal(1.05));
		}
		let softcap = new Decimal.fromComponents(1, 1, 100000);
		if (seedUpgradeFactor.S63Bought) {
			const v = Decimal.log10(Decimal.log10(gameData.seeds.plus(new Decimal(1))).plus(new Decimal(1)));
			softcap = softcap.pow(v);
			document.getElementById('S63').innerHTML = `S63 (Bought)<br>Mossy Seeds<br>Seeds delay M3's softcap<br>Cost: e5e7 Seeds<br>Effect: ^${truncateToDecimalPlaces(v, 3)}`;
		}
		if (z.greaterThanOrEqualTo(softcap)) {
			z = SC(z, softcap, new Decimal(0.5));
			document.getElementById('M3').innerHTML = `M3<br>Time is Slipping By (${truncateToDecimalPlaces(fruitUpgradeFactor.M3, 3)})<br>Little boost of x${truncateToDecimalPlaces((fruitUpgradeFactor.M3EffectMult.times(x)), 3)} TAS<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M3CostCalculation(), 3)} Moss<br>Effect: x${truncateToDecimalPlaces(z, 3)}<br><span class="softcap">(Softcapped)</span>`;
		}
		else {
			document.getElementById('M3').innerHTML = `M3<br>Time is Slipping By (${truncateToDecimalPlaces(fruitUpgradeFactor.M3, 3)})<br>Little boost of x${truncateToDecimalPlaces((fruitUpgradeFactor.M3EffectMult.times(x)), 3)} TAS<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M3CostCalculation(), 3)} Moss<br>Effect: x${truncateToDecimalPlaces(z, 3)}`;
		}
        totalMultiplier = totalMultiplier.times(z);
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
    if (temple.repeatableUpgradeFactor.SR3.greaterThanOrEqualTo(new Decimal(1))) {
        const x = temple.repeatableUpgradeFactor.SR3Effect;
        const y = x.times(temple.repeatableUpgradeFactor.SR3);
        totalMultiplier = totalMultiplier.pow(y.plus(new Decimal(1)));
        document.getElementById("SR3").innerHTML = `SR3 (${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR3, 3)} / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR3Cap, 3)})<br>+^${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR3Effect, 3)} TAS<br>Cost: ${truncateToDecimalPlaces(temple.SR3CostCalculation(), 3)} Seeds<br>Effect: ^${truncateToDecimalPlaces(y.plus(new Decimal(1)), 3)}`;
    }
    else {
        document.getElementById("SR3").innerHTML = `SR3 (0 / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR3Cap, 3)})<br>+^${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR3Effect, 3)} TAS<br>Cost: 1e75000 Seeds<br>Effect: ^1`;
    }
	if (Object.hasOwn(activeMicroorganismEffects, 'chronalTASBasePow')) {
		const x = new Decimal(activeMicroorganismEffects.chronalTASBasePow.mag);
		totalMultiplier = totalMultiplier.pow(x);
		document.getElementById('chronalTASBasePow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Tree Aging speed<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'groundedTASBasePow')) {
		const x = new Decimal(activeMicroorganismEffects.groundedTASBasePow.mag);
		totalMultiplier = totalMultiplier.pow(x);
		document.getElementById('groundedTASBasePow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Tree Aging speed<br>`;
	}
	
	if (gameData.isInChallengeDrought) {
        totalMultiplier = totalMultiplier.pow(gameData.droughtBaseFactor);
	}
	
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallResources')) {
		let x = new Decimal(activeMicroorganismEffects.amoebaallResources.mag);
		if (x.greaterThanOrEqualTo(new Decimal(15))) {
			x = x.pow(new Decimal(0.4)).clamp(x, new Decimal(Infinity));
		}
		totalMultiplier = totalMultiplier.times(x);
	}
	totalMultiplier = totalMultiplier.times(gameData.gameSpeed);

	gameData.treeAgePerTick.max(new Decimal(0)) ? gameData.treeAgePerTick = totalMultiplier : window.location.reload();
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
		
		let totalTRB = entropyUpgradeFactor.trb.plus(entropyUpgradeFactor.trbFree);
		if (totalTRB.greaterThanOrEqualTo(new Decimal(1))) {
			y = y.times(entropyUpgradeFactor.trbEffect);
		}
		const z = gameData.rnaTimeFactor.times(y);
		const w = z.clamp(new Decimal(1), new Decimal(Infinity));
		
		totalMultiplier = totalMultiplier.times(w);
		
		document.getElementById('rnaEffectCounter').innerHTML = `+0.1 Game speed mult every second each strand (+${truncateToDecimalPlaces(y, 3)}/s)`;
	}
	if (entropyUpgradeFactor.R1Amount.greaterThanOrEqualTo(new Decimal(1))) {
		var x = entropyUpgradeFactor.R1Effect;
		let totalTRB = entropyUpgradeFactor.trb.plus(entropyUpgradeFactor.trbFree);
		if (totalTRB.greaterThanOrEqualTo(new Decimal(1))) {
			x = x.times(entropyUpgradeFactor.trbEffect);
		}
		if (leafUpgradeFactor.L66Bought) {
			x = x.pow(new Decimal(1.075));
		}
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('R1').innerHTML = `More Game speed (${truncateToDecimalPlaces(entropyUpgradeFactor.R1Amount, 3)})<br>Requires ${truncateToDecimalPlaces(entropyUpgradeFactor.R1Cost, 3)} RNA strands<br>Effect: x${truncateToDecimalPlaces(x, 3)} Game speed`;
	}
    if (temple.repeatableUpgradeFactor.SR2.greaterThanOrEqualTo(new Decimal(1))) {
        const x = temple.repeatableUpgradeFactor.SR2Effect.minus();
        const y = x.pow(temple.repeatableUpgradeFactor.SR2);
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("SR2").innerHTML = `SR2 (${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR2, 3)} / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR2Cap, 3)})<br>x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR2Effect, 3)} Game speed<br>Cost: ${truncateToDecimalPlaces(temple.SR2CostCalculation(), 3)} Seeds<br>Effect: x${truncateToDecimalPlaces(y, 3)}`;
    }
	else {
        document.getElementById("SR2").innerHTML = `SR2 (0 / 0)<br>x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.SR2Effect, 3)} Game speed<br>Cost: ${truncateToDecimalPlaces(temple.SR2CostCalculation(), 3)} Seeds<br>Effect: x1`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebagameSpeedPow')) {
		const x = new Decimal(activeMicroorganismEffects.amoebagameSpeedPow.mag);
		totalMultiplier = totalMultiplier.pow(x);
		document.getElementById('amoebagameSpeedPow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Game speed<br>`;
	}
	if (gameData.isInChallengeBlizzard) {
		totalMultiplier = totalMultiplier.div(gameData.blizzardBaseGameSpeedFactor);
	}
	if (gameData.isInChallengeFall) {
        totalMultiplier = totalMultiplier.div(gameData.fallBaseGameSpeedFactor);
	}
	
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebasecondaryResourcePow')) {
		let x = new Decimal(activeMicroorganismEffects.amoebasecondaryResourcePow.mag);
		if (x.greaterThanOrEqualTo(new Decimal(2))) {
			x = SC(x, new Decimal(2), new Decimal(0.25));
		}
		totalMultiplier = totalMultiplier.pow(x);
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
		let base = new Decimal(20);
		if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossMilestoneEffect')) {
			const x = new Decimal(activeMicroorganismEffects.mossSporemossMilestoneEffect.mag);
			base = base.times(x);
		}
		moss.mossMilestoneFactor.MM3 = base;
        totalMultiplier = totalMultiplier.times(base);
    }
    if (moss.mossMilestoneFactor.MM4Achieved) {
		let base = new Decimal(5);
		if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossMilestoneEffect')) {
			const x = new Decimal(activeMicroorganismEffects.mossSporemossMilestoneEffect.mag);
			base = base.times(x);
		}
		moss.mossMilestoneFactor.MM4 = base;
        totalMultiplier = totalMultiplier.times(base);
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
	
	if (Object.hasOwn(activeMicroorganismEffects, 'chronalcompostingSpeedPow')) {
		const x = new Decimal(activeMicroorganismEffects.chronalcompostingSpeedPow.mag);
		totalMultiplier = totalMultiplier.pow(x);
		document.getElementById('chronalcompostingSpeedPow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Composting speed<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallResources')) {
		let x = new Decimal(activeMicroorganismEffects.amoebaallResources.mag);
		if (x.greaterThanOrEqualTo(new Decimal(15))) {
			x = x.pow(new Decimal(0.4)).clamp(x, new Decimal(Infinity));
		}
		totalMultiplier = totalMultiplier.times(x);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebasecondaryResourcePow')) {
		let x = new Decimal(activeMicroorganismEffects.amoebasecondaryResourcePow.mag);
		if (x.greaterThanOrEqualTo(new Decimal(2))) {
			x = SC(x, new Decimal(2), new Decimal(0.25));
			document.getElementById('amoebasecondaryResourcePow').innerHTML = `^<span class="softcap">${truncateToDecimalPlaces(x, 3)}</span> all secondary resources<br>`;
		}
		else {
			document.getElementById('amoebasecondaryResourcePow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} all secondary resources<br>`;
		}
		totalMultiplier = totalMultiplier.pow(x);
		
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

export function calculateLeafPERoot() {
	let totalMultiplier = new Decimal(12);
	if (leafUpgradeFactor.L29Bought) {
		const x = new Decimal(2.5);
		totalMultiplier = totalMultiplier.minus(x);
    }
	if (Object.hasOwn(activeMicroorganismEffects, 'tardigradeleafSeedPERoots')) {
		let x = new Decimal(activeMicroorganismEffects.tardigradeleafSeedPERoots.mag);
		if (x.greaterThanOrEqualTo(new Decimal(1))) {
			const y = x.pow(new Decimal(0.1));
			const z = y.clamp(new Decimal(1), new Decimal(Infinity));
			x = z;
			document.getElementById('tardigradeleafSeedPERoots').innerHTML = `-<span class="softcap">${truncateToDecimalPlaces(x, 3)}</span> Leaf and Seed root from PE's formula<br>`;
		} 
		else {
			document.getElementById('tardigradeleafSeedPERoots').innerHTML = `-${truncateToDecimalPlaces(x, 3)}</span> Leaf and Seed root from PE's formula<br>`;
		}
		totalMultiplier = totalMultiplier.minus(x);
	}
	gameData.leafPERoot = totalMultiplier;
}

export function calculateSeedPERoot() {
	let totalMultiplier = new Decimal(6);
	if (leafUpgradeFactor.L29Bought) {
		const x = new Decimal(1.5);
		totalMultiplier = totalMultiplier.minus(x);
    }
	if (Object.hasOwn(activeMicroorganismEffects, 'tardigradeleafSeedPERoots')) {
		let x = new Decimal(activeMicroorganismEffects.tardigradeleafSeedPERoots.mag);
		if (x.greaterThanOrEqualTo(new Decimal(1))) {
			const y = x.pow(new Decimal(0.1));
			const z = y.clamp(new Decimal(1), new Decimal(Infinity));
			x = z;
			document.getElementById('tardigradeleafSeedPERoots').innerHTML = `-<span class="softcap">${truncateToDecimalPlaces(x, 3)}</span> Leaf and Seed root from PE's formula<br>`;
		} 
		else {
			document.getElementById('tardigradeleafSeedPERoots').innerHTML = `-${truncateToDecimalPlaces(x, 3)}</span> Leaf and Seed root from PE's formula<br>`;
		}
		totalMultiplier = totalMultiplier.minus(x);
	}
	gameData.seedPERoot = totalMultiplier;
}

export function calculateEntropyMult() {
    let totalMultiplier = new Decimal(1);

    if (moss.mossMilestoneFactor.MM5Achieved) {
		let base = new Decimal(2);
		if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossMilestoneEffect')) {
			const x = new Decimal(activeMicroorganismEffects.mossSporemossMilestoneEffect.mag);
			base = base.times(x);
		}
		moss.mossMilestoneFactor.MM5 = base;
		totalMultiplier = totalMultiplier.times(base);
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
        const x = gameData.cells.plus(new Decimal(1));
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
        let w = z.clamp(new Decimal(1), new Decimal(Infinity));
		if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossMilestoneEffect')) {
			const v = new Decimal(activeMicroorganismEffects.mossSporemossMilestoneEffect.mag);
			w = w.times(v);
		}
        moss.mossMilestoneFactor.MM9 = w;
        
        totalMultiplier = totalMultiplier.times(w);
    }
    if (seedUpgradeFactor.S45Bought) {
        const x = new Decimal(2.5);
        totalMultiplier = totalMultiplier.times(x);
        document.getElementById('S45').innerHTML = `S45 (Bought)<br>Twig IV<br>x100L, x2.5S<br>Cost: 1e1459 Seeds`;
    }
	if (entropyUpgradeFactor.R4Amount.greaterThanOrEqualTo(new Decimal(1))) {
		let x = entropyUpgradeFactor.R4Effect;
		if (leafUpgradeFactor.L66Bought) {
			const y = Decimal.log10(x.plus(new Decimal(1))).div(new Decimal(3));
			const z = new Decimal(10).pow(new Decimal(1000).times(y));
			x = z;
		}
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('R4').innerHTML = `Entropificator (${truncateToDecimalPlaces(entropyUpgradeFactor.R4Amount, 3)})<br>Requires ${truncateToDecimalPlaces(entropyUpgradeFactor.R4Cost, 3)} RNA strands<br>Effect: x${truncateToDecimalPlaces(x, 3)} Entropy`;
	}
	if (gameData.isInChallengeBlizzard) {
		totalMultiplier = new Decimal(1);
	}

	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallResources')) {
		let x = new Decimal(activeMicroorganismEffects.amoebaallResources.mag);
		if (x.greaterThanOrEqualTo(new Decimal(15))) {
			x = x.pow(new Decimal(0.4)).clamp(x, new Decimal(Infinity));
		}
		totalMultiplier = totalMultiplier.times(x);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'chaoticentropyBasePow')) {
		const x = new Decimal(activeMicroorganismEffects.chaoticentropyBasePow.mag);
		totalMultiplier = totalMultiplier.pow(x);
		document.getElementById('chaoticentropyBasePow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Entropy<br>`;
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
		let z = y.clamp(new Decimal(1), new Decimal(Infinity));
		if (z.greaterThanOrEqualTo(new Decimal(1e6))) {
			z = new Decimal(1e6).times(Decimal.log10(z.plus(new Decimal(1))));
		}
		totalMultiplier = totalMultiplier.times(z);
		document.getElementById('RM7Effect').innerHTML = `Potential Energy multiplies Root gain<br>Effect: x${truncateToDecimalPlaces(z, 3)}`;
	}
	if (rootUpgradeFactor.RO10Bought) {
		totalMultiplier = totalMultiplier.times(new Decimal(1.15));
	}
	if (rootUpgradeFactor.RO17Bought) {
		const x = gameData.entropy.plus(new Decimal(1));
		const y = (Decimal.log10(x)).plus(new Decimal(1));
		const z = Decimal.log10(y);
		const w = z.clamp(new Decimal(1), new Decimal(Infinity));
		totalMultiplier = totalMultiplier.times(w);
        document.getElementById("RO17").innerHTML = `RO17 (Bought)<br>Tap-root<br>Entropy boosts Roots<br>Cost: 15 Roots<br>Effect: x${truncateToDecimalPlaces(w, 3)}`;
	}
	if (leafUpgradeFactor.L67Bought) {
		const x = new Decimal(1.67);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById("L67").innerHTML = `L67 (Bought)<br>Dead Meme<br>x1.67 Roots<br>Cost: 6.7e676767 Leaves`;
	}
    if (temple.repeatableUpgradeFactor.LR3.greaterThanOrEqualTo(new Decimal(1))) {
        const x = temple.repeatableUpgradeFactor.LR3Effect;
        let y = x.pow(temple.repeatableUpgradeFactor.LR3);
		if (y.greaterThanOrEqualTo(new Decimal(1e7))) {
			y = SC(y, new Decimal(1e6), new Decimal(0.15));
			document.getElementById("LR3").innerHTML = `LR3 (${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR3, 3)} / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR3Cap, 3)})<br>x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR3Effect, 3)} Roots<br>Cost: ${truncateToDecimalPlaces(temple.LR3CostCalculation(), 3)} Leaves<br>Effect: x<span class="softcap">${truncateToDecimalPlaces(y, 3)}</span>`;
		}
		else {
			document.getElementById("LR3").innerHTML = `LR3 (${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR3, 3)} / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR3Cap, 3)})<br>x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR3Effect, 3)} Roots<br>Cost: ${truncateToDecimalPlaces(temple.LR3CostCalculation(), 3)} Leaves<br>Effect: x${truncateToDecimalPlaces(y, 3)}`;
		}
        totalMultiplier = totalMultiplier.times(y);
    }
    else {
        document.getElementById("LR3").innerHTML = `LR3 (0 / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR3Cap, 3)})<br>x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.LR3Effect, 3)} Roots<br>Cost: 1e100000 Leaves<br>Effect: x1`;
    }
	if (Object.hasOwn(activeMicroorganismEffects, 'reinforcedrootsBaseMult')) {
		const x = new Decimal(activeMicroorganismEffects.reinforcedrootsBaseMult.mag);
		const y = new Decimal(1).plus(x);
		totalMultiplier = totalMultiplier.times(y);
		document.getElementById('reinforcedrootsBaseMult').innerHTML = `x${truncateToDecimalPlaces(y, 3)} Roots<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallResources')) {
		let x = new Decimal(activeMicroorganismEffects.amoebaallResources.mag);
		if (x.greaterThanOrEqualTo(new Decimal(15))) {
			x = x.pow(new Decimal(0.4)).clamp(x, new Decimal(Infinity));
		}
		totalMultiplier = totalMultiplier.times(x);
	}
	gameData.rootsMult = totalMultiplier;
}

export function calculateReinforcementMult() {
	let totalMultiplier = new Decimal(1);
	if (leafUpgradeFactor.L68Bought) {
		const x = new Decimal(1.5);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById("L68").innerHTML = `L68 (Bought)<br>Grow XIV<br>x1.5 Reinforcements<br>Cost: 1e800000 Leaves`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'reinforcedreinforcementsMult')) {
		const x = new Decimal(activeMicroorganismEffects.reinforcedreinforcementsMult.mag);
		const y = new Decimal(1).plus(x);
		totalMultiplier = totalMultiplier.times(y);
		document.getElementById('reinforcedreinforcementsMult').innerHTML = `x${truncateToDecimalPlaces(y, 3)} Reinforcements<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallResources')) {
		let x = new Decimal(activeMicroorganismEffects.amoebaallResources.mag);
		if (x.greaterThanOrEqualTo(new Decimal(15))) {
			x = x.pow(new Decimal(0.4)).clamp(x, new Decimal(Infinity));
		}
		totalMultiplier = totalMultiplier.times(x);
	}
	gameData.reinforcementMult = totalMultiplier;
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
	if (Object.hasOwn(activeMicroorganismEffects, 'chronalgameSpeedMult')) {
		const x = new Decimal(activeMicroorganismEffects.chronalgameSpeedMult.mag);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('chronalgameSpeedMult').innerHTML = `x${truncateToDecimalPlaces(x, 3)} Game speed<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallResources')) {
		let x = new Decimal(activeMicroorganismEffects.amoebaallResources.mag);
		if (x.greaterThanOrEqualTo(new Decimal(15))) {
			x = x.pow(new Decimal(0.4)).clamp(x, new Decimal(Infinity));
		}
		totalMultiplier = totalMultiplier.times(x);
	}
	totalMultiplier = totalMultiplier.times(gameData.gameSpeed);

    gameData.leafSoftcapStart = totalMultiplier;
    if (gameData.leavesIsSoftcappedThisDecompolization) {
        document.getElementById('leafSoftcapInfo').innerHTML = `The Leaf softcap starts at ${truncateToDecimalPlaces(gameData.leafSoftcapStart.times(new Decimal(1e20)), 3)} (^${truncateToDecimalPlaces(gameData.baseLeafSoftcapFactor, 3)})`;
    }
	else {
		document.getElementById('leafSoftcapInfo').innerHTML = ``;
	}
    if (gameData.leavesIsSoftcapped2ThisDecompolization) {
        document.getElementById('leafSoftcap2Info').innerHTML = `The Leaf softcap^2 starts at 1.79e308`;
    }
	else {
		document.getElementById('leafSoftcap2Info').innerHTML = ``;
	}
    if (gameData.leavesIsSoftcapped3ThisDecompolization) {
        document.getElementById('leafSoftcap3Info').innerHTML = `The Leaf softcap^3 starts at 1e500`;
    }
	else {
		document.getElementById('leafSoftcap3Info').innerHTML = ``;
	}
    if (gameData.leavesIsSoftcapped4ThisDecompolization) {
        document.getElementById('leafSoftcap4Info').innerHTML = `The (Leaf softcap^4)^2 starts at 1e1000`;
        achievements.ach75 = true;
    }
	else {
		document.getElementById('leafSoftcap4Info').innerHTML = ``;
	}
    if (gameData.leavesIsSoftcapped5ThisDecompolization) {
        document.getElementById('leafSoftcap5Info').innerHTML = `The (Leaf softcap^5)^2 starts at 1e2000`;
    }
	else {
		document.getElementById('leafSoftcap5Info').innerHTML = ``;
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
export function calculateFreeEntropyFertilizers() {
	let totalAdd = new Decimal(0);
    if (seedUpgradeFactor.S62Bought) {
        const x = gameData.seedComposterCount.minus(new Decimal(10000));
        const y = x.clamp(new Decimal(0), new Decimal(Infinity));
        const z = (y.pow(new Decimal(0.25))).trunc();
        totalAdd = totalAdd.plus(z);
        document.getElementById('S62').innerHTML = `S62 (Bought)<br>Hyper Staked Fertilizers<br>After 10000 Fertilizers,<br>the Seed Composter makes Entropy Fertilizers<br>Cost: e3e7 Seeds<br>Effect: +${truncateToDecimalPlaces(z, 3)}`;
    }
    if (fruitUpgradeFactor.F54Bought) {
        const x = gameData.fruitComposterCount.minus(new Decimal(10000));
        const y = x.clamp(new Decimal(0), new Decimal(Infinity));
        const z = (y.pow(new Decimal(0.25))).trunc();
        totalAdd = totalAdd.plus(z);
        document.getElementById('F54').innerHTML = `F54 (Bought)<br>Hyper Staked Fertilizers<br>After 10000 Fertilizers,<br>the Fruit Composter makes Entropy Fertilizers<br>Cost: e2e7 Fruits<br>Effect: +${truncateToDecimalPlaces(z, 3)}`;
    }
	gameData.freeEntropyFertilizers = totalAdd;
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
	if (totalDelay.greaterThan(new Decimal(20000))) {
		totalDelay = SC(totalDelay, new Decimal(20000), new Decimal(0.25));
	}
	if (gameData.rootComposterUnlocked) {
		totalDelay = totalDelay.times(gameData.rootComposterEffect);
	}
    gameData.composterScalingStart = totalDelay.trunc();
}

export function calculateMossEffect() {
    let totalMultiplier = new Decimal(0);
    let totalPower = new Decimal(1);
    if (fruitUpgradeFactor.M4.greaterThanOrEqualTo(new Decimal(1))) {
        const x = new Decimal(1);
        let y = x.times(fruitUpgradeFactor.M4);
		if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossUpgradeEffect')) {
			const z = new Decimal(activeMicroorganismEffects.mossSporemossUpgradeEffect.mag);
			y = y.times(z);
		}
        totalMultiplier = totalMultiplier.plus(y);
		if (document.getElementById('mossyleafMilestone2')) {
			if (rootUpgradeFactor.fallenMilestones.mossy[1].achieved) {
				totalPower = totalPower.times(y.times(new Decimal(0.25)));
				document.getElementById('M4').innerHTML = `M4<br>Moss Effect: Andromeda (${truncateToDecimalPlaces(fruitUpgradeFactor.M4, 3)})<br>+1 and +^0.25 to the total Moss effect<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M4CostCalculation(), 3)} Moss<br>Effect: +${truncateToDecimalPlaces(y, 3)} and ^${truncateToDecimalPlaces(y.times(new Decimal(0.25)), 3)}`;
			}
			else {
				document.getElementById('M4').innerHTML = `M4<br>Moss Effect: Andromeda (${truncateToDecimalPlaces(fruitUpgradeFactor.M4, 3)})<br>+1 to the total Moss effect<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M4CostCalculation(), 3)} Moss<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
			}
		}
    }
	if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossEffectPow')) {
		const x = new Decimal(activeMicroorganismEffects.mossSporemossEffectPow.mag);
		totalPower = totalPower.times(x);
		document.getElementById('mossSporemossEffectPow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Moss Effect<br>`;
	}
    gameData.mossEffectMultiplier = totalMultiplier;
	gameData.mossEffectPow = totalPower;
}


export function calculateComposterSuperScalingStart() {
    let totalDelay = new Decimal(100);
    if (fruitUpgradeFactor.M1.greaterThanOrEqualTo(new Decimal(1))) {
        const x = new Decimal(2);
		const y = x.times(fruitUpgradeFactor.M1EffectMult);
        var z = y.times(fruitUpgradeFactor.M1);
		var softcap = fruitUpgradeFactor.M1SoftcapDelay;
		if (z.greaterThanOrEqualTo(softcap)) {
			const w = z.pow(new Decimal(0.5));
			z = softcap.plus(w);
			document.getElementById('M1').innerHTML = `M1<br>Delay Super Scaling (${truncateToDecimalPlaces(fruitUpgradeFactor.M1, 3)})<br>Delays Fertilizer Super Scaling by +${truncateToDecimalPlaces((fruitUpgradeFactor.M1EffectMult.times(x)), 3)}<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M1CostCalculation(), 3)} Moss<br>Effect: +${truncateToDecimalPlaces(z, 3)}<br><span class="softcap">(Softcapped)</span>`;
			
		}
		else {
			document.getElementById('M1').innerHTML = `M1<br>Delay Super Scaling (${truncateToDecimalPlaces(fruitUpgradeFactor.M1, 3)})<br>Delays Fertilizer Super Scaling by +${truncateToDecimalPlaces((fruitUpgradeFactor.M1EffectMult.times(x)), 3)}<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M1CostCalculation(), 3)} Moss<br>Effect: +${truncateToDecimalPlaces(z, 3)}`;
		}
        totalDelay = totalDelay.plus(z);
        
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
		let x = entropyUpgradeFactor.R2Effect;
		if (leafUpgradeFactor.L66Bought) {
			x = x.times(new Decimal(10));
		}
		totalDelay = totalDelay.plus(x);
		document.getElementById('R2').innerHTML = `Delay Super Scaling (${truncateToDecimalPlaces(entropyUpgradeFactor.R2Amount, 3)})<br>Requires ${truncateToDecimalPlaces(entropyUpgradeFactor.R2Cost, 3)} RNA strands<br>Effect: +${truncateToDecimalPlaces(x, 3)} Super Scaling delay`;
	}
    if (gameData.isInChallengeWildfire) {
        const x = new Decimal(0);
        totalDelay = totalDelay.times(x);
    }
	if (totalDelay.greaterThan(new Decimal(20000))) {
		totalDelay = SC(totalDelay, new Decimal(20000), new Decimal(0.25));
	}
	if (gameData.rootComposterUnlocked) {
		totalDelay = totalDelay.times(gameData.rootComposterEffect);
	}
    gameData.composterSuperScalingStart = totalDelay.trunc();
}

export function calculateComposterSuperScalingEffect() {
    let totalMultiplier = new Decimal(1.1);
    if (entropyUpgradeFactor.E23Bought) {
        const x = new Decimal(1.075);
        totalMultiplier = totalMultiplier.div(x);
    }
	if (Object.hasOwn(activeMicroorganismEffects, 'tardigradesuperScalingEffect')) {
		const x = new Decimal(activeMicroorganismEffects.tardigradesuperScalingEffect.mag);
		const y = totalMultiplier.minus(new Decimal(1));
		const z = y.div(x);
		totalMultiplier = z.plus(new Decimal(1));
		
		document.getElementById('tardigradesuperScalingEffect').innerHTML = `/${truncateToDecimalPlaces(x, 3)} Fertilizer Super Scaling effect<br>`;
	}
	
    if (gameData.isInChallengeWildfire) {
        const x = gameData.wildfireBaseFactor;
        totalMultiplier = totalMultiplier.pow(x);
    }
    gameData.composterSuperScalingEffect = totalMultiplier;
}

export function calculateCompostingSpeedScalingStart() {
	let totalDelay = new Decimal(500);
	if (rootUpgradeFactor.RO22Bought) {
        const x = new Decimal(2);
		const y = x.times(fruitUpgradeFactor.M1EffectMult);
        var z = y.times(fruitUpgradeFactor.M1);
		var softcap = fruitUpgradeFactor.M1SoftcapDelay;
		if (z.greaterThanOrEqualTo(softcap)) {
			const w = z.pow(new Decimal(0.5));
			z = softcap.plus(w);
		}
        totalDelay = totalDelay.plus(z);
	}
	if (totalDelay.greaterThan(new Decimal(20000))) {
		totalDelay = SC(totalDelay, new Decimal(20000), new Decimal(0.25));
	}
	if (gameData.rootComposterUnlocked) {
		totalDelay = totalDelay.times(gameData.rootComposterEffect);
	}
	gameData.compostingSpeedScalingStart = totalDelay.trunc();
}

export function calculateCompostingSpeedSuperScalingStart() {
    let totalDelay = new Decimal(5000);
    if (temple.repeatableUpgradeFactor.FR3.greaterThanOrEqualTo(new Decimal(1))) {
        const x = temple.repeatableUpgradeFactor.FR3Effect;
        const y = x.times(temple.repeatableUpgradeFactor.FR3);
        totalDelay = totalDelay.plus(y);
        document.getElementById("FR3").innerHTML = `FR3 (${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.FR3, 3)} / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.FR3Cap, 3)})<br>+${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.FR3Effect, 3)} CS Super Scaling start<br>Cost: ${truncateToDecimalPlaces(temple.FR3CostCalculation(), 3)} Fruits<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
    }
    else {
        document.getElementById("FR3").innerHTML = `FR3 (0 / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.FR3Cap, 3)})<br>+${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.FR3Effect, 3)} Super Scaling start<br>Cost: 1e500000 Fruits<br>Effect: +0`;
    }
	if (leafUpgradeFactor.L71Bought) {
		if (fruitUpgradeFactor.M1.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(2);
			const y = x.times(fruitUpgradeFactor.M1EffectMult);
			var z = y.times(fruitUpgradeFactor.M1);
			var softcap = fruitUpgradeFactor.M1SoftcapDelay;
			if (z.greaterThanOrEqualTo(softcap)) {
				const w = z.pow(new Decimal(0.5));
				z = softcap.plus(w);
			}
			const w = z.pow(new Decimal(0.65));
			totalDelay = totalDelay.plus(w);
			document.getElementById('L71').innerHTML = `L71 (Bought)<br>Leaftic Delayer I<br>M1's effect^0.65 delays<br>Super Composting Speed scaling<br>Cost: e7.5e6 Leaves<br>Effect: +${truncateToDecimalPlaces(w, 3)}`;
		}
		else {
			document.getElementById('L71').innerHTML = `L71 (Bought)<br>Leaftic Delayer I<br>M1's effect^0.65 delays<br>Super Composting Speed scaling<br>Cost: e7.5e6 Leaves<br>Effect: +0`;
		}
	}
	
	if (totalDelay.greaterThan(new Decimal(20000))) {
		totalDelay = SC(totalDelay, new Decimal(20000), new Decimal(0.25));
	}
	if (gameData.rootComposterUnlocked) {
		totalDelay = totalDelay.times(gameData.rootComposterEffect);
	}
    gameData.compostingSpeedSuperScalingStart = totalDelay.trunc();
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

export function calculateFertilizerBaseEffect() {
	let totalMultiplier = new Decimal(1.5);
	if (gameData.bacteria.greaterThanOrEqualTo(new Decimal(1))) {
		totalMultiplier = totalMultiplier.plus(gameData.bacteriaFertilizerMult);
	}
    if (temple.repeatableUpgradeFactor.FR2.greaterThanOrEqualTo(new Decimal(1))) {
        const x = temple.repeatableUpgradeFactor.FR2Effect;
        const y = (x.times(temple.repeatableUpgradeFactor.FR2)).plus(new Decimal(1));
        totalMultiplier = totalMultiplier.times(y);
        document.getElementById("FR2").innerHTML = `FR2 (${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.FR2, 3)} / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.FR2Cap, 3)})<br>+${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.FR2Effect, 3)}x Fertilizer base effect<br>Cost: ${truncateToDecimalPlaces(temple.FR2CostCalculation(), 3)} Fruits<br>Effect: x${truncateToDecimalPlaces(y, 3)}`;
    }
	else {
        document.getElementById("FR2").innerHTML = `FR2 (0 / 10)<br>x${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.FR2Effect, 3)} Fertilizer base effect<br>Cost: ${truncateToDecimalPlaces(temple.FR2CostCalculation(), 3)} Fruits<br>Effect: x1`;
	}
	gameData.fertilizerBaseEffect = totalMultiplier;
}

export function calculateMossFactorPow() {
	let totalMultiplier = new Decimal(1);
	if (document.getElementById('mossyleafUpgrade3')) {
		fallenLeaves.fallenUpgradeFixer('mossy', 2);

		if (rootUpgradeFactor.fallenUpgrades.mossy[2].amount.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(1.35).pow(rootUpgradeFactor.fallenUpgrades.mossy[2].amount);
			totalMultiplier = totalMultiplier.times(x);
			
			document.getElementById('mossyleafUpgrade3').innerHTML = `ML3 (${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.mossy[2].amount, 3)})<br>^1.35 to the base Moss product<br>Cost: ${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.mossy[2].cost, 3)} Mossy Leaves<br>Effect: ^${truncateToDecimalPlaces(x, 3)}`;
			document.getElementById('mossyleafUpgrade3').style.padding = `11.5px 0px`;
		}
	}
	gameData.mossFactorPow = totalMultiplier;
}

export function calculateMossPow() {
	let totalMultiplier = new Decimal(1);
	if (document.getElementById('mossyleafUpgrade1')) {
		fallenLeaves.fallenUpgradeFixer('mossy', 0);

		if (rootUpgradeFactor.fallenUpgrades.mossy[0].amount.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(1.05).pow(rootUpgradeFactor.fallenUpgrades.mossy[0].amount);
			totalMultiplier = totalMultiplier.times(x);
			
			document.getElementById('mossyleafUpgrade1').innerHTML = `ML1 (${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.mossy[0].amount, 3)})<br>^1.05 Moss<br>Cost: ${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.mossy[0].cost, 3)} Mossy Leaves<br>Effect: ^${truncateToDecimalPlaces(x, 3)}`;
			document.getElementById('mossyleafUpgrade1').style.padding = `11.5px 0px`;
		}
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossBasePow')) {
		const x = new Decimal(activeMicroorganismEffects.mossSporemossBasePow.mag);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('mossSporemossBasePow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Moss<br>`;
	}
	gameData.mossPow = totalMultiplier;
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
	if (rootUpgradeFactor.RO23Bought) {
		const x = new Decimal(6);
		totalBulk = totalBulk.plus(x);
	}
	if (gameData.highestCircuits.greaterThanOrEqualTo(new Decimal(1e6))) {
		const x = circuits.fertilizerBulk;
		const y = x.times(gameData.welderEffectMult);
		totalBulk = totalBulk.plus(y.trunc());
	}
	
    gameData.fertilizerBulk = totalBulk;
}

export function calculateCellUpgradesBulk() {
    let totalBulk = new Decimal(1);
    if (rootUpgradeFactor.RM1Achieved) {
        const x = new Decimal(4);
        totalBulk = totalBulk.plus(x);
    }
	if (gameData.highestCircuits.greaterThanOrEqualTo(new Decimal(1e6))) {
		const x = circuits.cellUpgradeBulk;
		const y = x.times(gameData.welderEffectMult);
		totalBulk = totalBulk.plus(y.trunc());
	}
    gameData.cellUpgradesBulk = totalBulk;
}

export function calculateRepeatableUpgradesBulk() {
    let totalBulk = new Decimal(1);
	if (gameData.highestCircuits.greaterThanOrEqualTo(new Decimal(1e6))) {
		const x = circuits.repeatableUpgradeBulk;
		const y = x.times(gameData.welderEffectMult);
		totalBulk = totalBulk.plus(y.trunc());
	}
    temple.repeatableUpgradeFactor.repeatableUpgradesBulk = totalBulk;
}

export function calculateMossUpgradesBulk() {
    let totalBulk = new Decimal(1);
	if (gameData.highestCircuits.greaterThanOrEqualTo(new Decimal(1e6))) {
		const x = circuits.mossUpgradeBulk;
		const y = x.times(gameData.welderEffectMult);
		totalBulk = totalBulk.plus(y.trunc());
	}
    fruitUpgradeFactor.mossUpgradesBulk = totalBulk;
}

export function calculateBacteriaTypesBulk() {
	let totalBulk = new Decimal(1);
	if (rootUpgradeFactor.RO18Bought) {
		const x = new Decimal(1);
		totalBulk = totalBulk.plus(x);
	}
	if (gameData.highestCircuits.greaterThanOrEqualTo(new Decimal(1e6))) {
		const x = circuits.bacteriaTypeBulk;
		const y = x.times(gameData.welderEffectMult);
		totalBulk = totalBulk.plus(y.trunc());
	}
	gameData.bacteriaTypesBulk = totalBulk;
}

export function calculateDNABlueprintsBulk() {
    let totalBulk = new Decimal(1);
	if (gameData.highestCircuits.greaterThanOrEqualTo(new Decimal(1e6))) {
		const x = circuits.dnaBlueprintBulk;
		const y = x.times(gameData.welderEffectMult);
		totalBulk = totalBulk.plus(y.trunc());
	}
    gameData.dnaBlueprintBulk = totalBulk;
}

export function calculateBacteriaUpgradesBulk() {
    let totalBulk = new Decimal(1);
	if (gameData.highestCircuits.greaterThanOrEqualTo(new Decimal(1e6))) {
		const x = circuits.bacteriaUpgradeBulk;
		const y = x.times(gameData.welderEffectMult);
		totalBulk = totalBulk.plus(y.trunc());
	}
    entropyUpgradeFactor.bacteriaUpgradesBulk = totalBulk;
}

export function calculateRNAUpgradesBulk() {
    let totalBulk = new Decimal(1);
	if (gameData.highestCircuits.greaterThanOrEqualTo(new Decimal(1e6))) {
		const x = circuits.rnaUpgradeBulk;
		const y = x.times(gameData.welderEffectMult);
		totalBulk = totalBulk.plus(y.trunc());
	}
    entropyUpgradeFactor.rnaUpgradesBulk = totalBulk;
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
		let x = Decimal.log10(gameData.droughtBestScore.plus(new Decimal(1)));
		if (rootUpgradeFactor.RO28Bought) {
			x = Decimal.log10(gameData.droughtBestScore.pow(new Decimal(1e50)).plus(new Decimal(1)));
		}
        const y = x.pow(new Decimal(0.0413927));
		const z = y.times(new Decimal(0.909091));
        const w = z.clamp(new Decimal(1), new Decimal(Infinity));
		totalDivision = totalDivision.pow(w);
		document.getElementById('droughtRewardCounter').innerHTML = `Unlock DNA, RNA, and ^${truncateToDecimalPlaces(w, 3)} CRS`;
	}
	if (leafUpgradeFactor.L62Bought) {
		const x = gameData.potentialEnergy.plus(new Decimal(1));
		const y = (Decimal.log10(x)).plus(new Decimal(1));
		const z = (Decimal.log10(y)).div(new Decimal(25));
		const w = z.plus(new Decimal(1));
		const v = w.clamp(new Decimal(1), new Decimal(2));
		totalDivision = totalDivision.pow(v);
		document.getElementById('L62').innerHTML = `L62 (Bought)<br>Base Power III<br>Potential Energy boosts CRS<br>Cost: 1.79e3008 Leaves<br>Effect: ^${truncateToDecimalPlaces(v, 3)}`;
	}
    if (temple.repeatableUpgradeFactor.ER1.greaterThanOrEqualTo(new Decimal(1))) {
        const x = temple.repeatableUpgradeFactor.ER1Effect;
        const y = x.times(temple.repeatableUpgradeFactor.ER1);
        totalDivision = totalDivision.pow(y.plus(new Decimal(1)));
        document.getElementById("ER1").innerHTML = `ER1 (${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.ER1, 3)} / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.ER1Cap, 3)})<br>+^${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.ER1Effect, 3)} CRS<br>Cost: ${truncateToDecimalPlaces(temple.ER1CostCalculation(), 3)} Entropy<br>Effect: ^${truncateToDecimalPlaces(y.plus(new Decimal(1)), 3)}`;
    }
    else {
        document.getElementById("ER1").innerHTML = `ER1 (0 / ${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.ER1Cap, 3)})<br>+^${truncateToDecimalPlaces(temple.repeatableUpgradeFactor.ER1Effect, 3)} TAS<br>Cost: 1e1000 Entropy<br>Effect: ^1`;
    }
	if (Object.hasOwn(activeMicroorganismEffects, 'chaoticCRSBasePow')) {
		const x = new Decimal(activeMicroorganismEffects.chaoticCRSBasePow.mag);
		totalDivision = totalDivision.pow(x);
		document.getElementById('chaoticCRSBasePow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Cell Replication speed<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'yeastCRSBasePow')) {
		const x = new Decimal(activeMicroorganismEffects.yeastCRSBasePow.mag);
		totalDivision = totalDivision.pow(x);
		document.getElementById('yeastCRSBasePow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Cell Replication speed<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallResources')) {
		let x = new Decimal(activeMicroorganismEffects.amoebaallResources.mag);
		if (x.greaterThanOrEqualTo(new Decimal(15))) {
			x = x.pow(new Decimal(0.4)).clamp(x, new Decimal(Infinity));
		}
		totalDivision = totalDivision.times(x);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebasecondaryResourcePow')) {
		let x = new Decimal(activeMicroorganismEffects.amoebasecondaryResourcePow.mag);
		if (x.greaterThanOrEqualTo(new Decimal(2))) {
			x = SC(x, new Decimal(2), new Decimal(0.25));
		}
		totalDivision = totalDivision.pow(x);
	}
	totalDivision = totalDivision.times(gameData.gameSpeed);
	totalDivision = totalDivision.pow(gameData.dnaBlueprintNerf);
	
    gameData.intervalDivision = totalDivision;
}

export function calculateCellsReplicationCap() {
	let totalMultiplier = new Decimal.fromComponents(1, 1, 1000);
	
	if (fruitUpgradeFactor.F44Bought) {
		totalMultiplier = totalMultiplier.pow(new Decimal(5));
		document.getElementById('F44').innerHTML = `F44 (Bought)<br>Super Replication<br>The Cell replication cap is better<br>1e1000 -> 1e5000<br>Cost: 1e1600 Fruits`;
	}
	if (rootUpgradeFactor.RO9Bought) {
		totalMultiplier = totalMultiplier.pow(new Decimal(5));
	}
	if (rootUpgradeFactor.RO24Bought) {
		const x = Decimal.log10(gameData.roots.plus(new Decimal(1)));
		const y = x.clamp(new Decimal(1), new Decimal(Infinity));
		totalMultiplier = totalMultiplier.pow(y);
		document.getElementById('RO24').innerHTML = `RO24 (Bought)<br>Quickening<br>Roots boost Cell Replication cap<br>Cost: 100000 Roots<br>Effect: ^${truncateToDecimalPlaces(y, 3)}`;
	}
	if (entropyUpgradeFactor.E48Bought) {
		const x = Decimal.log10(gameData.rna.plus(new Decimal(1)));
		totalMultiplier = totalMultiplier.pow(x);
		document.getElementById('E48').innerHTML = `E48 (Bought)<br>RNA Replicase I<br>RNA boosts the Cell Replication cap<br>Cost: 1e200000 Entropy<br>Effect: ^${truncateToDecimalPlaces(x, 3)}`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'yeastCRSCapPow')) {
		const x = new Decimal(activeMicroorganismEffects.yeastCRSCapPow.mag);
		totalMultiplier = totalMultiplier.pow(x);
		document.getElementById('yeastCRSCapPow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Cell Replication cap<br>`;
	}
	
	gameData.cellsReplicationCap = totalMultiplier;
}

export function calculateCellsMult() {
	let totalMultiplier = new Decimal(1);
	
	let totalExtensin = entropyUpgradeFactor.extensin.plus(entropyUpgradeFactor.extensinFree);
	if (totalExtensin.greaterThanOrEqualTo(new Decimal(1))) {
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
	if (Object.hasOwn(activeMicroorganismEffects, 'livelyleafSoftcapBase')) {
		const x = new Decimal(activeMicroorganismEffects.livelyleafSoftcapBase.mag);
		totalMultiplier = totalMultiplier.plus(x);
		document.getElementById('livelyleafSoftcapBase').innerHTML = `-${truncateToDecimalPlaces(x, 3)} Leaf softcap root<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallSoftcapBase')) {
		const x = new Decimal(activeMicroorganismEffects.amoebaallSoftcapBase.mag);
		totalMultiplier = totalMultiplier.plus(x);
		document.getElementById('amoebaallSoftcapBase').innerHTML = `-${truncateToDecimalPlaces(x, 3)} from all softcap roots<br>`;
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
	if (Object.hasOwn(activeMicroorganismEffects, 'groundedseedSoftcapBase')) {
		const x = new Decimal(activeMicroorganismEffects.groundedseedSoftcapBase.mag);
		totalMultiplier = totalMultiplier.plus(x);
		document.getElementById('groundedseedSoftcapBase').innerHTML = `-${truncateToDecimalPlaces(x, 3)} Seed softcap root<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallSoftcapBase')) {
		const x = new Decimal(activeMicroorganismEffects.amoebaallSoftcapBase.mag);
		totalMultiplier = totalMultiplier.plus(x);
	}
    gameData.baseSeedSoftcapFactor = totalMultiplier;
}

export function calculateBaseFruitSoftcapFactor() {
    let totalMultiplier = new Decimal(0.75);
    if (entropyUpgradeFactor.E17Bought) {
        totalMultiplier = totalMultiplier.plus(new Decimal(0.025));
        document.getElementById('E32').innerHTML = `E32 (Bought)<br>Free Fruits<br>-0.025 from Fruit softcap root<br>Cost: 3.33e33 Entropy`;
    }
	if (entropyUpgradeFactor.R3Amount.greaterThanOrEqualTo(new Decimal(1))) {
		totalMultiplier = totalMultiplier.plus(entropyUpgradeFactor.R3Effect);
		document.getElementById('R3').innerHTML = `Softcap Dampener III (${truncateToDecimalPlaces(entropyUpgradeFactor.R3Amount, 3)} / 10)<br>Requires ${truncateToDecimalPlaces(entropyUpgradeFactor.R3Cost, 3)} RNA strands<br>Effect: -${truncateToDecimalPlaces(entropyUpgradeFactor.R3Effect, 3)} from Fruit softcap root`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallSoftcapBase')) {
		const x = new Decimal(activeMicroorganismEffects.amoebaallSoftcapBase.mag);
		totalMultiplier = totalMultiplier.plus(x);
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
		if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossMilestoneEffect')) {
			const w = new Decimal(activeMicroorganismEffects.mossSporemossMilestoneEffect.mag);
			v = v.times(x);
		}
        moss.mossMilestoneFactor.MM6 = v;
        totalMultiplier = totalMultiplier.times(v);
    }

    gameData.seedSoftcapStart = totalMultiplier;
    if (gameData.seedsIsSoftcappedThisHarvest) {
        document.getElementById('seedSoftcapInfo').innerHTML = `The Seed softcap starts at ${truncateToDecimalPlaces(gameData.seedSoftcapStart, 3)} (^${truncateToDecimalPlaces(gameData.baseSeedSoftcapFactor, 3)})`;
    }
	else {
        document.getElementById('seedSoftcapInfo').innerHTML = ``;
	}
    if (gameData.seedsIsSoftcapped2ThisHarvest) {
        document.getElementById('seedSoftcap2Info').innerHTML = `The Seed softcap^2 starts at 1e2000`;
    }
	else {
        document.getElementById('seedSoftcap2Info').innerHTML = ``;
	}
}

export function calculateFruitsSoftcap() {
    if (gameData.fruitsIsSoftcappedThisTransformation) {
        document.getElementById('fruitSoftcapInfo').innerHTML = `The Fruit softcap starts at 1.79e308 (^${truncateToDecimalPlaces(gameData.baseFruitSoftcapFactor, 3)})`;
    }
	else {
        document.getElementById('fruitSoftcapInfo').innerHTML = ``;
	}
}

export function calculateBacteriaMult() {
    let totalMultiplier = new Decimal(1);
    if (moss.mossMilestoneFactor.MM7Achieved) {
        const x = new Decimal(0.25).times(gameData.entropy.pow(new Decimal(0.150515)));
		var y = x.clamp(new Decimal(1), new Decimal(Infinity));
		if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossMilestoneEffect')) {
			const z = new Decimal(activeMicroorganismEffects.mossSporemossMilestoneEffect.mag);
			y = y.times(z);
		}
        totalMultiplier = totalMultiplier.times(y);
		moss.mossMilestoneFactor.MM7 = y;
    }
	let totalAsparagine = entropyUpgradeFactor.asparagine.plus(entropyUpgradeFactor.asparagineFree);
	if (totalAsparagine.greaterThanOrEqualTo(new Decimal(1))) {
		totalMultiplier = totalMultiplier.times(entropyUpgradeFactor.asparagineEffect);
		document.getElementById('asparagineCounter').innerHTML = `${truncateToDecimalPlaces(entropyUpgradeFactor.asparagine, 3)} Asparagine Proteins<br> Game speed boosts Bacteria base mult (x${truncateToDecimalPlaces(entropyUpgradeFactor.asparagineEffect, 3)})`;
	}
    if (entropyUpgradeFactor.B3Amount.greaterThanOrEqualTo(new Decimal(1))) {
        const x = entropyUpgradeFactor.B3Effect;
        totalMultiplier = totalMultiplier.times(x);
    }
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallResources')) {
		let x = new Decimal(activeMicroorganismEffects.amoebaallResources.mag);
		if (x.greaterThanOrEqualTo(new Decimal(15))) {
			x = x.pow(new Decimal(0.4)).clamp(x, new Decimal(Infinity));
		}
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
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebasecondaryResourcePow')) {
		let x = new Decimal(activeMicroorganismEffects.amoebasecondaryResourcePow.mag);
		if (x.greaterThanOrEqualTo(new Decimal(2))) {
			x = SC(x, new Decimal(2), new Decimal(0.25));
		}
		totalMultiplier = totalMultiplier.times(x);
	}
    if (moss.mossMilestoneFactor.MM10Achieved) {
        const x = gameData.bacteriaTypes;
        const y = x.minus(new Decimal(29));
		const z = y.times(new Decimal(0.01));
        let w = z.plus(new Decimal(1));
		if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossMilestoneEffect')) {
			const v = new Decimal(activeMicroorganismEffects.mossSporemossMilestoneEffect.mag);
			w = w.times(v);
		}
        moss.mossMilestoneFactor.MM10 = w;
        
        totalMultiplier = totalMultiplier.times(w);
    }
	totalMultiplier = totalMultiplier.times(gameData.dnaBlueprintNerf);
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
	if (entropyUpgradeFactor.E43Bought) {
		const x = gameData.roots.plus(new Decimal(1));
		const y = Decimal.log10(x);
		const z = y.div(new Decimal(5));
		const w = z.plus(new Decimal(1));
		totalMultiplier = totalMultiplier.pow(w);
		document.getElementById('E43').innerHTML = `E43 (Bought)<br>Island of Stability<br>Roots boost Bacteria cap<br>Cost: 1e180 Entropy<br>Effect: ^${truncateToDecimalPlaces(w, 3)}`;
	}
	if (entropyUpgradeFactor.E51Bought) {
		const x = moss.mossMilestoneFactor.MM10;
		totalMultiplier = totalMultiplier.pow(x);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'chaoticbacteriaCapBasePow')) {
		const x = new Decimal(activeMicroorganismEffects.chaoticbacteriaCapBasePow.mag);
		totalMultiplier = totalMultiplier.pow(x);
		document.getElementById('chaoticbacteriaCapBasePow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Bacteria cap<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'yeastbacteriaCapBasePow')) {
		const x = new Decimal(activeMicroorganismEffects.yeastbacteriaCapBasePow.mag);
		totalMultiplier = totalMultiplier.pow(x);
		document.getElementById('yeastbacteriaCapBasePow').innerHTML = `^${truncateToDecimalPlaces(x, 3)} Bacteria cap<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallResources')) {
		let x = new Decimal(activeMicroorganismEffects.amoebaallResources.mag);
		if (x.greaterThanOrEqualTo(new Decimal(15))) {
			x = x.pow(new Decimal(0.4)).clamp(x, new Decimal(Infinity));
		}
		totalMultiplier = totalMultiplier.times(x);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebasecondaryResourcePow')) {
		let x = new Decimal(activeMicroorganismEffects.amoebasecondaryResourcePow.mag);
		if (x.greaterThanOrEqualTo(new Decimal(2))) {
			x = SC(x, new Decimal(2), new Decimal(0.25));
		}
		totalMultiplier = totalMultiplier.pow(x);
	}
    gameData.bacteriaCapMult = totalMultiplier;
}

export function calculateM1Effect() {
	let totalMultiplier = new Decimal(1);
	if (gameData.wildfireLevel.greaterThanOrEqualTo(new Decimal(1))) {
        const x = new Decimal(1.01396).pow(gameData.wildfireBestScore);
        let y = x.clamp(new Decimal(1), new Decimal(Infinity));
		if (Object.hasOwn(activeMicroorganismEffects, 'bountifulwildfireReward')) {
			const w = new Decimal(activeMicroorganismEffects.bountifulwildfireReward.mag);
			y = y.times(w);
			document.getElementById('bountifulwildfireReward').innerHTML = `x${truncateToDecimalPlaces(w, 3)} Wildfire rewards<br>`;
		}
		if (Object.hasOwn(activeMicroorganismEffects, 'mossSporewildfireReward')) {
			const w = new Decimal(activeMicroorganismEffects.bountifulwildfireReward.mag);
			y = y.times(w);
			document.getElementById('mossSporewildfireReward').innerHTML = `x${truncateToDecimalPlaces(w, 3)} Wildfire rewards<br>`;
		}
		if (document.getElementById('mossyleafUpgrade2')) {
			fallenLeaves.fallenUpgradeFixer('mossy', 1);
			
			if (rootUpgradeFactor.fallenUpgrades.mossy[1].amount.greaterThanOrEqualTo(new Decimal(1))) {
				const v = new Decimal(1.3).pow(rootUpgradeFactor.fallenUpgrades.mossy[1].amount);
				y = y.times(v);
				
				document.getElementById('mossyleafUpgrade2').innerHTML = `ML2 (${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.mossy[1].amount, 3)})<br>x1.3 Wildfire rewards<br>Cost: ${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.mossy[1].cost, 3)} Fallen Leaves<br>Effect: x${truncateToDecimalPlaces(v, 3)}`;
				document.getElementById('mossyleafUpgrade2').style.padding = `11.5px 0px`;
			}
		}
		if (moss.mossMilestoneFactor.MM11Achieved) {
			const m1 = fruitUpgradeFactor.M1;
			const m3 = fruitUpgradeFactor.M3;
			let end = Decimal.log10((m1.times(m3)).plus(new Decimal(1)));
			if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossMilestoneEffect')) {
				const v = new Decimal(activeMicroorganismEffects.mossSporemossMilestoneEffect.mag);
				end = end.times(v);
			}
			y = y.times(end);
			moss.mossMilestoneFactor.MM11 = end;
		}
		totalMultiplier = totalMultiplier.times(y);
        document.getElementById('wildfireRewardCounter').innerHTML = `Unlock FU automation, Seed generation, and x${truncateToDecimalPlaces(y, 3)} M1 and M3's effects.`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossUpgradeEffect')) {
		const x = new Decimal(activeMicroorganismEffects.mossSporemossUpgradeEffect.mag);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('mossSporemossUpgradeEffect').innerHTML = `x${truncateToDecimalPlaces(x, 3)} Moss Upgrade Effect<br>`;
	}
	fruitUpgradeFactor.M1EffectMult = totalMultiplier;
}
export function calculateM1SoftcapDelay() {
	let totalDelay = new Decimal(100);
	
	if (fruitUpgradeFactor.F47Bought) {
		totalDelay = totalDelay.plus(new Decimal(150));
	}
	if (fruitUpgradeFactor.F48Bought) {
		totalDelay = totalDelay.plus(new Decimal(150));
	}
	if (fruitUpgradeFactor.F49Bought) {
		totalDelay = totalDelay.plus(new Decimal(150));
	}
	if (rootUpgradeFactor.RO15Bought) {
		totalDelay = totalDelay.plus(new Decimal(200));
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'tardigradeM1SoftcapDelay')) {
		const x = new Decimal(activeMicroorganismEffects.tardigradeM1SoftcapDelay.mag);
		totalDelay = totalDelay.plus(x);
		document.getElementById('tardigradeM1SoftcapDelay').innerHTML = `M1's effect softcap starts +${truncateToDecimalPlaces(x, 3)} later<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'bountifulM1SoftcapDelay')) {
		const x = new Decimal(activeMicroorganismEffects.bountifulM1SoftcapDelay.mag);
		totalDelay = totalDelay.plus(x);
		document.getElementById('bountifulM1SoftcapDelay').innerHTML = `M1's effect softcap starts +${truncateToDecimalPlaces(x, 3)} later<br>`;
	}
	fruitUpgradeFactor.M1SoftcapDelay = totalDelay;
}
export function calculateM3Effect() {
	let totalMultiplier = new Decimal(1);
	if (gameData.wildfireLevel.greaterThanOrEqualTo(new Decimal(1))) {
        const x = new Decimal(1.01396).pow(gameData.wildfireBestScore);
        let y = x.clamp(new Decimal(1), new Decimal(Infinity));
		if (Object.hasOwn(activeMicroorganismEffects, 'bountifulwildfireReward')) {
			const w = new Decimal(activeMicroorganismEffects.bountifulwildfireReward.mag);
			y = y.times(w);
		}
		if (Object.hasOwn(activeMicroorganismEffects, 'mossSporewildfireReward')) {
			const w = new Decimal(activeMicroorganismEffects.bountifulwildfireReward.mag);
			y = y.times(w);
		}
		if (moss.mossMilestoneFactor.MM11Achieved) {
			const m1 = fruitUpgradeFactor.M1;
			const m3 = fruitUpgradeFactor.M3;
			let end = Decimal.log10((m1.times(m3)).plus(new Decimal(1)));
			if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossMilestoneEffect')) {
				const v = new Decimal(activeMicroorganismEffects.mossSporemossMilestoneEffect.mag);
				end = end.times(v);
			}
			y = y.times(end);
		}
		if (document.getElementById('mossyleafUpgrade2')) {
			if (rootUpgradeFactor.fallenUpgrades.mossy[1].amount.greaterThanOrEqualTo(new Decimal(1))) {
				const v = new Decimal(1.3).pow(rootUpgradeFactor.fallenUpgrades.mossy[1].amount);
				y = y.times(v);
			}
		}
		totalMultiplier = totalMultiplier.times(y);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'chronalM3BaseEffect')) {
		const x = new Decimal(activeMicroorganismEffects.chronalM3BaseEffect.mag);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('chronalM3BaseEffect').innerHTML = `x${truncateToDecimalPlaces(x, 3)} M3's effect<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossUpgradeEffect')) {
		const x = new Decimal(activeMicroorganismEffects.mossSporemossUpgradeEffect.mag);
		totalMultiplier = totalMultiplier.times(x);
	}
	fruitUpgradeFactor.M3EffectMult = totalMultiplier;
}


export function calculateRepeatableCostDiscount() {
	let totalMultiplier = new Decimal(1);
	
	if (Object.hasOwn(activeMicroorganismEffects, 'algaerepeatableDiscount')) {
		const x = new Decimal(activeMicroorganismEffects.algaerepeatableDiscount.mag);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('algaerepeatableDiscount').innerHTML = `^${truncateToDecimalPlaces(x, 3)} all repeatable costs<br>`;
	}
	if (document.getElementById('marbledleafUpgrade1')) {
		fallenLeaves.fallenUpgradeFixer('marbled', 0);

		if (rootUpgradeFactor.fallenUpgrades.marbled[0].amount.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(0.975).pow(rootUpgradeFactor.fallenUpgrades.marbled[0].amount);
			totalMultiplier = totalMultiplier.times(x);
			
			document.getElementById('marbledleafUpgrade1').innerHTML = `MaL1 (${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.marbled[0].amount, 3)})<br>^0.975 all repeatable costs<br>Cost: ${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.marbled[0].cost, 3)} Marbled Leaves<br>Effect: ^${truncateToDecimalPlaces(x, 3)}`;
			document.getElementById('marbledleafUpgrade1').style.padding = `11.5px 0px`;
		}
	}
	temple.repeatableUpgradeFactor.repeatableUpgradeDiscount = totalMultiplier;
}

export function calculateLR1Cap() {
    let totalMultiplier = new Decimal(10);
    if (fruitUpgradeFactor.M5.greaterThanOrEqualTo(new Decimal(1))) {
        const x = new Decimal(2);
		let w = fruitUpgradeFactor.M5;
		if (Object.hasOwn(activeMicroorganismEffects, 'algaefreeM5M6Levels')) {
			const z = new Decimal(activeMicroorganismEffects.algaefreeM5M6Levels.mag);
			w = w.times(z);
			document.getElementById('algaefreeM5M6Levels').innerHTML = `x${truncateToDecimalPlaces(x, 3)} M5 & M6 levels<br>`;
		}
		const freeLevels = w.minus(fruitUpgradeFactor.M5);
        let y = x.times(w);
		if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossUpgradeEffect')) {
			const z = new Decimal(activeMicroorganismEffects.mossSporemossUpgradeEffect.mag);
			y = y.times(z);
		}
        totalMultiplier = totalMultiplier.plus(y);
		if (freeLevels.greaterThanOrEqualTo(new Decimal(1))) {
			document.getElementById('M5').innerHTML = `M5<br>Vermeil (${truncateToDecimalPlaces(fruitUpgradeFactor.M5, 3)} + ${truncateToDecimalPlaces(freeLevels, 3)})<br>+2 to LR1 cap<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M5CostCalculation(), 3)} Moss<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
		}
		else {
			document.getElementById('M5').innerHTML = `M5<br>Vermeil (${truncateToDecimalPlaces(fruitUpgradeFactor.M5, 3)})<br>+2 to LR1 cap<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M5CostCalculation(), 3)} Moss<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
		}
    }
    if (entropyUpgradeFactor.E23Bought) {
        const x = new Decimal(15);
        totalMultiplier = totalMultiplier.plus(x);
    }
    if (entropyUpgradeFactor.E27Bought) {
        const x = new Decimal(10);
        totalMultiplier = totalMultiplier.plus(x);
    }
	let totalGlutamate = entropyUpgradeFactor.glutamate.plus(entropyUpgradeFactor.glutamateFree);
    if (totalGlutamate.greaterThanOrEqualTo(new Decimal(1))) {
		const x = entropyUpgradeFactor.glutamateEffect;
		totalMultiplier = totalMultiplier.plus(x);
    }
    temple.repeatableUpgradeFactor.LR1Cap = totalMultiplier.trunc();
}

export function calculateLR1Effect() {
    let totalMultiplier = new Decimal(2);
    if (fruitUpgradeFactor.M6.greaterThanOrEqualTo(new Decimal(1))) {
        const x = new Decimal(0.5);
		let w = fruitUpgradeFactor.M6;
		if (Object.hasOwn(activeMicroorganismEffects, 'algaefreeM5M6Levels')) {
			const z = new Decimal(activeMicroorganismEffects.algaefreeM5M6Levels.mag);
			w = w.times(z);
		}
        let y = x.times(w);
		const freeLevels = w.minus(fruitUpgradeFactor.M6)
		if (Object.hasOwn(activeMicroorganismEffects, 'mossSporemossUpgradeEffect')) {
			const z = new Decimal(activeMicroorganismEffects.mossSporemossUpgradeEffect.mag);
			y = y.times(z);
		}
        totalMultiplier = totalMultiplier.plus(y);
		fruitUpgradeFactor.M6EffectTotal = y;
		if (freeLevels.greaterThanOrEqualTo(new Decimal(1))) {
			document.getElementById('M6').innerHTML = `M6<br>Gild (${truncateToDecimalPlaces(fruitUpgradeFactor.M6, 3)} + ${truncateToDecimalPlaces(freeLevels, 3)})<br>+0.5 to LR1 effect<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M6CostCalculation(), 3)} Moss<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
		}
		else {
			document.getElementById('M6').innerHTML = `M6<br>Gild (${truncateToDecimalPlaces(fruitUpgradeFactor.M6, 3)})<br>+0.5 to LR1 effect<br>per upgrade<br>Requires ${truncateToDecimalPlaces(moss.M6CostCalculation(), 3)} Moss<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
		}
    }
    if (entropyUpgradeFactor.E25Bought) {
        const x = gameData.entropy;
        const y = x.div(new Decimal(1e12));
        const z = y.plus(new Decimal(1));
        const w = Decimal.log10(z);
        totalMultiplier = totalMultiplier.plus(w);
        document.getElementById('E25').innerHTML = `E25 (Bought)<br>Statue Power II<br>Entropy boosts LR1's effect<br>Cost: 1e18 Entropy<br>Effect: +${truncateToDecimalPlaces(w, 3)}`;
    }
	if (Object.hasOwn(activeMicroorganismEffects, 'livelyLR1Effect')) {
		const x = new Decimal(activeMicroorganismEffects.livelyLR1Effect.mag);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('livelyLR1Effect').innerHTML = `x${truncateToDecimalPlaces(x, 3)} LR1's effect<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'algaeLSFR1Effect')) {
		const x = new Decimal(activeMicroorganismEffects.algaeLSFR1Effect.mag);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('algaeLSFR1Effect').innerHTML = `x${truncateToDecimalPlaces(x, 3)} L, S, and F first repeatable effects<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'algaeM6AllEffect')) {
		const x = new Decimal(activeMicroorganismEffects.algaeM6AllEffect.mag);
		const y = (fruitUpgradeFactor.M6EffectTotal.pow(x)).clamp(new Decimal(1), new Decimal(Infinity));
		totalMultiplier = totalMultiplier.times(y);
		document.getElementById('algaeM6AllEffect').innerHTML = `x${truncateToDecimalPlaces(y, 3)} all repeatable effects<br>`;
	}
	if (document.getElementById('marbledleafMilestone2')) {
		if (rootUpgradeFactor.fallenMilestones.marbled[1].achieved) {
			totalMultiplier = totalMultiplier.pow(new Decimal(1000));
		}
	}
    temple.repeatableUpgradeFactor.LR1Effect = totalMultiplier;
}

export function calculateLR2Cap() {
    let totalMultiplier = new Decimal(10);
	
	if (seedUpgradeFactor.S51Bought) {
		if (fruitUpgradeFactor.M5.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(0.2);
			let w = fruitUpgradeFactor.M5;
			if (Object.hasOwn(activeMicroorganismEffects, 'algaefreeM5M6Levels')) {
				const z = new Decimal(activeMicroorganismEffects.algaefreeM5M6Levels.mag);
				w = w.times(z);
			}
			const y = x.times(w);
			totalMultiplier = totalMultiplier.plus(y);
			document.getElementById('S51').innerHTML = `S51 (Bought)<br>Statue Power VII<br>Every five M5 Levels, +1 to LR2's cap<br>Cost: 1e5000 Seeds<br>Effect: +${truncateToDecimalPlaces(y.trunc(), 3)}`;
		}
		else {
			document.getElementById('S51').innerHTML = `S51 (Bought)<br>Statue Power VII<br>Every five M5 Levels, +1 to LR2's cap<br>Cost: 1e5000 Seeds<br>Effect: +0`;
		}
	}
	if (rootUpgradeFactor.RO11Bought) {
		totalMultiplier = totalMultiplier.plus(new Decimal(15));
	}
	if (leafUpgradeFactor.L64Bought) {
		totalMultiplier = totalMultiplier.plus(new Decimal(20));
		document.getElementById('L64').innerHTML = `L64 (Bought)<br>Statue Power IX<br>+20 levels to LR2's cap<br>Cost: 1e25000 Leaves`;
	}
	if (seedUpgradeFactor.S60Bought) {
		const x = entropyUpgradeFactor.glutamateEffect;
		const y = x.pow(new Decimal(0.5));
		totalMultiplier = totalMultiplier.plus(y);
		document.getElementById('S60').innerHTML = `S60 (Bought)<br>Statue Power XIX<br>Glutamate's effect^0.5 affects<br>L,S, and F second repeatable caps<br>Cost: e1e7 Seeds<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
	}
    temple.repeatableUpgradeFactor.LR2Cap = totalMultiplier.trunc();
}

export function calculateLR2Effect() {
    let totalMultiplier = new Decimal(0.05);
	if (Object.hasOwn(activeMicroorganismEffects, 'livelyLR2Effect')) {
		const x = new Decimal(activeMicroorganismEffects.livelyLR2Effect.mag);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('livelyLR2Effect').innerHTML = `x${truncateToDecimalPlaces(x, 3)} LR2's effect<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'algaeM6AllEffect')) {
		const x = new Decimal(activeMicroorganismEffects.algaeM6AllEffect.mag);
		const y = fruitUpgradeFactor.M6EffectTotal.pow(x);
		totalMultiplier = totalMultiplier.times(y.clamp(new Decimal(1), new Decimal(Infinity)));
	}
    temple.repeatableUpgradeFactor.LR2Effect = totalMultiplier;
}

export function calculateLR3Cap() {
    let totalMultiplier = new Decimal(10);
	if (leafUpgradeFactor.L69Bought) {
		const x = new Decimal(10);
		totalMultiplier = totalMultiplier.plus(x);
		document.getElementById('L69').innerHTML = `L69 (Bought)<br>Statue Power XIII<br>+10 levels to LR3 and SR3's caps<br>Cost: e1.2e6 Leaves`;
	}
	if (seedUpgradeFactor.S54Bought) {
		if (fruitUpgradeFactor.M5.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(0.001);
			let w = fruitUpgradeFactor.M5;
			if (Object.hasOwn(activeMicroorganismEffects, 'algaefreeM5M6Levels')) {
				const z = new Decimal(activeMicroorganismEffects.algaefreeM5M6Levels.mag);
				w = w.times(z);
			}
			const y = x.times(w);
			totalMultiplier = totalMultiplier.plus(y);
			document.getElementById('S54').innerHTML = `S54 (Bought)<br>Statue Power XIII<br>Every 1000 M5 Levels, +1 to LR3's cap<br>Cost: 1e100000 Seeds<br>Effect: +${truncateToDecimalPlaces(y.trunc(), 3)}`;
		}
		else {
			document.getElementById('S54').innerHTML = `S54 (Bought)<br>Statue Power XIII<br>Every 1000 M5 Levels, +1 to LR3's cap<br>Cost: 1e100000 Seeds<br>Effect: +0`;
		}
	}
	if (seedUpgradeFactor.S61Bought) {
		const x = entropyUpgradeFactor.glutamateEffect;
		const y = x.pow(new Decimal(0.25));
		totalMultiplier = totalMultiplier.plus(y);
		document.getElementById('S61').innerHTML = `S61 (Bought)<br>Statue Power XX<br>Glutamate's effect^0.25 affects<br>L,S, and F third repeatable caps<br>Cost: e1.2e7 Seeds<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
	}
    temple.repeatableUpgradeFactor.LR3Cap = totalMultiplier.trunc();
}

export function calculateLR3Effect() {
    let totalMultiplier = new Decimal(1.1);
	if (Object.hasOwn(activeMicroorganismEffects, 'algaeM6AllEffect')) {
		const x = new Decimal(activeMicroorganismEffects.algaeM6AllEffect.mag);
		const y = fruitUpgradeFactor.M6EffectTotal.pow(x);
		totalMultiplier = totalMultiplier.times(y.clamp(new Decimal(1), new Decimal(Infinity)));
	}
    temple.repeatableUpgradeFactor.LR3Effect = totalMultiplier;
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
			let w = fruitUpgradeFactor.M5;
			if (Object.hasOwn(activeMicroorganismEffects, 'algaefreeM5M6Levels')) {
				const z = new Decimal(activeMicroorganismEffects.algaefreeM5M6Levels.mag);
				w = w.times(z);
			}
			const y = x.times(w);
			totalMultiplier = totalMultiplier.plus(y);
		document.getElementById('S48').innerHTML = `S48 (Bought)<br>Statue Power VI<br>Every M5 Level, +1 to SR1's cap<br>Cost: 2.22e2222 Seeds<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
		}
		else {
			document.getElementById('S48').innerHTML = `S48 (Bought)<br>Statue Power VI<br>Every M5 Level, +1 to SR1's cap<br>Cost: 2.22e2222 Seeds<br>Effect: +0`;	
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
			let w = fruitUpgradeFactor.M6;
			if (Object.hasOwn(activeMicroorganismEffects, 'algaefreeM5M6Levels')) {
				const z = new Decimal(activeMicroorganismEffects.algaefreeM5M6Levels.mag);
				w = w.times(z);
			}
			const y = x.times(w);
			totalMultiplier = totalMultiplier.plus(y);
			document.getElementById('S47').innerHTML = `S47 (Bought)<br>Statue Power V<br>Every M6 Level, +0.15 to SR1's effect<br>Cost: 1e2000 Seeds<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
		}
		else {
			document.getElementById('S47').innerHTML = `S47 (Bought)<br>Statue Power V<br>Every M6 Level, +0.15 to SR1's effect<br>Cost: 1e2000 Seeds<br>Effect: +0`;
		}
		if (rootUpgradeFactor.RO11Bought) {
			totalMultiplier = totalMultiplier.plus(new Decimal(15));
		}
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'groundedSR1Effect')) {
		const x = new Decimal(activeMicroorganismEffects.groundedSR1Effect.mag);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('groundedSR1Effect').innerHTML = `x${truncateToDecimalPlaces(x, 3)} SR1's effect<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'algaeLSFR1Effect')) {
		const x = new Decimal(activeMicroorganismEffects.algaeLSFR1Effect.mag);
		totalMultiplier = totalMultiplier.times(x);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'algaeM6AllEffect')) {
		const x = new Decimal(activeMicroorganismEffects.algaeM6AllEffect.mag);
		const y = fruitUpgradeFactor.M6EffectTotal.pow(x);
		totalMultiplier = totalMultiplier.times(y.clamp(new Decimal(1), new Decimal(Infinity)));
	}
	if (document.getElementById('marbledleafUpgrade2')) {
		fallenLeaves.fallenUpgradeFixer('marbled', 1);

		if (rootUpgradeFactor.fallenUpgrades.marbled[1].amount.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(1.3).pow(rootUpgradeFactor.fallenUpgrades.marbled[1].amount);
			totalMultiplier = totalMultiplier.pow(x);
			
			document.getElementById('marbledleafUpgrade2').innerHTML = `MaL2 (${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.marbled[1].amount, 3)})<br>^1.3 SR1's effect<br>Cost: ${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.marbled[1].cost, 3)} Marbled Leaves<br>Effect: ^${truncateToDecimalPlaces(x, 3)}`;
			document.getElementById('marbledleafUpgrade2').style.padding = `11.5px 0px`;
		}
	}
    temple.repeatableUpgradeFactor.SR1Effect = totalMultiplier;
}

export function calculateSR2Cap() {
    let totalMultiplier = new Decimal(10);
	if (rootUpgradeFactor.RO12Bought) {
		totalMultiplier = totalMultiplier.plus(new Decimal(15));
	}
	if (seedUpgradeFactor.S52Bought) {
		if (fruitUpgradeFactor.M5.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(0.2);
			let w = fruitUpgradeFactor.M5;
			if (Object.hasOwn(activeMicroorganismEffects, 'algaefreeM5M6Levels')) {
				const z = new Decimal(activeMicroorganismEffects.algaefreeM5M6Levels.mag);
				w = w.times(z);
			}
			const y = x.times(w);
			totalMultiplier = totalMultiplier.plus(y);
		document.getElementById('S52').innerHTML = `S52 (Bought)<br>Statue Power X<br>Every five M5 Levels, +1 to SR2's cap<br>Cost: 1e10000 Seeds<br>Effect: +${truncateToDecimalPlaces(y.trunc(), 3)}`;
		}
		else {
			document.getElementById('S52').innerHTML = `S52 (Bought)<br>Statue Power X<br>Every five M5 Levels, +1 to SR2's cap<br>Cost: 1e10000 Seeds<br>Effect: +0`;
		}
	}
	if (seedUpgradeFactor.S60Bought) {
		const x = entropyUpgradeFactor.glutamateEffect;
		const y = x.pow(new Decimal(0.5));
		totalMultiplier = totalMultiplier.plus(y);
	}
    temple.repeatableUpgradeFactor.SR2Cap = totalMultiplier.trunc();
}

export function calculateSR2Effect() {
    let totalMultiplier = new Decimal(1.5);
	
	if (Object.hasOwn(activeMicroorganismEffects, 'chronalSR2Effect')) {
		const x = new Decimal(activeMicroorganismEffects.chronalSR2Effect.mag);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('chronalSR2Effect').innerHTML = `x${truncateToDecimalPlaces(x, 3)} SR2's effect<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'algaeM6AllEffect')) {
		const x = new Decimal(activeMicroorganismEffects.algaeM6AllEffect.mag);
		const y = fruitUpgradeFactor.M6EffectTotal.pow(x);
		totalMultiplier = totalMultiplier.times(y.clamp(new Decimal(1), new Decimal(Infinity)));
	}
    temple.repeatableUpgradeFactor.SR2Effect = totalMultiplier;
}

export function calculateSR3Cap() {
    let totalMultiplier = new Decimal(10);
	if (leafUpgradeFactor.L69Bought) {
		const x = new Decimal(10);
		totalMultiplier = totalMultiplier.plus(x);
		document.getElementById('L69').innerHTML = `L69 (Bought)<br>Statue Power XII<br>+10 levels to LR3 and SR3's caps<br>Cost: e1.2e6 Leaves`;
	}
	if (seedUpgradeFactor.S57Bought) {
		if (fruitUpgradeFactor.M5.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(1250);
			let w = fruitUpgradeFactor.M5;
			if (Object.hasOwn(activeMicroorganismEffects, 'algaefreeM5M6Levels')) {
				const z = new Decimal(activeMicroorganismEffects.algaefreeM5M6Levels.mag);
				w = w.times(z);
			}
			const y = w.div(x);
			totalMultiplier = totalMultiplier.plus(y);
			document.getElementById('S57').innerHTML = `S57 (Bought)<br>Statue Power XIV<br>Every 1250 M5 Levels, +1 to SR3's cap<br>Cost: e1.25e6 Seeds<br>Effect: +${truncateToDecimalPlaces(y.trunc(), 3)}`;
		}
		else {
			document.getElementById('S57').innerHTML = `S57 (Bought)<br>Statue Power XIV<br>Every 1250 M5 Levels, +1 to SR3's cap<br>Cost: e1.25e6 Seeds<br>Effect: +0`;
		}
	}
	if (seedUpgradeFactor.S61Bought) {
		const x = entropyUpgradeFactor.glutamateEffect;
		const y = x.pow(new Decimal(0.25));
		totalMultiplier = totalMultiplier.plus(y);
	}
    temple.repeatableUpgradeFactor.SR3Cap = totalMultiplier.trunc();
}

export function calculateSR3Effect() {
    let totalMultiplier = new Decimal(0.005);
	if (Object.hasOwn(activeMicroorganismEffects, 'algaeM6AllEffect')) {
		const x = new Decimal(activeMicroorganismEffects.algaeM6AllEffect.mag);
		const y = fruitUpgradeFactor.M6EffectTotal.pow(x);
		totalMultiplier = totalMultiplier.times(y.clamp(new Decimal(1), new Decimal(Infinity)));
	}
    temple.repeatableUpgradeFactor.SR3Effect = totalMultiplier;
}

export function calculateFR1Cap() {
    let totalMultiplier = new Decimal(10);
    if (entropyUpgradeFactor.glutamate.greaterThanOrEqualTo(new Decimal(1))) {
		const x = entropyUpgradeFactor.glutamateEffect;
		totalMultiplier = totalMultiplier.plus(x);
    }
	if (entropyUpgradeFactor.glutamateFree.greaterThan(new Decimal(0))) {
		const y = entropyUpgradeFactor.glutamateEffect;
		totalMultiplier = totalMultiplier.plus(y);
		document.getElementById("glutamateCounter").innerHTML = `${truncateToDecimalPlaces(entropyUpgradeFactor.glutamate, 3)} (+${truncateToDecimalPlaces(entropyUpgradeFactor.glutamateFree, 3)}) Glutamate Proteins<br>+${truncateToDecimalPlaces(y, 3)} to LR1, SR1, and FR1 caps`
	}
    temple.repeatableUpgradeFactor.FR1Cap = totalMultiplier.trunc();
}

export function calculateFR1Effect() {
    let totalMultiplier = new Decimal(1);
	if (rootUpgradeFactor.RO3Bought) {
		const x = new Decimal(2.5);
		totalMultiplier = totalMultiplier.times(x);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'bountifulFR1Effect')) {
		const x = new Decimal(activeMicroorganismEffects.bountifulFR1Effect.mag);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('bountifulFR1Effect').innerHTML = `x${truncateToDecimalPlaces(x, 3)} FR1's effect<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'algaeLSFR1Effect')) {
		const x = new Decimal(activeMicroorganismEffects.algaeLSFR1Effect.mag);
		totalMultiplier = totalMultiplier.times(x);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'algaeM6AllEffect')) {
		const x = new Decimal(activeMicroorganismEffects.algaeM6AllEffect.mag);
		const y = fruitUpgradeFactor.M6EffectTotal.pow(x);
		totalMultiplier = totalMultiplier.times(y.clamp(new Decimal(1), new Decimal(Infinity)));
	}
    temple.repeatableUpgradeFactor.FR1Effect = totalMultiplier;
}

export function calculateFR2Cap() {
    let totalMultiplier = new Decimal(10);
	if (seedUpgradeFactor.S53Bought) {
		if (fruitUpgradeFactor.M5.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(30);
			let w = fruitUpgradeFactor.M5;
			if (Object.hasOwn(activeMicroorganismEffects, 'algaefreeM5M6Levels')) {
				const z = new Decimal(activeMicroorganismEffects.algaefreeM5M6Levels.mag);
				w = w.times(z);
			}
			const y = w.div(x);
			totalMultiplier = totalMultiplier.plus(y);
		document.getElementById('S53').innerHTML = `S53 (Bought)<br>Statue Power XI<br>Every 30 M5 Levels, +1 to FR2's cap<br>Cost: 1e50000 Seeds<br>Effect: +${truncateToDecimalPlaces(y.trunc(), 3)}`;
		}
		else {
			document.getElementById('S53').innerHTML = `S53 (Bought)<br>Statue Power XI<br>Every 30 M5 Levels, +1 to FR2's cap<br>Cost: 1e50000 Seeds<br>Effect: +0`;
		}
	}
	if (seedUpgradeFactor.S60Bought) {
		const x = entropyUpgradeFactor.glutamateEffect;
		const y = x.pow(new Decimal(0.5));
		totalMultiplier = totalMultiplier.plus(y);
	}
    temple.repeatableUpgradeFactor.FR2Cap = totalMultiplier.trunc();
}

export function calculateFR2Effect() {
    let totalMultiplier = new Decimal(0.005);
	if (Object.hasOwn(activeMicroorganismEffects, 'algaeM6AllEffect')) {
		const x = new Decimal(activeMicroorganismEffects.algaeM6AllEffect.mag);
		const y = fruitUpgradeFactor.M6EffectTotal.pow(x);
		totalMultiplier = totalMultiplier.times(y.clamp(new Decimal(1), new Decimal(Infinity)));
	}
    temple.repeatableUpgradeFactor.FR2Effect = totalMultiplier;
}

export function calculateFR3Cap() {
    let totalMultiplier = new Decimal(10);
	
	if (seedUpgradeFactor.S58Bought) {
		if (fruitUpgradeFactor.M5.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(1500);
			let w = fruitUpgradeFactor.M5;
			if (Object.hasOwn(activeMicroorganismEffects, 'algaefreeM5M6Levels')) {
				const z = new Decimal(activeMicroorganismEffects.algaefreeM5M6Levels.mag);
				w = w.times(z);
			}
			const y = w.div(x);
			totalMultiplier = totalMultiplier.plus(y);
			document.getElementById('S58').innerHTML = `S58 (Bought)<br>Statue Power XV<br>Every 1500 M5 Levels, +1 to FR3's cap<br>Cost: e2.5e6 Seeds<br>Effect: +${truncateToDecimalPlaces(y.trunc(), 3)}`;
		}
		else {
			document.getElementById('S58').innerHTML = `S58 (Bought)<br>Statue Power XV<br>Every 1500 M5 Levels, +1 to FR3's cap<br>Cost: e2.5e6 Seeds<br>Effect: +0`;
		}
	}
	if (seedUpgradeFactor.S61Bought) {
		const x = entropyUpgradeFactor.glutamateEffect;
		const y = x.pow(new Decimal(0.25));
		totalMultiplier = totalMultiplier.plus(y);
	}
	
    temple.repeatableUpgradeFactor.FR3Cap = totalMultiplier.trunc();
}

export function calculateFR3Effect() {
    let totalMultiplier = new Decimal(7.5);
	if (fruitUpgradeFactor.F52Bought) {
		const x = new Decimal(2.5);
		totalMultiplier = totalMultiplier.times(x);
	}
	if (fruitUpgradeFactor.F53Bought) {
		const x = new Decimal(1.5);
		totalMultiplier = totalMultiplier.times(x);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'algaeM6AllEffect')) {
		const x = new Decimal(activeMicroorganismEffects.algaeM6AllEffect.mag);
		const y = fruitUpgradeFactor.M6EffectTotal.pow(x);
		totalMultiplier = totalMultiplier.times(y.clamp(new Decimal(1), new Decimal(Infinity)));
	}
    temple.repeatableUpgradeFactor.FR3Effect = totalMultiplier;
}


export function calculateER1Cap() {
    let totalMultiplier = new Decimal(10);
	if (entropyUpgradeFactor.E46Bought) {
		const x = new Decimal(40);
		totalMultiplier = totalMultiplier.plus(x);
	}
	if (entropyUpgradeFactor.E50Bought) {
		if (fruitUpgradeFactor.M5.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(7500);
			let w = fruitUpgradeFactor.M5;
			if (Object.hasOwn(activeMicroorganismEffects, 'algaefreeM5M6Levels')) {
				const z = new Decimal(activeMicroorganismEffects.algaefreeM5M6Levels.mag);
				w = w.times(z);
			}
			const y = w.div(x);
			totalMultiplier = totalMultiplier.plus(y);
			document.getElementById('E50').innerHTML = `E50 (Bought)<br>Statue Power XXI<br>Every 7500 M5 Levels, +1 to ER1's cap<br>Cost: 1e500000 Entropy<br>Effect: +${truncateToDecimalPlaces(y.trunc(), 3)}`;
		}
		else {
			document.getElementById('E50').innerHTML = `E50 (Bought)<br>Statue Power XXI<br>Every 7500 M5 Levels, +1 to ER1's cap<br>Cost: 1e500000 Entropy<br>Effect: +0`;
		}
	}
    temple.repeatableUpgradeFactor.ER1Cap = totalMultiplier.trunc();
}

export function calculateER1Effect() {
    let totalMultiplier = new Decimal(0.008);
	if (Object.hasOwn(activeMicroorganismEffects, 'algaeM6AllEffect')) {
		const x = new Decimal(activeMicroorganismEffects.algaeM6AllEffect.mag);
		const y = fruitUpgradeFactor.M6EffectTotal.pow(x);
		totalMultiplier = totalMultiplier.times(y.clamp(new Decimal(1), new Decimal(Infinity)));
	}
    temple.repeatableUpgradeFactor.ER1Effect = totalMultiplier;
}


export function calculateSupercaps() {
	let totalMultiplier = new Decimal(0);
	let totalLeafMultiplier = new Decimal(0);
	let totalLeafSuperMultiplier = new Decimal(1);
	let totalSeedMultiplier = new Decimal(0);
	let totalSeedSuperMultiplier = new Decimal(1);
	let totalFruitMultiplier = new Decimal(0);
	let totalFruitSuperMultiplier = new Decimal(1);
	
	let totalArganine = entropyUpgradeFactor.arganine.plus(entropyUpgradeFactor.arganineFree);
	if (totalArganine.greaterThanOrEqualTo(new Decimal(1))) {
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
	if (leafUpgradeFactor.L65Bought) {
		const x = Decimal.log10(fruitUpgradeFactor.M1.plus(new Decimal(1)));
		const y = x.div(new Decimal(1.5));
		let z = y.clamp(new Decimal(0), new Decimal(Infinity));
		if (document.getElementById('mossyleafMilestone1')) {
			if (rootUpgradeFactor.fallenMilestones.mossy[0].achieved) {
				z = z.times(new Decimal(2));
			}
		}
		totalMultiplier = totalMultiplier.plus(z);
		document.getElementById('L65').innerHTML = `L65 (Bought)<br>Moss Power<br>M1 adds to all supercap roots<br>Cost: 1e100000 Leaves<br>Effect: +${truncateToDecimalPlaces(z, 3)}`;
	}
	if (seedUpgradeFactor.S56Bought) {
		const x = Decimal.log10(gameData.treeAge.plus(new Decimal(1)));
		const y = Decimal.log10(x.plus(new Decimal(1)));
		const z = y.div(new Decimal(2));
		const w = z.clamp(new Decimal(0), new Decimal(Infinity));
		totalMultiplier = totalMultiplier.plus(w);
		document.getElementById('S56').innerHTML = `S56 (Bought)<br>Chronal Power<br>TAS adds to all supercap roots<br>Cost: 1e800000 Seeds<br>Effect: +${truncateToDecimalPlaces(w, 3)}`;
	}
	if (fruitUpgradeFactor.F51Bought) {
		const x = gameData.totalFertilizers.pow(new Decimal(0.125));
		totalMultiplier = totalMultiplier.plus(x);
		document.getElementById('F51').innerHTML = `F51 (Bought)<br>Composter Power<br>Total Fertilizers adds to all supercap roots<br>Cost: e2.5e6 Fruits<br>Effect: +${truncateToDecimalPlaces(x, 3)}`;
	}
	
	if (Object.hasOwn(activeMicroorganismEffects, 'reinforcedallSupercaps')) {
		const x = new Decimal(activeMicroorganismEffects.reinforcedallSupercaps.mag);
		totalMultiplier = totalMultiplier.plus(x);
		document.getElementById('reinforcedallSupercaps').innerHTML = `+${truncateToDecimalPlaces(x, 3)} to all supercap roots<br>`;
	}
	
	if (Object.hasOwn(activeMicroorganismEffects, 'tardigradesupercapMult')) {
		let w = new Decimal(activeMicroorganismEffects.tardigradesupercapMult.mag);
		if (w.greaterThanOrEqualTo(new Decimal(10))) {
			w = SC(w, new Decimal(10), new Decimal(0.1));
			document.getElementById('tardigradesupercapMult').innerHTML = `x<span class="softcap">${truncateToDecimalPlaces(w, 3)}</span> all supercap roots<br>`;
		} 
		else {
			document.getElementById('tardigradesupercapMult').innerHTML = `x${truncateToDecimalPlaces(w, 3)} all supercap roots<br>`;
		}
		totalLeafSuperMultiplier = totalLeafSuperMultiplier.times(w);
		totalSeedSuperMultiplier = totalSeedSuperMultiplier.times(w);
		totalFruitSuperMultiplier = totalFruitSuperMultiplier.times(w);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'groundedseedSupercapMult')) {
		const x = new Decimal(activeMicroorganismEffects.groundedseedSupercapMult.mag);
		if (x.greaterThanOrEqualTo(new Decimal(10))) {
			let u = SC(x, new Decimal(10), new Decimal(0.1));
			document.getElementById('groundedseedSupercapMult').innerHTML = `x<span class="softcap">${truncateToDecimalPlaces(u, 3)}</span> Seed supercap root<br>`;
		} 
		else {
			document.getElementById('groundedseedSupercapMult').innerHTML = `x${truncateToDecimalPlaces(x, 3)} Seed supercap root<br>`;
		}
		totalSeedSuperMultiplier = totalSeedSuperMultiplier.times(x);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'bountifulfruitSupercapMult')) {
		const x = new Decimal(activeMicroorganismEffects.bountifulfruitSupercapMult.mag);
		if (x.greaterThanOrEqualTo(new Decimal(10))) {
			let u = SC(x, new Decimal(10), new Decimal(0.1));
			document.getElementById('bountifulfruitSupercapMult').innerHTML = `x<span class="softcap">${truncateToDecimalPlaces(u, 3)}</span> Fruit supercap root<br>`;
		} 
		else {
			document.getElementById('bountifulfruitSupercapMult').innerHTML = `x${truncateToDecimalPlaces(x, 3)} Fruit supercap root<br>`;
		}
		totalFruitSuperMultiplier = totalFruitSuperMultiplier.times(x);
	}
	let FL2BaseMult = new Decimal(0.025);
	if (document.getElementById('fallenleafUpgrade4')) {
		fallenLeaves.fallenUpgradeFixer('fallen', 3);
		
		if (rootUpgradeFactor.fallenUpgrades.fallen[3].amount.greaterThanOrEqualTo(new Decimal(1))) {
			let base = new Decimal(0.002);
			if (document.getElementById('fallenleafMilestone3')) {
				if (rootUpgradeFactor.fallenMilestones.fallen[2].achieved) {
					const cap = fallenLeaves.fallenLeaves.fallen.cap;
					const effect = cap.pow(new Decimal(0.2));
					base = base.times(effect);
					document.getElementById('fallenleafMilestone3').innerHTML = `<span class="bold">150 cap</span><br>FL's cap boosts FL4's effect<br>Effect: x${truncateToDecimalPlaces(effect, 3)}`;
				}
			}
			const x = base.times(rootUpgradeFactor.fallenUpgrades.fallen[3].amount);
			
			FL2BaseMult = FL2BaseMult.plus(x);
			
			document.getElementById('fallenleafUpgrade4').innerHTML = `FL4 (${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.fallen[3].amount, 3)})<br>+${truncateToDecimalPlaces(base, 3)} FL2's base effect<br>Cost: ${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.fallen[3].cost, 3)} Fallen Leaves<br>Effect: +${truncateToDecimalPlaces(x, 3)}`;
			document.getElementById('fallenleafUpgrade4').style.padding = `11.5px 0px`;
		}
	}
	if (document.getElementById('fallenleafUpgrade2')) {
		fallenLeaves.fallenUpgradeFixer('fallen', 1);
		
		if (rootUpgradeFactor.fallenUpgrades.fallen[1].amount.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(1);
			const y = x.plus(FL2BaseMult.times(rootUpgradeFactor.fallenUpgrades.fallen[1].amount));
			totalLeafSuperMultiplier = totalLeafSuperMultiplier.times(y);
			
		document.getElementById('fallenleafUpgrade2').innerHTML = `FL2 (${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.fallen[1].amount, 3)})<br>+x${truncateToDecimalPlaces(FL2BaseMult, 3)} Leaf supercap root<br>Cost: ${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.fallen[1].cost, 3)} Fallen Leaves<br>Effect: x${truncateToDecimalPlaces(y, 3)}`;
			document.getElementById('fallenleafUpgrade2').style.padding = `11.5px 0px`;
		}
	}
	if (document.getElementById('fallenleafMilestone1')) {
		if (rootUpgradeFactor.fallenMilestones.fallen[0].achieved) {
			const x = new Decimal(1.1);
			totalLeafSuperMultiplier = totalLeafSuperMultiplier.times(x);
		}
	}
	
	if (gameData.fallLevel.greaterThan(new Decimal(1))) {
		let x = gameData.fallReward;
		if (document.getElementById('fallenleafUpgrade5')) {
			fallenLeaves.fallenUpgradeFixer('fallen', 4);
			
			if (rootUpgradeFactor.fallenUpgrades.fallen[4].amount.greaterThanOrEqualTo(new Decimal(1))) {
					const y = new Decimal(1);
					const z = new Decimal(0.04).times(rootUpgradeFactor.fallenUpgrades.fallen[4].amount);
					const w = y.plus(z);
					x = x.times(w)
					
					document.getElementById('fallenleafUpgrade5').innerHTML = `FL5 (${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.fallen[4].amount, 3)})<br>+x0.04 Fall rewards<br>Cost: ${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.fallen[4].cost, 3)} Fallen Leaves<br>Effect: x${truncateToDecimalPlaces(w, 3)}`;
					document.getElementById('fallenleafUpgrade5').style.padding = `11.5px 0px`;
			}
		}
		totalLeafSuperMultiplier = totalLeafSuperMultiplier.times(x);
		document.getElementById('fallRewardCounter').innerHTML = `Unlock Fallen Leaves and x${truncateToDecimalPlaces(x, 3)} Leaf supercap root`;
	}
	
	if (gameData.leavesIsSupercapped) {
		const x = Decimal.log10(gameData.leaves.plus(new Decimal(1)));
		const y = new Decimal(-0.0002).times(x);
		const z = y.plus(new Decimal(1.4932));
		
		const w = totalMultiplier;
		let v = w.plus(totalLeafMultiplier);
		v = v.times(totalLeafSuperMultiplier);
		v = v.plus(z);
		if (v.lessThan(new Decimal(0.001))) {
			v = new Decimal(0);
		}
		
		const u = v.clamp(new Decimal(0), new Decimal(1));
		gameData.baseLeafSupercapFactor = u;
		document.getElementById('leafSupercapInfo').innerHTML = `The Leaf supercap starts at 1.08e2466 (^${truncateToDecimalPlaces(u, 3)})`;
	}
	if (gameData.leavesIsSupercapped) {
		const x = Decimal.log10(gameData.leaves.plus(new Decimal(1)));
		const y = new Decimal(1.4932);
		
		const w = totalMultiplier;
		let v = w.plus(totalLeafMultiplier);
		v = v.times(totalLeafSuperMultiplier);
		v = v.plus(y);
		v = v.times(new Decimal(5000));
		
		const u = new Decimal(10).pow(v);
		gameData.leafMaximumStart = u;
		document.getElementById('leafMaximumInfo').innerHTML = `You cannot have over ${truncateToDecimalPlaces(u, 3)} Leaves<br>(based on when your Leaf supercap root hits ^0)`;
	}
	if (gameData.seedsIsSupercapped) {
		const x = Decimal.log10(gameData.seeds.plus(new Decimal(1)));
		const y = new Decimal(-0.0002).times(x);
		const z = y.plus(new Decimal(1.4932));
		
		const w = totalMultiplier;
		let v = w.plus(totalSeedMultiplier);
		v = v.times(totalSeedSuperMultiplier);
		v = v.plus(z);
		if (v.lessThan(new Decimal(0.001))) {
			v = new Decimal(0);
		}
		
		const u = v.clamp(new Decimal(0), new Decimal(1));
		gameData.baseSeedSupercapFactor = u;
		document.getElementById('seedSupercapInfo').innerHTML = `The Seed supercap starts at 1.08e2466 (^${truncateToDecimalPlaces(u, 3)})`;
	}
	if (gameData.seedsIsSupercapped) {
		const x = Decimal.log10(gameData.seeds.plus(new Decimal(1)));
		const y = new Decimal(1.4932);
		
		const w = totalMultiplier;
		let v = w.plus(totalSeedMultiplier);
		v = v.times(totalSeedSuperMultiplier);
		v = v.plus(y);
		v = v.times(new Decimal(5000));
		
		const u = new Decimal(10).pow(v);
		gameData.seedMaximumStart = u;
		document.getElementById('seedMaximumInfo').innerHTML = `You cannot have over ${truncateToDecimalPlaces(u, 3)} Seeds<br>(based on when your Seed supercap root hits ^0)`;
	}
	if (gameData.fruitsIsSupercapped) {
		const x = Decimal.log10(gameData.fruits.plus(new Decimal(1)));
		const y = new Decimal(-0.0002).times(x);
		const z = y.plus(new Decimal(1.4932));
		
		const w = totalMultiplier.times(new Decimal(0.25));
		let v = w.plus(totalFruitMultiplier);
		v = v.times(totalFruitSuperMultiplier);
		v = v.plus(z);
		if (v.lessThan(new Decimal(0.001))) {
			v = new Decimal(0);
		}
		
		const u = v.clamp(new Decimal(0), new Decimal(1));
		gameData.baseFruitSupercapFactor = u;
		document.getElementById('fruitSupercapInfo').innerHTML = `The Fruit supercap starts at 1.08e2466 (^${truncateToDecimalPlaces(u, 3)})`;
	}
	if (gameData.fruitsIsSupercapped) {
		const x = Decimal.log10(gameData.fruits.plus(new Decimal(1)));
		const y = new Decimal(1.4932);
		
		const w = totalMultiplier.times(new Decimal(0.25));
		let v = w.plus(totalFruitMultiplier);
		v = v.times(totalFruitSuperMultiplier);
		v = v.plus(y);
		v = v.times(new Decimal(5000));
		
		let u = new Decimal(10).pow(v);
		gameData.fruitMaximumStart = u;
		document.getElementById('fruitMaximumInfo').innerHTML = `You cannot have over ${truncateToDecimalPlaces(u, 3)} Fruits<br>(based on when your Fruit supercap root hits ^0)`;
	}
	
	if (gameData.isInChallengeFall) {
		gameData.fruitMaximumStart = new Decimal(0);
	}
}


export function calculateFreeRuBisCoProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (rootUpgradeFactor.RO16Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'chaoticfreeProteins')) {
		const x = new Decimal(activeMicroorganismEffects.chaoticfreeProteins.mag);
		totalAdd = totalAdd.plus(x);
		document.getElementById('chaoticfreeProteins').innerHTML = `+${truncateToDecimalPlaces(x, 3)} free Proteins<br>`;
	}
	entropyUpgradeFactor.rubiscoFree = totalAdd;
}
export function calculateFreeExtensinProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (rootUpgradeFactor.RO16Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (rootUpgradeFactor.RM3Achieved) {
		const x = gameData.rna;
		const y = x.pow(new Decimal(0.5));
		totalAdd = totalAdd.plus(y);
		document.getElementById("RM3Effect").innerHTML = `Gain free Extensin and AGP Proteins based on your strands of RNA<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'chaoticfreeProteins')) {
		const x = new Decimal(activeMicroorganismEffects.chaoticfreeProteins.mag);
		totalAdd = totalAdd.plus(x);
	}
	entropyUpgradeFactor.extensinFree = totalAdd;
}
export function calculateFreeArganineProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (rootUpgradeFactor.RO16Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'chaoticfreeProteins')) {
		const x = new Decimal(activeMicroorganismEffects.chaoticfreeProteins.mag);
		totalAdd = totalAdd.plus(x);
	}
	entropyUpgradeFactor.arganineFree = totalAdd;
}
export function calculateFreeGlutamineProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (rootUpgradeFactor.RO16Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (fruitUpgradeFactor.F46Bought) {
		totalAdd = totalAdd.plus(new Decimal(4));
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'chaoticfreeProteins')) {
		const x = new Decimal(activeMicroorganismEffects.chaoticfreeProteins.mag);
		totalAdd = totalAdd.plus(x);
	}
	entropyUpgradeFactor.glutamineFree = totalAdd;
}
export function calculateFreeGlutamateProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (rootUpgradeFactor.RO16Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (fruitUpgradeFactor.F46Bought) {
		totalAdd = totalAdd.plus(new Decimal(4));
	}
	if (rootUpgradeFactor.RM2Achieved) {
		const x = gameData.dnaBlueprintsTotal;
		const y = x.div(new Decimal(2));
		totalAdd = totalAdd.plus(y);
		document.getElementById("RM2Effect").innerHTML = `Gain free Glutamate Proteins based on your DNA Blueprints<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'chaoticfreeProteins')) {
		const x = new Decimal(activeMicroorganismEffects.chaoticfreeProteins.mag);
		totalAdd = totalAdd.plus(x);
	}
	entropyUpgradeFactor.glutamateFree = totalAdd;
}
export function calculateFreeAsparagineProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (rootUpgradeFactor.RO16Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'chaoticfreeProteins')) {
		const x = new Decimal(activeMicroorganismEffects.chaoticfreeProteins.mag);
		totalAdd = totalAdd.plus(x);
	}
	entropyUpgradeFactor.asparagineFree = totalAdd;
}
export function calculateFreeAGPProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (rootUpgradeFactor.RO16Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (rootUpgradeFactor.RM3Achieved) {
		const x = gameData.rna;
		const y = x.pow(new Decimal(0.5));
		totalAdd = totalAdd.plus(y);
		document.getElementById("RM3Effect").innerHTML = `Gain free Extensin and AGP Proteins based on your strands of RNA<br>Effect: +${truncateToDecimalPlaces(y, 3)}`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'chaoticfreeProteins')) {
		const x = new Decimal(activeMicroorganismEffects.chaoticfreeProteins.mag);
		totalAdd = totalAdd.plus(x);
	}
	entropyUpgradeFactor.agpFree = totalAdd;
}
export function calculateFreeTRBProteins() {
	let totalAdd = new Decimal(0);
	if (rootUpgradeFactor.RO6Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (rootUpgradeFactor.RO16Bought) {
		totalAdd = totalAdd.plus(new Decimal(1));
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'chaoticfreeProteins')) {
		const x = new Decimal(activeMicroorganismEffects.chaoticfreeProteins.mag);
		totalAdd = totalAdd.plus(x);
	}
	entropyUpgradeFactor.trbFree = totalAdd;
}

export function calculateTotalDNABlueprint() {
	let totalAdd = new Decimal(0);
	if (Object.hasOwn(activeMicroorganismEffects, 'tardigradeDNABlueprintNerf')) {
		const x = new Decimal(activeMicroorganismEffects.tardigradeDNABlueprintNerf.mag);
		totalAdd = totalAdd.plus(x);
		document.getElementById('tardigradeDNABlueprintNerf').innerHTML = `-${truncateToDecimalPlaces(x, 3)} from the total DNA Blueprint nerf<br>`;
	}
	gameData.dnaBlueprintNerfBuff = totalAdd;
}

export function calculateDNAMult() {
	let totalMultiplier = new Decimal(1);
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallResources')) {
		let x = new Decimal(activeMicroorganismEffects.amoebaallResources.mag);
		if (x.greaterThanOrEqualTo(new Decimal(15))) {
			x = x.pow(new Decimal(0.4)).clamp(x, new Decimal(Infinity));
		}
		totalMultiplier = totalMultiplier.times(x);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebasecondaryResourcePow')) {
		let x = new Decimal(activeMicroorganismEffects.amoebasecondaryResourcePow.mag);
		if (x.greaterThanOrEqualTo(new Decimal(2))) {
			x = SC(x, new Decimal(2), new Decimal(0.25));
		}
		totalMultiplier = totalMultiplier.pow(x);
	}
	gameData.dnaMult = totalMultiplier;
}

export function calculateRNAMult() {
	let totalMultiplier = new Decimal(1);
	if (entropyUpgradeFactor.E49Bought) {
		const x = new Decimal(10);
		totalMultiplier = totalMultiplier.times(x);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'chaoticRNAMult')) {
		const x = new Decimal(activeMicroorganismEffects.chaoticRNAMult.mag);
		totalMultiplier = totalMultiplier.times(x);
		document.getElementById('chaoticRNAMult').innerHTML = `x${truncateToDecimalPlaces(x, 3)} RNA<br>`;
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebaallResources')) {
		let x = new Decimal(activeMicroorganismEffects.amoebaallResources.mag);
		if (x.greaterThanOrEqualTo(new Decimal(15))) {
			x = x.pow(new Decimal(0.4)).clamp(x, new Decimal(Infinity));
		}
		totalMultiplier = totalMultiplier.times(x);
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'amoebasecondaryResourcePow')) {
		let x = new Decimal(activeMicroorganismEffects.amoebasecondaryResourcePow.mag);
		if (x.greaterThanOrEqualTo(new Decimal(2))) {
			x = SC(x, new Decimal(2), new Decimal(0.25));
		}
		totalMultiplier = totalMultiplier.pow(x);
	}
	gameData.rnaMult = totalMultiplier;
}

export function calculateWelderEffect() {
	let totalMultiplier = new Decimal(1);
	if (rootUpgradeFactor.RO30Bought) {
		totalMultiplier = totalMultiplier.times(new Decimal(1.5));
	}
	if (Object.hasOwn(activeMicroorganismEffects, 'reinforcedwelderEffect')) {
		const x = new Decimal(activeMicroorganismEffects.reinforcedwelderEffect.mag);
		const y = new Decimal(1).plus(x);
		totalMultiplier = totalMultiplier.times(y);
		document.getElementById('reinforcedwelderEffect').innerHTML = `x${truncateToDecimalPlaces(y, 3)} Welder effect<br>`;
	}
	gameData.welderEffectMult = totalMultiplier;
}

export function calculateFLFallSpeed() {
	let totalMultiplier = new Decimal(1);
	if (Object.hasOwn(activeMicroorganismEffects, 'reinforcedFLSpeed')) {
		const x = new Decimal(activeMicroorganismEffects.reinforcedFLSpeed.mag);
		const y = new Decimal(1).plus(x);
		totalMultiplier = totalMultiplier.times(y);
		document.getElementById('reinforcedFLSpeed').innerHTML = `x${truncateToDecimalPlaces(y, 3)} Fallen Leaves fall speed`;
	}
	if (document.getElementById('fallenleafUpgrade1')) {
		fallenLeaves.fallenUpgradeFixer('fallen', 0);
		
		if (rootUpgradeFactor.fallenUpgrades.fallen[0].amount.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(1.25).pow(rootUpgradeFactor.fallenUpgrades.fallen[0].amount);
			totalMultiplier = totalMultiplier.times(x);
			
			document.getElementById('fallenleafUpgrade1').innerHTML = `FL1 (${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.fallen[0].amount, 3)})<br>x1.25 FL fall speed<br>Cost: ${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.fallen[0].cost, 3)} Fallen Leaves<br>Effect: x${truncateToDecimalPlaces(x, 3)}`;
			document.getElementById('fallenleafUpgrade1').style.padding = `11.5px 0px`;
		}
	}
	if (leafUpgradeFactor.L72Bought) {
		totalMultiplier = totalMultiplier.times(new Decimal(1.5));
	}
	if (leafUpgradeFactor.L73Bought) {
		totalMultiplier = totalMultiplier.times(new Decimal(2));
	}
	if (leafUpgradeFactor.L74Bought) {
		totalMultiplier = totalMultiplier.times(new Decimal(1.5));
	}
	
	rootUpgradeFactor.fallenLeafFallSpeedMult = totalMultiplier;
}
export function calculateFallenLeafCap() {
	let totalMultiplier = new Decimal(1);
	if (document.getElementById('fallenleafUpgrade3')) {
		fallenLeaves.fallenUpgradeFixer('fallen', 2);
		if (rootUpgradeFactor.fallenUpgrades.fallen[2].amount.greaterThanOrEqualTo(new Decimal(1))) {
			const x = new Decimal(1.2).pow(rootUpgradeFactor.fallenUpgrades.fallen[2].amount);
			totalMultiplier = totalMultiplier.times(x);
			
			document.getElementById('fallenleafUpgrade3').innerHTML = `FL3 (${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.fallen[2].amount, 3)})<br>x1.2 FL's cap<br>Cost: ${truncateToDecimalPlaces(rootUpgradeFactor.fallenUpgrades.fallen[2].cost, 3)} Fallen Leaves<br>Effect: x${truncateToDecimalPlaces(x, 3)}`;
			document.getElementById('fallenleafUpgrade3').style.padding = `11.5px 0px`;
		}
	}
	rootUpgradeFactor.fallenLeafCapMult = totalMultiplier;
}
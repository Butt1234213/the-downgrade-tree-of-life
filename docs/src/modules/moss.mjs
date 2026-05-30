import * as storage from './core/bunchobullshit.mjs';
import { achievements, massAchievementChecker } from './achievements.mjs';

const mossMilestoneCost = {
    MM1: new Decimal(1e80),
    MM2: new Decimal(1e100),
    MM3: new Decimal(1e200),
    MM4: new Decimal(1e250),
    MM5: new Decimal(1.79e308),
    MM6: new Decimal.fromComponents(1, 1, 450),
    MM7: new Decimal.fromComponents(1, 1, 666.82386),
    MM8: new Decimal.fromComponents(1, 1, 1337.12613),
    MM9: new Decimal.fromComponents(1, 1, 2500),
    MM10: new Decimal.fromComponents(1, 1, 6000),
    MM11: new Decimal.fromComponents(1, 2, 10),
    MM12: new Decimal.fromComponents(1, 2, 12.07918),
    MM13: new Decimal.fromComponents(1, 2, 16),
    MM14: new Decimal.fromComponents(1, 2, 22.34674),
    MM15: new Decimal.fromComponents(1, 2, 30),
    MM16: new Decimal.fromComponents(1, 2, 48),
    MM17: new Decimal.fromComponents(1, 2, 69.83884),
    MM18: new Decimal.fromComponents(1, 2, 95),
    MM19: new Decimal.fromComponents(1, 2, 200),
    MM20: new Decimal.fromComponents(1, 2, 308.25285),
}

export const mossUpgradeCost = {
    M1: new Decimal.fromComponents(1, 1, 1000),
    M2: new Decimal.fromComponents(1, 1, 1500),
    M3: new Decimal.fromComponents(1, 1, 1000),
    M4: new Decimal.fromComponents(1, 1, 1500),
    M5: new Decimal.fromComponents(1, 1, 1000),
    M6: new Decimal.fromComponents(1, 1, 1000),
}

export var mossMilestoneFactor = {
    mossMilestoneCount: new Decimal(0),
    MM1Achieved: false,
    MM1: new Decimal(1),
    MM2Achieved: false,
    MM2: new Decimal(1),
    MM3Achieved: false,
    MM3: new Decimal(1),
    MM4Achieved: false,
    MM4: new Decimal(1),
    MM5Achieved: false,
    MM5: new Decimal(1),
    MM6Achieved: false,
    MM6: new Decimal(1),
    MM7Achieved: false,
    MM7: new Decimal(1),
    MM8Achieved: false,
    MM9Achieved: false,
    MM9: new Decimal(1),
    MM10Achieved: false,
    MM10: new Decimal(1),
    MM11Achieved: false,
    MM11: new Decimal(1),
    MM12Achieved: false,
    MM12: new Decimal(1),
    MM13Achieved: false,
    MM13: new Decimal(1),
    MM14Achieved: false,
    MM14: new Decimal(1),
    MM15Achieved: false,
    MM15: new Decimal(1),
    MM16Achieved: false,
    MM16: new Decimal(1),
    MM17Achieved: false,
    MM17: new Decimal(1),
    MM18Achieved: false,
    MM18: new Decimal(1),
    MM19Achieved: false,
    MM19: new Decimal(1),
    MM20Achieved: false,
    MM20: new Decimal(1),
}

export function mossChecker() {
    if (storage.gameData.mossUnlocked) {
        const components = [
            storage.gameData.leaves, 
            storage.gameData.seeds, 
            storage.gameData.fruits
        ];
        var values = {
            value0: new Decimal(0.01),
            value1: new Decimal(0.01),
            value2: new Decimal(0.01),
        };

        for (let i = 0; i < components.length; i++) {
            const x = Decimal.log10(components[i].plus(new Decimal(1)));
            const y = Decimal.log10(x.plus(new Decimal(1)));
            const z = y.div(new Decimal(1.5));
            const w = Decimal.clamp(z, new Decimal(0.01), new Decimal(Infinity));

            values[`value${i}`] = w;
        }
        if ((storage.gameData.seeds.gt(new Decimal(0))) && (storage.gameData.fruits.gt(new Decimal(0)))) {
            const x = (values.value0.pow(storage.gameData.mossFactorPow)).times(values.value1.pow(storage.gameData.mossFactorPow));
            const y = x.times(values.value2.pow(storage.gameData.mossFactorPow));
            const z = y.plus(storage.gameData.mossEffectMultiplier);
			const w = z.pow(storage.gameData.mossEffectPow);
            storage.gameData.mossEffect = w;
        }
        else {
            storage.gameData.mossEffect = new Decimal(0);
        }
        const x = (storage.gameData.leaves.pow(storage.gameData.mossFactorPow)).times(storage.gameData.seeds.pow(storage.gameData.mossFactorPow));
        var y = x.times(storage.gameData.fruits.pow(storage.gameData.mossFactorPow));
		
		let totalGlutamine = storage.entropyUpgradeFactor.glutamine.plus(storage.entropyUpgradeFactor.glutamineFree);
		if (totalGlutamine.gte(new Decimal(1))) {
			y = y.times(storage.entropyUpgradeFactor.glutamineEffect);
		}
		y = y.pow(storage.gameData.mossPow);
        storage.gameData.moss = y;
        document.getElementById('mossCounter').innerHTML = `You have created ${storage.truncateToDecimalPlaces(storage.gameData.moss, 3)} Moss,`

        document.getElementById('mossEffect').innerHTML = `boosting most LU's base multipliers by +${storage.truncateToDecimalPlaces(storage.gameData.mossEffect, 3)}`
		
		if (storage.gameData.mossFactorPow.gt(new Decimal(1))) {
			document.getElementById('mossFactor').innerHTML = `Moss = Leaves<sup>${storage.truncateToDecimalPlaces(storage.gameData.mossFactorPow, 3)}</sup> * Seeds<sup>${storage.truncateToDecimalPlaces(storage.gameData.mossFactorPow, 3)}</sup> * Fruits<sup>${storage.truncateToDecimalPlaces(storage.gameData.mossFactorPow, 3)}</sup>,<br>but the effect is a lot more complicated.<br>f(x) = (log<sup>2</sup>x)/1.5, Effect = f(Moss<sub>elements</sub>) + 1`;
		}
    }
    else {
        return;
    }
}
export function mossMilestoneChecker() {
    let localMossMilestoneCount = new Decimal(0);

    if (storage.gameData.mossUnlocked) {
        if ((storage.gameData.moss.gte(mossMilestoneCost.MM1)) || (storage.rootUpgradeFactor.RO14Bought)) {
            mossMilestoneFactor.MM1Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm1').innerHTML = `Base Leaves Multiplier is raised by ${storage.truncateToDecimalPlaces(mossMilestoneFactor.MM1, 3)}`;
            document.getElementById('mm1Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';

            achievements.ach44 = true;
        }
        if ((storage.gameData.moss.gte(mossMilestoneCost.MM2)) || (storage.rootUpgradeFactor.RO14Bought)) {
            mossMilestoneFactor.MM2Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm2').innerHTML = `Base Leaves Multiplier is raised by ${storage.truncateToDecimalPlaces(mossMilestoneFactor.MM2, 3)}`;
            document.getElementById('mm2Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';
        }
        if ((storage.gameData.moss.gte(mossMilestoneCost.MM3)) || (storage.rootUpgradeFactor.RO14Bought)) {
            mossMilestoneFactor.MM3Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm3').innerHTML = `x${storage.truncateToDecimalPlaces(mossMilestoneFactor.MM3, 3)} Composting speed`;
            document.getElementById('mm3Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';
        }
        if ((storage.gameData.moss.gte(mossMilestoneCost.MM4)) || (storage.rootUpgradeFactor.RO14Bought)) {
            mossMilestoneFactor.MM4Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm4').innerHTML = `x${storage.truncateToDecimalPlaces(mossMilestoneFactor.MM4, 3)} Composting speed`;
            document.getElementById('mm4Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';
        }
        if ((storage.gameData.moss.gte(mossMilestoneCost.MM5)) || (storage.rootUpgradeFactor.RO14Bought)) {
            mossMilestoneFactor.MM5Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm5').innerHTML = `Finally an Entropy Mult!<br>${storage.truncateToDecimalPlaces(mossMilestoneFactor.MM5, 3)} Entropy`;
            document.getElementById('mm5Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';

            achievements.ach52 = true;
        }
        if (storage.gameData.moss.gte(mossMilestoneCost.MM6)) {
            mossMilestoneFactor.MM6Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm6').innerHTML = `Seed softcap is pushed back based by Moss<br>Effect: x${storage.truncateToDecimalPlaces(mossMilestoneFactor.MM6, 3)}`;
            document.getElementById('mm6Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';
        }
        if (storage.gameData.moss.gte(mossMilestoneCost.MM7)) {
            mossMilestoneFactor.MM7Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm7').innerHTML = `Entropy multiplies Bacteria and its cap<br>Effect: x${storage.truncateToDecimalPlaces(mossMilestoneFactor.MM7, 3)}`;
            document.getElementById('mm7Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';

            achievements.ach63 = true;
        }
        if (storage.gameData.moss.gte(mossMilestoneCost.MM8)) {
            mossMilestoneFactor.MM8Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm8').innerHTML = `Unlock Moss Upgrades`;
            document.getElementById('mm8Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';

            achievements.ach74 = true;

            document.querySelector('.moss-upgrade-background').style.visibility = `visible`;
        }
        if (storage.gameData.moss.gte(mossMilestoneCost.MM9)) {
            mossMilestoneFactor.MM9Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm9').innerHTML = `Fertilizers created after 750 boost Entropy<br>Effect: x${storage.truncateToDecimalPlaces(mossMilestoneFactor.MM9, 3)}`;
            document.getElementById('mm9Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';
        }
        if (storage.gameData.moss.gte(mossMilestoneCost.MM10)) {
            mossMilestoneFactor.MM10Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm10').innerHTML = `Bacteria Types after 30 boost Bacteria<br>Effect: ^${storage.truncateToDecimalPlaces(mossMilestoneFactor.MM10, 3)}`;
            document.getElementById('mm10Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';
        }
        if (storage.gameData.moss.gte(mossMilestoneCost.MM11)) {
            mossMilestoneFactor.MM11Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm11').innerHTML = `M1 &amp; M3's combined levels boost the Wildfire reward<br>Effect: x${storage.truncateToDecimalPlaces(mossMilestoneFactor.MM11, 3)}`;
            document.getElementById('mm11Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';
        }
    }

    mossMilestoneFactor.mossMilestoneCount = localMossMilestoneCount;
    document.getElementById('mossMilestoneCounter').innerHTML = `You have reached ${storage.truncateToDecimalPlaces(mossMilestoneFactor.mossMilestoneCount, 3)} Moss Milestones`;
}

export function M1CostCalculation() {
    const x = mossUpgradeCost.M1;
    const y = storage.fruitUpgradeFactor.M1.plus(storage.fruitUpgradeFactor.mossUpgradesBulk.minus(new Decimal(1)));
    const z = new Decimal.fromComponents(1, 1, 125).pow(y);
    const w = x.times(z);
    if (y.gte(new Decimal(20))) {
        const v = w.pow(new Decimal(1.1));
		if (y.gt(new Decimal(100000))) {
			const u = y.minus(new Decimal(100000));
			const t = new Decimal(1.0001).pow(u);
			return w.pow(t);
		}
        return v;
    }
    return w;
}
export function M1() {
    if (storage.gameData.moss.gte(M1CostCalculation())) {
        storage.fruitUpgradeFactor.M1 = storage.fruitUpgradeFactor.M1.plus(storage.fruitUpgradeFactor.mossUpgradesBulk);
    }
}
export function M2CostCalculation() {
    const x = mossUpgradeCost.M2;
    const y = storage.fruitUpgradeFactor.M2.plus(storage.fruitUpgradeFactor.mossUpgradesBulk.minus(new Decimal(1)));
    const z = new Decimal(1.5).pow(y);
    const w = x.pow(z);
    if (y.gte(new Decimal(10))) {
        const v = new Decimal(Infinity);
        return v;
    }
    return w;
}
export function M2() {
    if (storage.gameData.moss.gte(M2CostCalculation())) {
        storage.fruitUpgradeFactor.M2 = storage.fruitUpgradeFactor.M2.plus(storage.fruitUpgradeFactor.mossUpgradesBulk);
    }
}
export function M3CostCalculation() {
    const x = mossUpgradeCost.M3;
    const y = storage.fruitUpgradeFactor.M3.plus(storage.fruitUpgradeFactor.mossUpgradesBulk.minus(new Decimal(1)));
    const z = new Decimal.fromComponents(1, 1, 75).pow(y);
    const w = x.times(z);
    if (y.gte(new Decimal(20))) {
        const v = w.pow(new Decimal(1.1));
		if (y.gt(new Decimal(100000))) {
			const u = y.minus(new Decimal(100000));
			const t = new Decimal(1.0001).pow(u);
			return w.pow(t);
		}
        return v;
    }
    return w;
}
export function M3() {
    if (storage.gameData.moss.gte(M3CostCalculation())) {
        storage.fruitUpgradeFactor.M3 = storage.fruitUpgradeFactor.M3.plus(storage.fruitUpgradeFactor.mossUpgradesBulk);
    }
}
export function M4CostCalculation() {
    const x = mossUpgradeCost.M4;
    const y = storage.fruitUpgradeFactor.M4.plus(storage.fruitUpgradeFactor.mossUpgradesBulk.minus(new Decimal(1)));
    const z = new Decimal(1.1).pow(y);
    const w = x.pow(z);
    if (y.gte(new Decimal(20))) {
        const v = w.pow(new Decimal(1.1));
		if (y.gt(new Decimal(100000))) {
			const u = y.minus(new Decimal(100000));
			const t = new Decimal(1.0001).pow(u);
			return w.pow(t);
		}
        return v;
    }
    return w;
}
export function M4() {
    if (storage.gameData.moss.gte(M4CostCalculation())) {
        storage.fruitUpgradeFactor.M4 = storage.fruitUpgradeFactor.M4.plus(storage.fruitUpgradeFactor.mossUpgradesBulk);
    }
}
export function M5CostCalculation() {
    const x = mossUpgradeCost.M5;
    const y = storage.fruitUpgradeFactor.M5.plus(storage.fruitUpgradeFactor.mossUpgradesBulk.minus(new Decimal(1)));
    const z = new Decimal.fromComponents(1, 1, 333.52244).pow(y);
    const w = x.times(z);
    if (y.gte(new Decimal(20))) {
        const v = w.pow(new Decimal(1.1));
		if (y.gt(new Decimal(100000))) {
			const u = y.minus(new Decimal(100000));
			const t = new Decimal(1.0001).pow(u);
			return w.pow(t);
		}
        return v;
    }
    return w;
}
export function M5() {
    if (storage.gameData.moss.gte(M5CostCalculation())) {
        storage.fruitUpgradeFactor.M5 = storage.fruitUpgradeFactor.M5.plus(storage.fruitUpgradeFactor.mossUpgradesBulk);
    }
}
export function M6CostCalculation() {
    const x = mossUpgradeCost.M6;
    const y = storage.fruitUpgradeFactor.M6.plus(storage.fruitUpgradeFactor.mossUpgradesBulk.minus(new Decimal(1)));
    const z = new Decimal.fromComponents(1, 1, 333.52244).pow(y);
    const w = x.times(z);
    if (y.gte(new Decimal(20))) {
        const v = w.pow(new Decimal(1.1));
		if (y.gt(new Decimal(100000))) {
			const u = y.minus(new Decimal(100000));
			const t = new Decimal(1.0001).pow(u);
			return w.pow(t);
		}
        return v;
    }
    return w;
}
export function M6() {
    if (storage.gameData.moss.gte(M6CostCalculation())) {
        storage.fruitUpgradeFactor.M6 = storage.fruitUpgradeFactor.M6.plus(storage.fruitUpgradeFactor.mossUpgradesBulk);
    }
}

document.getElementById("M1").addEventListener("click", M1);
document.getElementById("M2").addEventListener("click", M2);
document.getElementById("M3").addEventListener("click", M3);
document.getElementById("M4").addEventListener("click", M4);
document.getElementById("M5").addEventListener("click", M5);
document.getElementById("M6").addEventListener("click", M6);
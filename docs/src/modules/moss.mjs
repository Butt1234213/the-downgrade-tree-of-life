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
    MM2Achieved: false,
    MM3Achieved: false,
    MM4Achieved: false,
    MM5Achieved: false,
    MM6Achieved: false,
    MM6: new Decimal(1),
    MM7Achieved: false,
    MM7: new Decimal(1),
    MM8Achieved: false,
    MM9Achieved: false,
    MM9: new Decimal(1),
    MM10Achieved: false,
    MM10: new Decimal(1),
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
            const y = Decimal.log10(x);
            const z = y.div(new Decimal(1.5));
            const w = Decimal.clamp(z, new Decimal(0.01), new Decimal(Infinity));

            values[`value${i}`] = w;
        }
        if ((storage.gameData.seeds.greaterThan(new Decimal(0))) && (storage.gameData.fruits.greaterThan(new Decimal(0)))) {
            const x = values.value0.times(values.value1);
            const y = x.times(values.value2);
            const z = y.plus(storage.gameData.mossEffectMultiplier);
            storage.gameData.mossEffect = z;
        }
        else {
            storage.gameData.mossEffect = new Decimal(0);
        }
        const x = storage.gameData.leaves.times(storage.gameData.seeds);
        var y = x.times(storage.gameData.fruits);
		if (storage.entropyUpgradeFactor.glutamine.greaterThanOrEqualTo(new Decimal(1))) {
			y = y.times(storage.entropyUpgradeFactor.glutamineEffect);
		}
        storage.gameData.moss = y;
        document.getElementById('mossCounter').innerHTML = `You have created ${storage.truncateToDecimalPlaces(storage.gameData.moss, 3)} Moss,`

        document.getElementById('mossEffect').innerHTML = `boosting all LU's base multipliers by +${storage.truncateToDecimalPlaces(storage.gameData.mossEffect, 3)}`
    }
    else {
        return;
    }
}
export function mossMilestoneChecker() {
    let localMossMilestoneCount = new Decimal(0);

    if (storage.gameData.mossUnlocked) {
        if ((storage.gameData.moss.greaterThanOrEqualTo(mossMilestoneCost.MM1)) || (storage.rootUpgradeFactor.RO14Bought)) {
            mossMilestoneFactor.MM1Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm1').innerHTML = `Base Leaves Multiplier is raised by 1.15`;
            document.getElementById('mm1Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';

            achievements.ach44 = true;
            massAchievementChecker();
        }
        if ((storage.gameData.moss.greaterThanOrEqualTo(mossMilestoneCost.MM2)) || (storage.rootUpgradeFactor.RO14Bought)) {
            mossMilestoneFactor.MM2Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm2').innerHTML = `Base Leaves Multiplier is raised by 1.1`;
            document.getElementById('mm2Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';
        }
        if ((storage.gameData.moss.greaterThanOrEqualTo(mossMilestoneCost.MM3)) || (storage.rootUpgradeFactor.RO14Bought)) {
            mossMilestoneFactor.MM3Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm3').innerHTML = `x20 Composting speed`;
            document.getElementById('mm3Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';
        }
        if ((storage.gameData.moss.greaterThanOrEqualTo(mossMilestoneCost.MM4)) || (storage.rootUpgradeFactor.RO14Bought)) {
            mossMilestoneFactor.MM4Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm4').innerHTML = `x5 Composting speed`;
            document.getElementById('mm4Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';
        }
        if ((storage.gameData.moss.greaterThanOrEqualTo(mossMilestoneCost.MM5)) || (storage.rootUpgradeFactor.RO14Bought)) {
            mossMilestoneFactor.MM5Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm5').innerHTML = `Finally an Entropy Mult!<br>x2 Entropy`;
            document.getElementById('mm5Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';

            achievements.ach52 = true;
            massAchievementChecker();
        }
        if (storage.gameData.moss.greaterThanOrEqualTo(mossMilestoneCost.MM6)) {
            mossMilestoneFactor.MM6Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm6').innerHTML = `Seed softcap is pushed back based by Moss<br>Effect: x${storage.truncateToDecimalPlaces(mossMilestoneFactor.MM6, 3)}`;
            document.getElementById('mm6Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';
        }
        if (storage.gameData.moss.greaterThanOrEqualTo(mossMilestoneCost.MM7)) {
            mossMilestoneFactor.MM7Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm7').innerHTML = `Entropy multiplies Bacteria and its cap<br>Effect: x${storage.truncateToDecimalPlaces(mossMilestoneFactor.MM7, 3)}`;
            document.getElementById('mm7Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';

            achievements.ach63 = true;
            massAchievementChecker();
        }
        if (storage.gameData.moss.greaterThanOrEqualTo(mossMilestoneCost.MM8)) {
            mossMilestoneFactor.MM8Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm8').innerHTML = `Unlock Moss Upgrades`;
            document.getElementById('mm8Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';

            achievements.ach74 = true;
            massAchievementChecker();

            document.querySelector('.moss-upgrade-background').style.visibility = `visible`;
        }
        if (storage.gameData.moss.greaterThanOrEqualTo(mossMilestoneCost.MM9)) {
            mossMilestoneFactor.MM9Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm9').innerHTML = `Fertilizers created after 750 boost Entropy<br>Effect: x${storage.truncateToDecimalPlaces(mossMilestoneFactor.MM9, 3)}`;
            document.getElementById('mm9Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';
        }
        if (storage.gameData.moss.greaterThanOrEqualTo(mossMilestoneCost.MM10)) {
            mossMilestoneFactor.MM10Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm10').innerHTML = `Bacteria Types after 30 boost Bacteria<br>Effect: ^${storage.truncateToDecimalPlaces(mossMilestoneFactor.MM10, 3)}`;
            document.getElementById('mm10Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';
        }
    }

    mossMilestoneFactor.mossMilestoneCount = localMossMilestoneCount;
    document.getElementById('mossMilestoneCounter').innerHTML = `You have reached ${storage.truncateToDecimalPlaces(mossMilestoneFactor.mossMilestoneCount, 3)} Moss Milestones`;
}

export function M1CostCalculation() {
    const x = mossUpgradeCost.M1;
    const y = storage.fruitUpgradeFactor.M1;
    const z = new Decimal.fromComponents(1, 1, 125).pow(y);
    const w = x.times(z);
    if (y.greaterThanOrEqualTo(new Decimal(20))) {
        const v = w.pow(new Decimal(1.1));
        return v;
    }
    return w;
}
export function M1() {
    if (storage.gameData.moss.greaterThanOrEqualTo(M1CostCalculation())) {
        storage.fruitUpgradeFactor.M1 = storage.fruitUpgradeFactor.M1.plus(new Decimal(1));
    }
}
export function M2CostCalculation() {
    const x = mossUpgradeCost.M2;
    const y = storage.fruitUpgradeFactor.M2;
    const z = new Decimal(1.5).pow(y);
    const w = x.pow(z);
    if (y.greaterThanOrEqualTo(new Decimal(20))) {
        const v = w.pow(new Decimal(1.1));
        return v;
    }
    return w;
}
export function M2() {
    if (storage.gameData.moss.greaterThanOrEqualTo(M2CostCalculation())) {
        storage.fruitUpgradeFactor.M2 = storage.fruitUpgradeFactor.M2.plus(new Decimal(1));
    }
}
export function M3CostCalculation() {
    const x = mossUpgradeCost.M3;
    const y = storage.fruitUpgradeFactor.M3;
    const z = new Decimal.fromComponents(1, 1, 75).pow(y);
    const w = x.times(z);
    if (y.greaterThanOrEqualTo(new Decimal(20))) {
        const v = w.pow(new Decimal(1.1));
        return v;
    }
    return w;
}
export function M3() {
    if (storage.gameData.moss.greaterThanOrEqualTo(M3CostCalculation())) {
        storage.fruitUpgradeFactor.M3 = storage.fruitUpgradeFactor.M3.plus(new Decimal(1));
    }
}
export function M4CostCalculation() {
    const x = mossUpgradeCost.M4;
    const y = storage.fruitUpgradeFactor.M4;
    const z = new Decimal(1.1).pow(y);
    const w = x.pow(z);
    if (y.greaterThanOrEqualTo(new Decimal(20))) {
        const v = w.pow(new Decimal(1.1));
        return v;
    }
    return w;
}
export function M4() {
    if (storage.gameData.moss.greaterThanOrEqualTo(M4CostCalculation())) {
        storage.fruitUpgradeFactor.M4 = storage.fruitUpgradeFactor.M4.plus(new Decimal(1));
    }
}
export function M5CostCalculation() {
    const x = mossUpgradeCost.M5;
    const y = storage.fruitUpgradeFactor.M5;
    const z = new Decimal.fromComponents(1, 1, 333.52244).pow(y);
    const w = x.times(z);
    if (y.greaterThanOrEqualTo(new Decimal(20))) {
        const v = w.pow(new Decimal(1.1));
        return v;
    }
    return w;
}
export function M5() {
    if (storage.gameData.moss.greaterThanOrEqualTo(M5CostCalculation())) {
        storage.fruitUpgradeFactor.M5 = storage.fruitUpgradeFactor.M5.plus(new Decimal(1));
    }
}
export function M6CostCalculation() {
    const x = mossUpgradeCost.M6;
    const y = storage.fruitUpgradeFactor.M6;
    const z = new Decimal.fromComponents(1, 1, 333.52244).pow(y);
    const w = x.times(z);
    if (y.greaterThanOrEqualTo(new Decimal(20))) {
        const v = w.pow(new Decimal(1.1));
        return v;
    }
    return w;
}
export function M6() {
    if (storage.gameData.moss.greaterThanOrEqualTo(M6CostCalculation())) {
        storage.fruitUpgradeFactor.M6 = storage.fruitUpgradeFactor.M6.plus(new Decimal(1));
    }
}

document.getElementById("M1").addEventListener("click", M1);
document.getElementById("M2").addEventListener("click", M2);
document.getElementById("M3").addEventListener("click", M3);
document.getElementById("M4").addEventListener("click", M4);
document.getElementById("M5").addEventListener("click", M5);
document.getElementById("M6").addEventListener("click", M6);
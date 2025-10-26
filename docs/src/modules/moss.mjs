import * as storage from './core/bunchobullshit.mjs';
import { achievements, massAchievementChecker } from './achievements.mjs';

const mossMilestoneCost = {
    MM1: new Decimal(1e100),
    MM2: new Decimal(1e140),
    MM3: new Decimal(1e200),
    MM4: new Decimal(1e250),
    MM5: new Decimal(1.79e308),
}

export var mossMilestoneFactor = {
    mossMilestoneCount: new Decimal(0),
    MM1Achieved: false,
    MM2Achieved: false,
    MM3Achieved: false,
    MM4Achieved: false,
    MM5Achieved: false,
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
            storage.gameData.mossEffect = y;
        }
        else {
            storage.gameData.mossEffect = new Decimal(0);
        }
        const x = storage.gameData.leaves.times(storage.gameData.seeds);
        const y = x.times(storage.gameData.fruits);
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
        if (storage.gameData.moss.greaterThanOrEqualTo(mossMilestoneCost.MM1)) {
            mossMilestoneFactor.MM1Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm1').innerHTML = `MM1<br>Base Leaves Multiplier is raised by 1.15`;
            document.getElementById('mm1Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';

            achievements.ach44 = true;
            massAchievementChecker();
        }   
        if (storage.gameData.moss.greaterThanOrEqualTo(mossMilestoneCost.MM2)) {
            mossMilestoneFactor.MM2Achieved = true;
            localMossMilestoneCount = localMossMilestoneCount.plus(new Decimal(1));
            document.getElementById('mm2').innerHTML = `MM2<br>Base Leaves Multiplier is raised by 1.1`;
            document.getElementById('mm2Background').style.backgroundImage = 'radial-gradient(circle at center, #535256, #1a8229)';
        }  
    }

    mossMilestoneFactor.mossMilestoneCount = localMossMilestoneCount;
    document.getElementById('mossMilestoneCounter').innerHTML = `You have reached ${storage.truncateToDecimalPlaces(mossMilestoneFactor.mossMilestoneCount, 3)} Moss Milestones`;
}
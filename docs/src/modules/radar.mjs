import * as storage from './core/bunchobullshit.mjs';
import * as bacteria from './bacteria.mjs';
import { achievements, massAchievementChecker } from './achievements.mjs';

function stormChallenge() {
    if (!storage.gameData.isInChallengeStorm) {
        document.querySelector('.challenge-storm').style.backgroundImage = 'radial-gradient(#3036b0, #5e1111)';
        document.querySelector('.challenge-storm').style.borderColor = '#420b0b';
        document.getElementById('enterStorm').innerHTML = `EXIT THE STORM`;
        document.getElementById('enterStorm').style.left = `62.5px`;
        document.getElementById('stormIndicator').innerHTML = `Harsh winds and lightning blasts make Leaves, Seeds, and Fruits way harder to sustainably produce. (base of ^${storage.truncateToDecimalPlaces((new Decimal(0.75).pow(storage.gameData.stormLevel)), 3)})<br>(ACTIVE)`;
        document.getElementById('leafStormcapInfo').innerHTML = `The Stormcap affects your Leaves by ^${storage.truncateToDecimalPlaces((new Decimal(0.75).pow(storage.gameData.stormLevel)), 3)}`;
        document.getElementById('seedStormcapInfo').innerHTML = `The Stormcap^5 affects your Seeds by ^${storage.truncateToDecimalPlaces(((new Decimal(0.75).pow(storage.gameData.stormLevel)).pow(new Decimal(5))), 3)}`;
        document.getElementById('fruitStormcapInfo').innerHTML = `The Stormcap^5 affects your Fruits by ^${storage.truncateToDecimalPlaces(((new Decimal(0.75).pow(storage.gameData.stormLevel)).pow(new Decimal(5))), 3)}`;

		const x = new Decimal(0.000542868).times(Decimal.ln(storage.gameData.stormBestScore.plus(new Decimal(1))));
		const y = x.plus(new Decimal(1));
		const z = y.pow(storage.gameData.blizzardReward);
        document.getElementById('stormRewardCounter').innerHTML = `Unlock Composter and SU automation, ^${storage.truncateToDecimalPlaces(z, 3)} Leaf base mult, and the Bacteria formula is better.`;
        document.getElementById('stormIndicator').innerHTML = `Harsh winds and lightning blasts make Leaves, Seeds, and Fruits way harder to sustainably produce. (base of ^${storage.truncateToDecimalPlaces((new Decimal(0.75).pow(storage.gameData.stormLevel)), 3)})<br>(INACTIVE)`;
        document.getElementById('stormCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.stormBestScore, 3)} / ${storage.truncateToDecimalPlaces((new Decimal(1e40).pow(storage.gameData.stormLevel)), 3)} Seeds`;

        document.getElementById('leafStormcapInfo').innerHTML = `The Stormcap affects your Leaves by ^${storage.truncateToDecimalPlaces((new Decimal(0.75).pow(storage.gameData.stormLevel)), 3)}`;
        document.getElementById('seedStormcapInfo').innerHTML = `The Stormcap^5 affects your Seeds by ^${storage.truncateToDecimalPlaces(((new Decimal(0.75).pow(storage.gameData.stormLevel)).pow(new Decimal(5))), 3)}`;
        document.getElementById('fruitStormcapInfo').innerHTML = `The Stormcap^5 affects your Fruits by ^${storage.truncateToDecimalPlaces(((new Decimal(0.75).pow(storage.gameData.stormLevel)).pow(new Decimal(5))), 3)}`;
    
		storage.gameData.stormBaseRequirement = new Decimal(1e40).pow(storage.gameData.stormLevel);
        storage.gameData.stormCompletable = false;
        storage.gameData.isInChallengeStorm = true;
        storage.gameData.canTransform = true;
        storage.transform();
    }
    else {
		const scoreCap = storage.gameData.stormBaseRequirement.pow(new Decimal(1.5));
        storage.gameData.stormBestScore = storage.gameData.seeds.clamp(storage.gameData.stormBestScore, scoreCap);
        if (storage.gameData.stormCompletable) {
            storage.gameData.stormLevel = storage.gameData.stormLevel.plus(new Decimal(1));
            storage.gameData.stormcapBaseFactor = new Decimal(0.75).pow(storage.gameData.stormLevel);
			storage.gameData.stormBaseRequirement = new Decimal(1e40).pow(storage.gameData.stormlevel);
            document.getElementById('stormLevelCounter').innerHTML = `The Storm^${storage.truncateToDecimalPlaces(storage.gameData.stormLevel, 3)}`;
            achievements.ach65 = true;
            massAchievementChecker();
            storage.gameData.suAutomationUnlocked = true;
        }
        document.querySelector('.challenge-storm').style.backgroundImage = 'radial-gradient(#3036b0, #151b88)';
        document.querySelector('.challenge-storm').style.borderColor = '#0d1378';
        document.getElementById('enterStorm').innerHTML = `ENTER THE STORM`;
        document.getElementById('enterStorm').style.left = `55px`;
        
		const x = new Decimal(0.000542868).times(Decimal.ln(storage.gameData.stormBestScore.plus(new Decimal(1))));
		const y = x.plus(new Decimal(1));
		const z = y.pow(storage.gameData.blizzardReward);
		// const z = new Decimal(20000).times(storage.gameData.stormBestScore.pow(new Decimal(-0.00752575))); This is the formula for the bacteria boost

        document.getElementById('stormRewardCounter').innerHTML = `Unlock Composter and SU automation, ^${storage.truncateToDecimalPlaces(z, 3)} Leaf base mult, and the Bacteria formula is better.`;
        document.getElementById('stormIndicator').innerHTML = `Harsh winds and lightning blasts make Leaves, Seeds, and Fruits way harder to sustainably produce. (base of ^${storage.truncateToDecimalPlaces((new Decimal(0.75).pow(storage.gameData.stormLevel)), 3)})<br>(INACTIVE)`;
        document.getElementById('stormCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.stormBestScore, 3)} / ${storage.truncateToDecimalPlaces((new Decimal(1e40).pow(storage.gameData.stormLevel)), 3)} Seeds`;

        document.getElementById('leafStormcapInfo').innerHTML = ``;
        document.getElementById('seedStormcapInfo').innerHTML = ``;
        document.getElementById('fruitStormcapInfo').innerHTML = ``;

        storage.gameData.isInChallengeStorm = false;
        storage.gameData.canTransform = true;
        storage.transform();
    }
}

document.getElementById('enterStorm').addEventListener('click', stormChallenge);

export function stormCalculation() {
    if (storage.gameData.isInChallengeStorm) {
        document.getElementById('stormCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.seeds, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.stormBaseRequirement, 3)} Seeds`;

        if (storage.gameData.seeds.greaterThanOrEqualTo(storage.gameData.stormBaseRequirement)) {
            document.querySelector('.challenge-storm').style.backgroundImage = 'radial-gradient(#3036b0, #1c9e36)';
            document.querySelector('.challenge-storm').style.borderColor = '#117926';
            document.getElementById('enterStorm').innerHTML = `COMPLETE THE STORM`;
            document.getElementById('enterStorm').style.left = `40px`;
            storage.gameData.stormCompletable = true;
        }
    }
}

function wildfireChallenge() {
    if (!storage.gameData.isInChallengeWildfire) {
        storage.gameData.isInChallengeWildfire = true;
        document.querySelector('.challenge-wildfire').style.backgroundImage = 'radial-gradient(#e3df20, #b71414)';
        document.querySelector('.challenge-wildfire').style.borderColor = '#420b0b';
        document.getElementById('enterWildfire').innerHTML = `EXIT THE WILDFIRE`;
        document.getElementById('enterWildfire').style.left = `50px`;
        document.getElementById('wildfireIndicator').innerHTML = `A raging firestorm makes Fertilizers impossible to produce. (Free fers are disabled, and (super scaling)^${storage.truncateToDecimalPlaces((new Decimal(2).pow(storage.gameData.wildfireLevel)), 3)} starts immediately)<br>(ACTIVE)`;

        const x = new Decimal(1.00814).pow(storage.gameData.wildfireBestScore);
        const y = x.clamp(new Decimal(1), new Decimal(Infinity));
        document.getElementById('wildfireRewardCounter').innerHTML = `Unlock FU automation, Seed generation, and x${storage.truncateToDecimalPlaces(y, 3)} M1 and M3's effects.`;
        document.getElementById('wildfireCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.wildfireBestScore, 3)} / ${storage.truncateToDecimalPlaces((new Decimal(50).times(storage.gameData.wildfireLevel)), 3)} Fertilizers`;
		
		
        storage.gameData.wildfireBaseRequirement = new Decimal(50).times(storage.gameData.wildfireLevel);
        storage.gameData.wildfireCompletable = false;
        storage.gameData.canTransform = true;
        storage.transform();
    }
    else {
		const scoreCap = storage.gameData.wildfireBaseRequirement.times(new Decimal(1.5));
        storage.gameData.wildfireBestScore = storage.gameData.totalFertilizers.clamp(storage.gameData.wildfireBestScore, scoreCap);
        if (storage.gameData.wildfireCompletable) {
            storage.gameData.wildfireLevel = storage.gameData.wildfireLevel.plus(new Decimal(1));
            storage.gameData.wildfireBaseFactor = new Decimal(2).pow(storage.gameData.wildfireLevel);
			storage.gameData.wildfireBaseRequirement = new Decimal(50).times(storage.gameData.wildfireLevel);
            document.getElementById('wildfireLevelCounter').innerHTML = `The Wildfire^${storage.truncateToDecimalPlaces(storage.gameData.wildfireLevel, 3)}`;
            storage.gameData.fuAutomationUnlocked = true;

            achievements.ach82 = true;
            massAchievementChecker();
        }
		storage.gameData.entropyComposterCost = new Decimal(1e6).pow(storage.gameData.entropyComposterCount.plus(new Decimal(1)));
        document.querySelector('.challenge-wildfire').style.backgroundImage = 'radial-gradient(#e3df20, #c55f1b)';
        document.querySelector('.challenge-wildfire').style.borderColor = '#780d0d';
        document.getElementById('enterWildfire').innerHTML = `ENTER THE WILDFIRE`;
        document.getElementById('enterWildfire').style.left = `45px`;
        
        const x = new Decimal(1.01396).pow(storage.gameData.wildfireBestScore);
        const y = x.clamp(new Decimal(1), new Decimal(Infinity));
        document.getElementById('wildfireRewardCounter').innerHTML = `Unlock FU automation, Seed generation, and x${storage.truncateToDecimalPlaces(y, 3)} M1 and M3's effects.`;
        document.getElementById('wildfireIndicator').innerHTML = `A raging firestorm makes Fertilizers impossible to produce. (Free fers are disabled, and (super scaling)^${storage.truncateToDecimalPlaces((new Decimal(2).pow(storage.gameData.wildfireLevel)), 3)} starts immediately)<br>(INACTIVE)`;
        document.getElementById('wildfireCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.wildfireBestScore, 3)} / ${storage.truncateToDecimalPlaces((new Decimal(50).times(storage.gameData.wildfireLevel)), 3)} Fertilizers`;

        storage.gameData.isInChallengeWildfire = false;
        storage.gameData.canTransform = true;
        storage.transform();
    }
}

export function wildfireCalculation() {
    if (storage.gameData.isInChallengeWildfire) {
		storage.gameData.freeLeafFertilizers = new Decimal(0);
		storage.gameData.freeSeedFertilizers = new Decimal(0);
		storage.gameData.freeFruitFertilizers = new Decimal(0);
        document.getElementById('wildfireCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.totalFertilizers, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.wildfireBaseRequirement, 3)} Fertilizers`;

        if (storage.gameData.totalFertilizers.greaterThanOrEqualTo(storage.gameData.wildfireBaseRequirement)) {
            document.querySelector('.challenge-wildfire').style.backgroundImage = 'radial-gradient(#e3df20, #1c9e36)';
            document.querySelector('.challenge-wildfire').style.borderColor = '#117926';
            document.getElementById('enterWildfire').innerHTML = `COMPLETE THE WILDFIRE`;
            document.getElementById('enterWildfire').style.left = `40px`;
            storage.gameData.wildfireCompletable = true;
        }
    }
}

document.getElementById('enterWildfire').addEventListener('click', wildfireChallenge);


function droughtChallenge() {
    if (!storage.gameData.isInChallengeDrought) {
        storage.gameData.isInChallengeDrought = true;
        document.querySelector('.challenge-drought').style.backgroundImage = 'radial-gradient(#c79b40, #c74040)';
        document.querySelector('.challenge-drought').style.borderColor = '#991d1d';
        document.getElementById('enterDrought').innerHTML = `EXIT THE DROUGHT`;
        document.getElementById('enterDrought').style.left = `50px`;
        document.getElementById('droughtIndicator').innerHTML = `Lack of water for months has made leaves die out constantly and time drag on. (^${storage.truncateToDecimalPlaces(storage.gameData.droughtBaseFactor, 3)} to L and TAS, Game speed increases over time)<br>(ACTIVE)`;

		const x = Decimal.log10(storage.gameData.droughtBestScore.plus(new Decimal(1)));
        const y = x.pow(new Decimal(0.0413927));
		const z = y.times(new Decimal(0.909091));
        const w = z.clamp(new Decimal(1), new Decimal(Infinity));
        document.getElementById('droughtRewardCounter').innerHTML = `Unlock DNA, RNA, and ^${storage.truncateToDecimalPlaces(w, 3)} CRS`;
        document.getElementById('droughtCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.droughtBestScore, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.droughtBaseRequirement, 3)} Fruits`;
		
        storage.gameData.droughtBaseFactor = new Decimal(1e-2).pow(storage.gameData.droughtLevel);
        storage.gameData.droughtBaseRequirement = new Decimal(1e200).pow(storage.gameData.droughtLevel);
        storage.gameData.droughtCompletable = false;
        storage.gameData.canTransform = true;
        storage.transform();
    }
    else {
		const scoreCap = storage.gameData.droughtBaseRequirement.pow(new Decimal(1.5));
        storage.gameData.droughtBestScore = storage.gameData.fruits.clamp(storage.gameData.droughtBestScore, scoreCap);
        if (storage.gameData.droughtCompletable) {
            storage.gameData.droughtLevel = storage.gameData.droughtLevel.plus(new Decimal(1));
            storage.gameData.droughtBaseFactor = new Decimal(1e-2).pow(storage.gameData.droughtLevel);
            storage.gameData.droughtBaseRequirement = new Decimal(1e200).pow(storage.gameData.droughtLevel);
            document.getElementById('droughtLevelCounter').innerHTML = `The Drought^${storage.truncateToDecimalPlaces(storage.gameData.droughtLevel, 3)}`;
        }
        document.querySelector('.challenge-drought').style.backgroundImage = 'radial-gradient(#c79b40, #a69e8d)';
        document.querySelector('.challenge-drought').style.borderColor = '#b8b19e';
        document.getElementById('enterDrought').innerHTML = `ENTER THE DROUGHT`;
        document.getElementById('enterDrought').style.left = `45px`;
        
		const x = Decimal.log10(storage.gameData.droughtBestScore.plus(new Decimal(1)));
        const y = x.pow(new Decimal(0.0413927));
		const z = y.times(new Decimal(0.909091));
        const w = z.clamp(new Decimal(1), new Decimal(Infinity));
        document.getElementById('droughtRewardCounter').innerHTML = `Unlock DNA, RNA, and ^${storage.truncateToDecimalPlaces(w, 3)} CRS`;
        document.getElementById('droughtIndicator').innerHTML = `Lack of water for months has made leaves die out constantly and time drag on. (^${storage.truncateToDecimalPlaces(storage.gameData.droughtBaseFactor, 3)} to L and TAS, Game speed increases over time)<br>(INACTIVE)`;
        document.getElementById('droughtCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.droughtBestScore, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.droughtBaseRequirement, 3)} Fruits`;

        storage.gameData.isInChallengeDrought = false;
        storage.gameData.canTransform = true;
        storage.transform();
    }
}

export function droughtCalculation() {
    if (storage.gameData.isInChallengeDrought) {
        document.getElementById('droughtCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.fruits, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.droughtBaseRequirement, 3)} Fruits`;

        if (storage.gameData.fruits.greaterThanOrEqualTo(storage.gameData.droughtBaseRequirement)) {
            document.querySelector('.challenge-drought').style.backgroundImage = 'radial-gradient(#c79b40, #1c9e36)';
            document.querySelector('.challenge-drought').style.borderColor = '#117926';
            document.getElementById('enterDrought').innerHTML = `COMPLETE THE DROUGHT`;
            document.getElementById('enterDrought').style.left = `40px`;
            storage.gameData.droughtCompletable = true;
        }
    }
}

document.getElementById('enterDrought').addEventListener('click', droughtChallenge);

function blizzardChallenge() {
    if (!storage.gameData.isInChallengeBlizzard) {
        storage.gameData.isInChallengeBlizzard = true;
        document.querySelector('.challenge-blizzard').style.backgroundImage = 'radial-gradient(#afcccc, #c74040)';
        document.querySelector('.challenge-blizzard').style.borderColor = '#991d1d';
        document.getElementById('enterBlizzard').innerHTML = `EXIT THE BLIZZARD`;
        document.getElementById('enterBlizzard').style.left = `50px`;
        document.getElementById('blizzardIndicator').innerHTML = `Sudden drops in temperature make all forms of energy futile. (^${storage.truncateToDecimalPlaces(storage.gameData.blizzardBasePEFactor, 3)} to PE, Entropy mult, Cells, and Bacteria are disabled, and /${storage.truncateToDecimalPlaces(storage.gameData.blizzardBaseGameSpeedFactor, 3)} Game speed)<br>(ACTIVE)`;

		const x = Decimal.log10(storage.gameData.blizzardBestScore.plus(new Decimal(1)));
		const y = (x.times(new Decimal(0.270346))).plus(new Decimal(1));
        const z = y.clamp(new Decimal(1), new Decimal(Infinity));
        document.getElementById('blizzardRewardCounter').innerHTML = `Unlock Roots and ^${storage.truncateToDecimalPlaces(z, 3)} Storm rewards`;
        document.getElementById('blizzardCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.blizzardBestScore, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.blizzardBaseRequirement, 3)} Entropy`;
        storage.gameData.blizzardCompletable = false;
		
        storage.gameData.blizzardBaseRequirement = new Decimal(5000).pow(storage.gameData.blizzardLevel);
        storage.gameData.canTransform = true;
        storage.transform();
		bacteria.resetCells();
    }
    else {
		const scoreCap = storage.gameData.blizzardBaseRequirement.pow(new Decimal(1.5));
		storage.gameData.blizzardBestScore = storage.gameData.entropyOnTransform.clamp(storage.gameData.blizzardBestScore, scoreCap);
        if (storage.gameData.blizzardCompletable) {
            storage.gameData.blizzardLevel = storage.gameData.blizzardLevel.plus(new Decimal(1));
            storage.gameData.blizzardBasePEFactor = new Decimal(0.075).pow(storage.gameData.blizzardLevel);
            storage.gameData.blizzardBaseGameSpeedFactor = new Decimal(1e20).pow(storage.gameData.blizzardLevel);
            storage.gameData.blizzardBaseRequirement = new Decimal(5000).pow(storage.gameData.blizzardLevel);
            document.getElementById('blizzardLevelCounter').innerHTML = `The Blizzard^${storage.truncateToDecimalPlaces(storage.gameData.blizzardLevel, 3)}`;
        }
        document.querySelector('.challenge-blizzard').style.backgroundImage = 'radial-gradient(#afcccc, #b8baba)';
        document.querySelector('.challenge-blizzard').style.borderColor = '#bae6e6';
        document.getElementById('enterBlizzard').innerHTML = `ENTER THE BLIZZARD`;
        document.getElementById('enterBlizzard').style.left = `45px`;
        
		const x = Decimal.log10(storage.gameData.blizzardBestScore.plus(new Decimal(1)));
		const y = (x.times(new Decimal(0.270346))).plus(new Decimal(1));
        const z = y.clamp(new Decimal(1), new Decimal(Infinity));
		storage.gameData.blizzardReward = z;
        document.getElementById('blizzardRewardCounter').innerHTML = `Unlock Roots and ^${storage.truncateToDecimalPlaces(z, 3)} Storm rewards`;
        document.getElementById('blizzardIndicator').innerHTML = `Sudden drops in temperature make all forms of energy futile. (^${storage.truncateToDecimalPlaces(storage.gameData.blizzardBasePEFactor, 3)} to PE, Entropy mult, Cells, and Bacteria are disabled, and /${storage.truncateToDecimalPlaces(storage.gameData.blizzardBaseGameSpeedFactor, 3)} Game speed)<br>(INACTIVE)`;
        document.getElementById('blizzardCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.blizzardBestScore, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.blizzardBaseRequirement, 3)} Entropy`;

        storage.gameData.isInChallengeBlizzard = false;
        storage.gameData.canTransform = true;
        storage.transform();
    }
}

export function blizzardCalculation() {
    if (storage.gameData.isInChallengeBlizzard) {
        document.getElementById('blizzardCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.entropyOnTransform, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.blizzardBaseRequirement, 3)} Entropy`;

        if (storage.gameData.entropyOnTransform.greaterThanOrEqualTo(storage.gameData.blizzardBaseRequirement)) {
            document.querySelector('.challenge-blizzard').style.backgroundImage = 'radial-gradient(#afcccc, #1c9e36)';
            document.querySelector('.challenge-blizzard').style.borderColor = '#117926';
            document.getElementById('enterBlizzard').innerHTML = `COMPLETE THE BLIZZARD`;
            document.getElementById('enterBlizzard').style.left = `40px`;
            storage.gameData.blizzardCompletable = true;
        }
    }
}

document.getElementById('enterBlizzard').addEventListener('click', blizzardChallenge);
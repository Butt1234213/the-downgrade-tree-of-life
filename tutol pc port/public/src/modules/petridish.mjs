import * as storage from './core/bunchobullshit.mjs';
import { achievements, massAchievementChecker } from './achievements.mjs';

let level = new Decimal(0);
let currentNature = {};

const typeIndicator = {
	amoeba: [
		new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)
	],
	tardigrade: [
		new Decimal(2), new Decimal(0), new Decimal(8), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)
	],
	yeast: [
		new Decimal(0), new Decimal(3), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(3), new Decimal(3), new Decimal(1)
	],
	mossSpore: [
		new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(10), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)
	],
	algae: [
		new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(10), new Decimal(0), new Decimal(0), new Decimal(0)
	]
}

const natureConfigs = {
	lively: {
		leafBasePow: new Decimal(1.5).plus(new Decimal(0.05).times(level)),
		leafSoftcapBase: new Decimal(0.01).plus(new Decimal(0.0025).times(level)),
		LR1Effect: new Decimal(2).times(new Decimal(1.02).pow(level)),
		LR2Effect: new Decimal(1.02).pow(level.plus(new Decimal(1))),
		stormReward: new Decimal(1.1).plus(new Decimal(0.05).times(level)),
	},
	grounded: {
		seedBasePow: new Decimal(1.3).plus(new Decimal(0.05).times(level)),
		seedSoftcapBase: new Decimal(0.01).plus(new Decimal(0.0025).times(level)),
		SR1Effect: new Decimal(2).times(new Decimal(1.02).pow(level)),
		TASBasePow: new Decimal(1.1).plus(new Decimal(0.025).times(level)),
		seedSupercap: new Decimal(1.6).plus(new Decimal(0.05).times(level)),
	},
	bountiful: {
		fruitBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		FR1Effect: new Decimal(1.5).times(new Decimal(1.02).pow(level)),
		M1SoftcapDelay: new Decimal(50).plus(new Decimal(50).times(level)),
		fruitSupercap: new Decimal(1.4).plus(new Decimal(0.05).times(level)),
		wildfireReward: new Decimal(1.5).times(new Decimal(1.02).pow(level)),
	},
	chaotic: {
		entropyBaseMult: new Decimal(1e6).pow(level.plus(new Decimal(1))),
		CRSBasePow: new Decimal(1.2).plus(new Decimal(0.05).times(level)),
		BacteriaCapBasePow: new Decimal(1.3).plus(new Decimal(0.05).times(level)),
		RNAMult: new Decimal(1.25).plus(new Decimal(0.1).times(level)),
		freeProteins: new Decimal(1.05).pow(level.plus(new Decimal(1))),
	},
	reinforced: {
		rootsBaseMult: new Decimal(2.5).times(level.plus(new Decimal(1))),
		reinforcementsMult: new Decimal(2).times(level.plus(new Decimal(1))),
		allSupercaps: new Decimal(0.5).plus(new Decimal(0.1).times(level)),
		blizzardReward: new Decimal(1.1).times(new Decimal(1.03).pow(level)),
		FLCapAndSpeed: new Decimal(1.5).times(new Decimal(1.02).pow(level)),
	},
}

function getProteinCount() {
	let rubisco = storage.entropyUpgradeFactor.rubisco;
	let extensin = storage.entropyUpgradeFactor.extensin;
	let arganine = storage.entropyUpgradeFactor.arganine;
	let glutamine = storage.entropyUpgradeFactor.glutamine;
	let glutamate = storage.entropyUpgradeFactor.glutamate;
	let asparagine = storage.entropyUpgradeFactor.asparagine;
	let agp = storage.entropyUpgradeFactor.agp;
	let trb = storage.entropyUpgradeFactor.trb;
	
	let totalProteins = [
		rubisco, extensin, arganine, glutamine, glutamate, asparagine, agp, trb
	]
	return totalProteins;
}

function getRandomNumbers(max) {
	let num1 = Math.floor(Math.random() * max);
	let num2;
	do {
		num2 = Math.floor(Math.random() * max);
	} while (num2 === num1);
	return [num1, num2];
}

class Microorganism {
	constructor(natureType) {
		this.natureType = natureType;
	}
	type() {
		Object.keys(typeIndicator).forEach(key => {
			const current = getProteinCount();
			const value = typeIndicator[key];
			console.debug(`${key}: ${value}`);
			console.debug(value);
			
			let baseSucceeded = new Decimal(0);
			for (let i = 0; i < value.length; i++) {
				if (current[i].greaterThanOrEqualTo(value[i])) {
					baseSucceeded = baseSucceeded.plus(new Decimal(1));
				}
			}
			console.debug(`${baseSucceeded}`);
			if (baseSucceeded.greaterThanOrEqualTo(new Decimal(8))) {
				console.debug(`There is a match! The microorganism type is ${key}`);
				return key;
			}
		});
	}
	nature() {
		let x;
		let keysArray;
		let chosenEffect;
		switch (this.natureType) {
			case "lively": 
				console.debug("A microorganism with a Lively nature was just created");
				x = getRandomNumbers(5);
				keysArray = Object.keys(natureConfigs.lively);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					currentNature = natureConfigs.lively[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${currentNature}`);
				}
				break;
			case "grounded": 
				console.debug("A microorganism with a Grounded nature was just created");
				x = getRandomNumbers(5);
				keysArray = Object.keys(natureConfigs.grounded);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					currentNature = natureConfigs.grounded[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${currentNature}`);
				}
				break;
			case "bountiful": 
				console.debug("A microorganism with a Bountiful nature was just created");
				x = getRandomNumbers(5);
				keysArray = Object.keys(natureConfigs.bountiful);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					currentNature = natureConfigs.bountiful[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${currentNature}`);
				}
				break;
			case "chaotic": 
				console.debug("A microorganism with a Chaotic nature was just created");
				x = getRandomNumbers(5);
				keysArray = Object.keys(natureConfigs.chaotic);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					currentNature = natureConfigs.chaotic[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${currentNature}`);
				}
				break;
			case "reinforced": 
				console.debug("A microorganism with a Reinforced nature was just created");
				x = getRandomNumbers(5);
				keysArray = Object.keys(natureConfigs.reinforced);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					currentNature = natureConfigs.reinforced[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${currentNature}`);
				}
				break;
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const livelyMicroorganism = new Microorganism("lively");
	livelyMicroorganism.type();
	livelyMicroorganism.nature();
	const groundedMicroorganism = new Microorganism("grounded");
	groundedMicroorganism.nature();
	const bountifulMicroorganism = new Microorganism("bountiful");
	bountifulMicroorganism.nature();
	const chaoticMicroorganism = new Microorganism("chaotic");
	chaoticMicroorganism.nature();
	const reinforcedMicroorganism = new Microorganism("reinforced");
	reinforcedMicroorganism.nature();
});
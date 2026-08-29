import * as storage from './core/bunchobullshit.mjs';
import { achievements } from './achievements.mjs';
import { loadMicroorganisms, activeMicroorganisms } from './core/calculations.mjs';
import { microorganismTimer } from './core/gameloopbutmodule.mjs';

let level = new Decimal(0);

let livelyMicroorganism;
let chronalMicroorganism;
let groundedMicroorganism;
let bountifulMicroorganism;
let chaoticMicroorganism;
let reinforcedMicroorganism;

//If you're too lazy to read the Microorganism info box here's the formula for each type of Microorganism
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

const effectVisualSorter = [
	"amoebaallResources",
	"amoebasecondaryResourcePow",
	"amoebagameSpeedPow",
	"amoebaallSoftcapBase",
	"amoebareinforcementMultPow",
	"tardigradesupercapMult",
	"tardigradeleafSeedPERoots",
	"tardigradesuperScalingEffect",
	"tardigradeDNABlueprintNerf",
	"tardigradeM1SoftcapDelay",
	"yeastCRSBasePow",
	"yeastbacteriaCapBasePow",
	"yeastCRSCapPow",
	"yeastasparaginePow",
	"yeastextensinPow",
	"mossSporemossBasePow", 
	"mossSporemossEffectPow", 
	"mossSporemossMilestoneEffect", 
	"mossSporemossUpgradeEffect", 
	"mossSporewildfireReward", 
	"algaeLSFR1Effect", 
	"algaerepeatableDiscount", 
	"algaeglutamateEffect", 
	"algaefreeM5M6Levels", 
	"algaeM6AllEffect", 
	"livelyleafBasePow", 
	"livelyleafSoftcapBase", 
	"livelyLR1Effect", 
	"livelyLR2Effect", 
	"livelystormReward", 
	"chronalTASBasePow", 
	"chronalgameSpeedMult", 
	"chronalM3BaseEffect", 
	"chronalcompostingSpeedPow", 
	"chronalSR2Effect", 
	"groundedseedBasePow", 
	"groundedseedSoftcapBase", 
	"groundedSR1Effect", 
	"groundedTASBasePow", 
	"groundedseedSupercapMult", 
	"bountifulfruitBasePow", 
	"bountifulFR1Effect", 
	"bountifulM1SoftcapDelay", 
	"bountifulfruitSupercapMult", 
	"bountifulwildfireReward", 
	"chaoticentropyBasePow", 
	"chaoticCRSBasePow", 
	"chaoticbacteriaCapBasePow", 
	"chaoticRNAMult", 
	"chaoticfreeProteins", 
	"reinforcedrootsBaseMult", 
	"reinforcedreinforcementsMult", 
	"reinforcedallSupercaps",
	"reinforcedwelderEffect",
	"reinforcedFLSpeed",
]

// this was the old code for the configs

// const typeConfigs = {
	// amoeba: {
		// allResources: new Decimal(2).pow(level.plus(new Decimal(1))),
		// secondaryResourcePow: new Decimal(1.1).plus(new Decimal(0.05).times(level)),
		// gameSpeedMult: new Decimal(10).pow(level.plus(new Decimal(1))),
		// allSoftcapBase: new Decimal(0.01).plus(new Decimal(0.0025).times(level)),
		// reinforcmentMultPow: new Decimal(8).times(level.plus(new Decimal(1))),
	// },
	// tardigrade: {
		// supercapMult: new Decimal(1.5).plus(new Decimal(0.05).times(level)),
		// leafSeedPERoots: new Decimal(1.5).plus(new Decimal(0.1).times(level)),
		// superScalingEffect: new Decimal(1.5).plus(new Decimal(0.05).times(level)),
		// DNABlueprintNerf: new Decimal(0.05).plus(new Decimal(0.01).times(level)),
		// M1SoftcapDelay: new Decimal(50).plus(new Decimal(50).times(level)),
	// },
	// yeast: {
		// CRSBasePow: new Decimal(1.2).plus(new Decimal(0.05).times(level)),
		// bacteriaCapBasePow: new Decimal(1.4).plus(new Decimal(0.05).times(level)),
		// cellsMultPow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		// AGPSoftcapDelay: new Decimal(0.05).plus(new Decimal(0.01).times(level)),
		// extensinPow: new Decimal(1.3).plus(new Decimal(0.05).times(level)),
	// },
	// mossSpore: {
		// mossBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		// mossEffectPow: new Decimal(2).plus(new Decimal(0.25).times(level)),
		// mossMilestoneEffect: new Decimal(1.1).plus(new Decimal(0.025).times(level)),
		// mossUpgradeEffect: new Decimal(1.1).plus(new Decimal(0.025).times(level)),
		// wildfireReward: new Decimal(1.5).times(new Decimal(1.02).pow(level)),
	// },
	// algae: {
		// LSFR1Effect: new Decimal(1.3).plus(new Decimal(0.05).times(level)),
		// LSFR1Discount: new Decimal(1.3).plus(new Decimal(0.05).times(level)),
		// glutamateEffect: new Decimal(1.5).plus(new Decimal(0.1).times(level)),
		// freeM6Levels: new Decimal(30).plus(new Decimal(30).times(level)),
		// LSFR2Cap: new Decimal(15).plus(new Decimal(15).times(level)),
	// },
// }

// const natureConfigs = {
	// lively: {
		// leafBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		// leafSoftcapBase: new Decimal(0.01).plus(new Decimal(0.0025).times(level)),
		// LR1Effect: new Decimal(2).times(new Decimal(1.02).pow(level)),
		// LR2Effect: new Decimal(1.02).pow(level.plus(new Decimal(1))),
		// stormReward: new Decimal(1.1).plus(new Decimal(0.05).times(level)),
	// },
	// chronal: {
		// TASBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		// gameSpeedMult: new Decimal(10).pow(level.plus(new Decimal(1))),
		// M3BaseEffect: new Decimal(4).plus(new Decimal(0.5).times(level)),
		// compostingSpeedPow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		// SR2Effect: new Decimal(1.1).pow(level.plus(new Decimal(1))),
	// },
	// grounded: {
		// seedBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		// seedSoftcapBase: new Decimal(0.01).plus(new Decimal(0.0025).times(level)),
		// SR1Effect: new Decimal(2).times(new Decimal(1.02).pow(level)),
		// TASBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		// seedSupercapMult: new Decimal(1.6).plus(new Decimal(0.05).times(level)),
	// },
	// bountiful: {
		// fruitBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		// FR1Effect: new Decimal(1.5).times(new Decimal(1.02).pow(level)),
		// M1SoftcapDelay: new Decimal(50).plus(new Decimal(50).times(level)),
		// fruitSupercapMult: new Decimal(1.6).plus(new Decimal(0.05).times(level)),
		// wildfireReward: new Decimal(1.5).times(new Decimal(1.02).pow(level)),
	// },
	// chaotic: {
		// entropyBaseMult: new Decimal(1e6).pow(level.plus(new Decimal(1))),
		// CRSBasePow: new Decimal(1.2).plus(new Decimal(0.05).times(level)),
		// bacteriaCapBasePow: new Decimal(1.4).plus(new Decimal(0.05).times(level)),
		// RNAMult: new Decimal(1.25).plus(new Decimal(0.1).times(level)),
		// freeProteins: new Decimal(1.05).pow(level.plus(new Decimal(1))),
	// },
	// reinforced: {
		// rootsBaseMult: new Decimal(2.5).times(level.plus(new Decimal(1))),
		// reinforcementsMult: new Decimal(2).times(level.plus(new Decimal(1))),
		// allSupercaps: new Decimal(0.5).plus(new Decimal(0.1).times(level)),
		// welderEffect: new Decimal(1.1).times(new Decimal(1.03).pow(level)),
		// FLCapAndSpeed: new Decimal(1.5).times(new Decimal(1.02).pow(level)),
	// },
// }

// const natureVisuals = {
	// lively: {
		// slotID: 1,
		// natureName: "Lively",
		// natureSrc: "./src/images/leaf.png",
		// color: "#50bb50",
		// effects: {
			// leafBasePow: `^${storage.truncateToDecimalPlaces(natureConfigs.lively.leafBasePow, 3)} Leaf base mult`,
			// leafSoftcapBase: `-${storage.truncateToDecimalPlaces(natureConfigs.lively.leafSoftcapBase, 3)} Leaf softcap root`,
			// LR1Effect: `x${storage.truncateToDecimalPlaces(natureConfigs.lively.LR1Effect, 3)} LR1's effect`,
			// LR2Effect: `x${storage.truncateToDecimalPlaces(natureConfigs.lively.LR2Effect, 3)} LR2's effect`,
			// stormReward: `^${storage.truncateToDecimalPlaces(natureConfigs.lively.stormReward, 3)} Storm rewards`,
		// },
	// },
	// chronal: {
		// slotID: 2,
		// natureName: "Chronal",
		// natureSrc: "./src/images/clock.png",
		// color: "#bf612e",
		// effects: {
			// TASBasePow: `^${storage.truncateToDecimalPlaces(natureConfigs.chronal.TASBasePow, 3)} Tree Aging speed`,
			// gameSpeedMult: `x${storage.truncateToDecimalPlaces(natureConfigs.chronal.gameSpeedMult, 3)} Game speed`,
			// M3BaseEffect: `x${storage.truncateToDecimalPlaces(natureConfigs.chronal.M3BaseEffect, 3)} M3's effect`,
			// compostingSpeedPow: `^${storage.truncateToDecimalPlaces(natureConfigs.chronal.compostingSpeedPow, 3)} Composting speed`,
			// SR2Effect: `x${storage.truncateToDecimalPlaces(natureConfigs.chronal.SR2Effect, 3)} SR2's effect`,
		// }
	// },
	// grounded: {
		// slotID: 3,
		// natureName: "Grounded",
		// natureSrc: "./src/images/seed.png",
		// color: "#dc8616",
		// effects: {
			// seedBasePow: `^${storage.truncateToDecimalPlaces(natureConfigs.grounded.seedBasePow, 3)} Seed base mult`,
			// seedSoftcapBase: `-${storage.truncateToDecimalPlaces(natureConfigs.grounded.seedSoftcapBase, 3)} Seed softcap root`,
			// SR1Effect: `x${storage.truncateToDecimalPlaces(natureConfigs.grounded.SR1Effect, 3)} SR1's effect`,
			// TASBasePow: `^${storage.truncateToDecimalPlaces(natureConfigs.grounded.TASBasePow, 3)} Tree Aging speed`,
			// seedSupercapMult: `x${storage.truncateToDecimalPlaces(natureConfigs.grounded.seedSupercapMult, 3)} Seed supercap root`,
		// }
	// },
	// bountiful: {
		// slotID: 4,
		// natureName: "Bountiful",
		// natureSrc: "./src/images/fruit.png",
		// color: "#de0e0e",
		// effects: {
			// fruitBasePow: `^${storage.truncateToDecimalPlaces(natureConfigs.bountiful.fruitBasePow, 3)} Fruit base mult`,
			// FR1Effect: `x${storage.truncateToDecimalPlaces(natureConfigs.bountiful.FR1Effect, 3)} FR1's effect`,
			// M1SoftcapDelay: `M1's effect softcap starts +${storage.truncateToDecimalPlaces(natureConfigs.bountiful.M1SoftcapDelay, 3)} later`,
			// fruitSupercapMult: `x${storage.truncateToDecimalPlaces(natureConfigs.bountiful.fruitSupercapMult, 3)} Fruit supercap root`,
			// wildfireReward: `x${storage.truncateToDecimalPlaces(natureConfigs.bountiful.wildfireReward, 3)} Wildfire rewards`,
		// }
	// },
	// chaotic: {
		// slotID: 5,
		// natureName: "Chaotic",
		// natureSrc: "./src/images/entropy.png",
		// color: "#2077ba",
		// effects: {
			// entropyBaseMult: `x${storage.truncateToDecimalPlaces(natureConfigs.chaotic.entropyBaseMult, 3)} Entropy`,
			// CRSBasePow: `^${storage.truncateToDecimalPlaces(natureConfigs.chaotic.CRSBasePow, 3)} Cell Replication speed`,
			// bacteriaCapBasePow: `^${storage.truncateToDecimalPlaces(natureConfigs.chaotic.bacteriaCapBasePow, 3)} Bacteria cap`,
			// RNAMult: `x${storage.truncateToDecimalPlaces(natureConfigs.chaotic.RNAMult, 3)} RNA`,
			// freeProteins: `+${storage.truncateToDecimalPlaces(natureConfigs.chaotic.freeProteins, 3)} free Proteins`,
		// }
	// },
	// reinforced: {
		// slotID: 6,
		// natureName: "Reinforced",
		// natureSrc: "./src/images/root.png",
		// color: "#edac13",
		// effects: {
			// rootsBaseMult: `x${storage.truncateToDecimalPlaces(natureConfigs.reinforced.rootsBaseMult, 3)} Roots`,
			// reinforcementsMult: `x${storage.truncateToDecimalPlaces(natureConfigs.reinforced.reinforcementsMult, 3)} Reinforcements`,
			// allSupercaps: `+${storage.truncateToDecimalPlaces(natureConfigs.reinforced.allSupercaps, 3)} to all supercap roots`,
			// welderEffect: `x${storage.truncateToDecimalPlaces(natureConfigs.reinforced.welderEffect, 3)} Blizzard rewards`,
			// FLCapAndSpeed: `x${storage.truncateToDecimalPlaces(natureConfigs.reinforced.FLCapAndSpeed, 3)} Fallen Leaves cap and speed`,
		// }
	// },
// }

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

class BaseMicroorganism {
	constructor(natureType) {
		this.natureType = natureType;
		this.typeType;
		this.type = [];
		this.nature = [];
		this.natureKeys = [];
	}
	
	setType() {
		Object.keys(typeIndicator).forEach(key => {
			const current = getProteinCount();
			const value = typeIndicator[key];
			
			let baseSucceeded = new Decimal(0);
			for (let i = 0; i < value.length; i++) {
				let test1 = value[i].lt(new Decimal(1));
				let test2 = current[i].gt(value[i]);
				if (test1 && test2) {
					break;
				}
				if (current[i].gte(value[i])) {
					baseSucceeded = baseSucceeded.plus(new Decimal(1));
				}
			}
			if (baseSucceeded.gte(new Decimal(8))) {
				this.typeType = `${key}`;
			}
		});
	}
}

const microorganismProperties = (superclass) => class extends superclass {
	constructor(natureType) {
		super(natureType)
		this.level = new Decimal(0);
		this.typeType = [];
		this.type = [];
		this.typeKeys = [];
		this.nature = [];
		this.natureKeys = [];
	}
	
	setLevel() {
		let proteins = getProteinCount();
		let temporaryDiv;
		let highestDiv = new Decimal(0);
		switch (this.typeType) {
			case "amoeba":
				for (let i = 0; i < typeIndicator.amoeba.length; i++) {
					temporaryDiv = proteins[i].div(typeIndicator.amoeba[i]);
					if (temporaryDiv.gt(highestDiv)) {
						highestDiv = temporaryDiv;
					}
				}
				this.level = highestDiv.trunc();
				break;
			case "tardigrade":
				for (let i = 0; i < typeIndicator.tardigrade.length; i++) {
					temporaryDiv = proteins[i].div(typeIndicator.tardigrade[i]);
					if (temporaryDiv.gt(highestDiv)) {
						highestDiv = temporaryDiv;
					}
				}
				this.level = highestDiv.trunc();
				break;
			case "yeast":
				for (let i = 0; i < typeIndicator.yeast.length; i++) {
					temporaryDiv = proteins[i].div(typeIndicator.yeast[i]);
					if (temporaryDiv.gt(highestDiv)) {
						highestDiv = temporaryDiv;
					}
				}
				this.level = highestDiv.trunc();
				break;
			case "mossSpore":
				for (let i = 0; i < typeIndicator.mossSpore.length; i++) {
					temporaryDiv = proteins[i].div(typeIndicator.mossSpore[i]);
					if (temporaryDiv.gt(highestDiv)) {
						highestDiv = temporaryDiv;
					}
				}
				this.level = highestDiv.trunc();
				break;
			case "algae":
				for (let i = 0; i < typeIndicator.algae.length; i++) {
					temporaryDiv = proteins[i].div(typeIndicator.algae[i]);
					if (temporaryDiv.gt(highestDiv)) {
						highestDiv = temporaryDiv;
					}
				}
				this.level = highestDiv.trunc();
				break;
		}
		if (this.level.gte(new Decimal(20))) {
			this.level = storage.SC(this.level, new Decimal(20), new Decimal(0.15));
		}
		this.level = this.level.trunc();
	}
	
	get typeConfigs() {
		return {
			amoeba: {
				allResources: new Decimal(1.1).pow(this.level.plus(new Decimal(1))),
				secondaryResourcePow: new Decimal(1.1).plus(new Decimal(0.05).times(this.level)),
				gameSpeedPow: new Decimal(1.01).plus(this.level.times(new Decimal(0.01))),
				allSoftcapBase: new Decimal(0.01).plus(new Decimal(0.0025).times(this.level)),
				reinforcementMultPow: new Decimal(8).times(this.level.plus(new Decimal(1))),
			},
			tardigrade: {
				supercapMult: new Decimal(1.5).plus(new Decimal(0.05).times(this.level)),
				leafSeedPERoots: new Decimal(0.1).plus(new Decimal(0.005).times(this.level)),
				superScalingEffect: new Decimal(1.5).plus(new Decimal(0.05).times(this.level)),
				DNABlueprintNerf: new Decimal(0.05).plus(new Decimal(0.01).times(this.level)),
				M1SoftcapDelay: new Decimal(50).plus(new Decimal(50).times(this.level)),
			},
			yeast: {
				CRSBasePow: new Decimal(1.1).plus(new Decimal(0.02).times(this.level)),
				bacteriaCapBasePow: new Decimal(1.4).plus(new Decimal(0.05).times(this.level)),
				CRSCapPow: new Decimal(1.25).plus(new Decimal(0.05).times(this.level)),
				asparaginePow: new Decimal(10).plus(new Decimal(22.5).times(this.level)),
				extensinPow: new Decimal(1.3).plus(new Decimal(0.05).times(this.level)),
			},
			mossSpore: {
				mossBasePow: new Decimal(1.1).plus(new Decimal(0.005).times(this.level)),
				mossEffectPow: new Decimal(2).plus(new Decimal(0.25).times(this.level)),
				mossMilestoneEffect: new Decimal(1.1).pow(this.level.plus(new Decimal(1))),
				mossUpgradeEffect: new Decimal(1.1).pow(this.level.plus(new Decimal(1))),
				wildfireReward: new Decimal(1.5).times(new Decimal(1.02).pow(this.level)),
			},
			algae: {
				LSFR1Effect: new Decimal(5).times(new Decimal(1.03).pow(this.level)),
				repeatableDiscount: new Decimal(0.95).minus(new Decimal(0.0025).times(this.level)),
				glutamateEffect: new Decimal(1).plus(new Decimal(0.025).times(this.level)),
				freeM5M6Levels: new Decimal(1.1).plus(new Decimal(0.005).times(this.level)),
				M6AllEffect: new Decimal(0.005).plus(new Decimal(0.001).times(this.level)),
			}
		}
	}
	
	get natureConfigs() {
		return {
			lively: {
				leafBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(this.level)),
				leafSoftcapBase: new Decimal(0.01).plus(new Decimal(0.0025).times(this.level)),
				LR1Effect: new Decimal(10).times(new Decimal(1.02).pow(this.level)),
				LR2Effect: new Decimal(1.02).pow(this.level.plus(new Decimal(1))),
				stormReward: new Decimal(1.1).plus(new Decimal(0.05).times(this.level)),
			},
			chronal: {
				TASBasePow: new Decimal(1.1).plus(new Decimal(0.015).times(this.level)),
				gameSpeedPow: new Decimal(1.01).plus(this.level.times(new Decimal(0.01))),
				M3BaseEffect: new Decimal(4).plus(new Decimal(0.5).times(this.level)),
				compostingSpeedPow: new Decimal(1.25).plus(new Decimal(0.05).times(this.level)),
				SR2Effect: new Decimal(1.1).pow(this.level.plus(new Decimal(1))),
			},
			grounded: {
				seedBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(this.level)),
				seedSoftcapBase: new Decimal(0.01).plus(new Decimal(0.0025).times(this.level)),
				SR1Effect: new Decimal(5).times(new Decimal(1.02).pow(this.level)),
				TASBasePow: new Decimal(1.1).plus(new Decimal(0.015).times(this.level)),
				seedSupercapMult: new Decimal(1.5).plus(new Decimal(0.05).times(this.level)),
			},
			bountiful: {
				fruitBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(this.level)),
				FR1Effect: new Decimal(2.5).times(new Decimal(1.02).pow(this.level)),
				M1SoftcapDelay: new Decimal(50).plus(new Decimal(50).times(this.level)),
				fruitSupercapMult: new Decimal(1.5).plus(new Decimal(0.05).times(this.level)),
				wildfireReward: new Decimal(1.5).times(new Decimal(1.02).pow(this.level)),
			},
			chaotic: {
				entropyBasePow: new Decimal(1.01).plus(this.level.times(new Decimal(0.01))),
				CRSBasePow: new Decimal(1.1).plus(new Decimal(0.02).times(this.level)),
				bacteriaCapBasePow: new Decimal(1.4).plus(new Decimal(0.05).times(this.level)),
				RNAMult: new Decimal(1.25).plus(new Decimal(0.1).times(this.level)),
				freeProteins: new Decimal(1.15).pow(this.level.plus(new Decimal(1))),
			},
			reinforced: {
				rootsBaseMult: new Decimal(0.02).times(this.level.plus(new Decimal(1))),
				reinforcementsMult: new Decimal(0.025).times(this.level.plus(new Decimal(1))),
				allSupercaps: new Decimal(0.5).plus(new Decimal(0.1).times(this.level)),
				welderEffect: new Decimal(0.1).times(new Decimal(1.055).pow(this.level)),
				FLSpeed: new Decimal(0.1).times(new Decimal(1.05).pow(this.level)),
			}
		}
	}
	
	get natureVisuals() {
		return {
			lively: {
				slotID: 1,
				natureName: "Lively",
				natureSrc: "./src/images/leaf.png",
				color: "#50bb50",
				effects: {
					leafBasePow: `^${storage.truncateToDecimalPlaces(this.natureConfigs.lively.leafBasePow, 3)} Leaf base mult`,
					leafSoftcapBase: `-${storage.truncateToDecimalPlaces(this.natureConfigs.lively.leafSoftcapBase, 3)} Leaf softcap root`,
					LR1Effect: `x${storage.truncateToDecimalPlaces(this.natureConfigs.lively.LR1Effect, 3)} LR1's effect`,
					LR2Effect: `x${storage.truncateToDecimalPlaces(this.natureConfigs.lively.LR2Effect, 3)} LR2's effect`,
					stormReward: `^${storage.truncateToDecimalPlaces(this.natureConfigs.lively.stormReward, 3)} Storm rewards`,
				},
			},
			chronal: {
				slotID: 2,
				natureName: "Chronal",
				natureSrc: "./src/images/clock.png",
				color: "#bf612e",
				effects: {
					TASBasePow: `^${storage.truncateToDecimalPlaces(this.natureConfigs.chronal.TASBasePow, 3)} Tree Aging speed`,
					gameSpeedPow: `^${storage.truncateToDecimalPlaces(this.natureConfigs.chronal.gameSpeedPow, 3)} Game speed`,
					M3BaseEffect: `x${storage.truncateToDecimalPlaces(this.natureConfigs.chronal.M3BaseEffect, 3)} M3's effect`,
					compostingSpeedPow: `^${storage.truncateToDecimalPlaces(this.natureConfigs.chronal.compostingSpeedPow, 3)} Composting speed`,
					SR2Effect: `x${storage.truncateToDecimalPlaces(this.natureConfigs.chronal.SR2Effect, 3)} SR2's effect`,
				}
			},
			grounded: {
				slotID: 3,
				natureName: "Grounded",
				natureSrc: "./src/images/seed.png",
				color: "#dc8616",
				effects: {
					seedBasePow: `^${storage.truncateToDecimalPlaces(this.natureConfigs.grounded.seedBasePow, 3)} Seed base mult`,
					seedSoftcapBase: `-${storage.truncateToDecimalPlaces(this.natureConfigs.grounded.seedSoftcapBase, 3)} Seed softcap root`,
					SR1Effect: `x${storage.truncateToDecimalPlaces(this.natureConfigs.grounded.SR1Effect, 3)} SR1's effect`,
					TASBasePow: `^${storage.truncateToDecimalPlaces(this.natureConfigs.grounded.TASBasePow, 3)} Tree Aging speed`,
					seedSupercapMult: `x${storage.truncateToDecimalPlaces(this.natureConfigs.grounded.seedSupercapMult, 3)} Seed supercap root`,
				}
			},
			bountiful: {
				slotID: 4,
				natureName: "Bountiful",
				natureSrc: "./src/images/fruit.png",
				color: "#de0e0e",
				effects: {
					fruitBasePow: `^${storage.truncateToDecimalPlaces(this.natureConfigs.bountiful.fruitBasePow, 3)} Fruit base mult`,
					FR1Effect: `x${storage.truncateToDecimalPlaces(this.natureConfigs.bountiful.FR1Effect, 3)} FR1's effect`,
					M1SoftcapDelay: `M1's effect softcap starts +${storage.truncateToDecimalPlaces(this.natureConfigs.bountiful.M1SoftcapDelay, 3)} later`,
					fruitSupercapMult: `x${storage.truncateToDecimalPlaces(this.natureConfigs.bountiful.fruitSupercapMult, 3)} Fruit supercap root`,
					wildfireReward: `x${storage.truncateToDecimalPlaces(this.natureConfigs.bountiful.wildfireReward, 3)} Wildfire rewards`,
				}
			},
			chaotic: {
				slotID: 5,
				natureName: "Chaotic",
				natureSrc: "./src/images/entropy.png",
				color: "#2077ba",
				effects: {
					entropyBasePow: `^${storage.truncateToDecimalPlaces(this.natureConfigs.chaotic.entropyBasePow, 3)} Entropy`,
					CRSBasePow: `^${storage.truncateToDecimalPlaces(this.natureConfigs.chaotic.CRSBasePow, 3)} Cell Replication speed`,
					bacteriaCapBasePow: `^${storage.truncateToDecimalPlaces(this.natureConfigs.chaotic.bacteriaCapBasePow, 3)} Bacteria cap`,
					RNAMult: `x${storage.truncateToDecimalPlaces(this.natureConfigs.chaotic.RNAMult, 3)} RNA`,
					freeProteins: `+${storage.truncateToDecimalPlaces(this.natureConfigs.chaotic.freeProteins, 3)} free Proteins`,
				}
			},
			reinforced: {
				slotID: 6,
				natureName: "Reinforced",
				natureSrc: "./src/images/root.png",
				color: "#edac13",
				effects: {
					rootsBaseMult: `+x${storage.truncateToDecimalPlaces(this.natureConfigs.reinforced.rootsBaseMult, 3)} Root mult`,
					reinforcementsMult: `+x${storage.truncateToDecimalPlaces(this.natureConfigs.reinforced.reinforcementsMult, 3)} Reinforcement mult`,
					allSupercaps: `+${storage.truncateToDecimalPlaces(this.natureConfigs.reinforced.allSupercaps, 3)} to all supercap roots`,
					welderEffect: `+x${storage.truncateToDecimalPlaces(this.natureConfigs.reinforced.welderEffect, 3)} Welder effect`,
					FLSpeed: `+x${storage.truncateToDecimalPlaces(this.natureConfigs.reinforced.FLSpeed, 3)} Fallen Leaves fall speed`,
				}
			}
		}
	}
	
	get typeVisuals() {
		return {
			amoeba: {
				typeName: "Amoeba",
				typeSrc: "./src/images/amoeba.png",
				color: "#ffffff",
				effects: {
					allResources: `x${storage.truncateToDecimalPlaces(this.typeConfigs.amoeba.allResources, 3)} all resources`,
					secondaryResourcePow: `^${storage.truncateToDecimalPlaces(this.typeConfigs.amoeba.secondaryResourcePow, 3)} all secondary resources`,
					gameSpeedPow: `^${storage.truncateToDecimalPlaces(this.typeConfigs.amoeba.gameSpeedPow, 3)} Game speed`,
					allSoftcapBase: `-${storage.truncateToDecimalPlaces(this.typeConfigs.amoeba.allSoftcapBase, 3)} from all softcap roots`,
					reinforcementMultPow: `+^${storage.truncateToDecimalPlaces(this.typeConfigs.amoeba.reinforcementMultPow, 3)} Reinforcement multipliers`,
				}
			},
			tardigrade: {
				typeName: "Tardigrade",
				typeSrc: "./src/images/tardigrade.png",
				color: "#ab9c84",
				effects: {
					supercapMult: `x${storage.truncateToDecimalPlaces(this.typeConfigs.tardigrade.supercapMult, 3)} all supercap roots`,
					leafSeedPERoots: `-${storage.truncateToDecimalPlaces(this.typeConfigs.tardigrade.leafSeedPERoots, 3)} Leaf and Seed root from PE's formula`,
					superScalingEffect: `/${storage.truncateToDecimalPlaces(this.typeConfigs.tardigrade.superScalingEffect, 3)} Fertilizer Super Scaling effect`,
					DNABlueprintNerf: `-${storage.truncateToDecimalPlaces(this.typeConfigs.tardigrade.DNABlueprintNerf, 3)} from the total DNA Blueprint nerf`,
					M1SoftcapDelay: `M1's effect softcap starts +${storage.truncateToDecimalPlaces(this.typeConfigs.tardigrade.M1SoftcapDelay, 3)} later`,
				}
			},
			yeast: {
				typeName: "Yeast",
				typeSrc: "./src/images/yeast.png",
				color: "#e8c080",
				effects: {
					CRSBasePow: `^${storage.truncateToDecimalPlaces(this.typeConfigs.yeast.CRSBasePow, 3)} Cell Replication speed`,
					bacteriaCapBasePow: `^${storage.truncateToDecimalPlaces(this.typeConfigs.yeast.bacteriaCapBasePow, 3)} Bacteria cap`,
					CRSCapPow: `^${storage.truncateToDecimalPlaces(this.typeConfigs.yeast.CRSCapPow, 3)} Cell Replication cap`,
					asparaginePow: `^${storage.truncateToDecimalPlaces(this.typeConfigs.yeast.asparaginePow, 3)} Asparagine's effect`,
					extensinPow: `^${storage.truncateToDecimalPlaces(this.typeConfigs.yeast.extensinPow, 3)} Extensin's effect`,
				}
			},
			mossSpore: {
				typeName: "Moss Spores",
				typeSrc: "./src/images/mossSpore.png",
				color: "#1a8229",
				effects: {
					mossBasePow: `^${storage.truncateToDecimalPlaces(this.typeConfigs.mossSpore.mossBasePow, 3)} Moss`,
					mossEffectPow: `^${storage.truncateToDecimalPlaces(this.typeConfigs.mossSpore.mossEffectPow, 3)} Moss effect`,
					mossMilestoneEffect: `x${storage.truncateToDecimalPlaces(this.typeConfigs.mossSpore.mossMilestoneEffect, 3)} Moss Milestone effect`,
					mossUpgradeEffect: `x${storage.truncateToDecimalPlaces(this.typeConfigs.mossSpore.mossUpgradeEffect, 3)} Moss Upgrade effect`,
					wildfireReward: `x${storage.truncateToDecimalPlaces(this.typeConfigs.mossSpore.wildfireReward, 3)} Wildfire rewards`,
				}
			},
			algae: {
				typeName: "Algae",
				typeSrc: "./src/images/algae.png",
				color: "#1cb814",
				effects: {
					LSFR1Effect: `x${storage.truncateToDecimalPlaces(this.typeConfigs.algae.LSFR1Effect, 3)} L, S, and F first repeatable effects`,
					repeatableDiscount: `^${storage.truncateToDecimalPlaces(this.typeConfigs.algae.repeatableDiscount, 3)} all repeatable costs`,
					glutamateEffect: `x${storage.truncateToDecimalPlaces(this.typeConfigs.algae.glutamateEffect, 3)} Glutamate's effect`,
					freeM5M6Levels: `x${storage.truncateToDecimalPlaces(this.typeConfigs.algae.freeM5M6Levels, 3)} M5 & M6 levels`,
					M6AllEffect: `+^${storage.truncateToDecimalPlaces(this.typeConfigs.algae.M6AllEffect, 3)} M6's effect x all repeatable effects`,
				}
			},
		}
	}
	
	setEffects() {
		let x;
		let keysArray;
		let chosenEffect;
		let temporaryType;
		
		this.type = [];
		this.typeKeys = [];
		
		switch (this.typeType) {
			case undefined:
				break;
			case "amoeba":
				x = getRandomNumbers(5);
				keysArray = Object.keys(this.typeConfigs.amoeba);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryType = this.typeConfigs.amoeba[`${chosenEffect}`];
					this.type.push(temporaryType);
					this.typeKeys.push(chosenEffect);
				}
				break;
			case "tardigrade":
				x = getRandomNumbers(5);
				keysArray = Object.keys(this.typeConfigs.tardigrade);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryType = this.typeConfigs.tardigrade[`${chosenEffect}`];
					this.type.push(temporaryType);
					this.typeKeys.push(chosenEffect);
				}
				break;
			case "yeast":
				x = getRandomNumbers(5);
				keysArray = Object.keys(this.typeConfigs.yeast);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryType = this.typeConfigs.yeast[`${chosenEffect}`];
					this.type.push(temporaryType);
					this.typeKeys.push(chosenEffect);
				}
				break;
			case "mossSpore":
				x = getRandomNumbers(5);
				keysArray = Object.keys(this.typeConfigs.mossSpore);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryType = this.typeConfigs.mossSpore[`${chosenEffect}`];
					this.type.push(temporaryType);
					this.typeKeys.push(chosenEffect);
				}
				break;
			case "algae":
				x = getRandomNumbers(5);
				keysArray = Object.keys(this.typeConfigs.algae);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryType = this.typeConfigs.algae[`${chosenEffect}`];
					this.type.push(temporaryType);
					this.typeKeys.push(chosenEffect);
				}
				break;
		}
		
		this.nature = [];
		this.natureKeys = [];
		
		let temporaryNature;
		switch (this.natureType) {
			case "lively": 
				x = getRandomNumbers(5);
				keysArray = Object.keys(this.natureConfigs.lively);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryNature = this.natureConfigs.lively[`${chosenEffect}`];
					this.nature.push(temporaryNature);
					this.natureKeys.push(chosenEffect);
				}
				break;
			case "chronal": 
				x = getRandomNumbers(5);
				keysArray = Object.keys(this.natureConfigs.chronal);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryNature = this.natureConfigs.chronal[`${chosenEffect}`];
					this.nature.push(temporaryNature);
					this.natureKeys.push(chosenEffect);
				}
				break;
			case "grounded": 
				x = getRandomNumbers(5);
				keysArray = Object.keys(this.natureConfigs.grounded);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryNature = this.natureConfigs.grounded[`${chosenEffect}`];
					this.nature.push(temporaryNature);
					this.natureKeys.push(chosenEffect);
				}
				break;
			case "bountiful": 
				x = getRandomNumbers(5);
				keysArray = Object.keys(this.natureConfigs.bountiful);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryNature = this.natureConfigs.bountiful[`${chosenEffect}`];
					this.nature.push(temporaryNature);
					this.natureKeys.push(chosenEffect);
				}
				break;
			case "chaotic": 
				x = getRandomNumbers(5);
				keysArray = Object.keys(this.natureConfigs.chaotic);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryNature = this.natureConfigs.chaotic[`${chosenEffect}`];
					this.nature.push(temporaryNature);
					this.natureKeys.push(chosenEffect);
				}
				break;
			case "reinforced": 
				x = getRandomNumbers(5);
				keysArray = Object.keys(this.natureConfigs.reinforced);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryNature = this.natureConfigs.reinforced[`${chosenEffect}`];
					this.nature.push(temporaryNature);
					this.natureKeys.push(chosenEffect);
				}
				break;
		}
	}
}

export class MicroorganismOnReinforcement extends microorganismProperties(BaseMicroorganism) {
	constructor(natureType) {
		super(natureType);
		this.typeType;
		this.type = [];
		this.typeKeys = [];
		this.level = new Decimal(0);
		this.nature = [];
		this.natureKeys = [];
	}
	
	id = null;
	
	get typeSource() {
		switch (this.typeType) {
			case "amoeba": 
				return super.typeVisuals.amoeba;
			case "tardigrade": 
				return super.typeVisuals.tardigrade;
			case "yeast": 
				return super.typeVisuals.yeast;
			case "mossSpore":
				return super.typeVisuals.mossSpore;
			case "algae": 
				return super.typeVisuals.algae;
		}
	};
	
	get natureSource() {
		switch (this.natureType) {
			case "lively": 
				return super.natureVisuals.lively;
			case "chronal": 
				return super.natureVisuals.chronal;
			case "grounded": 
				return super.natureVisuals.grounded;
			case "bountiful":
				return super.natureVisuals.bountiful;
			case "chaotic": 
				return super.natureVisuals.chaotic;
			case "reinforced": 
				return super.natureVisuals.reinforced;
		}
	}
	
	
	
	createMicroorganism() {
		super.setType();
		super.setLevel();
		super.setEffects();
		
		if (this.typeType.length < 1) {
			return;
		}
		if (this.type === undefined) {
			return;
		}
		const template = document.getElementById('microorganism');
		const clone = document.importNode(template.content, true);
		
		let levelIndicator = clone.getElementById("levelIndicator");
		let levelCounter = clone.getElementById("microorganismLevelCounter");
		
		let typeImg = clone.getElementById("typeImg");
		let typeIndicator = clone.getElementById("typeIndicator");
		let totalEffects = clone.getElementById("microorganismTotalEffects");
		let typeEffects = clone.getElementById("typeEffects");
		
		let natureImg = clone.getElementById("natureImg");
		let natureIndicator = clone.getElementById("natureIndicator");
		let natureEffects = clone.getElementById("natureEffects");
		
		this.id = `level${storage.truncateToDecimalPlaces(this.level, 3)}${this.typeSource.typeName}${this.natureSource.natureName}`;
		clone.querySelector(".microorganism-individual-clickable").id = this.id;
		
		
		levelCounter.textContent = storage.truncateToDecimalPlaces(this.level, 3);
		levelIndicator.textContent = `Level ${storage.truncateToDecimalPlaces(this.level, 3)} `;
		
		typeImg.setAttribute("src", this.typeSource.typeSrc);
		totalEffects.setAttribute("style", `color: ${this.typeSource.color};`);
		typeIndicator.textContent = this.typeSource.typeName;
		
		let typeTextBase = [];
		let typeTextArray = [];
		let typeText = "";
		for (let i = 0; i < this.typeKeys.length; i++) {
			typeTextBase.push(this.typeKeys[i]);
			typeTextArray.push(this.typeSource.effects[`${typeTextBase[i]}`]);
			if (i >= 1) {
				typeText += `<br>${typeTextArray[i]}`;
			}
			else {
				typeText += typeTextArray[i];
			}
		}
		typeEffects.innerHTML = typeText;
		
		natureImg.setAttribute("src", this.natureSource.natureSrc);
		natureIndicator.setAttribute("style", `color: ${this.natureSource.color};`);
		natureIndicator.textContent = `${this.natureSource.natureName} `;
		natureEffects.setAttribute("style", `color: ${this.natureSource.color};`);
		
		let natureTextBase = [];
		let natureTextArray = [];
		let natureText = "";
		for (let i = 0; i < this.natureKeys.length; i++) {
			natureTextBase.push(this.natureKeys[i]);
			natureTextArray.push(this.natureSource.effects[`${natureTextBase[i]}`]);
			natureText += `<br>${natureTextArray[i]}`;
		}
		natureEffects.innerHTML = natureText;
		
		const container = document.getElementById(`microorganismsOnReinforcement${this.natureSource.slotID}`);
		container.appendChild(clone);
		
		//makes the microorganisms selectable
		$(".microorganism-on-reinforcement-background").selectable({
			cursor: "pointer", 
			filter: ".microorganism-individual-clickable",
			unselected: function(event, ui) {
				$(ui.unselected).css("background-color", "#525252");
				let id = $(ui.unselected).attr("id");
			}
		});
		$(".microorganism-on-reinforcement-background").on("click touchstart", ".microorganism-individual-clickable", function() {
			$('.microorganism-individual-clickable').removeClass('selected-item');
			$(this).addClass('selected-item');
			
			let id = $(this).attr("id");
			document.getElementById(id).style.backgroundColor = "#43d417";
			storage.gameData.selectedMicrooganism = id;
		});
	}
	
	deleteMicroorganism() {
		if (this.typeType.length < 1) {
			return;
		}
		let currentElement = document.getElementById(`level${storage.truncateToDecimalPlaces(this.level, 3)}${this.typeSource.typeName}${this.natureSource.natureName}`);
		
		currentElement.remove();
	}
}

let lastProteins = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)];
export function checkMicroorganisms() {
	if (livelyMicroorganism === undefined) {
		return;
	}
	
	let temporaryProteins = getProteinCount();
	let proteinsIsDifferent = false;
	
	for (let i = 0; i < lastProteins.length; i++) {
		proteinsIsDifferent = ((temporaryProteins[i].gt(lastProteins[i])) || (temporaryProteins[i].lt(lastProteins[i])));
		if (proteinsIsDifferent) {
			lastProteins = temporaryProteins;
			document.getElementById("currentProteinCounter").innerHTML = `Your current Protein setup is [${storage.truncateToDecimalPlaces(temporaryProteins[0], 3)}, ${storage.truncateToDecimalPlaces(temporaryProteins[1], 3)}, ${storage.truncateToDecimalPlaces(temporaryProteins[2], 3)}, ${storage.truncateToDecimalPlaces(temporaryProteins[3], 3)}, ${storage.truncateToDecimalPlaces(temporaryProteins[4], 3)}, ${storage.truncateToDecimalPlaces(temporaryProteins[5], 3)}, ${storage.truncateToDecimalPlaces(temporaryProteins[6], 3)}, ${storage.truncateToDecimalPlaces(temporaryProteins[7], 3)}].`;
			
			livelyMicroorganism.deleteMicroorganism();
			chronalMicroorganism.deleteMicroorganism();
			groundedMicroorganism.deleteMicroorganism();
			bountifulMicroorganism.deleteMicroorganism();
			chaoticMicroorganism.deleteMicroorganism();
			reinforcedMicroorganism.deleteMicroorganism();
			
			livelyMicroorganism.createMicroorganism();
			chronalMicroorganism.createMicroorganism();
			groundedMicroorganism.createMicroorganism();
			bountifulMicroorganism.createMicroorganism();
			chaoticMicroorganism.createMicroorganism();
			reinforcedMicroorganism.createMicroorganism();
		}
	}
}

class Microorganism extends microorganismProperties(BaseMicroorganism) {
	constructor(level, type, typeSource, typeKeys, typeEffects, nature, natureSource, natureKeys, natureEffects, id, slot) {
		super(nature);
		this.level = level;
		this.type = type;
		this.typeSource = typeSource;
		this.natureSource = natureSource;
		this.typeType = type;
		this.typeKeys = typeKeys;
		this.typeEffects = typeEffects;
		this.nature = nature;
		this.natureKeys = natureKeys;
		this.natureEffects = natureEffects;
		this.id = id;
		
		if (slot !== null) {
			this.slot = slot;
		}
		
		this.#giveMicroorganism();
	}
	
	#giveMicroorganism() {
		const template = document.getElementById('microorganism');
		const clone = document.importNode(template.content, true);
		
		clone.querySelector(".microorganism-individual-clickable").id = this.id;
		
		let levelIndicator = clone.getElementById("levelIndicator");
		let levelCounter = clone.getElementById("microorganismLevelCounter");
		
		let typeImg = clone.getElementById("typeImg");
		let typeIndicator = clone.getElementById("typeIndicator");
		let totalEffects = clone.getElementById("microorganismTotalEffects");
		let typeEffects = clone.getElementById("typeEffects");
		
		let natureImg = clone.getElementById("natureImg");
		let natureIndicator = clone.getElementById("natureIndicator");
		let natureEffects = clone.getElementById("natureEffects");
		
		levelCounter.textContent = storage.truncateToDecimalPlaces(this.level, 3);
		levelIndicator.textContent = `Level ${storage.truncateToDecimalPlaces(this.level, 3)} `;
		
		typeImg.setAttribute("src", this.typeSource.typeSrc);
		totalEffects.setAttribute("style", `color: ${this.typeSource.color};`);
		typeIndicator.textContent = this.typeSource.typeName;
		
		let typeTextBase = [];
		let typeTextArray = [];
		let typeText = "";
		for (let i = 0; i < this.typeKeys.length; i++) {
			typeTextBase.push(this.typeKeys[i]);
			typeTextArray.push(this.typeSource.effects[`${typeTextBase[i]}`]);
			if (i >= 1) {
				typeText += `<br>${typeTextArray[i]}`;
			}
			else {
				typeText += typeTextArray[i];
			}
		}
		typeEffects.innerHTML = typeText;
		
		natureImg.setAttribute("src", this.natureSource.natureSrc);
		natureIndicator.setAttribute("style", `color: ${this.natureSource.color};`);
		natureIndicator.textContent = `${this.natureSource.natureName} `;
		natureEffects.setAttribute("style", `color: ${this.natureSource.color};`);
		
		let natureTextBase = [];
		let natureTextArray = [];
		let natureText = "";
		for (let i = 0; i < this.natureKeys.length; i++) {
			natureTextBase.push(this.natureKeys[i]);
			natureTextArray.push(this.natureSource.effects[`${natureTextBase[i]}`]);
			natureText += `<br>${natureTextArray[i]}`;
		}
		natureEffects.innerHTML = natureText;
		
		if (this.slot !== null && typeof this.slot !== "undefined") {
			document.getElementById(this.slot).appendChild(clone);
		}
		else {
			let containerID;
			for (let i = 0; i < 90; i++) {
				containerID = document.getElementById(`microorganismInventory${i + 1}`);
				if (!(containerID.hasChildNodes())) {
					this.slot = `microorganismInventory${i + 1}`;
					break;
				}
			}
			containerID.appendChild(clone);
		}
		
		//you have to define self as this because in jqueryui the this syntax relates to the thing being interacted with, not methods or fields inside of a class/object
		//also I guarantee you this is what is causing like 98% of the performance issues other than heavy computations
		this.calculateMovements();
	}
	
	calculateMovements = function() {
		const self = this;
		$(".microorganism-individual-clickable").draggable({
			cursor: "move", 
			cursorAt: { top: 37.5, left: 37.5 }, 
			revert: "invalid",
			cancel: ".petri-dish-on-reinforcement-slot",
			
			start: function(event, ui) {
				$(this).data("originalParentId", $(this).parent().attr("id"));
			}
		});
		$(".petri-dish-inventory-slot").droppable({
			addClasses: false,
			tolerance: "intersect",
			accept: function() {
				return $(this).find("*").length === 0;
			},
			drop: function(event, ui) {
				$(this).append(ui.draggable);
				ui.draggable.css({ top: 0, left: 0 });
				removeMicroorganismFromPetriDish($(this).attr("id"));
				self.slot = $(this).attr("id");
				updateSlot(self.slot);
			}
		});
		$(".petri-dish-singular").droppable({
			addClasses: false,
			tolerance: "intersect",
			accept: function() {
				return $(this).find("*").length === 0;
			},
			drop: function(event, ui) {
				$(this).append(ui.draggable);
				ui.draggable.css({ top: 0, left: 0 });
				self.slot = $(this).attr("id");
				updateSlot(self.slot);
			}
		});
		$(".petri-dish-singular").on("drop", ".microorganism-individual-clickable", function() {
			let slotID = $(this).attr("id");
			if ($(`#${slotID}`).children().length > 0) {
				$(`#${slotID}`).droppable("option", "accept", null);
			}
			else {
				$(`#${slotID}`).droppable("option", "accept", ".microorganism-individual-clickable");
			}
		});
	}
	
	effects = function() {
		let effectID;
		let effectAmount;
		let temporaryEffects = {};
		
		for (let i = 0; i < this.typeKeys.length; i++) {
			effectID = this.type + this.typeKeys[i];
			effectAmount = this.typeEffects[i];
			temporaryEffects[effectID] = Object.assign({}, effectAmount);
		}
		for (let i = 0; i < this.natureKeys.length; i++) {
			effectID = this.nature + this.natureKeys[i];
			effectAmount = this.natureEffects[i];
			temporaryEffects[effectID] = Object.assign({}, effectAmount);
		}
		return temporaryEffects;
	}
	
	effectOperators = function(value, effect, effectID) {
		let trueValue = new Decimal.fromComponents(1, value.layer, value.mag);
		let trueEffect = new Decimal.fromComponents(1, effect.layer, effect.mag);
		switch (effectID) {
			case "amoebaallResources": return trueValue.times(trueEffect);
			case "amoebasecondaryResourcePow": return trueValue.times(trueEffect);
			case "amoebagameSpeedPow": return trueValue.times(trueEffect);
			case "amoebaallSoftcapBase": return trueValue.plus(trueEffect);
			case "amoebareinforcementMultPow": return trueValue.plus(trueEffect);
			
			case "tardigradesupercapMult": return trueValue.times(trueEffect);
			case "tardigradeleafSeedPERoots": return trueValue.plus(trueEffect);
			case "tardigradesuperScalingEffect": return trueValue.times(trueEffect);
			case "tardigradeDNABlueprintNerf": return trueValue.plus(trueEffect);
			case "tardigradeM1SoftcapDelay": return trueValue.plus(trueEffect);
				
			case "yeastCRSBasePow": return trueValue.times(trueEffect);
			case "yeastbacteriaCapBasePow": return trueValue.times(trueEffect);
			case "yeastCRSCapPow": return trueValue.times(trueEffect);
			case "yeastasparaginePow": return trueValue.times(trueEffect);
			case "yeastextensinPow": return trueValue.times(trueEffect);
			
			case "mossSporemossBasePow": return trueValue.times(trueEffect);
			case "mossSporemossEffectPow": return trueValue.times(trueEffect);
			case "mossSporemossMilestoneEffect": return trueValue.times(trueEffect);
			case "mossSporemossUpgradeEffect": return trueValue.times(trueEffect);
			case "mossSporewildfireReward": return trueValue.times(trueEffect);
			
			case "algaeLSFR1Effect": return trueValue.times(trueEffect);
			case "algaerepeatableDiscount": return trueValue.times(trueEffect);
			case "algaeglutamateEffect": return trueValue.times(trueEffect);
			case "algaefreeM5M6Levels": return trueValue.times(trueEffect);
			case "algaeM6AllEffect": return trueValue.plus(trueEffect);
			
			case "livelyleafBasePow": return trueValue.times(trueEffect);
			case "livelyleafSoftcapBase": return trueValue.plus(trueEffect);
			case "livelyLR1Effect": return trueValue.times(trueEffect);
			case "livelyLR2Effect": return trueValue.times(trueEffect);
			case "livelystormReward": return trueValue.times(trueEffect);
			
			case "chronalTASBasePow": return trueValue.times(trueEffect);
			case "chronalgameSpeedPow": return trueValue.times(trueEffect);
			case "chronalM3BaseEffect": return trueValue.times(trueEffect);
			case "chronalcompostingSpeedPow": return trueValue.times(trueEffect);
			case "chronalSR2Effect": return trueValue.times(trueEffect);
			
			case "groundedseedBasePow": return trueValue.times(trueEffect);
			case "groundedseedSoftcapBase": return trueValue.plus(trueEffect);
			case "groundedSR1Effect": return trueValue.times(trueEffect);
			case "groundedTASBasePow": return trueValue.times(trueEffect);
			case "groundedseedSupercapMult": return trueValue.times(trueEffect);
			
			case "bountifulfruitBasePow": return trueValue.times(trueEffect);
			case "bountifulFR1Effect": return trueValue.times(trueEffect);
			case "bountifulM1SoftcapDelay": return trueValue.plus(trueEffect);
			case "bountifulfruitSupercapMult": return trueValue.times(trueEffect);
			case "bountifulwildfireReward": return trueValue.times(trueEffect);
			
			case "chaoticentropyBasePow": return trueValue.times(trueEffect);
			case "chaoticCRSBasePow": return trueValue.times(trueEffect);
			case "chaoticbacteriaCapBasePow": return trueValue.times(trueEffect);
			case "chaoticRNAMult": return trueValue.times(trueEffect);
			case "chaoticfreeProteins": return trueValue.plus(trueEffect);
			
			case "reinforcedrootsBaseMult": return trueValue.plus(trueEffect);
			case "reinforcedreinforcementsMult": return trueValue.plus(trueEffect);
			case "reinforcedallSupercaps": return trueValue.plus(trueEffect);
			case "reinforcedwelderEffect": return trueValue.plus(trueEffect);
			case "reinforcedFLSpeed": return trueValue.plus(trueEffect);
		}
	}
	
	calculateEffects() {
		console.error(this.id);
		if (document.getElementById("microorganismTotalEffectCounter").innerHTML === `Equip a Microorganism to a Petri Dish to see some effects!`) {
			document.getElementById("microorganismTotalEffectCounter").innerHTML = ``;
		}
		const template = document.getElementById('microorganismEffectBase');
		let clone = document.importNode(template.content, true);
		let effectID;
		let effectColor;
		let testValue = this.effects;
		for (let i = 0; i < this.typeKeys.length; i++) {
			clone = document.importNode(template.content, true);
			
			effectID = this.type + this.typeKeys[i];
			storage.rootUpgradeFactor[effectID] = storage.rootUpgradeFactor[effectID].plus(new Decimal(1));
			
			if (!document.getElementById(effectID)) {
				effectColor = this.typeSource.color;
				clone.querySelector(".microorganismEffectHolder").style.color = effectColor;
				clone.querySelector(".microorganismEffectHolder").id = effectID;
				clone.querySelector(".microorganismEffectHolder").innerHTML = `Placeholder ${effectID} text<br>`;
				document.getElementById("microorganismTotalEffectCounter").appendChild(clone);
			}
		}
		for (let i = 0; i < this.natureKeys.length; i++) {
			clone = document.importNode(template.content, true);
			
			effectID = this.nature + this.natureKeys[i];
			storage.rootUpgradeFactor[effectID] = storage.rootUpgradeFactor[effectID].plus(new Decimal(1));
			
			if (!document.getElementById(effectID)) {
				effectColor = this.natureSource.color;
				clone.querySelector(".microorganismEffectHolder").style.color = effectColor;
				clone.querySelector(".microorganismEffectHolder").id = effectID;
				clone.querySelector(".microorganismEffectHolder").innerHTML = `Placeholder ${effectID} text<br>`;
				document.getElementById("microorganismTotalEffectCounter").appendChild(clone);
			}
		}
		storage.pushActiveMicroorganisms([this.id, storage.rootUpgradeFactor.microorganisms[this.id]]);
	}
}

export function reinforcementMicroorganismChecker() {
	if (!storage.rootUpgradeFactor.RO20Bought) {
		return;
	}
	let selectChecker = false;
	
	let temporaryLevel;
	let temporaryType;
	let temporaryTypeSource;
	let temporaryTypeKeys;
	let temporaryTypeEffects;
	let temporaryNature;
	let temporaryNatureSource;
	let temporaryNatureKeys;
	let temporaryNatureEffects;
	let temporaryID;
	
	for (let i = 0; i < 6; i++) {
		switch (i) {
			case 0:
				if (livelyMicroorganism.id === storage.gameData.selectedMicrooganism) {
					temporaryLevel = livelyMicroorganism.level;
					temporaryType = livelyMicroorganism.typeType;
					temporaryTypeSource = livelyMicroorganism.typeSource;
					temporaryTypeKeys = livelyMicroorganism.typeKeys;
					temporaryTypeEffects = livelyMicroorganism.type;
					temporaryNature = livelyMicroorganism.natureType;
					temporaryNatureSource = livelyMicroorganism.natureSource;
					temporaryNatureKeys = livelyMicroorganism.natureKeys;
					temporaryNatureEffects = livelyMicroorganism.nature;
					temporaryID = livelyMicroorganism.id;
	
					selectChecker = true;
				}
				break;
			case 1:
				if (chronalMicroorganism.id === storage.gameData.selectedMicrooganism) {
					temporaryLevel = chronalMicroorganism.level;
					temporaryType = chronalMicroorganism.typeType;
					temporaryTypeSource = chronalMicroorganism.typeSource;
					temporaryTypeKeys = chronalMicroorganism.typeKeys;
					temporaryTypeEffects = chronalMicroorganism.type;
					temporaryNature = chronalMicroorganism.natureType;
					temporaryNatureSource = chronalMicroorganism.natureSource;
					temporaryNatureKeys = chronalMicroorganism.natureKeys;
					temporaryNatureEffects = chronalMicroorganism.nature;
					temporaryID = chronalMicroorganism.id;
	
					selectChecker = true;
				}
				break;
			case 2:
				if (groundedMicroorganism.id === storage.gameData.selectedMicrooganism) {
					temporaryLevel = groundedMicroorganism.level;
					temporaryType = groundedMicroorganism.typeType;
					temporaryTypeSource = groundedMicroorganism.typeSource;
					temporaryTypeKeys = groundedMicroorganism.typeKeys;
					temporaryTypeEffects = groundedMicroorganism.type;
					temporaryNature = groundedMicroorganism.natureType;
					temporaryNatureSource = groundedMicroorganism.natureSource;
					temporaryNatureKeys = groundedMicroorganism.natureKeys;
					temporaryNatureEffects = groundedMicroorganism.nature;
					temporaryID = groundedMicroorganism.id;
	
					selectChecker = true;
				}
				break;
			case 3:
				if (bountifulMicroorganism.id === storage.gameData.selectedMicrooganism) {
					temporaryLevel = bountifulMicroorganism.level;
					temporaryType = bountifulMicroorganism.typeType;
					temporaryTypeSource = bountifulMicroorganism.typeSource;
					temporaryTypeKeys = bountifulMicroorganism.typeKeys;
					temporaryTypeEffects = bountifulMicroorganism.type;
					temporaryNature = bountifulMicroorganism.natureType;
					temporaryNatureSource = bountifulMicroorganism.natureSource;
					temporaryNatureKeys = bountifulMicroorganism.natureKeys;
					temporaryNatureEffects = bountifulMicroorganism.nature;
					temporaryID = bountifulMicroorganism.id;
	
					selectChecker = true;
				}
				break;
			case 4:
				if (chaoticMicroorganism.id === storage.gameData.selectedMicrooganism) {
					temporaryLevel = chaoticMicroorganism.level;
					temporaryType = chaoticMicroorganism.typeType;
					temporaryTypeSource = chaoticMicroorganism.typeSource;
					temporaryTypeKeys = chaoticMicroorganism.typeKeys;
					temporaryTypeEffects = chaoticMicroorganism.type;
					temporaryNature = chaoticMicroorganism.natureType;
					temporaryNatureSource = chaoticMicroorganism.natureSource;
					temporaryNatureKeys = chaoticMicroorganism.natureKeys;
					temporaryNatureEffects = chaoticMicroorganism.nature;
					temporaryID = chaoticMicroorganism.id;
	
					selectChecker = true;
				}
				break;
			case 5:
				if (reinforcedMicroorganism.id === storage.gameData.selectedMicrooganism) {
					temporaryLevel = reinforcedMicroorganism.level;
					temporaryType = reinforcedMicroorganism.typeType;
					temporaryTypeSource = reinforcedMicroorganism.typeSource;
					temporaryTypeKeys = reinforcedMicroorganism.typeKeys;
					temporaryTypeEffects = reinforcedMicroorganism.type;
					temporaryNature = reinforcedMicroorganism.natureType;
					temporaryNatureSource = reinforcedMicroorganism.natureSource;
					temporaryNatureKeys = reinforcedMicroorganism.natureKeys;
					temporaryNatureEffects = reinforcedMicroorganism.nature;
					temporaryID = reinforcedMicroorganism.id;
	
					selectChecker = true;
				}
				break;
		}
		if (selectChecker) {
			break;
		}
		else if ((i === 5) && (!selectChecker)) {
			console.log("No Microorganism selected");
			return;
		}
	}
	storage.rootUpgradeFactor.totalMicroorganisms = storage.rootUpgradeFactor.totalMicroorganisms.plus(new Decimal(1));
	let microorganismID = storage.rootUpgradeFactor.totalMicroorganisms.toNumber();
	const key = `microorganism${microorganismID}`;
	
	let temporaryMicroorganism = new Microorganism(temporaryLevel, temporaryType, temporaryTypeSource, temporaryTypeKeys, temporaryTypeEffects, temporaryNature, temporaryNatureSource, temporaryNatureKeys, temporaryNatureEffects, key, null);
	

	//this is creating objects inside of other objects inside of other objects with class properties
	//real black magic bullcrap here
	
	//originally this was Object.Assign() but that broke a bunch of shit so
	storage.rootUpgradeFactor.microorganisms[key] = {...temporaryMicroorganism};
}

function calculateEffects(id) {
	if (document.getElementById("microorganismTotalEffectCounter").innerHTML === `Equip a Microorganism to a Petri Dish to see some effects!`) {
		document.getElementById("microorganismTotalEffectCounter").innerHTML = ``;
	}
	const template = document.getElementById('microorganismEffectBase');
	let clone = document.importNode(template.content, true);
	let effectID;
	let effectColor;
	let testValue = storage.rootUpgradeFactor.microorganisms[id].effects;
	for (let i = 0; i < storage.rootUpgradeFactor.microorganisms[id].typeKeys.length; i++) {
		clone = document.importNode(template.content, true);
		
		effectID = storage.rootUpgradeFactor.microorganisms[id].type + storage.rootUpgradeFactor.microorganisms[id].typeKeys[i];
		
		if (!document.getElementById(effectID)) {
			effectColor = storage.rootUpgradeFactor.microorganisms[id].typeSource.color;
			clone.querySelector(".microorganismEffectHolder").style.color = effectColor;
			clone.querySelector(".microorganismEffectHolder").id = effectID;
			clone.querySelector(".microorganismEffectHolder").innerHTML = `Placeholder ${effectID} text<br>`;
			document.getElementById("microorganismTotalEffectCounter").appendChild(clone);
		}
	}
	for (let i = 0; i < storage.rootUpgradeFactor.microorganisms[id].natureKeys.length; i++) {
		clone = document.importNode(template.content, true);
		
		effectID = storage.rootUpgradeFactor.microorganisms[id].nature + storage.rootUpgradeFactor.microorganisms[id].natureKeys[i];
		
		if (!document.getElementById(effectID)) {
			effectColor = storage.rootUpgradeFactor.microorganisms[id].natureSource.color;
			clone.querySelector(".microorganismEffectHolder").style.color = effectColor;
			clone.querySelector(".microorganismEffectHolder").id = effectID;
			clone.querySelector(".microorganismEffectHolder").innerHTML = `Placeholder ${effectID} text<br>`;
			document.getElementById("microorganismTotalEffectCounter").appendChild(clone);
		}
	}
	storage.pushActiveMicroorganisms([id, storage.rootUpgradeFactor.microorganisms[id]]);
	
	activeMicroorganismChecker();
}

//apparently js has a built in tool to check for any changes in the DOM
//man that would have saved me 30 FUCKING DAYS OF CODING THIS SHIT
const observer = new MutationObserver((mutations) => {
	const observed = mutations.map((singularMutation) => singularMutation.target.closest('[data-observed]'));
	//observed outputs an array with an HTML DOM element and nothing afterwards for some reason
	if (observed[0].childNodes.length < 1) {
		return;
	}
	//for some reason this outputs a corrupted childnode list so this should fix it
	let interactor;
	for (let i = 0; i < observed[0].childNodes.length; i++) {
		if (observed[0].childNodes[i].nodeType === Node.ELEMENT_NODE) {
			interactor = observed[0].childNodes[i].getAttribute('id');
			break;
		}
	}
	if (typeof interactor === 'undefined') {
		return;
	}
	if (microorganismTimer.gte(new Decimal(1000))) {
		calculateEffects(interactor);
	}
});
document.querySelectorAll('.petri-dish-singular').forEach(dish => {
	dish.setAttribute('data-observed', '');
    observer.observe(dish, { childList: true });
});

function removeMicroorganismFromPetriDish(dropLocation) {
	const microorganismFromDOM = document.getElementById(dropLocation).children[0].getAttribute('id');
	let microorganismConfigs;
	let index;
	for (let i = 0; i < storage.rootUpgradeFactor.activeMicroorganisms.length; i++) {
		if (storage.rootUpgradeFactor.activeMicroorganisms[i][0] === microorganismFromDOM) {
			microorganismConfigs = storage.rootUpgradeFactor.activeMicroorganisms[i][1];
			index = i;
			break;
		}
	}
	if (typeof microorganismConfigs === "undefined") {
		return;
	}
	const effects = microorganismConfigs.effects();
	for (const [key, value] of Object.entries(effects)) {
		let effectText = document.getElementById(key).textContent;
		//funny regex used to check for any text that is not a number or a decimal point
		let cleansedEffectText = effectText.replace(/[^0-9.]/g, "");
		let enumeratedEffectText = new Decimal(cleansedEffectText);
		
		let trueValue = new Decimal(value.mag);
		if (trueValue.minus(enumeratedEffectText).mag < 0.001) {
			document.getElementById(key).innerHTML = ``;
		}
	}
	
	storage.rootUpgradeFactor.activeMicroorganisms.splice(index, 1);
	activeMicroorganismChecker();
}

export var activeMicroorganismCounter = new Decimal(0);
var succeededIDs = [];

export function activeMicroorganismChecker() {
	if (!storage.rootUpgradeFactor.RO20Bought) {
		return;
	}
	
	let petriDishSucceded = false;
	
	const petriDishes = document.querySelectorAll('.petri-dish-singular');
	for(const el of petriDishes) {
		if (el.hasChildNodes()) {
			petriDishSucceded = true;
			break;
		}
	}
	if (!petriDishSucceded) {
		storage.rootUpgradeFactor.activeMicroorganisms.length = 0;
		storage.rootUpgradeFactor.previousActiveMicroorganisms.length = 0;
		document.getElementById("microorganismTotalEffectCounter").innerHTML = ``;
		loadMicroorganisms();
		return;
	}
	
	if (storage.rootUpgradeFactor.activeMicroorganisms.length < 1) {
		return;
	}
	
	let succeeded = false;
	let duplicate = false;
	let petriDishID;
	let microorganismID;
	let effectsToReset;
	
	for (let i = 0; i < storage.rootUpgradeFactor.activeMicroorganisms.length; i++) {
		if (!Array.isArray(storage.rootUpgradeFactor.activeMicroorganisms[i])) {
			delete storage.rootUpgradeFactor.activeMicroorganisms[i];
		}
		else {
			duplicate = false;
			succeeded = false;
			
			for (let j = 0; j < 8; j++) {
				microorganismID = storage.rootUpgradeFactor.activeMicroorganisms[i][0];
				petriDishID = document.getElementById(`petriDish${j + 1}`);
				
				if (petriDishID.hasChildNodes()) {
					for (const child of petriDishID.children) {
						if ((child.id === microorganismID) && (!duplicate)) {
							activeMicroorganismCounter = activeMicroorganismCounter.plus(new Decimal(1));
							succeededIDs.push(microorganismID);
							succeeded = true;
							break;
						}
					}
				}
				duplicate = false;
				
				if (j === 7 && !succeeded) {
					effectsToReset = storage.rootUpgradeFactor.activeMicroorganisms[i][1];
					
					//resets all of the values relating to Microorganism effects in bunchobullshit.mjs
					for (const effectKey in effectsToReset) {
						if (Object.hasOwnProperty.call(effectsToReset, effectKey)) {
							if (!(typeof storage.rootUpgradeFactor[effectKey] === undefined)) {
								storage.rootUpgradeFactor[effectKey] = new Decimal(0);
							}
						}
					}
					delete storage.rootUpgradeFactor.activeMicroorganisms[i];
				}
			}
		}
	}
	//this Array.filter(Boolean); instruction removes all elements that would return false if evaluated
	storage.rootUpgradeFactor.activeMicroorganisms = storage.rootUpgradeFactor.activeMicroorganisms.filter(Boolean);
	
	storage.rootUpgradeFactor.previousActiveMicroorganisms = storage.rootUpgradeFactor.activeMicroorganisms;
	
	if (microorganismTimer.gte(new Decimal(1000))) {
		loadMicroorganisms();
	}
	sortMicroorganismEffects();
}

function updateSlot(slotID) {
	let child;
	if (document.getElementById(slotID).childNodes.length > 1) {
		for (let i = 0; i < document.getElementById(slotID).childNodes.length; i++) {
			if (document.getElementById(slotID).childNodes[i].nodeType === Node.ELEMENT_NODE) {
				child = document.getElementById(slotID).childNodes[i];
				break;
			}
		}
	}
	else {
		child = document.getElementById(slotID).childNodes[0];
	}
	if (typeof child === 'undefined') {
		return;
	}
	const childID = child.getAttribute('id');
	storage.rootUpgradeFactor.microorganisms[childID].slot = slotID;
}

function sortMicroorganismEffects() {
	const fragment = document.createDocumentFragment();
	const container = document.getElementById("microorganismTotalEffectCounter");
	const effects = container.querySelectorAll(".microorganismEffectHolder");
	
	const sortedList = [...effects].sort((a, b) => {
		const c = effectVisualSorter.indexOf(a.getAttribute("id")),
		d = effectVisualSorter.indexOf(b.getAttribute("id"));
		return c < d ? -1 : c > d ? 1 : 0;
	});
	
	for (const effect of sortedList) {
		fragment.appendChild(effect);
	}
	container.appendChild(fragment);
}

function openMicroorganismInfo() {
	document.getElementById("microorganismsInfo").style.display = "inline-block";
}
function closeMicroorganismInfo() {
	document.getElementById("microorganismsInfo").style.display = "none";
}
document.getElementById("proteinSetupInfo").addEventListener("click", openMicroorganismInfo);
document.getElementById("closeMicroorganismsInfo").addEventListener("click", closeMicroorganismInfo);

function buyPetriDishSlot() {
	if (storage.gameData.roots.gte(storage.rootUpgradeFactor.petriDishCost)) {
		storage.gameData.roots = storage.gameData.roots.minus(storage.rootUpgradeFactor.petriDishCost);
		storage.rootUpgradeFactor.petriDishCost = storage.rootUpgradeFactor.petriDishCost.times(new Decimal(100));
		storage.rootUpgradeFactor.totalPetriDishes = storage.rootUpgradeFactor.totalPetriDishes + 1;
		
		document.getElementById(`petriDish${storage.rootUpgradeFactor.totalPetriDishes}`).style.display = `block`;
		document.getElementById('buildPetriDishes').innerHTML = `Build a Petri Dish (${storage.rootUpgradeFactor.totalPetriDishes} / 8)<br>Cost: ${storage.truncateToDecimalPlaces(storage.rootUpgradeFactor.petriDishCost, 3)} Roots`;
		if (storage.rootUpgradeFactor.totalPetriDishes > 7) {
			document.getElementById('buildPetriDishes').disabled = true;
		}
	}
}
document.getElementById("buildPetriDishes").addEventListener("click", buyPetriDishSlot);

function createNewInventorySlot(container, template, queryID, slots) {
    const fragment = document.createDocumentFragment();
	
	for (let i = 0; i < slots; i++) {
		var clone = document.importNode(template.content, true);
		const idBase = container.id;
		clone.querySelector(queryID).id = `${idBase}${i + 1}`;
		fragment.appendChild(clone);
	}
	container.appendChild(fragment);
}


$(window).on("load", function() {
	//pray that these actually finish then the microorganisms load properly
	createNewInventorySlot(document.getElementById('microorganismInventory'), document.getElementById('petriDishInventorySlot'), ".petri-dish-inventory-slot", 90);
	createNewInventorySlot(document.getElementById('microorganismsOnReinforcement'), document.getElementById('petriDishOnReinforcementSlot'), ".petri-dish-on-reinforcement-slot", 6);
	
	livelyMicroorganism = new MicroorganismOnReinforcement("lively");
	chronalMicroorganism = new MicroorganismOnReinforcement("chronal");
	groundedMicroorganism = new MicroorganismOnReinforcement("grounded");
	bountifulMicroorganism = new MicroorganismOnReinforcement("bountiful");
	chaoticMicroorganism = new MicroorganismOnReinforcement("chaotic");
	reinforcedMicroorganism = new MicroorganismOnReinforcement("reinforced");
	
	livelyMicroorganism.createMicroorganism();
	chronalMicroorganism.createMicroorganism();
	groundedMicroorganism.createMicroorganism();
	bountifulMicroorganism.createMicroorganism();
	chaoticMicroorganism.createMicroorganism();
	reinforcedMicroorganism.createMicroorganism();
	
	//uncomment these to reset microorganisms
	// storage.rootUpgradeFactor.totalMicroorganisms = new Decimal(0);
	// storage.rootUpgradeFactor.microorganisms = {};
	
	storage.rootUpgradeFactor.activeMicroorganisms.length = 0;
	storage.rootUpgradeFactor.previousActiveMicroorganisms.length = 0;
	
	if (storage.rootUpgradeFactor.totalMicroorganisms.lt(new Decimal(1))) {
		return;
	}
	
	for (let [key, value] of Object.entries(storage.rootUpgradeFactor.microorganisms)) {
		//deals with malformed save data from JSON.stringify
		if (typeof value.level === "string") {value.level = new Decimal(value.level);}
		for (let i = 0; i < value.typeEffects.length; i++) {
			if (typeof value.typeEffects[i] === "string") {
				value.typeEffects[i] = new Decimal(value.typeEffects[i]);
			}
		}
		for (let i = 0; i < value.natureEffects.length; i++) {
			if (typeof value.natureEffects[i] === "string") {
				value.natureEffects[i] = new Decimal(value.natureEffects[i]);
			}
		}
		
		let temporaryMicroorganism = new Microorganism(value.level, value.type, value.typeSource, value.typeKeys, value.typeEffects, value.nature, value.natureSource, value.natureKeys, value.natureEffects, value.id, value.slot);
		
		let redundantBullshitBecauseObjectAssignSucks = function() {
			let effectID;
			let effectAmount;
			let temporaryEffects = {};
			
			for (let i = 0; i < value.typeKeys.length; i++) {
				effectID = value.type + value.typeKeys[i];
				effectAmount = value.typeEffects[i];
				temporaryEffects[effectID] = Object.assign({}, effectAmount);
			}
			for (let i = 0; i < value.natureKeys.length; i++) {
				effectID = value.nature + value.natureKeys[i];
				effectAmount = value.natureEffects[i];
				temporaryEffects[effectID] = Object.assign({}, effectAmount);
			}
			return temporaryEffects;
		}
		
		let otherRedundantBullshit = function(value, effect, effectID) {
			let trueValue = new Decimal.fromComponents(1, value.layer, value.mag);
			let trueEffect = new Decimal.fromComponents(1, effect.layer, effect.mag);
			switch (effectID) {
				case "amoebaallResources": return trueValue.times(trueEffect);
				case "amoebasecondaryResourcePow": return trueValue.times(trueEffect);
				case "amoebagameSpeedPow": return trueValue.times(trueEffect);
				case "amoebaallSoftcapBase": return trueValue.plus(trueEffect);
				case "amoebareinforcementMultPow": return trueValue.plus(trueEffect);
				
				case "tardigradesupercapMult": return trueValue.times(trueEffect);
				case "tardigradeleafSeedPERoots": return trueValue.plus(trueEffect);
				case "tardigradesuperScalingEffect": return trueValue.times(trueEffect);
				case "tardigradeDNABlueprintNerf": return trueValue.plus(trueEffect);
				case "tardigradeM1SoftcapDelay": return trueValue.plus(trueEffect);
					
				case "yeastCRSBasePow": return trueValue.times(trueEffect);
				case "yeastbacteriaCapBasePow": return trueValue.times(trueEffect);
				case "yeastCRSCapPow": return trueValue.times(trueEffect);
				case "yeastasparaginePow": return trueValue.times(trueEffect);
				case "yeastextensinPow": return trueValue.times(trueEffect);
				
				case "mossSporemossBasePow": return trueValue.times(trueEffect);
				case "mossSporemossEffectPow": return trueValue.times(trueEffect);
				case "mossSporemossMilestoneEffect": return trueValue.times(trueEffect);
				case "mossSporemossUpgradeEffect": return trueValue.times(trueEffect);
				case "mossSporewildfireReward": return trueValue.times(trueEffect);
				
				case "algaeLSFR1Effect": return trueValue.times(trueEffect);
				case "algaerepeatableDiscount": return trueValue.times(trueEffect);
				case "algaeglutamateEffect": return trueValue.times(trueEffect);
				case "algaefreeM5M6Levels": return trueValue.times(trueEffect);
				case "algaeM6AllEffect": return trueValue.plus(trueEffect);
				
				case "livelyleafBasePow": return trueValue.times(trueEffect);
				case "livelyleafSoftcapBase": return trueValue.plus(trueEffect);
				case "livelyLR1Effect": return trueValue.times(trueEffect);
				case "livelyLR2Effect": return trueValue.times(trueEffect);
				case "livelystormReward": return trueValue.times(trueEffect);
				
				case "chronalTASBasePow": return trueValue.times(trueEffect);
				case "chronalgameSpeedPow": return trueValue.times(trueEffect);
				case "chronalM3BaseEffect": return trueValue.times(trueEffect);
				case "chronalcompostingSpeedPow": return trueValue.times(trueEffect);
				case "chronalSR2Effect": return trueValue.times(trueEffect);
				
				case "groundedseedBasePow": return trueValue.times(trueEffect);
				case "groundedseedSoftcapBase": return trueValue.plus(trueEffect);
				case "groundedSR1Effect": return trueValue.times(trueEffect);
				case "groundedTASBasePow": return trueValue.times(trueEffect);
				case "groundedseedSupercapMult": return trueValue.times(trueEffect);
				
				case "bountifulfruitBasePow": return trueValue.times(trueEffect);
				case "bountifulFR1Effect": return trueValue.times(trueEffect);
				case "bountifulM1SoftcapDelay": return trueValue.plus(trueEffect);
				case "bountifulfruitSupercapMult": return trueValue.times(trueEffect);
				case "bountifulwildfireReward": return trueValue.times(trueEffect);
				
				case "chaoticentropyBasePow": return trueValue.times(trueEffect);
				case "chaoticCRSBasePow": return trueValue.times(trueEffect);
				case "chaoticbacteriaCapBasePow": return trueValue.times(trueEffect);
				case "chaoticRNAMult": return trueValue.times(trueEffect);
				case "chaoticfreeProteins": return trueValue.plus(trueEffect);
				
				case "reinforcedrootsBaseMult": return trueValue.plus(trueEffect);
				case "reinforcedreinforcementsMult": return trueValue.plus(trueEffect);
				case "reinforcedallSupercaps": return trueValue.plus(trueEffect);
				case "reinforcedwelderEffect": return trueValue.plus(trueEffect);
				case "reinforcedFLSpeed": return trueValue.plus(trueEffect);
			}
		}
		storage.rootUpgradeFactor.microorganisms[value.id].effects = redundantBullshitBecauseObjectAssignSucks;
		storage.rootUpgradeFactor.microorganisms[value.id].effectOperators = otherRedundantBullshit;
		
		let pattern = /petriDish/;
		if (pattern.test(storage.rootUpgradeFactor.microorganisms[value.id].slot)) {
			calculateEffects(storage.rootUpgradeFactor.microorganisms[value.id].id);
		}
	}
	loadMicroorganisms();
});
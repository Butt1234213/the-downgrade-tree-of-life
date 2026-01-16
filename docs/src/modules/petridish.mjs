import * as storage from './core/bunchobullshit.mjs';
import { achievements, massAchievementChecker } from './achievements.mjs';

let level = new Decimal(0);

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

const typeConfigs = {
	amoeba: {
		allResources: new Decimal(2).pow(level.plus(new Decimal(1))),
		secondaryResourcePow: new Decimal(1.1).plus(new Decimal(0.05).times(level)),
		gameSpeedMult: new Decimal(10).pow(level.plus(new Decimal(1))),
		allSoftcapBase: new Decimal(0.01).plus(new Decimal(0.0025).times(level)),
		reinforcmentMultPow: new Decimal(8).times(level.plus(new Decimal(1))),
	},
	tardigrade: {
		supercapMult: new Decimal(1.5).plus(new Decimal(0.05).times(level)),
		leafSeedPERoots: new Decimal(1.5).plus(new Decimal(0.1).times(level)),
		superScalingEffect: new Decimal(1.5).plus(new Decimal(0.05).times(level)),
		DNABlueprintNerf: new Decimal(0.05).plus(new Decimal(0.01).times(level)),
		M1SoftcapDelay: new Decimal(50).plus(new Decimal(50).times(level)),
	},
	yeast: {
		CRSBasePow: new Decimal(1.2).plus(new Decimal(0.05).times(level)),
		bacteriaCapBasePow: new Decimal(1.4).plus(new Decimal(0.05).times(level)),
		cellsMultPow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		AGPSoftcapDelay: new Decimal(0.05).plus(new Decimal(0.01).times(level)),
		extensinPow: new Decimal(1.3).plus(new Decimal(0.05).times(level)),
	},
	mossSpore: {
		mossBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		mossEffectPow: new Decimal(2).plus(new Decimal(0.25).times(level)),
		mossMilestoneEffect: new Decimal(1.1).plus(new Decimal(0.025).times(level)),
		mossUpgradeEffect: new Decimal(1.1).plus(new Decimal(0.025).times(level)),
		wildfireReward: new Decimal(1.5).times(new Decimal(1.02).pow(level)),
	},
	algae: {
		LSFR1Effect: new Decimal(1.3).plus(new Decimal(0.05).times(level)),
		LSFR1Discount: new Decimal(1.3).plus(new Decimal(0.05).times(level)),
		glutamateEffect: new Decimal(1.5).plus(new Decimal(0.1).times(level)),
		freeM6Levels: new Decimal(30).plus(new Decimal(30).times(level)),
		LSFR2Cap: new Decimal(15).plus(new Decimal(15).times(level)),
	},
}

const natureConfigs = {
	lively: {
		leafBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		leafSoftcapBase: new Decimal(0.01).plus(new Decimal(0.0025).times(level)),
		LR1Effect: new Decimal(2).times(new Decimal(1.02).pow(level)),
		LR2Effect: new Decimal(1.02).pow(level.plus(new Decimal(1))),
		stormReward: new Decimal(1.1).plus(new Decimal(0.05).times(level)),
	},
	chronal: {
		TASBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		gameSpeedMult: new Decimal(10).pow(level.plus(new Decimal(1))),
		M3BaseEffect: new Decimal(4).plus(new Decimal(0.5).times(level)),
		compostingSpeedPow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		SR2Effect: new Decimal(1.1).pow(level.plus(new Decimal(1))),
	},
	grounded: {
		seedBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		seedSoftcapBase: new Decimal(0.01).plus(new Decimal(0.0025).times(level)),
		SR1Effect: new Decimal(2).times(new Decimal(1.02).pow(level)),
		TASBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		seedSupercapMult: new Decimal(1.6).plus(new Decimal(0.05).times(level)),
	},
	bountiful: {
		fruitBasePow: new Decimal(1.25).plus(new Decimal(0.05).times(level)),
		FR1Effect: new Decimal(1.5).times(new Decimal(1.02).pow(level)),
		M1SoftcapDelay: new Decimal(50).plus(new Decimal(50).times(level)),
		fruitSupercapMult: new Decimal(1.6).plus(new Decimal(0.05).times(level)),
		wildfireReward: new Decimal(1.5).times(new Decimal(1.02).pow(level)),
	},
	chaotic: {
		entropyBaseMult: new Decimal(1e6).pow(level.plus(new Decimal(1))),
		CRSBasePow: new Decimal(1.2).plus(new Decimal(0.05).times(level)),
		bacteriaCapBasePow: new Decimal(1.4).plus(new Decimal(0.05).times(level)),
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

const natureVisuals = {
	lively: {
		slotID: 1,
		natureName: "Lively",
		natureSrc: "./src/images/leaf.png",
		color: "#50bb50",
		effects: {
			leafBasePow: `^${storage.truncateToDecimalPlaces(natureConfigs.lively.leafBasePow, 3)} Leaf base mult`,
			leafSoftcapBase: `-${storage.truncateToDecimalPlaces(natureConfigs.lively.leafSoftcapBase, 3)} Leaf softcap root`,
			LR1Effect: `x${storage.truncateToDecimalPlaces(natureConfigs.lively.LR1Effect, 3)} LR1's effect`,
			LR2Effect: `x${storage.truncateToDecimalPlaces(natureConfigs.lively.LR2Effect, 3)} LR2's effect`,
			stormReward: `^${storage.truncateToDecimalPlaces(natureConfigs.lively.stormReward, 3)} Storm rewards`,
		},
	},
	chronal: {
		slotID: 2,
		natureName: "Chronal",
		natureSrc: "./src/images/clock.png",
		color: "#bf612e",
		effects: {
			TASBasePow: `^${storage.truncateToDecimalPlaces(natureConfigs.chronal.TASBasePow, 3)} Tree Aging speed`,
			gameSpeedMult: `x${storage.truncateToDecimalPlaces(natureConfigs.chronal.gameSpeedMult, 3)} Game speed`,
			M3BaseEffect: `x${storage.truncateToDecimalPlaces(natureConfigs.chronal.M3BaseEffect, 3)} M3's effect`,
			compostingSpeedPow: `^${storage.truncateToDecimalPlaces(natureConfigs.chronal.compostingSpeedPow, 3)} Composting speed`,
			SR2Effect: `x${storage.truncateToDecimalPlaces(natureConfigs.chronal.SR2Effect, 3)} SR2's effect`,
		}
	},
	grounded: {
		slotID: 3,
		natureName: "Grounded",
		natureSrc: "./src/images/seed.png",
		color: "#dc8616",
		effects: {
			seedBasePow: `^${storage.truncateToDecimalPlaces(natureConfigs.grounded.seedBasePow, 3)} Seed base mult`,
			seedSoftcapBase: `-${storage.truncateToDecimalPlaces(natureConfigs.grounded.seedSoftcapBase, 3)} Seed softcap root`,
			SR1Effect: `x${storage.truncateToDecimalPlaces(natureConfigs.grounded.SR1Effect, 3)} SR1's effect`,
			TASBasePow: `^${storage.truncateToDecimalPlaces(natureConfigs.grounded.TASBasePow, 3)} Tree Aging speed`,
			seedSupercapMult: `x${storage.truncateToDecimalPlaces(natureConfigs.grounded.seedSupercapMult, 3)} Seed supercap root`,
		}
	},
	bountiful: {
		slotID: 4,
		natureName: "Bountiful",
		natureSrc: "./src/images/fruit.png",
		color: "#de0e0e",
		effects: {
			fruitBasePow: `^${storage.truncateToDecimalPlaces(natureConfigs.bountiful.fruitBasePow, 3)} Fruit base mult`,
			FR1Effect: `x${storage.truncateToDecimalPlaces(natureConfigs.bountiful.FR1Effect, 3)} FR1's effect`,
			M1SoftcapDelay: `M1's effect softcap starts +${storage.truncateToDecimalPlaces(natureConfigs.bountiful.M1SoftcapDelay, 3)} later`,
			fruitSupercapMult: `x${storage.truncateToDecimalPlaces(natureConfigs.bountiful.fruitSupercapMult, 3)} Fruit supercap root`,
			wildfireReward: `x${storage.truncateToDecimalPlaces(natureConfigs.bountiful.wildfireReward, 3)} Wildfire rewards`,
		}
	},
	chaotic: {
		slotID: 5,
		natureName: "Chaotic",
		natureSrc: "./src/images/entropy.png",
		color: "#2077ba",
	},
	reinforced: {
		color: "#edac13",
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

class BaseMicroorganism {
	constructor(natureType) {
		this.natureType = natureType;
		this.typeType;
		this.type = [];
		this.nature = [];
	}
	
	setType() {
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
				this.typeType = `${key}`;
			}
		});
		let x;
		let keysArray;
		let chosenEffect;
		let temporaryType;
		switch (this.typeType) {
			case undefined:
				console.debug(`No matches here, son`);
				break;
			case "amoeba":
				console.debug(`Amoeba created`);
				x = getRandomNumbers(5);
				keysArray = Object.keys(typeConfigs.amoeba);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryType = typeConfigs.amoeba[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${temporaryType}`);
					this.type.push(temporaryType);
				}
				break;
			case "tardigrade":
				console.debug(`Tardigrade created`);
				x = getRandomNumbers(5);
				keysArray = Object.keys(typeConfigs.tardigrade);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryType = typeConfigs.tardigrade[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${temporaryType}`);
					this.type.push(temporaryType);
				}
				break;
			case "yeast":
				console.debug(`Yeast created`);
				x = getRandomNumbers(5);
				keysArray = Object.keys(typeConfigs.yeast);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryType = typeConfigs.yeast[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${temporaryType}`);
					this.type.push(temporaryType);
				}
				break;
			case "mossSpore":
				console.debug(`Moss Spores created`);
				keysArray = Object.keys(typeConfigs.mossSpore);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryType = typeConfigs.mossSpore[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${temporaryType}`);
					this.type.push(temporaryType);
				}
				break;
			case "algae":
				console.debug(`Algae created`);
				keysArray = Object.keys(typeConfigs.algae);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryType = typeConfigs.algae[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${temporaryType}`);
					this.type.push(temporaryType);
				}
				break;
		}
	}
	setNature() {
		let x;
		let keysArray;
		let chosenEffect;
		let temporaryNature;
		switch (this.natureType) {
			case "lively": 
				console.debug("A microorganism with a Lively nature was just created");
				x = getRandomNumbers(5);
				keysArray = Object.keys(natureConfigs.lively);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryNature = natureConfigs.lively[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${temporaryNature}`);
					this.nature.push(temporaryNature);
				}
				break;
			case "chronal": 
				console.debug("A microorganism with a Chronal nature was just created");
				x = getRandomNumbers(5);
				keysArray = Object.keys(natureConfigs.chronal);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryNature = natureConfigs.chronal[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${temporaryNature}`);
					this.nature.push(temporaryNature);
				}
				break;
			case "grounded": 
				console.debug("A microorganism with a Grounded nature was just created");
				x = getRandomNumbers(5);
				keysArray = Object.keys(natureConfigs.grounded);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryNature = natureConfigs.grounded[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${temporaryNature}`);
					this.nature.push(temporaryNature);
				}
				break;
			case "bountiful": 
				console.debug("A microorganism with a Bountiful nature was just created");
				x = getRandomNumbers(5);
				keysArray = Object.keys(natureConfigs.bountiful);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryNature = natureConfigs.bountiful[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${temporaryNature}`);
					this.nature.push(temporaryNature);
				}
				break;
			case "chaotic": 
				console.debug("A microorganism with a Chaotic nature was just created");
				x = getRandomNumbers(5);
				keysArray = Object.keys(natureConfigs.chaotic);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryNature = natureConfigs.chaotic[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${temporaryNature}`);
					this.nature.push(temporaryNature);
				}
				break;
			case "reinforced": 
				console.debug("A microorganism with a Reinforced nature was just created");
				x = getRandomNumbers(5);
				keysArray = Object.keys(natureConfigs.reinforced);
				for (let i = 0; i < x.length; i++) {
					chosenEffect = keysArray[x[i]];
					temporaryNature = natureConfigs.reinforced[`${chosenEffect}`];
					console.debug(`${chosenEffect} is the effect chosen, affecting said resource by ${temporaryNature}`);
					this.nature.push(temporaryNature);
				}
				break;
		}
	}
}

class Microorganism extends BaseMicroorganism {
	constructor(natureType) {
		super(natureType);
		this.typeType;
		this.type = [];
		this.nature = [];
	}
	createMicroorganism() {
		super.setType();
		super.setNature();
		
		if (this.type === undefined) {
			return;
		}
		const template = document.getElementById('microorganism');
		const clone = document.importNode(template.content, true);
		let slotID;
		let natureSrc;
		switch (this.natureType) {
			case "lively": 
				slotID = 1;
				natureSrc = "./src/images/leaf.png";
				break;
			case "chronal": 
				slotID = 2;
				natureSrc = "./src/images/clock.png";
				break;
			case "grounded": 
				slotID = 3;
				natureSrc = "./src/images/seed.png";
				break;
			case "bountiful":
				slotID = 4; 
				natureSrc = "./src/images/fruit.png";
				break;
			case "chaotic": 
				slotID = 5;
				natureSrc = "./src/images/entropy.png";
				break;
			case "reinforced": 
				slotID = 6;
				natureSrc = "./src/images/root.png";
				break;
		}
		let microorganismImg = clone.getElementById("microorganismImg");
		microorganismImg.setAttribute("src", natureSrc);
		const container = document.getElementById(`microorganismsOnReinforcement${slotID}`);
		container.appendChild(clone);
	}
}

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
createNewInventorySlot(document.getElementById('microorganismInventory'), document.getElementById('petriDishInventorySlot'), ".petri-dish-inventory-slot", 90);
createNewInventorySlot(document.getElementById('microorganismsOnReinforcement'), document.getElementById('petriDishOnReinforcementSlot'), ".petri-dish-on-reinforcement-slot", 6);

$( function() {
	$( ".microorganism-individual-clickable" ).draggable({
		cursor: "move", 
		cursorAt: { top: 37.5, left: 37.5 }, 
		revert: "invalid"
	});
	$( ".petri-dish-inventory-slot" ).droppable({
		addClasses: false,
		tolerance: "intersect",
		accept: ".microorganism-individual-clickable",
        drop: function(event, ui) {
            $(this).append(ui.draggable);
            ui.draggable.css({ top: 0, left: 0 });
        }
	});
	$( ".petri-dish-singular" ).droppable({
		addClasses: false,
		tolerance: "intersect",
		accept: ".microorganism-individual-clickable",
        drop: function(event, ui) {
            $(this).append(ui.draggable);
            ui.draggable.css({ top: 0, left: 0 });
        }
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const livelyMicroorganism = new Microorganism("lively");
	livelyMicroorganism.createMicroorganism();
	console.debug(livelyMicroorganism.type);
	console.debug(livelyMicroorganism.nature);
	const chronalMicroorganism = new Microorganism("chronal");
	chronalMicroorganism.createMicroorganism();
	console.debug(chronalMicroorganism.nature);
	const groundedMicroorganism = new Microorganism("grounded");
	groundedMicroorganism.createMicroorganism();
	console.debug(groundedMicroorganism.nature);
	const bountifulMicroorganism = new Microorganism("bountiful");
	bountifulMicroorganism.createMicroorganism();
	console.debug(bountifulMicroorganism.nature);
	const chaoticMicroorganism = new Microorganism("chaotic");
	chaoticMicroorganism.createMicroorganism();
	console.debug(chaoticMicroorganism.nature);
	const reinforcedMicroorganism = new Microorganism("reinforced");
	reinforcedMicroorganism.createMicroorganism();
	console.debug(reinforcedMicroorganism.nature);
});
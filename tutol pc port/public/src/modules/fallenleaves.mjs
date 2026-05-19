// formulas for base fallen leaf types
// fallen leaves: log(log(leaves + 1) + 1) = x, cap = floor(3.32193x - 21.2535), cap reaches 1 at e5e6 leaves
// mossy leaves: log(log(moss + 1) + 1) = x, cap = floor(1.43068x - 10.44541), cap reaches 1 at e1e8 moss
// marbled leaves: product of all repeatable caps = x, cap = floor(0.75x - 23.75), cap reaches 1 at 1e33 repeatable cap product

// no formulas for the mining fallen leaf types because I want to push this update out

import * as storage from "./core/bunchobullshit.mjs";
import * as temple from "./temple.mjs";

//for future reference
//fallenLeaves.foo = fallenType(String, String, Number, String, Array(() => {Decimal}), Array(String), function(args) {}, function(args) {}, Array(Decimal), Array(String), Array(String), Boolean, String);

export var fallenLeaves = {};

const fallenUpgradeBaseCosts = {
	FL1: new Decimal(1),
	FL2: new Decimal(2),
	FL3: new Decimal(4),
	FL4: new Decimal(50),
	FL5: new Decimal(1000),
};

export function fallenUpgradeFixer(type, id) {
	if (!(storage.rootUpgradeFactor.fallenUpgrades[type][id].amount instanceof Decimal)) {
		storage.rootUpgradeFactor.fallenUpgrades[type][id].amount = new Decimal(storage.rootUpgradeFactor.fallenUpgrades[type][id].amount);
	}
	if (!(storage.rootUpgradeFactor.fallenUpgrades[type][id].cost instanceof Decimal)) {
		storage.rootUpgradeFactor.fallenUpgrades[type][id].cost = new Decimal(storage.rootUpgradeFactor.fallenUpgrades[type][id].cost);
	}
}

export class fallenType {
	constructor(name, verboseName, id, factors, verboseFactors, capFunc, inverseCapFunc, capMults, verboseUpgrades, verboseMilestones, unlock, verboseUnlock) {
		this.name = name;
		this.verboseName = verboseName;
		this.id = id;
		this.factors = factors;
		this.verboseFactors = verboseFactors;
		this.capFunc = capFunc;
		this.inverseCapFunc = inverseCapFunc;
		this.capMults = capMults;
		this.verboseUpgrades = verboseUpgrades;
		this.verboseMilestones = verboseMilestones;
		this.unlock = unlock;
		this.verboseUnlock = verboseUnlock;
		
		this.#createType();
	}
	
	get baseCap() {
		let tempCap = new Decimal(0);
		let currentFactors = this.factors(); 
		for (let i = 0; i < currentFactors.length; i++) {
			if (!(currentFactors[i] instanceof Decimal)) {
				currentFactors[i] = new Decimal(currentFactors[i]);
			}
			tempCap = tempCap.plus(currentFactors[i]);
			if (currentFactors[i].gt(new Decimal(0))) {
				document.getElementById(`${this.name}Factor${i + 1}Counter`).style.display = `block`;
			}
		}
		
		return this.capFunc(tempCap).clamp(new Decimal(0), new Decimal(Infinity));
	}
	get totalCapMult() {
		let baseMult = new Decimal(1);
		const mults = this.capMults();
		for (let i = 0; i < mults.length; i++) {
			baseMult = baseMult.times(mults[i]);
		}
		return baseMult;
	}
	get cap() {
		return this.baseCap.times(this.totalCapMult);
	}
	nextCapIncrease(x) {
		return this.inverseCapFunc(x.plus(new Decimal(1)));
	}
	get rufReference() {
		return this.name.slice(0, -4);
	}
	
	#createType() {
		const self = this;
		
		let template = document.getElementById('fallenLeafType');
		let clone = document.importNode(template.content, true);
		
		const leftOffset = ((this.id - 1) % 4) * 255;
		const topOffset = (Math.floor((this.id - 1) / 4)) * 305;
		
		let lockedContainer = clone.querySelector(`#fallenTemplateLockedContainer`);
		lockedContainer.style.left = `${leftOffset}px`;
		lockedContainer.style.top = `${topOffset}px`;
		lockedContainer.id = `${this.name}LockedContainer`;
		
		let lockedText = clone.querySelector(`#fallenTemplateLockedText`);
		lockedText.innerHTML = this.verboseUnlock;
		lockedText.id = `${this.name}LockedText`;
		
		let unlockedContainer =  clone.querySelector(`#fallenTemplateUnlockedContainer`);
		unlockedContainer.style.left = `${leftOffset}px`;
		unlockedContainer.style.top = `${topOffset}px`;
		unlockedContainer.id = `${this.name}UnlockedContainer`;
		
		let verboseNameCounter = clone.querySelector(`#fallenTemplateVerboseName`);
		verboseNameCounter.innerHTML = this.verboseName;
		verboseNameCounter.id = `${this.name}VerboseName`;
		
		let fallenCounter = clone.querySelector(`#fallenTemplateCounter`);
		fallenCounter.innerHTML = `0`;
		fallenCounter.id = `${this.name}Counter`;
		
		let fallenCapCounter = clone.querySelector(`#fallenTemplateCapCounter`);
		fallenCapCounter.innerHTML = `0 / 0 (+0/s)`;
		fallenCapCounter.id = `${this.name}CapCounter`;
		
		let fallenImage = clone.querySelector(`#fallenTemplateImage`);
		fallenImage.src = `./src/images/${this.name}.png`;
		fallenImage.id = `${this.name}Image`;
		
		let fallenFactor1Counter = clone.querySelector(`#fallenTemplateFactor1Counter`);
		fallenFactor1Counter.innerHTML = `${this.verboseFactors[0]} -> +0`;
		fallenFactor1Counter.id = `${this.name}Factor1Counter`;
		
		const tempFactors = this.factors();
		if (tempFactors.length > 1) {
			let fallenFactor2Counter = clone.querySelector(`#fallenTemplateFactor2Counter`);
			fallenFactor2Counter.innerHTML = `${this.verboseFactors[1]} -> +0`;
			fallenFactor2Counter.id = `${this.name}Factor2Counter`;
		}
		if (tempFactors.length > 2) {
			let fallenFactor3Counter = clone.querySelector(`#fallenTemplateFactor3Counter`);
			fallenFactor3Counter.innerHTML = `${this.verboseFactors[2]} -> +0`;
			fallenFactor3Counter.id = `${this.name}Factor3Counter`;
		}
		if (tempFactors.length > 3) {
			let fallenFactor4Counter = clone.querySelector(`#fallenTemplateFactor4Counter`);
			fallenFactor4Counter.innerHTML = `${this.verboseFactors[3]} -> +0`;
			fallenFactor4Counter.id = `${this.name}Factor4Counter`;
		}
		if (tempFactors.length > 4) {
			let fallenFactor5Counter = clone.querySelector(`#fallenTemplateFactor5Counter`);
			fallenFactor5Counter.innerHTML = `${this.verboseFactors[4]} -> +0`;
			fallenFactor5Counter.id = `${this.name}Factor5Counter`;
		}
		
		let fallenFactorSumCounter = clone.querySelector(`#fallenTemplateFactorSumCounter`);
		fallenFactorSumCounter.innerHTML = `Σ(factors) is 0.`;
		fallenFactorSumCounter.id = `${this.name}FactorSumCounter`;
		
		let fallenToNextCapCounter = clone.querySelector(`#fallenTemplateToNextCapCounter`);
		fallenToNextCapCounter.innerHTML = `(next cap increase at 1)`;
		fallenToNextCapCounter.id = `${this.name}ToNextCapCounter`;
		
		let fallenUpgradeButton = clone.querySelector(`#fallenTemplateUpgradeButton`);
		fallenUpgradeButton.id = `${this.name}UpgradeButton`;
		
		let fallenMilestoneButton = clone.querySelector(`#fallenTemplateMilestoneButton`);
		fallenMilestoneButton.id = `${this.name}MilestoneButton`;
		
		document.querySelector('.fallen-leaves-type-container').appendChild(clone);
		
		template = document.getElementById('fallenInfoContainer');
		clone = document.importNode(template.content, true);
		
		let fallenInfoBox = clone.getElementById('templateFallenInfoBox');
		fallenInfoBox.id = `${this.name}UpgradesBox`;
		
		let fallenInfoTitle = clone.getElementById('templateFallenInfoTitle');
		fallenInfoTitle.innerHTML = `${this.verboseName} Upgrades`;
		fallenInfoTitle.id = `${this.name}UpgradesTitle`;
		
		let fallenInfoClose = clone.getElementById('templateFallenInfoClose');
		fallenInfoClose.id = `${this.name}UpgradesClose`;
		
		document.querySelector('.buttons-fallen-leaves').appendChild(clone);
		
		document.getElementById(`${this.name}UpgradeButton`).addEventListener("click", function() {
			document.getElementById(`${self.name}UpgradesBox`).style.display = "inline-block";
		});
		document.getElementById(`${this.name}UpgradesClose`).addEventListener("click", function() {
			document.getElementById(`${self.name}UpgradesBox`).style.display = "none";
		});
		
		for (let i = 0; i < this.verboseUpgrades.length; i++) {
			if (!(storage.rootUpgradeFactor.fallenUpgrades[self.rufReference][i].amount instanceof Decimal)) {
				storage.rootUpgradeFactor.fallenUpgrades[self.rufReference][i].amount = new Decimal(storage.rootUpgradeFactor.fallenUpgrades[self.rufReference][i].amount);
			}
			if (!(storage.rootUpgradeFactor.fallenUpgrades[self.rufReference][i].cost instanceof Decimal)) {
				storage.rootUpgradeFactor.fallenUpgrades[self.rufReference][i].cost = new Decimal(storage.rootUpgradeFactor.fallenUpgrades[self.rufReference][i].cost);
			}
			
			template = document.getElementById('fallenUpgrade');
			clone = document.importNode(template.content, true);
			
			let fallenUpgrade = clone.getElementById('templateFallenUpgrade');
			fallenUpgrade.id = `${this.name}Upgrade${i + 1}`;
			
			let fallenUpgradeText = clone.getElementById('templateFallenUpgradeText');
			fallenUpgradeText.innerHTML = this.verboseUpgrades[i];
			fallenUpgradeText.id = `${this.name}Upgrade${i + 1}Text`;
			
			document.querySelector(`#${this.name}UpgradesBox`).appendChild(clone);
			
			
			//this jumble of crap is the upgrade logic lol
			document.getElementById(`${this.name}Upgrade${i + 1}`).addEventListener("click", function(e) {
				const firstStep = e.target.getAttribute("id");
				const secondStep = firstStep.match(/[0-9]/);
				const temporaryI = secondStep - 1;
				
				const leafAmount = storage.rootUpgradeFactor.fallenLeavesBOOM[self.rufReference].amount;
				const cost = storage.rootUpgradeFactor.fallenUpgrades[self.rufReference][temporaryI].cost;
				const upgradeAmount = storage.rootUpgradeFactor.fallenUpgrades[self.rufReference][temporaryI].amount;
				if (leafAmount.lt(cost)) {
					return;
				}
				storage.rootUpgradeFactor.fallenLeavesBOOM[self.rufReference].amount = leafAmount.minus(cost);
				storage.rootUpgradeFactor.fallenUpgrades[self.rufReference][temporaryI].amount = upgradeAmount.plus(new Decimal(1))
				storage.rootUpgradeFactor.fallenUpgrades[self.rufReference][temporaryI].cost = (cost.times(1.5)).pow(new Decimal(1.05));
			});
		}
		template = document.getElementById('fallenInfoContainer');
		clone = document.importNode(template.content, true);
		
		fallenInfoBox = clone.getElementById('templateFallenInfoBox');
		fallenInfoBox.id = `${this.name}MilestonesBox`;
		
		fallenInfoTitle = clone.getElementById('templateFallenInfoTitle');
		fallenInfoTitle.innerHTML = `${this.verboseName} Milestones`;
		fallenInfoTitle.id = `${this.name}MilestonesTitle`;
		
		fallenInfoClose = clone.getElementById('templateFallenInfoClose');
		fallenInfoClose.id = `${this.name}MilestonesClose`;
		
		document.querySelector('.buttons-fallen-leaves').appendChild(clone);
		
		document.getElementById(`${this.name}MilestoneButton`).addEventListener("click", function() {
			document.getElementById(`${self.name}MilestonesBox`).style.display = "inline-block";
		});
		document.getElementById(`${this.name}MilestonesClose`).addEventListener("click", function() {
			document.getElementById(`${self.name}MilestonesBox`).style.display = "none";
		});
		
		for (let i = 0; i < this.verboseMilestones.length; i++) {
			if (!(storage.rootUpgradeFactor.fallenMilestones[self.rufReference][i].cost instanceof Decimal)) {
				storage.rootUpgradeFactor.fallenMilestones[self.rufReference][i].cost = new Decimal(storage.rootUpgradeFactor.fallenMilestones[self.rufReference][i].cost);
			}
			
			template = document.getElementById('fallenMilestone');
			clone = document.importNode(template.content, true);
			
			let fallenMilestone = clone.getElementById('templateFallenMilestone');
			fallenMilestone.id = `${this.name}Milestone${i + 1}`;
			
			let fallenMilestoneText = clone.getElementById('templateFallenMilestoneText');
			fallenMilestoneText.innerHTML = this.verboseMilestones[i];
			fallenMilestoneText.id = `${this.name}Milestone${i + 1}Text`;
			
			document.querySelector(`#${this.name}MilestonesBox`).appendChild(clone);
		}
	}

	run() {
		const trueUnlock = this.unlock();
		if (!trueUnlock) {
			return;
		}
		document.getElementById(`${this.name}LockedContainer`).style.display = 'none';
		document.getElementById(`${this.name}UnlockedContainer`).style.display = 'block';
		
		for (let i = 0; i < this.verboseMilestones.length; i++) {
			if (storage.rootUpgradeFactor.fallenMilestones[this.rufReference][i].achieved) {
				document.getElementById(`${this.name}Milestone${i + 1}`).style.backgroundImage = 'linear-gradient(90deg, #83d927 0%, #11d611 100%)';
			}
		}
		let nextCap;
		if (this.baseCap.lt(new Decimal(0))) {
			nextCap = this.nextCapIncrease(new Decimal(0));
		}
		else {
			nextCap = this.nextCapIncrease(this.baseCap);
		}
		document.getElementById(`${this.name}ToNextCapCounter`).innerHTML = `(+${storage.truncateToDecimalPlaces(this.totalCapMult, 3)} to the cap at ${storage.truncateToDecimalPlaces(nextCap, 3)})`;
		
		const currentFactors = this.factors(); 
		let totalFactor = new Decimal(0);
		for (let i = 0; i < currentFactors.length; i++) {
			document.getElementById(`${this.name}Factor${i + 1}Counter`).innerHTML = `${this.verboseFactors[i]} -> +${storage.truncateToDecimalPlaces(currentFactors[i], 3)}`;
			totalFactor = totalFactor.plus(currentFactors[i]);
		}
		document.getElementById(`${this.name}FactorSumCounter`).innerHTML = `Σ(factors) is ${storage.truncateToDecimalPlaces(totalFactor, 3)}.`;
		
		if (!(storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].temp instanceof Decimal)) {
			storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].temp = new Decimal(storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].temp);
		}
		if (storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].temp.isNan()) {
			storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].temp = new Decimal(0);
		}
		if (!(storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].amount instanceof Decimal)) {
			storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].amount = new Decimal(storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].amount);
		}
		
		const capToFixLag = this.cap;
		if (capToFixLag.gte(new Decimal(1))) {
			const baseTimeReq = new Decimal(1000).div(storage.rootUpgradeFactor.fallenLeafFallSpeedMult);
			const adjTimeReq = baseTimeReq.div(new Decimal(1000));
			if (adjTimeReq.lte(new Decimal(0.05))) {
				document.getElementById(`fallenLeavesBaseFallSpeed`).innerHTML = `Currently, you gain a base of ${storage.truncateToDecimalPlaces(new Decimal(1).div(adjTimeReq), 3)} Fallen Leaves per second.`;
			}
			else {
				document.getElementById(`fallenLeavesBaseFallSpeed`).innerHTML = `Currently, it takes a base of ${storage.truncateToDecimalPlaces(adjTimeReq, 3)} seconds for 1 Leaf to drop.`;
			}
			const gameSpeedToFixLag = calculateLocalGameSpeed();
			document.getElementById(`fallenLeavesGameSpeedNerf`).innerHTML = `x${storage.truncateToDecimalPlaces(gameSpeedToFixLag, 3)} &#x231B;`;
			const adjustedTimeReq = (baseTimeReq.div(gameSpeedToFixLag)).times(new Decimal(10).pow(new Decimal(this.id - 1)));
			const amountPerMillisecond = new Decimal(1).div(adjustedTimeReq);
			const amountPerSecond = amountPerMillisecond.times(new Decimal(1000));
			const totalAmount = amountPerMillisecond.times(storage.gameData.ticksToUpdateComposter);
			storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].temp = (storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].temp.plus(totalAmount)).clamp(new Decimal(0), capToFixLag);
			if (storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].temp.gte(new Decimal(1))) {
				storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].canCollect = true;
			}
			else {
				storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].canCollect = false;
			}
			
			document.getElementById(`${this.name}Counter`).innerHTML = storage.truncateToDecimalPlaces(storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].amount, 3);
			document.getElementById(`${this.name}CapCounter`).innerHTML = `${storage.truncateToDecimalPlaces(storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].temp, 3)} / ${storage.truncateToDecimalPlaces(capToFixLag, 3)} (+${storage.truncateToDecimalPlaces(amountPerSecond, 3)}/s)`;
			
			if (!(document.getElementById(`${this.name}Milestone1`))) {
				return;
			}
			for (let i = 0; i < this.verboseMilestones.length; i++) {
				if (capToFixLag.gte(storage.rootUpgradeFactor.fallenMilestones[this.rufReference][i].cost)) {
					storage.rootUpgradeFactor.fallenMilestones[this.rufReference][i].achieved = true;
				}
			}
		}
		else {
			document.getElementById(`${this.name}Counter`).innerHTML = storage.truncateToDecimalPlaces(storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].amount, 3);
			document.getElementById(`${this.name}CapCounter`).innerHTML = `${storage.truncateToDecimalPlaces(storage.rootUpgradeFactor.fallenLeavesBOOM[this.rufReference].temp, 3)} / ${storage.truncateToDecimalPlaces(capToFixLag, 3)} (+0/s)`;
		}
	}
}

document.addEventListener('DOMContentLoaded', (event) => {
    fallenLeaves.fallen = new fallenType(
		'fallenleaf',
		'Fallen Leaves',
		1,
		() => [
			Decimal.log10(Decimal.log10(storage.gameData.leaves.plus(new Decimal(1))).plus(new Decimal(1))), 
			storage.rootUpgradeFactor.fallenMilestones.fallen[1].achieved ? Decimal.log((storage.rootUpgradeFactor.fallenLeavesBOOM.fallen.amount instanceof Decimal ? storage.rootUpgradeFactor.fallenLeavesBOOM.fallen.amount : new Decimal(storage.rootUpgradeFactor.fallenLeavesBOOM.fallen.amount)).plus(new Decimal(1)), new Decimal(5)) : new Decimal(0),
		],
		[
			'log<sup>2</sup>(Leaves)',
			'log<sub>5</sub>(FL)',
		],
		function(x) {return ((new Decimal(3.32193).times(x)).minus(new Decimal(21.2535))).trunc()},
		function(x) {return (x.plus(new Decimal(21.2535))).div(new Decimal(3.32193))},
		() => [storage.rootUpgradeFactor.fallenLeafCapMult],
		[
			`FL1 (0)<br>x1.25 FL fall speed<br>Cost: 1 Fallen Leaf<br>Effect: x1`,
			`FL2 (0)<br>+x0.025 Leaf supercap root<br>Cost: 2 Fallen Leaves<br>Effect: x1`,
			`FL3 (0)<br>x1.2 FL's cap<br>Cost: 4 Fallen Leaves<br>Effect: x1`,
			`FL4 (0)<br>+0.002 FL2's base effect<br>Cost: 50 Fallen Leaves<br>Effect: +0`,
			`FL5 (0)<br>+x0.04 Fall rewards<br>Cost: 1000 Fallen Leaves<br>Effect: x1`,
		],
		[
			`<span class="bold">1 cap</span><br>x1.1 Leaf supercap root`,
			`<span class="bold">3 cap</span><br>Unlock the second factor for FL generation`,
			`<span class="bold">150 cap</span><br>FL's cap boosts FL4's effect`,
			`<span class="bold">500 cap</span><br>FL's cap boosts FL base fall speed`,
		],
		() => storage.gameData.fallLevel.gt(new Decimal(1)),
		'This Fallen Leaf type unlocks when you complete the Fall challenge.'
	);
	fallenLeaves.mossy = new fallenType(
		'mossyleaf',
		'Mossy Leaves',
		2,
		() => [
			Decimal.log10(Decimal.log10(storage.gameData.moss.plus(new Decimal(1))).plus(new Decimal(1))),
			storage.rootUpgradeFactor.fallenMilestones.mossy[2].achieved ? Decimal.log10(Decimal.log10(storage.gameData.mossEffect.plus(new Decimal(1))).plus(new Decimal(1))) : new Decimal(0),
		],
		[
			'log<sup>2</sup>(Moss)',
			'log<sup>2</sup>(Moss effect)',
		],
		function(x) {return ((new Decimal(1.43068).times(x)).minus(new Decimal(10.44541))).trunc()},
		function(x) {return (x.plus(new Decimal(10.44541))).div(new Decimal(1.43068))},
		() => [new Decimal(1)],
		[
			`ML1 (0)<br>^1.05 Moss<br>Cost: 1 Mossy Leaf<br>Effect: ^1`,
			`ML2 (0)<br>x1.3 Wildfire rewards<br>Cost: 4 Mossy Leaves<br>Effect: x1`,
			`ML3 (0)<br>^1.35 to the Moss product bases<br>Cost: 20 Mossy Leaves<br>Effect: ^1`,
			`ML4 (0)<br>^1.35 Glutamine's effect<br>Cost: 80 Mossy Leaves<br>Effect: ^1`,
		],
		[
			`<span class="bold">1 cap</span><br>x2 L65's effect`,
			`<span class="bold">2 cap</span><br>Improve M4's effect dramatically`,
			`<span class="bold">3 cap</span><br>Unlock the second factor for ML generation`,
			`<span class="bold">15 cap</span><br>Improve ML2's effect<br>x1.3 -> x1.6`,
		],
		() => storage.gameData.fallLevel.gt(new Decimal(1)),
		'This Fallen Leaf type unlocks when you complete the Fall challenge.'
	);
	fallenLeaves.marbled = new fallenType(
		'marbledleaf',
		'Marbled Leaves',
		3,
		() => [Decimal.log10(temple.productOfAllCaps().plus(new Decimal(1)))],
		['log(∏(rep. caps))'],
		function(x) {return ((new Decimal(0.75).times(x))).minus(new Decimal(23.75)).trunc()},
		function(x) {return (x.plus(new Decimal(23.75))).div(new Decimal(0.75))},
		() => [new Decimal(1)],
		[
			`MaL1 (0)<br>^0.975 all repeatable costs<br>Cost: 2 Marbled Leaves<br>Effect: ^1`,
			`MaL2 (0)<br>^1.3 SR1's effect<br>Cost: 8 Marbled Leaves<br>Effect: x1`,
			`MaL3 (0)<br>x1.25 Glutamate's effect<br>Cost: 24 Marbled Leaves<br>Effect: x1`,
		],
		[
			`<span class="bold">1 cap</span><br>x2 Glutamate's effect`,
			`<span class="bold">2 cap</span><br>^1000 LR1's effect`,
			`<span class="bold">3 cap</span><br><s>Unlock the Forge</s><br>Reach endgame`,
		],
		() => storage.gameData.fallLevel.gt(new Decimal(1)),
		'This Fallen Leaf type unlocks when you complete the Fall challenge.'
	);
	fallenLeaves.coal = new fallenType(
		'coalleaf',
		'Coal Leaves',
		4,
		() => [new Decimal(1)],
		['Coal'],
		function(x) {return (Decimal.log(x, new Decimal(5)).plus(new Decimal(1))).trunc()},
		function(x) {return (new Decimal(5).pow(x))},
		() => [new Decimal(1)],
		['upgrade'],
		['milestone'],
		() => false,
		'This Fallen Leaf type unlocks when you make your first Pickaxe.'
	);
	fallenLeaves.copper = new fallenType(
		'copperleaf',
		'Copper Leaves',
		5,
		() => [new Decimal(1)],
		['Copper'],
		function(x) {return (Decimal.log(x, new Decimal(5)).plus(new Decimal(1))).trunc()},
		function(x) {return (new Decimal(5).pow(x))},
		() => [new Decimal(1)],
		['upgrade'],
		['milestone'],
		() => false,
		'This Fallen Leaf type unlocks when you make your first Pickaxe.'
	);
	fallenLeaves.iron = new fallenType(
		'ironleaf',
		'Iron Leaves',
		6,
		() => [new Decimal(1)],
		['Iron'],
		function(x) {return (Decimal.log(x, new Decimal(5)).plus(new Decimal(1))).trunc()},
		function(x) {return (new Decimal(5).pow(x))},
		() => [new Decimal(1)],
		['upgrade'],
		['milestone'],
		() => false,
		'This Fallen Leaf type unlocks when you make your second Pickaxe.'
	);
	fallenLeaves.malachite = new fallenType(
		'malachiteleaf',
		'Malachite Leaves',
		7,
		() => [new Decimal(1)],
		['Malachite'],
		function(x) {return (Decimal.log(x, new Decimal(5)).plus(new Decimal(1))).trunc()},
		function(x) {return (new Decimal(5).pow(x))},
		() => [new Decimal(1)],
		['upgrade'],
		['milestone'],
		() => false,
		'This Fallen Leaf type unlocks when your local Game speed is greater than x10.'
	);
	fallenLeaves.jade = new fallenType(
		'jadeleaf',
		'Jade Leaves',
		8,
		() => [new Decimal(1)],
		['Jade'],
		function(x) {return (Decimal.log(x, new Decimal(5)).plus(new Decimal(1))).trunc()},
		function(x) {return (new Decimal(5).pow(x))},
		() => [new Decimal(1)],
		['upgrade'],
		['milestone'],
		() => false,
		'This Fallen Leaf type unlocks when your mining fortune is greater than 10&#x1F340;.'
	);
	fallenLeaves.gold = new fallenType(
		'goldleaf',
		'Gold Leaves',
		9,
		() => [new Decimal(1)],
		['Gold'],
		function(x) {return (Decimal.log(x, new Decimal(5)).plus(new Decimal(1))).trunc()},
		function(x) {return (new Decimal(5).pow(x))},
		() => [new Decimal(1)],
		['upgrade'],
		['milestone'],
		() => false,
		'This Fallen Leaf type unlocks when you make your third Pickaxe.'
	);
	fallenLeaves.enstatite = new fallenType(
		'enstatiteleaf',
		'Enstatite Leaves',
		10,
		() => [new Decimal(1)],
		['Enstatite'],
		function(x) {return (Decimal.log(x, new Decimal(5)).plus(new Decimal(1))).trunc()},
		function(x) {return (new Decimal(5).pow(x))},
		() => [new Decimal(1)],
		['upgrade'],
		['milestone'],
		() => false,
		'This Fallen Leaf type unlocks when you make your third Pickaxe.'
	);
	fallenLeaves.diamond = new fallenType(
		'diamondleaf',
		'Diamond Leaves',
		11,
		() => [new Decimal(1)],
		['Diamond'],
		function(x) {return (Decimal.log(x, new Decimal(5)).plus(new Decimal(1))).trunc()},
		function(x) {return (new Decimal(5).pow(x))},
		() => [new Decimal(1)],
		['upgrade'],
		['milestone'],
		() => false,
		'This Fallen Leaf type unlocks when your mining fortune is greater than 500&#x1F340;.'
	),
	fallenLeaves.emerald = new fallenType(
		'emeraldleaf',
		'Emerald Leaves',
		12,
		() => [new Decimal(1)],
		['Emerald'],
		function(x) {return (Decimal.log(x, new Decimal(5)).plus(new Decimal(1))).trunc()},
		function(x) {return (new Decimal(5).pow(x))},
		() => [new Decimal(1)],
		['upgrade'],
		['milestone'],
		() => false,
		'This Fallen Leaf type unlocks when you make your fourth Pickaxe.'
	);
	fallenLeaves.bronze = new fallenType(
		'bronzeleaf',
		'Bronze Leaves',
		13,
		() => [new Decimal(1)],
		['Bronze'],
		function(x) {return (Decimal.log(x, new Decimal(5)).plus(new Decimal(1))).trunc()},
		function(x) {return (new Decimal(5).pow(x))},
		() => [new Decimal(1)],
		['upgrade'],
		['milestone'],
		() => false,
		'This Fallen Leaf type unlocks when your Furnace can reach a temperature of 850&deg; C.'
	);
	fallenLeaves.steel = new fallenType(
		'steelleaf',
		'Steel Leaves',
		14,
		() => [new Decimal(1)],
		['Steel'],
		function(x) {return (Decimal.log(x, new Decimal(5)).plus(new Decimal(1))).trunc()},
		function(x) {return (new Decimal(5).pow(x))},
		() => [new Decimal(1)],
		['upgrade'],
		['milestone'],
		() => false,
		'This Fallen Leaf type unlocks when your Furnace can reach a temperature of 1000&deg; C.'
	);
	fallenLeaves.titanium = new fallenType(
		'titaniumleaf',
		'Titanium Leaves',
		15,
		() => [new Decimal(1)],
		['Titanium'],
		function(x) {return (Decimal.log(x, new Decimal(5)).plus(new Decimal(1))).trunc()},
		function(x) {return (new Decimal(5).pow(x))},
		() => [new Decimal(1)],
		['upgrade'],
		['milestone'],
		() => false,
		'This Fallen Leaf type unlocks when your Furnace can reach a temperature of 1300&deg; C.'
	);
	fallenLeaves.chromium = new fallenType(
		'chromiumleaf',
		'Chromium Leaves',
		16,
		() => [new Decimal(1)],
		['Chromium'],
		function(x) {return (Decimal.log(x, new Decimal(5)).plus(new Decimal(1))).trunc()},
		function(x) {return (new Decimal(5).pow(x))},
		() => [new Decimal(1)],
		['upgrade'],
		['milestone'],
		() => false,
		'This Fallen Leaf type unlocks when your Furnace can reach a temperature of 1800&deg; C and a mining fortune greater than 9000&#x1F340;.'
	);
	fallenLeaves.vultimanium = new fallenType(
		'vultimaniumleaf',
		'Vultimanium Leaves',
		32,
		() => [new Decimal(1)],
		['Vultimanium'],
		function(x) {return (Decimal.log(x, new Decimal(5)).plus(new Decimal(1))).trunc()},
		function(x) {return (new Decimal(5).pow(x))},
		() => [new Decimal(1)],
		['upgrade'],
		['milestone'],
		() => false,
		'This Fallen Leaf type unlocks when your mining fortune is greater than e1e6&#x1F340; and your pickaxe can withstand a temperature of 1.79e308&deg; C.'
	);
});

function calculateLocalGameSpeed() {
	return (Decimal.log10(storage.gameData.gameSpeed.plus(new Decimal(1)))).div(new Decimal(1000));
}

export function runFallenLeaves() {
	let succeededCollectables = 0;
	
	for (const key in fallenLeaves) {
		const value = fallenLeaves[key];
		if (value === 'undefined') {
			break;
		}
		value.run();
		if (storage.rootUpgradeFactor.fallenLeavesBOOM[value.rufReference].canCollect) {
			succeededCollectables++;
		}
	}
	if (succeededCollectables > 0) {
		document.getElementById("collectAllFallenLeaves").style.backgroundImage = 'linear-gradient(90deg, #83d927 0%, #11d611 100%)';
		document.getElementById("collectAllFallenLeaves").removeAttribute('disabled');
	}
	else {
		document.getElementById("collectAllFallenLeaves").style.backgroundImage = 'linear-gradient(90deg, #de6e12 0%, #de1b1b 100%)';
		document.getElementById("collectAllFallenLeaves").setAttribute('disabled', '');
	}
}

document.getElementById("collectAllFallenLeaves").addEventListener("click", function() {
	for (const key in storage.rootUpgradeFactor.fallenLeavesBOOM) {
		const value = storage.rootUpgradeFactor.fallenLeavesBOOM[key];
		if (value.canCollect) {
			if (!(storage.rootUpgradeFactor.fallenLeavesBOOM[key].amount instanceof Decimal)) {
				storage.rootUpgradeFactor.fallenLeavesBOOM[key].amount = new Decimal(storage.rootUpgradeFactor.fallenLeavesBOOM[key].amount);
			}
			if (!(storage.rootUpgradeFactor.fallenLeavesBOOM[key].temp instanceof Decimal)) {
				storage.rootUpgradeFactor.fallenLeavesBOOM[key].temp = new Decimal(storage.rootUpgradeFactor.fallenLeavesBOOM[key].temp);
			}
			storage.rootUpgradeFactor.fallenLeavesBOOM[key].amount = value.amount.plus(value.temp);
			storage.rootUpgradeFactor.fallenLeavesBOOM[key].temp = new Decimal(0);
			storage.rootUpgradeFactor.fallenLeavesBOOM[key].canCollect = false;
		}
	}
});
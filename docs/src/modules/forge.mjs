import * as storage from "./core/bunchobullshit.mjs";
import { achievements } from "./achievements.mjs"
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// #4e93d9 is -100° C
// #e3c091 is room temperature
// #f01616 is 1000° C
// #6e9cd4 is 10000° C
// #94b1ff is 1.79e308° C

//this takes a temperature value of instance Decimal and returns a hex code for a temperature color

var tempForgableItems = {};

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//d3 is doing 90% of the work here
function tempVisualCalc(x) {
	let d3Function;
	let percent;
	let baseMultiple;
	let base;
	let baseCalc;
	let endCalc;
	switch (true) {
		case (x.lte(new Decimal(-98))):
			d3Function = d3.interpolateRgb("#4e93d9", "#e3c091");
			percent = 0;
			break;
		case ((x.gt(new Decimal(-98))) && (x.lte(new Decimal(22)))):
			baseMultiple = new Decimal(20.63177);
			base = new Decimal(1.04106);
			baseCalc = (base.pow(x)).times(baseMultiple);
			endCalc = (baseCalc.times(new Decimal(2))).div(new Decimal(100));
			d3Function = d3.interpolateRgb("#4e93d9", "#e3c091");
			percent = endCalc.toNumber();
			break;
		case ((x.gt(new Decimal(22))) && (x.lte(new Decimal(1000)))):
			baseMultiple = new Decimal(49.22643);
			base = new Decimal(1.00071);
			baseCalc = (base.pow(x)).times(baseMultiple);
			endCalc = ((baseCalc.times(new Decimal(2))).minus(new Decimal(50))).div(new Decimal(100));
			d3Function = d3.interpolateRgb("#e3c091", "#f01616");
			percent = endCalc.toNumber();
			break;
		case ((x.gt(new Decimal(1000))) && (x.lte(new Decimal(10000)))):
			baseMultiple = new Decimal(1).div(new Decimal(90));
			base = new Decimal(100).div(new Decimal(9));
			baseCalc = x.times(baseMultiple).minus(base);
			endCalc = baseCalc.div(new Decimal(100));
			d3Function = d3.interpolateRgb("#f01616", "#6e9cd4");
			percent = endCalc.toNumber();
			break;
		case ((x.gt(new Decimal(10000))) && (x.lte(new Decimal(1.79e308)))):
			const y = Decimal.log10(x.plus(new Decimal(1)));
			baseMultiple = new Decimal(0.328674);
			base = new Decimal(1.3147);
			baseCalc = x.times(baseMultiple).minus(base);
			endCalc = baseCalc.div(new Decimal(100));
			d3Function = d3.interpolateRgb("#6e9cd4", "#94b1ff");
			percent = endCalc.toNumber();
			break;
		case (x.gt(new Decimal(1.79e308))):
			d3Function = d3.interpolateRgb("#6e9cd4", "#94b1ff");
			percent = 100;
			break;
	}
	const rgbStr = d3Function(percent);
	const [r, g, b] = rgbStr.match(/\d+/g).map(Number);
	return rgbToHex(r, g, b);
}

document.getElementById('temperatureDebug').addEventListener('change', function(e) {
	const value = e.target.value;
	const result = tempVisualCalc(new Decimal(value));
	this.value = result;
});

function calculateLocalGameSpeed() {
	return (Decimal.log10(storage.gameData.gameSpeed.plus(new Decimal(1)))).div(new Decimal(1000));
}

export class forgableItem {
	constructor(name, description, unlock, requirement, resourceIndex, resources, cost, time) {
		this.name = name;
		this.description = description;
		this.unlockFN = unlock;
		this.requirementFN = requirement;
		this.resourceIndex = resourceIndex;
		this.resourcesFN = resources;
		this.costFN = cost;
		this.time = time;
		this.timeLeft = time;
		
		this.#init();
	}
	
	get unlock() {
		return this.unlockFN();
	}
	get requirement() {
		return this.requirementFN();
	}
	get resources() {
		return this.resourcesFN();
	}
	get cost() {
		return this.costFN();
	}
	
	get amount() {
		return storage.rootUpgradeFactor.items[this.name].amount;
	}
	get stackSize() {
		return storage.rootUpgradeFactor.items[this.name].stackSize;
	}
	
	forgable = false;
	forging = false;
	
	#init() {
		const self = this;
		let template = document.getElementById('forgableItemTemplate');
		let clone = document.importNode(template.content, true);
		
		clone.getElementById('forgableItem').addEventListener('click', function(e) {self.forge(self)});
		clone.getElementById('forgableItem').style.display = 'block';
		clone.getElementById('forgableItem').id = this.name;
		clone.getElementById('forgableItemImage').addEventListener('click', function(e) {self.forge(self)});
		clone.getElementById('forgableItemImage').src = "./src/images/items/" + this.name + ".png";
		clone.getElementById('forgableItemImage').id = this.name + "Image";
		clone.getElementById('forgableItemAmount').addEventListener('click', function(e) {self.forge(self)});
		clone.getElementById('forgableItemAmount').id = this.name + "Amount";
		clone.getElementById('forgableItemInfo').innerHTML = this.description;
		clone.getElementById('forgableItemInfo').id = this.name + "Info";
		clone.getElementById('forgableItemTime').id = this.name + "Time";
		clone.getElementById('forgableItemPercent').classList.add('bold');
		clone.getElementById('forgableItemPercent').id = this.name + "Percent";
		
		document.getElementById('forgableItemHolder').appendChild(clone);
	}
	
	get amountPerTick() {
		const gameSpeed = calculateLocalGameSpeed();
		return gameSpeed.times(storage.gameData.ticksToUpdateComposter);
	}
	
	run() {
		if (this.unlock) {
			document.getElementById(this.name).style.display = 'block';
		}
		else {
			document.getElementById(this.name).style.display = 'none';
			return;
		}
		const totalTime = (this.time.div(new Decimal(1000))).div(calculateLocalGameSpeed());
		document.getElementById(`${this.name}Time`).innerHTML = storage.truncateToDecimalPlaces(totalTime, 3);
		document.getElementById(`${this.name}Amount`).innerHTML = `${storage.truncateToDecimalPlaces(this.amount, 3)}<sub>/${storage.truncateToDecimalPlaces(this.stackSize, 3)}</sub>`;
		if (this.forgable) {
			document.getElementById(this.name).style.borderColor = '#50bb50';
			if (!this.forging) {
				return;
			}
			document.getElementById(this.name).style.borderColor = '#edac13';
			this.timeLeft = this.timeLeft.minus(this.amountPerTick);
			const timeElapsed = this.time.minus(this.timeLeft);
			const percentComplete = (timeElapsed.div(this.time)).times(new Decimal(100));
			document.getElementById(`${this.name}Percent`).innerHTML = storage.truncateToDecimalPlaces(percentComplete, 3) + '%';
			
			if (this.timeLeft.lte(new Decimal(0))) {
				this.forging = false;
				this.timeLeft = this.time;
				storage.rootUpgradeFactor.items[this.name].amount = this.amount.plus(new Decimal(1));
				storage.rootUpgradeFactor.items[this.name].obtained = true;
				this.forgable = false;
				document.getElementById(`${this.name}Percent`).innerHTML = '';
			}
			return;
		}
		
		let failedForging = false;
		for (let i = 0; i < this.requirement.length; i++) {
			if (!this.requirement[i]) {
				failedForging = true;
			}
		}
		for (let i = 0; i < this.cost.length; i++) {
			if (this.resources[i].lt(this.cost[i])) {
				failedForging = true;
			}
		}
		if (this.amount.gte(this.stackSize)) {
			failedForging = true;
		}
		if (failedForging) {
			document.getElementById(this.name).style.borderColor = '#000000';
			return;
		}
		else {
			document.getElementById(this.name).style.borderColor = '#50bb50';
			this.forgable = true;
			return;
		}
	}
	
	forge(reference) {
		if (!reference.forgable || reference.forging) {
			return;
		}
		//this is doing some magic to get around js's requirement that functions cannot call their original arguments and can only access their references defined in their constructor
		//if reference actually works I am a goddamned genius
		for (let i = 0; i < reference.cost.length; i++) {
			const resourceString = reference.resourceIndex[i][1];
			const difference = reference.resources[i].minus(reference.cost[i]);
			storage[reference.resourceIndex[i][0]].updateValue(resourceString, difference);
		}
		reference.forging = true;
	}
}

document.addEventListener('DOMContentLoaded', (event) => {
	tempForgableItems = {
		crudePickaxe: new forgableItem(
			"crudePickaxe",
			`Crude Pickaxe<br>Your first pickaxe! Durability 100&#x1F4AA;, Fortune 1&#x1F340;, Temperature range: <span style="color: #6c9ccb;">-18&deg; C</span> - <span style="color: #ea644e;">80&deg; C</span><br>Cost: 50000 Fallen Leaves, 2500 Mossy Leaves, and 150 Marbled Leaves<br><span class="italic">This item takes 60 (<span id="forgableItemTime">60</span> real time) seconds to make.<br>This item can be made in a temperature range of <span style="color: #6c9ccb;">-18&deg; C</span> to <span style="color: #ea644e;">80&deg; C</span></span>`,
			() => storage.rootUpgradeFactor.fallenMilestones.marbled[2].achieved,
			() => [
				(storage.gameData.forgeTemperature.gte(new Decimal(-18)) && storage.gameData.forgeTemperature.lte(new Decimal(80))) ? true : false
			],
			[
				["rootUpgradeFactor", "fallenLeavesBOOM.fallen.amount"],
				["rootUpgradeFactor", "fallenLeavesBOOM.mossy.amount"],
				["rootUpgradeFactor", "fallenLeavesBOOM.marbled.amount"],
			],
			() => [
				storage.rootUpgradeFactor.fallenLeavesBOOM.fallen.amount,
				storage.rootUpgradeFactor.fallenLeavesBOOM.mossy.amount,
				storage.rootUpgradeFactor.fallenLeavesBOOM.marbled.amount,
			],
			() => [
				new Decimal(50000),
				new Decimal(2500),
				new Decimal(150),
			],
			new Decimal(60000)
		),
		basicFurnace: new forgableItem(
			"basicFurnace",
			`Basic Furnace<br>Oh god, this game is just turning into Minecraft, isn't it-- Can get up to <span style="color: #ec4639;">300&deg; C</span> and loses <span style="color: #89a5bc;">1&deg; C</span> in temperature every second.<br>Cost: 8 Cobblestone and 1 Copper chunk<br><span class="italic">This item takes 60 (<span id="forgableItemTime">60</span> real time) seconds to make.<br>This item can be made in a temperature range of <span style="color: #6c9ccb;">-18&deg; C</span> to <span style="color: #ea644e;">80&deg; C</span></span>`,
			() => storage.rootUpgradeFactor.items.crudePickaxe.obtained,
			() => [
				(storage.gameData.forgeTemperature.gte(new Decimal(-18)) && storage.gameData.forgeTemperature.lte(new Decimal(80))) ? true : false
			],
			[
				["rootUpgradeFactor", "items.cobblestone.amount"],
				["rootUpgradeFactor", "items.copperChunk.amount"],
			],
			() => [
				storage.rootUpgradeFactor.items.cobblestone.amount,
				storage.rootUpgradeFactor.items.copperChunk.amount,
			],
			() => [
				new Decimal(8),
				new Decimal(1),
			],
			new Decimal(60000)
		),
		copperIngot: new forgableItem(
			"copperIngot",
			`Copper Ingot<br>Refined form of Copper ore<br>Cost: 1 Copper chunk<br><span class="italic">This item takes 20 (<span id="forgableItemTime">20</span> real time) seconds to make.<br>This item can be made in a temperature range of <span style="color: #ef1718;">1084&deg; C</span> to <span style="color: #d92d37;">2562&deg; C</span></span>`,
			() => false,
			() => [
				(storage.gameData.forgeTemperature.gte(new Decimal(1084)) && storage.gameData.forgeTemperature.lt(new Decimal(2562))) ? true : false
			],
			[
				["rootUpgradeFactor", "fallenLeavesBOOM.fallen.amount"],
				["rootUpgradeFactor", "fallenLeavesBOOM.mossy.amount"],
				["rootUpgradeFactor", "fallenLeavesBOOM.marbled.amount"],
			],
			() => [
				storage.rootUpgradeFactor.fallenLeavesBOOM.fallen.amount,
				storage.rootUpgradeFactor.fallenLeavesBOOM.mossy.amount,
				storage.rootUpgradeFactor.fallenLeavesBOOM.marbled.amount,
			],
			() => [
				new Decimal(50000),
				new Decimal(5000),
				new Decimal(150),
			],
			new Decimal(20000)
		),
		tinIngot: new forgableItem(
			"tinIngot",
			`Tin Ingot<br>Refined form of Tin ore<br>Cost: 1 Tin chunk<br><span class="italic">This item takes 20 (<span id="forgableItemTime">20</span> real time) seconds to make.<br>This item can be made in a temperature range of <span style="color: #ec5040;">232&deg; C</span> to <span style="color: #d92e38;">2602&deg; C</span></span>`,
			() => false,
			() => [
				(storage.gameData.forgeTemperature.gte(new Decimal(232)) && storage.gameData.forgeTemperature.lt(new Decimal(2602))) ? true : false
			],
			[
				["rootUpgradeFactor", "fallenLeavesBOOM.fallen.amount"],
				["rootUpgradeFactor", "fallenLeavesBOOM.mossy.amount"],
				["rootUpgradeFactor", "fallenLeavesBOOM.marbled.amount"],
			],
			() => [
				storage.rootUpgradeFactor.fallenLeavesBOOM.fallen.amount,
				storage.rootUpgradeFactor.fallenLeavesBOOM.mossy.amount,
				storage.rootUpgradeFactor.fallenLeavesBOOM.marbled.amount,
			],
			() => [
				new Decimal(50000),
				new Decimal(5000),
				new Decimal(150),
			],
			new Decimal(20000)
		),
		bronzeIngot: new forgableItem(
			"bronzeIngot",
			`Bronze Ingot<br>Alloy that made the ancient Egyptians the powerhouse of said ancient world<br>Cost: 3 Copper Ingots and 1 Tin Ingot<br><span class="italic">This item takes 60 (<span id="forgableItemTime">60</span> real time) seconds to make.<br>This item can be made in a temperature range of <span style="color: #f60000;">950&deg; C</span> to <span style="color: #de2830;">2230&deg; C</span></span>`,
			() => false,
			() => [
				(storage.gameData.forgeTemperature.gte(new Decimal(950)) && storage.gameData.forgeTemperature.lt(new Decimal(2230))) ? true : false
			],
			[
				["rootUpgradeFactor", "fallenLeavesBOOM.fallen.amount"],
				["rootUpgradeFactor", "fallenLeavesBOOM.mossy.amount"],
				["rootUpgradeFactor", "fallenLeavesBOOM.marbled.amount"],
			],
			() => [
				storage.rootUpgradeFactor.fallenLeavesBOOM.fallen.amount,
				storage.rootUpgradeFactor.fallenLeavesBOOM.mossy.amount,
				storage.rootUpgradeFactor.fallenLeavesBOOM.marbled.amount,
			],
			() => [
				new Decimal(50000),
				new Decimal(5000),
				new Decimal(150),
			],
			new Decimal(60000)
		),
		ironIngot: new forgableItem(
			"ironIngot",
			`Iron Ingot<br>Refined form of Iron ore<br>Cost: 1 Iron chunk<br><span class="italic">This item takes 60 (<span id="forgableItemTime">60</span> real time) seconds to make.<br>This item can be made in a temperature range of <span style="color: #e81e21;">1538&deg; C</span> to <span style="color: #d5323d;">2861&deg; C</span></span>`,
			() => false,
			() => [
				(storage.gameData.forgeTemperature.gte(new Decimal(1538)) && storage.gameData.forgeTemperature.lt(new Decimal(2861))) ? true : false
			],
			[
				["rootUpgradeFactor", "fallenLeavesBOOM.fallen.amount"],
				["rootUpgradeFactor", "fallenLeavesBOOM.mossy.amount"],
				["rootUpgradeFactor", "fallenLeavesBOOM.marbled.amount"],
			],
			() => [
				storage.rootUpgradeFactor.fallenLeavesBOOM.fallen.amount,
				storage.rootUpgradeFactor.fallenLeavesBOOM.mossy.amount,
				storage.rootUpgradeFactor.fallenLeavesBOOM.marbled.amount,
			],
			() => [
				new Decimal(50000),
				new Decimal(5000),
				new Decimal(150),
			],
			new Decimal(60000)
		),
	};
});

export function calculateForge() {
	if (typeof storage.rootUpgradeFactor.fallenMilestones.marbled[2].achieved === "undefined") {
		return;
	}
	if (!storage.rootUpgradeFactor.fallenMilestones.marbled[2].achieved) {
		return;
	}
	for (const [key, value] of Object.entries(tempForgableItems)) {
		value.run();
	}
}
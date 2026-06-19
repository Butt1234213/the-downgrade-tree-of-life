import * as storage from './core/bunchobullshit.mjs';

const miningLocationText = {
	australia: '<span class="bold">Australia</span><br>Percentage of ores:<br>Copper: 45%<br>Jade: 25%<br>Enstatite: 20%<br>Gold: 5%<br>Thorium: 2%<br>Uranium: 2%<br>Plutonium: 0.5%<br>Black Opal: 0.5%',
	china: '<span class="bold">China</span><br>Percentage of ores:<br>Tin: 50%<br>Copper: 40%<br>Iron: 10%',
	russia: '<span class="bold">Russia</span><br>Percentage of ores:<br>Copper: 45%<br>Zinc: 30%<br>Gold: 10%<br>Silver: 10%<br>Platinum: 5%',
	us: '<span class="bold">US</span><br>Percentage of ores:<br>Coal: 80%<br>Iron: 20%',
	brazil: '<span class="bold">Brazil</span><br>Percentage of ores:<br>Coal: 50%<br>Tin: 30%<br>Iron: 15%<br>Rare Earth: 5%',
	drc: '<span class="bold">DRC</span><br>Percentage of ores:<br>Copper: 35%<br>Tin: 25%<br>Cobalt: 15%<br>Lithium: 10%<br>Emerald: 5%<br>Diamond: 5%<br>Titanium: 3%<br>Chromium: 2%',
	antarctica: '<span class="bold">Antarctica</span><br>Percentage of ores:<br>Iron: 50%<br>Copper: 30%<br>Nickel: 20%<br>Vultimanium: 1/1.79e308%',
};

export var miningLocation = null;

document.getElementById('australia').addEventListener('click', function() {
	miningLocation = 'australia';
	document.getElementById('australia').style.backgroundColor = '#12d90b';
	document.getElementById('china').style.backgroundColor = '#ff0000';
	document.getElementById('russia').style.backgroundColor = '#ff0000';
	document.getElementById('us').style.backgroundColor = '#ff0000';
	document.getElementById('brazil').style.backgroundColor = '#ff0000';
	document.getElementById('drc').style.backgroundColor = '#ff0000';
	document.getElementById('antarctica').style.backgroundColor = '#ff0000';
	document.getElementById('miningLocationInfo').innerHTML = miningLocationText.australia;
	document.getElementById('selectMiningLocation').style.display = 'block';
});

document.getElementById('china').addEventListener('click', function() {
	miningLocation = 'china';
	document.getElementById('australia').style.backgroundColor = '#ff0000';
	document.getElementById('china').style.backgroundColor = '#12d90b';
	document.getElementById('russia').style.backgroundColor = '#ff0000';
	document.getElementById('us').style.backgroundColor = '#ff0000';
	document.getElementById('brazil').style.backgroundColor = '#ff0000';
	document.getElementById('drc').style.backgroundColor = '#ff0000';
	document.getElementById('antarctica').style.backgroundColor = '#ff0000';
	document.getElementById('miningLocationInfo').innerHTML = miningLocationText.china;
	document.getElementById('selectMiningLocation').style.display = 'block';
});

document.getElementById('russia').addEventListener('click', function() {
	miningLocation = 'russia';
	document.getElementById('australia').style.backgroundColor = '#ff0000';
	document.getElementById('china').style.backgroundColor = '#ff0000';
	document.getElementById('russia').style.backgroundColor = '#12d90b';
	document.getElementById('us').style.backgroundColor = '#ff0000';
	document.getElementById('brazil').style.backgroundColor = '#ff0000';
	document.getElementById('drc').style.backgroundColor = '#ff0000';
	document.getElementById('antarctica').style.backgroundColor = '#ff0000';
	document.getElementById('miningLocationInfo').innerHTML = miningLocationText.russia;
	document.getElementById('selectMiningLocation').style.display = 'block';
});

document.getElementById('us').addEventListener('click', function() {
	miningLocation = 'us';
	document.getElementById('australia').style.backgroundColor = '#ff0000';
	document.getElementById('china').style.backgroundColor = '#ff0000';
	document.getElementById('russia').style.backgroundColor = '#ff0000';
	document.getElementById('us').style.backgroundColor = '#12d90b';
	document.getElementById('brazil').style.backgroundColor = '#ff0000';
	document.getElementById('drc').style.backgroundColor = '#ff0000';
	document.getElementById('antarctica').style.backgroundColor = '#ff0000';
	document.getElementById('miningLocationInfo').innerHTML = miningLocationText.us;
	document.getElementById('selectMiningLocation').style.display = 'block';
});

document.getElementById('brazil').addEventListener('click', function() {
	miningLocation = 'brazil';
	document.getElementById('australia').style.backgroundColor = '#ff0000';
	document.getElementById('china').style.backgroundColor = '#ff0000';
	document.getElementById('russia').style.backgroundColor = '#ff0000';
	document.getElementById('us').style.backgroundColor = '#ff0000';
	document.getElementById('brazil').style.backgroundColor = '#12d90b';
	document.getElementById('drc').style.backgroundColor = '#ff0000';
	document.getElementById('antarctica').style.backgroundColor = '#ff0000';
	document.getElementById('miningLocationInfo').innerHTML = miningLocationText.brazil;
	document.getElementById('selectMiningLocation').style.display = 'block';
});

document.getElementById('drc').addEventListener('click', function() {
	miningLocation = 'drc';
	document.getElementById('australia').style.backgroundColor = '#ff0000';
	document.getElementById('china').style.backgroundColor = '#ff0000';
	document.getElementById('russia').style.backgroundColor = '#ff0000';
	document.getElementById('us').style.backgroundColor = '#ff0000';
	document.getElementById('brazil').style.backgroundColor = '#ff0000';
	document.getElementById('drc').style.backgroundColor = '#12d90b';
	document.getElementById('antarctica').style.backgroundColor = '#ff0000';
	document.getElementById('miningLocationInfo').innerHTML = miningLocationText.drc;
	document.getElementById('selectMiningLocation').style.display = 'block';
});

document.getElementById('antarctica').addEventListener('click', function() {
	miningLocation = 'antarctica';
	document.getElementById('australia').style.backgroundColor = '#ff0000';
	document.getElementById('china').style.backgroundColor = '#ff0000';
	document.getElementById('russia').style.backgroundColor = '#ff0000';
	document.getElementById('us').style.backgroundColor = '#ff0000';
	document.getElementById('brazil').style.backgroundColor = '#ff0000';
	document.getElementById('drc').style.backgroundColor = '#ff0000';
	document.getElementById('antarctica').style.backgroundColor = '#12d90b';
	document.getElementById('miningLocationInfo').innerHTML = miningLocationText.antarctica;
	document.getElementById('selectMiningLocation').style.display = 'block';
});

function getRandomDecimal(max) {
	const base = new Decimal(Math.random());
	return base.times(max);
}
function avaliability(depth, fortune) {
	let depthMult;
	if (depth.lte(new Decimal(0))) {
		depthMult = new Decimal(1);
	}
	else {
		depthMult = storage.gameData.miningDepth.div(depth);
	}
	let fortuneMult;
	if (fortune.lte(new Decimal(0))) {
		fortuneMult = new Decimal(1);
	}
	else {
		fortuneMult = storage.gameData.miningFortune.div(fortune);
	}
	return depthMult.times(fortuneMult);
}

class oreLocation {
	constructor(stonePercentages, baseOrePercentages, oreRequirements) {
		this.stonePercentages = stonePercentages;
		this.baseOrePercentages = baseOrePercentages;
		this.oreRequirementsFN = oreRequirements;
	}
	
	get oreRequirements() {
		return this.oreRequirementsFN();
	}
	
	get orePercentages() {
		let dummyObj = {};
		let currentValue;
		let currentDifference = new Decimal(0);
		const keys = Object.keys(this.baseOrePercentages);
		for (let i = keys.length - 1; i > -1; i--) {
			currentValue = new Decimal(0);
			for (let j = keys.length - 1; j > i - 1; j--) {
				const chance = this.baseOrePercentages[keys[j]];
				const requirement = this.oreRequirements[keys[j]];
				const value = chance.times(requirement);
				currentValue = currentValue.plus(value);
			}
			const iChance = this.baseOrePercentages[keys[i]];
			if (currentValue.lt(iChance)) {
				const difference = iChance.minus(currentValue);
				currentDifference = currentDifference.plus(difference);
			}
			dummyObj[keys[i]] = currentValue;
		}
		//making sure all of the percentages add up to 100%
		if (currentDifference.lte(new Decimal(0))) {
			return dummyObj;
		}
		let nonZeroKeys = [];
		for (let i = 0; i < keys.length; i++) {
			if (dummyObj[keys[i]].gt(new Decimal(0))) {
				nonZeroKeys.push(keys[i]);
			}
		}
		for (let i = 0; i < nonZeroKeys.length; i++) {
			const divisor = new Decimal(nonZeroKeys.length);
			const value = currentDifference.div(divisor);
			dummyObj[keys[i]] = dummyObj[keys[i]].plus(value);
		}
		return dummyObj;
	}
	
	get ore() {
		let random = getRandomDecimal(new Decimal(100));
		let chosenStone;
		const stoneKeys = Object.keys(this.stonePercentages);
		for (let i = 0; i < stoneKeys.length; i++) {
			if (i === stoneKeys.length) {
				chosenStone = stoneKeys[i];
				break;
			}
			if (random.gte(this.stonePercentages[stoneKeys[i]]) && random.lt(this.stonePercentages[stoneKeys[i + 1]])) {
				chosenStone = stoneKeys[i];
				break;
			}
		}
		if (chosenStone === "ore") {
			let chosenOre;
			//if I didn't reinitialize it it would always be set like > 90 or something
			random = getRandomDecimal(new Decimal(100));
			const opToFixLag = this.orePercentages;
			const oreKeys = Object.keys(opToFixLag);
			for (let i = 0; i < oreKeys.length; i++) {
				if (i === oreKeys.length) {
					chosenOre = oreKeys[i];
					break;
				}
				if (random.lte(opToFixLag[oreKeys[i]]) && random.gte(opToFixLag[oreKeys[i + 1]])) {
					chosenOre = oreKeys[i];
					break;
				}
			}
			chosenStone = chosenOre;
		}
		random = getRandomDecimal(new Decimal(5)).trunc();
		return [chosenStone, random];
	}
}

const australiaOres = new oreLocation(
	{
		stone: new Decimal(0),
		cobblestone: new Decimal(50),
		andesite: new Decimal(70),
		basalt: new Decimal(85),
		ore: new Decimal(90),
		dummy: new Decimal(12931283930)
	},
	{
		copper: new Decimal(45),
		jade: new Decimal(25),
		enstatite: new Decimal(20),
		gold: new Decimal(5),
		thorium: new Decimal(2),
		uranium: new Decimal(2),
		plutonium: new Decimal(0.5),
		blackOpal: new Decimal(0.5)
	},
	() => ({
		copper: avaliability(new Decimal(0), new Decimal(0)),
		jade: avaliability(new Decimal(20), new Decimal(0)),
		enstatite: avaliability(new Decimal(50), new Decimal(5)),
		gold: avaliability(new Decimal(122), new Decimal(20)),
		thorium: avaliability(new Decimal(500), new Decimal(100)),
		uranium: avaliability(new Decimal(500), new Decimal(150)),
		plutonium: avaliability(new Decimal(2500), new Decimal(500)),
		blackOpal: avaliability(new Decimal(10000), new Decimal(2000))
	})
);

document.getElementById('selectMiningLocation').addEventListener('click', function() {
	console.log(australiaOres.ore);
});
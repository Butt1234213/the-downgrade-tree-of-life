import * as storage from './core/bunchobullshit.mjs'
import * as leafUpgrades from './leafupgrades.mjs'
import * as seedUpgrades from './seedupgrades.mjs'
import { circuits } from './automation.mjs'
import { saveLoop } from './savefile.mjs'

const achievementBase = {
    ach11: false,
    ach11AnimPlayed: false,
    ach12: false,
    ach12AnimPlayed: false,
    ach13: false,
    ach13AnimPlayed: false,
    ach14: false,
    ach14AnimPlayed: false,
    ach15: false,
    ach15AnimPlayed: false,
    ach21: false,
    ach21AnimPlayed: false,
    ach22: false,
    ach22AnimPlayed: false,
    ach23: false,
    ach23AnimPlayed: false,
    ach24: false,
    ach24AnimPlayed: false,
    ach25: false,
    ach25AnimPlayed: false,
    ach31: false,
    ach31AnimPlayed: false,
    ach32: false,
    ach32AnimPlayed: false,
    ach33: false,
    ach33AnimPlayed: false,
    ach34: false,
    ach34AnimPlayed: false,
    ach35: false,
    ach35AnimPlayed: false,
    ach41: false,
    ach41AnimPlayed: false,
    ach42: false,
    ach42AnimPlayed: false,
    ach43: false,
    ach43AnimPlayed: false,
    ach44: false,
    ach44AnimPlayed: false,
    ach45: false,
    ach45AnimPlayed: false,
    ach51: false,
    ach51AnimPlayed: false,
    ach52: false,
    ach52AnimPlayed: false,
    ach53: false,
    ach53AnimPlayed: false,
    ach54: false,
    ach54AnimPlayed: false,
    ach55: false,
    ach55AnimPlayed: false,
    ach61: false,
    ach61AnimPlayed: false,
    ach62: false,
    ach62AnimPlayed: false,
    ach63: false,
    ach63AnimPlayed: false,
    ach64: false,
    ach64AnimPlayed: false,
    ach65: false,
    ach65AnimPlayed: false,
    ach71: false,
    ach71AnimPlayed: false,
    ach72: false,
    ach72AnimPlayed: false,
    ach73: false,
    ach73AnimPlayed: false,
    ach74: false,
    ach74AnimPlayed: false,
    ach75: false,
    ach75AnimPlayed: false,
    ach81: false,
    ach81AnimPlayed: false,
    ach82: false,
    ach82AnimPlayed: false,
    ach83: false,
    ach83AnimPlayed: false,
    ach84: false,
    ach84AnimPlayed: false,
    ach85: false,
    ach85AnimPlayed: false,
    ach91: false,
    ach91AnimPlayed: false,
    ach92: false,
    ach92AnimPlayed: false,
    ach93: false,
    ach93AnimPlayed: false,
    ach94: false,
    ach94AnimPlayed: false,
    ach95: false,
    ach95AnimPlayed: false,
    ach101: false,
    ach101AnimPlayed: false,
    ach102: false,
    ach102AnimPlayed: false,
    ach103: false,
    ach103AnimPlayed: false,
    ach104: false,
    ach104AnimPlayed: false,
    ach105: false,
    ach105AnimPlayed: false,
    ach111: false,
    ach111AnimPlayed: false,
    ach112: false,
    ach112AnimPlayed: false,
    ach113: false,
    ach113AnimPlayed: false,
    ach114: false,
    ach114AnimPlayed: false,
    ach115: false,
    ach115AnimPlayed: false,
    ach121: false,
    ach121AnimPlayed: false,
    ach122: false,
    ach122AnimPlayed: false,
    ach123: false,
    ach123AnimPlayed: false,
    ach124: false,
    ach124AnimPlayed: false,
    ach125: false,
    ach125AnimPlayed: false,
    ach131: false,
    ach131AnimPlayed: false,
    ach132: false,
    ach132AnimPlayed: false,
    ach133: false,
    ach133AnimPlayed: false,
    ach134: false,
    ach134AnimPlayed: false,
    ach135: false,
    ach135AnimPlayed: false,
    ach141: false,
    ach141AnimPlayed: false,
    ach142: false,
    ach142AnimPlayed: false,
    ach143: false,
    ach143AnimPlayed: false,
    ach144: false,
    ach144AnimPlayed: false,
    ach145: false,
    ach145AnimPlayed: false,
    ach151: false,
    ach151AnimPlayed: false,
    ach152: false,
    ach152AnimPlayed: false,
    ach153: false,
    ach153AnimPlayed: false,
    ach154: false,
    ach154AnimPlayed: false,
    ach155: false,
    ach155AnimPlayed: false,
    ach161: false,
    ach161AnimPlayed: false,
    ach162: false,
    ach162AnimPlayed: false,
    ach163: false,
    ach163AnimPlayed: false,
}

const proxyHandler = {
	set(obj, prop, value) {
		const filter = /AnimPlayed/;
		if (!filter.test(prop)) {
			achievementChecker(achievements, prop);
		}
		return Reflect.set(obj, prop, value);
	}
}

export var achievements = new Proxy(achievementBase, proxyHandler);

export function updateAchievements(newAchievements, newSecretAchievements) {
	for (let key in newAchievements) {
		achievements[key] = newAchievements[key];
	}
    secretAchievements = newSecretAchievements;
    massSecretAchievementChecker();
}

export function achievementAnimation(achText) {
    var element = document.querySelector(achText)
    element.classList.add('show');
    setTimeout(() => {element.classList.remove('show');}, 3000);
}
export function animationTest() {
    var element = document.querySelector('.achievement-text-test')
    element.classList.add('show');
    setTimeout(() => {element.classList.remove('show');}, 3000); // In theory it should fade in and then fade out after 3 seconds
}
document.getElementById("animationTrigger").addEventListener("click", animationTest);

export function achievementChecker(achievements, achName) {
    const achAnimName = `${achName}AnimPlayed`;

    if (achievements[achName] === true) {
        document.querySelector(`.${achName}`).style.borderColor = 'green';
        document.querySelector(`.${achName}`).style.borderWidth = '5px';
        
        if (!achievements[achAnimName]) {
            achievementAnimation(`.${achName}-text`);
            // Update the property on the original object
            achievements[achAnimName] = true;
        }
    }
}

export function runAchievementChecks() {
	if (circuits.upgradeAutobuyer.gte(new Decimal(1))) {
		achievements.ach54 = true;
	}
	if (storage.gameData.leaves.gte(storage.gameData.leafSupercapStart)) {
		achievements.ach95 = true;
	}
	if (storage.gameData.leaves.gte(storage.gameData.leafMaximumStart)) {
		achievements.ach133 = true;
	}
	if (storage.gameData.leaves.gte(new Decimal.fromComponents(1, 1, 1500))) {
		achievements.ach84 = true;
	}
	if (storage.gameData.leaves.gte(new Decimal.fromComponents(1, 1, 10000))) {
		achievements.ach115 = true;
	}
	if (storage.gameData.leaves.gte(new Decimal.fromComponents(1, 1, 100000))) {
		achievements.ach135 = true;
	}
	if (storage.gameData.leaves.gte(new Decimal.fromComponents(1, 2, 8.55630))) {
		achievements.ach162 = true;
	}
	if (storage.gameData.seeds.gte(new Decimal.fromComponents(1, 1, 100000).times(storage.gameData.leaves))) {
		achievements.ach151 = true;
	}
	if (storage.entropyUpgradeFactor.B1Amount.gte(new Decimal(100))) {
		achievements.ach92 = true;
	}
	if (storage.gameData.leafSoftcapStart.gte(new Decimal.fromComponents(1, 1, 2000))) {
		achievements.ach93 = true;
	}
	if (storage.gameData.droughtLevel.gt(new Decimal(1))) {
		achievements.ach102 = true;
	}
	if (storage.gameData.blizzardLevel.gt(new Decimal(1))) {
		achievements.ach114 = true;
	}
	if (storage.gameData.fallLevel.gt(new Decimal(1))) {
		achievements.ach145 = true;
		document.querySelector('.buttons-fallen-leaves-tab-color').style.visibility = 'visible';
	}
	if (storage.gameData.highestCircuits.gte(new Decimal(1000))) {
		achievements.ach103 = true;
	}
	if (storage.gameData.highestCircuits.gte(new Decimal(1e6))) {
		achievements.ach143 = true;
	}
	if (storage.gameData.gameSpeed.gte(new Decimal(3.155e7))) {
		achievements.ach104 = true;
	}
	if (storage.gameData.bacteria.gte(new Decimal(1.79e308))) {
		achievements.ach122 = true;
	}
	if ((storage.entropyUpgradeFactor.B2Amount.gte(new Decimal(10))) && (storage.fruitUpgradeFactor.M2.gte(new Decimal(10))) && (storage.entropyUpgradeFactor.R3Amount.gte(new Decimal(10)))) {
		achievements.ach134 = true;
	}
	if (!achievements.ach132) {
		if (achievements.ach131) {
			if (Object.keys(storage.rootUpgradeFactor.microorganisms).length > 9) {
				achievements.ach132 = true;
			}
		}
	}
	else {
		achievements.ach132 = true;
	}
	if (!achievements.ach153) {
		if (achievements.ach145) {
			if (!(storage.rootUpgradeFactor.fallenLeavesBOOM.fallen.amount instanceof Decimal)) {
				//do nothing
			}
			else if (storage.rootUpgradeFactor.fallenLeavesBOOM.fallen.amount.gte(new Decimal(1))) {
				achievements.ach153 = true;
			}
		}
	}
	else {
		achievements.ach153 = true;
	}
	if (!achievements.ach154) {
		if (achievements.ach145) {
			if (!(storage.rootUpgradeFactor.fallenLeavesBOOM.mossy.amount instanceof Decimal)) {
				//do nothing
			}
			else if (storage.rootUpgradeFactor.fallenLeavesBOOM.mossy.amount.gte(new Decimal(1))) {
				achievements.ach154 = true;
			}
		}
	}
	else {
		achievements.ach154 = true;
	}
	if (!achievements.ach155) {
		if (achievements.ach145) {
			if (!(storage.rootUpgradeFactor.fallenLeavesBOOM.marbled.amount instanceof Decimal)) {
				//do nothing
			}
			else if (storage.rootUpgradeFactor.fallenLeavesBOOM.marbled.amount.gte(new Decimal(1))) {
				achievements.ach155 = true;
			}

		}
	}
	else {
		achievements.ach155 = true;
	}
	if (!achievements.ach161) {
		if (storage.rootUpgradeFactor.items.crudePickaxe.amount.gte(new Decimal(1))) {
			achievements.ach161 = true;
		}
	}
	else {
		achievements.ach161 = true;
	}
}

export var secretAchievements = {
    secret11: false,
    secret11AnimPlayed: false,
    secret12: false,
    secret12AnimPlayed: false,
    secret13: false,
    secret13AnimPlayed: false,
    secret14: false,
    secret14AnimPlayed: false,
    secret15: false,
    secret15AnimPlayed: false,
    secret21: false,
    secret21AnimPlayed: false,
}

export function secretAchievementChecker(achievements, achName, achText) {
    const achAnimName = `${achName}AnimPlayed`;

    if (achievements[achName] === true) {
        document.querySelector(`.${achName}`).style.borderColor = 'green';
        document.querySelector(`.${achName}`).style.borderWidth = '5px';
        document.getElementById(`${achName}`).src = `./src/images/secret_achievements/${achName}.png`;
        document.getElementById(`${achName}Text`).innerHTML = achText;
        
        if (!achievements[achAnimName]) {
            achievementAnimation(`.${achName}-text`);
            // Update the property on the original object
            achievements[achAnimName] = true;
        }
    }
}

export function massSecretAchievementChecker() {
    secretAchievementChecker(secretAchievements, 'secret11', 'Jumpscare (11)<br>Click on the homers');
    secretAchievementChecker(secretAchievements, 'secret12', 'Cheater Cheater, Peter Beater (12)<br>Type in a value for the cheat box');
    secretAchievementChecker(secretAchievements, 'secret13', `I don't think so (13)<br>Click on the standard notation button`);
    secretAchievementChecker(secretAchievements, 'secret14', `Meet the developer (14)<br>Click on the Roblox link`);
    secretAchievementChecker(secretAchievements, 'secret15', `You know what you did (15)<br>Make a .txt file with the text "I eat ass" and input it into the load save box`);
    secretAchievementChecker(secretAchievements, 'secret21', `Michael<br>Organism (21)<br>Michael Organism`);
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function secret11() {
    secretAchievements.secret11 = true;
    massSecretAchievementChecker();
}
document.getElementById('funny').addEventListener("click", secret11);

function crashTheWebpage() {
    var largeArray = [];
    while (true) {
        for (var i = 0; i < 10000000000000; i++) {
            largeArray.push(i);
        }
    }
}
function closeTheWebpage() {
    window.location.href = "about:blank";
}
function secret13() {
    secretAchievements.secret13 = true;
    massSecretAchievementChecker();
    saveLoop();
    document.querySelector('.jumpscare-video').style.display = 'block';
    document.getElementById('jumpscareVideo').play();
    document.getElementById('jumpscareVideo').addEventListener("ended", closeTheWebpage);
}
document.getElementById('jumpscareTrigger').addEventListener("click", secret13);
document.getElementById('crashTrigger').addEventListener("click", crashTheWebpage);

document.getElementById('secret14Button').addEventListener("click", function() {
	secretAchievements.secret14 = true;
	massSecretAchievementChecker();
	saveLoop();
	sleep(100);
	window.location.href = "https://www.roblox.com/users/126481537/profile?friendshipSourceType=PlayerSearch";
});
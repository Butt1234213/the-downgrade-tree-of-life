import * as storage from './core/bunchobullshit.mjs'
import * as leafUpgrades from './leafupgrades.mjs'
import * as seedUpgrades from './seedupgrades.mjs'
import { saveLoop } from './savefile.mjs'

export var achievements = {
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
}

export function updateAchievements(newAchievements, newSecretAchievements) {
    achievements = newAchievements;
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

export function massAchievementChecker() {
    achievementChecker(achievements, 'ach11');
    achievementChecker(achievements, 'ach12');
    achievementChecker(achievements, 'ach13');
    achievementChecker(achievements, 'ach14');
    achievementChecker(achievements, 'ach15');
    achievementChecker(achievements, 'ach21');
    achievementChecker(achievements, 'ach22');
    achievementChecker(achievements, 'ach23');
    achievementChecker(achievements, 'ach24');
    achievementChecker(achievements, 'ach25');
    achievementChecker(achievements, 'ach31');
    achievementChecker(achievements, 'ach32');
    achievementChecker(achievements, 'ach33');
    achievementChecker(achievements, 'ach34');
    achievementChecker(achievements, 'ach35');
    achievementChecker(achievements, 'ach41');
    achievementChecker(achievements, 'ach42');
    achievementChecker(achievements, 'ach43');
    achievementChecker(achievements, 'ach44');
    achievementChecker(achievements, 'ach45');
    achievementChecker(achievements, 'ach51');
    achievementChecker(achievements, 'ach52');
    achievementChecker(achievements, 'ach53');
    achievementChecker(achievements, 'ach54');
    achievementChecker(achievements, 'ach55');
    achievementChecker(achievements, 'ach61');
    achievementChecker(achievements, 'ach62');
    achievementChecker(achievements, 'ach63');
    achievementChecker(achievements, 'ach64');
    achievementChecker(achievements, 'ach65');
    achievementChecker(achievements, 'ach71');
    achievementChecker(achievements, 'ach72');
    achievementChecker(achievements, 'ach73');
    achievementChecker(achievements, 'ach74');
    achievementChecker(achievements, 'ach75');
    achievementChecker(achievements, 'ach81');
    achievementChecker(achievements, 'ach82');
    achievementChecker(achievements, 'ach83');
    achievementChecker(achievements, 'ach84');
    achievementChecker(achievements, 'ach85');
    achievementChecker(achievements, 'ach91');
    achievementChecker(achievements, 'ach92');
    achievementChecker(achievements, 'ach93');
    achievementChecker(achievements, 'ach94');
    achievementChecker(achievements, 'ach95');
    achievementChecker(achievements, 'ach101');
    achievementChecker(achievements, 'ach102');
    achievementChecker(achievements, 'ach103');
    achievementChecker(achievements, 'ach104');
    achievementChecker(achievements, 'ach105');
    achievementChecker(achievements, 'ach111');
    achievementChecker(achievements, 'ach112');
    achievementChecker(achievements, 'ach113');
    achievementChecker(achievements, 'ach114');
    achievementChecker(achievements, 'ach115');
    achievementChecker(achievements, 'ach121');
    achievementChecker(achievements, 'ach122');
    achievementChecker(achievements, 'ach123');
    achievementChecker(achievements, 'ach124');
    achievementChecker(achievements, 'ach125');
    achievementChecker(achievements, 'ach131');
    achievementChecker(achievements, 'ach132');
    achievementChecker(achievements, 'ach133');
    achievementChecker(achievements, 'ach134');
    achievementChecker(achievements, 'ach135');
    achievementChecker(achievements, 'ach141');
    achievementChecker(achievements, 'ach142');
    achievementChecker(achievements, 'ach143');
    achievementChecker(achievements, 'ach144');
    achievementChecker(achievements, 'ach145');
    achievementChecker(achievements, 'ach151');
    achievementChecker(achievements, 'ach152');
    achievementChecker(achievements, 'ach153');
    achievementChecker(achievements, 'ach154');
    achievementChecker(achievements, 'ach155');
    achievementChecker(achievements, 'ach161');
    achievementChecker(achievements, 'ach162');
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
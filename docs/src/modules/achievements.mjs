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
            console.log(achievements[achAnimName]);
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
}

export var secretAchievements = {
    secret11: false,
    secret11AnimPlayed: false,
    secret12: false,
    secret12AnimPlayed: false,
    secret13: false,
    secret13AnimPlayed: false,
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
            console.log(achievements[achAnimName]);
        }
    }
}

export function massSecretAchievementChecker() {
    secretAchievementChecker(secretAchievements, 'secret11', 'Jumpscare (11)<br>Click on the homers');
    secretAchievementChecker(secretAchievements, 'secret12', 'Cheater Cheater, Peter Beater (12)<br>Type in a value for the cheat box');
    secretAchievementChecker(secretAchievements, 'secret13', `I don't think so (13)<br>Click on the standard notation button`);
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
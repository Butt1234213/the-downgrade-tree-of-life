import * as storage from './bunchobullshit.mjs'
import * as leafUpgrades from './leafupgrades.mjs'
import * as seedUpgrades from './seedupgrades.mjs'

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
}
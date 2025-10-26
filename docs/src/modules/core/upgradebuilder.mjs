import * as storage from './bunchobullshit.mjs'
import * as leafUpgrades from '../leafupgrades.mjs'
import * as seedUpgrades from '../seedupgrades.mjs'
import * as fruitUpgrades from '../fruitupgrades.mjs'
import * as entropyUpgrades from '../entropyupgrades.mjs'
import { achievements, massAchievementChecker } from '../achievements.mjs';

export var decompolizationResetText = [];
export var harvestResetText = [];
export var transformResetText = [];

export var decompolizationResetFlags = [];
export var harvestResetFlags = [];
export var transformResetFlags = [];

var upgradeDefinitions = {
    leaf: {
        idPrefix: 'L',
        className: 'buttons-lu-color',
        divName: 'buttons-lu',
        caseSensitiveName: 'Leaves',
        object: storage.gameData.leaves,
        factor: storage.leafUpgradeFactor,
        upgradeCounter: storage.gameData.leafUpgradeCounter,
        resetOnLayer: [storage.upgradesResetByDecompolization],
        costObject: storage.leafUpgradeCost,
        costPrefix: 'LU',
        resourceCounterName: 'pleaseWork',
    },
    seed: {
        idPrefix: 'S',
        className: 'buttons-su-color',
        divName: 'buttons-su',
        caseSensitiveName: 'Seeds',
        object: storage.gameData.seeds,
        factor: storage.seedUpgradeFactor,
        upgradeCounter: storage.gameData.seedUpgradeCounter,
        resetOnLayer: [storage.upgradesResetByHarvest, storage.upgradesResetByTransform],
        costObject: storage.seedUpgradeCost,
        costPrefix: 'SU',
        resourceCounterName: 'seedCounter',
    },
    fruit: {
        idPrefix: 'F',
        className: 'buttons-fu-color',
        divName: 'buttons-fu',
        caseSensitiveName: 'Fruits',
        object: storage.gameData.fruits,
        factor: storage.fruitUpgradeFactor,
        upgradeCounter: storage.gameData.fruitUpgradeCounter,
        resetOnLayer: [storage.upgradesResetByTransform],
        costObject: storage.fruitUpgradeCost,
        costPrefix: 'FU',
        resourceCounterName: 'fruitCounter',
    },
    entropy: {
        idPrefix: 'E',
        className: 'buttons-eu-color',
        divName: 'buttons-eu',
        caseSensitiveName: 'Entropy',
        object: storage.gameData.entropy,
        factor: storage.entropyUpgradeFactor,
        upgradeCounter: storage.gameData.entropyUpgradeCounter,
        resetOnLayer: [],
        costObject: storage.entropyUpgradeCost,
        costPrefix: 'EU',
        resourceCounterName: 'entropyCounter',
    },
    root: {
        idPrefix: 'R',
        className: 'buttons-ru-color',
        divName: 'buttons-ru',
        caseSensitiveName: 'Roots',
        object: storage.gameData.roots,
        factor: storage.rootUpgradeFactor,
        upgradeCounter: storage.gameData.rootUpgradeCounter,
        resetOnLayer: [],
        costObject: storage.rootUpgradeCost,
        costPrefix: 'RU',
        resourceCounterName: 'rootCounter',
    },
    ash: {
        idPrefix: 'A',
        className: 'buttons-au-color',
        divName: 'buttons-au',
        caseSensitiveName: 'Ash',
        object: storage.gameData.ash,
        factor: storage.ashUpgradeFactor,
        upgradeCounter: storage.gameData.ashUpgradeCounter,
        resetOnLayer: [],
        costObject: storage.ashUpgradeCost,
        costPrefix: 'AU',
        resourceCounterName: 'ashCounter',
    },
    leafstone: {
        idPrefix: 'LS',
        className: 'buttons-lsu-color',
        divName: 'buttons-lsu',
        caseSensitiveName: 'Leaf Stones',
        object: storage.gameData.leafstones,
        factor: storage.leafstoneUpgradeFactor,
        upgradeCounter: storage.gameData.leafstoneUpgradeCounter,
        resetOnLayer: [],
        costObject: storage.leafstoneUpgradeCost,
        costPrefix: 'LSU',
        resourceCounterName: 'leafstoneCounter',
    },
}


function createUpgradeButton(type, number, textContent, cost) {
    const config = upgradeDefinitions[type];
    
    if (!config) {
        console.error(`createUpgradeButton() failed, unknown upgrade type: ${type}`);
        return;
    }

    const newButton = document.createElement('button');
    newButton.setAttribute('id', `${config.idPrefix}${number}`);
    newButton.setAttribute('class', config.className);

    const textNode = document.createTextNode(`test`);
    newButton.appendChild(textNode);

    newButton.innerHTML = `${config.idPrefix}${number}<br>${textContent}<br>Cost: ${cost} ${config.caseSensitiveName}`;

    switch (type) {
        case 'leaf': {
            decompolizationResetText[`${number - 1}`] = `${config.idPrefix}${number}<br>${textContent}<br>Cost: ${cost} ${config.caseSensitiveName}`;
            harvestResetText[`${number - 1}`] = `${config.idPrefix}${number}<br>${textContent}<br>Cost: ${cost} ${config.caseSensitiveName}`;
            transformResetText[`${number - 1}`] = `${config.idPrefix}${number}<br>${textContent}<br>Cost: ${cost} ${config.caseSensitiveName}`;

            decompolizationResetFlags[`${number - 1}`] = `${config.idPrefix}${number}Bought`;
            harvestResetFlags[`${number - 1}`] = `${config.idPrefix}${number}Bought`;
            transformResetFlags[`${number - 1}`] = `${config.idPrefix}${number}Bought`;
            break;
        }
        case 'seed': {
            harvestResetText[`${number + (decompolizationResetText.length - 1)}`] = `${config.idPrefix}${number}<br>${textContent}<br>Cost: ${cost} ${config.caseSensitiveName}`;
            transformResetText[`${number + (decompolizationResetText.length - 1)}`] = `${config.idPrefix}${number}<br>${textContent}<br>Cost: ${cost} ${config.caseSensitiveName}`;
            
            harvestResetFlags[`${number + (decompolizationResetFlags.length - 1)}`] = `${config.idPrefix}${number}Bought`;
            transformResetFlags[`${number + (decompolizationResetFlags.length - 1)}`] = `${config.idPrefix}${number}Bought`;
            break;
        }
        case 'fruit': {
            transformResetText[`${number + (harvestResetText.length - 1)}`] = `${config.idPrefix}${number}<br>${textContent}<br>Cost: ${cost} ${config.caseSensitiveName}`;

            transformResetFlags[`${number + (harvestResetFlags.length - 1)}`] = `${config.idPrefix}${number}Bought`;
            break;
        }
    }

    document.getElementById(config.divName).appendChild(newButton);

    return newButton;
}


const buttonFactories = {
    leaf: (number, textContent, cost) => createUpgradeButton('leaf', number, textContent, cost),
    seed: (number, textContent, cost) => createUpgradeButton('seed', number, textContent, cost),
    fruit: (number, textContent, cost) => createUpgradeButton('fruit', number, textContent, cost),
    entropy: (number, textContent, cost) => createUpgradeButton('entropy', number, textContent, cost),
    root: (number, textContent, cost) => createUpgradeButton('root', number, textContent, cost),
    ash: (number, textContent, cost) => createUpgradeButton('ash', number, textContent, cost),
    leafstone: (number, textContent, cost) => createUpgradeButton('leafstone', number, textContent, cost),
};


function createUpgradeProperties(type, number, cost) {
    const config = upgradeDefinitions[type];
    
    if (!config) {
        console.error(`createUpgradeProperties() failed, unknown upgrade type: ${type}`);
        return;
    }

    // should set upgrade.isBought to false
    if (typeof config.factor === 'undefined') {
        config.factor = {};
    }

    if (type === 'leaf') {storage.leafUpgradeFactor[`${config.idPrefix}${number}Bought`] = false;}
    if (type === 'seed') {storage.seedUpgradeFactor[`${config.idPrefix}${number}Bought`] = false;}
    if (type === 'fruit') {storage.fruitUpgradeFactor[`${config.idPrefix}${number}Bought`] = false;}

    const buttonElement = document.getElementById(`${config.idPrefix}${number}`);

    if (type === 'leaf') {
        storage.upgradesResetByDecompolization.push(buttonElement);
        storage.upgradesResetByHarvest.push(buttonElement);
        storage.upgradesResetByTransform.push(buttonElement);
    } else if (type === 'seed') {
        storage.upgradesResetByHarvest.push(buttonElement);
        storage.upgradesResetByTransform.push(buttonElement);
    } else if (type === 'fruit') {
        storage.upgradesResetByTransform.push(buttonElement);
    }
    

    // same thing as the UpgradeFactor line
    if (typeof config.costObject === 'undefined') {
        config.costObject = {};
    }

    config.costObject[`${config.costPrefix}${number}`] = new Decimal(cost);
}


const propertyFactories = {
    leaf: (number, cost) => createUpgradeProperties('leaf', number, cost),
    seed: (number, cost) => createUpgradeProperties('seed', number, cost),
    fruit: (number, cost) => createUpgradeProperties('fruit', number, cost),
    entropy: (number, cost) => createUpgradeProperties('entropy', number, cost),
    root: (number, cost) => createUpgradeProperties('root', number, cost),
    ash: (number, cost) => createUpgradeProperties('ash', number, cost),
    leafstone: (number, cost) => createUpgradeProperties('leafstone', number, cost),
};

function buttonBuilder(type, number, textContent, cost) {
    const button = buttonFactories[type];
    const properties = propertyFactories[type];

    if (button && properties) {
        button(number, textContent, cost);
        properties(number, cost);
    } else {
        console.error(`upgradeBuilder() failed, unknown upgrade type: ${type}`);
    }
}

function numberChecker(type) {
    switch (type) {
        case 'leaf': {
            return storage.gameData.leaves;
        }
        case 'seed': {
            return storage.gameData.seeds;
        }
        case 'fruit': {
            return storage.gameData.fruits;
        }
    }
}

export function createCallableUpgrade(type, number, cost, isUnlock, unlockFunction) {
    const config = upgradeDefinitions[type];

    const object = numberChecker(type);

    if (object.greaterThanOrEqualTo(cost)) {
        if (!config.factor[`${config.idPrefix}${number}Bought`]) {
            if (type === 'leaf') {storage.gameData.leaves = storage.gameData.leaves.minus(cost.trunc())}
            if (type === 'seed') {storage.gameData.seeds = storage.gameData.seeds.minus(cost.trunc())}
            if (type === 'fruit') {storage.gameData.fruits = storage.gameData.fruits.minus(cost.trunc())}

            document.getElementById(config.resourceCounterName).innerHTML = `${storage.truncateToDecimalPlaces(object, 3)} ${config.caseSensitiveName}`;
            document.getElementById(`${config.idPrefix}${number}`).disabled = true;
            document.getElementById(`${config.idPrefix}${number}`).style.color = '#000000';
            document.getElementById(`${config.idPrefix}${number}`).style.borderColor = '#000000';

            if (type === 'leaf') {storage.leafUpgradeFactor[`${config.idPrefix}${number}Bought`] = true;}
            if (type === 'seed') {storage.seedUpgradeFactor[`${config.idPrefix}${number}Bought`] = true;}
            if (type === 'fruit') {storage.fruitUpgradeFactor[`${config.idPrefix}${number}Bought`] = true;}

            if (isUnlock) {
                unlockFunction;
            }
        }
        else {
            document.getElementById(`${config.idPrefix}${number}`).disabled = true;
            document.getElementById(`${config.idPrefix}${number}`).style.color = '#000000';
            document.getElementById(`${config.idPrefix}${number}`).style.borderColor = '#000000';
            
            if (isUnlock) {
                unlockFunction;
            }
        }
    }
}

export function upgradeBuilder(type, number, textContent, cost, onClick) {
    const config = upgradeDefinitions[type];

    buttonBuilder(type, number, textContent, cost);
    document.getElementById(`${config.idPrefix}${number}`).addEventListener("click", onClick);
}

document.addEventListener('DOMContentLoaded', () => {
    upgradeBuilder('leaf', 1, 'Start generating Leaves', '0', leafUpgrades.L1);
    upgradeBuilder('leaf', 2, 'Grow I<br>x2 Leaves', '10', leafUpgrades.L2);
    upgradeBuilder('leaf', 3, 'Grow II<br>x3 Leaves', '35', leafUpgrades.L3);
    upgradeBuilder('leaf', 4, 'Develop I<br>Tree Age boosts Leaves', '150', leafUpgrades.L4);
    upgradeBuilder('leaf', 5, 'Grow III<br>x2.5 Leaves', '500', leafUpgrades.L5);
    upgradeBuilder('leaf', 6, 'Grow IV<br>x3 Leaves', '1500', leafUpgrades.L6);
    upgradeBuilder('leaf', 7, 'Grow V<br>xπ Leaves for no reason', '5000', leafUpgrades.L7);
    upgradeBuilder('leaf', 8, 'Grow VI<br>x1.75 Leaves', '7500', leafUpgrades.L8);
    upgradeBuilder('leaf', 9, 'Develop II<br>Tree Age boosts Leaves (again)', '24000', leafUpgrades.L9);
    upgradeBuilder('leaf', 10, 'Grow Power<br>Every LU Bought<br>Multiplies Leaves by 1.1', '200000', leafUpgrades.L10);
    upgradeBuilder('leaf', 11, 'Self-Synergy<br>Leaves boost their own production', '650000', leafUpgrades.L11);
    upgradeBuilder('leaf', 12, 'Grow VII<br>x5 Leaves', '2.25e7', leafUpgrades.L12);
    upgradeBuilder('leaf', 13, 'Grow VIII<br>x4 Leaves', '1.75e8', leafUpgrades.L13);
    upgradeBuilder('leaf', 14, 'Grow IX<br>x5 Leaves', '6e10', leafUpgrades.L14);
    upgradeBuilder('leaf', 15, `Booster<br>L11's effect is squared`, '1e9', leafUpgrades.L15);
    upgradeBuilder('leaf', 16, 'Develop III<br>Tree Age boosts Leaves (again)', '4.5e12', leafUpgrades.L16);
    upgradeBuilder('leaf', 17, 'Bigger Leaves<br>Leaves boost Seeds (again)', '1e15', leafUpgrades.L17);
    upgradeBuilder('leaf', 18, 'More Seeds I<br>x3 Seeds', '7.5e15', leafUpgrades.L18);
    upgradeBuilder('leaf', 19, 'More Seeds II<br>x3 Seeds', '5e17', leafUpgrades.L19);
    upgradeBuilder('leaf', 20, 'Exponentially Branching<br>Leaves exponentially<br>boost themselves', '1e23', leafUpgrades.L20);
    upgradeBuilder('leaf', 21, 'Grow X<br>x2 Leaves and Seeds', '1e33', leafUpgrades.L21);
    upgradeBuilder('leaf', 22, 'Heat I<br>x2 Composting speed', '2.5e36', leafUpgrades.L22);
    upgradeBuilder('leaf', 23, 'Super Grow I<br>x3 Leaves, x2 Seeds, x1.5 Fruits', '1e39', leafUpgrades.L23);
    upgradeBuilder('leaf', 24, 'Composting Techniques I<br>Leaves boost Composting speed', '5e43', leafUpgrades.L24);
    upgradeBuilder('leaf', 25, 'Filtered Water II<br>x2 Tree Aging speed', '5e45', leafUpgrades.L25);
    upgradeBuilder('leaf', 26, 'Filtered Water III<br>x10 Tree Aging speed', '3.5e51', leafUpgrades.L26);
    upgradeBuilder('leaf', 27, 'More Seeds III<br>x3 Seeds', '1e57', leafUpgrades.L27);
    upgradeBuilder('leaf', 28, 'Develop Life<br>x50 Leaves, x15 Seeds, x5 Fruits,<br>and start generating Potential Energy', '5e64', leafUpgrades.L28);

    upgradeBuilder('seed', 1, 'Branch I<br>x6 Leaves', '1', seedUpgrades.S1);
    upgradeBuilder('seed', 2, 'Branch II<br>x3 Leaves', '3', seedUpgrades.S2);
    upgradeBuilder('seed', 3, 'Soil Enrichment I<br>Tree Age boosts Leaves', '5', seedUpgrades.S3);
    upgradeBuilder('seed', 4, 'Nutritious Leaves<br>Seeds multiply Leaves', '35', seedUpgrades.S4);
    upgradeBuilder('seed', 5, 'Branch III<br>x10 Leaves', '175', seedUpgrades.S5);
    upgradeBuilder('seed', 6, 'Decompolize Method I<br>x3 Seeds', '2500', seedUpgrades.S6);
    upgradeBuilder('seed', 7, 'Branch IV<br>x3 Leaves', '20000', seedUpgrades.S7);
    upgradeBuilder('seed', 8, 'Seeds-energy<br>Seeds boost themselves', '150000', seedUpgrades.S8);
    upgradeBuilder('seed', 9, 'Decompolize Method II<br>x3 Seeds', '4e6', seedUpgrades.S9);
    upgradeBuilder('seed', 10, 'Anti-Cap II<br>Seeds push back Leaves Softcap', '1e9', seedUpgrades.S10);
    upgradeBuilder('seed', 11, 'Fruits in Seeds I<br>x2 Fruits', '1e8', seedUpgrades.S11);
    upgradeBuilder('seed', 12, 'Branch V<br>x2 Leaves', '5e8', seedUpgrades.S12);
    upgradeBuilder('seed', 13, 'Branch VI<br>x5 Leaves', '5e9', seedUpgrades.S13);
    upgradeBuilder('seed', 14, 'Branch VII<br>x3 Leaves', '1e12', seedUpgrades.S14);
    upgradeBuilder('seed', 15, 'Branch VIII<br>x2 Leaves', '1e13', seedUpgrades.S15);
    upgradeBuilder('seed', 16, 'Branch IX<br>x4 Leaves', '1e14', seedUpgrades.S16);
    upgradeBuilder('seed', 17, 'Fruits in Seeds II<br>x1.5 Fruits', '1e15', seedUpgrades.S17);
    upgradeBuilder('seed', 18, 'Heat II<br>x1.75 Composting speed', '1.5e17', seedUpgrades.S18);
    upgradeBuilder('seed', 19, 'Soil Enrichment II<br>x2.5 Tree Aging speed', '1e19', seedUpgrades.S19);
    upgradeBuilder('seed', 20, 'Transport Power<br>Leaves boost Fruits', '5e28', seedUpgrades.S20);
    upgradeBuilder('seed', 21, 'Vines I<br>x2 Leaves, Seeds, Fruits', '1e30', seedUpgrades.S21);
    upgradeBuilder('seed', 22, 'Fruits in Seeds III<br>x1.75 Fruits', '5e31', seedUpgrades.S22);

    upgradeBuilder('fruit', 1, 'The Composter I<br>Unlock the Composter', '1', fruitUpgrades.F1);
    upgradeBuilder('fruit', 2, 'The Composter II<br>Unlock the second Composter', '4', fruitUpgrades.F2);
    upgradeBuilder('fruit', 3, 'Anti-cap I<br>Fruits push back Leaves Softcap', '9', fruitUpgrades.F3);
    upgradeBuilder('fruit', 4, 'Bloom I<br>x5 Leaves', '10', fruitUpgrades.F4);
    upgradeBuilder('fruit', 5, 'Photosynthesis<br>Leaves give a boost<br>to Tree Aging speed', '10', fruitUpgrades.F5);
    upgradeBuilder('fruit', 6, 'Bloom II<br>x2.5 Seeds', '15', fruitUpgrades.F6);
    upgradeBuilder('fruit', 7, 'The Composter III<br>Unlock the third Composter', '150', fruitUpgrades.F7);
    upgradeBuilder('fruit', 8, 'More Fruits<br>x2 Fruits', '250', fruitUpgrades.F8);
    upgradeBuilder('fruit', 9, 'Bloom III<br>x2 Tree Aging speed', '400', fruitUpgrades.F9);
    upgradeBuilder('fruit', 10, 'Fast Decomposition<br>x4 Composting speed', '1000', fruitUpgrades.F10);
    upgradeBuilder('fruit', 11, 'Rich Nutrients<br>x3 Seeds', '1500', fruitUpgrades.F11);
    upgradeBuilder('fruit', 12, 'Basket<br>x1.5 Fruits', '2000', fruitUpgrades.F12);
    upgradeBuilder('fruit', 13, 'Dirt Nutrients<br>x3 Tree Aging speed', '7000', fruitUpgrades.F13);
    upgradeBuilder('fruit', 14, 'Heat III<br>x2.5 Composting speed', '25000', fruitUpgrades.F14);
    upgradeBuilder('fruit', 15, 'Filtered Water I<br>x3 Tree Aging speed', '75000', fruitUpgrades.F15);
    upgradeBuilder('fruit', 16, 'Net<br>x3 Fruits', '100000', fruitUpgrades.F16);
    upgradeBuilder('fruit', 17, 'Chaotic Energy<br>Unlock Entropy', '700000', fruitUpgrades.F17);
    upgradeBuilder('fruit', 18, 'Gloves<br>x1.5 Fruits', '1e8', fruitUpgrades.F18);
    upgradeBuilder('fruit', 19, 'Life in Upgrades<br>Unlock Moss', '2.5e8', fruitUpgrades.F19);
    upgradeBuilder('fruit', 20, `Fruits are Finally Useful<br>Fruits boost S8's effect`, '1e13', fruitUpgrades.F20);
    upgradeBuilder('fruit', 21, 'Wood Circuit<br>Base Fruits Mult ^ 1.25', '7.5e15', fruitUpgrades.F21);
    upgradeBuilder('fruit', 22, 'Composting Techniques II<br>x20 Composting speed', '5e16', fruitUpgrades.F22);

    upgradeBuilder('entropy', 1, 'Cellular Lab<br>Unlock the Cellular Lab', '1', entropyUpgrades.E1);
    upgradeBuilder('entropy', 2, 'Split of Decisions<br>Base Leaf Multiplier is ^ 1.5', '1', entropyUpgrades.E2);
    upgradeBuilder('entropy', 3, 'Split of Decisions<br>Achievements boost Seeds', '1', entropyUpgrades.E3);
    upgradeBuilder('entropy', 4, 'Split of Decisions<br>Fruits boost themselves', '1', entropyUpgrades.E4);
    upgradeBuilder('entropy', 5, 'Composting Experiences<br>Keep all Composters<br>on Transform', '2', entropyUpgrades.E5);
    upgradeBuilder('entropy', 6, 'Composting Power<br>Fertilizers boost Composting speed', '3', entropyUpgrades.E6);
    upgradeBuilder('entropy', 7, `Size Expansion<br>L17's effect is boosted by Entropy`, '5', entropyUpgrades.E7);
    upgradeBuilder('entropy', 8, `FINALLY<br>Keep Leaf and Seed Fertilizers<br>on Transform`, '8', entropyUpgrades.E8);
});

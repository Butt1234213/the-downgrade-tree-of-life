import * as storage from './bunchobullshit.mjs'
import * as leafUpgrades from '../leafupgrades.mjs'
import * as seedUpgrades from '../seedupgrades.mjs'
import * as fruitUpgrades from '../fruitupgrades.mjs'
import * as entropyUpgrades from '../entropyupgrades.mjs'
import * as rootUpgrades from '../rootupgrades.mjs'
import { circuits } from '../automation.mjs'
import { achievements, massAchievementChecker } from '../achievements.mjs';

export var decompolizationResetText = [];
export var harvestResetText = [];
export var transformResetText = [];
export var reinforceResetText = [];

export var decompolizationResetFlags = [];
export var harvestResetFlags = [];
export var transformResetFlags = [];
export var reinforceResetFlags = [];

var upgradeDefinitions = {}

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
            reinforceResetText[`${number - 1}`] = `${config.idPrefix}${number}<br>${textContent}<br>Cost: ${cost} ${config.caseSensitiveName}`;

            decompolizationResetFlags[`${number - 1}`] = `${config.idPrefix}${number}Bought`;
            harvestResetFlags[`${number - 1}`] = `${config.idPrefix}${number}Bought`;
            transformResetFlags[`${number - 1}`] = `${config.idPrefix}${number}Bought`;
            reinforceResetFlags[`${number - 1}`] = `${config.idPrefix}${number}Bought`;
            break;
        }
        case 'seed': {
            harvestResetText[`${number + (decompolizationResetText.length - 1)}`] = `${config.idPrefix}${number}<br>${textContent}<br>Cost: ${cost} ${config.caseSensitiveName}`;
            transformResetText[`${number + (decompolizationResetText.length - 1)}`] = `${config.idPrefix}${number}<br>${textContent}<br>Cost: ${cost} ${config.caseSensitiveName}`;
            reinforceResetText[`${number + (decompolizationResetText.length - 1)}`] = `${config.idPrefix}${number}<br>${textContent}<br>Cost: ${cost} ${config.caseSensitiveName}`;
            
            harvestResetFlags[`${number + (decompolizationResetFlags.length - 1)}`] = `${config.idPrefix}${number}Bought`;
            transformResetFlags[`${number + (decompolizationResetFlags.length - 1)}`] = `${config.idPrefix}${number}Bought`;
            reinforceResetFlags[`${number + (decompolizationResetFlags.length - 1)}`] = `${config.idPrefix}${number}Bought`;
            break;
        }
        case 'fruit': {
            transformResetText[`${number + (harvestResetText.length - 1)}`] = `${config.idPrefix}${number}<br>${textContent}<br>Cost: ${cost} ${config.caseSensitiveName}`;
            reinforceResetText[`${number + (harvestResetText.length - 1)}`] = `${config.idPrefix}${number}<br>${textContent}<br>Cost: ${cost} ${config.caseSensitiveName}`;

            transformResetFlags[`${number + (harvestResetFlags.length - 1)}`] = `${config.idPrefix}${number}Bought`;
            reinforceResetFlags[`${number + (harvestResetFlags.length - 1)}`] = `${config.idPrefix}${number}Bought`;
            break;
        }
		case 'entropy': {
            reinforceResetText[`${number + (transformResetText.length - 1)}`] = `${config.idPrefix}${number}<br>${textContent}<br>Cost: ${cost} ${config.caseSensitiveName}`;
		
            reinforceResetFlags[`${number + (transformResetFlags.length - 1)}`] = `${config.idPrefix}${number}Bought`;
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


function createUpgradeProperties(type, number, cost, flopReq) {
    const config = upgradeDefinitions[type];
    
    if (!config) {
        console.error(`createUpgradeProperties() failed, unknown upgrade type: ${type}`);
        return;
    }

    // should set upgrade.isBought to false
    if (typeof config.factor === 'undefined') {
        config.factor = {};
    }

    if (type === 'leaf') {
        storage.leafUpgradeFactor[`${config.idPrefix}${number}Bought`] = false;
        storage.leafAutomationFactor[`${config.idPrefix}${number}`] = flopReq;
    }
    if (type === 'seed') {
        storage.seedUpgradeFactor[`${config.idPrefix}${number}Bought`] = false;
        storage.seedAutomationFactor[`${config.idPrefix}${number}`] = flopReq;
    }
    if (type === 'fruit') {
        storage.fruitUpgradeFactor[`${config.idPrefix}${number}Bought`] = false;
        storage.fruitAutomationFactor[`${config.idPrefix}${number}`] = flopReq;
    }
    if (type === 'entropy') {
        storage.entropyUpgradeFactor[`${config.idPrefix}${number}Bought`] = false;
        storage.entropyAutomationFactor[`${config.idPrefix}${number}`] = flopReq;
    }
    if (type === 'root') {
        storage.rootUpgradeFactor[`${config.idPrefix}${number}Bought`] = false;
        storage.rootAutomationFactor[`${config.idPrefix}${number}`] = flopReq;
    }


    const buttonElement = document.getElementById(`${config.idPrefix}${number}`);

    if (type === 'leaf') {
        storage.upgradesResetByDecompolization.push(buttonElement);
        storage.upgradesResetByHarvest.push(buttonElement);
        storage.upgradesResetByTransform.push(buttonElement);
        storage.upgradesResetByReinforce.push(buttonElement);
    } else if (type === 'seed') {
        storage.upgradesResetByHarvest.push(buttonElement);
        storage.upgradesResetByTransform.push(buttonElement);
        storage.upgradesResetByReinforce.push(buttonElement);
    } else if (type === 'fruit') {
        storage.upgradesResetByTransform.push(buttonElement);
        storage.upgradesResetByReinforce.push(buttonElement);
    } else if (type === 'entropy') {
        storage.upgradesResetByReinforce.push(buttonElement);
    }
    

    // same thing as the UpgradeFactor line
    if (typeof config.costObject === 'undefined') {
        config.costObject = {};
    }

    config.costObject[`${config.costPrefix}${number}`] = new Decimal(cost);
}


const propertyFactories = {
    leaf: (number, cost, flopReq) => createUpgradeProperties('leaf', number, cost, flopReq),
    seed: (number, cost, flopReq) => createUpgradeProperties('seed', number, cost, flopReq),
    fruit: (number, cost, flopReq) => createUpgradeProperties('fruit', number, cost, flopReq),
    entropy: (number, cost, flopReq) => createUpgradeProperties('entropy', number, cost, flopReq),
    root: (number, cost) => createUpgradeProperties('root', number, cost),
    ash: (number, cost) => createUpgradeProperties('ash', number, cost),
    leafstone: (number, cost) => createUpgradeProperties('leafstone', number, cost),
};

function buttonBuilder(type, number, textContent, cost, flopReq) {
    const button = buttonFactories[type];
    const properties = propertyFactories[type];

    if (button && properties) {
        button(number, textContent, cost);
        properties(number, cost, flopReq);
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
        case 'entropy': {
            return storage.gameData.entropy;
        }
        case 'root': {
            return storage.gameData.roots;
        }
    }
}

function factorChecker(type, number) {
    const config = upgradeDefinitions[type];

    switch (type) {
        case 'leaf': {
            return storage.leafUpgradeFactor[`${config.idPrefix}${number}Bought`];
        }
        case 'seed': {
            return storage.seedUpgradeFactor[`${config.idPrefix}${number}Bought`];
        }
        case 'fruit': {
            return storage.fruitUpgradeFactor[`${config.idPrefix}${number}Bought`];
        }
        case 'entropy': {
            return storage.entropyUpgradeFactor[`${config.idPrefix}${number}Bought`];
        }
        case 'root': {
            return storage.rootUpgradeFactor[`${config.idPrefix}${number}Bought`];
        }
    }
}
function automationChecker(type, number) {
    const config = upgradeDefinitions[type];

    switch (type) {
        case 'leaf': {
            return storage.leafAutomationFactor[`${config.idPrefix}${number}`];
        }
        case 'seed': {
            return storage.seedAutomationFactor[`${config.idPrefix}${number}`];
        }
        case 'fruit': {
            return storage.fruitAutomationFactor[`${config.idPrefix}${number}`];
        }
        case 'entropy': {
            return storage.entropyAutomationFactor[`${config.idPrefix}${number}`];
        }
        case 'root': {
            return storage.rootAutomationFactor[`${config.idPrefix}${number}`];
        }
    }
}
function automationTypeChecker(type) {
    switch (type) {
        case 'leaf': {
            return storage.gameData.luAutomationUnlocked;
        }
        case 'seed': {
            return storage.gameData.suAutomationUnlocked;
        }
        case 'fruit': {
            return storage.gameData.fuAutomationUnlocked;
        }
        case 'entropy': {
            return storage.gameData.euAutomationUnlocked;
        }
        case 'root': {
            return storage.gameData.rouAutomationUnlocked;
        }
    }
}

function isAutomatable(type, number, cost) {
    const object = numberChecker(type);
    
    if ((automationTypeChecker(type)) && (circuits.upgradeAutobuyerFLOPS.greaterThanOrEqualTo(automationChecker(type, number))) && (object.greaterThanOrEqualTo(cost))) {
        return true;
    }
    else {
        return false;
    }
}

export function createCallableUpgrade(type, number, cost, isUnlock, unlockFunction) {
    const config = upgradeDefinitions[type];
    const upgradeBoughtFlag = factorChecker(type, number);
    const upgradeID = document.getElementById(`${config.idPrefix}${number}`);

    var object = numberChecker(type);

    console.log(`${config.idPrefix}${number}Bought is ${upgradeBoughtFlag}`)
    console.log(`The upgrade's buyability is ` + object.greaterThanOrEqualTo(cost));

    if (upgradeBoughtFlag || (isAutomatable(type, number, cost))) {
        upgradeID.disabled = true;
        upgradeID.style.color = '#000000';
        upgradeID.style.borderColor = '#000000';
        
        if (isUnlock) {
            unlockFunction;
        }
    }
    else {
        if (object.greaterThanOrEqualTo(cost)) {
            if (type === 'leaf') {storage.gameData.leaves = storage.gameData.leaves.minus(cost.trunc()); object = storage.gameData.leaves;}
            if (type === 'seed') {storage.gameData.seeds = storage.gameData.seeds.minus(cost.trunc()); object = storage.gameData.seeds;}
            if (type === 'fruit') {storage.gameData.fruits = storage.gameData.fruits.minus(cost.trunc()); object = storage.gameData.fruits;}
            if (type === 'entropy') {storage.gameData.entropy = storage.gameData.entropy.minus(cost.trunc()); object = storage.gameData.entropy;}
            if (type === 'root') {storage.gameData.roots = storage.gameData.roots.minus(cost); object = storage.gameData.roots;}

            document.getElementById(config.resourceCounterName).innerHTML = `${storage.truncateToDecimalPlaces(object, 3)} ${config.caseSensitiveName}`;
            upgradeID.disabled = true;
            upgradeID.style.color = '#000000';
            upgradeID.style.borderColor = '#000000';

            if (type === 'leaf') {storage.leafUpgradeFactor[`${config.idPrefix}${number}Bought`] = true;}
            if (type === 'seed') {storage.seedUpgradeFactor[`${config.idPrefix}${number}Bought`] = true;}
            if (type === 'fruit') {storage.fruitUpgradeFactor[`${config.idPrefix}${number}Bought`] = true;}
            if (type === 'entropy') {storage.entropyUpgradeFactor[`${config.idPrefix}${number}Bought`] = true;}
            if (type === 'root') {storage.rootUpgradeFactor[`${config.idPrefix}${number}Bought`] = true;}

            if (isUnlock) {
                unlockFunction;
            }
        }
    }
    console.log(storage.gameData.leavesPerTick.isNan());
    if (storage.gameData.leavesPerTick.isNan()) {
        console.error(`${config.idPrefix}${number} broke`)
    }
}
export function upgradeBuilder(type, number, textContent, cost, flopReq, onClick) {
    const config = upgradeDefinitions[type];

    buttonBuilder(type, number, textContent, cost, flopReq);
    document.getElementById(`${config.idPrefix}${number}`).addEventListener("click", onClick);
}

document.addEventListener('DOMContentLoaded', () => {
    upgradeDefinitions = {
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
            idPrefix: 'RO',
            className: 'buttons-rou-color',
            divName: 'buttons-rou',
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
    };
    upgradeBuilder('leaf', 1, 'Start generating Leaves', '0', new Decimal(1), leafUpgrades.L1);
    upgradeBuilder('leaf', 2, 'Grow I<br>x2 Leaves', '10', new Decimal(1), leafUpgrades.L2);
    upgradeBuilder('leaf', 3, 'Grow II<br>x3 Leaves', '35', new Decimal(1), leafUpgrades.L3);
    upgradeBuilder('leaf', 4, 'Develop I<br>Tree Age boosts Leaves', '150', new Decimal(1), leafUpgrades.L4);
    upgradeBuilder('leaf', 5, 'Grow III<br>x2.5 Leaves', '500', new Decimal(4), leafUpgrades.L5);
    upgradeBuilder('leaf', 6, 'Grow IV<br>x3 Leaves', '1500', new Decimal(4), leafUpgrades.L6);
    upgradeBuilder('leaf', 7, 'Grow V<br>xπ Leaves for no reason', '5000', new Decimal(4), leafUpgrades.L7);
    upgradeBuilder('leaf', 8, 'Grow VI<br>x1.75 Leaves', '7500', new Decimal(4), leafUpgrades.L8);
    upgradeBuilder('leaf', 9, 'Develop II<br>Tree Age boosts Leaves (again)', '24000', new Decimal(4), leafUpgrades.L9);
    upgradeBuilder('leaf', 10, 'Grow Power<br>Every LU Bought<br>Multiplies Leaves by 1.1', '200000', new Decimal(4), leafUpgrades.L10);
    upgradeBuilder('leaf', 11, 'Self-Synergy<br>Leaves boost their own production', '650000', new Decimal(15), leafUpgrades.L11);
    upgradeBuilder('leaf', 12, 'Grow VII<br>x5 Leaves', '2.25e7', new Decimal(15), leafUpgrades.L12);
    upgradeBuilder('leaf', 13, 'Grow VIII<br>x4 Leaves', '1.75e8', new Decimal(15), leafUpgrades.L13);
    upgradeBuilder('leaf', 14, 'Grow IX<br>x5 Leaves', '6e10', new Decimal(15), leafUpgrades.L14);
    upgradeBuilder('leaf', 15, `Booster<br>L11's effect is squared`, '1e9', new Decimal(15), leafUpgrades.L15);
    upgradeBuilder('leaf', 16, 'Develop III<br>Tree Age boosts Leaves (again)', '4.5e12', new Decimal(50), leafUpgrades.L16);
    upgradeBuilder('leaf', 17, 'Bigger Leaves<br>Leaves boost Seeds (again)', '1e15', new Decimal(50), leafUpgrades.L17);
    upgradeBuilder('leaf', 18, 'More Seeds I<br>x3 Seeds', '7.5e15', new Decimal(50), leafUpgrades.L18);
    upgradeBuilder('leaf', 19, 'More Seeds II<br>x3 Seeds', '5e17', new Decimal(50), leafUpgrades.L19);
    upgradeBuilder('leaf', 20, 'Exponentially Branching<br>Leaves exponentially<br>boost themselves', '1e23', new Decimal(200), leafUpgrades.L20);
    upgradeBuilder('leaf', 21, 'Grow X<br>x2 Leaves and Seeds', '1e33', new Decimal(200), leafUpgrades.L21);
    upgradeBuilder('leaf', 22, 'Heat I<br>x2 Composting speed', '2.5e36', new Decimal(200), leafUpgrades.L22);
    upgradeBuilder('leaf', 23, 'Super Grow I<br>x3 Leaves, x2 Seeds, x1.5 Fruits', '1e39', new Decimal(200), leafUpgrades.L23);
    upgradeBuilder('leaf', 24, 'Composting Techniques I<br>Leaves boost Composting speed', '5e43', new Decimal(200), leafUpgrades.L24);
    upgradeBuilder('leaf', 25, 'Filtered Water II<br>x2 Tree Aging speed', '5e45', new Decimal(200), leafUpgrades.L25);
    upgradeBuilder('leaf', 26, 'Filtered Water III<br>x10 Tree Aging speed', '3.5e51', new Decimal(3333), leafUpgrades.L26);
    upgradeBuilder('leaf', 27, 'More Seeds III<br>x3 Seeds', '1e57', new Decimal(3333), leafUpgrades.L27);
    upgradeBuilder('leaf', 28, 'Develop Life<br>x50 Leaves, x15 Seeds, x5 Fruits,<br>and start generating Potential Energy', '5e64', new Decimal(3333), leafUpgrades.L28);
    upgradeBuilder('leaf', 29, 'More Potential I<br>-2.5 Leaf root in the PE formula', '1e75', new Decimal(3333), leafUpgrades.L29);
    upgradeBuilder('leaf', 30, 'Super Grow II<br>Googol Leaves!<br>x5L, x3S, x2F', '1e100', new Decimal(3333), leafUpgrades.L30);
    upgradeBuilder('leaf', 31, 'Grow XI<br>x10 Leaves', '1e105', new Decimal(3333), leafUpgrades.L31);
    upgradeBuilder('leaf', 32, 'More Seeds IV<br>x2.5 Seeds', '1.11e111', new Decimal(3333), leafUpgrades.L32);
    upgradeBuilder('leaf', 33, 'Extra Branches<br>x2 Leaves and Seeds', '2.5e118', new Decimal(20000), leafUpgrades.L33);
    upgradeBuilder('leaf', 34, 'Super Grow III<br>x3L, x3S, x2F, x5TAS<br>(TAS stands for Tree Aging speed)', '1e127', new Decimal(20000), leafUpgrades.L34);
    upgradeBuilder('leaf', 35, 'Leaftic Cheapener I<br>1/15 base Leaf Composter costs', '1e137', new Decimal(20000), leafUpgrades.L35);
    upgradeBuilder('leaf', 36, 'Super Grow IV<br>x3L, x3S, x3F', '2e149', new Decimal(20000), leafUpgrades.L36);
    upgradeBuilder('leaf', 37, 'Grow XII<br>xπ<sup>2</sup> Tree Aging speed', '2e164', new Decimal(20000), leafUpgrades.L37);
    upgradeBuilder('leaf', 38, 'Super Grow V<br>x1.2E, x100L, x20CS<br>(CS stands for Composting speed)', '5e190', new Decimal(20000), leafUpgrades.L38);
    upgradeBuilder('leaf', 39, 'Leaftic Cheapener II<br>1/50 base Leaf Composter costs', '2.5e231', new Decimal(100000), leafUpgrades.L39);
    upgradeBuilder('leaf', 40, 'Accelerator<br>Tree Age boosts itself', '1e243', new Decimal(100000), leafUpgrades.L40);
    upgradeBuilder('leaf', 41, 'Powered Fertilizers<br>After 140, total Fertilizers boost Leaves', '1e267', new Decimal(100000), leafUpgrades.L41);
    upgradeBuilder('leaf', 42, 'Super Grow VI<br>x20L, x20S, x2F, x22.22 TAS', '5.25e278', new Decimal(100000), leafUpgrades.L42);
    upgradeBuilder('leaf', 43, `Final Stretch I<br>x2 Leaves<br>Hey, hope you've been having<br>fun with the mod so far!`, '1e291', new Decimal(100000), leafUpgrades.L43);
    upgradeBuilder('leaf', 44, `Final Stretch II<br>x3 Leaves<br>I know I've had fun making it!`, '2e292', new Decimal(100000), leafUpgrades.L44);
    upgradeBuilder('leaf', 45, `Final Stretch III<br>x4 Seeds<br>These upgrades were ones you'd find<br>at the beginning of the game.`, '4e293', new Decimal(100000), leafUpgrades.L45);
    upgradeBuilder('leaf', 46, `Final Stretch IV<br>x5 Fruits<br>Trust me, you've made it very far.`, '8e294', new Decimal(100000), leafUpgrades.L46);
    upgradeBuilder('leaf', 47, `Final Stretch V<br>x6 Leaves<br>I'd imagine you'd even feel a wee bit nostalgic<br>over those first few upgrades—`, '1.6e296', new Decimal(100000), leafUpgrades.L47);
    upgradeBuilder('leaf', 48, `Final Stretch VI<br>x7 Tree Aging speed<br>you were so innocent back then,<br>thinking L11 was a massive boost.`, '3.2e297', new Decimal(100000), leafUpgrades.L48);
    upgradeBuilder('leaf', 49, `Final Stretch VII<br>x8 Composting speed<br>Now the only thing that really<br>could boost you that much<br>would be just straight up<br>raising your leaf count entirely.`, '6.4e298', new Decimal(100000), leafUpgrades.L49);
    upgradeBuilder('leaf', 50, `THE BEGINNING OF THE END<br>Infinite Leaves!<br>x4.2 Entropy<br>This is not the end yet— at least,<br>but this is a pretty good point to stop<br>and reflect on what you've accomplished.`, '1.79e308', new Decimal(1e6), leafUpgrades.L50);
    upgradeBuilder('leaf', 51, `Forbidden Powers I<br>x3 CRS`, '1e450', new Decimal(1e8), leafUpgrades.L51);
    upgradeBuilder('leaf', 52, `Forbidden Powers II<br>Cells boost Entropy`, '1e485', new Decimal(1e8), leafUpgrades.L52);
    upgradeBuilder('leaf', 53, `The Statue<br>Unlock the Leaves repeatable upgrade`, '1e500', new Decimal(1e9), leafUpgrades.L53);
    upgradeBuilder('leaf', 54, `Forbidden Powers III<br>Seeds raise the base Leaf multiplier`, '6.66e666', new Decimal(1e9), leafUpgrades.L54);
    upgradeBuilder('leaf', 55, `Forbidden Powers IV<br>Fruits raise the base Seed multiplier`, '1e850', new Decimal(2e10), leafUpgrades.L55);
    upgradeBuilder('leaf', 56, `Forbidden Powers V<br>Entropy raises the base Fruit multiplier`, '1e940', new Decimal(2e10), leafUpgrades.L56);
    upgradeBuilder('leaf', 57, `Bacteria Pilus<br>^1.05 Bacteria`, '1e1379', new Decimal(1e15), leafUpgrades.L57);
    upgradeBuilder('leaf', 58, `Base Power I<br>^1.05 Potential Energy`, '1e1500', new Decimal(1e15), leafUpgrades.L58);
    upgradeBuilder('leaf', 59, `Grow XIII<br>x10 Entropy`, '1e1781', new Decimal(1e15), leafUpgrades.L59);
    upgradeBuilder('leaf', 60, `Base Power II<br>Potential Energy boosts Bacteria`, '1e2000', new Decimal(1e20), leafUpgrades.L60);
    upgradeBuilder('leaf', 61, `Mossy Leaves<br>Moss boosts Leaves`, '1e2750', new Decimal(1e20), leafUpgrades.L61);
    upgradeBuilder('leaf', 62, `Base Power III<br>Potential Energy boosts CRS`, '1.79e3008', new Decimal(1e20), leafUpgrades.L62);
    upgradeBuilder('leaf', 63, `Oh we're &radic;way there<br>^1.1 RuBisCo's effect`, '1e5000', new Decimal(1e50), leafUpgrades.L63);
    upgradeBuilder('leaf', 64, `Statue Power IX<br>+20 levels to LR2's cap`, '1e25000', new Decimal(1e100), leafUpgrades.L64);

    upgradeBuilder('seed', 1, 'Branch I<br>x6 Leaves', '1', new Decimal(400), seedUpgrades.S1);
    upgradeBuilder('seed', 2, 'Branch II<br>x3 Leaves', '3', new Decimal(400), seedUpgrades.S2);
    upgradeBuilder('seed', 3, 'Soil Enrichment I<br>Tree Age boosts Leaves', '5', new Decimal(400), seedUpgrades.S3);
    upgradeBuilder('seed', 4, 'Nutritious Leaves<br>Seeds multiply Leaves', '35', new Decimal(400), seedUpgrades.S4);
    upgradeBuilder('seed', 5, 'Branch III<br>x10 Leaves', '175', new Decimal(400), seedUpgrades.S5);
    upgradeBuilder('seed', 6, 'Decompolize Method I<br>x3 Seeds', '2500', new Decimal(400), seedUpgrades.S6);
    upgradeBuilder('seed', 7, 'Branch IV<br>x3 Leaves', '20000', new Decimal(400), seedUpgrades.S7);
    upgradeBuilder('seed', 8, 'Seeds-energy<br>Seeds boost themselves', '150000', new Decimal(3333), seedUpgrades.S8);
    upgradeBuilder('seed', 9, 'Decompolize Method II<br>x3 Seeds', '4e6', new Decimal(3333), seedUpgrades.S9);
    upgradeBuilder('seed', 10, 'Anti-Cap II<br>Seeds push back Leaves Softcap', '1e9', new Decimal(3333), seedUpgrades.S10);
    upgradeBuilder('seed', 11, 'Fruits in Seeds I<br>x2 Fruits', '1e8', new Decimal(3333), seedUpgrades.S11);
    upgradeBuilder('seed', 12, 'Branch V<br>x2 Leaves', '5e8', new Decimal(3333), seedUpgrades.S12);
    upgradeBuilder('seed', 13, 'Branch VI<br>x5 Leaves', '5e9', new Decimal(3333), seedUpgrades.S13);
    upgradeBuilder('seed', 14, 'Branch VII<br>x3 Leaves', '1e12', new Decimal(3333), seedUpgrades.S14);
    upgradeBuilder('seed', 15, 'Branch VIII<br>x2 Leaves', '1e13', new Decimal(25000), seedUpgrades.S15);
    upgradeBuilder('seed', 16, 'Branch IX<br>x4 Leaves', '1e14', new Decimal(25000), seedUpgrades.S16);
    upgradeBuilder('seed', 17, 'Fruits in Seeds II<br>x1.5 Fruits', '1e15', new Decimal(25000), seedUpgrades.S17);
    upgradeBuilder('seed', 18, 'Heat II<br>x1.75 Composting speed', '1.5e17', new Decimal(25000), seedUpgrades.S18);
    upgradeBuilder('seed', 19, 'Soil Enrichment II<br>x2.5 Tree Aging speed', '1e19', new Decimal(25000), seedUpgrades.S19);
    upgradeBuilder('seed', 20, 'Transport Power<br>Leaves boost Fruits', '5e28', new Decimal(25000), seedUpgrades.S20);
    upgradeBuilder('seed', 21, 'Vines I<br>x2 Leaves, Seeds, Fruits', '1e30', new Decimal(500000), seedUpgrades.S21);
    upgradeBuilder('seed', 22, 'Fruits in Seeds III<br>x1.75 Fruits', '5e31', new Decimal(500000), seedUpgrades.S22);
    upgradeBuilder('seed', 23, 'More Potential II<br>-1.5 Seed root in the PE formula', '1e33', new Decimal(500000), seedUpgrades.S23);
    upgradeBuilder('seed', 24, 'Sieve Circuit<br>Base Seeds Mult is ^ 1.2', '1e47', new Decimal(500000), seedUpgrades.S24);
    upgradeBuilder('seed', 25, 'Branch X<br>x10 Leaves', '1e50', new Decimal(500000), seedUpgrades.S25);
    upgradeBuilder('seed', 26, 'Cellular Worker<br>Cells boost Tree Aging speed', '1e51', new Decimal(500000), seedUpgrades.S26);
    upgradeBuilder('seed', 27, 'Expander<br>Seeds boost L11', '1e55', new Decimal(6e6), seedUpgrades.S27);
    upgradeBuilder('seed', 28, 'Seedic Cheapener<br>1/3 base Seed Composter costs', '5e64', new Decimal(6e6), seedUpgrades.S28);
    upgradeBuilder('seed', 29, 'Twig I<br>x25L, x5S', '1e72', new Decimal(6e6), seedUpgrades.S29);
    upgradeBuilder('seed', 30, 'Branch XI<br>x10L, x5S, x2F', '1.5e75', new Decimal(6e6), seedUpgrades.S30);
    upgradeBuilder('seed', 31, 'Branch XII<br>x42L, x5TAS', '5e83', new Decimal(6e6), seedUpgrades.S31);
    upgradeBuilder('seed', 32, 'Twig II<br>x5L, x5F', '1e94', new Decimal(6e6), seedUpgrades.S32);
    upgradeBuilder('seed', 33, 'Branch XIII<br>x1.2E, x5S', '1e97', new Decimal(6e6), seedUpgrades.S33);
    upgradeBuilder('seed', 34, 'Upgrades Booster<br>After 100, Upgrades bought boost Seeds', '1e115', new Decimal(6e6), seedUpgrades.S34);
    upgradeBuilder('seed', 35, 'Branch XIV<br>x2L and F, x1.5E', '2e123', new Decimal(4.2e7), seedUpgrades.S35);
    upgradeBuilder('seed', 36, 'Staked Fertilizers<br>After 50 Fertilizers,<br> the Seed Composter makes Leaf Fertilizers', '2.5e146', new Decimal(4.2e7), seedUpgrades.S36);
    upgradeBuilder('seed', 37, 'Twig III<br>x25L, x5S, x5F', '1e192', new Decimal(1e12), seedUpgrades.S37);
    upgradeBuilder('seed', 38, `Cell Nucleus<br>Bacteria's CRS boost is increased`, '1e243', new Decimal(1e12), seedUpgrades.S38);
    upgradeBuilder('seed', 39, 'Table Flip<br>x5L, x20S, x50F, but x0.1 TAS', '5.5e270', new Decimal(1e12), seedUpgrades.S39);
    upgradeBuilder('seed', 40, 'Branch XV<br>x42L, S, F, TAS, CRS', '3.33e333', new Decimal(4.2e15), seedUpgrades.S40);
    upgradeBuilder('seed', 41, 'Branch XVI<br>x20L, S, F, x3E', '1e430', new Decimal(4.2e15), seedUpgrades.S41);
    upgradeBuilder('seed', 42, 'The Statue II<br>Unlock the Seeds repeatable upgrade', '1e1000', new Decimal(4.2e15), seedUpgrades.S42);
    upgradeBuilder('seed', 43, `Anti-Cap III<br>^10 MM6's effect`, '1e1270', new Decimal(2e20), seedUpgrades.S43);
    upgradeBuilder('seed', 44, `Statue Power IV<br>+20 levels to SR1's cap`, '1e1322', new Decimal(2e20), seedUpgrades.S44);
    upgradeBuilder('seed', 45, `Twig IV<br>x100L, x2.5E`, '1e1459', new Decimal(2e20), seedUpgrades.S45);
    upgradeBuilder('seed', 46, `Base Power IV<br>^1.05 Potential Energy`, '1e1500', new Decimal(1e25), seedUpgrades.S46);
    upgradeBuilder('seed', 47, `Statue Power V<br>Every M6 level, +0.15 to SR1's effect`, '1e2000', new Decimal(1e25), seedUpgrades.S47);
    upgradeBuilder('seed', 48, `Statue Power VI<br>Every M5 level, +1 to SR1's cap`, '2.22e2222', new Decimal(1e25), seedUpgrades.S48);
    upgradeBuilder('seed', 49, `Base Power V<br>Potential Energy boosts Bacteria again`, '1.08e2466', new Decimal(1e25), seedUpgrades.S49);
    upgradeBuilder('seed', 50, `Fortification<br>+0.1 to all supercap roots`, '1.79e3008', new Decimal(1e40), seedUpgrades.S50);
    upgradeBuilder('seed', 51, `Statue Power VII<br>Every five M5 levels, +1 to LR2's cap`, '1e5000', new Decimal(1e100), seedUpgrades.S51);
    upgradeBuilder('seed', 52, `Statue Power X<br>Every five M5 levels, +1 to SR2's cap`, '1e10000', new Decimal(1e100), seedUpgrades.S52);

    upgradeBuilder('fruit', 1, 'The Composter I<br>Unlock the Composter', '1', new Decimal(50000), fruitUpgrades.F1);
    upgradeBuilder('fruit', 2, 'The Composter II<br>Unlock the second Composter', '4', new Decimal(50000), fruitUpgrades.F2);
    upgradeBuilder('fruit', 3, 'Anti-cap I<br>Fruits push back Leaves Softcap', '9', new Decimal(50000), fruitUpgrades.F3);
    upgradeBuilder('fruit', 4, 'Bloom I<br>x5 Leaves', '10', new Decimal(50000), fruitUpgrades.F4);
    upgradeBuilder('fruit', 5, 'Photosynthesis<br>Leaves give a boost<br>to Tree Aging speed', '10', new Decimal(50000), fruitUpgrades.F5);
    upgradeBuilder('fruit', 6, 'Bloom II<br>x2.5 Seeds', '15', new Decimal(50000), fruitUpgrades.F6);
    upgradeBuilder('fruit', 7, 'The Composter III<br>Unlock the third Composter', '150', new Decimal(240000), fruitUpgrades.F7);
    upgradeBuilder('fruit', 8, 'More Fruits<br>x2 Fruits', '250', new Decimal(240000), fruitUpgrades.F8);
    upgradeBuilder('fruit', 9, 'Bloom III<br>x2 Tree Aging speed', '400', new Decimal(240000), fruitUpgrades.F9);
    upgradeBuilder('fruit', 10, 'Fast Decomposition<br>x4 Composting speed', '1000', new Decimal(240000), fruitUpgrades.F10);
    upgradeBuilder('fruit', 11, 'Rich Nutrients<br>x3 Seeds', '1500', new Decimal(240000), fruitUpgrades.F11);
    upgradeBuilder('fruit', 12, 'Basket<br>x1.5 Fruits', '2000', new Decimal(240000), fruitUpgrades.F12);
    upgradeBuilder('fruit', 13, 'Dirt Nutrients<br>x3 Tree Aging speed', '7000', new Decimal(1.7e6), fruitUpgrades.F13);
    upgradeBuilder('fruit', 14, 'Heat III<br>x2.5 Composting speed', '25000', new Decimal(1.7e6), fruitUpgrades.F14);
    upgradeBuilder('fruit', 15, 'Filtered Water I<br>x3 Tree Aging speed', '75000', new Decimal(1.7e6), fruitUpgrades.F15);
    upgradeBuilder('fruit', 16, 'Net<br>x3 Fruits', '100000', new Decimal(1.7e6), fruitUpgrades.F16);
    upgradeBuilder('fruit', 17, 'Chaotic Energy<br>Unlock Entropy', '700000', new Decimal(1.7e6), fruitUpgrades.F17);
    upgradeBuilder('fruit', 18, 'Gloves<br>x1.5 Fruits', '1e8', new Decimal(2.5e7), fruitUpgrades.F18);
    upgradeBuilder('fruit', 19, 'Life in Upgrades<br>Unlock Moss', '2.5e8', new Decimal(2.5e7), fruitUpgrades.F19);
    upgradeBuilder('fruit', 20, `Fruits are Finally Useful<br>Fruits boost S8's effect`, '1e13', new Decimal(6.66e8), fruitUpgrades.F20);
    upgradeBuilder('fruit', 21, 'Wood Circuit<br>Base Fruits Mult ^ 1.25', '7.5e15', new Decimal(6.66e8), fruitUpgrades.F21);
    upgradeBuilder('fruit', 22, 'Composting Techniques II<br>x20 Composting speed', '5e16', new Decimal(6.66e8), fruitUpgrades.F22);
    upgradeBuilder('fruit', 23, 'Bloom IV<br>x2L, S, F, and x5TAS', '1.28e21', new Decimal(6.66e8), fruitUpgrades.F23);
    upgradeBuilder('fruit', 24, 'Transport Network<br>Fruits boost Seeds again', '1e22', new Decimal(6.66e8), fruitUpgrades.F24);
    upgradeBuilder('fruit', 25, 'Bloom V<br>x10L and S', '5e27', new Decimal(6.66e8), fruitUpgrades.F25);
    upgradeBuilder('fruit', 26, 'Bloom VI<br>x3L, F, and x100CS', '2e33', new Decimal(6.66e8), fruitUpgrades.F26);
    upgradeBuilder('fruit', 27, 'Bloom VII<br>x20L, and x7.5TAS', '2e37', new Decimal(6.66e8), fruitUpgrades.F27);
    upgradeBuilder('fruit', 28, 'Bloom VIII<br>x20L, x5S, x3F, and x2TAS', '7.5e45', new Decimal(3e9), fruitUpgrades.F28);
    upgradeBuilder('fruit', 29, 'Super Staked Fertilizer<br>After 50 Fertilizers,<br> the Fruit Composter makes Leaf Fertilizers', '1e61', new Decimal(3e9), fruitUpgrades.F29);
    upgradeBuilder('fruit', 30, 'Bloom IX<br>x10L, S, F, and CRS<br>(CRS stands for Cell Replication Speed)', '3.5e89', new Decimal(1.3e12), fruitUpgrades.F30);
    upgradeBuilder('fruit', 31, 'Bloom X<br>Googol Fruits!<br>x100L, TAS, and x2E', '1e100', new Decimal(1.3e12), fruitUpgrades.F31);
    upgradeBuilder('fruit', 32, 'Bloom XI<br>x10CRS', '1e110', new Decimal(4.5e15), fruitUpgrades.F32);
    upgradeBuilder('fruit', 33, 'Entropy Controller<br>x2.81 Entropy', '1.28e128', new Decimal(4.5e15), fruitUpgrades.F33);
    upgradeBuilder('fruit', 34, 'Stupidly Overpowered<br>x3E, x33F, x333S, x3333L, x33^3 TAS', '1.41e141', new Decimal(4.5e15), fruitUpgrades.F34);
    upgradeBuilder('fruit', 35, 'Bloom XII<br>x2E, x3F, x4S, x5L', '3.5e165', new Decimal(4.5e15), fruitUpgrades.F35);
    upgradeBuilder('fruit', 36, 'Bloom XIII<br>x10L, S, F, x2E', '1e281', new Decimal(4.5e15), fruitUpgrades.F36);
    upgradeBuilder('fruit', 37, 'Unstable I<br>x1e9L and TAS', '1e370', new Decimal(4.5e15), fruitUpgrades.F37);
    upgradeBuilder('fruit', 38, 'Bulkier I<br>+1 Fertilizer bulk', '1e500', new Decimal(1e17), fruitUpgrades.F38);
    upgradeBuilder('fruit', 39, 'Unstable II<br>x1e9L and TAS again', '1e600', new Decimal(1e17), fruitUpgrades.F39);
    upgradeBuilder('fruit', 40, 'Composting Techniques III<br>Composting speed divides Fertilizer cost', '1e750', new Decimal(1e17), fruitUpgrades.F40);
    upgradeBuilder('fruit', 41, 'The Statue III<br>Unlock the Fruits repeatable upgrade', '1e1000', new Decimal(1e20), fruitUpgrades.F41);
    upgradeBuilder('fruit', 42, 'Bulkier II<br>+2 Fertilizer bulk', '1.2e1222', new Decimal(1e25), fruitUpgrades.F42);
    upgradeBuilder('fruit', 43, 'The Composter IV<br>Unlock the fourth Composter', '1e1500', new Decimal(1e30), fruitUpgrades.F43);
    upgradeBuilder('fruit', 44, 'Super Replication<br>The Cell replication cap is better<br>1e1000 -> 1e5000', '1e1600', new Decimal(1e30), fruitUpgrades.F44);
    upgradeBuilder('fruit', 45, 'Bloom XIV<br>x4 Game speed', '1.79e3008', new Decimal(1e30), fruitUpgrades.F45);
    upgradeBuilder('fruit', 46, 'Glutenous Fruits<br>+4 Glutamine and Glutamate Proteins', '6.66e6666', new Decimal(1e100), fruitUpgrades.F46);

    upgradeBuilder('entropy', 1, 'Cellular Lab<br>Unlock the Cellular Lab', '1', new Decimal(1e21), entropyUpgrades.E1);
    upgradeBuilder('entropy', 2, 'Split of Decisions<br>Base Leaf Multiplier is ^ 1.5', '1', new Decimal(1e21), entropyUpgrades.E2);
    upgradeBuilder('entropy', 3, 'Split of Decisions<br>x15 Seeds', '1', new Decimal(1e21), entropyUpgrades.E3);
    upgradeBuilder('entropy', 4, 'Split of Decisions<br>Fruits boost themselves', '1', new Decimal(1e21), entropyUpgrades.E4);
    upgradeBuilder('entropy', 5, 'Composting Experiences<br>Keep all Composters<br>on Transform', '2', new Decimal(1e21), entropyUpgrades.E5);
    upgradeBuilder('entropy', 6, 'Composting Power<br>Fertilizers boost Composting speed', '3', new Decimal(1e21), entropyUpgrades.E6);
    upgradeBuilder('entropy', 7, `Size Expansion<br>L17's effect is boosted by Entropy`, '5', new Decimal(1e21), entropyUpgrades.E7);
    upgradeBuilder('entropy', 8, `FINALLY<br>Keep all Fertilizers on all resets<br>(except Transform)`, '8', new Decimal(1e21), entropyUpgrades.E8);
    upgradeBuilder('entropy', 9, `Super Growth<br>L10 is boosted by Fruits`, '7', new Decimal(1e21), entropyUpgrades.E9);
    upgradeBuilder('entropy', 10, `Entropic Cheapener<br>Entropy delays Fertilizer scaling`, '15', new Decimal(1e24), entropyUpgrades.E10);
    upgradeBuilder('entropy', 11, `Cells Formation<br>Cells effect formula is better`, '35', new Decimal(1e24), entropyUpgrades.E11);
    upgradeBuilder('entropy', 12, `Power of Potential<br>Cells Interval is divided<br>based on Entropy`, '170', new Decimal(1e24), entropyUpgrades.E12);
    upgradeBuilder('entropy', 13, `Split of Power<br>x50000 Leaves`, '2500', new Decimal(1e24), entropyUpgrades.E13);
    upgradeBuilder('entropy', 14, `Split of Power<br>x500 Seeds`, '2500', new Decimal(1e24), entropyUpgrades.E14);
    upgradeBuilder('entropy', 15, `Split of Power<br>x50 Fruits`, '2500', new Decimal(1e24), entropyUpgrades.E15);
    upgradeBuilder('entropy', 16, `Split of Power<br>x1.5 Entropy`, '2500', new Decimal(1e24), entropyUpgrades.E16);
    upgradeBuilder('entropy', 17, `Split of Power<br>-0.05 from Leaf softcap root`, '2500', new Decimal(1e24), entropyUpgrades.E17);
    upgradeBuilder('entropy', 18, `Multiplication<br>Unlock a new Cells upgrade`, '10000', new Decimal(1e24), entropyUpgrades.E18);
    upgradeBuilder('entropy', 19, `Conservation of Energy<br>x2 Entropy`, '20000', new Decimal(1e24), entropyUpgrades.E19);
    upgradeBuilder('entropy', 20, `Super Cells<br>C3 adds free C2 levels`, '200000', new Decimal(1e27), entropyUpgrades.E20);
    upgradeBuilder('entropy', 21, `Storm's a Brewin'<br>Unlock the Radar`, '1.5e7', new Decimal(1e27), entropyUpgrades.E21);
    upgradeBuilder('entropy', 22, `Bacteria Nucleoid<br>^1.05 Bacteria`, '1e10', new Decimal(1e27), entropyUpgrades.E22);
    upgradeBuilder('entropy', 23, `Compact Fertilizers<br>Divide Fertilizer<br>Super Scaling exponent by 1.075`, '8.5e12', new Decimal(1e27), entropyUpgrades.E23);
    upgradeBuilder('entropy', 24, `Statue Power I<br>+15 levels to LR1's cap`, '1.6e16', new Decimal(1e27), entropyUpgrades.E24);
    upgradeBuilder('entropy', 25, `Statue Power II<br>Entropy boosts LR1's effect`, '1e18', new Decimal(1e27), entropyUpgrades.E25);
    upgradeBuilder('entropy', 26, `Empower<br>Fruits boost E4's effect`, '1e20', new Decimal(1e30), entropyUpgrades.E26);
    upgradeBuilder('entropy', 27, `Statue Power III<br>+10 levels to LR1's cap`, '1e22', new Decimal(1e30), entropyUpgrades.E27);
    upgradeBuilder('entropy', 28, `AAGGHHH I'M BURNING<br>Unlock the Wildfire Challenge`, '1e22', new Decimal(1e30), entropyUpgrades.E28);
    upgradeBuilder('entropy', 29, `Bacteria Ribosomes<br>Entropy boosts Bacteria cap`, '7.5e23', new Decimal(1e30), entropyUpgrades.E29);
    upgradeBuilder('entropy', 30, `Bacteria Flagellum<br>^1.25 Bacteria`, '1e25', new Decimal(1e35), entropyUpgrades.E30);
    upgradeBuilder('entropy', 31, `Helping Hand I<br>The Stormcap for Seeds and Fruits<br>is lowered from ^5 to ^3.5`, '1e30', new Decimal(1e35), entropyUpgrades.E31);
    upgradeBuilder('entropy', 32, `Free Fruits<br>-0.025 from Fruit softcap root`, '3.33e33', new Decimal(1e35), entropyUpgrades.E32);
    upgradeBuilder('entropy', 33, `Mitochondria<br>^1.5 CRS`, '3e40', new Decimal(1e35), entropyUpgrades.E33);
    upgradeBuilder('entropy', 34, `Dry Out<br>Unlock the Drought Challenge`, '2.5e45', new Decimal(1e50), entropyUpgrades.E34);
    upgradeBuilder('entropy', 35, `Helping Hand II<br>Each composter gets 15 free Fertilizers,<br>not affected by the Wildfire`, '1e50', new Decimal(1e50), entropyUpgrades.E35);
    upgradeBuilder('entropy', 36, `"robloxretrotycoon"<br>Unlock Bacteria Types automation`, '5e55', new Decimal(1e50), entropyUpgrades.E36);
    upgradeBuilder('entropy', 37, `DNA Polymerase I<br>DNA's formula is better<br>1e10000<sup>1.5x</sup> -> 1e10000<sup>1.25x</sup>`, '1e64', new Decimal(1e50), entropyUpgrades.E37);
    upgradeBuilder('entropy', 38, `Nice<br>x6.9 Game speed`, '6.9e69', new Decimal(1e50), entropyUpgrades.E38);
    upgradeBuilder('entropy', 39, `Catalyzing Agent<br>^1.1 RuBisCo's effect`, '4e73', new Decimal(1e50), entropyUpgrades.E39);
    upgradeBuilder('entropy', 40, `Bacteria Cytoplasm<br>Bacteria's Fertilizer base effectiveness<br>very slightly affects the Entropy Composter`, '1e89', new Decimal(1e50), entropyUpgrades.E40);
    upgradeBuilder('entropy', 41, `Helping Hand III<br>^1.5 Fruit base mult in the Drought`, '1e95', new Decimal(1e50), entropyUpgrades.E41);
    upgradeBuilder('entropy', 42, `30 Below Zero<br>Unlock the Blizzard Challenge`, '1e100', new Decimal(1e100), entropyUpgrades.E42);
    upgradeBuilder('entropy', 43, `Island of Stability<br>Roots boost Bacteria cap`, '1e180', new Decimal(1e100), entropyUpgrades.E43);
    upgradeBuilder('entropy', 44, `DNA Polymerase II<br>DNA's formula is even better<br>1e10000<sup>1.25x</sup> -> 1e10000<sup>1.1x</sup>`, '1e250', new Decimal(1e100), entropyUpgrades.E44);
	
	upgradeBuilder('root', 1, `Price of Power<br>^1.1 RuBisCo's effect`, '0.5', new Decimal.fromComponents(1, 1, 1000), rootUpgrades.RO1);
	upgradeBuilder('root', 2, `Price of Power<br>Storm reward boosts Seeds base mult<br>with reduced rate`, '0.5', new Decimal.fromComponents(1, 1, 1000), rootUpgrades.RO2);
	upgradeBuilder('root', 3, `Price of Power<br>x2.5 FR1's effect`, '0.5', new Decimal.fromComponents(1, 1, 1000), rootUpgrades.RO3);
	upgradeBuilder('root', 4, `Price of Power<br>Moss divides L, S, and F Composter costs<br>with reduced rate`, '0.5', new Decimal.fromComponents(1, 1, 1000), rootUpgrades.RO4);
	upgradeBuilder('root', 5, `Price of Power<br>Extensin's formula is better<br>+10<sup>1.05x</sup> per Protein -> +10<sup>1.5x</sup> per Protein`, '0.5', new Decimal.fromComponents(1, 1, 1000), rootUpgrades.RO5);
	upgradeBuilder('root', 6, `Price of Power<br>Every Protein gains 1 free level`, '0.5', new Decimal.fromComponents(1, 1, 1000), rootUpgrades.RO6);
	upgradeBuilder('root', 7, `Price of Power<br>x100 Game speed`, '0.5', new Decimal.fromComponents(1, 1, 1000), rootUpgrades.RO7);
	upgradeBuilder('root', 8, `Price of Power<br>LR2 increases all supercap roots<br>with reduced rate`, '0.5', new Decimal.fromComponents(1, 1, 1000), rootUpgrades.RO8);
	upgradeBuilder('root', 9, `Price of Power<br>^5 Cell replication cap`, '0.5', new Decimal.fromComponents(1, 1, 1000), rootUpgrades.RO9);
	upgradeBuilder('root', 10, `Price of Power<br>x1.15 Roots`, '0.5', new Decimal.fromComponents(1, 1, 1000), rootUpgrades.RO10);
	upgradeBuilder('root', 11, `Statue Power VII<br>+15 to LR2's cap`, '2', new Decimal.fromComponents(1, 1, 1100), rootUpgrades.RO11);
	upgradeBuilder('root', 12, `Statue Power VIII<br>+15 to SR2's cap`, '2', new Decimal.fromComponents(1, 1, 1100), rootUpgrades.RO12);
	upgradeBuilder('root', 13, `Composting Journies<br>Keep the Entropy Composter<br>on Reinforcement and x1.5 its effect`, '5', new Decimal.fromComponents(1, 1, 1100), rootUpgrades.RO13);
	upgradeBuilder('root', 14, `Mossy Roots I<br>MM1 - MM5 become<br>permanentally active`, '5', new Decimal.fromComponents(1, 1, 1100), rootUpgrades.RO14);
	upgradeBuilder('root', 15, `Mossy Roots II<br>M1's effect softcap is pushed back<br>+100 -> +300`, '5', new Decimal.fromComponents(1, 1, 1100), rootUpgrades.RO15);
	upgradeBuilder('root', 16, `Protein Shake<br>Every Protein gains another free level`, '10', new Decimal.fromComponents(1, 1, 1500), rootUpgrades.RO16);
	upgradeBuilder('root', 17, `Tap-root<br>Entropy boosts Roots`, '15', new Decimal.fromComponents(1, 1, 1500), rootUpgrades.RO17);
	upgradeBuilder('root', 18, `Bacterial Rooting<br>+1 Bacteria Types bulk`, '20', new Decimal.fromComponents(1, 1, 1500), rootUpgrades.RO18);
	upgradeBuilder('root', 19, `Growth Hormones<br>Unlock Fruit generation`, '50', new Decimal.fromComponents(1, 1, 1500), rootUpgrades.RO19);
	upgradeBuilder('root', 20, `Microscopic Life<br>Manufacture a Petri Dish`, '100', new Decimal.fromComponents(1, 1, 1500), rootUpgrades.RO20);
	upgradeBuilder('root', 21, `Synchronizer<br>Keep all challenge progress upon Reinforcement<br>(if you play EUT you'll recognize this)`, '1000', new Decimal.fromComponents(1, 1, 2000), rootUpgrades.RO21);
});

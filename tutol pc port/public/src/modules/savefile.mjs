import * as storage from './core/bunchobullshit.mjs';
import { achievements, secretAchievements, updateAchievements } from './achievements.mjs';
import * as automation from './automation.mjs';
import * as leafUpgrades from './leafupgrades.mjs';
import * as temple from './temple.mjs';

export var gameLoading = false;
export var hasInitialized = false;

var temporaryGameData = {};
var temporaryLeafUpgradeFactor = {};
var temporarySeedUpgradeFactor = {};
var temporaryFruitUpgradeFactor = {};
var temporaryEntropyUpgradeFactor = {};
var temporaryRootUpgradeFactor = {};
var temporaryAchievements = {};
var temporarySecretAchievements = {};
var temporaryCircuits = {};
var temporaryRepeatableUpgradeFactor = {};
var gameDataKeys = [];
var leafUpgradeFactorKeys = [];
var seedUpgradeFactorKeys = [];
var fruitUpgradeFactorKeys = [];
var entropyUpgradeFactorKeys = [];
var rootUpgradeFactorKeys = [];
var circuitsKeys = [];
var repeatableUpgradeFactorKeys = [];

var exportString = "";
var exportStrings = [];

export function saveLoop() {
    if (storage.gameData !== undefined && !gameLoading) {
        temporaryGameData = storage.gameData;
        gameDataKeys = [];
        Object.entries(temporaryGameData).forEach(([key, value]) => {
            if (value instanceof Decimal) {
                gameDataKeys.push(key);
            }
        });
        localStorage.setItem("gameData", JSON.stringify(temporaryGameData));
    }
    if (storage.leafUpgradeFactor !== undefined && !gameLoading) {
        temporaryLeafUpgradeFactor = storage.leafUpgradeFactor;
        leafUpgradeFactorKeys = [];
        Object.entries(temporaryLeafUpgradeFactor).forEach(([key, value]) => {
            if (value instanceof Decimal) {
                leafUpgradeFactorKeys.push(key);
            }
        });
        localStorage.setItem("leafUpgradeFactor", JSON.stringify(temporaryLeafUpgradeFactor));
    }
    if (storage.seedUpgradeFactor !== undefined && !gameLoading) {
        temporarySeedUpgradeFactor = storage.seedUpgradeFactor;
        seedUpgradeFactorKeys = [];
        Object.entries(temporarySeedUpgradeFactor).forEach(([key, value]) => {
            if (value instanceof Decimal) {
                seedUpgradeFactorKeys.push(key);
            }
        });
        localStorage.setItem("seedUpgradeFactor", JSON.stringify(temporarySeedUpgradeFactor));
    }
    if (storage.fruitUpgradeFactor !== undefined && !gameLoading) {
        temporaryFruitUpgradeFactor = storage.fruitUpgradeFactor;
        fruitUpgradeFactorKeys = [];
        Object.entries(temporaryFruitUpgradeFactor).forEach(([key, value]) => {
            if (value instanceof Decimal) {
                fruitUpgradeFactorKeys.push(key);
            }
        });
        localStorage.setItem("fruitUpgradeFactor", JSON.stringify(temporaryFruitUpgradeFactor));
    }
    if (storage.entropyUpgradeFactor !== undefined && !gameLoading) {
        temporaryEntropyUpgradeFactor = storage.entropyUpgradeFactor;
        entropyUpgradeFactorKeys = [];
        Object.entries(temporaryEntropyUpgradeFactor).forEach(([key, value]) => {
            if (value instanceof Decimal) {
                entropyUpgradeFactorKeys.push(key);
            }
        });
        localStorage.setItem("entropyUpgradeFactor", JSON.stringify(temporaryEntropyUpgradeFactor));
    }
    if (storage.rootUpgradeFactor !== undefined && !gameLoading) {
        temporaryRootUpgradeFactor = storage.rootUpgradeFactor;
        rootUpgradeFactorKeys = [];
        Object.entries(temporaryRootUpgradeFactor).forEach(([key, value]) => {
            if (value instanceof Decimal) {
                rootUpgradeFactorKeys.push(key);
            }
        });
        localStorage.setItem("rootUpgradeFactor", JSON.stringify(temporaryRootUpgradeFactor));
    }
    if (achievements !== undefined && !gameLoading) {
        temporaryAchievements = achievements;
        localStorage.setItem("achievements", JSON.stringify(temporaryAchievements));
    }
    if (secretAchievements !== undefined && !gameLoading) {
        temporarySecretAchievements = secretAchievements;
        localStorage.setItem("secretAchievements", JSON.stringify(temporarySecretAchievements));
    }
    if (automation.circuits !== undefined && !gameLoading) {
        temporaryCircuits = automation.circuits;
        circuitsKeys = [];
        Object.entries(temporaryCircuits).forEach(([key, value]) => {
            if (value instanceof Decimal) {
                circuitsKeys.push(key);
            }
        });
        localStorage.setItem("circuits", JSON.stringify(temporaryCircuits));
    }
    if (temple.repeatableUpgradeFactor !== undefined && !gameLoading) {
        temporaryRepeatableUpgradeFactor = temple.repeatableUpgradeFactor;
        repeatableUpgradeFactorKeys = [];
        Object.entries(temporaryRepeatableUpgradeFactor).forEach(([key, value]) => {
            if (value instanceof Decimal) {
                repeatableUpgradeFactorKeys.push(key);
            }
        });
        localStorage.setItem("repeatableUpgradeFactor", JSON.stringify(temporaryRepeatableUpgradeFactor));
    }
    if (temple.rootUpgradeFactor !== undefined && !gameLoading) {
        temporaryRootUpgradeFactor = temple.rootUpgradeFactor;
        rootUpgradeFactorKeys = [];
        Object.entries(temporaryRootUpgradeFactor).forEach(([key, value]) => {
            if (value instanceof Decimal) {
                rootUpgradeFactorKeys.push(key);
            }
        });
        localStorage.setItem("rootUpgradeFactor", JSON.stringify(temporaryRootUpgradeFactor));
    }

    exportString = 
    " " + localStorage.getItem("gameData") + 
    " " + gameDataKeys.toString() + 
    " " + localStorage.getItem("leafUpgradeFactor") +
    " " + leafUpgradeFactorKeys.toString() + 
    " " + localStorage.getItem("seedUpgradeFactor") +
    " " + seedUpgradeFactorKeys.toString() + 
    " " + localStorage.getItem("fruitUpgradeFactor") +
    " " + fruitUpgradeFactorKeys.toString() + 
    " " + localStorage.getItem("entropyUpgradeFactor") +
    " " + entropyUpgradeFactorKeys.toString() + 
    " " + localStorage.getItem("achievements") + 
    " " + localStorage.getItem("secretAchievements") +
    " " + localStorage.getItem("circuits") +
    " " + circuitsKeys.toString() +
    " " + localStorage.getItem("repeatableUpgradeFactor") +
    " " + repeatableUpgradeFactorKeys.toString() +
    " " + localStorage.getItem("rootUpgradeFactor") +
    " " + rootUpgradeFactorKeys.toString();

    exportStrings = exportString.split(" ");
    exportStrings.splice(0, 1);
    console.log('Saved to localStorage');
    storage.gameSavedTextAnimation();
}

export function loadSave() {
    gameLoading = true;
    console.log('Attempting to load save data from localStorage');

    //gameData on initilization
    let loadedGameData = { ...storage.gameData };
    let loadedLeafUpgradeFactor = { ...storage.leafUpgradeFactor };
    let loadedSeedUpgradeFactor = { ...storage.seedUpgradeFactor };
    let loadedFruitUpgradeFactor = { ...storage.fruitUpgradeFactor };
    let loadedEntropyUpgradeFactor = { ...storage.entropyUpgradeFactor };
    let loadedCircuits = { ...automation.circuits };
    let loadedRepeatableUpgradeFactor = { ...temple.repeatableUpgradeFactor };
    let loadedRootUpgradeFactor = { ...storage.rootUpgradeFactor };

    const gameDataString = localStorage.getItem("gameData");
    const leafUpgradeFactorString = localStorage.getItem("leafUpgradeFactor");
    const seedUpgradeFactorString = localStorage.getItem("seedUpgradeFactor");
    const fruitUpgradeFactorString = localStorage.getItem("fruitUpgradeFactor");
    const entropyUpgradeFactorString = localStorage.getItem("entropyUpgradeFactor");
    const achievementsString = localStorage.getItem("achievements");
    const secretAchievementsString = localStorage.getItem("secretAchievements");
    const circuitsString = localStorage.getItem("circuits");
    const repeatableUpgradeFactorString = localStorage.getItem("repeatableUpgradeFactor");
    const rootUpgradeFactorString = localStorage.getItem("rootUpgradeFactor");

    let newGameData = {};
    let newLeafUpgradeFactor = {};
    let newSeedUpgradeFactor = {};
    let newFruitUpgradeFactor = {};
    let newEntropyUpgradeFactor = {};
    let newAchievements = {};
    let newSecretAchievements = {};
    let newCircuits = {};
    let newRepeatableUpgradeFactor = {};
    let newRootUpgradeFactor = {};

    let dataWasLoaded = false;

    try {
        if (gameDataString) {
            newGameData = JSON.parse(gameDataString);
            dataWasLoaded = true;
        }
        if (leafUpgradeFactorString) {
            newLeafUpgradeFactor = JSON.parse(leafUpgradeFactorString);
        }
        if (seedUpgradeFactorString) {
            newSeedUpgradeFactor = JSON.parse(seedUpgradeFactorString);
        }
        if (fruitUpgradeFactorString) {
            newFruitUpgradeFactor = JSON.parse(fruitUpgradeFactorString);
        }
        if (entropyUpgradeFactorString) {
            newEntropyUpgradeFactor = JSON.parse(entropyUpgradeFactorString);
        }
        if (achievementsString) {
            newAchievements = JSON.parse(achievementsString);
        }
        if (secretAchievementsString) {
            newSecretAchievements = JSON.parse(secretAchievementsString);
        }
        if (circuitsString) {
            newCircuits = JSON.parse(circuitsString);
        }
        if (repeatableUpgradeFactorString) {
            newRepeatableUpgradeFactor = JSON.parse(repeatableUpgradeFactorString);
        }
        if (rootUpgradeFactorString) {
            newRootUpgradeFactor = JSON.parse(rootUpgradeFactorString);
        }
    } catch (error) {
        console.error("Something fucked up in the saving process. Resetting all game variables to their defaults.", error);
        newGameData = {};
        newLeafUpgradeFactor = {};
        newSeedUpgradeFactor = {};
        newFruitUpgradeFactor = {};
        newEntropyUpgradeFactor = {};
        newAchievements = {};
        newSecretAchievements = {};
        newCircuits = {};
        newRepeatableUpgradeFactor = {};
        newRootUpgradeFactor = {};
        dataWasLoaded = false;
    }

    if (dataWasLoaded) {
        for (const key in newGameData) {
            // only update keys that exist in the default gameData
            if (loadedGameData.hasOwnProperty(key)) {
                const value = newGameData[key];
                if (storage.gameData[key] instanceof Decimal) {
                    loadedGameData[key] = new Decimal(value);
                } else {
                    loadedGameData[key] = value;
                }
            }
        }
        for (const key in newLeafUpgradeFactor) {
            if (loadedLeafUpgradeFactor.hasOwnProperty(key)) {
                const value = newLeafUpgradeFactor[key];
                if (storage.leafUpgradeFactor[key] instanceof Decimal) {
                    loadedLeafUpgradeFactor[key] = new Decimal(value);
                } else {
                    loadedLeafUpgradeFactor[key] = value;
                }
            }
        }
        for (const key in newSeedUpgradeFactor) {
            if (loadedSeedUpgradeFactor.hasOwnProperty(key)) {
                const value = newSeedUpgradeFactor[key];
                if (storage.seedUpgradeFactor[key] instanceof Decimal) {
                    loadedSeedUpgradeFactor[key] = new Decimal(value);
                } else {
                    loadedSeedUpgradeFactor[key] = value;
                }
            }
        }
        for (const key in newFruitUpgradeFactor) {
            if (loadedFruitUpgradeFactor.hasOwnProperty(key)) {
                const value = newFruitUpgradeFactor[key];
                if (storage.fruitUpgradeFactor[key] instanceof Decimal) {
                    loadedFruitUpgradeFactor[key] = new Decimal(value);
                } else {
                    loadedFruitUpgradeFactor[key] = value;
                }
            }
        }
        for (const key in newEntropyUpgradeFactor) {
            if (loadedEntropyUpgradeFactor.hasOwnProperty(key)) {
                const value = newEntropyUpgradeFactor[key];
                if (storage.entropyUpgradeFactor[key] instanceof Decimal) {
                    loadedEntropyUpgradeFactor[key] = new Decimal(value);
                } else {
                    loadedEntropyUpgradeFactor[key] = value;
                }
            }
        }
        for (const key in newCircuits) {
            if (loadedCircuits.hasOwnProperty(key)) {
                const value = newCircuits[key];
                if (automation.circuits[key] instanceof Decimal) {
                    loadedCircuits[key] = new Decimal(value);
                } else {
                    loadedCircuits[key] = value;
                }
            }
        }
        for (const key in newRepeatableUpgradeFactor) {
            if (loadedRepeatableUpgradeFactor.hasOwnProperty(key)) {
                const value = newRepeatableUpgradeFactor[key];
                if (temple.repeatableUpgradeFactor[key] instanceof Decimal) {
                    loadedRepeatableUpgradeFactor[key] = new Decimal(value);
                } else {
                    loadedRepeatableUpgradeFactor[key] = value;
                }
            }
        }
        for (const key in newRootUpgradeFactor) {
            if (loadedRootUpgradeFactor.hasOwnProperty(key)) {
                const value = newRootUpgradeFactor[key];
                if (storage.rootUpgradeFactor[key] instanceof Decimal) {
                    loadedRootUpgradeFactor[key] = new Decimal(value);
                } else {
                    loadedRootUpgradeFactor[key] = value;
                }
            }
        }
    }
    console.log(newRepeatableUpgradeFactor);
    console.log(loadedRepeatableUpgradeFactor);

    storage.updateGameData(loadedGameData);
    storage.updateLeafUpgradeFactor(loadedLeafUpgradeFactor);
    storage.updateSeedUpgradeFactor(loadedSeedUpgradeFactor);
    storage.updateFruitUpgradeFactor(loadedFruitUpgradeFactor);
    storage.updateEntropyUpgradeFactor(loadedEntropyUpgradeFactor);
    automation.loadCircuits(loadedCircuits);
    temple.updateRepeatableUpgradeFactor(loadedRepeatableUpgradeFactor);
    storage.updateRootUpgradeFactor(loadedRootUpgradeFactor);

    storage.updateUpgradeCount();
    if (hasInitialized) {
        updateAchievements(newAchievements, newSecretAchievements);
        console.log("boom");
    }

    if (dataWasLoaded) {
        console.log('Game data successfully loaded!');
        storage.gameLoadedTextAnimation();

        //horrible method of checking if buttons have been clicked on loading a save
        //I could not think of a better way that wouldn't have me rewriting my entire goddamn codebase
        storage.laggyAnusFunction();
        storage.updateGUIBasedOnAchievements();
        if (!hasInitialized) {
            hasInitialized = true;
        }
    } else {
        console.log('No save data found or data was invalid. Initializing with default game state.');
    }


    gameLoading = false;
}

export async function copySaveFileToClipboard() {
    let textToCopy = exportString;
    try {
        await navigator.clipboard.writeText(textToCopy);
        console.log('Text copied to clipboard: ' + textToCopy);
        document.getElementById('exportSave').innerHTML = 'Copied to clipboard!';
        setTimeout(() => {document.getElementById('exportSave').innerHTML = 'Export Save';}, 1000);
    } catch (err) {
        console.error('Failed to copy text: ' + err);
    }
}

function saveInterval() {
    window.setInterval(saveLoop, 60000);
}
setTimeout(saveInterval, 60000);

function loadSaveButActually() {
    //I have no idea why I have to do this but if you only call the function once it doesn't work
    loadSave();
    loadSave();
}

document.getElementById("saveManually").addEventListener("click", saveLoop);
document.getElementById("loadSave").addEventListener("click", loadSaveButActually);
document.getElementById("exportSave").addEventListener("click", copySaveFileToClipboard);

document.addEventListener('DOMContentLoaded', () => {
	sleep(100);
	const resettingGame = localStorage.getItem("resettingGame");
	console.info(resettingGame);
	
	if (!(resettingGame === "true")) {
		loadSaveButActually();
		leafUpgrades.L1();
	}
	storage.gameData.resettingGame = false;
	localStorage.setItem("resettingGame", JSON.stringify(storage.gameData.resettingGame));
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const resetButton = document.getElementById('resetSave');
export async function resetButtonUpdater() {
	if (!storage.gameData.resetButtonHeld) {
		resetButton.innerHTML = `Reset your progress<br>0 / 10s of button being held`;
		return;
	}
	const x = storage.gameData.ticksToProcess;
	storage.gameData.resetDataCounter = storage.gameData.resetDataCounter.plus(x);
	resetButton.innerHTML = `Reset your progress<br>${storage.truncateToDecimalPlaces(storage.gameData.resetDataCounter, 3)} / 10s of button being held`;
	
	if (storage.gameData.resetDataCounter.greaterThanOrEqualTo(new Decimal(10))) {
		storage.gameData.resettingGame = true;
		storage.gameData.resetDataCounter = new Decimal(0);
		storage.gameData.resetButtonHeld = false;
		localStorage.setItem("resettingGame", true);
		saveLoop();
		sleep(100);
		window.location.reload();
	}
}
resetButton.addEventListener('mousedown', function() {
    storage.gameData.resetButtonHeld = true;
    console.info(`Dangerous game we're playing here`);
	storage.gameData.resetDataCounter = new Decimal(0);
});

resetButton.addEventListener('mouseup', function() {
    if (storage.gameData.resetButtonHeld) {
        storage.gameData.resetButtonHeld = false;
        console.info(`Changed your mind, haven't you?`);
		storage.gameData.resetDataCounter = new Decimal(0);
    }
});

resetButton.addEventListener('mouseleave', function() {
    if (storage.gameData.resetButtonHeld) {
        storage.gameData.resetButtonHeld = false;
        console.info(`Oop! Caught you flinch!`);
		storage.gameData.resetDataCounter = new Decimal(0);
    }
});
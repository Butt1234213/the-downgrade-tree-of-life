import * as storage from './core/bunchobullshit.mjs';
import { achievements, secretAchievements, updateAchievements } from './achievements.mjs';

export var gameLoading = false;
export var hasInitialized = false;

var temporaryGameData = {};
var temporaryLeafUpgradeFactor = {};
var temporarySeedUpgradeFactor = {};
var temporaryFruitUpgradeFactor = {};
var temporaryAchievements = {};
var temporarySecretAchievements = {};
var gameDataKeys = [];
var leafUpgradeFactorKeys = [];
var seedUpgradeFactorKeys = [];
var fruitUpgradeFactorKeys = [];

var exportString = "";
var exportStrings = [];

loadSave();

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
    if (achievements !== undefined && !gameLoading) {
        temporaryAchievements = achievements;
        localStorage.setItem("achievements", JSON.stringify(temporaryAchievements));
    }
    if (secretAchievements !== undefined && !gameLoading) {
        temporarySecretAchievements = secretAchievements;
        localStorage.setItem("secretAchievements", JSON.stringify(temporarySecretAchievements));
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
    " " + localStorage.getItem("achievements") + 
    " " + localStorage.getItem("secretAchievements");

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

    const gameDataString = localStorage.getItem("gameData");
    const leafUpgradeFactorString = localStorage.getItem("leafUpgradeFactor");
    const seedUpgradeFactorString = localStorage.getItem("seedUpgradeFactor");
    const fruitUpgradeFactorString = localStorage.getItem("fruitUpgradeFactor");
    const achievementsString = localStorage.getItem("achievements");
    const secretAchievementsString = localStorage.getItem("secretAchievements");

    let newGameData = {};
    let newLeafUpgradeFactor = {};
    let newSeedUpgradeFactor = {};
    let newFruitUpgradeFactor = {};
    let newAchievements = {};
    let newSecretAchievements = {};

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
        if (achievementsString) {
            newAchievements = JSON.parse(achievementsString);
        }
        if (secretAchievementsString) {
            newSecretAchievements = JSON.parse(secretAchievementsString);
        }
    } catch (error) {
        console.error("Failed to parse save data. Resetting to defaults.", error);
        newGameData = {};
        newLeafUpgradeFactor = {};
        newSeedUpgradeFactor = {};
        newFruitUpgradeFactor = {};
        newAchievements = {};
        newSecretAchievements = {};
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
    }

    storage.updateGameData(loadedGameData);
    storage.updateLeafUpgradeFactor(loadedLeafUpgradeFactor);
    storage.updateSeedUpgradeFactor(loadedSeedUpgradeFactor);
    storage.updateFruitUpgradeFactor(loadedFruitUpgradeFactor);
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

window.setInterval(saveLoop, 60000);
import * as storage from './bunchobullshit.mjs';
import { achievements, updateAchievements } from './achievements.mjs';

export var gameLoading = false;
export var hasInitialized = false;

var temporaryGameData = {};
var temporaryLeafUpgradeFactor = {};
var temporarySeedUpgradeFactor = {};
var temporaryFruitUpgradeFactor = {};
var temporaryAchievements = {};
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

    exportString = 
    " " + localStorage.getItem("gameData") + 
    " " + gameDataKeys.toString() + 
    " " + localStorage.getItem("leafUpgradeFactor") +
    " " + leafUpgradeFactorKeys.toString() + 
    " " + localStorage.getItem("seedUpgradeFactor") +
    " " + seedUpgradeFactorKeys.toString() + 
    " " + localStorage.getItem("fruitUpgradeFactor") +
    " " + fruitUpgradeFactorKeys.toString() + 
    " " + localStorage.getItem("achievements");

    exportStrings = exportString.split(" ");
    exportStrings.splice(0, 1);
    console.log('Saved to localStorage');
    storage.gameSavedTextAnimation();
}

export function loadSave() {
    gameLoading = true;
    console.log('Attempting to load save data from localStorage');

    const gameDataString = localStorage.getItem("gameData");
    const leafUpgradeFactorString = localStorage.getItem("leafUpgradeFactor");
    const seedUpgradeFactorString = localStorage.getItem("seedUpgradeFactor");
    const fruitUpgradeFactorString = localStorage.getItem("fruitUpgradeFactor");
    const achievementsString = localStorage.getItem("achievements");

    let newGameData = {};
    let newLeafUpgradeFactor = {};
    let newSeedUpgradeFactor = {};
    let newFruitUpgradeFactor = {};
    let newAchievements = {};

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
    } catch (error) {
        console.error("Failed to parse save data. Resetting to defaults.", error);
        newGameData = {};
        newLeafUpgradeFactor = {};
        newSeedUpgradeFactor = {};
        newFruitUpgradeFactor = {};
        newAchievements = {};
        dataWasLoaded = false;
    }

    // This uses the data gathered from saveLoop() or if it is busted it uses the default data defined in bunchobullshit.mjs
    const gameDataToUse = Object.keys(newGameData).length > 0 ? newGameData : storage.gameData;
    const leafUpgradeFactorToUse = Object.keys(newLeafUpgradeFactor).length > 0 ? newLeafUpgradeFactor : storage.leafUpgradeFactor;
    const seedUpgradeFactorToUse = Object.keys(newSeedUpgradeFactor).length > 0 ? newSeedUpgradeFactor : storage.seedUpgradeFactor;
    const fruitUpgradeFactorToUse = Object.keys(newFruitUpgradeFactor).length > 0 ? newFruitUpgradeFactor : storage.fruitUpgradeFactor;
    const achievementsToUse = Object.keys(newAchievements).length > 0 ? newAchievements : achievements;

    // magic
    const convertToDecimals = (dataObject) => {
        const converted = { ...dataObject };
        Object.keys(converted).forEach(key => {
            const value = converted[key];
            if (typeof value === 'string' || typeof value === 'number') {
                converted[key] = new Decimal(value);
            }
        });
        return converted;
    };

    const finalGameData = convertToDecimals(gameDataToUse);
    const finalLeafUpgradeFactor = convertToDecimals(leafUpgradeFactorToUse);
    const finalSeedUpgradeFactor = convertToDecimals(seedUpgradeFactorToUse);
    const finalFruitUpgradeFactor = convertToDecimals(fruitUpgradeFactorToUse);

    storage.updateGameData(finalGameData);
    storage.updateLeafUpgradeFactor(finalLeafUpgradeFactor);
    storage.updateSeedUpgradeFactor(finalSeedUpgradeFactor);
    storage.updateFruitUpgradeFactor(finalFruitUpgradeFactor);
    updateAchievements(achievementsToUse);

    if (dataWasLoaded) {
        console.log('Game data successfully loaded');
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
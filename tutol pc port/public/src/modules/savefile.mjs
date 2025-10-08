import * as storage from './bunchobullshit.mjs'

var temporaryGameData = {};
var temporaryLeafUpgradeFactor = {};
var temporarySeedUpgradeFactor = {};
var temporaryFruitUpgradeFactor = {};
var gameDataKeys = [];
var leafUpgradeFactorKeys = [];
var seedUpgradeFactorKeys = [];
var fruitUpgradeFactorKeys = [];

var exportString = "";
var exportStrings = [];

export function saveLoop() {
    if (storage.gameData !== undefined) {
        temporaryGameData = storage.gameData;
        console.log(temporaryGameData); 
        gameDataKeys = [];
        console.log(gameDataKeys.length);

        Object.entries(temporaryGameData).forEach(([key, value]) => {
            if (value instanceof Decimal) {
                gameDataKeys.push(key);
                console.log(gameDataKeys);
            }
        });
    }
    if (storage.leafUpgradeFactor !== undefined) {
        temporaryLeafUpgradeFactor = storage.leafUpgradeFactor;
        console.log(temporaryLeafUpgradeFactor); 
        leafUpgradeFactorKeys = [];
        console.log(leafUpgradeFactorKeys.length);

        Object.entries(temporaryLeafUpgradeFactor).forEach(([key, value]) => {
            if (value instanceof Decimal) {
                leafUpgradeFactorKeys.push(key);
                console.log(leafUpgradeFactorKeys);
            }
        });
    }
    if (storage.seedUpgradeFactor !== undefined) {
        temporarySeedUpgradeFactor = storage.seedUpgradeFactor;
        console.log(temporarySeedUpgradeFactor); 
        seedUpgradeFactorKeys = [];
        console.log(seedUpgradeFactorKeys.length);

        Object.entries(temporarySeedUpgradeFactor).forEach(([key, value]) => {
            if (value instanceof Decimal) {
                seedUpgradeFactorKeys.push(key);
                console.log(seedUpgradeFactorKeys);
            }
        });
    }
    if (storage.fruitUpgradeFactor !== undefined) {
        temporaryFruitUpgradeFactor = storage.fruitUpgradeFactor;
        console.log(temporaryFruitUpgradeFactor); 
        fruitUpgradeFactorKeys = [];
        console.log(fruitUpgradeFactorKeys.length);

        Object.entries(temporaryFruitUpgradeFactor).forEach(([key, value]) => {
            if (value instanceof Decimal) {
                fruitUpgradeFactorKeys.push(key);
                console.log(fruitUpgradeFactorKeys);
            }
        });
    }


    localStorage.setItem("gameData", JSON.stringify(temporaryGameData));
    console.log(localStorage.getItem("gameData"));
    localStorage.setItem("leafUpgradeFactor", JSON.stringify(temporaryLeafUpgradeFactor));
    console.log(localStorage.getItem("leafUpgradeFactor"));
    localStorage.setItem("seedUpgradeFactor", JSON.stringify(temporarySeedUpgradeFactor));
    console.log(localStorage.getItem("seedUpgradeFactor"));
    localStorage.setItem("fruitUpgradeFactor", JSON.stringify(temporaryFruitUpgradeFactor));
    console.log(localStorage.getItem("fruitUpgradeFactor"));
    console.log('localStorage has set all of the items');

    exportString = 
    " " + localStorage.getItem("gameData") + 
    " " + gameDataKeys.toString() + 
    " " + localStorage.getItem("leafUpgradeFactor") +
    " " + leafUpgradeFactorKeys.toString() + 
    " " + localStorage.getItem("seedUpgradeFactor") +
    " " + seedUpgradeFactorKeys.toString() + 
    " " + localStorage.getItem("fruitUpgradeFactor") +
    " " + fruitUpgradeFactorKeys.toString();

    exportStrings = exportString.split(" ");
    exportStrings.splice(0, 1);
    console.log(exportStrings);

    storage.gameSavedTextAnimation();
}

export function loadSave() {
    let newGameData = JSON.parse(localStorage.getItem("gameData"))
    gameDataKeys.forEach(key => {
        if (newGameData.hasOwnProperty(key)) {
            newGameData[key] = new Decimal(newGameData[key]);
            console.log(newGameData[key])
        }
    });
    let newLeafUpgradeFactor = JSON.parse(localStorage.getItem("leafUpgradeFactor"))
    leafUpgradeFactorKeys.forEach(key => {
        if (newLeafUpgradeFactor.hasOwnProperty(key)) {
            newLeafUpgradeFactor[key] = new Decimal(newLeafUpgradeFactor[key]);
            console.log(newLeafUpgradeFactor[key])
        }
    });
    let newSeedUpgradeFactor = JSON.parse(localStorage.getItem("seedUpgradeFactor"))
    seedUpgradeFactorKeys.forEach(key => {
        if (newSeedUpgradeFactor.hasOwnProperty(key)) {
            newSeedUpgradeFactor[key] = new Decimal(newSeedUpgradeFactor[key]);
            console.log(newSeedUpgradeFactor[key])
        }
    });
    let newFruitUpgradeFactor = JSON.parse(localStorage.getItem("fruitUpgradeFactor"))
    fruitUpgradeFactorKeys.forEach(key => {
        if (newFruitUpgradeFactor.hasOwnProperty(key)) {
            newFruitUpgradeFactor[key] = new Decimal(newFruitUpgradeFactor[key]);
            console.log(newFruitUpgradeFactor[key])
        }
    });
    if (newGameData !== null) {storage.updateGameData(newGameData)}
    if (newLeafUpgradeFactor !== null) {storage.updateLeafUpgradeFactor(newLeafUpgradeFactor)}
    if (newSeedUpgradeFactor !== null) {storage.updateSeedUpgradeFactor(newSeedUpgradeFactor)}
    if (newFruitUpgradeFactor !== null) {storage.updateFruitUpgradeFactor(newFruitUpgradeFactor)}

    storage.gameLoadedTextAnimation();
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

window.setInterval(saveLoop(), 60000);
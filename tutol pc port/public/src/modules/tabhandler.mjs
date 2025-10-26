import { decompolize, harvest, transform } from './core/bunchobullshit.mjs'
import { createApp, ref } from 'vue'
import * as leafUpgrades from './leafupgrades.mjs';
import * as seedUpgrades from './seedupgrades.mjs';
import * as fruitUpgrades from './fruitupgrades.mjs';
import { saveLoop, loadSave, copySaveFileToClipboard } from './savefile.mjs';

export function tab(tab, tabObject) {
    document.getElementById('buttons-lu').style.display = 'none';
    document.getElementById('buttons-su').style.display = 'none';
    document.getElementById('buttons-fu').style.display = 'none';
    document.getElementById('fruit-tabs').style.display = 'none';
    document.getElementById('buttons-composter').style.display = 'none';
    document.getElementById('buttons-moss').style.display = 'none';
    document.getElementById('buttons-eu').style.display = 'none';
    document.getElementById('achievements').style.display = 'none';
    document.getElementById('secretAchievementsContainer').style.display = 'none';
    document.getElementById('achievement-tabs').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
    document.getElementById('leafTab').style.borderWidth = '2px';
    document.getElementById('seedTab').style.borderWidth = '2px';
    document.getElementById('fruitTab').style.borderWidth = '2px';
    document.getElementById('composterTab').style.borderWidth = '2px';
    document.getElementById('mossTab').style.borderWidth = '2px';
    document.getElementById('entropyTab').style.borderWidth = '2px';
    document.getElementById('achievementTab').style.borderWidth = '2px';
    document.getElementById('regularAchievements').style.borderWidth = '2px';
    document.getElementById('secretAchievements').style.borderWidth = '2px';
    document.getElementById('settingsTab').style.borderWidth = '2px';
    document.getElementById(tab).style.display = 'inline-block';
    document.getElementById(tabObject).style.borderWidth = '5px';
}

function loadLeafTab() {
    tab('buttons-lu', 'leafTab');
    console.log("loadLeafTab has been called");
}
function loadSeedTab() {
    tab('buttons-su', 'seedTab');
    console.log("loadSeedTab has been called");
}
function loadFruitTab() {
    tab('buttons-fu', 'fruitTab');
    document.getElementById('fruit-tabs').style.display = 'inline-block';
    console.log("loadFruitTab has been called");
}
function loadComposterTab() {
    tab('buttons-composter', 'composterTab')
    document.getElementById('fruit-tabs').style.display = 'inline-block';
    console.log("loadComposterTab has been called");
}
function loadMossTab() {
    tab('buttons-moss', 'mossTab')
    document.getElementById('fruit-tabs').style.display = 'inline-block';
    console.log("loadMossTab has been called");
}
function loadEntropyTab() {
    tab('buttons-eu', 'entropyTab');
    console.log("loadEntropyTab has been called");
}
function loadAchTab () {
    tab('achievements', 'achievementTab');
    document.getElementById('achievement-tabs').style.display = 'inline-block';
    document.getElementById('regularAchievements').style.borderWidth = '5px';
    console.log("loadAchTab has been called");
}
function loadSecretAchTab() {
    tab('secretAchievementsContainer', 'secretAchievements');
    document.getElementById('achievement-tabs').style.display = 'inline-block';
    document.getElementById('regularAchievements').style.borderWidth = '2px';
    document.getElementById('achievementTab').style.borderWidth = '5px';
    console.log("loadSecretAchTab has been called");
}
function loadSettingsTab () {
    tab('settings', 'settingsTab');
    console.log("loadSettingsTab has been called");
    document.getElementById("saveManually").addEventListener("click", saveLoop);
    document.getElementById("loadSave").addEventListener("click", loadSave);
    document.getElementById("exportSave").addEventListener("click", copySaveFileToClipboard);
}

document.getElementById("leafTab").addEventListener("click", loadLeafTab);
document.getElementById("seedTab").addEventListener("click", loadSeedTab);
document.getElementById("fruitTab").addEventListener("click", loadFruitTab);
document.getElementById("composterTab").addEventListener("click", loadComposterTab);
document.getElementById("mossTab").addEventListener("click", loadMossTab);
document.getElementById("entropyTab").addEventListener("click", loadEntropyTab);
document.getElementById("achievementTab").addEventListener("click", loadAchTab);
document.getElementById("settingsTab").addEventListener("click", loadSettingsTab);
document.getElementById("regularAchievements").addEventListener("click", loadAchTab);
document.getElementById("secretAchievements").addEventListener("click", loadSecretAchTab);
loadLeafTab();

document.getElementById("decompolize").addEventListener("click", decompolize);
document.getElementById("harvest").addEventListener("click", harvest);
document.getElementById("entropyResetButton").addEventListener("click", transform);
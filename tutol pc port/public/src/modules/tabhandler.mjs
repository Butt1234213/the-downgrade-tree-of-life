import { decompolize, harvest } from './bunchobullshit.mjs'
import { createApp, ref } from 'vue'
import * as leafUpgrades from './leafupgrades.mjs';
import * as seedUpgrades from './seedupgrades.mjs';
import * as fruitUpgrades from './fruitupgrades.mjs';
import { saveLoop, loadSave, copySaveFileToClipboard } from './savefile.mjs';

export function tab(tab, tabObject) {
    document.getElementById('buttons-lu').style.display = 'none';
    document.getElementById('buttons-su').style.display = 'none';
    document.getElementById('buttons-fu').style.display = 'none';
    document.getElementById('buttons-composter').style.display = 'none';
    document.getElementById('achievements').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
    document.getElementById('leafTab').style.borderWidth = '2px';
    document.getElementById('seedTab').style.borderWidth = '2px';
    document.getElementById('fruitTab').style.borderWidth = '2px';
    document.getElementById('composterTab').style.borderWidth = '2px';
    document.getElementById('achievementTab').style.borderWidth = '2px';
    document.getElementById('settingsTab').style.borderWidth = '2px';
    document.getElementById(tab).style.display = 'inline-block';
    document.getElementById(tabObject).style.borderWidth = '5px';
}

function loadLeafTab() {
    tab('buttons-lu', 'leafTab');
    console.log("loadLeafTab has been called");
    document.getElementById("L1").addEventListener("click", leafUpgrades.startGeneration);
    document.getElementById("L2").addEventListener("click", leafUpgrades.L2);
    document.getElementById("L3").addEventListener("click", leafUpgrades.L3);
    document.getElementById("L4").addEventListener("click", leafUpgrades.L4);
    document.getElementById("L5").addEventListener("click", leafUpgrades.L5);
    document.getElementById("L6").addEventListener("click", leafUpgrades.L6);
    document.getElementById("L7").addEventListener("click", leafUpgrades.L7);
    document.getElementById("L8").addEventListener("click", leafUpgrades.L8);
    document.getElementById("L9").addEventListener("click", leafUpgrades.L9);
    document.getElementById("L10").addEventListener("click", leafUpgrades.L10);
    document.getElementById("L11").addEventListener("click", leafUpgrades.L11);
    document.getElementById("L12").addEventListener("click", leafUpgrades.L12);
    document.getElementById("L13").addEventListener("click", leafUpgrades.L13);
    document.getElementById("L14").addEventListener("click", leafUpgrades.L14);
    document.getElementById("L15").addEventListener("click", leafUpgrades.L15);
    document.getElementById("L16").addEventListener("click", leafUpgrades.L16);
    document.getElementById("L17").addEventListener("click", leafUpgrades.L17);
}
function loadSeedTab() {
    tab('buttons-su', 'seedTab');
    console.log("loadSeedTab has been called");
    document.getElementById("S1").addEventListener("click", seedUpgrades.S1);
    document.getElementById("S2").addEventListener("click", seedUpgrades.S2);
    document.getElementById("S3").addEventListener("click", seedUpgrades.S3);
    document.getElementById("S4").addEventListener("click", seedUpgrades.S4);
    document.getElementById("S5").addEventListener("click", seedUpgrades.S5);
    document.getElementById("S6").addEventListener("click", seedUpgrades.S6);
    document.getElementById("S7").addEventListener("click", seedUpgrades.S7);
    document.getElementById("S8").addEventListener("click", seedUpgrades.S8);
}
function loadFruitTab() {
    tab('buttons-fu', 'fruitTab');
    console.log("loadFruitTab has been called");
    document.getElementById("F1").addEventListener("click", fruitUpgrades.F1);
}
function loadComposterTab() {
    tab('buttons-composter', 'composterTab')
}
function loadAchTab () {
    tab('achievements', 'achievementTab');
    console.log("loadAchTab has been called");
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
document.getElementById("achievementTab").addEventListener("click", loadAchTab);
document.getElementById("settingsTab").addEventListener("click", loadSettingsTab);
loadLeafTab();

document.getElementById("decompolize").addEventListener("click", decompolize);
document.getElementById("harvest").addEventListener("click", harvest);
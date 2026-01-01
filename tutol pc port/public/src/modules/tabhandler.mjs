import { decompolize, harvest, transform, reinforce } from './core/bunchobullshit.mjs'
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
    document.getElementById('buttons-composter-total').style.display = 'none';
    document.getElementById('buttons-moss').style.display = 'none';
    document.getElementById('buttons-eu').style.display = 'none';
    document.getElementById('entropy-tabs').style.display = 'none';
    document.getElementById('buttons-cellular-lab').style.display = 'none';
    document.getElementById('buttons-bacteria').style.display = 'none';
    document.getElementById('buttons-radar').style.display = 'none';
    document.getElementById('buttons-protein').style.display = 'none';
    document.getElementById('buttons-temple').style.display = 'none';
    document.getElementById('buttons-rou').style.display = 'none';
    document.getElementById('root-tabs').style.display = 'none';
    document.getElementById('buttons-root-milestone').style.display = 'none';
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
    document.getElementById('cellularLabTab').style.borderWidth = '2px';
    document.getElementById('bacteriaTab').style.borderWidth = '2px';
    document.getElementById('radarTab').style.borderWidth = '2px';
    document.getElementById('proteinTab').style.borderWidth = '2px';
    document.getElementById('templeTab').style.borderWidth = '2px';
    document.getElementById('rootTab').style.borderWidth = '2px';
    document.getElementById('rootMilestoneTab').style.borderWidth = '2px';
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
    document.querySelector('.buttons-composter-total').style.display = 'inline-block';
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
    document.getElementById('entropy-tabs').style.display = 'inline-block';
    console.log("loadEntropyTab has been called");
}
function loadCellularLabTab() {
    tab('buttons-cellular-lab', 'cellularLabTab');
    document.getElementById('entropy-tabs').style.display = 'inline-block';
    console.log("loadCellularLabTab has been called");
}
function loadBacteriaTab() {
    tab('buttons-bacteria', 'bacteriaTab');
    document.getElementById('entropy-tabs').style.display = 'inline-block';
    console.log("loadBacteriaTab has been called");
}
function loadRadarTab() {
    tab('buttons-radar', 'radarTab');
    document.getElementById('entropy-tabs').style.display = 'inline-block';
    console.log("loadRadarTab has been called");
}
function loadProteinTab() {
    tab('buttons-protein', 'proteinTab');
    document.getElementById('entropy-tabs').style.display = 'inline-block';
    console.log("loadProteinTab has been called");
}
function loadTempleTab() {
    tab('buttons-temple', 'templeTab');
    console.log("loadTempleTab has been called");
}
function loadRootTab() {
    tab('buttons-rou', 'rootTab');
    document.getElementById('root-tabs').style.display = 'inline-block';
    console.log("loadRootTab has been called");
}
function loadRootMilestoneTab() {
    tab('buttons-root-milestone', 'rootMilestoneTab');
    document.getElementById('root-tabs').style.display = 'inline-block';
    console.log("loadRootMilestoneTab has been called");
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
}

document.getElementById("leafTab").addEventListener("click", loadLeafTab);
document.getElementById("seedTab").addEventListener("click", loadSeedTab);
document.getElementById("fruitTab").addEventListener("click", loadFruitTab);
document.getElementById("composterTab").addEventListener("click", loadComposterTab);
document.getElementById("mossTab").addEventListener("click", loadMossTab);
document.getElementById("entropyTab").addEventListener("click", loadEntropyTab);
document.getElementById("cellularLabTab").addEventListener("click", loadCellularLabTab);
document.getElementById("bacteriaTab").addEventListener("click", loadBacteriaTab);
document.getElementById("radarTab").addEventListener("click", loadRadarTab);
document.getElementById("proteinTab").addEventListener("click", loadProteinTab);
document.getElementById("templeTab").addEventListener("click", loadTempleTab);
document.getElementById("rootTab").addEventListener("click", loadRootTab);
document.getElementById("rootMilestoneTab").addEventListener("click", loadRootMilestoneTab);
document.getElementById("achievementTab").addEventListener("click", loadAchTab);
document.getElementById("settingsTab").addEventListener("click", loadSettingsTab);
document.getElementById("regularAchievements").addEventListener("click", loadAchTab);
document.getElementById("secretAchievements").addEventListener("click", loadSecretAchTab);
loadLeafTab();

document.getElementById("decompolize").addEventListener("click", decompolize);
document.getElementById("harvest").addEventListener("click", harvest);
document.getElementById("entropyResetButton").addEventListener("click", transform);
document.getElementById("reinforce").addEventListener("click", reinforce);
import { tab, decompolize } from './bunchobullshit.mjs'
import * as leafUpgrades from './leafupgrades.mjs';
import * as seedUpgrades from './seedupgrades.mjs';

function loadLeafTab () {
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
}
function loadSeedTab () {
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

document.getElementById("seedTab").addEventListener("click", loadSeedTab);
document.getElementById("leafTab").addEventListener("click", loadLeafTab);
loadLeafTab();

document.getElementById("decompolize").addEventListener("click", decompolize);
import {gameData} from './gameloop.js';

document.getElementById("L1").disabled = false;

const leafUpgradeCost = {
    LU1: 10
}

function L1() {
  if (gameData.leaves >= leafUpgradeCost.LU1) {
    gameData.leaves -= leafUpgradeCost.LU1;
    gameData.leavesPerTick += 1;
    document.getElementById("pleaseWork").innerHTML = gameData.leaves + " Leaves";
    document.getElementById("L1").innerHTML = "Grow I (Bought) <br> x2 Leaves <br> Cost: " + leafUpgradeCost.LU1 + " Leaves";
    document.getElementById("L1").disabled = true;
  }
}
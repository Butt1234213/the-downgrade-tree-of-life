export var gameData = {
 lastUpdate: Date.now(),
 leaves: 0,
 leavesPerTick: 0,
 tickSpeedMultiplier: 0,
 treeAge: 0,
 treeAgePerTick: 0,
 gameStarted: false,

 refreshRate: 10
}

export const leafUpgradeCost = {
    LU2: 10,
    LU3: 35,
    LU4: 150
}

export var leafUpgradeFactor = {
    L4: 1,
    L4Bought: false,
    L4AtUpgradeBought: 1,
    L4Amt: 10

}


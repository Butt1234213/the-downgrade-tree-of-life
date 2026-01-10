import { achievements, secretAchievements, massAchievementChecker, massSecretAchievementChecker } from '../achievements.mjs';
import * as leafUpgrades from '../leafupgrades.mjs';
import * as seedUpgrades from '../seedupgrades.mjs';
import * as fruitUpgrades from '../fruitupgrades.mjs';
import * as entropyUpgrades from '../entropyupgrades.mjs';
import * as rootUpgrades from '../rootupgrades.mjs';
import * as composter from '../composter.mjs';
import { hasInitialized } from '../savefile.mjs';
import { automateLeafUpgrades, circuits } from '../automation.mjs';
import * as upgradeBuilder from './upgradebuilder.mjs';
import * as moss from '../moss.mjs';
import * as challenges from '../radar.mjs';
import * as temple from '../temple.mjs';

export var gameData = {
    lastUpdate: new Decimal(Date.now()),
    resetDataCounter: new Decimal(0),
    resetButtonHeld: false,
	resettingGame: false,
    totalUpgradeCounter: new Decimal(0),

    leaves: new Decimal(0),
    baseLeafSoftcapFactor: new Decimal(0.75),
    leavesIsSoftcapped: false,
    leavesIsSoftcapped2: false,
    leavesIsSoftcapped3: false,
    leavesIsSoftcapped4: false,
    leavesIsSoftcapped5: false,
	baseLeafSupercapFactor: new Decimal(1),
	leavesIsSupercapped: false,
    leavesPerTick: new Decimal(0),
    tickSpeedMultiplier: new Decimal(0),
    treeAge: new Decimal(0),
    treeAgePerTick: new Decimal(0),
    gameSpeed: new Decimal(1),
    gameStarted: false,
    ticksToProcess: new Decimal(0),

    cheaterMult: new Decimal(1),

    leafUpgradeCounter: new Decimal(0),

    leafSoftcapStart: new Decimal(1e20),
    leafSoftcap2Start: new Decimal(1.79e308),
    leafSoftcap3Start: new Decimal.fromComponents(1, 1, 500),
    leafSoftcap4Start: new Decimal.fromComponents(1, 1, 1000),
    leafSoftcap5Start: new Decimal.fromComponents(1, 1, 2000),
	leafSupercapStart: new Decimal.fromComponents(1, 1, 2466.03342),

    baseSeedFactor: new Decimal(1e7),
    seedsSoftcap: new Decimal(1),
    baseSeedSoftcapFactor: new Decimal(0.75),
    visualSeedFactor: new Decimal(1e7),
    seedChecker: true,
    seedQuotient: new Decimal(0),
    baseSeedQuotient: new Decimal(0),
    canDecompolize: false,
    seeds: new Decimal(0),
	
    seedSoftcapStart: new Decimal.fromComponents(1, 1, 100),
    seedSoftcap2Start: new Decimal.fromComponents(1, 1, 2000),
	seedSupercapStart: new Decimal.fromComponents(1, 1, 2466.03342),
    currentSeedsOnDecompolize: new Decimal(0),
    highestSeedsOnDecompolize: new Decimal(0),
    seedsOnDecompolize: new Decimal(0),
    seedsMult: new Decimal(1),
    seedUpgradeCounter: new Decimal(0),
    seedsIsSoftcapped: false,
    seedsIsSoftcapped2: false,
	baseSeedSupercapFactor: new Decimal(1),
	seedsIsSupercapped: false,

    leavesStartingPerTick: new Decimal(1),

    fruits: new Decimal(0),
    fruitsMult: new Decimal(1),
    baseFruitSoftcapFactor: new Decimal(0.75),
    fruitsOnHarvest: new Decimal(0),
    canHarvest: false,
    fruitsIsSoftcapped: false,
	baseFruitSupercapFactor: new Decimal(1),
	fruitsIsSupercapped: false,

    fruitUpgradeCounter: new Decimal(0),

    ticksToUpdateComposter: new Decimal(0),
    totalFertilizers: new Decimal(0),
    totalComposters: new Decimal(0),
    fertilizerBulk: new Decimal(1),
    compostingSpeed: new Decimal(1),
	composterCostDivision: new Decimal(1),
    composterScalingStart: new Decimal(25),
    composterSuperScalingStart: new Decimal(100),
    composterSuperScalingEffect: new Decimal(1.1),
    compostingSpeedScalingStart: new Decimal(500),
    compostingSpeedSuperScalingStart: new Decimal(1000),

    leafComposterUnlocked: false,
    leafComposterCost: new Decimal(1),
    leafComposterDiscount: new Decimal(1),
    leafComposterAmount: new Decimal(0),
    leafComposterTime: new Decimal(500),
    leafComposterCount: new Decimal(0),
    freeLeafFertilizers: new Decimal(0),
    leafComposterEffect: new Decimal(1),
    leafComposterIsActive: false,

    seedComposterUnlocked: false,
    seedComposterCost: new Decimal(1),
    seedComposterDiscount: new Decimal(1),
    seedComposterAmount: new Decimal(0),
    seedComposterTime: new Decimal(500),
    seedComposterCount: new Decimal(0),
    freeSeedFertilizers: new Decimal(0),
    seedComposterEffect: new Decimal(1),
    seedComposterIsActive: false,

    fruitComposterUnlocked: false,
    fruitComposterCost: new Decimal(1),
    fruitComposterAmount: new Decimal(0),
    fruitComposterDiscount: new Decimal(1),
    fruitComposterTime: new Decimal(500),
    fruitComposterCount: new Decimal(0),
    freeFruitFertilizers: new Decimal(0),
    fruitComposterEffect: new Decimal(1),
    fruitComposterIsActive: false,
	
    entropyComposterUnlocked: false,
    entropyComposterCost: new Decimal(1),
    entropyComposterAmount: new Decimal(0),
    entropyComposterDiscount: new Decimal(1),
    entropyComposterTime: new Decimal(500),
    entropyComposterCount: new Decimal(0),
    freeEntropyFertilizers: new Decimal(0),
    entropyComposterEffect: new Decimal(1),
    entropyComposterIsActive: false,

    mossUnlocked: false,
	moss: new Decimal(0),
    mossEffect: new Decimal(0),
    mossEffectMultiplier: new Decimal(0),

    potentialEnergy: new Decimal(0),
    potentialEnergyPow: new Decimal(1),
    entropyOnTransform: new Decimal(0),
    canTransform: false,
    entropy: new Decimal(0),
    entropyMult: new Decimal(1),
    totalEntropy: new Decimal(0),

    entropyUpgradeCounter: new Decimal(0),

    cells: new Decimal(0),
    highestCells: new Decimal(0),
    cellsCap: new Decimal(1.79e308),
    cellsInterval: new Decimal(1000),
    intervalDivision: new Decimal(1),
    cellsMult: new Decimal(1),
    cellsIsSoftcapped: false,
    overpopulationFactor: new Decimal(1),
    baseOverpopulationFactor: new Decimal(1),
    cellsReplicationChance: new Decimal(0.01),
    cellsReplicationAmount: new Decimal(1),
	cellsReplicationCap: new Decimal.fromComponents(1, 1, 1000),
    cellsEffectMult: new Decimal(1),
    cellsLeafEffect: new Decimal(1),
    cellsSeedEffect: new Decimal(1),
    cellsFruitEffect: new Decimal(1),
    cellUpgradesBulk: new Decimal(1),
    
    bacteriaTypes: new Decimal(0),
    bacteriaTypesBulk: new Decimal(1),
    bacteria: new Decimal(0),
    bacteriaMult: new Decimal(1),
    bacteriaPow: new Decimal(1),
    bacteriaCap: new Decimal(1),
    bacteriaCapMult: new Decimal(1),
    bacteriaCellsCSMult: new Decimal(1),
    bacteriaFertilizerMult: new Decimal(0),

    highestCircuits: new Decimal(0),
    highestCircuitsTrue: new Decimal(0),
    circuits: new Decimal(0),
    circuitsUsed: new Decimal(0),
    nextCircuit: new Decimal(1e15),

    luAutomationUnlocked: true,
    suAutomationUnlocked: false,
    fuAutomationUnlocked: false,
    euAutomationUnlocked: false,
    rouAutomationUnlocked: false,

    isInChallengeStorm: false,
    stormcapBaseFactor: new Decimal(0.75),
    stormBaseRequirement: new Decimal(1e40),
    stormBestScore: new Decimal(0),
    stormLevel: new Decimal(1),
    stormCompletable: false,

    isInChallengeWildfire: false,
    wildfireBaseFactor: new Decimal(2),
    wildfireBaseRequirement: new Decimal(50),
    wildfireBestScore: new Decimal(0),
    wildfireLevel: new Decimal(1),
    wildfireCompletable: false,
	
    isInChallengeDrought: false,
    droughtBaseFactor: new Decimal(1e-2),
	droughtTimeFactor: new Decimal(0),
    droughtBaseRequirement: new Decimal(1e200),
    droughtBestScore: new Decimal(0),
    droughtLevel: new Decimal(1),
    droughtCompletable: false,
	
    isInChallengeBlizzard: false,
    blizzardBasePEFactor: new Decimal(0.075),
	blizzardBaseGameSpeedFactor: new Decimal(1e20),
    blizzardBaseRequirement: new Decimal(5000),
    blizzardBestScore: new Decimal(0),
	blizzardReward: new Decimal(1),
    blizzardLevel: new Decimal(1),
    blizzardCompletable: false,
	
	dna: new Decimal(0),
	dnaBlueprints: new Decimal(0),
	dnaBlueprintsTotal: new Decimal(0),
	dnaBlueprintCap: new Decimal(0),
	fabricating: false,
	dnaBlueprintAmount: new Decimal(0),
	dnaBlueprintTime: new Decimal(60000),
	dnaBlueprintNerf: new Decimal(1),
	rna: new Decimal(0),
	rnaTimeFactor: new Decimal(0),
	
    rootsOnReinforce: new Decimal(0),
    canReinforce: false,
    roots: new Decimal(0),
    rootsMult: new Decimal(1),
    totalRoots: new Decimal(0),
	reinforcements: new Decimal(0),

    rootUpgradeCounter: new Decimal(0),

    refreshRate: 40
}

export var upgradesResetByDecompolization = []

export var upgradesResetByHarvest = []

export var upgradesResetByTransform = []

export var upgradesResetByReinforce = []

document.getElementById("refreshRate").textContent = 40;
document.getElementById("refreshRateCounter").addEventListener("change", updateRefreshRate);

export function updateRefreshRate() {
    let newValue = document.getElementById("refreshRateCounter").value;
    gameData.refreshRate = newValue;
    document.getElementById("refreshRate").textContent = gameData.refreshRate;
}

document.getElementById("cheaterValue").textContent = 1;
document.getElementById("cheaterBox").addEventListener("change", debugMult);

export function debugMult() {
    let newValue = document.getElementById("cheaterBox").value;
    gameData.cheaterMult = gameData.cheaterMult.times(newValue);
    document.getElementById("cheaterValue").textContent = newValue;

    secretAchievements.secret12 = true;
    massSecretAchievementChecker();
}

export var leafUpgradeCost = {
    LU1: new Decimal(0),
    LU2: new Decimal(10),
    LU3: new Decimal(35),
    LU4: new Decimal(150),
    LU5: new Decimal(500),
    LU6: new Decimal(1500),
    LU7: new Decimal(5000),
    LU8: new Decimal(7500),
    LU9: new Decimal(24000),
    LU10: new Decimal(200000),
    LU11: new Decimal(650000),
    LU12: new Decimal(2.25e7),
    LU13: new Decimal(1.75e8),
    LU14: new Decimal(6e10),
    LU15: new Decimal(1e9),
    LU16: new Decimal(4.5e12),
    LU17: new Decimal(1e15),
    LU18: new Decimal(7.5e15),
    LU19: new Decimal(5e17),
    LU20: new Decimal(1e23),
    LU21: new Decimal(1e33),
    LU22: new Decimal(2.5e36),
    LU23: new Decimal(1e39),
    LU24: new Decimal(5e43),
    LU25: new Decimal(5e45),
    LU26: new Decimal(3.5e51),
    LU27: new Decimal(1e57),
    LU28: new Decimal(5e64),
    LU29: new Decimal(1e75),
    LU30: new Decimal(1e100),
    LU31: new Decimal(1e105),
    LU32: new Decimal(1.11e111),
    LU33: new Decimal(2.5e118),
    LU34: new Decimal(1e127),
    LU35: new Decimal(1e137),
    LU36: new Decimal(2e149),
    LU37: new Decimal(2e164),
    LU38: new Decimal(1e190),
    LU39: new Decimal(2.5e231),
    LU40: new Decimal(1e243),
    LU41: new Decimal(1e267),
    LU42: new Decimal(5.25e278),
    LU43: new Decimal(1e291),
    LU44: new Decimal(2e292),
    LU45: new Decimal(4e293),
    LU46: new Decimal(8e294),
    LU47: new Decimal(1.6e296),
    LU48: new Decimal(3.2e297),
    LU49: new Decimal(6.4e298),
    LU50: new Decimal(1.79e308),
    LU51: new Decimal.fromComponents(1, 1, 450),
    LU52: new Decimal.fromComponents(1, 1, 485),
    LU53: new Decimal.fromComponents(1, 1, 500),
    LU54: new Decimal.fromComponents(1, 1, 666.82386),
    LU55: new Decimal.fromComponents(1, 1, 850),
    LU56: new Decimal.fromComponents(1, 1, 940),
    LU57: new Decimal.fromComponents(1, 1, 1379),
    LU58: new Decimal.fromComponents(1, 1, 1500),
    LU59: new Decimal.fromComponents(1, 1, 1781),
    LU60: new Decimal.fromComponents(1, 1, 2000),
    LU61: new Decimal.fromComponents(1, 1, 2750),
    LU62: new Decimal.fromComponents(1, 1, 3008.25285),
    LU63: new Decimal.fromComponents(1, 1, 5000),
    LU64: new Decimal.fromComponents(1, 1, 25000),
}

export var leafUpgradeFactor = {
    L4: new Decimal(1),
    L4AtUpgradeBought: new Decimal(1),
    L4Amt: new Decimal(10),
    L9: new Decimal(1),
    L10: new Decimal(1),
    L10AtUpgradeBought: new Decimal(1),
    L11: new Decimal(1),
    L11Mult: new Decimal(1),
    L11AtUpgradeBought: new Decimal(1),
    L15: new Decimal(1),
    L16: new Decimal(1),
    L16AtUpgradeBought: new Decimal(1),
    L17: new Decimal(1),
    L17AtUpgradeBought: new Decimal(1),
    L22Leaves: new Decimal(1),
    L22Seeds: new Decimal(1),
    L22Fruits: new Decimal(1),
    L28Leaves: new Decimal(1),
    L28Seeds: new Decimal(1),
    L28Fruits: new Decimal(1),
    L30Leaves: new Decimal(1),
    L30Seeds: new Decimal(1),
    L30Fruits: new Decimal(1),
    L34Leaves: new Decimal(1),
    L34Fruits: new Decimal(1),
    L34TAS: new Decimal(1),
    L38Entropy: new Decimal(1),
    L38Leaves: new Decimal(1),
    L38CS: new Decimal(1),
    L42Leaves: new Decimal(1),
    L42Fruits: new Decimal(1),
    L42TAS: new Decimal(1),
}

export var leafAutomationFactor = {}

export var seedUpgradeCost = {
    SU1: new Decimal(1),
    SU2: new Decimal(3),
    SU3: new Decimal(5),
    SU4: new Decimal(35),
    SU5: new Decimal(175),
    SU6: new Decimal(2500),
    SU7: new Decimal(20000),
    SU8: new Decimal(150000),
    SU9: new Decimal(4e6),
    SU10: new Decimal(1e9),
    SU11: new Decimal(1e8),
    SU12: new Decimal(5e8),
    SU13: new Decimal(5e9),
    SU14: new Decimal(1e12),
    SU15: new Decimal(1e13),
    SU16: new Decimal(1e14),
    SU17: new Decimal(1e15),
    SU18: new Decimal(1.5e17),
    SU19: new Decimal(1e19),
    SU20: new Decimal(5e28),
    SU21: new Decimal(1e30),
    SU22: new Decimal(5e31),
    SU23: new Decimal(1e33),
    SU24: new Decimal(1e47),
    SU25: new Decimal(1e50),
    SU26: new Decimal(1e51),
    SU27: new Decimal(1e55),
    SU28: new Decimal(5e64),
    SU29: new Decimal(1e72),
    SU30: new Decimal(1.5e75),
    SU31: new Decimal(5e83),
    SU32: new Decimal(1e94),
    SU33: new Decimal(1e97),
    SU34: new Decimal(1e115),
    SU35: new Decimal(2e123),
    SU36: new Decimal(2.5e146),
    SU37: new Decimal(1e192),
    SU38: new Decimal(1e243),
    SU39: new Decimal(5.5e270),
    SU40: new Decimal.fromComponents(1, 1, 333.52244),
    SU41: new Decimal.fromComponents(1, 1, 430),
    SU42: new Decimal.fromComponents(1, 1, 1000),
    SU43: new Decimal.fromComponents(1, 1, 1270),
    SU44: new Decimal.fromComponents(1, 1, 1322),
    SU45: new Decimal.fromComponents(1, 1, 1459),
    SU46: new Decimal.fromComponents(1, 1, 1500),
    SU47: new Decimal.fromComponents(1, 1, 2000),
    SU48: new Decimal.fromComponents(1, 1, 2222.34635),
    SU49: new Decimal.fromComponents(1, 1, 2466.03342),
    SU50: new Decimal.fromComponents(1, 1, 3008.25285),
    SU51: new Decimal.fromComponents(1, 1, 5000),
    SU52: new Decimal.fromComponents(1, 1, 10000),
}

export var seedUpgradeFactor = {
    S3: new Decimal(0),
    S3OnUpgradeBought: new Decimal(0),
    S3Total: new Decimal(1e7),
    S4: new Decimal(0),
    S4OnUpgradeBought: new Decimal(0),
    S4Total: new Decimal(1),
    S8: new Decimal(1),
    S8OnUpgradeBought: new Decimal(0),
    S9: new Decimal(0),
    S27: new Decimal(1),
    S36: new Decimal(0),
}

export var seedAutomationFactor = {}

export var fruitUpgradeCost = {
    FU1: new Decimal(1),
    FU2: new Decimal(4),
    FU3: new Decimal(9),
    FU4: new Decimal(10),
    FU5: new Decimal(10),
    FU6: new Decimal(15),
    FU7: new Decimal(150),
    FU8: new Decimal(250),
    FU9: new Decimal(400),
    FU10: new Decimal(1000),
    FU11: new Decimal(1500),
    FU12: new Decimal(2000),
    FU13: new Decimal(7000),
    FU14: new Decimal(25000),
    FU15: new Decimal(75000),
    FU16: new Decimal(100000),
    FU17: new Decimal(700000),
    FU18: new Decimal(1e8),
    FU19: new Decimal(2.5e8),
    FU20: new Decimal(1e13),
    FU21: new Decimal(7.5e15),
    FU22: new Decimal(5e16),
    FU23: new Decimal(1.28e21),
    FU24: new Decimal(1e22),
    FU25: new Decimal(5e27),
    FU26: new Decimal(2e33),
    FU27: new Decimal(2e37),
    FU28: new Decimal(7.5e45),
    FU29: new Decimal(1e61),
    FU30: new Decimal(3.5e89),
    FU31: new Decimal(1e100),
    FU32: new Decimal(1e110),
    FU33: new Decimal(1.28e128),
    FU34: new Decimal(1.41e141),
    FU35: new Decimal(3.5e165),
    FU36: new Decimal(1e281),
    FU37: new Decimal.fromComponents(1, 1, 370),
    FU38: new Decimal.fromComponents(1, 1, 500),
    FU39: new Decimal.fromComponents(1, 1, 600),
    FU40: new Decimal.fromComponents(1, 1, 750),
    FU41: new Decimal.fromComponents(1, 1, 1000),
    FU42: new Decimal.fromComponents(1, 1, 1222.07918),
    FU43: new Decimal.fromComponents(1, 1, 1500),
    FU44: new Decimal.fromComponents(1, 1, 1600),
    FU45: new Decimal.fromComponents(1, 1, 3008.25285),
    FU46: new Decimal.fromComponents(1, 1, 6666.82386),
}

export var fruitUpgradeFactor = {
    F3: new Decimal(0),
    F5: new Decimal(1),
    F20: new Decimal(1),
    M1: new Decimal(0),
	M1EffectMult: new Decimal(1),
    M2: new Decimal(0),
    M3: new Decimal(0),
	M3EffectMult: new Decimal(1),
    M4: new Decimal(0),
    M5: new Decimal(0),
    M6: new Decimal(0),
}

export var fruitAutomationFactor = {}

export var entropyUpgradeCost = {
    EU1: new Decimal(1),
    EU2: new Decimal(1),
    EU3: new Decimal(1),
    EU4: new Decimal(1),
    EU5: new Decimal(2),
    EU6: new Decimal(3),
    EU7: new Decimal(5),
    EU8: new Decimal(8),
    EU9: new Decimal(7),
    EU10: new Decimal(15),
    EU11: new Decimal(35),
    EU12: new Decimal(170),
    EU13: new Decimal(2500),
    EU14: new Decimal(2500),
    EU15: new Decimal(2500),
    EU16: new Decimal(2500),
    EU17: new Decimal(2500),
    EU18: new Decimal(10000),
    EU19: new Decimal(20000),
    EU20: new Decimal(200000),
    EU21: new Decimal(1.5e7),
    EU22: new Decimal(1e10),
    EU23: new Decimal(8.5e12),
    EU24: new Decimal(1.6e16),
    EU25: new Decimal(1e18),
    EU26: new Decimal(1e20),
    EU27: new Decimal(1e22),
    EU28: new Decimal(1e22),
    EU29: new Decimal(7.5e23),
    EU30: new Decimal(1e25),
    EU31: new Decimal(1e30),
    EU32: new Decimal(3.33e33),
    EU33: new Decimal(3e40),
    EU34: new Decimal(2.5e45),
    EU35: new Decimal(1e50),
    EU35: new Decimal(5e55),
    EU36: new Decimal(5e55),
    EU37: new Decimal(5e55),
    EU38: new Decimal(6.9e69),
    EU39: new Decimal(4e73),
    EU40: new Decimal(1e89),
    EU41: new Decimal(1e95),
    EU42: new Decimal(1e100),
    EU43: new Decimal(1e180),
    EU44: new Decimal(1e250),
}

export var entropyUpgradeFactor = {
    C1Cost: new Decimal(1),
    C1Amount: new Decimal(0),
    C1Increase: new Decimal(1.1),
    C2Cost: new Decimal(1),
    C2Amount: new Decimal(0),
    C2Increase: new Decimal(1e3),
    C3Cost: new Decimal(1),
    C3Amount: new Decimal(0),
    C3Increase: new Decimal(10),
	
    B1Cost: new Decimal(1),
    B1Amount: new Decimal(0),
    B1Effect: new Decimal(0),
    B2Cost: new Decimal(2),
    B2Amount: new Decimal(0),
    B2Effect: new Decimal(0),
    B3Cost: new Decimal(0.5),
    B3Amount: new Decimal(0),
    B3Effect: new Decimal(0),
	
    R1Cost: new Decimal(5),
    R1Amount: new Decimal(0),
    R1Effect: new Decimal(1),
    R2Cost: new Decimal(2),
    R2Amount: new Decimal(0),
    R2Effect: new Decimal(0),
    R3Cost: new Decimal(10),
    R3Amount: new Decimal(0),
    R3Effect: new Decimal(0),
    R4Cost: new Decimal(100),
    R4Amount: new Decimal(0),
    R4Effect: new Decimal(1),
    R5Cost: new Decimal(20),
    R5Amount: new Decimal(0),
    R5Effect: new Decimal(0),
    R6Cost: new Decimal(100000),
    R6Amount: new Decimal(0),
    R6Effect: new Decimal(0),
	
	rubisco: new Decimal(0),
	rubiscoFree: new Decimal(0),
	rubiscoEffect: new Decimal(1),
	extensin: new Decimal(0),
	extensinFree: new Decimal(0),
	extensinEffect: new Decimal(1),
	arganine: new Decimal(0),
	arganineFree: new Decimal(0),
	arganineEffect: new Decimal(0),
	glutamine: new Decimal(0),
	glutamineFree: new Decimal(0),
	glutamineEffect: new Decimal(1),
	glutamate: new Decimal(0),
	glutamateFree: new Decimal(0),
	glutamateEffect: new Decimal(0),
	asparagine: new Decimal(0),
	asparagineFree: new Decimal(0),
	asparagineEffect: new Decimal(1),
	agp: new Decimal(0),
	agpFree: new Decimal(0),
	agpEffect: new Decimal(1),
	trb: new Decimal(0),
	trb: new Decimal(0),
	trbEffect: new Decimal(1),
	
    E7: new Decimal(1),
    E9: new Decimal(0),
    E10: new Decimal(0),
    E12: new Decimal(0),
    E26: new Decimal(1),
}

export var entropyAutomationFactor = {}

export var rootUpgradeCost = {
	ROU1: new Decimal(0.5),
	ROU2: new Decimal(0.5),
	ROU3: new Decimal(0.5),
	ROU4: new Decimal(0.5),
	ROU5: new Decimal(0.5),
	ROU6: new Decimal(0.5),
	ROU7: new Decimal(0.5),
	ROU8: new Decimal(0.5),
	ROU9: new Decimal(0.5),
	ROU10: new Decimal(0.5),
	ROU11: new Decimal(2),
	ROU12: new Decimal(2),
	ROU13: new Decimal(5),
	ROU14: new Decimal(5),
	ROU15: new Decimal(5),
	ROU16: new Decimal(10),
	ROU17: new Decimal(15),
	ROU18: new Decimal(20),
	ROU19: new Decimal(50),
	ROU20: new Decimal(100),
	ROU21: new Decimal(1000),
	
	RM1: new Decimal(1),
	RM2: new Decimal(2),
	RM3: new Decimal(3),
	RM4: new Decimal(4),
	RM5: new Decimal(5),
	RM6: new Decimal(8),
	RM7: new Decimal(10),
	RM8: new Decimal(15),
	RM9: new Decimal(25),
	RM10: new Decimal(50),
	RM11: new Decimal(100),
	RM12: new Decimal(1000),
}

export var rootUpgradeFactor = {
	RM1Achieved: false,
	RM2Achieved: false,
	RM3Achieved: false,
	RM4Achieved: false,
	RM5Achieved: false,
	RM6Achieved: false,
	RM7Achieved: false,
	RM8Achieved: false,
	RM9Achieved: false,
	RM10Achieved: false,
	RM11Achieved: false,
	RM12Achieved: false,
}

export var rootAutomationFactor = {}

export function truncateToDecimalPlaces(num, decimalPlaces) {
	if ((num.lessThan(new Decimal(0.001))) && (num.greaterThan(new Decimal(0)))) {
		const testNum = new Decimal(1).div(num);
		var numStr = testNum.toString();
		if (num.layer < 1) {
			const expoNum = testNum.toExponential();
			numStr = expoNum.toString();
		}
        const decimalIndex = numStr.indexOf('.');
        const exponentIndex = numStr.indexOf('e');
        if (decimalIndex === -1 || decimalPlaces < 0) {
            return num; 
        }

        const numPart1 = numStr.slice(0, exponentIndex);
        const numPart2 = numStr.slice(exponentIndex, (exponentIndex + 1));
        const numPart3 = numStr.slice(exponentIndex + 1);

        const endIndex = decimalIndex + 1 + decimalPlaces;
        const parsedNumber = parseFloat(numPart1.substring(0, endIndex));
		const finalExponent = "-" + numPart3;
        const finalNumber = parsedNumber + numPart2 + finalExponent;
        return finalNumber;
	}
    if (num.layer === 1 && num.greaterThanOrEqualTo(new Decimal(1e15))) {
        const numStr = num.toString();
        const decimalIndex = numStr.indexOf('.');
        const exponentIndex = numStr.indexOf('e');
        if (decimalIndex === -1 || decimalPlaces < 0) {
            return num; 
        }

        const numPart1 = numStr.slice(0, exponentIndex);
        const numPart2 = numStr.slice(exponentIndex);

        const endIndex = decimalIndex + 1 + decimalPlaces;
        const parsedNumber = parseFloat(numPart1.substring(0, endIndex));
        const finalNumber = parsedNumber + numPart2;
        return finalNumber;
    }
    else {
        if (num.greaterThanOrEqualTo(new Decimal(1e6))) {
            const expoNum = num.toExponential()
            const numStr = expoNum.toString();
            const decimalIndex = numStr.indexOf('.');
            const exponentIndex = numStr.indexOf('e');
            if (decimalIndex === -1 || decimalPlaces < 0) {
                return num; 
            }

            const numPart1 = expoNum.slice(0, exponentIndex);
            const numPart2 = expoNum.slice(exponentIndex);

            const endIndex = decimalIndex + 1 + decimalPlaces;
            const parsedNumber = parseFloat(numPart1.substring(0, endIndex));
            const finalNumber = parsedNumber + numPart2;
            if (finalNumber.includes("+")) {
                const finalString = finalNumber.replace("+", "");
                return finalString;
            }
            else {
                return finalNumber;
            }
        }
        else {
            const numStr = num.toString();
            const decimalIndex = numStr.indexOf('.');
            if (decimalIndex === -1 || decimalPlaces < 0) {
                return num; 
            }
            const endIndex = decimalIndex + 1 + decimalPlaces;
            const parsedNumber = parseFloat(numStr.substring(0, endIndex));
            return parsedNumber;
        }
    }
} 

export function seedsFormula(leaves, factor) {
    const x = leaves.div(new Decimal(1e7));
    const y = x.pow(factor);

    gameData.seedsOnDecompolize = y;
}

export function seedsSoftCalculation(elementID, capFactor) {
    if (seedsVisualCalculation("false") >= (new Decimal(1e15)).toNumber()) {
        while (gameData.seedsIsSoftcapped == false) {
            gameData.seedsSoftcap = capFactor;
            console.log(gameData.seeds + " is softcapped, gameData.seedsOnDecompolize is now " + gameData.seedsOnDecompolize);
            document.getElementById(elementID).innerHTML = "(Softcapped)"
            gameData.seedsIsSoftcapped = true;
        }
    }
}
//calculates if you're soft or hard hehe
export function seedsVisualCalculation(ifTrunc) {
    var w = new Decimal(1);
    if (ifTrunc == "true") {
        const x = gameData.seedsOnDecompolize.abs();
        const y = x.times(gameData.seedsMult.abs());
        var z = y;
        if (gameData.seedsIsSoftcapped) {
            document.getElementById('seedSoftcap').innerHTML = `(Softcapped)`;
            z = z.pow(gameData.baseSeedSoftcapFactor); 
            achievements.ach51 = true; 
			if (gameData.seedsIsSoftcapped2) {
				z = z.pow(gameData.baseSeedSoftcapFactor); 
			}
        }
		if (gameData.seedsIsSupercapped) {
			z = z.pow(gameData.baseSeedSupercapFactor); 
		}
        if (gameData.isInChallengeStorm) {
			if (entropyUpgradeFactor.E31Bought) {
				z = z.pow(gameData.stormcapBaseFactor.pow(new Decimal(3.5)));
			}
			else {
				z = z.pow(gameData.stormcapBaseFactor.pow(new Decimal(5)));
			}
		}

        w = (z.trunc()).plus(new Decimal(1));
        return w;
    }
    else {
        const x = gameData.seedsOnDecompolize.abs();
        const y = x.times(gameData.seedsMult.abs());
        var z = y;
        if (gameData.seedsIsSoftcapped) {
            document.getElementById('seedSoftcap').innerHTML = `(Softcapped)`;
            z = z.pow(gameData.baseSeedSoftcapFactor); 
            achievements.ach51 = true; 
			if (gameData.seedsIsSoftcapped2) {
				z = z.pow(gameData.baseSeedSoftcapFactor); 
			}
        }
		if (gameData.seedsIsSupercapped) {
			z = z.pow(gameData.baseSeedSupercapFactor); 
		}
        if (gameData.isInChallengeStorm) {
			if (entropyUpgradeFactor.E31Bought) {
				z = z.pow(gameData.stormcapBaseFactor.pow(new Decimal(3.5)));
			}
			else {
				z = z.pow(gameData.stormcapBaseFactor.pow(new Decimal(5)));
			}
		}

        w = z.plus(new Decimal(1));
        return w;
    }
}

export function seedsCalculation(leaves) {
    if (leaves >= new Decimal(1e7).toNumber()) {
        gameData.canDecompolize = true;
        document.querySelector('.seeds').style.visibility = 'visible';

        const seedsClass = document.querySelector('.seeds');
        seedsClass.style.color = '#ffffffff';
        seedsClass.style.backgroundColor = '#dc8616ff';
        seedsClass.style.borderColor = '#dc4b16ff';
        seedsClass.style.borderStyle = 'solid';
        seedsClass.style.borderWidth = '5px';
        seedsClass.style.borderRadius = '5px';
        
        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces((gameData.seeds.trunc()), 3)
		if (gameData.fuAutomationUnlocked) {
			const x = seedsVisualCalculation("false");
			const y = x.times(new Decimal(0.01));
			document.getElementById("seedUpdateCounter").innerHTML = `${truncateToDecimalPlaces(y, 3)}/s`;	
			document.getElementById("seedsOnDecompolizeCounter").innerHTML = ``;
			seedsClass.style.width = '160px';
		}
		else {
			document.getElementById("seedUpdateCounter").innerHTML = "xe7 Leaves = x<sup>2/3</sup> Seeds"	
			document.getElementById("seedsOnDecompolizeCounter").innerHTML = `+ (${truncateToDecimalPlaces(seedsVisualCalculation("true"), 3)})`;
		}
        document.querySelector('.seeds-reset-button').style.visibility = 'visible';
        if (gameData.seedsIsSoftcapped == false) {
            document.querySelector('.seeds-reset-button').style.top = '85px';
        }
        else {
            document.querySelector('.seeds-reset-button').style.top = '100px';
        }
        
        document.querySelector('.fruits').style.left = '505px';
        document.querySelector('.fruits-reset-button').style.left = '545px';
    }
}

export function decompolize() {
    if (gameData.canDecompolize = true) {
        console.log("Decompolizing");

        for (let i = 0; i < upgradesResetByDecompolization.length; i++) {
            upgradesResetByDecompolization[i].disabled = false;
            upgradesResetByDecompolization[i].style.color = '#ffffffff';
            console.log(upgradeBuilder.decompolizationResetText);
            upgradesResetByDecompolization[i].innerHTML = upgradeBuilder.decompolizationResetText[i];

            const decompolizationResetFlags = upgradeBuilder.decompolizationResetFlags[i];
            console.log(decompolizationResetFlags);
            leafUpgradeFactor[`${decompolizationResetFlags}`] = false;
        }

        gameData.seeds = gameData.seeds.plus(seedsVisualCalculation("true"));
        
        if (achievements.ach14 === false) {
            document.querySelector('.buttons-su-tab-color').style.visibility = 'visible';
            achievements.ach14 = true;
            massAchievementChecker();
        }

        updateUpgradeCount();

        fruitsCalculation(gameData.seeds);

        gameData.lastUpdate = new Decimal(Date.now());
        gameData.leaves = new Decimal(0);
        gameData.leavesIsSoftcapped = false;
        gameData.leavesIsSoftcapped2 = false;
        gameData.leavesIsSoftcapped3 = false;
        gameData.leavesIsSoftcapped4 = false;
        gameData.leavesIsSoftcapped5 = false;
        gameData.leavesIsSupercapped = false;
        gameData.leavesPerTick = new Decimal(0);
        gameData.tickSpeedMultiplier = new Decimal(0);
        gameData.treeAge = new Decimal(0);
        gameData.treeAgePerTick = new Decimal(0);
        gameData.gameSpeed = new Decimal(1);
        gameData.gameStarted = false;

        gameData.cheaterMult = new Decimal(1);

        gameData.leafUpgradeCounter = new Decimal(0);

        gameData.baseSeedFactor = new Decimal(1e7);
        gameData.seedsSoftcap = new Decimal(1);
        gameData.visualSeedFactor = new Decimal(1e7);
        gameData.seedChecker = true;
        gameData.seedQuotient = new Decimal(0);
        gameData.baseSeedQuotient = new Decimal(0);
        gameData.canDecompolize = false;
        gameData.currentSeedsOnDecompolize = new Decimal(0);
        gameData.highestSeedsOnDecompolize = new Decimal(0);
        gameData.seedsOnDecompolize = new Decimal(0);

        gameData.ticksToUpdateComposter = new Decimal(0);

        gameData.seedsIsSoftcapped = false;
        gameData.seedsIsSoftcapped2 = false;
        gameData.fruitsIsSoftcapped = false;

        gameData.composterScalingStart = new Decimal(25);

        if (!entropyUpgradeFactor.E8Bought) {
            gameData.totalFertilizers = gameData.totalFertilizers.minus(gameData.leafComposterCount);
            gameData.leafComposterCost = new Decimal(1);
            gameData.leafComposterDiscount = new Decimal(1);
            gameData.leafComposterAmount = new Decimal(0);
            gameData.leafComposterTime = new Decimal(500);
            gameData.leafComposterCount = new Decimal(0);
            gameData.leafComposterEffect = new Decimal(1);
            gameData.leafComposterIsActive = false;

            const x = new Decimal(500).div(gameData.compostingSpeed);
            const y = x.div(new Decimal(1000));
            document.getElementById('leafCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
            document.getElementById('leafFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
            document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made 0 Fertilizers,`;
            document.getElementById('leafComposterButton').disabled = false;
            document.getElementById('leafComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Leaf`;
        }
            
        leafUpgradeFactor.L4 = new Decimal(1);
        leafUpgradeFactor.L4AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L4Amt = new Decimal(10);
        leafUpgradeFactor.L9 = new Decimal(1);
        leafUpgradeFactor.L10 = new Decimal(1);
        leafUpgradeFactor.L10Bought = false;
        leafUpgradeFactor.L10AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L11 = new Decimal(1);
        leafUpgradeFactor.L11Mult = new Decimal(1);
        leafUpgradeFactor.L11AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L15 = new Decimal(1);
        leafUpgradeFactor.L16 = new Decimal(1);
        leafUpgradeFactor.L16AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L17 = new Decimal(1);
        leafUpgradeFactor.L17AtUpgradeBought = new Decimal(1);

        temple.repeatableUpgradeFactor.LR1 = new Decimal(0);
        temple.repeatableUpgradeFactor.LR1Cap = new Decimal(10);
        temple.repeatableUpgradeFactor.LR2 = new Decimal(0);
        temple.repeatableUpgradeFactor.LR2Cap = new Decimal(10);
        
        gameData.moss = new Decimal(0);
        moss.mossMilestoneFactor.MM1Achieved = false;
        document.getElementById('mm1Background').style.backgroundImage = '';
        document.getElementById('mm1').innerHTML = '1e80 Moss Required';
        moss.mossMilestoneFactor.MM2Achieved = false;
        document.getElementById('mm2Background').style.backgroundImage = '';
        document.getElementById('mm2').innerHTML = '1e100 Moss Required';
        moss.mossMilestoneFactor.MM3Achieved = false;
        document.getElementById('mm3Background').style.backgroundImage = '';
        document.getElementById('mm3').innerHTML = '1e200 Moss Required';
        moss.mossMilestoneFactor.MM4Achieved = false;
        document.getElementById('mm4Background').style.backgroundImage = '';
        document.getElementById('mm4').innerHTML = '1e250 Moss Required';
        moss.mossMilestoneFactor.MM5Achieved = false;
        document.getElementById('mm5Background').style.backgroundImage = '';
        document.getElementById('mm5').innerHTML = '1.79e308 Moss Required';
        moss.mossMilestoneFactor.MM6Achieved = false;
        document.getElementById('mm6Background').style.backgroundImage = '';
        document.getElementById('mm6').innerHTML = '1e470 Moss Required';
        moss.mossMilestoneFactor.MM7Achieved = false;
        document.getElementById('mm7Background').style.backgroundImage = '';
        document.getElementById('mm7').innerHTML = '6.66e666 Moss Required';
        moss.mossMilestoneFactor.MM8Achieved = false;
        document.getElementById('mm8Background').style.backgroundImage = '';
        document.getElementById('mm8').innerHTML = '1.337e1337 Moss Required';
        document.querySelector('.moss-upgrade-background').style.visibility = `hidden`;

        moss.mossMilestoneFactor.MM9Achieved = false;
        document.getElementById('mm9Background').style.backgroundImage = '';
        document.getElementById('mm9').innerHTML = '1e2500 Moss Required';
        moss.mossMilestoneFactor.MM10Achieved = false;
        document.getElementById('mm10Background').style.backgroundImage = '';
        document.getElementById('mm10').innerHTML = '1e6000 Moss Required';

        gameData.potentialEnergy = new Decimal(0);
        document.getElementById('entropyUpdateCounter').innerHTML = `5e22 PE Required`

        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces((gameData.seeds.trunc()), 3)
        document.querySelector('.seeds-reset-button').style.top = '60px';
        document.querySelector('.seeds-reset-button').style.visibility = 'hidden';
        const seedsClass = document.querySelector('.seeds');
        seedsClass.style.color = '#000000ff';
        seedsClass.style.backgroundColor = '#ffffffff';
        seedsClass.style.borderWidth = '0px';
        document.getElementById("seedUpdateCounter").innerHTML = "1e7 Leaves Required"

        updateResourceGUI();
        
        document.getElementById("pleaseWork").innerHTML = "0";
        document.getElementById("leavesPerSecond").innerHTML = "0/s";
        document.getElementById("treeAgeCounter").innerHTML = "0";
        document.getElementById("treeAgePerSecond").innerHTML = "0/s"; 
        document.getElementById("leafSoftcap").innerHTML = ""
        document.getElementById("seedSoftcap").innerHTML = ""
        
        document.querySelector('.fruits').style.left = '435px';
        document.querySelector('.fruits-reset-button').style.left = '475px';
        
        setTimeout(automateLeafUpgrades, 500);
    }
}

export function fruitsFormula(seeds, factor) {
    const x = seeds.div(new Decimal(1e7));
    const y = x.pow(new Decimal(factor));
    var z = y.times(gameData.fruitsMult);
    if (gameData.fruitsIsSoftcapped) {z = z.pow(gameData.baseFruitSoftcapFactor)}
	if (gameData.fruitsIsSupercapped) {z = z.pow(gameData.baseFruitSupercapFactor)}
	if (gameData.isInChallengeStorm) {
		if (entropyUpgradeFactor.E31Bought) {
			z = z.pow(gameData.stormcapBaseFactor.pow(new Decimal(3.5)));
		}
		else {
			z = z.pow(gameData.stormcapBaseFactor.pow(new Decimal(5)));
		}
	}

    gameData.fruitsOnHarvest = z;
}

export function fruitsCalculation(seeds) {
    if (seeds >= new Decimal(1e7).toNumber()) {
        gameData.canHarvest = true;
        document.querySelector('.fruits').style.visibility = 'visible';

        const fruitsClass = document.querySelector('.fruits');
        fruitsClass.style.color = '#ffffffff';
        fruitsClass.style.backgroundColor = '#de0e0eff';
        fruitsClass.style.borderColor = '#9a1616ff';
        fruitsClass.style.borderStyle = 'solid';
        fruitsClass.style.borderWidth = '5px';
        fruitsClass.style.borderRadius = '5px';

        if (gameData.fruitsIsSoftcapped) {
            document.querySelector('.fruits-reset-button').style.top = '100px';
        }
        else {
            document.querySelector('.fruits-reset-button').style.top = '85px';
        }
        
        document.getElementById("fruitCounter").innerHTML = truncateToDecimalPlaces((gameData.fruits.trunc()), 3);
		if (rootUpgradeFactor.RO19Bought) {
			const x = gameData.fruitsOnHarvest;
			const y = x.times(new Decimal(0.01));
			document.getElementById("fruitUpdateCounter").innerHTML = `${truncateToDecimalPlaces(y, 3)}/s`;	
			document.getElementById("fruitsOnHarvestCounter").innerHTML = ``;
			fruitsClass.style.width = '160px';
		}
		else {
			document.getElementById("fruitUpdateCounter").innerHTML = "xe7 Seeds = x<sup>2/3</sup> Fruits"
			document.getElementById("fruitsOnHarvestCounter").innerHTML = `+ (${truncateToDecimalPlaces((gameData.fruitsOnHarvest.trunc()), 3)})`;
		}
        document.querySelector('.fruits-reset-button').style.visibility = 'visible';
    }
}

export function harvest() {
    if (gameData.canHarvest = true) {
        console.log("Harvesting");
        console.log(upgradesResetByHarvest);
        for (let i = 0; i < upgradesResetByHarvest.length; i++) {
            upgradesResetByHarvest[i].disabled = false;
            upgradesResetByHarvest[i].style.color = '#ffffffff';
            upgradesResetByHarvest[i].innerHTML = upgradeBuilder.harvestResetText[i];

            const harvestResetFlags = upgradeBuilder.harvestResetFlags[i];
            console.log(harvestResetFlags);
            leafUpgradeFactor[`${harvestResetFlags}`] = false;
            seedUpgradeFactor[`${harvestResetFlags}`] = false;
        }

        gameData.fruits = gameData.fruits.plus(gameData.fruitsOnHarvest);
        
        if (achievements.ach23 === false) {
            document.querySelector('.buttons-fu-tab-color').style.visibility = 'visible';
            achievements.ach23 = true;
            massAchievementChecker();
        }
        
        updateUpgradeCount();

        gameData.lastUpdate = new Decimal(Date.now());
        gameData.leaves = new Decimal(0);
        gameData.leavesIsSoftcapped = false;
        gameData.leavesIsSoftcapped2 = false;
        gameData.leavesIsSoftcapped3 = false;
        gameData.leavesIsSoftcapped4 = false;
        gameData.leavesIsSoftcapped5 = false;
        gameData.leavesIsSupercapped = false;
        gameData.leavesPerTick = new Decimal(0);
        gameData.tickSpeedMultiplier = new Decimal(0);
        gameData.treeAge = new Decimal(0);
        gameData.treeAgePerTick = new Decimal(0);
        gameData.gameSpeed = new Decimal(1);
        gameData.gameStarted = false;

        gameData.cheaterMult = new Decimal(1);

        gameData.leafUpgradeCounter = new Decimal(0);

        gameData.baseSeedFactor = new Decimal(1e7),
        gameData.seedsSoftcap = new Decimal(1),
        gameData.visualSeedFactor = new Decimal(1e7),
        gameData.seedChecker = true,
        gameData.seedQuotient = new Decimal(0),
        gameData.baseSeedQuotient = new Decimal(0),
        gameData.canDecompolize = false,
        gameData.seeds = new Decimal(0),
        gameData.currentSeedsOnDecompolize = new Decimal(0),
        gameData.highestSeedsOnDecompolize = new Decimal(0),
        gameData.seedsOnDecompolize = new Decimal(0),
        gameData.seedsMult = new Decimal(1),
        gameData.seedUpgradeCounter = new Decimal(0),

        gameData.seedsIsSoftcapped = false;
        gameData.seedsIsSoftcapped2 = false;
        gameData.fruitsIsSoftcapped = false;

        gameData.canHarvest = false;

        gameData.ticksToUpdateComposter = new Decimal(0);
        gameData.composterScalingStart = new Decimal(25);

        if (!entropyUpgradeFactor.E8Bought) {
            gameData.totalFertilizers = gameData.totalFertilizers.minus(gameData.leafComposterCount);
            gameData.leafComposterCost = new Decimal(1);
            gameData.leafComposterDiscount = new Decimal(1);
            gameData.leafComposterAmount = new Decimal(0);
            gameData.leafComposterTime = new Decimal(500);
            gameData.leafComposterCount = new Decimal(0);
            gameData.leafComposterEffect = new Decimal(1);
            gameData.leafComposterIsActive = false;

            gameData.totalFertilizers = gameData.totalFertilizers.minus(gameData.seedComposterCount);
            gameData.seedComposterCost = new Decimal(1);
            gameData.seedComposterDiscount = new Decimal(1);
            gameData.seedComposterAmount = new Decimal(0);
            gameData.seedComposterTime = new Decimal(500);
            gameData.seedComposterCount = new Decimal(0);
            gameData.seedComposterEffect = new Decimal(1);
            gameData.seedComposterIsActive = false;

            const x = new Decimal(500).div(gameData.compostingSpeed);
            const y = x.div(new Decimal(1000));
            document.getElementById('leafCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
            document.getElementById('leafFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
            document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made 0 Fertilizers,`;
            document.getElementById('leafComposterButton').disabled = false;
            document.getElementById('leafComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Leaf`;

            document.getElementById('seedCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
            document.getElementById('seedFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
            document.getElementById('seedFertilizerCounter').innerHTML = `The Seed Composter has made 0 Fertilizers,`;
            document.getElementById('seedComposterButton').disabled = false;
            document.getElementById('seedComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Seed`;
        }

        gameData.leavesStartingPerTick = new Decimal(1),
             
        leafUpgradeFactor.L4 = new Decimal(1);
        leafUpgradeFactor.L4AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L4Amt = new Decimal(10);
        leafUpgradeFactor.L9 = new Decimal(1);
        leafUpgradeFactor.L10 = new Decimal(1);
        leafUpgradeFactor.L10Bought = false;
        leafUpgradeFactor.L10AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L11 = new Decimal(1);
        leafUpgradeFactor.L11Mult = new Decimal(1);
        leafUpgradeFactor.L11AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L15 = new Decimal(1);
        leafUpgradeFactor.L16 = new Decimal(1);
        leafUpgradeFactor.L16AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L17 = new Decimal(1);
        leafUpgradeFactor.L17AtUpgradeBought = new Decimal(1);

        seedUpgradeFactor.S3 = new Decimal(0);
        seedUpgradeFactor.S3OnUpgradeBought = new Decimal(0);
        seedUpgradeFactor.S3Total = new Decimal(1e7);
        seedUpgradeFactor.S4 = new Decimal(0);
        seedUpgradeFactor.S4OnUpgradeBought = new Decimal(0);
        seedUpgradeFactor.S4Total = new Decimal(1);
        seedUpgradeFactor.S8 = new Decimal(1);
        seedUpgradeFactor.S8OnUpgradeBought = new Decimal(0);
        
        temple.repeatableUpgradeFactor.LR1 = new Decimal(0);
        temple.repeatableUpgradeFactor.LR1Cap = new Decimal(10);
        temple.repeatableUpgradeFactor.LR2 = new Decimal(0);
        temple.repeatableUpgradeFactor.LR2Cap = new Decimal(10);
        temple.repeatableUpgradeFactor.SR1 = new Decimal(0);
        temple.repeatableUpgradeFactor.SR1Cap = new Decimal(10);
        temple.repeatableUpgradeFactor.SR2 = new Decimal(0);
        temple.repeatableUpgradeFactor.SR2Cap = new Decimal(10);
        
        gameData.moss = new Decimal(0);
        moss.mossMilestoneFactor.MM1Achieved = false;
        document.getElementById('mm1Background').style.backgroundImage = '';
        document.getElementById('mm1').innerHTML = '1e80 Moss Required';
        moss.mossMilestoneFactor.MM2Achieved = false;
        document.getElementById('mm2Background').style.backgroundImage = '';
        document.getElementById('mm2').innerHTML = '1e100 Moss Required';
        moss.mossMilestoneFactor.MM3Achieved = false;
        document.getElementById('mm3Background').style.backgroundImage = '';
        document.getElementById('mm3').innerHTML = '1e200 Moss Required';
        moss.mossMilestoneFactor.MM4Achieved = false;
        document.getElementById('mm4Background').style.backgroundImage = '';
        document.getElementById('mm4').innerHTML = '1e250 Moss Required';
        moss.mossMilestoneFactor.MM5Achieved = false;
        document.getElementById('mm5Background').style.backgroundImage = '';
        document.getElementById('mm6').innerHTML = '1.79e308 Moss Required';
        moss.mossMilestoneFactor.MM6Achieved = false;
        document.getElementById('mm6Background').style.backgroundImage = '';
        document.getElementById('mm6').innerHTML = '1e470 Moss Required';
        moss.mossMilestoneFactor.MM7Achieved = false;
        document.getElementById('mm7Background').style.backgroundImage = '';
        document.getElementById('mm7').innerHTML = '6.66e666 Moss Required';
        moss.mossMilestoneFactor.MM8Achieved = false;
        document.getElementById('mm8Background').style.backgroundImage = '';
        document.getElementById('mm8').innerHTML = '1.337e1337 Moss Required';
        document.querySelector('.moss-upgrade-background').style.visibility = `hidden`;

        moss.mossMilestoneFactor.MM9Achieved = false;
        document.getElementById('mm9Background').style.backgroundImage = '';
        document.getElementById('mm9').innerHTML = '1e2500 Moss Required';
        moss.mossMilestoneFactor.MM10Achieved = false;
        document.getElementById('mm10Background').style.backgroundImage = '';
        document.getElementById('mm10').innerHTML = '1e6000 Moss Required';

        gameData.potentialEnergy = new Decimal(0);
        document.getElementById('entropyUpdateCounter').innerHTML = `5e22 PE Required`

        document.querySelector('.fruits').style.left = '435px';

        document.getElementById("fruitCounter").innerHTML = truncateToDecimalPlaces((gameData.fruits.trunc()), 3)
		document.getElementById("fruitsOnHarvestCounter").innerHTML = ``;
        document.querySelector('.fruits-reset-button').style.top = '60px';
        document.querySelector('.fruits-reset-button').style.visibility = 'hidden';
        const fruitsClass = document.querySelector('.fruits');
        fruitsClass.style.color = '#000000ff';
        fruitsClass.style.backgroundColor = '#ffffffff';
        fruitsClass.style.borderWidth = '0px';
        document.getElementById("fruitUpdateCounter").innerHTML = "1e7 Seeds Required"

        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces((gameData.seeds.trunc()), 3)
        document.querySelector('.seeds-reset-button').style.top = '60px';
        document.querySelector('.seeds-reset-button').style.visibility = 'hidden';
        const seedsClass = document.querySelector('.seeds');
        seedsClass.style.color = '#000000ff';
        seedsClass.style.backgroundColor = '#ffffffff';
        seedsClass.style.borderWidth = '0px';
        document.getElementById("seedUpdateCounter").innerHTML = "1e7 Leaves Required"

        updateResourceGUI();
        
        document.getElementById("pleaseWork").innerHTML = "0";
        document.getElementById("leavesPerSecond").innerHTML = "0/s";
        document.getElementById("treeAgeCounter").innerHTML = "0";
        document.getElementById("treeAgePerSecond").innerHTML = "0/s"; 
        document.getElementById("seedCounter").innerHTML = "0"; 
        document.getElementById("seedsOnDecompolizeCounter").innerHTML = "";
        document.getElementById("leafSoftcap").innerHTML = ""
        document.getElementById("seedSoftcap").innerHTML = ""
        document.getElementById("fruitSoftcap").innerHTML = ""
        
        setTimeout(automateLeafUpgrades, 500);
    }
}

export function potentialEnergyCalculation() {
    var x = gameData.leaves.pow(new Decimal(1).div(new Decimal(12)));
    if (leafUpgradeFactor.L29Bought) {
        x = gameData.leaves.pow(new Decimal(1).div(new Decimal(9.5)));
    }
    var y = gameData.seeds.pow(new Decimal(1).div(new Decimal(6)));
    if (seedUpgradeFactor.S23Bought) {
        y = gameData.seeds.pow(new Decimal(1).div(new Decimal(4.5)));
    }
    const z = gameData.fruits;
	const w = x.times(y.times(z));
    gameData.potentialEnergy = w.pow(gameData.potentialEnergyPow);
}

export function entropyCalculation() {
    const x = gameData.potentialEnergy;
    const y = x.pow(new Decimal(1).div(new Decimal(50)));
    const z = y.times(gameData.entropyMult);
    gameData.entropyOnTransform = z;
}

export function entropyGUI() {
    if (gameData.potentialEnergy.greaterThanOrEqualTo(new Decimal(5e22)) && leafUpgradeFactor.L28Bought && fruitUpgradeFactor.F17Bought) {
        gameData.canTransform = true;

        const entropyClass = document.querySelector('.entropy');
        entropyClass.style.color = '#ffffffff';
        entropyClass.style.backgroundColor = '#2077ba';
        entropyClass.style.borderColor = '#5ea4da';
        entropyClass.style.borderStyle = 'solid';
        entropyClass.style.borderWidth = '5px';
        entropyClass.style.borderRadius = '5px';
        
        document.getElementById("entropyCounter").innerHTML = truncateToDecimalPlaces((gameData.entropy.trunc()), 3);
		document.getElementById("entropyOnTransformCounter").innerHTML = `+ (${truncateToDecimalPlaces(((gameData.entropyOnTransform).trunc()), 3)})`;
        document.querySelector(".entropy-reset-button").style.visibility = "visible";
    }
}

export function transform() {
    if (gameData.canTransform) {
        console.log("Transforming");
        console.log(upgradesResetByTransform);
        for (let i = 0; i < upgradesResetByTransform.length; i++) {
            upgradesResetByTransform[i].disabled = false;
            upgradesResetByTransform[i].style.color = '#ffffffff';
            upgradesResetByTransform[i].innerHTML = upgradeBuilder.transformResetText[i];

            const transformResetFlags = upgradeBuilder.transformResetFlags[i];
            console.log(transformResetFlags);
            leafUpgradeFactor[`${transformResetFlags}`] = false;
            seedUpgradeFactor[`${transformResetFlags}`] = false;
            fruitUpgradeFactor[`${transformResetFlags}`] = false;
        }

        gameData.entropy = gameData.entropy.plus(gameData.entropyOnTransform);
        gameData.totalEntropy = gameData.totalEntropy.plus(gameData.entropyOnTransform);
        
        if (!achievements.ach41) {
            document.querySelector('.buttons-eu-tab-color').style.visibility = 'visible';
            achievements.ach41 = true;
            massAchievementChecker();
        }

        updateUpgradeCount();

        gameData.lastUpdate = new Decimal(Date.now());
        gameData.leaves = new Decimal(0);
        gameData.leavesIsSoftcapped = false;
        gameData.leavesIsSoftcapped2 = false;
        gameData.leavesIsSoftcapped3 = false;
        gameData.leavesIsSoftcapped4 = false;
        gameData.leavesIsSoftcapped5 = false;
        gameData.leavesIsSupercapped = false;
        gameData.leavesPerTick = new Decimal(0);
        gameData.tickSpeedMultiplier = new Decimal(0);
        gameData.treeAge = new Decimal(0);
        gameData.treeAgePerTick = new Decimal(0);
        gameData.gameSpeed = new Decimal(1);
        gameData.gameStarted = false;

        gameData.cheaterMult = new Decimal(1);

        gameData.leafUpgradeCounter = new Decimal(0);

        gameData.leafSoftcapStart = new Decimal(1e15);

        gameData.baseSeedFactor = new Decimal(1e7);
        gameData.seedsSoftcap = new Decimal(1);
        gameData.visualSeedFactor = new Decimal(1e7);
        gameData.seedChecker = true;
        gameData.seedQuotient = new Decimal(0);
        gameData.baseSeedQuotient = new Decimal(0);
        gameData.canDecompolize = false;
        gameData.seeds = new Decimal(0);
        gameData.currentSeedsOnDecompolize = new Decimal(0);
        gameData.highestSeedsOnDecompolize = new Decimal(0);
        gameData.seedsOnDecompolize = new Decimal(0);
        gameData.seedsMult = new Decimal(1);
        gameData.seedUpgradeCounter = new Decimal(0);

        gameData.seedsIsSoftcapped = false;
        gameData.seedsIsSoftcapped2 = false;
        gameData.seedsIsSupercapped = false;

        gameData.leavesStartingPerTick = new Decimal(1);

        gameData.fruits = new Decimal(0);
        gameData.fruitsIsSoftcapped = false;
        gameData.fruitsIsSupercapped = false;
        gameData.fruitsMult = new Decimal(1);
        gameData.fruitsOnHarvest = new Decimal(0);
        gameData.canHarvest = false;

        gameData.fruitUpgradeCounter = new Decimal(0);

        gameData.ticksToUpdateComposter = new Decimal(0);
        gameData.composterScalingStart = new Decimal(25);
        gameData.compostingSpeed = new Decimal(1);

        if (!entropyUpgradeFactor.E5Bought) {
            gameData.leafComposterUnlocked = false;
            gameData.seedComposterUnlocked = false;
            gameData.fruitComposterUnlocked = false;
        }

        gameData.totalFertilizers = new Decimal(0);
		
        gameData.leafComposterCost = new Decimal(1);
        gameData.leafComposterDiscount = new Decimal(1);
        gameData.leafComposterAmount = new Decimal(0);
        gameData.leafComposterTime = new Decimal(500);
        gameData.leafComposterCount = new Decimal(0);
        gameData.leafComposterEffect = new Decimal(1);
        gameData.leafComposterIsActive = false;

        gameData.seedComposterCost = new Decimal(1);
        gameData.seedComposterDiscount = new Decimal(1);
        gameData.seedComposterAmount = new Decimal(0);
        gameData.seedComposterTime = new Decimal(500);
        gameData.seedComposterCount = new Decimal(0);
        gameData.seedComposterEffect = new Decimal(1);
        gameData.seedComposterIsActive = false;

        gameData.fruitComposterCost = new Decimal(1);
        gameData.fruitComposterDiscount = new Decimal(1);
        gameData.fruitComposterAmount = new Decimal(0);
        gameData.fruitComposterTime = new Decimal(500);
        gameData.fruitComposterCount = new Decimal(0);
        gameData.fruitComposterEffect = new Decimal(1);
        gameData.fruitComposterIsActive = false;

        gameData.mossUnlocked = false;
        gameData.mossEffect = new Decimal(0);

        gameData.potentialEnergy = new Decimal(0);
        gameData.entropyOnTransform = new Decimal(0);
        gameData.canTransform = false;
		
		gameData.rnaTimeFactor = new Decimal(0);
             
        leafUpgradeFactor.L4 = new Decimal(1);
        leafUpgradeFactor.L4AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L4Amt = new Decimal(10);
        leafUpgradeFactor.L9 = new Decimal(1);
        leafUpgradeFactor.L10 = new Decimal(1);
        leafUpgradeFactor.L10Bought = false;
        leafUpgradeFactor.L10AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L11 = new Decimal(1);
        leafUpgradeFactor.L11Mult = new Decimal(1);
        leafUpgradeFactor.L11AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L15 = new Decimal(1);
        leafUpgradeFactor.L16 = new Decimal(1);
        leafUpgradeFactor.L16AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L17 = new Decimal(1);
        leafUpgradeFactor.L17AtUpgradeBought = new Decimal(1);

        seedUpgradeFactor.S3 = new Decimal(0);
        seedUpgradeFactor.S3OnUpgradeBought = new Decimal(0);
        seedUpgradeFactor.S3Total = new Decimal(1e7);
        seedUpgradeFactor.S4 = new Decimal(0);
        seedUpgradeFactor.S4OnUpgradeBought = new Decimal(0);
        seedUpgradeFactor.S4Total = new Decimal(1);
        seedUpgradeFactor.S8 = new Decimal(1);
        seedUpgradeFactor.S8OnUpgradeBought = new Decimal(0);
        
        fruitUpgradeFactor.F3 = new Decimal(0);
        fruitUpgradeFactor.F5 = new Decimal(1);
        fruitUpgradeFactor.F20 = new Decimal(1);
        
        temple.repeatableUpgradeFactor.LR1 = new Decimal(0);
        temple.repeatableUpgradeFactor.LR1Cap = new Decimal(10);
        temple.repeatableUpgradeFactor.LR2 = new Decimal(0);
        temple.repeatableUpgradeFactor.LR2Cap = new Decimal(10);
        temple.repeatableUpgradeFactor.SR1 = new Decimal(0);
        temple.repeatableUpgradeFactor.SR1Cap = new Decimal(10);
        temple.repeatableUpgradeFactor.SR2 = new Decimal(0);
        temple.repeatableUpgradeFactor.SR2Cap = new Decimal(10);
        temple.repeatableUpgradeFactor.FR1 = new Decimal(0);
        temple.repeatableUpgradeFactor.FR1Cap = new Decimal(10);

        circuits.upgradeAutobuyerFLOPS = new Decimal(0);
        
        gameData.moss = new Decimal(0);
        moss.mossMilestoneFactor.MM1Achieved = false;
        document.getElementById('mm1Background').style.backgroundImage = '';
        document.getElementById('mm1').innerHTML = '1e80 Moss Required';
        moss.mossMilestoneFactor.MM2Achieved = false;
        document.getElementById('mm2Background').style.backgroundImage = '';
        document.getElementById('mm2').innerHTML = '1e100 Moss Required';
        moss.mossMilestoneFactor.MM3Achieved = false;
        document.getElementById('mm3Background').style.backgroundImage = '';
        document.getElementById('mm3').innerHTML = '1e200 Moss Required';
        moss.mossMilestoneFactor.MM4Achieved = false;
        document.getElementById('mm4Background').style.backgroundImage = '';
        document.getElementById('mm4').innerHTML = '1e250 Moss Required';
        moss.mossMilestoneFactor.MM5Achieved = false;
        document.getElementById('mm5Background').style.backgroundImage = '';
        document.getElementById('mm5').innerHTML = '1.79e308 Moss Required';
        moss.mossMilestoneFactor.MM6Achieved = false;
        document.getElementById('mm6Background').style.backgroundImage = '';
        document.getElementById('mm6').innerHTML = '1e470 Moss Required';
        moss.mossMilestoneFactor.MM7Achieved = false;
        document.getElementById('mm7Background').style.backgroundImage = '';
        document.getElementById('mm7').innerHTML = '6.66e666 Moss Required';
        moss.mossMilestoneFactor.MM8Achieved = false;
        document.getElementById('mm8Background').style.backgroundImage = '';
        document.getElementById('mm8').innerHTML = '1.337e1337 Moss Required';
        document.querySelector('.moss-upgrade-background').style.visibility = `hidden`;

        moss.mossMilestoneFactor.MM9Achieved = false;
        document.getElementById('mm9Background').style.backgroundImage = '';
        document.getElementById('mm9').innerHTML = '1e2500 Moss Required';
        moss.mossMilestoneFactor.MM10Achieved = false;
        document.getElementById('mm10Background').style.backgroundImage = '';
        document.getElementById('mm10').innerHTML = '1e6000 Moss Required';


        gameData.potentialEnergy = new Decimal(0);
        document.getElementById('entropyUpdateCounter').innerHTML = `5e22 PE Required`

        document.querySelector('.fruits').style.left = '435px';

        document.getElementById("entropyCounter").innerHTML = truncateToDecimalPlaces((gameData.entropy.trunc()), 3)
		document.getElementById("entropyOnTransformCounter").innerHTML = ``;
        document.querySelector('.entropy-reset-button').style.top = '80px';
        document.querySelector('.entropy-reset-button').style.visibility = 'hidden';
        const entropyClass = document.querySelector('.entropy');
        entropyClass.style.color = '#000000ff';
        entropyClass.style.backgroundColor = '#ffffffff';
        entropyClass.style.borderWidth = '0px';

        document.getElementById("fruitCounter").innerHTML = truncateToDecimalPlaces((gameData.fruits.trunc()), 3)
		document.getElementById("fruitsOnHarvestCounter").innerHTML = ``;
        document.querySelector('.fruits-reset-button').style.top = '60px';
        document.querySelector('.fruits-reset-button').style.visibility = 'hidden';
        const fruitsClass = document.querySelector('.fruits');
        fruitsClass.style.color = '#000000ff';
        fruitsClass.style.backgroundColor = '#ffffffff';
        fruitsClass.style.borderWidth = '0px';
        document.getElementById("fruitUpdateCounter").innerHTML = "1e7 Seeds Required"

        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces((gameData.seeds.trunc()), 3)
        document.querySelector('.seeds-reset-button').style.top = '60px';
        document.querySelector('.seeds-reset-button').style.visibility = 'hidden';
        const seedsClass = document.querySelector('.seeds');
        seedsClass.style.color = '#000000ff';
        seedsClass.style.backgroundColor = '#ffffffff';
        seedsClass.style.borderWidth = '0px';
        document.getElementById("seedUpdateCounter").innerHTML = "1e7 Leaves Required"

        updateResourceGUI();

        const x = new Decimal(500).div(gameData.compostingSpeed);
        const y = x.div(new Decimal(1000));
        document.getElementById('leafCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
        document.getElementById('leafFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
        document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made 0 Fertilizers,`;
        document.getElementById('leafComposterButton').disabled = false;
        document.getElementById('leafComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Leaf`;

        document.getElementById('seedCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
        document.getElementById('seedFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
        document.getElementById('seedFertilizerCounter').innerHTML = `The Seed Composter has made 0 Fertilizers,`;
        document.getElementById('seedComposterButton').disabled = false;
        document.getElementById('seedComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Seed`;

        document.getElementById('fruitComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Fruit`;
        document.getElementById('fruitCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
        document.getElementById('fruitFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
        document.getElementById('fruitFertilizerCounter').innerHTML = `The Fruit Composter has made 0 Fertilizers,`;
        document.getElementById('fruitComposterButton').disabled = false;
        document.getElementById('fruitComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Fruit`;

        if (!entropyUpgradeFactor.E5Bought) {
            document.querySelector('.leaf-composter-background').style.visibility = 'hidden';
            document.querySelector('.seed-composter-background').style.visibility = 'hidden';
            document.querySelector('.fruit-composter-background').style.visibility = 'hidden';
        }
        document.querySelector('.moss-background').style.visibility = 'hidden';
        document.querySelector('.moss-milestone-background').style.visibility = 'hidden';
        
        document.getElementById("pleaseWork").innerHTML = "0";
        document.getElementById("leavesPerSecond").innerHTML = "0/s";
        document.getElementById("treeAgeCounter").innerHTML = "0";
        document.getElementById("treeAgePerSecond").innerHTML = "0/s"; 
        document.getElementById("seedCounter").innerHTML = "0";
        document.getElementById("seedsOnDecompolizeCounter").innerHTML = "";
        document.getElementById("leafSoftcap").innerHTML = ""
        document.getElementById("seedSoftcap").innerHTML = ""
        document.getElementById("fruitSoftcap").innerHTML = ""

        setTimeout(automateLeafUpgrades, 500);
    }
}

export function rootsCalculation() {
    const x = gameData.leaves.plus(new Decimal(1));
    const y = Decimal.log10(x);
    const z = Decimal.log((y.plus(new Decimal(1))), new Decimal(10000));
	const w = z.pow(new Decimal(3));
	const v = w.times(gameData.rootsMult);
    gameData.rootsOnReinforce = v;
}

export function rootsGUI() {
    if (gameData.leaves.greaterThanOrEqualTo(new Decimal.fromComponents(1, 1, 10000)) && gameData.blizzardLevel.greaterThan(new Decimal(1))) {
        gameData.canReinforce = true;

        const rootsClass = document.querySelector('.roots');
        rootsClass.style.color = '#ffffffff';
        rootsClass.style.backgroundColor = '#edac13';
        rootsClass.style.borderColor = '#ed9613';
        rootsClass.style.borderStyle = 'solid';
        rootsClass.style.borderWidth = '5px';
        rootsClass.style.borderRadius = '5px';
        
        document.getElementById("rootCounter").innerHTML = truncateToDecimalPlaces(gameData.roots, 3);
		document.getElementById("rootsOnReinforceCounter").innerHTML = `+ (${truncateToDecimalPlaces(((gameData.rootsOnReinforce).trunc()), 3)})`;
		document.getElementById("rootUpdateCounter").innerHTML = `x Roots = (log<sub>1e10000</sub>(x Leaves))<sup>3</sup>`;
        document.querySelector(".roots-reset-button").style.visibility = "visible";
    }
	else {
        gameData.canReinforce = false;
		
        const rootsClass = document.querySelector('.roots');
        rootsClass.style.color = '#000000';
        rootsClass.style.backgroundColor = '#ffffff';
        rootsClass.style.borderColor = '#ffffff';
        rootsClass.style.borderStyle = 'solid';
        rootsClass.style.borderWidth = '5px';
        rootsClass.style.borderRadius = '5px';
		
        document.getElementById("rootCounter").innerHTML = truncateToDecimalPlaces((gameData.roots.trunc()), 3);
		document.getElementById("rootsOnReinforceCounter").innerHTML = ``;
		document.getElementById("rootUpdateCounter").innerHTML = `1e10000 Leaves required`;
        document.querySelector(".roots-reset-button").style.visibility = "hidden";
	}
	if (achievements.ach121) {
		document.querySelector(".buttons-rou-tab-color").style.visibility = "visible";
		document.querySelector(".buttons-root-milestone-tab-color").style.visibility = "visible";
	}
}

export function reinforce() {
    if (gameData.canReinforce) {
        console.log("Reinforcing");
        console.log(upgradesResetByReinforce);
        for (let i = 0; i < upgradesResetByReinforce.length; i++) {
            upgradesResetByReinforce[i].disabled = false;
            upgradesResetByReinforce[i].style.color = '#ffffffff';
            upgradesResetByReinforce[i].innerHTML = upgradeBuilder.reinforceResetText[i];

            const reinforceResetFlags = upgradeBuilder.reinforceResetFlags[i];
            console.log(reinforceResetFlags);
            leafUpgradeFactor[`${reinforceResetFlags}`] = false;
            seedUpgradeFactor[`${reinforceResetFlags}`] = false;
            fruitUpgradeFactor[`${reinforceResetFlags}`] = false;
            entropyUpgradeFactor[`${reinforceResetFlags}`] = false;
        }

        gameData.roots = gameData.roots.plus(gameData.rootsOnReinforce);
        gameData.totalRoots = gameData.totalRoots.plus(gameData.rootsOnReinforce);
		gameData.reinforcements = gameData.reinforcements.plus(new Decimal(1));
        
        if (!achievements.ach121) {
            document.querySelector('.buttons-eu-tab-color').style.visibility = 'visible';
            achievements.ach121 = true;
            massAchievementChecker();
        }

        updateUpgradeCount();

		gameData.lastUpdate = new Decimal(Date.now());
		gameData.totalUpgradeCounter = new Decimal(0);

		gameData.leaves = new Decimal(0);
		gameData.baseLeafSoftcapFactor = new Decimal(0.75);
		gameData.leavesIsSoftcapped = false;
		gameData.leavesIsSoftcapped2 = false;
		gameData.leavesIsSoftcapped3 = false;
		gameData.leavesIsSoftcapped4 = false;
		gameData.leavesIsSoftcapped5 = false;
		gameData.baseLeafSupercapFactor = new Decimal(1);
		gameData.leavesIsSupercapped = false;
		gameData.leavesPerTick = new Decimal(0);
		gameData.tickSpeedMultiplier = new Decimal(0);
		gameData.treeAge = new Decimal(0);
		gameData.treeAgePerTick = new Decimal(0);
		gameData.gameSpeed = new Decimal(1);
		gameData.gameStarted = false;
		gameData.ticksToProcess = new Decimal(0);

		gameData.cheaterMult = new Decimal(1);

		gameData.leafUpgradeCounter = new Decimal(0);

		gameData.leafSoftcapStart = new Decimal(1e20);
		gameData.leafSoftcap2Start = new Decimal(1.79e308);
		gameData.leafSoftcap3Start = new Decimal.fromComponents(1, 1, 500);
		gameData.leafSoftcap4Start = new Decimal.fromComponents(1, 1, 1000);
		gameData.leafSoftcap5Start = new Decimal.fromComponents(1, 1, 2000);
		gameData.leafSupercapStart = new Decimal.fromComponents(1, 1, 2466.03342);

		gameData.baseSeedFactor = new Decimal(1e7);
		gameData.seedsSoftcap = new Decimal(1);
		gameData.baseSeedSoftcapFactor = new Decimal(0.75);
		gameData.visualSeedFactor = new Decimal(1e7);
		gameData.seedChecker = true;
		gameData.seedQuotient = new Decimal(0);
		gameData.baseSeedQuotient = new Decimal(0);
		gameData.canDecompolize = false;
		gameData.seeds = new Decimal(0);

		gameData.seedSoftcapStart = new Decimal.fromComponents(1, 1, 100);
		gameData.seedSoftcap2Start = new Decimal.fromComponents(1, 1, 2000);
		gameData.seedSupercapStart = new Decimal.fromComponents(1, 1, 2466.03342);
		gameData.currentSeedsOnDecompolize = new Decimal(0);
		gameData.highestSeedsOnDecompolize = new Decimal(0);
		gameData.seedsOnDecompolize = new Decimal(0);
		gameData.seedsMult = new Decimal(1);
		gameData.seedUpgradeCounter = new Decimal(0);
		gameData.seedsIsSoftcapped = false;
		gameData.seedsIsSoftcapped2 = false;
		gameData.baseSeedSupercapFactor = new Decimal(1);
		gameData.seedsIsSupercapped = false;

		gameData.leavesStartingPerTick = new Decimal(1);

		gameData.fruits = new Decimal(0);
		gameData.fruitsMult = new Decimal(1);
		gameData.baseFruitSoftcapFactor = new Decimal(0.75);
		gameData.fruitsOnHarvest = new Decimal(0);
		gameData.canHarvest = false;
		gameData.fruitsIsSoftcapped = false;
		gameData.baseFruitSupercapFactor = new Decimal(1);
		gameData.fruitsIsSupercapped = false;

		gameData.fruitUpgradeCounter = new Decimal(0);

		gameData.ticksToUpdateComposter = new Decimal(0);
		gameData.totalFertilizers = new Decimal(0);
		gameData.totalComposters = new Decimal(0);
		gameData.fertilizerBulk = new Decimal(1);
		gameData.compostingSpeed = new Decimal(1);
		gameData.composterCostDivision = new Decimal(1);
		gameData.composterScalingStart = new Decimal(25);
		gameData.composterSuperScalingStart = new Decimal(100);
		gameData.composterSuperScalingEffect = new Decimal(1.1);

		gameData.leafComposterUnlocked = false;
		gameData.seedComposterUnlocked = false;
		gameData.fruitComposterUnlocked = false;
		if (!(rootUpgradeFactor.RO13Bought)) {
			gameData.entropyComposterUnlocked = false;	
		}

        gameData.totalFertilizers = new Decimal(0);
		
        gameData.leafComposterCost = new Decimal(1);
        gameData.leafComposterDiscount = new Decimal(1);
        gameData.leafComposterAmount = new Decimal(0);
        gameData.leafComposterTime = new Decimal(500);
        gameData.leafComposterCount = new Decimal(0);
        gameData.leafComposterEffect = new Decimal(1);
        gameData.leafComposterIsActive = false;

        gameData.seedComposterCost = new Decimal(1);
        gameData.seedComposterDiscount = new Decimal(1);
        gameData.seedComposterAmount = new Decimal(0);
        gameData.seedComposterTime = new Decimal(500);
        gameData.seedComposterCount = new Decimal(0);
        gameData.seedComposterEffect = new Decimal(1);
        gameData.seedComposterIsActive = false;

        gameData.fruitComposterCost = new Decimal(1);
        gameData.fruitComposterDiscount = new Decimal(1);
        gameData.fruitComposterAmount = new Decimal(0);
        gameData.fruitComposterTime = new Decimal(500);
        gameData.fruitComposterCount = new Decimal(0);
        gameData.fruitComposterEffect = new Decimal(1);
        gameData.fruitComposterIsActive = false;
		
		if (!rootUpgradeFactor.RO13Bought) {
			gameData.entropyComposterUnlocked = false;
		}
		gameData.entropyComposterCost = new Decimal(1);
		gameData.entropyComposterAmount = new Decimal(0);
		gameData.entropyComposterDiscount = new Decimal(1);
		gameData.entropyComposterTime = new Decimal(500);
		gameData.entropyComposterCount = new Decimal(0);
		gameData.freeEntropyFertilizers = new Decimal(0);
		gameData.entropyComposterEffect = new Decimal(1);
		gameData.entropyComposterIsActive = false;

        gameData.mossUnlocked = false;
        gameData.mossEffect = new Decimal(0);

		gameData.potentialEnergy = new Decimal(0);
		gameData.potentialEnergyPow = new Decimal(1);
		gameData.entropyOnTransform = new Decimal(0);
		gameData.canTransform = false;
		gameData.entropy = new Decimal(0);
		gameData.entropyMult = new Decimal(1);
		gameData.totalEntropy = new Decimal(0);

		gameData.entropyUpgradeCounter = new Decimal(0);
		
		gameData.highestCircuitsTrue = gameData.highestCircuits;

		gameData.cells = new Decimal(0);
		gameData.highestCells = new Decimal(0);
		gameData.cellsCap = new Decimal(1.79e308);
		gameData.cellsInterval = new Decimal(1000);
		gameData.intervalDivision = new Decimal(1);
		gameData.cellsMult = new Decimal(1);
		gameData.cellsIsSoftcapped = false;
		gameData.overpopulationFactor = new Decimal(1);
		gameData.baseOverpopulationFactor = new Decimal(1);
		gameData.cellsReplicationChance = new Decimal(0.01);
		gameData.cellsReplicationAmount = new Decimal(1);
		gameData.cellsEffectMult = new Decimal(1);
		gameData.cellsLeafEffect = new Decimal(1);
		gameData.cellsSeedEffect = new Decimal(1);
		gameData.cellsFruitEffect = new Decimal(1);
		
		gameData.bacteriaTypes = new Decimal(0);
		gameData.bacteria = new Decimal(0);
		gameData.bacteriaMult = new Decimal(1);
		gameData.bacteriaPow = new Decimal(1);
		gameData.bacteriaCap = new Decimal(1);
		gameData.bacteriaCapMult = new Decimal(1);
		gameData.bacteriaCellsCSMult = new Decimal(1);
		gameData.bacteriaFertilizerMult = new Decimal(0);

		gameData.luAutomationUnlocked = true;
		gameData.suAutomationUnlocked = true;
		gameData.fuAutomationUnlocked = true;
		gameData.euAutomationUnlocked = false;

		gameData.isInChallengeStorm = false;
		gameData.stormcapBaseFactor = new Decimal(0.75);
		gameData.stormBaseRequirement = new Decimal(1e40);
		gameData.stormBestScore = new Decimal(0);
		gameData.stormLevel = new Decimal(1);
		gameData.stormCompletable = false;
		document.querySelector('.challenge-storm').style.visibility = 'hidden';

		gameData.isInChallengeWildfire = false;
		gameData.wildfireBaseFactor = new Decimal(2);
		gameData.wildfireBaseRequirement = new Decimal(50);
		gameData.wildfireBestScore = new Decimal(0);
		gameData.wildfireLevel = new Decimal(1);
		gameData.wildfireCompletable = false;
		document.querySelector('.challenge-wildfire').style.visibility = 'hidden';
		
		gameData.isInChallengeDrought = false;
		gameData.droughtBaseFactor = new Decimal(1e-2);
		gameData.droughtTimeFactor = new Decimal(0);
		gameData.droughtBaseRequirement = new Decimal(1e200);
		gameData.droughtBestScore = new Decimal(0);
		gameData.droughtLevel = new Decimal(1);
		gameData.droughtCompletable = false;
		document.querySelector('.challenge-drought').style.visibility = 'hidden';
		
		gameData.isInChallengeBlizzard = false;
		gameData.blizzardBasePEFactor = new Decimal(0.075);
		gameData.blizzardBaseGameSpeedFactor = new Decimal(1e20);
		gameData.blizzardBaseRequirement = new Decimal(5000);
		gameData.blizzardBestScore = new Decimal(0);
		gameData.blizzardReward = new Decimal(1);
		gameData.blizzardLevel = new Decimal(1);
		gameData.blizzardCompletable = false;
		document.querySelector('.challenge-blizzard').style.visibility = 'hidden';
		
		gameData.dna = new Decimal(0);
		gameData.dnaBlueprints = new Decimal(0);
		gameData.dnaBlueprintsTotal = new Decimal(0);
		gameData.dnaBlueprintCap = new Decimal(0);
		gameData.fabricating = false;
		gameData.dnaBlueprintAmount = new Decimal(0);
		gameData.dnaBlueprintTime = new Decimal(60000);
		gameData.dnaBlueprintNerf = new Decimal(1);
		gameData.rna = new Decimal(0);
		gameData.rnaTimeFactor = new Decimal(0);
             
        leafUpgradeFactor.L4 = new Decimal(1);
        leafUpgradeFactor.L4AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L4Amt = new Decimal(10);
        leafUpgradeFactor.L9 = new Decimal(1);
        leafUpgradeFactor.L10 = new Decimal(1);
        leafUpgradeFactor.L10Bought = false;
        leafUpgradeFactor.L10AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L11 = new Decimal(1);
        leafUpgradeFactor.L11Mult = new Decimal(1);
        leafUpgradeFactor.L11AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L15 = new Decimal(1);
        leafUpgradeFactor.L16 = new Decimal(1);
        leafUpgradeFactor.L16AtUpgradeBought = new Decimal(1);
        leafUpgradeFactor.L17 = new Decimal(1);
        leafUpgradeFactor.L17AtUpgradeBought = new Decimal(1);
		leafUpgradeFactor.L22Leaves = new Decimal(1);
		leafUpgradeFactor.L22Seeds = new Decimal(1);
		leafUpgradeFactor.L22Fruits = new Decimal(1);
		leafUpgradeFactor.L28Leaves = new Decimal(1);
		leafUpgradeFactor.L28Seeds = new Decimal(1);
		leafUpgradeFactor.L28Fruits = new Decimal(1);
		leafUpgradeFactor.L30Leaves = new Decimal(1);
		leafUpgradeFactor.L30Seeds = new Decimal(1);
		leafUpgradeFactor.L30Fruits = new Decimal(1);
		leafUpgradeFactor.L34Leaves = new Decimal(1);
		leafUpgradeFactor.L34Fruits = new Decimal(1);
		leafUpgradeFactor.L34TAS = new Decimal(1);
		leafUpgradeFactor.L38Entropy = new Decimal(1);
		leafUpgradeFactor.L38Leaves = new Decimal(1);
		leafUpgradeFactor.L38CS = new Decimal(1);
		leafUpgradeFactor.L42Leaves = new Decimal(1);
		leafUpgradeFactor.L42Fruits = new Decimal(1);
		leafUpgradeFactor.L42TAS = new Decimal(1);

		seedUpgradeFactor.S3 = new Decimal(0);
		seedUpgradeFactor.S3OnUpgradeBought = new Decimal(0);
		seedUpgradeFactor.S3Total = new Decimal(1e7);
		seedUpgradeFactor.S4 = new Decimal(0);
		seedUpgradeFactor.S4OnUpgradeBought = new Decimal(0);
		seedUpgradeFactor.S4Total = new Decimal(1);
		seedUpgradeFactor.S8 = new Decimal(1);
		seedUpgradeFactor.S8OnUpgradeBought = new Decimal(0);
		seedUpgradeFactor.S9 = new Decimal(0);
		seedUpgradeFactor.S27 = new Decimal(1);
		seedUpgradeFactor.S36 = new Decimal(0);
        
		fruitUpgradeFactor.F3 = new Decimal(0);
		fruitUpgradeFactor.F5 = new Decimal(1);
		fruitUpgradeFactor.F20 = new Decimal(1);
		fruitUpgradeFactor.M1 = new Decimal(0);
		fruitUpgradeFactor.M1EffectMult = new Decimal(1);
		fruitUpgradeFactor.M2 = new Decimal(0);
		fruitUpgradeFactor.M3 = new Decimal(0);
		fruitUpgradeFactor.M3EffectMult = new Decimal(1);
		fruitUpgradeFactor.M4 = new Decimal(0);
		fruitUpgradeFactor.M5 = new Decimal(0);
		fruitUpgradeFactor.M6 = new Decimal(0);
		
		entropyUpgradeFactor.C1Cost = new Decimal(1);
		entropyUpgradeFactor.C1Amount = new Decimal(0);
		entropyUpgradeFactor.C1Increase = new Decimal(1.1);
		entropyUpgradeFactor.C2Cost = new Decimal(1);
		entropyUpgradeFactor.C2Amount = new Decimal(0);
		entropyUpgradeFactor.C2Increase = new Decimal(1e3);
		entropyUpgradeFactor.C3Cost = new Decimal(1);
		entropyUpgradeFactor.C3Amount = new Decimal(0);
		entropyUpgradeFactor.C3Increase = new Decimal(10);
		
		entropyUpgradeFactor.B1Cost = new Decimal(1);
		entropyUpgradeFactor.B1Amount = new Decimal(0);
		entropyUpgradeFactor.B1Effect = new Decimal(0);
		entropyUpgradeFactor.B2Cost = new Decimal(2);
		entropyUpgradeFactor.B2Amount = new Decimal(0);
		entropyUpgradeFactor.B2Effect = new Decimal(0);
		
		entropyUpgradeFactor.R1Cost = new Decimal(5);
		entropyUpgradeFactor.R1Amount = new Decimal(0);
		entropyUpgradeFactor.R1Effect = new Decimal(1);
		entropyUpgradeFactor.R2Cost = new Decimal(2);
		entropyUpgradeFactor.R2Amount = new Decimal(0);
		entropyUpgradeFactor.R2Effect = new Decimal(0);
		entropyUpgradeFactor.R3Cost = new Decimal(10);
		entropyUpgradeFactor.R3Amount = new Decimal(0);
		entropyUpgradeFactor.R3Effect = new Decimal(0);
		entropyUpgradeFactor.R4Cost = new Decimal(100);
		entropyUpgradeFactor.R4Amount = new Decimal(0);
		entropyUpgradeFactor.R4Effect = new Decimal(1);
		entropyUpgradeFactor.R5Cost = new Decimal(20);
		entropyUpgradeFactor.R5Amount = new Decimal(0);
		entropyUpgradeFactor.R5Effect = new Decimal(0);
		entropyUpgradeFactor.R6Cost = new Decimal(100000);
		entropyUpgradeFactor.R6Amount = new Decimal(0);
		entropyUpgradeFactor.R6Effect = new Decimal(0);
		
		entropyUpgradeFactor.rubisco = new Decimal(0);
		entropyUpgradeFactor.rubiscoEffect = new Decimal(1);
		entropyUpgradeFactor.extensin = new Decimal(0);
		entropyUpgradeFactor.extensinEffect = new Decimal(1);
		entropyUpgradeFactor.arganine = new Decimal(0);
		entropyUpgradeFactor.arganineEffect = new Decimal(0);
		entropyUpgradeFactor.glutamine = new Decimal(0);
		entropyUpgradeFactor.glutamineEffect = new Decimal(1);
		entropyUpgradeFactor.glutamate = new Decimal(0);
		entropyUpgradeFactor.glutamateEffect = new Decimal(0);
		entropyUpgradeFactor.asparagine = new Decimal(0);
		entropyUpgradeFactor.asparagineEffect = new Decimal(1);
		entropyUpgradeFactor.agp = new Decimal(0);
		entropyUpgradeFactor.agpEffect = new Decimal(1);
		entropyUpgradeFactor.trb = new Decimal(0);
		entropyUpgradeFactor.trbEffect = new Decimal(1);
		
		entropyUpgradeFactor.E7 = new Decimal(1);
		entropyUpgradeFactor.E9 = new Decimal(0);
		entropyUpgradeFactor.E10 = new Decimal(0);
		entropyUpgradeFactor.E12 = new Decimal(0);
		entropyUpgradeFactor.E26 = new Decimal(1);
        
        temple.repeatableUpgradeFactor.LR1 = new Decimal(0);
        temple.repeatableUpgradeFactor.LR1Cap = new Decimal(10);
        temple.repeatableUpgradeFactor.LR2 = new Decimal(0);
        temple.repeatableUpgradeFactor.LR2Cap = new Decimal(10);
        temple.repeatableUpgradeFactor.SR1 = new Decimal(0);
        temple.repeatableUpgradeFactor.SR1Cap = new Decimal(10);
        temple.repeatableUpgradeFactor.SR2 = new Decimal(0);
        temple.repeatableUpgradeFactor.SR2Cap = new Decimal(10);
        temple.repeatableUpgradeFactor.FR1 = new Decimal(0);
        temple.repeatableUpgradeFactor.FR1Cap = new Decimal(10);

        circuits.upgradeAutobuyerFLOPS = new Decimal(1);
        
        gameData.moss = new Decimal(0);
        moss.mossMilestoneFactor.MM1Achieved = false;
        document.getElementById('mm1Background').style.backgroundImage = '';
        document.getElementById('mm1').innerHTML = '1e80 Moss Required';
        moss.mossMilestoneFactor.MM2Achieved = false;
        document.getElementById('mm2Background').style.backgroundImage = '';
        document.getElementById('mm2').innerHTML = '1e100 Moss Required';
        moss.mossMilestoneFactor.MM3Achieved = false;
        document.getElementById('mm3Background').style.backgroundImage = '';
        document.getElementById('mm3').innerHTML = '1e200 Moss Required';
        moss.mossMilestoneFactor.MM4Achieved = false;
        document.getElementById('mm4Background').style.backgroundImage = '';
        document.getElementById('mm4').innerHTML = '1e250 Moss Required';
        moss.mossMilestoneFactor.MM5Achieved = false;
        document.getElementById('mm5Background').style.backgroundImage = '';
        document.getElementById('mm5').innerHTML = '1.79e308 Moss Required';
        moss.mossMilestoneFactor.MM6Achieved = false;
        document.getElementById('mm6Background').style.backgroundImage = '';
        document.getElementById('mm6').innerHTML = '1e470 Moss Required';
        moss.mossMilestoneFactor.MM7Achieved = false;
        document.getElementById('mm7Background').style.backgroundImage = '';
        document.getElementById('mm7').innerHTML = '6.66e666 Moss Required';
        moss.mossMilestoneFactor.MM8Achieved = false;
        document.getElementById('mm8Background').style.backgroundImage = '';
        document.getElementById('mm8').innerHTML = '1.337e1337 Moss Required';
        document.querySelector('.moss-upgrade-background').style.visibility = `hidden`;
        moss.mossMilestoneFactor.MM9Achieved = false;
        document.getElementById('mm9Background').style.backgroundImage = '';
        document.getElementById('mm9').innerHTML = '1e2500 Moss Required';
        moss.mossMilestoneFactor.MM10Achieved = false;
        document.getElementById('mm10Background').style.backgroundImage = '';
        document.getElementById('mm10').innerHTML = '1e6000 Moss Required';

        document.getElementById("rootCounter").innerHTML = truncateToDecimalPlaces((gameData.roots.trunc()), 3);
		document.getElementById("rootsOnReinforceCounter").innerHTML = ``;
		document.getElementById("rootUpdateCounter").innerHTML = `1e10000 Leaves required`;
        document.querySelector(".roots-reset-button").style.visibility = "hidden";
        const rootsClass = document.querySelector('.roots');
        rootsClass.style.color = '#000000ff';
        rootsClass.style.backgroundColor = '#ffffffff';
        rootsClass.style.borderWidth = '0px';
		
        document.getElementById('entropyUpdateCounter').innerHTML = `5e22 PE Required`

        document.querySelector('.fruits').style.left = '435px';

        document.getElementById("entropyCounter").innerHTML = truncateToDecimalPlaces((gameData.entropy.trunc()), 3) + " Entropy"
		document.getElementById("entropyOnTransformCounter").innerHTML = ``;
        document.querySelector('.entropy-reset-button').style.top = '80px';
        document.querySelector('.entropy-reset-button').style.visibility = 'hidden';
        const entropyClass = document.querySelector('.entropy');
        entropyClass.style.color = '#000000ff';
        entropyClass.style.backgroundColor = '#ffffffff';
        entropyClass.style.borderWidth = '0px';

        document.getElementById("fruitCounter").innerHTML = truncateToDecimalPlaces((gameData.fruits.trunc()), 3)
		document.getElementById("fruitsOnHarvestCounter").innerHTML = ``;
        document.querySelector('.fruits-reset-button').style.top = '60px';
        document.querySelector('.fruits-reset-button').style.visibility = 'hidden';
        const fruitsClass = document.querySelector('.fruits');
        fruitsClass.style.color = '#000000ff';
        fruitsClass.style.backgroundColor = '#ffffffff';
        fruitsClass.style.borderWidth = '0px';
        document.getElementById("fruitUpdateCounter").innerHTML = "1e7 Seeds Required"

        document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces((gameData.seeds.trunc()), 3)
        document.querySelector('.seeds-reset-button').style.top = '60px';
        document.querySelector('.seeds-reset-button').style.visibility = 'hidden';
        const seedsClass = document.querySelector('.seeds');
        seedsClass.style.color = '#000000ff';
        seedsClass.style.backgroundColor = '#ffffffff';
        seedsClass.style.borderWidth = '0px';
        document.getElementById("seedUpdateCounter").innerHTML = "1e7 Leaves Required"

        updateResourceGUI();

        const x = new Decimal(500).div(gameData.compostingSpeed);
        const y = x.div(new Decimal(1000));
        document.getElementById('leafCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
        document.getElementById('leafFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
        document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made 0 Fertilizers,`;
        document.getElementById('leafComposterButton').disabled = false;
        document.getElementById('leafComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Leaf`;

        document.getElementById('seedCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
        document.getElementById('seedFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
        document.getElementById('seedFertilizerCounter').innerHTML = `The Seed Composter has made 0 Fertilizers,`;
        document.getElementById('seedComposterButton').disabled = false;
        document.getElementById('seedComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Seed`;

        document.getElementById('fruitComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Fruit`;
        document.getElementById('fruitCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
        document.getElementById('fruitFertilizerEffect').innerHTML = `boosting Tree Aging Speed by 1x`;
        document.getElementById('fruitFertilizerCounter').innerHTML = `The Fruit Composter has made 0 Fertilizers,`;
        document.getElementById('fruitComposterButton').disabled = false;
        document.getElementById('fruitComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Fruit`;
		
        document.getElementById('entropyComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Entropy`;
        document.getElementById('entropyCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
        document.getElementById('entropyFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ^1x`;
        document.getElementById('entropyFertilizerCounter').innerHTML = `The Entropy Composter has made 0 Fertilizers,`;
        document.getElementById('entropyComposterButton').disabled = false;
        document.getElementById('entropyComposterButton').innerHTML = `Make a Fertilizer<br>Cost: 1 Entropy`;
		
		document.querySelector('.leaf-composter-background').style.visibility = 'hidden';
		document.querySelector('.seed-composter-background').style.visibility = 'hidden';
		document.querySelector('.fruit-composter-background').style.visibility = 'hidden';
		if (!(rootUpgradeFactor.RO13Bought)) {
			document.querySelector('.entropy-composter-background').style.visibility = 'hidden';	
		}
		
        document.querySelector('.moss-background').style.visibility = 'hidden';
        document.querySelector('.moss-milestone-background').style.visibility = 'hidden';
		
		document.getElementById('M1').innerHTML = `M1<br>Delay Super Scaling (0)<br>Delays Fertilizer Super Scaling by 2<br>per upgrade<br>Requires 1e1000 Moss<br>Effect: +0`;
		document.getElementById('M2').innerHTML = `M2<br>Softcap Dampener II (0 / 10)<br>-0.01 Seed softcap root<br>per upgrade<br>Requires 1e1500 Moss<br>Effect: -0`;
		document.getElementById('M3').innerHTML = `M3<br>Time is Slipping By (0)<br>Little boost of x2 TAS<br>per upgrade<br>Requires 1e1000 Moss<br>Effect: x1`;
		document.getElementById('M4').innerHTML = `M4<br>Moss Effect: Andromeda (0)<br>+1 to the total Moss effect<br>per upgrade<br>Requires 1e1500 Moss<br>Effect: +0`;
		document.getElementById('M5').innerHTML = `M5<br>Vermeil (0)<br>+2 to LR1 cap<br>per upgrade<br>Requires 1e1000 Moss<br>Effect: +0`;
		document.getElementById('M6').innerHTML = `M6<br>Gild (0)<br>+0.5 to LR1 effect<br>per upgrade<br>Requires 1e2000 Moss<br>Effect: +0`;
		
		document.getElementById('overpopulation').innerHTML = ``;
		document.getElementById('cellsCounter').innerHTML = `You have created 0 Cells (x1/s),`;
		document.getElementById('cellsEffectCounter').innerHTML = `x1, x1, and x1`;
		document.getElementById('bacteriaTypesCounter').innerHTML = `You have created 0 Bacteria Types, capping Cell count at 1.79e308`;
		
		document.getElementById('replicationChance').innerHTML = `Increase Replication Chance (0)<br>Cost: 1 Entropy<br>Currently 1%`;
		document.getElementById('replicationInterval').innerHTML = `Decrease Replication Interval (0)<br>Cost: 1 Fruit<br>Currently 1000ms`;
		document.getElementById('replicationAmount').style.visibility = `hidden`;
		document.getElementById('replicationAmount').innerHTML = `Increase Replication Amount (0)<br>Cost: 1 Entropy<br>Currently 1x`;
		
		document.getElementById('bacteriaCounter').innerHTML = `You have 0 / 1 Bacteria,`;
		document.getElementById('bacteriaTypeCounterButActual').innerHTML = `You have 0 Bacteria types, boosting the Bacteria cap by x1`;
		document.getElementById('bacteriaEffectCounter').innerHTML = `Your current Bacteria boosts the base Fertilizer effectiveness by +0, and Cell Replication and Composting speeds by x1.`;
		
		document.getElementById('B1').innerHTML = `Free Fertilizers (0)<br>Requires 1 Bacteria<br>Effect: +0 Fertilizers to all Composters`;
		document.getElementById('B2').innerHTML = `Softcap Dampener (0 / 10)<br>Requires 2 Bacteria<br>Effect: -0 to Leaf softcap root`;
			
		document.querySelector('.challenge-storm').style.visibility = `hidden`;
		document.getElementById('stormLevelCounter').innerHTML = `The Storm`;
		document.getElementById('stormIndicator').innerHTML = `Harsh winds and lightning blasts make Leaves, Seeds, and Fruits way harder to sustainably produce. (base of ^0.75)<br>(INACTIVE)`;
		document.getElementById('stormRewardCounter').innerHTML = `Unlock Composter and SU automation, ^1 Leaf base mult, and the Bacteria formula is better.`;
		document.getElementById('stormCounter').innerHTML = `0 / 1e40 Seeds`;
		
		document.querySelector('.challenge-wildfire').style.visibility = `hidden`;
		document.getElementById('wildfireLevelCounter').innerHTML = `The Wildfire`;
		document.getElementById('wildfireIndicator').innerHTML = `A raging firestorm makes Fertilizers impossible to produce. (Free fers are disabled, and (super scaling)^2 starts immediately)<br>(INACTIVE)`;
		document.getElementById('wildfireRewardCounter').innerHTML = `Unlock FU automation, Seed generation, and x1 M1 and M3's effects.`;
		document.getElementById('wildfireCounter').innerHTML = `0 / 50 Fertilizers`;
		
		document.querySelector('.challenge-drought').style.visibility = `hidden`;
		document.getElementById('droughtLevelCounter').innerHTML = `The Drought`;
		document.getElementById('droughtIndicator').innerHTML = `Lack of water for months has made leaves die out constantly and time drag on. (^0.01 to L and TAS, Game speed increases over time)<br>(INACTIVE)`;
		document.getElementById('droughtRewardCounter').innerHTML = `Unlock DNA, RNA, and ^1 CRS`;
		document.getElementById('droughtCounter').innerHTML = `0 / 1e200 Fruits`;
		
		document.querySelector('.challenge-blizzard').style.visibility = `hidden`;
		document.getElementById('blizzardLevelCounter').innerHTML = `The Blizzard`;
		document.getElementById('blizzardIndicator').innerHTML = `Sudden drops in temperature make all forms of energy futile. (^0.075 to PE, Entropy mult, Cells, and Bacteria are disabled, and /1e20 Game speed)<br>(INACTIVE)`;
		document.getElementById('blizzardRewardCounter').innerHTML = `Unlock Roots and ^1 Storm rewards`;
		document.getElementById('blizzardCounter').innerHTML = `0 / 5000 Entropy`;
		
		document.getElementById('blueprintCounter').innerHTML = `0 / 0 DNA Blueprints`;
		document.getElementById('rubiscoCounter').innerHTML = `0 RuBisCo Proteins<br>Seed and Fruit base mult boost Leaves (x1)`;
		document.getElementById('extensinCounter').innerHTML = `0 Extensin Proteins<br>Cells replicate x1 more times every tick`;
		document.getElementById('arganineCounter').innerHTML = `0 Arganine Proteins<br>+0 to all supercap roots`;
		document.getElementById('glutamineCounter').innerHTML = `0 Glutamine Proteins<br>Adds an extra Entropy factor to the Moss formula (x1)`;
		document.getElementById('glutamateCounter').innerHTML = `0 Glutamate Proteins<br>+0 to LR1, SR1, and FR1 caps`;
		document.getElementById('asparagineCounter').innerHTML = `0 Asparagine Proteins<br>Game speed boosts Bacteria base mult (1x)`;
		document.getElementById('agpCounter').innerHTML = `0 AGP Proteins<br>^1 Cell overpopulation division effect`;
		document.getElementById('trbCounter').innerHTML = `0 TRB Proteins<br>x1 RNA and R1's effect`;
		
		document.getElementById('dnaCounter').innerHTML = `You have 0 strands of DNA (next at 1e10000 Cells)`;
		document.getElementById('dnaEffectCounter').innerHTML = `+1 DNA Blueprint cap each strand (0 max DNA Blueprints)`;
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (0 currently) (0 total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintNerfCounter').innerHTML = `CRS and Bacteria are powered to ^1`;
		document.getElementById('blueprintTimeCounter').innerHTML = `Fabricating a DNA Blueprint takes 60 seconds (60 seconds real time)`;
		
		document.getElementById('rnaCounter').innerHTML = `You have 0 strands of RNA (next at 1e55 Bacteria)`;
		document.getElementById('rnaEffectCounter').innerHTML = `+0.1 Game speed mult every second each strand (+0/s)`;
		document.getElementById('R1').innerHTML = `More Game speed (0)<br>Requires 5 RNA strands<br>Effect: x1 Game speed`;
		document.getElementById('R2').innerHTML = `Delay Super Scaling (0)<br>Requires 2 RNA strands<br>Effect: +0 Super Scaling delay`;
		document.getElementById('R3').innerHTML = `Softcap Dampener (0 / 10)<br>Requires 10 RNA strands<br>Effect: -0 from Fruit softcap root`;
		document.getElementById('R4').innerHTML = `Entropificator (0)<br>Requires 100 RNA strands<br>Effect: x1 Entropy`;
		document.getElementById('R5').innerHTML = `Blueprint Dampener (0 / 5)<br>Requires 20 RNA strands<br>Effect: -0 from DNA Blueprint nerf root`;
		document.getElementById('R6').innerHTML = `Viral Amplifier (0)<br>Requires 100000 RNA strands<br>Effect: -0 from Game speed Virus root`;
        
        document.getElementById("pleaseWork").innerHTML = "0";
        document.getElementById("leavesPerSecond").innerHTML = "0/s";
        document.getElementById("treeAgeCounter").innerHTML = "0";
        document.getElementById("treeAgePerSecond").innerHTML = "0/s"; 
        document.getElementById("seedCounter").innerHTML = "0"; 
        document.getElementById("seedsOnDecompolizeCounter").innerHTML = "";
        document.getElementById("leafSoftcap").innerHTML = ""
        document.getElementById("seedSoftcap").innerHTML = ""
        document.getElementById("fruitSoftcap").innerHTML = ""

        setTimeout(automateLeafUpgrades, 500);
    }
}

export function gameSavedTextAnimation() {
    let element = document.querySelector('.game-saved-text')
    element.classList.add('show');
    setTimeout(() => {element.classList.remove('show');}, 3000);
}
export function gameLoadedTextAnimation() {
    let element = document.querySelector('.game-loaded-text')
    element.classList.add('show');
    setTimeout(() => {element.classList.remove('show');}, 3000);
}

export function updateGameData(newData) {
    gameData = newData;
}
export function updateLeafUpgradeFactor(newData) {
    leafUpgradeFactor = newData;
}
export function updateSeedUpgradeFactor(newData) {
    seedUpgradeFactor = newData;
}
export function updateFruitUpgradeFactor(newData) {
    fruitUpgradeFactor = newData;
}
export function updateEntropyUpgradeFactor(newData) {
    entropyUpgradeFactor = newData;
}
export function updateRootUpgradeFactor(newData) {
    rootUpgradeFactor = newData;
}

export function laggyAnusFunction() {
    if (hasInitialized) {
        try {
            if (typeof leafUpgradeCost !== undefined) {
                leafUpgrades.laggyAssFunction();
                seedUpgrades.laggyAssFunction();
                fruitUpgrades.laggyAssFunction();
                entropyUpgrades.laggyAssFunction();
                rootUpgrades.laggyAssFunction();
                gameData.gameStarted = true;
            }
        } catch (error) {
            console.log("the costs for the upgrades haven't been initialized yet")
            return;
        }
    }
}

export function updateGUIBasedOnAchievements() {
    if (hasInitialized) {
        if (achievements.ach14) {
            document.querySelector('.seeds').style.visibility = 'visible';
            document.querySelector('.buttons-su-tab-color').style.visibility = 'visible';
            document.getElementById("seedCounter").innerHTML = truncateToDecimalPlaces((gameData.seeds.trunc()), 3)
        }
        if (achievements.ach23) {
            document.querySelector('.fruits').style.visibility = 'visible';
            document.querySelector('.buttons-fu-tab-color').style.visibility = 'visible';
            document.getElementById("fruitCounter").innerHTML = truncateToDecimalPlaces((gameData.fruits.trunc()), 3)
        }
        if (achievements.ach24) {
            document.querySelector('.buttons-composter-tab-color').style.visibility = 'visible';
        }
        if (achievements.ach24 && gameData.leafComposterUnlocked) {
            document.querySelector('.leaf-composter-background').style.visibility = 'visible';
            if (entropyUpgradeFactor.B1Amount.greaterThanOrEqualTo(new Decimal(1))) {document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made ${truncateToDecimalPlaces(gameData.leafComposterCount, 3)} (+${truncateToDecimalPlaces(gameData.freeLeafFertilizers, 3)}) Fertilizers,`;}
            else {document.getElementById('leafFertilizerCounter').innerHTML = `The Leaf Composter has made ${truncateToDecimalPlaces(gameData.leafComposterCount, 3)} Fertilizers,`;}
            document.getElementById('leafFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${truncateToDecimalPlaces(gameData.leafComposterEffect, 3)}x`;
            document.getElementById('leafComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${truncateToDecimalPlaces(gameData.leafComposterCost, 3)} Leaves`;
            const x = gameData.leafComposterTime.div(new Decimal(1000));
            const y = x.div(gameData.compostingSpeed);
            document.getElementById('leafCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
            gameData.leafComposterIsActive = false;
        }
        if (achievements.ach25 && gameData.seedComposterUnlocked) {
            document.querySelector('.seed-composter-background').style.visibility = 'visible';
            if (entropyUpgradeFactor.B1Amount.greaterThanOrEqualTo(new Decimal(1))) {document.getElementById('seedFertilizerCounter').innerHTML = `The Seed Composter has made ${truncateToDecimalPlaces(gameData.seedComposterCount, 3)} (+${truncateToDecimalPlaces(entropyUpgradeFactor.B1Effect, 3)}) Fertilizers,`;}
            else {document.getElementById('seedFertilizerCounter').innerHTML = `The Seed Composter has made ${truncateToDecimalPlaces(gameData.seedComposterCount, 3)} Fertilizers,`;}
            document.getElementById('seedFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${truncateToDecimalPlaces(gameData.seedComposterEffect, 3)}x`;
            document.getElementById('seedComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${truncateToDecimalPlaces(gameData.seedComposterCost, 3)} Seeds`;
            const x = gameData.seedComposterTime.div(new Decimal(1000));
            const y = x.div(gameData.compostingSpeed);
            document.getElementById('seedCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
            gameData.seedComposterIsActive = false;
        }
        if (achievements.ach32 && gameData.fruitComposterUnlocked) {
            document.querySelector('.fruit-composter-background').style.visibility = 'visible';
            if (entropyUpgradeFactor.B1Amount.greaterThanOrEqualTo(new Decimal(1))) {document.getElementById('fruitFertilizerCounter').innerHTML = `The Fruit Composter has made ${truncateToDecimalPlaces(gameData.fruitComposterCount, 3)} (+${truncateToDecimalPlaces(entropyUpgradeFactor.B1Effect, 3)}) Fertilizers,`;}
            else {document.getElementById('fruitFertilizerCounter').innerHTML = `The Fruit Composter has made ${truncateToDecimalPlaces(gameData.fruitComposterCount, 3)} Fertilizers,`;}
            document.getElementById('fruitFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ${truncateToDecimalPlaces(gameData.fruitComposterEffect, 3)}x`;
            document.getElementById('fruitComposterButton').innerHTML = `Make a Fertilizer<br>Cost: ${truncateToDecimalPlaces(gameData.fruitComposterCost, 3)} Fruits`;
            const x = gameData.fruitComposterTime.div(new Decimal(1000));
            const y = x.div(gameData.compostingSpeed);
            document.getElementById('fruitCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
            gameData.fruitComposterIsActive = false;
        }
        if (achievements.ach43) {
            document.getElementById('mossTab').style.visibility = 'visible';
        }
        if (gameData.mossUnlocked) {
            document.querySelector('.moss-background').style.visibility = 'visible';
            document.querySelector('.moss-milestone-background').style.visibility = 'visible';
        }
        if (achievements.ach41) {
            document.querySelector('.entropy').style.visibility = 'visible';
            document.querySelector('.buttons-eu-tab-color').style.visibility = 'visible';
            document.getElementById("entropyCounter").innerHTML = truncateToDecimalPlaces((gameData.entropy.trunc()), 3)
        }
        if (achievements.ach45) {
            document.getElementById('replicationChance').innerHTML = `Increase Replication Chance (${truncateToDecimalPlaces(entropyUpgradeFactor.C1Amount, 3)})<br>Cost: ${truncateToDecimalPlaces(entropyUpgradeFactor.C1Cost.trunc(), 3)} Entropy<br>Currently ${truncateToDecimalPlaces(entropyUpgradeFactor.C1Amount.plus(new Decimal(1)), 3)}%`;
            document.getElementById('replicationInterval').innerHTML = `Decrease Replication Interval (${truncateToDecimalPlaces(entropyUpgradeFactor.C2Amount, 3)})<br>Cost: ${truncateToDecimalPlaces(entropyUpgradeFactor.C2Cost.trunc(), 3)} Fruits<br>Currently ${truncateToDecimalPlaces(gameData.cellsInterval, 3)}ms`;
            document.getElementById('replicationAmount').innerHTML = `Increase Replication Amount (${truncateToDecimalPlaces(entropyUpgradeFactor.C3Amount, 3)})<br>Cost: ${truncateToDecimalPlaces(entropyUpgradeFactor.C3Cost.trunc(), 3)} Entropy<br>Currently ${truncateToDecimalPlaces((new Decimal(2).pow(entropyUpgradeFactor.C3Amount)), 3)}x`;
        }
        if (achievements.ach55) {
            document.getElementById('bacteriaTypesCounter').innerHTML = `You have created ${truncateToDecimalPlaces(gameData.bacteriaTypes, 3)} Bacteria Types, capping Cell count at ${truncateToDecimalPlaces(gameData.cellsCap, 3)}`;
            document.querySelector('.buttons-bacteria-tab-color').style.visibility = 'visible';
            document.getElementById('cellsIsCapped').style.display = 'none';
            document.getElementById('bacteriaResetButton').style.display = 'none';
            document.getElementById('B1').innerHTML = `Free Fertilizers (${truncateToDecimalPlaces(entropyUpgradeFactor.B1Amount.trunc(), 3)})<br>Requires ${truncateToDecimalPlaces(entropyUpgradeFactor.B1Cost, 3)} Bacteria<br>Effect: +${truncateToDecimalPlaces(entropyUpgradeFactor.B1Effect, 3)} Fertilizers from all Composters`;
            document.getElementById('B2').innerHTML = `Softcap Dampener (${truncateToDecimalPlaces(entropyUpgradeFactor.B2Amount.trunc(), 3)} / 10)<br>Requires ${truncateToDecimalPlaces(entropyUpgradeFactor.B2Cost, 3)} Bacteria<br>Effect: -${truncateToDecimalPlaces(entropyUpgradeFactor.B2Effect, 3)} to Leaf softcap root`;
            document.getElementById('B3').innerHTML = `Cleanroom (${truncateToDecimalPlaces(entropyUpgradeFactor.B3Amount.trunc(), 3)})<br>Requires ${truncateToDecimalPlaces(entropyUpgradeFactor.B3Cost, 3)} Roots<br>Effect: x${truncateToDecimalPlaces(entropyUpgradeFactor.B3Effect, 3)} Bacteria`;
        }
        if (achievements.ach64) {
            gameData.stormBaseRequirement = new Decimal(1e40).pow(gameData.stormLevel);
            if (gameData.isInChallengeStorm) {    
                document.querySelector('.challenge-storm').style.backgroundImage = 'radial-gradient(#3036b0, #5e1111)';
                document.querySelector('.challenge-storm').style.borderColor = '#420b0b';
				const x = new Decimal(0.000542868).times(Decimal.ln(gameData.stormBestScore.plus(new Decimal(1))));
				const y = x.plus(new Decimal(1));
                if (gameData.stormLevel.greaterThan(new Decimal(1))) {document.getElementById('stormLevelCounter').innerHTML = `The Storm^${truncateToDecimalPlaces(gameData.stormLevel, 3)}`; document.getElementById('stormRewardCounter').innerHTML = `Unlock Composter and SU automation, ^${truncateToDecimalPlaces(y, 3)} Leaf base mult, and the Bacteria formula is better.`;}
                else {document.getElementById('stormLevelCounter').innerHTML = `The Storm`;}
                document.getElementById('enterStorm').innerHTML = `EXIT THE STORM`;
                document.getElementById('enterStorm').style.left = `62.5px`;
                document.getElementById('stormIndicator').innerHTML = `Harsh winds and lightning blasts make Leaves, Seeds, and Fruits way harder to sustainably produce. (base of ^${truncateToDecimalPlaces((new Decimal(0.75).pow(gameData.stormLevel)), 3)})<br>(ACTIVE)`;
                document.getElementById('leafStormcapInfo').innerHTML = `The Stormcap affects your Leaves by ^${truncateToDecimalPlaces((new Decimal(0.75).pow(gameData.stormLevel)), 3)}`;
                document.getElementById('seedStormcapInfo').innerHTML = `The Stormcap^5 affects your Seeds by ^${truncateToDecimalPlaces(((new Decimal(0.75).pow(gameData.stormLevel)).pow(new Decimal(5))), 3)}`;
                document.getElementById('fruitStormcapInfo').innerHTML = `The Stormcap^5 affects your Fruits by ^${truncateToDecimalPlaces(((new Decimal(0.75).pow(gameData.stormLevel)).pow(new Decimal(5))), 3)}`;

                challenges.stormCalculation();
            }
            else {
				const x = new Decimal(0.000542868).times(Decimal.ln(gameData.stormBestScore.plus(new Decimal(1))));
				const y = x.plus(new Decimal(1));
                if (gameData.stormLevel.greaterThan(new Decimal(1))) {document.getElementById('stormLevelCounter').innerHTML = `The Storm^${truncateToDecimalPlaces(gameData.stormLevel, 3)}`; document.getElementById('stormRewardCounter').innerHTML = `Unlock Composter and SU automation, ^${truncateToDecimalPlaces(y, 3)} Leaf base mult, and the Bacteria formula is better.`;}
                else {document.getElementById('stormLevelCounter').innerHTML = `The Storm`;}
                document.getElementById('stormIndicator').innerHTML = `Harsh winds and lightning blasts make Leaves, Seeds, and Fruits way harder to sustainably produce. (base of ^${truncateToDecimalPlaces((new Decimal(0.75).pow(gameData.stormLevel)), 3)})<br>(INACTIVE)`;
            }
            document.getElementById('stormCounter').innerHTML = `${truncateToDecimalPlaces(gameData.stormBestScore, 3)} / ${truncateToDecimalPlaces((new Decimal(1e40).pow(gameData.stormLevel)), 3)} Seeds`;
			document.querySelector('.composter-automation-background').style.visibility = `visible`;
        }
        if (achievements.ach81) {
            gameData.wildfireBaseRequirement = new Decimal(50).times(gameData.wildfireLevel);
            if (gameData.isInChallengeWildfire) {    
                document.querySelector('.challenge-wildfire').style.backgroundImage = 'radial-gradient(#e3df20, #b71414)';
                document.querySelector('.challenge-wildfire').style.borderColor = '#420b0b';
                if (gameData.wildfireLevel.greaterThan(new Decimal(1))) {document.getElementById('wildfireLevelCounter').innerHTML = `The Wildfire^${truncateToDecimalPlaces(gameData.wildfireLevel, 3)}`;}
                else {document.getElementById('wildfireLevelCounter').innerHTML = `The Wildfire`;}
				document.getElementById('enterWildfire').innerHTML = `EXIT THE WILDFIRE`;
				document.getElementById('enterWildfire').style.left = `50px`;
				document.getElementById('wildfireIndicator').innerHTML = `A raging firestorm makes Fertilizers impossible to produce. (Free fers are disabled, and (super scaling)^${truncateToDecimalPlaces((new Decimal(2).pow(gameData.wildfireLevel)), 3)} starts immediately)<br>(ACTIVE)`;

                challenges.wildfireCalculation();
            }
            else {
				const x = new Decimal(1.01396).pow(gameData.wildfireBestScore);
				const y = x.clamp(new Decimal(1), new Decimal(Infinity));
                if (gameData.wildfireLevel.greaterThan(new Decimal(1))) {document.getElementById('wildfireLevelCounter').innerHTML = `The Wildfire^${truncateToDecimalPlaces(gameData.wildfireLevel, 3)}`; document.getElementById('wildfireRewardCounter').innerHTML = `Unlock FU automation, Seed generation, and x${truncateToDecimalPlaces(y, 3)} M1 and M3's effects.`;}
                else {document.getElementById('wildfireLevelCounter').innerHTML = `The Wildfire`;}
				document.getElementById('wildfireIndicator').innerHTML = `A raging firestorm makes Fertilizers impossible to produce. (Free fers are disabled, and (super scaling)^${truncateToDecimalPlaces((new Decimal(2).pow(gameData.wildfireLevel)), 3)} starts immediately)<br>(INACTIVE)`;
            }
            document.getElementById('wildfireCounter').innerHTML = `${truncateToDecimalPlaces(gameData.wildfireBestScore, 3)} / ${truncateToDecimalPlaces((new Decimal(50).times(gameData.wildfireLevel)), 3)} Fertilizers`;
        }
		if (achievements.ach101) {
			if (gameData.isInChallengeDrought) {
				gameData.isInChallengeDrought = true;
                if (gameData.droughtLevel.greaterThan(new Decimal(1))) {document.getElementById('droughtLevelCounter').innerHTML = `The Drought^${truncateToDecimalPlaces(gameData.droughtLevel, 3)}`;}
                else {document.getElementById('droughtLevelCounter').innerHTML = `The Drought`;}
				document.querySelector('.challenge-drought').style.backgroundImage = 'radial-gradient(#c79b40, #c74040)';
				document.querySelector('.challenge-drought').style.borderColor = '#991d1d';
				document.getElementById('enterDrought').innerHTML = `EXIT THE DROUGHT`;
				document.getElementById('enterDrought').style.left = `50px`;
				document.getElementById('droughtIndicator').innerHTML = `Lack of water for months has made leaves die out constantly and time drag on. (^${truncateToDecimalPlaces(gameData.droughtBaseFactor, 3)} to L and TAS, Game speed increases over time)<br>(ACTIVE)`;
			}
			else {
				const x = Decimal.log10(gameData.droughtBestScore)
				const y = x.pow(new Decimal(0.0413927));
				const z = y.times(new Decimal(0.909091));
				const w = z.clamp(new Decimal(1), new Decimal(Infinity));
				document.getElementById('droughtRewardCounter').innerHTML = `Unlock DNA, RNA, and ^${truncateToDecimalPlaces(w, 3)} CRS`;
                if (gameData.droughtLevel.greaterThan(new Decimal(1))) {document.getElementById('droughtLevelCounter').innerHTML = `The Drought^${truncateToDecimalPlaces(gameData.droughtLevel, 3)}`;}
                else {document.getElementById('droughtLevelCounter').innerHTML = `The Drought`;}
				document.getElementById('droughtIndicator').innerHTML = `Lack of water for months has made leaves die out constantly and time drag on. (^${truncateToDecimalPlaces(gameData.droughtBaseFactor, 3)} to L and TAS, Game speed increases over time)<br>(INACTIVE)`;
			}
			document.getElementById('droughtCounter').innerHTML = `${truncateToDecimalPlaces(gameData.droughtBestScore, 3)} / ${truncateToDecimalPlaces(gameData.droughtBaseRequirement, 3)} Fruits`;
		}
		if (achievements.ach102) {
			document.querySelector('.buttons-protein-tab-color').style.visibility = `visible`;
			
			document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${truncateToDecimalPlaces(gameData.dnaBlueprints, 3)} currently) (${truncateToDecimalPlaces(gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
			document.getElementById('blueprintCounter').innerHTML = `${truncateToDecimalPlaces(gameData.dnaBlueprints, 3)} / ${truncateToDecimalPlaces(gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
			const v = gameData.dnaBlueprintTime.div(new Decimal(1000));
			const u = v.div(gameData.gameSpeed);
			document.getElementById('blueprintTimeCounter').innerHTML = `Fabricating a DNA Blueprint takes ${truncateToDecimalPlaces(v, 3)} seconds (${truncateToDecimalPlaces(u, 3)} seconds real time)`;
			document.getElementById('blueprintNerfCounter').innerHTML = `CRS and Bacteria are powered to ^${truncateToDecimalPlaces(gameData.dnaBlueprintNerf, 3)}`;
			
			document.getElementById('rubiscoCounter').innerHTML = `${truncateToDecimalPlaces(entropyUpgradeFactor.rubisco, 3)} RuBisCo Proteins<br>Seed and Fruit base mult boost Leaves (x${truncateToDecimalPlaces(entropyUpgradeFactor.rubiscoEffect, 3)})`;
			document.getElementById('extensinCounter').innerHTML = `${truncateToDecimalPlaces(entropyUpgradeFactor.extensin, 3)} Extensin Proteins<br>Cells replicate x${truncateToDecimalPlaces(entropyUpgradeFactor.extensinEffect, 3)} more times each tick`;
			document.getElementById('arganineCounter').innerHTML = `${truncateToDecimalPlaces(entropyUpgradeFactor.arganine, 3)} Arganine Proteins<br>+${truncateToDecimalPlaces(entropyUpgradeFactor.arganineEffect, 3)} to all supercap roots`;
			document.getElementById('glutamineCounter').innerHTML = `${truncateToDecimalPlaces(entropyUpgradeFactor.glutamine, 3)} Glutamine Proteins<br>Adds an extra Entropy factor to the Moss formula (x${truncateToDecimalPlaces(entropyUpgradeFactor.glutamineEffect, 3)})`;
			document.getElementById('glutamateCounter').innerHTML = `${truncateToDecimalPlaces(entropyUpgradeFactor.glutamate, 3)} Glutamate Proteins<br> +${truncateToDecimalPlaces(entropyUpgradeFactor.glutamateEffect, 3)} to LR1, SR1, and FR1 caps`;
			document.getElementById('asparagineCounter').innerHTML = `${truncateToDecimalPlaces(entropyUpgradeFactor.asparagine, 3)} Asparagine Proteins<br> Game speed boosts Bacteria base mult (x${truncateToDecimalPlaces(entropyUpgradeFactor.asparagineEffect, 3)})`;
			document.getElementById('agpCounter').innerHTML = `${truncateToDecimalPlaces(entropyUpgradeFactor.agp, 3)} AGP Proteins<br> ^${truncateToDecimalPlaces(entropyUpgradeFactor.agpEffect, 3)} Cell overpopulation division effect`;
			document.getElementById('trbCounter').innerHTML = `${truncateToDecimalPlaces(entropyUpgradeFactor.trb, 3)} TRB Proteins<br> x${truncateToDecimalPlaces(entropyUpgradeFactor.trbEffect, 3)} RNA and R1's effect`;
		}
        if (achievements.ach105) {
            document.querySelector('.entropy-composter-background').style.visibility = 'visible';
            document.getElementById('entropyFertilizerCounter').innerHTML = `The Entropy Composter has made ${truncateToDecimalPlaces(gameData.entropyComposterCount, 3)} Fertilizers,`;
            document.getElementById('entropyFertilizerEffect').innerHTML = `boosting Tree Aging Speed by ^${truncateToDecimalPlaces(gameData.entropyComposterEffect, 3)}`;
            document.getElementById('entropyComposterButton').innerHTML = `Make a Complex Fertilizer<br>Cost: ${truncateToDecimalPlaces(gameData.entropyComposterCost, 3)} Entropy`;
            const x = gameData.entropyComposterTime.div(new Decimal(1000));
            const y = x.div(gameData.compostingSpeed);
            document.getElementById('entropyCompostingTimer').innerHTML = `Composting takes ${truncateToDecimalPlaces(y, 3)} seconds`;
            gameData.entropyComposterIsActive = false;
        }
		if (achievements.ach113) {
			if (gameData.isInChallengeBlizzard) {
				gameData.isInChallengeBlizzard = true;
                if (gameData.blizzardLevel.greaterThan(new Decimal(1))) {document.getElementById('blizzardLevelCounter').innerHTML = `The Blizzard^${truncateToDecimalPlaces(gameData.blizzardLevel, 3)}`;}
                else {document.getElementById('blizzardLevelCounter').innerHTML = `The Blizzard`;}
				document.querySelector('.challenge-blizzard').style.backgroundImage = 'radial-gradient(#afcccc, #c74040)';
				document.querySelector('.challenge-blizzard').style.borderColor = '#991d1d';
				document.getElementById('enterBlizzard').innerHTML = `EXIT THE BLIZZARD`;
				document.getElementById('enterBlizzard').style.left = `50px`;
				document.getElementById('blizzardIndicator').innerHTML = `Sudden drops in temperature make all forms of energy futile. (^${truncateToDecimalPlaces(gameData.blizzardBasePEFactor, 3)} to PE, Entropy mult, Cells, and Bacteria are disabled, and /${truncateToDecimalPlaces(gameData.blizzardBaseGameSpeedFactor, 3)} Game speed)<br>(ACTIVE)`;
			}
			else {
				const x = Decimal.log10(gameData.blizzardBestScore.plus(new Decimal(1)));
				const y = (x.times(new Decimal(0.270346))).plus(new Decimal(1));
				const z = y.clamp(new Decimal(1), new Decimal(Infinity));
				document.getElementById('blizzardRewardCounter').innerHTML = `Unlock Roots and ^${truncateToDecimalPlaces(z, 3)} Storm rewards`;
                if (gameData.blizzardLevel.greaterThan(new Decimal(1))) {document.getElementById('blizzardLevelCounter').innerHTML = `The Blizzard^${truncateToDecimalPlaces(gameData.blizzardLevel, 3)}`;}
                else {document.getElementById('blizzardLevelCounter').innerHTML = `The Blizzard`;}
				document.getElementById('blizzardIndicator').innerHTML = `Sudden drops in temperature make all forms of energy futile. (^${truncateToDecimalPlaces(gameData.blizzardBasePEFactor, 3)} to PE, Entropy mult, Cells, and Bacteria are disabled, and /${truncateToDecimalPlaces(gameData.blizzardBaseGameSpeedFactor, 3)} Game speed)<br>(INACTIVE)`;
			}
			document.getElementById('blizzardCounter').innerHTML = `${truncateToDecimalPlaces(gameData.blizzardBestScore, 3)} / ${truncateToDecimalPlaces(gameData.blizzardBaseRequirement, 3)} Entropy`;
		}
		if (achievements.ach114) {
			document.querySelector('.roots').style.visibility = `visible`;
			document.querySelector('.bacteria-types-automation-background').style.visibility = `visible`;
		}
    }
}

function loadEndgame() {
    gameData.roots = new Decimal(10);
    gameData.reinforcements = new Decimal(10);
    gameData.highestCircuitsTrue = new Decimal(5000);
	gameData.suAutomationUnlocked = true;
	gameData.fuAutomationUnlocked = true;
    achievements.ach11 = true;
    achievements.ach12 = true;
    achievements.ach13 = true;
    achievements.ach14 = true;
    achievements.ach15 = true;
    achievements.ach21 = true;
    achievements.ach22 = true;
    achievements.ach23 = true;
    achievements.ach24 = true;
    achievements.ach25 = true;
    achievements.ach31 = true;
    achievements.ach32 = true;
    achievements.ach33 = true;
    achievements.ach34 = true;
    achievements.ach35 = true;
    achievements.ach41 = true;
    achievements.ach42 = true;
    achievements.ach43 = true;
    achievements.ach44 = true;
    achievements.ach45 = true;
    achievements.ach51 = true;
    achievements.ach52 = true;
    achievements.ach53 = true;
    achievements.ach54 = true;
    achievements.ach55 = true;
    achievements.ach61 = true;
    achievements.ach62 = true;
    achievements.ach63 = true;
    achievements.ach64 = true;
    achievements.ach65 = true;
    achievements.ach71 = true;
    achievements.ach72 = true;
    achievements.ach73 = true;
    achievements.ach74 = true;
    achievements.ach75 = true;
    achievements.ach81 = true;
    achievements.ach82 = true;
    achievements.ach83 = true;
    achievements.ach84 = true;
    achievements.ach85 = true;
    achievements.ach91 = true;
    achievements.ach92 = true;
    achievements.ach93 = true;
    achievements.ach94 = true;
    achievements.ach95 = true;
    achievements.ach101 = true;
    achievements.ach102 = true;
    achievements.ach103 = true;
    achievements.ach104 = true;
    achievements.ach105 = true;
    achievements.ach111 = true;
    achievements.ach112 = true;
    achievements.ach113 = true;
    achievements.ach114 = true;
    achievements.ach115 = true;
    achievements.ach121 = true;
    achievements.ach122 = true;
    achievements.ach123 = true;
    massAchievementChecker();
}

document.getElementById("loadEndgame").addEventListener("click", loadEndgame);

export function updateUpgradeCount() {
    let temporaryLeafUpgradeCounter = new Decimal(0);
    let temporarySeedUpgradeCounter = new Decimal(0);
    let temporaryFruitUpgradeCounter = new Decimal(0);
    let temporaryEntropyUpgradeCounter = new Decimal(0);
    let temporaryRootUpgradeCounter = new Decimal(0);
    for (const key in leafUpgradeFactor) {
        const value = leafUpgradeFactor[key];
        if (value === true) {
            temporaryLeafUpgradeCounter = temporaryLeafUpgradeCounter.plus(new Decimal(1));
        }
    }
    gameData.leafUpgradeCounter = temporaryLeafUpgradeCounter;
    for (const key in seedUpgradeFactor) {
        const value = seedUpgradeFactor[key];
        if (value === true) {
            temporarySeedUpgradeCounter = temporarySeedUpgradeCounter.plus(new Decimal(1));
        }
    }
    gameData.seedUpgradeCounter = temporarySeedUpgradeCounter;
    for (const key in fruitUpgradeFactor) {
        const value = fruitUpgradeFactor[key];
        if (value === true) {
            temporaryFruitUpgradeCounter = temporaryFruitUpgradeCounter.plus(new Decimal(1));
        }
    }
    gameData.fruitUpgradeCounter = temporaryFruitUpgradeCounter;
    for (const key in entropyUpgradeFactor) {
        const value = entropyUpgradeFactor[key];
        if (value === true) {
            temporaryEntropyUpgradeCounter = temporaryEntropyUpgradeCounter.plus(new Decimal(1));
        }
    }
    gameData.entropyUpgradeCounter = temporaryEntropyUpgradeCounter;
    for (const key in rootUpgradeFactor) {
        const value = rootUpgradeFactor[key];
        if (value === true) {
            temporaryRootUpgradeCounter = temporaryRootUpgradeCounter.plus(new Decimal(1));
        }
    }
    gameData.rootUpgradeCounter = temporaryRootUpgradeCounter;

    const x = temporaryLeafUpgradeCounter.plus(temporarySeedUpgradeCounter);
    const y = x.plus(temporaryFruitUpgradeCounter);
    const z = y.plus(temporaryEntropyUpgradeCounter);
    const w = z.plus(temporaryRootUpgradeCounter);

    gameData.totalUpgradeCounter = w;
}

export function updateResourceGUI() {
    let fruitsOffset = 0;
    let entropyOffset = 0;
    let rootsOffset = 0;
    const decompolizeOffset = 30;
    const harvestOffset = 30;
    const transformOffset = 40;

    if (gameData.canDecompolize) {
        fruitsOffset = fruitsOffset + decompolizeOffset;
        entropyOffset = entropyOffset + decompolizeOffset;
        rootsOffset = rootsOffset + decompolizeOffset;
    }
    if (gameData.canHarvest) {
        entropyOffset = entropyOffset + harvestOffset;
        rootsOffset = rootsOffset + harvestOffset;
    }
	if (gameData.canTransform) {
		rootsOffset = rootsOffset + transformOffset;
	}
    document.querySelector('.fruits').style.left = `${fruitsOffset + 435}px`;
    document.querySelector('.fruits-reset-button').style.left = `${fruitsOffset + 475}px`;

    document.querySelector('.entropy').style.left = `${entropyOffset + 600}px`;
	
    document.querySelector('.roots').style.left = `${rootsOffset + 760}px`;
}
import * as storage from './core/bunchobullshit.mjs';
import * as fallenLeaves from './fallenleaves.mjs';
import { achievements, massAchievementChecker } from './achievements.mjs';
import { activeMicroorganismEffects } from './core/calculations.mjs';

function entropyUpgradeSwitcher() {
	if (storage.entropyUpgradeFactor.E44Bought) {
		return "E44";
	}
	if (storage.entropyUpgradeFactor.E37Bought) {
		return "E37";
	}
	return "none";
}

export function DNACalculation() {
	if (storage.gameData.droughtLevel.gt(new Decimal(1))) {
		const x = Decimal.log10(storage.gameData.cells.plus(new Decimal(1)));
		var y;
		var z;
		const v = new Decimal(10000);
		var u;
		switch (entropyUpgradeSwitcher()) {
			case "E44":
				y = new Decimal(7.15502).times(Decimal.ln(x.plus(new Decimal(1))));
				z = y.minus(new Decimal(64.9002));
				u = v.times(new Decimal(1.15).pow(storage.gameData.dna));
				break;
			case "E37":
				y = new Decimal(4.48142).times(Decimal.ln(x.plus(new Decimal(1))));
				z = y.minus(new Decimal(40.2754));
				u = v.times(new Decimal(1.25).pow(storage.gameData.dna));
				break;
			case "none":
				y = new Decimal(2.4663).times(Decimal.ln(x.plus(new Decimal(1))));
				z = y.minus(new Decimal(21.71549));
				u = v.times(new Decimal(1.5).pow(storage.gameData.dna));
				break;
		}
		let w = z.trunc();
		storage.gameData.dna = w;
		let dnaSoftcap = storage.gameData.dnaMult;
		if (storage.gameData.dnaMult.gte(new Decimal(10))) {
			dnaSoftcap = storage.SC(storage.gameData.dnaMult, new Decimal(10), new Decimal(0.01));
		}
		const dnaFreeReference = w.times(dnaSoftcap).minus(storage.gameData.dna);
		storage.gameData.dnaFree = dnaFreeReference;
		
		const t = new Decimal(10).pow(u);
		if (dnaFreeReference.gte(1)) {
			if (storage.gameData.dnaMult.gte(new Decimal(10))) {
				document.getElementById('dnaCounter').innerHTML = `You have ${storage.truncateToDecimalPlaces(w, 3)} (+<span class="softcap">${storage.truncateToDecimalPlaces(dnaFreeReference, 3)}</span>) strands of DNA (next at ${storage.truncateToDecimalPlaces(t, 3)} Cells)`;
			}
			else {
				document.getElementById('dnaCounter').innerHTML = `You have ${storage.truncateToDecimalPlaces(w, 3)} (+${storage.truncateToDecimalPlaces(dnaFreeReference, 3)}) strands of DNA (next at ${storage.truncateToDecimalPlaces(t, 3)} Cells)`;
			}
		}
		else {
			document.getElementById('dnaCounter').innerHTML = `You have ${storage.truncateToDecimalPlaces(storage.gameData.dna, 3)} strands of DNA (next at ${storage.truncateToDecimalPlaces(t, 3)} Cells)`;
		}
		
		if (w.gte(new Decimal(1))) {
			document.getElementById('dnaEffectCounter').innerHTML = `+1 DNA Blueprint cap each strand (${storage.truncateToDecimalPlaces(w.plus(dnaFreeReference), 3)} max DNA Blueprints)`;
		}
		if (w.gte(new Decimal(10))) {
			achievements.ach124 = true;
		}
	}
}

export function dnaBlueprintCost() {
	const s = storage.gameData.dnaBlueprintTime.div(new Decimal(1000));
	const r = s.div(storage.gameData.gameSpeed)
	document.getElementById('blueprintTimeCounter').innerHTML = `Fabricating a DNA Blueprint takes ${storage.truncateToDecimalPlaces(s, 3)} seconds (${storage.truncateToDecimalPlaces(r, 3)} seconds real time)`;
	
	if (storage.entropyUpgradeFactor.R5Amount.gte(new Decimal(1))) {
		const a = new Decimal(0.95);
		const x = new Decimal(0.005);
		const y = storage.entropyUpgradeFactor.R5Amount.times(x);
		const z = a.plus(y);
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^${storage.truncateToDecimalPlaces(z, 3)} your CRS and Bacteria`;
	}
}

export function checkDNABlueprints() {
	if (storage.gameData.dna.gte(new Decimal(1))) {
		if (storage.gameData.dnaBlueprintsTotal.lt(storage.gameData.dna.plus(storage.gameData.dnaFree))) {
			storage.gameData.fabricating = true;
			document.getElementById('makeBlueprints').disabled = true;
			document.getElementById("makeBlueprints").style.color = '#000000'
			document.getElementById("makeBlueprints").style.borderColor = '#000000'
		}
	}
}

document.getElementById('makeBlueprints').addEventListener("click", checkDNABlueprints);

export function updateDNABlueprints() {
	var a = new Decimal(0.95);
	if (storage.entropyUpgradeFactor.R5Amount.gte(new Decimal(1))) {
		const x = new Decimal(0.005);
		const y = storage.entropyUpgradeFactor.R5Amount.times(x);
		a = a.plus(y);
		document.getElementById('R5').innerHTML = `Blueprint Dampener (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Amount, 3)} / 5)<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Cost, 3)} RNA strands<br>Effect: -${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Effect, 3)} from DNA Blueprint base nerf root`;
	}
	var t = a.pow(storage.gameData.dnaBlueprintsTotal);
	var u = t.plus(storage.gameData.dnaBlueprintNerfBuff);
	storage.gameData.dnaBlueprintNerf = u.clamp(new Decimal(0.01), new Decimal(1));
	document.getElementById('blueprintNerfCounter').innerHTML = `CRS and Bacteria are powered to ^${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintNerf, 3)}`;
	
	if (storage.gameData.fabricating) {
        if (storage.gameData.dnaBlueprintAmount.lt(storage.gameData.dnaBlueprintTime)) {
            const x = storage.gameData.ticksToUpdateComposter.times(storage.gameData.gameSpeed);
            storage.gameData.dnaBlueprintAmount = storage.gameData.dnaBlueprintAmount.plus(x);

            const y = storage.gameData.dnaBlueprintAmount.div(storage.gameData.dnaBlueprintTime);
            const z = y.times(new Decimal(100));
            const w = storage.truncateToDecimalPlaces(z, 0);
            document.querySelector('.dna-progress-bar').style.width = w + '%';
        }
        else {
            storage.gameData.fabricating = false;
            document.getElementById('makeBlueprints').disabled = false;
            document.getElementById('makeBlueprints').style.color = '#ffffff'
            document.getElementById('makeBlueprints').style.borderColor = '#2440c9'

            dnaBlueprintOperation(storage.gameData.dnaBlueprintBulk);
            //pass in a Decimal() to test the bulk capabilities :)
        }
	}
}

function dnaBlueprintOperation(bulk) {
    storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.plus(bulk);
    storage.gameData.dnaBlueprintsTotal = storage.gameData.dnaBlueprintsTotal.plus(bulk);

    document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
	
	document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;

    storage.gameData.dnaBlueprintTime = storage.gameData.dnaBlueprintTime.times(new Decimal(10).pow(bulk));
    const v = storage.gameData.dnaBlueprintTime.div(new Decimal(1000));
    const u = v.div(storage.gameData.gameSpeed);
	document.getElementById('blueprintTimeCounter').innerHTML = `Fabricating a DNA Blueprint takes ${storage.truncateToDecimalPlaces(v, 3)} seconds (${storage.truncateToDecimalPlaces(u, 3)} seconds real time)`;
	
	var a = new Decimal(0.95);
	if (storage.entropyUpgradeFactor.R5Amount.gte(new Decimal(1))) {
		const x = new Decimal(0.005);
		const y = storage.entropyUpgradeFactor.R5Amount.times(x);
		a = a.plus(y);
		document.getElementById('R5').innerHTML = `Blueprint Dampener (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Amount, 3)} / 5)<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Cost, 3)} RNA strands<br>Effect: -${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Effect, 3)} from DNA Blueprint base nerf root`;
	}
	var t = a.pow(bulk);
	storage.gameData.dnaBlueprintNerf = storage.gameData.dnaBlueprintNerf.times(t);
	document.getElementById('blueprintNerfCounter').innerHTML = `CRS and Bacteria are powered to ^${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintNerf, 3)}`;

    storage.gameData.dnaBlueprintAmount = new Decimal(0);
    document.querySelector('.dna-progress-bar').style.width = '100%';
}

function respecDNABlueprints() {
    storage.gameData.dnaBlueprints = new Decimal(0);
    storage.gameData.dnaBlueprintsTotal = new Decimal(0);
    document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (0 currently) (0 total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
	document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} DNA Blueprints`;
	
	storage.gameData.dnaBlueprintTime = new Decimal(60000);
    const v = storage.gameData.dnaBlueprintTime.div(new Decimal(1000));
    const u = v.div(storage.gameData.gameSpeed);
	document.getElementById('blueprintTimeCounter').innerHTML = `Fabricating a DNA Blueprint takes 60 seconds (${storage.truncateToDecimalPlaces(u, 3)} seconds real time)`;
	
	storage.gameData.dnaBlueprintNerf = new Decimal(1);
	document.getElementById('blueprintNerfCounter').innerHTML = `CRS and Bacteria are powered to ^${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintNerf, 3)}`;
	
	storage.entropyUpgradeFactor.rubisco = new Decimal(0);
	storage.entropyUpgradeFactor.rubiscoEffect = new Decimal(1);
	document.getElementById('rubiscoCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubisco, 3)} RuBisCo Proteins<br>Seed and Fruit base mult boost Leaves (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubiscoEffect, 3)})`;
	
	storage.entropyUpgradeFactor.extensin = new Decimal(0);
	storage.entropyUpgradeFactor.extensinEffect = new Decimal(1);
	document.getElementById('extensinCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.extensin, 3)} Extensin Proteins<br>Cells replicate x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.extensinEffect, 3)} more times each tick`;
	
	storage.entropyUpgradeFactor.arganine = new Decimal(0);
	storage.entropyUpgradeFactor.arganineEffect = new Decimal(0);
	document.getElementById('arganineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.arganine, 3)} Arganine Proteins<br>+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.arganineEffect, 3)} to all supercap roots`;
	
	storage.entropyUpgradeFactor.glutamine = new Decimal(0);
	storage.entropyUpgradeFactor.glutamineEffect = new Decimal(1);
	document.getElementById('glutamineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamine, 3)} Glutamine Proteins<br>Adds an extra Entropy factor to the Moss formula (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamineEffect, 3)})`;
	
	storage.entropyUpgradeFactor.glutamate = new Decimal(0);
	storage.entropyUpgradeFactor.glutamateEffect = new Decimal(0);
	document.getElementById('glutamateCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamate, 3)} Glutamate Proteins<br> +${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamateEffect, 3)} to LR1, SR1, and FR1 caps`;
	
	storage.entropyUpgradeFactor.asparagine = new Decimal(0);
	storage.entropyUpgradeFactor.asparagineEffect = new Decimal(1);
	document.getElementById('asparagineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.asparagine, 3)} Asparagine Proteins<br> Game speed boosts Bacteria base mult (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.asparagineEffect, 3)})`;
	
	storage.entropyUpgradeFactor.agp = new Decimal(0);
	storage.entropyUpgradeFactor.agpEffect = new Decimal(1);
	document.getElementById('agpCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agp, 3)} AGP Proteins<br> ^${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agpEffect, 3)} Cell overpopulation division effect`;
	
	storage.entropyUpgradeFactor.trb = new Decimal(0);
	storage.entropyUpgradeFactor.trbEffect = new Decimal(1);
	document.getElementById('trbCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.trb, 3)} TRB Proteins<br> x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.trbEffect, 3)} RNA and R1's effect`;
	
	storage.gameData.canTransform = true;
	storage.transform();
}

document.getElementById('respecBlueprints').addEventListener("click", respecDNABlueprints);


export function RNACalculation() {
	if (storage.gameData.droughtLevel.gt(new Decimal(1))) {
		const x = Decimal.log10(storage.gameData.bacteria.plus(new Decimal(1)));
		const y = new Decimal(0.2).times(x);
		const z = y.minus(new Decimal(10));
		const w = z.times(storage.gameData.rnaMult);
		const r = w.trunc();
		storage.gameData.rna = r.clamp(new Decimal(0), new Decimal(Infinity));
		
		const v = storage.gameData.rna.plus(new Decimal(1));
		const u = (new Decimal(5).times(v)).plus(new Decimal(55));
		document.getElementById('rnaCounter').innerHTML = `You have ${storage.truncateToDecimalPlaces(storage.gameData.rna, 3)} strands of RNA (next at 1e${storage.truncateToDecimalPlaces(u, 3)} Bacteria)`;
	}
}

export function buyR1() {
	let bulk = 1;
	for (let i = 0; i < bulk; i++) {
		R1();
	}
}

function R1() {
	if (storage.gameData.rna.gte(storage.entropyUpgradeFactor.R1Cost)) {
		storage.entropyUpgradeFactor.R1Amount = storage.entropyUpgradeFactor.R1Amount.plus(new Decimal(1));
		storage.entropyUpgradeFactor.R1Cost = storage.entropyUpgradeFactor.R1Cost.pow(new Decimal(1.1));
		storage.entropyUpgradeFactor.R1Effect = storage.entropyUpgradeFactor.R1Effect.times(new Decimal(1.5));
		document.getElementById('R1').innerHTML = `More Game speed (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R1Amount, 3)})<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R1Cost, 3)} RNA strands<br>Effect: x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R1Effect, 3)} Game speed`;
	}
}
document.getElementById('R1').addEventListener("click", R1);

export function buyR2() {
	let bulk = 1;
	for (let i = 0; i < bulk; i++) {
		R2();
	}
}

function R2() {
	if (storage.gameData.rna.gte(storage.entropyUpgradeFactor.R2Cost)) {
		storage.entropyUpgradeFactor.R2Amount = storage.entropyUpgradeFactor.R2Amount.plus(new Decimal(1));
		storage.entropyUpgradeFactor.R2Cost = storage.entropyUpgradeFactor.R2Cost.pow(new Decimal(1.1));
		storage.entropyUpgradeFactor.R2Effect = storage.entropyUpgradeFactor.R2Effect.plus(new Decimal(1.5));
		document.getElementById('R2').innerHTML = `Delay Super Scaling (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R2Amount, 3)})<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R2Cost, 3)} RNA strands<br>Effect: +${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R2Effect, 3)} Super Scaling delay`;
	}
}
document.getElementById('R2').addEventListener("click", R2);

export function buyR3() {
	let bulk = 1;
	for (let i = 0; i < bulk; i++) {
		R3();
	}
}

function R3() {
	if (storage.gameData.rna.gte(storage.entropyUpgradeFactor.R3Cost)) {
		storage.entropyUpgradeFactor.R3Amount = storage.entropyUpgradeFactor.R3Amount.plus(new Decimal(1));
		storage.entropyUpgradeFactor.R3Cost = storage.entropyUpgradeFactor.R3Cost.pow(new Decimal(1.1));
		storage.entropyUpgradeFactor.R3Effect = storage.entropyUpgradeFactor.R3Effect.plus(new Decimal(0.01));
		document.getElementById('R3').innerHTML = `Softcap Dampener III (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R3Amount, 3)} / 10)<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R3Cost, 3)} RNA strands<br>Effect: -${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R3Effect, 3)} from Fruit softcap root`;
	}
	if (storage.entropyUpgradeFactor.R3Amount.gte(new Decimal(10))) {
		storage.entropyUpgradeFactor.R3Cost = new Decimal(Infinity);
		document.getElementById('R3').innerHTML = `Softcap Dampener III (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R3Amount, 3)} / 10)<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R3Cost, 3)} RNA strands<br>Effect: -${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R3Effect, 3)} from Fruit softcap root`;
	}
}
document.getElementById('R3').addEventListener("click", R3);

export function buyR4() {
	let bulk = 1;
	for (let i = 0; i < bulk; i++) {
		R4();
	}
}

function R4() {
	if (storage.gameData.rna.gte(storage.entropyUpgradeFactor.R4Cost)) {
		storage.entropyUpgradeFactor.R4Amount = storage.entropyUpgradeFactor.R4Amount.plus(new Decimal(1));
		storage.entropyUpgradeFactor.R4Cost = storage.entropyUpgradeFactor.R4Cost.pow(new Decimal(1.1));
		storage.entropyUpgradeFactor.R4Effect = storage.entropyUpgradeFactor.R4Effect.times(new Decimal(3));
		document.getElementById('R4').innerHTML = `Entropificator (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R4Amount, 3)})<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R4Cost, 3)} RNA strands<br>Effect: x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R4Effect, 3)} Entropy`;
	}
}
document.getElementById('R4').addEventListener("click", R4);

export function buyR5() {
	let bulk = 1;
	for (let i = 0; i < bulk; i++) {
		R5();
	}
}

function R5() {
	if (storage.gameData.rna.gte(storage.entropyUpgradeFactor.R5Cost)) {
		storage.entropyUpgradeFactor.R5Amount = storage.entropyUpgradeFactor.R5Amount.plus(new Decimal(1));
		storage.entropyUpgradeFactor.R5Cost = storage.entropyUpgradeFactor.R5Cost.pow(new Decimal(1.1));
		storage.entropyUpgradeFactor.R5Effect = storage.entropyUpgradeFactor.R5Effect.plus(new Decimal(0.005));
		document.getElementById('R5').innerHTML = `Blueprint Dampener (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Amount, 3)} / 5)<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Cost, 3)} RNA strands<br>Effect: -${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Effect, 3)} from DNA Blueprint base nerf root`;
	}
	if (storage.entropyUpgradeFactor.R5Amount.gte(new Decimal(5))) {
		storage.entropyUpgradeFactor.R5Cost = new Decimal(Infinity);
		document.getElementById('R5').innerHTML = `Blueprint Dampener (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Amount, 3)} / 5)<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Cost, 3)} RNA strands<br>Effect: -${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Effect, 3)} from DNA Blueprint base nerf root`;
	}
}
document.getElementById('R5').addEventListener("click", R5);

export function buyR6() {
	let bulk = 1;
	for (let i = 0; i < bulk; i++) {
		R6();
	}
}

function R6() {
	if (storage.gameData.rna.gte(storage.entropyUpgradeFactor.R6Cost)) {
		storage.entropyUpgradeFactor.R6Amount = storage.entropyUpgradeFactor.R6Amount.plus(new Decimal(1));
		storage.entropyUpgradeFactor.R6Cost = storage.entropyUpgradeFactor.R6Cost.pow(new Decimal(1.1));
		storage.entropyUpgradeFactor.R6Effect = storage.entropyUpgradeFactor.R6Effect.times(new Decimal(1.1));
		document.getElementById('R6').innerHTML = `Faster Falling (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R6Amount, 3)})<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R6Cost, 3)} RNA strands<br>Effect: x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R6Effect, 3)} FL fall speed`;
	}
}
document.getElementById('R6').addEventListener("click", R6);

function R7() {
	if (storage.gameData.rna.gte(storage.entropyUpgradeFactor.R7Cost)) {
		storage.entropyUpgradeFactor.R7Amount = storage.entropyUpgradeFactor.R7Amount.plus(new Decimal(1));
		storage.entropyUpgradeFactor.R7Cost = storage.entropyUpgradeFactor.R7Cost.pow(new Decimal(1.1));
		storage.entropyUpgradeFactor.R7Effect = storage.entropyUpgradeFactor.R7Effect.plus(new Decimal(1));
		document.getElementById('R7').innerHTML = `Flowing Leaves (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R7Amount, 3)})<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R7Cost, 3)} RNA strands<br>Effect: -${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R7Effect, 3)} from FL game speed divisor`;
	}
}
document.getElementById('R7').addEventListener("click", R7);

function RuBisCo() {
	if (storage.gameData.dnaBlueprints.gte(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		storage.entropyUpgradeFactor.rubisco = storage.entropyUpgradeFactor.rubisco.plus(new Decimal(1));
	}
}
document.getElementById('makeRuBisCo').addEventListener("click", RuBisCo);
export function autoRuBisCo(value) {
	if (value.lt(new Decimal(1))) {
		storage.entropyUpgradeFactor.rubiscoDoneLoading = true;
		return;
	}
	const bulk = storage.gameData.dnaBlueprintBulk;
	const amount = value.minus(storage.entropyUpgradeFactor.rubisco);
	if (amount.gt(new Decimal(0))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(bulk);
		storage.entropyUpgradeFactor.rubisco = storage.entropyUpgradeFactor.rubisco.plus(bulk);
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	}
	else {
		storage.entropyUpgradeFactor.rubiscoDoneLoading = true;
		return;
	}
}
document.getElementById('bulkBuyRuBisCo').addEventListener("change", function() {
    let newValue = new Decimal(document.getElementById("bulkBuyRuBisCo").value);
    if (newValue.gte(storage.gameData.dnaBlueprints)) {
        newValue = storage.gameData.dnaBlueprints;
    }
    document.getElementById('bulkBuyRuBisCo').value = '';
	if (newValue < 1) {
		return;
	}
	storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(newValue);
	document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
	document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	storage.entropyUpgradeFactor.rubisco = storage.entropyUpgradeFactor.rubisco.plus(newValue);
});

function Extensin() {
	if (storage.gameData.dnaBlueprints.gte(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		storage.entropyUpgradeFactor.extensin = storage.entropyUpgradeFactor.extensin.plus(new Decimal(1));
	}
}
document.getElementById('makeExtensin').addEventListener("click", Extensin);
export function autoExtensin(value) {
	if (value.lt(new Decimal(1))) {
		storage.entropyUpgradeFactor.extensinDoneLoading = true;
		return;
	}
	const bulk = storage.gameData.dnaBlueprintBulk;
	const amount = value.minus(storage.entropyUpgradeFactor.extensin);
	if (amount.gt(new Decimal(0))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(bulk);
		storage.entropyUpgradeFactor.extensin = storage.entropyUpgradeFactor.extensin.plus(bulk);
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	}
	else {
		storage.entropyUpgradeFactor.extensinDoneLoading = true;
		return;
	}
}
document.getElementById('bulkBuyExtensin').addEventListener("change", function() {
    let newValue = new Decimal(document.getElementById("bulkBuyExtensin").value);
    if (newValue.gte(storage.gameData.dnaBlueprints)) {
        newValue = storage.gameData.dnaBlueprints;
    }
    document.getElementById('bulkBuyExtensin').value = '';
	if (newValue < 1) {
		return;
	}
	storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(newValue);
	document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
	document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	storage.entropyUpgradeFactor.extensin = storage.entropyUpgradeFactor.extensin.plus(newValue);
});

function Arganine() {
	if (storage.gameData.dnaBlueprints.gte(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		storage.entropyUpgradeFactor.arganine = storage.entropyUpgradeFactor.arganine.plus(new Decimal(1));
	}
}
document.getElementById('makeArganine').addEventListener("click", Arganine);
export function autoArganine(value) {
	if (value.lt(new Decimal(1))) {
		storage.entropyUpgradeFactor.arganineDoneLoading = true;
		return;
	}
	const bulk = storage.gameData.dnaBlueprintBulk;
	const amount = value.minus(storage.entropyUpgradeFactor.arganine);
	if (amount.gt(new Decimal(0))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(bulk);
		storage.entropyUpgradeFactor.arganine = storage.entropyUpgradeFactor.arganine.plus(bulk);
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	}
	else {
		storage.entropyUpgradeFactor.arganineDoneLoading = true;
		return;
	}
}
document.getElementById('bulkBuyArganine').addEventListener("change", function() {
    let newValue = new Decimal(document.getElementById("bulkBuyArganine").value);
    if (newValue.gte(storage.gameData.dnaBlueprints)) {
        newValue = storage.gameData.dnaBlueprints;
    }
    document.getElementById('bulkBuyArganine').value = '';
	if (newValue < 1) {
		return;
	}
	storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(newValue);
	document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
	document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	storage.entropyUpgradeFactor.arganine = storage.entropyUpgradeFactor.arganine.plus(newValue);
});

function Glutamine() {
	if (storage.gameData.dnaBlueprints.gte(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		storage.entropyUpgradeFactor.glutamine = storage.entropyUpgradeFactor.glutamine.plus(new Decimal(1));
	}
}
document.getElementById('makeGlutamine').addEventListener("click", Glutamine);
export function autoGlutamine(value) {
	if (value.lt(new Decimal(1))) {
		storage.entropyUpgradeFactor.glutamineDoneLoading = true;
		return;
	}
	const bulk = storage.gameData.dnaBlueprintBulk;
	const amount = value.minus(storage.entropyUpgradeFactor.glutamine);
	if (amount.gt(new Decimal(0))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(bulk);
		storage.entropyUpgradeFactor.glutamine = storage.entropyUpgradeFactor.glutamine.plus(bulk);
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	}
	else {
		storage.entropyUpgradeFactor.glutamineDoneLoading = true;
		return;
	}
}
document.getElementById('bulkBuyGlutamine').addEventListener("change", function() {
    let newValue = new Decimal(document.getElementById("bulkBuyGlutamine").value);
    if (newValue.gte(storage.gameData.dnaBlueprints)) {
        newValue = storage.gameData.dnaBlueprints;
    }
    document.getElementById('bulkBuyGlutamine').value = '';
	if (newValue < 1) {
		return;
	}
	storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(newValue);
	document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
	document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	storage.entropyUpgradeFactor.glutamine = storage.entropyUpgradeFactor.glutamine.plus(newValue);
});

function Glutamate() {
	if (storage.gameData.dnaBlueprints.gte(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		storage.entropyUpgradeFactor.glutamate = storage.entropyUpgradeFactor.glutamate.plus(new Decimal(1));
	}
}
document.getElementById('makeGlutamate').addEventListener("click", Glutamate);
export function autoGlutamate(value) {
	if (value.lt(new Decimal(1))) {
		storage.entropyUpgradeFactor.glutamateDoneLoading = true;
		return;
	}
	const bulk = storage.gameData.dnaBlueprintBulk;
	const amount = value.minus(storage.entropyUpgradeFactor.glutamate);
	if (amount.gt(new Decimal(0))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(bulk);
		storage.entropyUpgradeFactor.glutamate = storage.entropyUpgradeFactor.glutamate.plus(bulk);
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	}
	else {
		storage.entropyUpgradeFactor.glutamateDoneLoading = true;
		return;
	}
}
document.getElementById('bulkBuyGlutamate').addEventListener("change", function() {
    let newValue = new Decimal(document.getElementById("bulkBuyGlutamate").value);
    if (newValue.gte(storage.gameData.dnaBlueprints)) {
        newValue = storage.gameData.dnaBlueprints;
    }
    document.getElementById('bulkBuyGlutamate').value = '';
	if (newValue < 1) {
		return;
	}
	storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(newValue);
	document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
	document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	storage.entropyUpgradeFactor.glutamate = storage.entropyUpgradeFactor.glutamate.plus(newValue);
});

function Asparagine() {
	if (storage.gameData.dnaBlueprints.gte(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		storage.entropyUpgradeFactor.asparagine = storage.entropyUpgradeFactor.asparagine.plus(new Decimal(1));
	}
}
document.getElementById('makeAsparagine').addEventListener("click", Asparagine);
export function autoAsparagine(value) {
	if (value.lt(new Decimal(1))) {
		storage.entropyUpgradeFactor.asparagineDoneLoading = true;
		return;
	}
	const bulk = storage.gameData.dnaBlueprintBulk;
	const amount = value.minus(storage.entropyUpgradeFactor.asparagine);
	if (amount.gt(new Decimal(0))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(bulk);
		storage.entropyUpgradeFactor.asparagine = storage.entropyUpgradeFactor.asparagine.plus(bulk);
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	}
	else {
		storage.entropyUpgradeFactor.asparagineDoneLoading = true;
		return;
	}
}
document.getElementById('bulkBuyAsparagine').addEventListener("change", function() {
    let newValue = new Decimal(document.getElementById("bulkBuyAsparagine").value);
    if (newValue.gte(storage.gameData.dnaBlueprints)) {
        newValue = storage.gameData.dnaBlueprints;
    }
    document.getElementById('bulkBuyAsparagine').value = '';
	if (newValue < 1) {
		return;
	}
	storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(newValue);
	document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
	document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	storage.entropyUpgradeFactor.asparagine = storage.entropyUpgradeFactor.asparagine.plus(newValue);
});

function AGP() {
	if (storage.gameData.dnaBlueprints.gte(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		
		storage.entropyUpgradeFactor.agp = storage.entropyUpgradeFactor.agp.plus(new Decimal(1));
	}
}
document.getElementById('makeAGP').addEventListener("click", AGP);
export function autoAGP(value) {
	if (value.lt(new Decimal(1))) {
		storage.entropyUpgradeFactor.agpDoneLoading = true;
		return;
	}
	const bulk = storage.gameData.dnaBlueprintBulk;
	const amount = value.minus(storage.entropyUpgradeFactor.agp);
	if (amount.gt(new Decimal(0))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(bulk);
		storage.entropyUpgradeFactor.agp = storage.entropyUpgradeFactor.agp.plus(bulk);
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	}
	else {
		storage.entropyUpgradeFactor.agpDoneLoading = true;
		return;
	}
}
document.getElementById('bulkBuyAGP').addEventListener("change", function() {
    let newValue = new Decimal(document.getElementById("bulkBuyAGP").value);
    if (newValue.gte(storage.gameData.dnaBlueprints)) {
        newValue = storage.gameData.dnaBlueprints;
    }
    document.getElementById('bulkBuyAGP').value = '';
	if (newValue < 1) {
		return;
	}
	storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(newValue);
	document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
	document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	storage.entropyUpgradeFactor.agp = storage.entropyUpgradeFactor.agp.plus(newValue);
});

function TRB() {
	if (storage.gameData.dnaBlueprints.gte(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		storage.entropyUpgradeFactor.trb = storage.entropyUpgradeFactor.trb.plus(new Decimal(1));
	}
}
document.getElementById('makeTRB').addEventListener("click", TRB);
export function autoTRB(value) {
	if (value.lt(new Decimal(1))) {
		storage.entropyUpgradeFactor.trbDoneLoading = true;
		return;
	}
	const bulk = storage.gameData.dnaBlueprintBulk;
	const amount = value.minus(storage.entropyUpgradeFactor.trb);
	if (amount.gt(new Decimal(0))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(bulk);
		storage.entropyUpgradeFactor.trb = storage.entropyUpgradeFactor.trb.plus(bulk);
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	}
	else {
		storage.entropyUpgradeFactor.trbDoneLoading = true;
		return;
	}
}
document.getElementById('bulkBuyTRB').addEventListener("change", function() {
    let newValue = new Decimal(document.getElementById("bulkBuyTRB").value);
    if (newValue.gte(storage.gameData.dnaBlueprints)) {
        newValue = storage.gameData.dnaBlueprints;
    }
    document.getElementById('bulkBuyTRB').value = '';
	if (newValue < 1) {
		return;
	}
	storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(newValue);
	document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your CRS and Bacteria`;
	document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	storage.entropyUpgradeFactor.trb = storage.entropyUpgradeFactor.trb.plus(newValue);
});

function respecProteins() {
	storage.entropyUpgradeFactor.rubisco = new Decimal(0);
	storage.entropyUpgradeFactor.rubiscoEffect = new Decimal(1);
	document.getElementById('rubiscoCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubisco, 3)} RuBisCo Proteins<br>Seed and Fruit base mult boost Leaves (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubiscoEffect, 3)})`;
	
	storage.entropyUpgradeFactor.extensin = new Decimal(0);
	storage.entropyUpgradeFactor.extensinEffect = new Decimal(1);
	document.getElementById('extensinCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.extensin, 3)} Extensin Proteins<br>Cells replicate x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.extensinEffect, 3)} more times each tick`;
	
	storage.entropyUpgradeFactor.arganine = new Decimal(0);
	storage.entropyUpgradeFactor.arganineEffect = new Decimal(0);
	document.getElementById('arganineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.arganine, 3)} Arganine Proteins<br>+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.arganineEffect, 3)} to all supercap roots`;
	
	storage.entropyUpgradeFactor.glutamine = new Decimal(0);
	storage.entropyUpgradeFactor.glutamineEffect = new Decimal(1);
	document.getElementById('glutamineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamine, 3)} Glutamine Proteins<br>Adds an extra Entropy factor to the Moss formula (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamineEffect, 3)})`;
	
	storage.entropyUpgradeFactor.glutamate = new Decimal(0);
	storage.entropyUpgradeFactor.glutamateEffect = new Decimal(0);
	document.getElementById('glutamateCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamate, 3)} Glutamate Proteins<br> +${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamateEffect, 3)} to LR1, SR1, and FR1 caps`;
	
	storage.entropyUpgradeFactor.asparagine = new Decimal(0);
	storage.entropyUpgradeFactor.asparagineEffect = new Decimal(1);
	document.getElementById('asparagineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.asparagine, 3)} Asparagine Proteins<br> Game speed boosts Bacteria base mult (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.asparagineEffect, 3)})`;
	
	storage.entropyUpgradeFactor.agp = new Decimal(0);
	storage.entropyUpgradeFactor.agpEffect = new Decimal(1);
	document.getElementById('agpCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agp, 3)} AGP Proteins<br> ^${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agpEffect, 3)} Cell overpopulation division effect`;
	
	storage.entropyUpgradeFactor.trb = new Decimal(0);
	storage.entropyUpgradeFactor.trbEffect = new Decimal(1);
	document.getElementById('trbCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.trb, 3)} TRB Proteins<br> x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.trbEffect, 3)} RNA and R1's effect`;
	
	storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprintsTotal;
	document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
	document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
	
	storage.gameData.canTransform = true;
	storage.transform;
}

document.getElementById('respecProteins').addEventListener("click", respecProteins);

export function proteinEffects() {
	let totalRuBisCo = storage.entropyUpgradeFactor.rubisco.plus(storage.entropyUpgradeFactor.rubiscoFree);
	if (totalRuBisCo.gte(new Decimal(1))) {		
		const x = totalRuBisCo.pow(new Decimal(0.1));
		const y = x.minus(new Decimal(0.9));
		const z = storage.gameData.seedsMult.times(storage.gameData.fruitsMult);
		var w = z.pow(y);
		if (storage.entropyUpgradeFactor.E39Bought) {
			w = w.pow(new Decimal(1.1));
		}
		if (storage.leafUpgradeFactor.L63Bought) {
			w = w.pow(new Decimal(1.1));
			document.getElementById('L63').innerHTML = `L63 (Bought)<br>Oh we're &radic;way there<br>^1.1 RuBisCo's effect<br>Cost: 1e5000 Leaves`;
		}
		if (storage.rootUpgradeFactor.RO1Bought) {
			w = w.pow(new Decimal(1.1));
		}
		if (w.gte(new Decimal.fromComponents(1, 2, 8))) {
			w = storage.SC(w, new Decimal.fromComponents(1, 2, 8), new Decimal(0.001));
			storage.entropyUpgradeFactor.rubiscoEffect = w;
			
			if (!(storage.entropyUpgradeFactor.rubiscoFree.gte(new Decimal(1)))) {
				document.getElementById('rubiscoCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubisco, 3)} RuBisCo Proteins<br>Seed and Fruit base mult boost Leaves (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubiscoEffect, 3)})<br><span class="softcap">(Softcapped)</span>`;
			}
			if (storage.entropyUpgradeFactor.rubiscoFree.gte(new Decimal(1))) {
				document.getElementById('rubiscoCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubisco, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubiscoFree, 3)}) RuBisCo Proteins<br>Seed and Fruit base mult boost Leaves (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubiscoEffect, 3)})<br><span class="softcap">(Softcapped)</span>`;
			}
		}
		else {
			storage.entropyUpgradeFactor.rubiscoEffect = w;
			
			if (!(storage.entropyUpgradeFactor.rubiscoFree.gte(new Decimal(1)))) {
				document.getElementById('rubiscoCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubisco, 3)} RuBisCo Proteins<br>Seed and Fruit base mult boost Leaves (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubiscoEffect, 3)})`;
			}
			if (storage.entropyUpgradeFactor.rubiscoFree.gte(new Decimal(1))) {
				document.getElementById('rubiscoCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubisco, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubiscoFree, 3)}) RuBisCo Proteins<br>Seed and Fruit base mult boost Leaves (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubiscoEffect, 3)})`;
			}
		}
	}
	let totalExtensin = storage.entropyUpgradeFactor.extensin.plus(storage.entropyUpgradeFactor.extensinFree);
	if (totalExtensin.gte(new Decimal(1))) {
		var x = new Decimal(1.05).times(totalExtensin);
		if (storage.rootUpgradeFactor.RO5Bought) {
			x = new Decimal(1.5).times(totalExtensin);
		}
		const y = new Decimal(1e10);
		let z = y.pow(x);
		if (Object.hasOwn(activeMicroorganismEffects, 'yeastextensinPow')) {
			const w = new Decimal(activeMicroorganismEffects.yeastextensinPow.mag);
			document.getElementById('yeastextensinPow').innerHTML = `^${storage.truncateToDecimalPlaces(w, 3)} Extensin's effect<br>`;
			z = z.pow(w);
		}
		storage.entropyUpgradeFactor.extensinEffect = z;
		if (!(storage.entropyUpgradeFactor.extensinFree.gte(new Decimal(1)))) {
			document.getElementById('extensinCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.extensin, 3)} Extensin Proteins<br>Cells replicate x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.extensinEffect, 3)} more times each tick`;
		}
		if (storage.entropyUpgradeFactor.extensinFree.gte(new Decimal(1))) {
			document.getElementById('extensinCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.extensin, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.extensinFree, 3)}) Extensin Proteins<br>Cells replicate x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.extensinEffect, 3)} more times each tick`;
		}
	}
	let totalArganine = storage.entropyUpgradeFactor.arganine.plus(storage.entropyUpgradeFactor.arganineFree);
	if (totalArganine.gte(new Decimal(1))) {
		let temporaryArganineEffect = new Decimal(0);
		for (let i = 1; i < (totalArganine.plus(new Decimal(1))).toNumber(); i++) {
			const a = new Decimal(i);
			const x = new Decimal(10).times(a);
			const y = new Decimal(1).div(x);
			var z = y;
			if (a.gte(new Decimal(4))) {
				z = new Decimal(0.025);
			}
			temporaryArganineEffect = temporaryArganineEffect.plus(z);
		}		
		storage.entropyUpgradeFactor.arganineEffect = temporaryArganineEffect;
		if (!(storage.entropyUpgradeFactor.arganineFree.gte(new Decimal(1)))) {
			document.getElementById('arganineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.arganine, 3)} Arganine Proteins<br>+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.arganineEffect, 3)} to all supercap roots`;
		}
		if (storage.entropyUpgradeFactor.arganineFree.gte(new Decimal(1))) {
			document.getElementById('arganineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.arganine, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.arganineFree, 3)}) Arganine Proteins<br>+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.arganineEffect, 3)} to all supercap roots`;
		}
	}
	let totalGlutamine = storage.entropyUpgradeFactor.glutamine.plus(storage.entropyUpgradeFactor.glutamineFree);
	if (totalGlutamine.gte(new Decimal(1))) {
		const x = totalGlutamine;
		const y = x.pow(new Decimal(0.5));
		const z = y.times(new Decimal(10));
		let w = storage.gameData.entropy.pow(z);
		if (document.getElementById('mossyleafUpgrade4')) {
			fallenLeaves.fallenUpgradeFixer('mossy', 3);

			if (storage.rootUpgradeFactor.fallenUpgrades.mossy[3].amount.gte(new Decimal(1))) {
				const v = new Decimal(1.35).pow(storage.rootUpgradeFactor.fallenUpgrades.mossy[3].amount);
				w = w.pow(v);
				
				document.getElementById('mossyleafUpgrade4').innerHTML = `ML4 (${storage.truncateToDecimalPlaces(storage.rootUpgradeFactor.fallenUpgrades.mossy[3].amount, 3)})<br>^1.35 Glutamine's effect<br>Cost: ${storage.truncateToDecimalPlaces(storage.rootUpgradeFactor.fallenUpgrades.mossy[3].cost, 3)} Mossy Leaves<br>Effect: ^${storage.truncateToDecimalPlaces(v, 3)}`;
				document.getElementById('mossyleafUpgrade4').style.padding = `11.5px 0px`;
			}
		}
		storage.entropyUpgradeFactor.glutamineEffect = w;
		if (!(storage.entropyUpgradeFactor.glutamineFree.gte(new Decimal(1)))) {
			document.getElementById('glutamineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamine, 3)} Glutamine Proteins<br>Adds an extra Entropy factor to the Moss formula (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamineEffect, 3)})`;
		}
		if (storage.entropyUpgradeFactor.glutamineFree.gte(new Decimal(1))) {
			document.getElementById('glutamineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamine, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamineFree, 3)}) Glutamine Proteins<br>Adds an extra Entropy factor to the Moss formula (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamineEffect, 3)})`;	
		}
	}
	let totalGlutamate = storage.entropyUpgradeFactor.glutamate.plus(storage.entropyUpgradeFactor.glutamateFree);
	if (totalGlutamate.gte(new Decimal(1))) {
		const x = totalGlutamate;
		let y = x.times(new Decimal(10));
		if (storage.seedUpgradeFactor.S59Bought) {
			const z = new Decimal(100);
			y = y.times(z);
		}
		if (Object.hasOwn(activeMicroorganismEffects, 'algaeglutamateEffect')) {
			const z = new Decimal(activeMicroorganismEffects.algaeglutamateEffect.mag);
			y = y.times(z);
			document.getElementById('algaeglutamateEffect').innerHTML = `x${storage.truncateToDecimalPlaces(z, 3)} Glutamate's effect<br>`;
		}
		if (document.getElementById('marbledleafMilestone1')) {
			if (storage.rootUpgradeFactor.fallenMilestones.marbled[0].achieved) {
				y = y.times(new Decimal(2));
			}
		}
		if (document.getElementById('marbledleafUpgrade3')) {
			fallenLeaves.fallenUpgradeFixer('marbled', 2);

			if (storage.rootUpgradeFactor.fallenUpgrades.marbled[2].amount.gte(new Decimal(1))) {
				const v = new Decimal(1.25).pow(storage.rootUpgradeFactor.fallenUpgrades.marbled[2].amount);
				y = y.times(v);
				
				document.getElementById('marbledleafUpgrade3').innerHTML = `MaL3 (${storage.truncateToDecimalPlaces(storage.rootUpgradeFactor.fallenUpgrades.marbled[2].amount, 3)})<br>x1.25 Glutamate's effect<br>Cost: ${storage.truncateToDecimalPlaces(storage.rootUpgradeFactor.fallenUpgrades.marbled[2].cost, 3)} Mossy Leaves<br>Effect: x${storage.truncateToDecimalPlaces(v, 3)}`;
				document.getElementById('marbledleafUpgrade3').style.padding = `11.5px 0px`;
			}
		}
		storage.entropyUpgradeFactor.glutamateEffect = y;
		if (!(storage.entropyUpgradeFactor.glutamateFree.gte(new Decimal(1)))) {
			document.getElementById('glutamateCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamate, 3)} Glutamate Proteins<br> +${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamateEffect, 3)} to LR1, SR1, and FR1 caps`;	
		}
		if (storage.entropyUpgradeFactor.glutamateFree.gte(new Decimal(1))) {
			document.getElementById('glutamateCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamate, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamateFree, 3)}) Glutamate Proteins<br> +${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamateEffect, 3)} to LR1, SR1, and FR1 caps`;	
		}
	}
	let totalAsparagine = storage.entropyUpgradeFactor.asparagine.plus(storage.entropyUpgradeFactor.asparagineFree);
	if (totalAsparagine.gte(new Decimal(1))) {
		const x = totalAsparagine;
		const y = x.times(storage.gameData.gameSpeed);
		let z = y.div(new Decimal(10000)).plus(new Decimal(1));
		if (Object.hasOwn(activeMicroorganismEffects, 'yeastasparaginePow')) {
			const w = new Decimal(activeMicroorganismEffects.yeastasparaginePow.mag);
			if (w.gte(new Decimal(1e6))) {
				w = storage.SC(w, new Decimal(1e6), new Decimal(0.1));
				document.getElementById('yeastasparaginePow').innerHTML = `^<span class="softcap">${storage.truncateToDecimalPlaces(w, 3)}</span> Asparagine's effect<br>`;
			}
			else {
				document.getElementById('yeastasparaginePow').innerHTML = `^${storage.truncateToDecimalPlaces(w, 3)} Asparagine's effect<br>`;
			}
			z = z.pow(w);
		}
		storage.entropyUpgradeFactor.asparagineEffect = z;
		if (!(storage.entropyUpgradeFactor.asparagineFree.gte(new Decimal(1)))) {
			document.getElementById('asparagineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.asparagine, 3)} Asparagine Proteins<br> Game speed boosts Bacteria base mult (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.asparagineEffect, 3)})`;
		}
		if (storage.entropyUpgradeFactor.asparagineFree.gte(new Decimal(1))) {
			document.getElementById('asparagineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.asparagine, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.asparagineFree, 3)}) Asparagine Proteins<br> Game speed boosts Bacteria base mult (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.asparagineEffect, 3)})`;
		}
	}
	let totalAGP = storage.entropyUpgradeFactor.agp.plus(storage.entropyUpgradeFactor.agpFree);
	if (totalAGP.gte(new Decimal(1))) {
		const x = totalAGP;
		let y = new Decimal(0.975).pow(x);
		if (y.lte(new Decimal(0.5))) {
			const base = new Decimal(0.5);
			const difference = (y.minus(base)).times(new Decimal(-1));
			y = base.minus(difference.pow(new Decimal(2)));
			if (!(storage.entropyUpgradeFactor.agpFree.gte(new Decimal(1)))) {
				document.getElementById('agpCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agp, 3)} AGP Proteins<br> ^${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agpEffect, 3)} Cell overpopulation division effect<br><span class="softcap">(Softcapped)</span>`;
			}
			if (storage.entropyUpgradeFactor.agpFree.gte(new Decimal(1))) {
				document.getElementById('agpCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agp, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agpFree, 3)}) AGP Proteins<br> ^${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agpEffect, 3)} Cell overpopulation division effect<br><span class="softcap">(Softcapped)</span>`;
			}
			if (y.lte(new Decimal(0.25))) {
				y = storage.SC(y, new Decimal(0.25), new Decimal(0.1)).clamp(new Decimal(0.001), new Decimal(0.25));
				
				document.getElementById('agpCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agp, 3)} AGP Proteins<br> ^${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agpEffect, 3)} Cell overpopulation division effect<br><span class="softcap2">(Softcapped^2)</span>`;
				if (storage.entropyUpgradeFactor.agpFree.gte(new Decimal(1))) {
					document.getElementById('agpCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agp, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agpFree, 3)}) AGP Proteins<br> ^${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agpEffect, 3)} Cell overpopulation division effect<br><span class="softcap2">(Softcapped^2)</span>`;
				}
			}
		}
		else {
			if (!(storage.entropyUpgradeFactor.agpFree.gte(new Decimal(1)))) {
				document.getElementById('agpCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agp, 3)} AGP Proteins<br> ^${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agpEffect, 3)} Cell overpopulation division effect`;
			}
			if (storage.entropyUpgradeFactor.agpFree.gte(new Decimal(1))) {
				document.getElementById('agpCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agp, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agpFree, 3)}) AGP Proteins<br> ^${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agpEffect, 3)} Cell overpopulation division effect`;
			}
		}
		storage.entropyUpgradeFactor.agpEffect = y;
	}
	let totalTRB = storage.entropyUpgradeFactor.trb.plus(storage.entropyUpgradeFactor.trbFree);
	if (totalTRB.gte(new Decimal(1))) {
		const x = new Decimal(1.5).pow(totalTRB);
		storage.entropyUpgradeFactor.trbEffect = x;
		if (!(storage.entropyUpgradeFactor.trbFree.gte(new Decimal(1)))) {
			document.getElementById('trbCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.trb, 3)} TRB Proteins<br> x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.trbEffect, 3)} RNA and R1's effect`;
		}
		if (storage.entropyUpgradeFactor.trbFree.gte(new Decimal(1))) {
			document.getElementById('trbCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.trb, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.trbFree, 3)}) TRB Proteins<br> x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.trbEffect, 3)} RNA and R1's effect`;
		}
	}
}

document.getElementById('proteinPresetButton').addEventListener("click", function() {
	document.getElementById('proteinPresetBox').style.display = 'block';
});
document.getElementById('closeProteinPresets').addEventListener("click", function() {
	document.getElementById('proteinPresetBox').style.display = 'none';
});

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

class proteinPreset {
	constructor(id, isLoading, name, value) {
		this.id = id;
		this.isLoading = isLoading;
		if (isLoading) {
			this.name = name;
			this.value = value;
		}
		
		this.#init();
		this.validate()
	}
	name = "";
	value = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)];
	valid = false;
	
	#init() {
		const self = this;
		
		let template = document.getElementById('proteinPresetTemplate');
		let clone = document.importNode(template.content, true);
		
		let backgroundContainer = clone.getElementById(`proteinPresetBackgroundTemplate`);
		backgroundContainer.id = `proteinPreset${this.id}Background`;
		
		let nameContainer = clone.getElementById(`proteinPresetNameTemplate`);
		nameContainer.addEventListener("change", function(e) {
			self.name = e.target.value;
		});
		nameContainer.id = `proteinPreset${this.id}Name`;
		if (this.isLoading) {
			nameContainer.value = this.name;
		}
		
		let textContainer = clone.getElementById(`proteinPresetTextTemplate`);
		textContainer.id = `proteinPreset${this.id}Text`;
		
		let slot0Container = clone.getElementById(`proteinPresetSlot0Template`);
		slot0Container.addEventListener("change", function(e) {
			const pattern = /[0-9]+/;
			if (pattern.test(e.target.value)) {
				self.value[0] = new Decimal(e.target.value);
				self.validate();
			}
			else {
				self.value[0] = new Decimal(0);
				self.validate();
				this.value = "";
			}
		});
		if (this.isLoading) {
			if (this.value[0].lt(new Decimal(1))) {
				slot0Container.value = "";
			}
			else {
				slot0Container.value = storage.truncateToDecimalPlaces(this.value[0], 3);
			}
		}
		slot0Container.id = `proteinPreset${this.id}Slot0`;
		
		let slot1Container = clone.getElementById(`proteinPresetSlot1Template`);
		slot1Container.addEventListener("change", function(e) {
			const pattern = /[0-9]+/;
			if (pattern.test(e.target.value)) {
				self.value[1] = new Decimal(e.target.value);
				self.validate();
			}
			else {
				self.value[1] = new Decimal(0);
				self.validate();
				this.value = "";
			}
		});
		if (this.isLoading) {
			if (this.value[1].lt(new Decimal(1))) {
				slot1Container.value = "";
			}
			else {
				slot1Container.value = storage.truncateToDecimalPlaces(this.value[1], 3);
			}
		}
		slot1Container.id = `proteinPreset${this.id}Slot1`;
		
		let slot2Container = clone.getElementById(`proteinPresetSlot2Template`);
		slot2Container.addEventListener("change", function(e) {
			const pattern = /[0-9]+/;
			if (pattern.test(e.target.value)) {
				self.value[2] = new Decimal(e.target.value);
				self.validate();
			}
			else {
				self.value[2] = new Decimal(0);
				self.validate();
				this.value = "";
			}
		});
		if (this.isLoading) {
			if (this.value[2].lt(new Decimal(1))) {
				slot2Container.value = "";
			}
			else {
				slot2Container.value = storage.truncateToDecimalPlaces(this.value[2], 3);
			}
		}
		slot2Container.id = `proteinPreset${this.id}Slot2`;
		
		let slot3Container = clone.getElementById(`proteinPresetSlot3Template`);
		slot3Container.addEventListener("change", function(e) {
			const pattern = /[0-9]+/;
			if (pattern.test(e.target.value)) {
				self.value[3] = new Decimal(e.target.value);
				self.validate();
			}
			else {
				self.value[3] = new Decimal(0);
				self.validate();
				this.value = "";
			}
		});
		if (this.isLoading) {
			if (this.value[3].lt(new Decimal(1))) {
				slot3Container.value = "";
			}
			else {
				slot3Container.value = storage.truncateToDecimalPlaces(this.value[3], 3);
			}
		}
		slot3Container.id = `proteinPreset${this.id}Slot3`;
		
		let slot4Container = clone.getElementById(`proteinPresetSlot4Template`);
		slot4Container.addEventListener("change", function(e) {
			const pattern = /[0-9]+/;
			if (pattern.test(e.target.value)) {
				self.value[4] = new Decimal(e.target.value);
				self.validate();
			}
			else {
				self.value[4] = new Decimal(0);
				self.validate();
				this.value = "";
			}
		});
		if (this.isLoading) {
			if (this.value[4].lt(new Decimal(1))) {
				slot4Container.value = "";
			}
			else {
				slot4Container.value = storage.truncateToDecimalPlaces(this.value[4], 3);
			}
		}
		slot4Container.id = `proteinPreset${this.id}Slot4`;
		
		let slot5Container = clone.getElementById(`proteinPresetSlot5Template`);
		slot5Container.addEventListener("change", function(e) {
			const pattern = /[0-9]+/;
			if (pattern.test(e.target.value)) {
				self.value[5] = new Decimal(e.target.value);
				self.validate();
			}
			else {
				self.value[5] = new Decimal(0);
				self.validate();
				this.value = "";
			}
		});
		if (this.isLoading) {
			if (this.value[5].lt(new Decimal(1))) {
				slot5Container.value = "";
			}
			else {
				slot5Container.value = storage.truncateToDecimalPlaces(this.value[5], 3);
			}
		}
		slot5Container.id = `proteinPreset${this.id}Slot5`;
		
		let slot6Container = clone.getElementById(`proteinPresetSlot6Template`);
		slot6Container.addEventListener("change", function(e) {
			const pattern = /[0-9]+/;
			if (pattern.test(e.target.value)) {
				self.value[6] = new Decimal(e.target.value);
				self.validate();
			}
			else {
				self.value[6] = new Decimal(0);
				self.validate();
				this.value = "";
			}
		});
		if (this.isLoading) {
			if (this.value[6].lt(new Decimal(1))) {
				slot6Container.value = "";
			}
			else {
				slot6Container.value = storage.truncateToDecimalPlaces(this.value[6], 3);
			}
		}
		slot6Container.id = `proteinPreset${this.id}Slot6`;
		
		let slot7Container = clone.getElementById(`proteinPresetSlot7Template`);
		slot7Container.addEventListener("change", function(e) {
			const pattern = /[0-9]+/;
			if (pattern.test(e.target.value)) {
				self.value[7] = new Decimal(e.target.value);
				self.validate();
			}
			else {
				self.value[7] = new Decimal(0);
				self.validate();
				this.value = "";
			}
		});
		if (this.isLoading) {
			if (this.value[7].lt(new Decimal(1))) {
				slot7Container.value = "";
			}
			else {
				slot7Container.value = storage.truncateToDecimalPlaces(this.value[7], 3);
			}
		}
		slot7Container.id = `proteinPreset${this.id}Slot7`;
		
		let validationContainer = clone.getElementById(`proteinPresetValidationTemplate`);
		validationContainer.id = `proteinPreset${this.id}Validation`;
		
		let runningContainer = clone.getElementById(`proteinPresetRunningTemplate`);
		runningContainer.id = `proteinPreset${this.id}Running`;
		
		let loadContainer = clone.getElementById(`proteinPresetLoadTemplate`);
		loadContainer.addEventListener("click", function() {
			self.load();
		});
		loadContainer.id = `proteinPreset${this.id}Load`;
		
		let haltContainer = clone.getElementById(`proteinPresetHaltTemplate`);
		haltContainer.addEventListener("click", function() {
			self.halt();
		});
		haltContainer.id = `proteinPreset${this.id}Halt`;
		
		let deleteContainer = clone.getElementById(`proteinPresetDeleteTemplate`);
		deleteContainer.addEventListener("click", function() {
			self.del();
		});
		deleteContainer.id = `proteinPreset${this.id}Delete`;
		
		document.getElementById('proteinPresetHolder').appendChild(clone);
	}
	
	validate() {
		let succeededInitialTest = false;
		this.cleanValue = [];
		for (let i = 0; i < this.value.length; i++) {
			if (this.value[i].gte(new Decimal(1))) {
				succeededInitialTest = true;
				break;
			}
		}
		if (!succeededInitialTest) {
			document.getElementById(`proteinPreset${this.id}Validation`).innerHTML = "INVALID";
			document.getElementById(`proteinPreset${this.id}Validation`).classList.remove("softcap5");
			document.getElementById(`proteinPreset${this.id}Validation`).classList.add("softcap");
			document.getElementById(`proteinPreset${this.id}Load`).disabled = true;
			this.valid = false;
			return;
		}
		else {
			document.getElementById(`proteinPreset${this.id}Validation`).innerHTML = "VALID";
			document.getElementById(`proteinPreset${this.id}Validation`).classList.remove("softcap");
			document.getElementById(`proteinPreset${this.id}Validation`).classList.add("softcap5");
			document.getElementById(`proteinPreset${this.id}Load`).disabled = false;
			this.valid = true;
			return;
		}
	}
	
	async load() {
		if (!this.valid) {
			return;
		}
		storage.entropyUpgradeFactor.currentlyLoadedProteinPreset = [];
		storage.entropyUpgradeFactor.currentlyLoadedProteinPresetID = null;
		storage.entropyUpgradeFactor.isLoadingProteinPreset = false;
		storage.entropyUpgradeFactor.currentlyLoadedDNABlueprintAmount = new Decimal(0);
		storage.entropyUpgradeFactor.rubiscoDoneLoading = true;
		storage.entropyUpgradeFactor.extensinDoneLoading = true;
		storage.entropyUpgradeFactor.arganineDoneLoading = true;
		storage.entropyUpgradeFactor.glutamineDoneLoading = true;
		storage.entropyUpgradeFactor.glutamateDoneLoading = true;
		storage.entropyUpgradeFactor.asparagineDoneLoading = true;
		storage.entropyUpgradeFactor.trbDoneLoading = true;
		storage.entropyUpgradeFactor.agpDoneLoading = true;
		document.getElementById(`proteinPreset${this.id}Running`).innerHTML = "STOPPED";
		document.getElementById(`proteinPreset${this.id}Running`).classList.remove("softcap5");
		document.getElementById(`proteinPreset${this.id}Running`).classList.add("softcap");
		
		const dna = storage.gameData.dna.plus(storage.gameData.dnaFree);
		const blueprints = storage.gameData.dnaBlueprintsTotal;
		const blueprintsToMake = (dna.minus(blueprints).trunc()).clamp(new Decimal(0), new Decimal(Infinity));
		
		let divisor = new Decimal(0);
		for (let i = 0; i < this.value.length; i++) {
			divisor = divisor.plus(this.value[i]);
		}
		//this is just to check if the player changes the preset to be invalid during the loading process
		if (divisor.lt(new Decimal(1))) {
			this.validate();
			return;
		}
		else {
			const unit = dna.div(divisor).trunc();
			let result = [];
			for (let i = 0; i < this.value.length; i++) {
				result.push(this.value[i].times(unit));
			}
			//sets up the function in automation.mjs to function correctly
			respecProteins();
			sleep(100);
			storage.entropyUpgradeFactor.currentlyLoadedProteinPreset = result;
			storage.entropyUpgradeFactor.currentlyLoadedProteinPresetID = this.id;
			storage.entropyUpgradeFactor.isLoadingProteinPreset = true;
			storage.entropyUpgradeFactor.currentlyLoadedDNABlueprintAmount = blueprintsToMake;
			storage.entropyUpgradeFactor.rubiscoDoneLoading = false;
			storage.entropyUpgradeFactor.extensinDoneLoading = false;
			storage.entropyUpgradeFactor.arganineDoneLoading = false;
			storage.entropyUpgradeFactor.glutamineDoneLoading = false;
			storage.entropyUpgradeFactor.glutamateDoneLoading = false;
			storage.entropyUpgradeFactor.asparagineDoneLoading = false;
			storage.entropyUpgradeFactor.trbDoneLoading = false;
			storage.entropyUpgradeFactor.agpDoneLoading = false;
			document.getElementById(`proteinPreset${this.id}Running`).innerHTML = "RUNNING";
			document.getElementById(`proteinPreset${this.id}Running`).classList.remove("softcap");
			document.getElementById(`proteinPreset${this.id}Running`).classList.add("softcap5");
			console.log(`loading the protein preset titled ${this.name}`);
			console.log(storage.entropyUpgradeFactor.currentlyLoadedProteinPreset);
		}
	}
	
	halt() {
		if (storage.entropyUpgradeFactor.isLoadingProteinPreset) {
			storage.entropyUpgradeFactor.currentlyLoadedProteinPreset = [];
			storage.entropyUpgradeFactor.currentlyLoadedProteinPresetID = null;
			storage.entropyUpgradeFactor.isLoadingProteinPreset = false;
			storage.entropyUpgradeFactor.currentlyLoadedDNABlueprintAmount = new Decimal(0);
			storage.entropyUpgradeFactor.rubiscoDoneLoading = true;
			storage.entropyUpgradeFactor.extensinDoneLoading = true;
			storage.entropyUpgradeFactor.arganineDoneLoading = true;
			storage.entropyUpgradeFactor.glutamineDoneLoading = true;
			storage.entropyUpgradeFactor.glutamateDoneLoading = true;
			storage.entropyUpgradeFactor.asparagineDoneLoading = true;
			storage.entropyUpgradeFactor.trbDoneLoading = true;
			storage.entropyUpgradeFactor.agpDoneLoading = true;
			document.getElementById(`proteinPreset${this.id}Running`).innerHTML = "STOPPED";
			document.getElementById(`proteinPreset${this.id}Running`).classList.remove("softcap5");
			document.getElementById(`proteinPreset${this.id}Running`).classList.add("softcap");
			return;
		}
	}
	
	del() {
		document.getElementById(`proteinPreset${this.id}Background`).remove();
		deleteReference(this.id);
	}
}

function deleteReference(id) {
	delete storage.entropyUpgradeFactor.proteinPresets[`preset${id}`];
}

document.getElementById('proteinPresetMaker').addEventListener("click", function() {
	storage.entropyUpgradeFactor.proteinPresets[`preset${storage.entropyUpgradeFactor.proteinPresetID}`] = new proteinPreset(storage.entropyUpgradeFactor.proteinPresetID, false, null, null);
	storage.entropyUpgradeFactor.proteinPresetID++;
});

document.addEventListener("DOMContentLoaded", (event) => {
	setTimeout(() => {
		if (Object.keys(storage.entropyUpgradeFactor.proteinPresets).length > 0) {
			for (const [key, value] of Object.entries(storage.entropyUpgradeFactor.proteinPresets)) {
				let trueValue = [];
				for (let i = 0; i < value.value.length; i++) {
					trueValue.push(new Decimal(value.value[i]));
				}
				storage.entropyUpgradeFactor.proteinPresets[key] = new proteinPreset(value.id, true, value.name, trueValue);
			}
		}
	}, 1000);
});
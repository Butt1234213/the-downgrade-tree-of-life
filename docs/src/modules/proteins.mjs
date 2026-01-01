import * as storage from './core/bunchobullshit.mjs';
import { achievements, massAchievementChecker } from './achievements.mjs';

export function DNACalculation() {
	if (storage.gameData.droughtLevel.greaterThan(new Decimal(1))) {
		const x = Decimal.log10(storage.gameData.cells.plus(new Decimal(1)));
		var y = new Decimal(2.4663).times(Decimal.ln(x.plus(new Decimal(1))));
		var z = y.minus(new Decimal(21.71549));
		
		if (storage.entropyUpgradeFactor.E37Bought) {
			y = new Decimal(4.48142).times(Decimal.ln(x.plus(new Decimal(1))));
			z = y.minus(new Decimal(40.2754));
		}
		const w = z.trunc();
		storage.gameData.dna = w;
		
		const v = new Decimal(10000);
		var u = v.times(new Decimal(1.5).pow(storage.gameData.dna));
		if (storage.entropyUpgradeFactor.E37Bought) {
			u = v.times(new Decimal(1.25).pow(storage.gameData.dna));
		}
		const t = new Decimal(10).pow(u);
		document.getElementById('dnaCounter').innerHTML = `You have ${storage.truncateToDecimalPlaces(storage.gameData.dna, 3)} strands of DNA (next at ${storage.truncateToDecimalPlaces(t, 3)} Cells)`;
		
		const s = storage.gameData.dnaBlueprintTime.div(new Decimal(1000));
		const r = s.div(storage.gameData.gameSpeed)
		document.getElementById('blueprintTimeCounter').innerHTML = `Fabricating a DNA Blueprint takes ${storage.truncateToDecimalPlaces(s, 3)} seconds (${storage.truncateToDecimalPlaces(r, 3)} seconds real time)`;
		
		if (storage.gameData.dna.greaterThanOrEqualTo(new Decimal(1))) {
			document.getElementById('dnaEffectCounter').innerHTML = `+1 DNA Blueprint cap each strand (${storage.truncateToDecimalPlaces(storage.gameData.dna, 3)} max DNA Blueprints)`;
		}
	}
}

function checkDNABlueprints() {
	if (storage.gameData.dna.greaterThanOrEqualTo(new Decimal(1))) {
		if (storage.gameData.dnaBlueprintsTotal.lessThan(storage.gameData.dna)) {
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
	if (storage.entropyUpgradeFactor.R5Amount.greaterThanOrEqualTo(new Decimal(1))) {
		const x = new Decimal(0.005);
		const y = storage.entropyUpgradeFactor.R5Amount.times(x);
		a = a.plus(y);
		document.getElementById('R5').innerHTML = `Blueprint Dampener (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Amount, 3)} / 5)<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Cost, 3)} RNA strands<br>Effect: -${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Effect, 3)} from DNA Blueprint nerf root`;
	}
	var t = a.pow(storage.gameData.dnaBlueprintsTotal);
	storage.gameData.dnaBlueprintNerf = t;
	document.getElementById('blueprintNerfCounter').innerHTML = `CRS and Bacteria are powered to ^${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintNerf, 3)}`;
	
	if (storage.gameData.fabricating) {
        if (storage.gameData.dnaBlueprintAmount.lessThan(storage.gameData.dnaBlueprintTime)) {
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

            dnaBlueprintOperation(new Decimal(1));
            //pass in a Decimal() to test the bulk capabilities :)
        }
	}
}

function dnaBlueprintOperation(bulk) {
    storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.plus(bulk);
    storage.gameData.dnaBlueprintsTotal = storage.gameData.dnaBlueprintsTotal.plus(bulk);

    document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
	
	document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} DNA Blueprints`;

    storage.gameData.dnaBlueprintTime = storage.gameData.dnaBlueprintTime.times(new Decimal(10).pow(bulk));
    const v = storage.gameData.dnaBlueprintTime.div(new Decimal(1000));
    const u = v.div(storage.gameData.gameSpeed);
	document.getElementById('blueprintTimeCounter').innerHTML = `Fabricating a DNA Blueprint takes ${storage.truncateToDecimalPlaces(v, 3)} seconds (${storage.truncateToDecimalPlaces(u, 3)} seconds real time)`;
	
	var a = new Decimal(0.95);
	if (storage.entropyUpgradeFactor.R5Amount.greaterThanOrEqualTo(new Decimal(1))) {
		const x = new Decimal(0.005);
		const y = storage.entropyUpgradeFactor.R5Amount.times(x);
		a = a.plus(y);
		document.getElementById('R5').innerHTML = `Blueprint Dampener (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Amount, 3)} / 5)<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Cost, 3)} RNA strands<br>Effect: -${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Effect, 3)} from DNA Blueprint nerf root`;
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
    document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (0 currently) (0 total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
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
	if (storage.gameData.droughtLevel.greaterThan(new Decimal(1))) {
		const x = Decimal.log10(storage.gameData.bacteria.plus(new Decimal(1)));
		const y = new Decimal(0.2).times(x);
		const z = y.minus(new Decimal(10));
		const w = z.trunc();
		storage.gameData.rna = w;
		
		const v = storage.gameData.rna.plus(new Decimal(1));
		const u = (new Decimal(5).times(v)).plus(new Decimal(55));
		document.getElementById('rnaCounter').innerHTML = `You have ${storage.truncateToDecimalPlaces(storage.gameData.rna, 3)} strands of RNA (next at 1e${storage.truncateToDecimalPlaces(u, 3)} Bacteria)`;
	}
}

function R1() {
	if (storage.gameData.rna.greaterThanOrEqualTo(storage.entropyUpgradeFactor.R1Cost)) {
		storage.entropyUpgradeFactor.R1Amount = storage.entropyUpgradeFactor.R1Amount.plus(new Decimal(1));
		storage.entropyUpgradeFactor.R1Cost = storage.entropyUpgradeFactor.R1Cost.pow(new Decimal(1.1));
		storage.entropyUpgradeFactor.R1Effect = storage.entropyUpgradeFactor.R1Effect.times(new Decimal(1.5));
		document.getElementById('R1').innerHTML = `More Game speed (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R1Amount, 3)})<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R1Cost, 3)} RNA strands<br>Effect: x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R1Effect, 3)} Game speed`;
	}
}
document.getElementById('R1').addEventListener("click", R1);

function R2() {
	if (storage.gameData.rna.greaterThanOrEqualTo(storage.entropyUpgradeFactor.R2Cost)) {
		storage.entropyUpgradeFactor.R2Amount = storage.entropyUpgradeFactor.R2Amount.plus(new Decimal(1));
		storage.entropyUpgradeFactor.R2Cost = storage.entropyUpgradeFactor.R2Cost.pow(new Decimal(1.1));
		storage.entropyUpgradeFactor.R2Effect = storage.entropyUpgradeFactor.R2Effect.plus(new Decimal(1.5));
		document.getElementById('R2').innerHTML = `Delay Super Scaling (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R2Amount, 3)})<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R2Cost, 3)} RNA strands<br>Effect: +${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R2Effect, 3)} Super Scaling delay`;
	}
}
document.getElementById('R2').addEventListener("click", R2);

function R3() {
	if (storage.gameData.rna.greaterThanOrEqualTo(storage.entropyUpgradeFactor.R3Cost)) {
		storage.entropyUpgradeFactor.R3Amount = storage.entropyUpgradeFactor.R3Amount.plus(new Decimal(1));
		storage.entropyUpgradeFactor.R3Cost = storage.entropyUpgradeFactor.R3Cost.pow(new Decimal(1.1));
		storage.entropyUpgradeFactor.R3Effect = storage.entropyUpgradeFactor.R3Effect.plus(new Decimal(0.01));
		document.getElementById('R3').innerHTML = `Softcap Dampener (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R3Amount, 3)} / 10)<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R3Cost, 3)} RNA strands<br>Effect: -${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R3Effect, 3)} from Fruit softcap root`;
	}
}
document.getElementById('R3').addEventListener("click", R3);

function R4() {
	if (storage.gameData.rna.greaterThanOrEqualTo(storage.entropyUpgradeFactor.R4Cost)) {
		storage.entropyUpgradeFactor.R4Amount = storage.entropyUpgradeFactor.R4Amount.plus(new Decimal(1));
		storage.entropyUpgradeFactor.R4Cost = storage.entropyUpgradeFactor.R4Cost.pow(new Decimal(1.1));
		storage.entropyUpgradeFactor.R4Effect = storage.entropyUpgradeFactor.R4Effect.times(new Decimal(2));
		document.getElementById('R4').innerHTML = `Entropificator (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R4Amount, 3)})<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R4Cost, 3)} RNA strands<br>Effect: x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R4Effect, 3)} Entropy`;
	}
}
document.getElementById('R4').addEventListener("click", R4);

function R5() {
	if (storage.gameData.rna.greaterThanOrEqualTo(storage.entropyUpgradeFactor.R5Cost)) {
		storage.entropyUpgradeFactor.R5Amount = storage.entropyUpgradeFactor.R5Amount.plus(new Decimal(1));
		storage.entropyUpgradeFactor.R5Cost = storage.entropyUpgradeFactor.R5Cost.pow(new Decimal(1.1));
		storage.entropyUpgradeFactor.R5Effect = storage.entropyUpgradeFactor.R5Effect.plus(new Decimal(0.005));
		document.getElementById('R5').innerHTML = `Blueprint Dampener (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Amount, 3)} / 5)<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Cost, 3)} RNA strands<br>Effect: -${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R5Effect, 3)} from DNA Blueprint nerf root`;
	}
}
document.getElementById('R5').addEventListener("click", R5);

function R6() {
	if (storage.gameData.rna.greaterThanOrEqualTo(storage.entropyUpgradeFactor.R6Cost)) {
		storage.entropyUpgradeFactor.R6Amount = storage.entropyUpgradeFactor.R6Amount.plus(new Decimal(1));
		storage.entropyUpgradeFactor.R6Cost = storage.entropyUpgradeFactor.R6Cost.pow(new Decimal(1.1));
		storage.entropyUpgradeFactor.R6Effect = storage.entropyUpgradeFactor.R6Effect.plus(new Decimal(0.01));
		document.getElementById('R6').innerHTML = `Viral Amplifier (${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R6Amount, 3)})<br>Requires ${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R6Cost, 3)} RNA strands<br>Effect: -${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.R6Effect, 3)} from Game speed Virus root`;
	}
}
document.getElementById('R6').addEventListener("click", R6);

function RuBisCo() {
	if (storage.gameData.dnaBlueprints.greaterThanOrEqualTo(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		storage.entropyUpgradeFactor.rubisco = storage.entropyUpgradeFactor.rubisco.plus(new Decimal(1));
	}
}
document.getElementById('makeRuBisCo').addEventListener("click", RuBisCo);

function Extensin() {
	if (storage.gameData.dnaBlueprints.greaterThanOrEqualTo(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		storage.entropyUpgradeFactor.extensin = storage.entropyUpgradeFactor.extensin.plus(new Decimal(1));
	}
}
document.getElementById('makeExtensin').addEventListener("click", Extensin);

function Arganine() {
	if (storage.gameData.dnaBlueprints.greaterThanOrEqualTo(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		storage.entropyUpgradeFactor.arganine = storage.entropyUpgradeFactor.arganine.plus(new Decimal(1));
	}
}
document.getElementById('makeArganine').addEventListener("click", Arganine);

function Glutamine() {
	if (storage.gameData.dnaBlueprints.greaterThanOrEqualTo(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		storage.entropyUpgradeFactor.glutamine = storage.entropyUpgradeFactor.glutamine.plus(new Decimal(1));
	}
}
document.getElementById('makeGlutamine').addEventListener("click", Glutamine);

function Glutamate() {
	if (storage.gameData.dnaBlueprints.greaterThanOrEqualTo(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		storage.entropyUpgradeFactor.glutamate = storage.entropyUpgradeFactor.glutamate.plus(new Decimal(1));
	}
}
document.getElementById('makeGlutamate').addEventListener("click", Glutamate);

function Asparagine() {
	if (storage.gameData.dnaBlueprints.greaterThanOrEqualTo(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		storage.entropyUpgradeFactor.asparagine = storage.entropyUpgradeFactor.asparagine.plus(new Decimal(1));
	}
}
document.getElementById('makeAsparagine').addEventListener("click", Asparagine);

function AGP() {
	if (storage.gameData.dnaBlueprints.greaterThanOrEqualTo(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		
		storage.entropyUpgradeFactor.agp = storage.entropyUpgradeFactor.agp.plus(new Decimal(1));
	}
}
document.getElementById('makeAGP').addEventListener("click", AGP);

function TRB() {
	if (storage.gameData.dnaBlueprints.greaterThanOrEqualTo(new Decimal(1))) {
		storage.gameData.dnaBlueprints = storage.gameData.dnaBlueprints.minus(new Decimal(1));
		document.getElementById('makeBlueprints').innerHTML = `Fabricate a DNA Blueprint (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} currently) (${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} total)<br>Fabricating a DNA Blueprint will ^0.95 your Cell Replication speed and Bacteria`;
		document.getElementById('blueprintCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprints, 3)} / ${storage.truncateToDecimalPlaces(storage.gameData.dnaBlueprintsTotal, 3)} DNA Blueprints`;
		storage.entropyUpgradeFactor.trb = storage.entropyUpgradeFactor.trb.plus(new Decimal(1));
	}
}
document.getElementById('makeTRB').addEventListener("click", TRB);

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
	if (totalRuBisCo.greaterThanOrEqualTo(new Decimal(1))) {		
		const x = totalRuBisCo.pow(new Decimal(0.1));
		const y = x.minus(new Decimal(0.9));
		const z = storage.gameData.seedsMult.times(storage.gameData.fruitsMult);
		var w = z.pow(y);
		if (storage.entropyUpgradeFactor.E39Bought) {
			w = w.pow(new Decimal(1.1));
		}
		if (storage.leafUpgradeFactor.L63Bought) {
			w = w.pow(new Decimal(1.1));
		}
		if (storage.rootUpgradeFactor.RO1Bought) {
			w = w.pow(new Decimal(1.1));
		}
		storage.entropyUpgradeFactor.rubiscoEffect = w;
		if (!(storage.entropyUpgradeFactor.rubiscoFree.greaterThanOrEqualTo(new Decimal(1)))) {
			document.getElementById('rubiscoCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubisco, 3)} RuBisCo Proteins<br>Seed and Fruit base mult boost Leaves (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubiscoEffect, 3)})`;
		}
		if (storage.entropyUpgradeFactor.rubiscoFree.greaterThanOrEqualTo(new Decimal(1))) {
			document.getElementById('rubiscoCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubisco, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubiscoFree, 3)}) RuBisCo Proteins<br>Seed and Fruit base mult boost Leaves (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.rubiscoEffect, 3)})`;
		}
	}
	let totalExtensin = storage.entropyUpgradeFactor.extensin.plus(storage.entropyUpgradeFactor.extensinFree);
	if (totalExtensin.greaterThanOrEqualTo(new Decimal(1))) {
		var x = new Decimal(1.05).times(totalExtensin);
		if (storage.rootUpgradeFactor.RO5Bought) {
			x = new Decimal(1.5).times(totalExtensin);
		}
		const y = new Decimal(1e10);
		const z = y.pow(x);
		storage.entropyUpgradeFactor.extensinEffect = z;
		if (!(storage.entropyUpgradeFactor.extensinFree.greaterThanOrEqualTo(new Decimal(1)))) {
			document.getElementById('extensinCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.extensin, 3)} Extensin Proteins<br>Cells replicate x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.extensinEffect, 3)} more times each tick`;
		}
		if (storage.entropyUpgradeFactor.extensinFree.greaterThanOrEqualTo(new Decimal(1))) {
			document.getElementById('extensinCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.extensin, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.extensinFree, 3)}) Extensin Proteins<br>Cells replicate x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.extensinEffect, 3)} more times each tick`;
		}
	}
	let totalArganine = storage.entropyUpgradeFactor.arganine.plus(storage.entropyUpgradeFactor.arganineFree);
	if (totalArganine.greaterThanOrEqualTo(new Decimal(1))) {
		let temporaryArganineEffect = new Decimal(0);
		for (let i = 1; i < (totalArganine.plus(new Decimal(1))).toNumber(); i++) {
			const a = new Decimal(i);
			const x = new Decimal(10).times(a);
			const y = new Decimal(1).div(x);
			var z = y;
			if (a.greaterThanOrEqualTo(new Decimal(4))) {
				z = new Decimal(0.025);
			}
			temporaryArganineEffect = temporaryArganineEffect.plus(z);
		}		
		storage.entropyUpgradeFactor.arganineEffect = temporaryArganineEffect;
		if (!(storage.entropyUpgradeFactor.arganineFree.greaterThanOrEqualTo(new Decimal(1)))) {
			document.getElementById('arganineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.arganine, 3)} Arganine Proteins<br>+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.arganineEffect, 3)} to all supercap roots`;
		}
		if (storage.entropyUpgradeFactor.arganineFree.greaterThanOrEqualTo(new Decimal(1))) {
			document.getElementById('arganineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.arganine, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.arganineFree, 3)}) Arganine Proteins<br>+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.arganineEffect, 3)} to all supercap roots`;
		}
	}
	let totalGlutamine = storage.entropyUpgradeFactor.glutamine.plus(storage.entropyUpgradeFactor.glutamineFree);
	if (totalGlutamine.greaterThanOrEqualTo(new Decimal(1))) {
		const x = totalGlutamine;
		const y = x.pow(new Decimal(0.5));
		const z = y.times(new Decimal(10));
		const w = storage.gameData.entropy.pow(z);
		storage.entropyUpgradeFactor.glutamineEffect = w;
		if (!(storage.entropyUpgradeFactor.glutamineFree.greaterThanOrEqualTo(new Decimal(1)))) {
			document.getElementById('glutamineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamine, 3)} Glutamine Proteins<br>Adds an extra Entropy factor to the Moss formula (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamineEffect, 3)})`;
		}
		if (storage.entropyUpgradeFactor.glutamineFree.greaterThanOrEqualTo(new Decimal(1))) {
			document.getElementById('glutamineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamine, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamineFree, 3)}) Glutamine Proteins<br>Adds an extra Entropy factor to the Moss formula (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamineEffect, 3)})`;	
		}
	}
	let totalGlutamate = storage.entropyUpgradeFactor.glutamate.plus(storage.entropyUpgradeFactor.glutamateFree);
	if (totalGlutamate.greaterThanOrEqualTo(new Decimal(1))) {
		const x = totalGlutamate;
		const y = x.times(new Decimal(10));
		storage.entropyUpgradeFactor.glutamateEffect = y;
		if (!(storage.entropyUpgradeFactor.glutamateFree.greaterThanOrEqualTo(new Decimal(1)))) {
			document.getElementById('glutamateCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamate, 3)} Glutamate Proteins<br> +${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamateEffect, 3)} to LR1, SR1, and FR1 caps`;	
		}
		if (storage.entropyUpgradeFactor.glutamateFree.greaterThanOrEqualTo(new Decimal(1))) {
			document.getElementById('glutamateCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamate, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamateFree, 3)}) Glutamate Proteins<br> +${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.glutamateEffect, 3)} to LR1, SR1, and FR1 caps`;	
		}
	}
	let totalAsparagine = storage.entropyUpgradeFactor.asparagine.plus(storage.entropyUpgradeFactor.asparagineFree);
	if (totalAsparagine.greaterThanOrEqualTo(new Decimal(1))) {
		const x = totalAsparagine;
		const y = x.times(storage.gameData.gameSpeed);
		const z = y.div(new Decimal(100000));
		storage.entropyUpgradeFactor.asparagineEffect = z;
		if (!(storage.entropyUpgradeFactor.asparagineFree.greaterThanOrEqualTo(new Decimal(1)))) {
			document.getElementById('asparagineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.asparagine, 3)} Asparagine Proteins<br> Game speed boosts Bacteria base mult (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.asparagineEffect, 3)})`;
		}
		if (storage.entropyUpgradeFactor.asparagineFree.greaterThanOrEqualTo(new Decimal(1))) {
			document.getElementById('asparagineCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.asparagine, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.asparagineFree, 3)}) Asparagine Proteins<br> Game speed boosts Bacteria base mult (x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.asparagineEffect, 3)})`;
		}
	}
	let totalAGP = storage.entropyUpgradeFactor.agp.plus(storage.entropyUpgradeFactor.agpFree);
	if (totalAGP.greaterThanOrEqualTo(new Decimal(1))) {
		const x = totalAGP;
		const y = new Decimal(0.975).pow(x);
		storage.entropyUpgradeFactor.agpEffect = y;
		if (!(storage.entropyUpgradeFactor.agpFree.greaterThanOrEqualTo(new Decimal(1)))) {
			document.getElementById('agpCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agp, 3)} AGP Proteins<br> ^${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agpEffect, 3)} Cell overpopulation division effect`;
		}
		if (storage.entropyUpgradeFactor.agpFree.greaterThanOrEqualTo(new Decimal(1))) {
			document.getElementById('agpCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agp, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agpFree, 3)}) AGP Proteins<br> ^${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.agpEffect, 3)} Cell overpopulation division effect`;
		}
	}
	let totalTRB = storage.entropyUpgradeFactor.trb.plus(storage.entropyUpgradeFactor.trbFree);
	if (totalTRB.greaterThanOrEqualTo(new Decimal(1))) {
		const x = new Decimal(1.5).pow(totalTRB);
		storage.entropyUpgradeFactor.trbEffect = x;
		if (!(storage.entropyUpgradeFactor.trbFree.greaterThanOrEqualTo(new Decimal(1)))) {
			document.getElementById('trbCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.trb, 3)} TRB Proteins<br> x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.trbEffect, 3)} RNA and R1's effect`;
		}
		if (storage.entropyUpgradeFactor.trbFree.greaterThanOrEqualTo(new Decimal(1))) {
			document.getElementById('trbCounter').innerHTML = `${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.trb, 3)} (+${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.trbFree, 3)}) TRB Proteins<br> x${storage.truncateToDecimalPlaces(storage.entropyUpgradeFactor.trbEffect, 3)} RNA and R1's effect`;
		}
	}
}
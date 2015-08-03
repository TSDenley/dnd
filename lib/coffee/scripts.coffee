abilitySelects = document.querySelectorAll '.ability-select'


###
	Calc ability points remaining and update counter HTML.
	Add and error class to counter if overspent points.
###
calcAbilityScore = () ->
	totalScore = 0
	maxPoints = 27
	counter = document.getElementById 'points-remaining'

	for ability in abilitySelects
		totalScore = totalScore + Number ability.value

	pointsRemaining = Number maxPoints - totalScore

	if pointsRemaining < 0
		counter.className += " has-error" unless counter.className.match /(?:^|\s)has-error(?!\S)/
	else
		counter.className = counter.className.replace /(?:^|\s)has-error(?!\S)/g , ''

	counter.innerHTML = pointsRemaining


# Bind calc function on select
for ability in abilitySelects
	ability.addEventListener 'change', calcAbilityScore


# Racial ability bonuses
raceBonuses =
	"Human":
		STR: 1
		DEX: 1
		CON: 1
		INT: 1
		WIS: 1
		CHA: 1
	"Dwarf":
		STR: 0
		DEX: 0
		CON: 2
		INT: 0
		WIS: 0
		CHA: 0
	"Elf":
		STR: 0
		DEX: 2
		CON: 0
		INT: 0
		WIS: 0
		CHA: 0
	"Half-Elf":
		STR: 0
		DEX: 0
		CON: 0
		INT: 0
		WIS: 0
		CHA: 2
	"Halfling":
		STR: 0
		DEX: 0
		CON: 0
		INT: 0
		WIS: 0
		CHA: 0
	"Half-Orc":
		STR: 0
		DEX: 0
		CON: 0
		INT: 0
		WIS: 0
		CHA: 0
	"Gnome":
		STR: 0
		DEX: 0
		CON: 0
		INT: 2
		WIS: 0
		CHA: 0
	"Dragonborn":
		STR: 0
		DEX: 0
		CON: 0
		INT: 0
		WIS: 0
		CHA: 0
	"Tiefling":
		STR: 0
		DEX: 0
		CON: 0
		INT: 0
		WIS: 0
		CHA: 0

raceSelect = document.getElementById 'race-select'

applyRacialBonus = () ->
	chosenRace = raceSelect.value

	console.log raceBonuses[chosenRace] unless chosenRace is "0"

raceSelect.addEventListener 'change', applyRacialBonus

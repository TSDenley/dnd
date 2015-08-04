abilitySelects = document.querySelectorAll '.ability-select'
abilityTable = document.getElementById 'ability-score-table'


###
Update ability table with chosen scores
###
updateBaseAbilityScore = () ->
	data =
		"base-str": document.getElementById('str').value
		"base-dex": document.getElementById('dex').value
		"base-con": document.getElementById('con').value
		"base-int": document.getElementById('int').value
		"base-wis": document.getElementById('wis').value
		"base-cha": document.getElementById('cha').value

	Transparency.render abilityTable, data


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

	updateBaseAbilityScore()


# Bind calc function on select
for ability in abilitySelects
	ability.addEventListener 'change', calcAbilityScore


raceSelect = document.getElementById 'race-select'

###
Lookup and apply ability bonuses of the chosen race
###
applyRacialBonus = () ->
	chosenRace = raceSelect.value

	unless chosenRace is "0"
		raceData = raceBonuses[chosenRace]
		console.log raceData

		Transparency.render abilityTable, raceData


raceSelect.addEventListener 'change', applyRacialBonus

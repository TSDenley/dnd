abilitySelects = document.querySelectorAll '.ability-select'
raceSelect = document.getElementById 'race-select'
abilityTable = document.getElementById 'ability-score-table'


###
Update ability table with chosen scores
###
updateAbilityScoreTable = () ->
	chosenRace = raceSelect.value
	raceData = raceBonuses[chosenRace]

	# Base values
	str = Number document.getElementById('str').value
	dex = Number document.getElementById('dex').value
	con = Number document.getElementById('con').value
	int = Number document.getElementById('int').value
	wis = Number document.getElementById('wis').value
	cha = Number document.getElementById('cha').value

	data =
		"base-str": str
		"base-dex": dex
		"base-con": con
		"base-int": int
		"base-wis": wis
		"base-cha": cha

	# Racial bonuses
	for ability, value of raceData
		data[ability] = Number value

	# Calc adjusted scores (bace + racial)
	data["adjusted-str"] = str + data["bonus-str"]
	data["adjusted-dex"] = dex + data["bonus-dex"]
	data["adjusted-con"] = con + data["bonus-con"]
	data["adjusted-int"] = int + data["bonus-int"]
	data["adjusted-wis"] = wis + data["bonus-wis"]
	data["adjusted-cha"] = cha + data["bonus-cha"]

	# Calc modifiers

	console.log data

	Transparency.render abilityTable, data


###
Calc ability points remaining and update counter HTML.
Add and error class to counter if overspent points.
@uses updateAbilityScoreTable()
###
calcAbilityPointsRemaining = () ->
	totalScore = 0
	maxPoints = 27
	counter = document.getElementById 'points-remaining'

	for ability in abilitySelects
		totalScore = totalScore + Number abilityScore[ability.value].pointsCost

	pointsRemaining = Number maxPoints - totalScore

	if pointsRemaining < 0
		counter.className += " has-error" unless counter.className.match /(?:^|\s)has-error(?!\S)/
	else
		counter.className = counter.className.replace /(?:^|\s)has-error(?!\S)/g , ''

	counter.innerHTML = pointsRemaining

	updateAbilityScoreTable()


# Bind calc function on select
for ability in abilitySelects
	ability.addEventListener 'change', calcAbilityPointsRemaining


# Update table with racial data on select
raceSelect.addEventListener 'change', updateAbilityScoreTable

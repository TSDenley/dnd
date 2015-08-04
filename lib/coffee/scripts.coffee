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
		data[ability] = if Number value > 0 then Number value else null

	# Calc adjusted scores (bace + racial)
	data["adjusted-str"] = if data["bonus-str"] > 0 then str + data["bonus-str"] else null
	data["adjusted-dex"] = if data["bonus-dex"] > 0 then dex + data["bonus-dex"] else null
	data["adjusted-con"] = if data["bonus-con"] > 0 then con + data["bonus-con"] else null
	data["adjusted-int"] = if data["bonus-int"] > 0 then int + data["bonus-int"] else null
	data["adjusted-wis"] = if data["bonus-wis"] > 0 then wis + data["bonus-wis"] else null
	data["adjusted-cha"] = if data["bonus-cha"] > 0 then cha + data["bonus-cha"] else null

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

abilitySelects = document.querySelectorAll '.ability-select'
raceSelect = document.getElementById 'race-select'
abilityTable = document.getElementById 'ability-score-table'


###
Calc modifier from ability score
###
calcModifier = (score) ->

	if score == 10
		return 0
	else if score <= 9
		return -1
	else if score > 10
		return Math.floor( (score - 9) / 2 )


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
		str: str
		dex: dex
		con: con
		int: int
		wis: wis
		cha: cha

	# Racial bonuses
	for ability, value of raceData
		data[ability] = if Number value > 0 then Number value else null

	# Calc adjusted scores (bace + racial)
	for ability in abilities
		data['adjusted-' + ability] = if data['bonus-' + ability] > 0 then data[ability] + data['bonus-' + ability] else null

	# Calc modifiers
	for ability in abilities
		unless data['adjusted-' + ability] is null
			data[ability + '-modifier'] = calcModifier data['adjusted-' + ability]
		else
			data[ability + '-modifier'] = calcModifier data[ability]

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

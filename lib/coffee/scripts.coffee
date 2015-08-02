abilitySelects = document.querySelectorAll '.ability-select'


###
	Calc ability points remaining and update counter HTML.
	Add and error class to counter if overspent points.
###
calcAbilityScore = () ->
	totalScore = 0
	maxPoints = 27
	counter = document.getElementById 'points-remaining'
	errorClass = 'has-error'

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

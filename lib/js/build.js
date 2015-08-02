var ability, abilitySelects, calcAbilityScore, i, len;

abilitySelects = document.querySelectorAll('.ability-select');


/*
	Calc ability points remaining and update counter HTML.
	Add and error class to counter if overspent points.
 */

calcAbilityScore = function() {
  var ability, counter, errorClass, i, len, maxPoints, pointsRemaining, totalScore;
  totalScore = 0;
  maxPoints = 27;
  counter = document.getElementById('points-remaining');
  errorClass = 'has-error';
  for (i = 0, len = abilitySelects.length; i < len; i++) {
    ability = abilitySelects[i];
    totalScore = totalScore + Number(ability.value);
  }
  pointsRemaining = Number(maxPoints - totalScore);
  if (pointsRemaining < 0) {
    if (!counter.className.match(/(?:^|\s)has-error(?!\S)/)) {
      counter.className += " has-error";
    }
  } else {
    counter.className = counter.className.replace(/(?:^|\s)has-error(?!\S)/g, '');
  }
  return counter.innerHTML = pointsRemaining;
};

for (i = 0, len = abilitySelects.length; i < len; i++) {
  ability = abilitySelects[i];
  ability.addEventListener('change', calcAbilityScore);
}

//# sourceMappingURL=build.js.map
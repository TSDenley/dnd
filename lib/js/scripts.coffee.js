var ability, abilitySelects, abilityTable, applyRacialBonus, calcAbilityScore, i, len, raceSelect, updateBaseAbilityScore;

abilitySelects = document.querySelectorAll('.ability-select');

abilityTable = document.getElementById('ability-score-table');


/*
Update ability table with chosen scores
 */

updateBaseAbilityScore = function() {
  var data;
  data = {
    "base-str": document.getElementById('str').value,
    "base-dex": document.getElementById('dex').value,
    "base-con": document.getElementById('con').value,
    "base-int": document.getElementById('int').value,
    "base-wis": document.getElementById('wis').value,
    "base-cha": document.getElementById('cha').value
  };
  return Transparency.render(abilityTable, data);
};


/*
Calc ability points remaining and update counter HTML.
Add and error class to counter if overspent points.
 */

calcAbilityScore = function() {
  var ability, counter, i, len, maxPoints, pointsRemaining, totalScore;
  totalScore = 0;
  maxPoints = 27;
  counter = document.getElementById('points-remaining');
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
  counter.innerHTML = pointsRemaining;
  return updateBaseAbilityScore();
};

for (i = 0, len = abilitySelects.length; i < len; i++) {
  ability = abilitySelects[i];
  ability.addEventListener('change', calcAbilityScore);
}

raceSelect = document.getElementById('race-select');


/*
Lookup and apply ability bonuses of the chosen race
 */

applyRacialBonus = function() {
  var chosenRace, raceData;
  chosenRace = raceSelect.value;
  if (chosenRace !== "0") {
    raceData = raceBonuses[chosenRace];
    console.log(raceData);
    return Transparency.render(abilityTable, raceData);
  }
};

raceSelect.addEventListener('change', applyRacialBonus);

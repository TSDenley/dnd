var ability, abilitySelects, abilityTable, calcAbilityPointsRemaining, calcModifier, i, len, raceSelect, updateAbilityScoreTable;

abilitySelects = document.querySelectorAll('.ability-select');

raceSelect = document.getElementById('race-select');

abilityTable = document.getElementById('ability-score-table');


/*
Calc modifier from ability score
 */

calcModifier = function(score) {
  if (score === 10) {
    return 0;
  } else if (score <= 9) {
    return -1;
  } else if (score > 10) {
    return Math.floor((score - 9) / 2);
  }
};


/*
Update ability table with chosen scores
 */

updateAbilityScoreTable = function() {
  var ability, cha, chosenRace, con, data, dex, i, int, j, len, len1, raceData, str, value, wis;
  chosenRace = raceSelect.value;
  raceData = raceBonuses[chosenRace];
  str = Number(document.getElementById('str').value);
  dex = Number(document.getElementById('dex').value);
  con = Number(document.getElementById('con').value);
  int = Number(document.getElementById('int').value);
  wis = Number(document.getElementById('wis').value);
  cha = Number(document.getElementById('cha').value);
  data = {
    str: str,
    dex: dex,
    con: con,
    int: int,
    wis: wis,
    cha: cha
  };
  for (ability in raceData) {
    value = raceData[ability];
    data[ability] = Number(value > 0) ? Number(value) : null;
  }
  for (i = 0, len = abilities.length; i < len; i++) {
    ability = abilities[i];
    data['adjusted-' + ability] = data['bonus-' + ability] > 0 ? data[ability] + data['bonus-' + ability] : null;
  }
  for (j = 0, len1 = abilities.length; j < len1; j++) {
    ability = abilities[j];
    if (data['adjusted-' + ability] !== null) {
      data[ability + '-modifier'] = calcModifier(data['adjusted-' + ability]);
    } else {
      data[ability + '-modifier'] = calcModifier(data[ability]);
    }
  }
  console.log(data);
  return Transparency.render(abilityTable, data);
};


/*
Calc ability points remaining and update counter HTML.
Add and error class to counter if overspent points.
@uses updateAbilityScoreTable()
 */

calcAbilityPointsRemaining = function() {
  var ability, counter, i, len, maxPoints, pointsRemaining, totalScore;
  totalScore = 0;
  maxPoints = 27;
  counter = document.getElementById('points-remaining');
  for (i = 0, len = abilitySelects.length; i < len; i++) {
    ability = abilitySelects[i];
    totalScore = totalScore + Number(abilityScore[ability.value].pointsCost);
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
  return updateAbilityScoreTable();
};

for (i = 0, len = abilitySelects.length; i < len; i++) {
  ability = abilitySelects[i];
  ability.addEventListener('change', calcAbilityPointsRemaining);
}

raceSelect.addEventListener('change', updateAbilityScoreTable);

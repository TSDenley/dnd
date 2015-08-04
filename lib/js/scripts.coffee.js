var ability, abilitySelects, abilityTable, calcAbilityPointsRemaining, i, len, raceSelect, updateAbilityScoreTable;

abilitySelects = document.querySelectorAll('.ability-select');

raceSelect = document.getElementById('race-select');

abilityTable = document.getElementById('ability-score-table');


/*
Update ability table with chosen scores
 */

updateAbilityScoreTable = function() {
  var ability, cha, chosenRace, con, data, dex, int, raceData, str, value, wis;
  chosenRace = raceSelect.value;
  raceData = raceBonuses[chosenRace];
  str = Number(document.getElementById('str').value);
  dex = Number(document.getElementById('dex').value);
  con = Number(document.getElementById('con').value);
  int = Number(document.getElementById('int').value);
  wis = Number(document.getElementById('wis').value);
  cha = Number(document.getElementById('cha').value);
  data = {
    "base-str": str,
    "base-dex": dex,
    "base-con": con,
    "base-int": int,
    "base-wis": wis,
    "base-cha": cha
  };
  for (ability in raceData) {
    value = raceData[ability];
    data[ability] = Number(value);
  }
  data["adjusted-str"] = str + data["bonus-str"];
  data["adjusted-dex"] = dex + data["bonus-dex"];
  data["adjusted-con"] = con + data["bonus-con"];
  data["adjusted-int"] = int + data["bonus-int"];
  data["adjusted-wis"] = wis + data["bonus-wis"];
  data["adjusted-cha"] = cha + data["bonus-cha"];
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

var ability, abilitySelects, applyRacialBonus, calcAbilityScore, i, len, raceBonuses, raceSelect;

abilitySelects = document.querySelectorAll('.ability-select');


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
  return counter.innerHTML = pointsRemaining;
};

for (i = 0, len = abilitySelects.length; i < len; i++) {
  ability = abilitySelects[i];
  ability.addEventListener('change', calcAbilityScore);
}

raceBonuses = {
  "Human": {
    STR: 1,
    DEX: 1,
    CON: 1,
    INT: 1,
    WIS: 1,
    CHA: 1
  },
  "Dwarf": {
    STR: 0,
    DEX: 0,
    CON: 2,
    INT: 0,
    WIS: 0,
    CHA: 0
  },
  "Elf": {
    STR: 0,
    DEX: 2,
    CON: 0,
    INT: 0,
    WIS: 0,
    CHA: 0
  },
  "Half-Elf": {
    STR: 0,
    DEX: 0,
    CON: 0,
    INT: 0,
    WIS: 0,
    CHA: 2
  },
  "Halfling": {
    STR: 0,
    DEX: 0,
    CON: 0,
    INT: 0,
    WIS: 0,
    CHA: 0
  },
  "Half-Orc": {
    STR: 0,
    DEX: 0,
    CON: 0,
    INT: 0,
    WIS: 0,
    CHA: 0
  },
  "Gnome": {
    STR: 0,
    DEX: 0,
    CON: 0,
    INT: 2,
    WIS: 0,
    CHA: 0
  },
  "Dragonborn": {
    STR: 0,
    DEX: 0,
    CON: 0,
    INT: 0,
    WIS: 0,
    CHA: 0
  },
  "Tiefling": {
    STR: 0,
    DEX: 0,
    CON: 0,
    INT: 0,
    WIS: 0,
    CHA: 0
  }
};

raceSelect = document.getElementById('race-select');

applyRacialBonus = function() {
  var chosenRace;
  chosenRace = raceSelect.value;
  if (chosenRace !== "0") {
    return console.log(raceBonuses[chosenRace]);
  }
};

raceSelect.addEventListener('change', applyRacialBonus);

//# sourceMappingURL=build.js.map
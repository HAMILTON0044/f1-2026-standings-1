const TEAM_COLLATOR = new Intl.Collator("en", { sensitivity: "base" });

function getScoringPoints(points) {
  return Number.isFinite(points) && points > 0 ? points : 0;
}

function copyDriver(driver) {
  return {
    name: driver.name,
    points: driver.points,
    position: driver.position,
    team: driver.team,
  };
}

export function buildConstructorStandings(drivers) {
  if (!Array.isArray(drivers) || drivers.length === 0) {
    return [];
  }

  const constructorsByTeam = new Map();

  for (const driver of drivers) {
    const constructor = constructorsByTeam.get(driver.team) ?? {
      team: driver.team,
      points: 0,
      drivers: [],
    };

    constructor.points += getScoringPoints(driver.points);
    constructor.drivers.push(copyDriver(driver));
    constructorsByTeam.set(driver.team, constructor);
  }

  return [...constructorsByTeam.values()]
    .map((constructor) => ({
      ...constructor,
      drivers: constructor.drivers.toSorted(
        (left, right) => left.position - right.position,
      ),
    }))
    .sort(
      (left, right) =>
        right.points - left.points
        || TEAM_COLLATOR.compare(left.team, right.team),
    )
    .map((constructor, index) => ({
      position: index + 1,
      ...constructor,
    }));
}

import assert from "node:assert/strict";
import test from "node:test";
import { buildConstructorStandings } from "./constructorStandings.js";

test("groups drivers by team and totals their points", () => {
  const standings = buildConstructorStandings([
    { position: 1, name: "Driver One", team: "Orion", points: 25 },
    { position: 3, name: "Driver Three", team: "Orion", points: 15 },
    { position: 2, name: "Driver Two", team: "Nova", points: 18 },
  ]);

  assert.deepEqual(standings, [
    {
      position: 1,
      team: "Orion",
      points: 40,
      drivers: [
        { position: 1, name: "Driver One", team: "Orion", points: 25 },
        { position: 3, name: "Driver Three", team: "Orion", points: 15 },
      ],
    },
    {
      position: 2,
      team: "Nova",
      points: 18,
      drivers: [
        { position: 2, name: "Driver Two", team: "Nova", points: 18 },
      ],
    },
  ]);
});

test("sorts by points and resolves ties using English team names", () => {
  const standings = buildConstructorStandings([
    { position: 1, name: "Zulu Driver", team: "Zulu", points: 20 },
    { position: 2, name: "Beta Driver", team: "beta", points: 30 },
    { position: 3, name: "Alpha Driver", team: "Alpha", points: 20 },
  ]);

  assert.deepEqual(
    standings.map(({ position, team, points }) => ({ position, team, points })),
    [
      { position: 1, team: "beta", points: 30 },
      { position: 2, team: "Alpha", points: 20 },
      { position: 3, team: "Zulu", points: 20 },
    ],
  );
});

test("sorts each team's copied driver records by official position", () => {
  const input = [
    { position: 9, name: "Second Driver", team: "Orion", points: 2 },
    { position: 4, name: "First Driver", team: "Orion", points: 4 },
  ];
  const [constructor] = buildConstructorStandings(input);

  assert.deepEqual(
    constructor.drivers.map(({ name }) => name),
    ["First Driver", "Second Driver"],
  );
  assert.notEqual(constructor.drivers[0], input[1]);
  assert.notEqual(constructor.drivers[1], input[0]);
});

test("returns an empty array for empty or non-array input", () => {
  assert.deepEqual(buildConstructorStandings([]), []);
  assert.deepEqual(buildConstructorStandings(), []);
});

test("treats non-finite and negative points as zero when totaling", () => {
  const standings = buildConstructorStandings([
    { position: 1, name: "Valid", team: "Orion", points: 8 },
    { position: 2, name: "Negative", team: "Orion", points: -12 },
    { position: 3, name: "NaN", team: "Orion", points: Number.NaN },
    { position: 4, name: "Infinity", team: "Nova", points: Number.POSITIVE_INFINITY },
    { position: 5, name: "Negative Infinity", team: "Nova", points: Number.NEGATIVE_INFINITY },
  ]);

  assert.deepEqual(
    standings.map(({ team, points }) => ({ team, points })),
    [
      { team: "Orion", points: 8 },
      { team: "Nova", points: 0 },
    ],
  );
  assert.ok(standings.every(({ points }) => points >= 0));
});

test("does not mutate the input array or any input driver", () => {
  const first = Object.freeze({
    position: 4,
    name: "First Driver",
    team: "Orion",
    points: 10,
    ignored: "not copied",
  });
  const second = Object.freeze({
    position: 2,
    name: "Second Driver",
    team: "Orion",
    points: 12,
  });
  const input = Object.freeze([first, second]);
  const snapshot = structuredClone(input);

  const [constructor] = buildConstructorStandings(input);

  assert.deepEqual(input, snapshot);
  assert.deepEqual(constructor.drivers, [
    { position: 2, name: "Second Driver", team: "Orion", points: 12 },
    { position: 4, name: "First Driver", team: "Orion", points: 10 },
  ]);
  assert.notEqual(constructor.drivers[0], second);
  assert.notEqual(constructor.drivers[1], first);
});

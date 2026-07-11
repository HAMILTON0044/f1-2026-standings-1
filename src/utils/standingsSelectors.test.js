import assert from "node:assert/strict";
import test from "node:test";
import {
  ALL_TEAMS,
  DEFAULT_SORT,
  DEFAULT_VIEW,
  SORT_OPTIONS,
  STANDINGS_VIEWS,
  createFilterSearch,
  filterAndSortDrivers,
  getTeams,
  readFiltersFromSearch,
} from "./standingsSelectors.js";

const drivers = [
  { position: 3, name: "Charles Leclerc", team: "Ferrari", points: 18 },
  { position: 1, name: "Lewis Hamilton", team: "Ferrari", points: 25 },
  { position: 4, name: "Oscar Piastri", team: "McLaren", points: 18 },
  { position: 2, name: "Lando Norris", team: "McLaren", points: 25 },
];

const defaultFilters = {
  query: "",
  team: ALL_TEAMS,
  sort: DEFAULT_SORT,
  view: DEFAULT_VIEW,
};

test("getTeams returns the all-teams option and unique teams in source order", () => {
  assert.deepEqual(getTeams(drivers), [ALL_TEAMS, "Ferrari", "McLaren"]);
});

test("combined filtering trims the query, ignores case, and matches the team exactly", () => {
  const result = filterAndSortDrivers(drivers, {
    query: "  CLERC  ",
    team: "Ferrari",
    sort: DEFAULT_SORT,
  });

  assert.deepEqual(result.map(({ name }) => name), ["Charles Leclerc"]);
});

test("query filtering is limited to driver names and 80 characters", () => {
  const longQuery = `${" ".repeat(2)}${"x".repeat(80)}ignored`;
  const longNameDriver = {
    position: 1,
    name: `${"x".repeat(80)} result`,
    team: "No Query Match",
    points: 1,
  };

  assert.deepEqual(
    filterAndSortDrivers([longNameDriver], {
      ...defaultFilters,
      query: longQuery,
    }),
    [longNameDriver],
  );
  assert.deepEqual(
    filterAndSortDrivers(drivers, {
      ...defaultFilters,
      query: "Ferrari",
    }),
    [],
  );
});

test("all sort modes use official position as their tie-break", async (context) => {
  const expectations = {
    position: ["Lewis Hamilton", "Lando Norris", "Charles Leclerc", "Oscar Piastri"],
    "points-desc": ["Lewis Hamilton", "Lando Norris", "Charles Leclerc", "Oscar Piastri"],
    "points-asc": ["Charles Leclerc", "Oscar Piastri", "Lewis Hamilton", "Lando Norris"],
    name: ["Charles Leclerc", "Lando Norris", "Lewis Hamilton", "Oscar Piastri"],
    team: ["Lewis Hamilton", "Charles Leclerc", "Lando Norris", "Oscar Piastri"],
  };

  for (const { value } of SORT_OPTIONS) {
    await context.test(value, () => {
      const result = filterAndSortDrivers(drivers, {
        ...defaultFilters,
        sort: value,
      });

      assert.deepEqual(result.map(({ name }) => name), expectations[value]);
    });
  }
});

test("sorting is stable and never mutates the input array", () => {
  const first = { position: 1, name: "Same", team: "Same", points: 10 };
  const second = { position: 1, name: "Same", team: "Same", points: 10 };
  const input = [second, first];
  const snapshot = [...input];
  const result = filterAndSortDrivers(input, {
    ...defaultFilters,
    sort: "points-desc",
  });

  assert.deepEqual(input, snapshot);
  assert.notEqual(result, input);
  assert.deepEqual(result, [second, first]);
});

test("readFiltersFromSearch reads valid values and normalizes the query", () => {
  assert.deepEqual(
    readFiltersFromSearch(
      "?q=%20LEC%20&team=Ferrari&sort=points-desc&view=constructors",
      getTeams(drivers),
    ),
    {
      query: "LEC",
      team: "Ferrari",
      sort: "points-desc",
      view: STANDINGS_VIEWS.constructors,
    },
  );
});

test("readFiltersFromSearch falls back for invalid values and limits the query", () => {
  const result = readFiltersFromSearch(
    `?q=${"x".repeat(90)}&team=Unknown&sort=random&view=unknown`,
    getTeams(drivers),
  );

  assert.deepEqual(result, {
    query: "x".repeat(80),
    team: ALL_TEAMS,
    sort: DEFAULT_SORT,
    view: DEFAULT_VIEW,
  });
});

test("createFilterSearch writes only non-default filters and preserves other params", () => {
  const result = createFilterSearch(
    {
      query: "  leclerc  ",
      team: "Ferrari",
      sort: "points-desc",
      view: STANDINGS_VIEWS.constructors,
    },
    "?layout=compact&page=2",
  );

  assert.equal(
    result,
    "?layout=compact&page=2&q=leclerc&team=Ferrari&sort=points-desc&view=constructors",
  );
});

test("createFilterSearch removes default filters without dropping unrelated params", () => {
  const result = createFilterSearch(
    defaultFilters,
    "?layout=compact&q=old&team=Ferrari&sort=team&view=constructors",
  );

  assert.equal(result, "?layout=compact");
  assert.equal(createFilterSearch(defaultFilters), "");
});

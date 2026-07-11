export const ALL_TEAMS = "全部车队";
export const DEFAULT_SORT = "position";
export const STANDINGS_VIEWS = Object.freeze({
  drivers: "drivers",
  constructors: "constructors",
});
export const DEFAULT_VIEW = STANDINGS_VIEWS.drivers;

export const SORT_OPTIONS = [
  { value: "position", label: "官方排名" },
  { value: "points-desc", label: "积分从高到低" },
  { value: "points-asc", label: "积分从低到高" },
  { value: "name", label: "车手姓名" },
  { value: "team", label: "车队名称" },
];

const MAX_QUERY_LENGTH = 80;
const VALID_SORTS = new Set(SORT_OPTIONS.map(({ value }) => value));
const VALID_VIEWS = new Set(Object.values(STANDINGS_VIEWS));
const TEXT_COLLATOR = new Intl.Collator("en", { sensitivity: "base" });

function normalizeQuery(query) {
  return String(query ?? "").trim().slice(0, MAX_QUERY_LENGTH);
}

function normalizeSort(sort) {
  return VALID_SORTS.has(sort) ? sort : DEFAULT_SORT;
}

export function normalizeStandingsView(view) {
  return VALID_VIEWS.has(view) ? view : DEFAULT_VIEW;
}

export function getTeams(drivers) {
  return [ALL_TEAMS, ...new Set(drivers.map(({ team }) => team))];
}

export function readFiltersFromSearch(search, teams) {
  const params = new URLSearchParams(search);
  const requestedTeam = params.get("team");
  const requestedSort = params.get("sort");
  const requestedView = params.get("view");

  return {
    query: normalizeQuery(params.get("q")),
    team: requestedTeam && teams.includes(requestedTeam) ? requestedTeam : ALL_TEAMS,
    sort: normalizeSort(requestedSort),
    view: normalizeStandingsView(requestedView),
  };
}

export function createFilterSearch(filters, currentSearch = "") {
  const params = new URLSearchParams(currentSearch);
  const query = normalizeQuery(filters.query);
  const team = filters.team ?? ALL_TEAMS;
  const sort = normalizeSort(filters.sort);
  const view = normalizeStandingsView(filters.view);

  if (query) {
    params.set("q", query);
  } else {
    params.delete("q");
  }

  if (team && team !== ALL_TEAMS) {
    params.set("team", team);
  } else {
    params.delete("team");
  }

  if (sort !== DEFAULT_SORT) {
    params.set("sort", sort);
  } else {
    params.delete("sort");
  }

  if (view !== DEFAULT_VIEW) {
    params.set("view", view);
  } else {
    params.delete("view");
  }

  const search = params.toString();
  return search ? `?${search}` : "";
}

export function filterAndSortDrivers(drivers, filters) {
  const query = normalizeQuery(filters.query).toLocaleLowerCase("en");
  const team = filters.team ?? ALL_TEAMS;
  const sort = normalizeSort(filters.sort);

  return drivers
    .filter((driver) => {
      const matchesQuery = driver.name.toLocaleLowerCase("en").includes(query);
      const matchesTeam = team === ALL_TEAMS || driver.team === team;

      return matchesQuery && matchesTeam;
    })
    .map((driver, index) => ({ driver, index }))
    .sort((left, right) => {
      let comparison = 0;

      if (sort === "points-desc") {
        comparison = right.driver.points - left.driver.points;
      } else if (sort === "points-asc") {
        comparison = left.driver.points - right.driver.points;
      } else if (sort === "name") {
        comparison = TEXT_COLLATOR.compare(left.driver.name, right.driver.name);
      } else if (sort === "team") {
        comparison = TEXT_COLLATOR.compare(left.driver.team, right.driver.team);
      }

      return (
        comparison
        || left.driver.position - right.driver.position
        || left.index - right.index
      );
    })
    .map(({ driver }) => driver);
}

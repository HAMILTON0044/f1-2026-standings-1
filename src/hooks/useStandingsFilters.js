import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ALL_TEAMS,
  DEFAULT_SORT,
  DEFAULT_VIEW,
  SORT_OPTIONS,
  STANDINGS_VIEWS,
  createFilterSearch,
  filterAndSortDrivers,
  getTeams,
  normalizeStandingsView,
  readFiltersFromSearch,
} from "../utils/standingsSelectors.js";

const DEFAULT_FILTERS = Object.freeze({
  query: "",
  team: ALL_TEAMS,
  sort: DEFAULT_SORT,
  view: DEFAULT_VIEW,
});

function getDefaultFilters() {
  return { ...DEFAULT_FILTERS };
}

function safelyReadFilters(search, teams) {
  try {
    return readFiltersFromSearch(search, teams);
  } catch {
    return getDefaultFilters();
  }
}

function getInitialFilters(teams) {
  if (typeof window === "undefined") {
    return getDefaultFilters();
  }

  try {
    return safelyReadFilters(window.location.search, teams);
  } catch {
    return getDefaultFilters();
  }
}

function resolveNextValue(nextValue, currentValue) {
  return typeof nextValue === "function" ? nextValue(currentValue) : nextValue;
}

export function useStandingsFilters(drivers) {
  const teams = useMemo(() => getTeams(drivers), [drivers]);
  const [filters, setFilters] = useState(() => getInitialFilters(teams));

  const {
    query,
    team: selectedTeam,
    sort: sortBy,
    view: standingsView,
  } = filters;

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    function handlePopState() {
      try {
        setFilters(safelyReadFilters(window.location.search, teams));
      } catch {
        setFilters(getDefaultFilters());
      }
    }

    try {
      window.addEventListener("popstate", handlePopState);
    } catch {
      return undefined;
    }

    return () => {
      try {
        window.removeEventListener("popstate", handlePopState);
      } catch {
        // The listener disappears with the browsing context if cleanup is unavailable.
      }
    };
  }, [teams]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const nextSearch = createFilterSearch(filters, window.location.search);
      const nextUrl = `${window.location.pathname}${nextSearch}${window.location.hash}`;
      const currentUrl =
        `${window.location.pathname}${window.location.search}${window.location.hash}`;

      if (nextUrl !== currentUrl) {
        window.history.replaceState(window.history.state, "", nextUrl);
      }
    } catch {
      // Filtering remains functional when the History API is unavailable.
    }
  }, [filters]);

  const filteredDrivers = useMemo(
    () => filterAndSortDrivers(drivers, filters),
    [drivers, filters],
  );

  const setQuery = useCallback((nextQuery) => {
    setFilters((currentFilters) => {
      const resolvedQuery = resolveNextValue(nextQuery, currentFilters.query);

      if (resolvedQuery === currentFilters.query) {
        return currentFilters;
      }

      return { ...currentFilters, query: resolvedQuery };
    });
  }, []);

  const setSelectedTeam = useCallback((nextTeam) => {
    setFilters((currentFilters) => {
      const resolvedTeam = resolveNextValue(nextTeam, currentFilters.team);

      if (resolvedTeam === currentFilters.team) {
        return currentFilters;
      }

      return { ...currentFilters, team: resolvedTeam };
    });
  }, []);

  const setSortBy = useCallback((nextSort) => {
    setFilters((currentFilters) => {
      const resolvedSort = resolveNextValue(nextSort, currentFilters.sort);

      if (resolvedSort === currentFilters.sort) {
        return currentFilters;
      }

      return { ...currentFilters, sort: resolvedSort };
    });
  }, []);

  const setStandingsView = useCallback((nextView) => {
    setFilters((currentFilters) => {
      const resolvedView = normalizeStandingsView(
        resolveNextValue(nextView, currentFilters.view),
      );

      if (resolvedView === currentFilters.view) {
        return currentFilters;
      }

      return { ...currentFilters, view: resolvedView };
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters((currentFilters) => {
      if (
        currentFilters.query === DEFAULT_FILTERS.query
        && currentFilters.team === DEFAULT_FILTERS.team
        && currentFilters.sort === DEFAULT_FILTERS.sort
      ) {
        return currentFilters;
      }

      return {
        ...getDefaultFilters(),
        view: currentFilters.view,
      };
    });
  }, []);

  const totalCount = drivers.length;
  const resultCount = filteredDrivers.length;
  const hasActiveFilters = Boolean(query.trim())
    || selectedTeam !== ALL_TEAMS
    || sortBy !== DEFAULT_SORT;

  return {
    teams,
    filteredDrivers,
    query,
    selectedTeam,
    sortBy,
    standingsView,
    standingsViews: STANDINGS_VIEWS,
    sortOptions: SORT_OPTIONS,
    totalCount,
    resultCount,
    hasActiveFilters,
    setQuery,
    setSelectedTeam,
    setSortBy,
    setStandingsView,
    resetFilters,
  };
}

import { useEffect, useRef, useState } from "react";
import "./App.css";
import { driverStandings, standingsMeta } from "./data/driverStandings.js";
import { racePodiums, racePodiumsMeta } from "./data/racePodiums.js";
import { AppHeader } from "./components/AppHeader.jsx";
import { ConstructorStandings } from "./components/ConstructorStandings.jsx";
import { DashboardLayout } from "./components/DashboardLayout.jsx";
import { EmptyState } from "./components/EmptyState.jsx";
import { MobileStandingsCards } from "./components/MobileStandingsCards.jsx";
import { Podium } from "./components/Podium.jsx";
import { RaceTimeline } from "./components/RaceTimeline.jsx";
import { StandingsTable } from "./components/StandingsTable.jsx";
import { StandingsToolbar } from "./components/StandingsToolbar.jsx";
import { StandingsViewSwitch } from "./components/StandingsViewSwitch.jsx";
import { SummaryCards } from "./components/SummaryCards.jsx";
import { useStandingsFilters } from "./hooks/useStandingsFilters.js";
import { buildConstructorStandings } from "./utils/constructorStandings.js";

const THEME_STORAGE_KEY = "f1-2026-standings-theme";
const STANDINGS_PANEL_ID = "standings-panel";
const leader = driverStandings[0];
const podiumDrivers = driverStandings.slice(0, 3);
const constructorStandings = buildConstructorStandings(driverStandings);

function getInitialTheme() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return "light";
  }

  const documentTheme = document.documentElement.dataset.theme;

  if (documentTheme === "light" || documentTheme === "dark") {
    return documentTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const toolbarTitleRef = useRef(null);
  const {
    filteredDrivers,
    hasActiveFilters,
    query,
    resetFilters,
    resultCount,
    selectedTeam,
    setQuery,
    setSelectedTeam,
    setSortBy,
    setStandingsView,
    sortBy,
    sortOptions,
    standingsView,
    standingsViews,
    teams,
    totalCount,
  } = useStandingsFilters(driverStandings);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  function resetFiltersAndRestoreFocus() {
    resetFilters();
    window.requestAnimationFrame(() => toolbarTitleRef.current?.focus());
  }

  const driverStandingsContent = resultCount === 0 ? (
    <EmptyState onAction={resetFiltersAndRestoreFocus} />
  ) : (
    <div className="standings-views">
      <StandingsTable drivers={filteredDrivers} leaderPoints={leader.points} />
      <MobileStandingsCards drivers={filteredDrivers} leaderPoints={leader.points} />
    </div>
  );

  const isDriverView = standingsView === standingsViews.drivers;
  const standingsContent = isDriverView ? (
    driverStandingsContent
  ) : (
    <ConstructorStandings standings={constructorStandings} />
  );

  return (
    <main className="app-shell">
      <AppHeader
        leader={leader}
        meta={standingsMeta}
        onThemeToggle={toggleTheme}
        theme={theme}
        totalDrivers={driverStandings.length}
        totalTeams={constructorStandings.length}
      />

      <DashboardLayout
        controls={
          <div className="standings-controls-stack">
            <StandingsViewSwitch
              onChange={setStandingsView}
              panelId={STANDINGS_PANEL_ID}
              value={standingsView}
            />
            {isDriverView ? (
              <StandingsToolbar
                hasActiveFilters={hasActiveFilters}
                headingRef={toolbarTitleRef}
                onQueryChange={setQuery}
                onReset={resetFiltersAndRestoreFocus}
                onSortChange={setSortBy}
                onTeamChange={setSelectedTeam}
                query={query}
                resultCount={resultCount}
                selectedTeam={selectedTeam}
                sortBy={sortBy}
                sortOptions={sortOptions}
                teams={teams}
                totalCount={totalCount}
              />
            ) : null}
          </div>
        }
        podium={<Podium drivers={podiumDrivers} />}
        sidebar={<RaceTimeline meta={racePodiumsMeta} races={racePodiums} />}
        standings={
          <div className="standings-panel" id={STANDINGS_PANEL_ID}>
            {standingsContent}
          </div>
        }
        summary={<SummaryCards drivers={driverStandings} />}
      />
    </main>
  );
}

export default App;

import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { driverStandings, standingsMeta } from "./data/driverStandings.js";
import { racePodiums, racePodiumsMeta } from "./data/racePodiums.js";
import { AppHeader } from "./components/AppHeader.jsx";
import { DashboardLayout } from "./components/DashboardLayout.jsx";
import { FilterBar } from "./components/FilterBar.jsx";
import { Podium } from "./components/Podium.jsx";
import { RacePodiums } from "./components/RacePodiums.jsx";
import { StandingsTable } from "./components/StandingsTable.jsx";
import { SummaryCards } from "./components/SummaryCards.jsx";

const ALL_TEAMS = "全部车队";
const THEME_STORAGE_KEY = "f1-2026-standings-theme";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function App() {
  const [selectedTeam, setSelectedTeam] = useState(ALL_TEAMS);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const teams = useMemo(() => {
    return [ALL_TEAMS, ...new Set(driverStandings.map((driver) => driver.team))];
  }, []);

  const visibleDrivers = useMemo(() => {
    if (selectedTeam === ALL_TEAMS) {
      return driverStandings;
    }

    return driverStandings.filter((driver) => driver.team === selectedTeam);
  }, [selectedTeam]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <main className="app-shell">
      <AppHeader
        leader={driverStandings[0]}
        meta={standingsMeta}
        onThemeToggle={toggleTheme}
        theme={theme}
        totalDrivers={driverStandings.length}
      />

      <DashboardLayout sidebar={<RacePodiums meta={racePodiumsMeta} races={racePodiums} />}>
        <SummaryCards drivers={driverStandings} />
        <Podium drivers={driverStandings.slice(0, 3)} />
        <FilterBar
          count={visibleDrivers.length}
          onTeamChange={setSelectedTeam}
          selectedTeam={selectedTeam}
          teams={teams}
        />
        <StandingsTable drivers={visibleDrivers} leaderPoints={driverStandings[0].points} />
      </DashboardLayout>
    </main>
  );
}

export default App;

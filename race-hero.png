import { useMemo, useState } from "react";
import "./App.css";
import { driverStandings, standingsMeta } from "./data/driverStandings.js";
import { AppHeader } from "./components/AppHeader.jsx";
import { FilterBar } from "./components/FilterBar.jsx";
import { Podium } from "./components/Podium.jsx";
import { StandingsTable } from "./components/StandingsTable.jsx";
import { SummaryCards } from "./components/SummaryCards.jsx";

const ALL_TEAMS = "全部车队";

function App() {
  const [selectedTeam, setSelectedTeam] = useState(ALL_TEAMS);

  const teams = useMemo(() => {
    return [ALL_TEAMS, ...new Set(driverStandings.map((driver) => driver.team))];
  }, []);

  const visibleDrivers = useMemo(() => {
    if (selectedTeam === ALL_TEAMS) {
      return driverStandings;
    }

    return driverStandings.filter((driver) => driver.team === selectedTeam);
  }, [selectedTeam]);

  return (
    <main className="app-shell">
      <AppHeader
        leader={driverStandings[0]}
        meta={standingsMeta}
        totalDrivers={driverStandings.length}
      />

      <section className="dashboard" aria-label="F1 2026 车手积分榜">
        <SummaryCards drivers={driverStandings} />
        <Podium drivers={driverStandings.slice(0, 3)} />
        <FilterBar
          count={visibleDrivers.length}
          onTeamChange={setSelectedTeam}
          selectedTeam={selectedTeam}
          teams={teams}
        />
        <StandingsTable drivers={visibleDrivers} leaderPoints={driverStandings[0].points} />
      </section>
    </main>
  );
}

export default App;

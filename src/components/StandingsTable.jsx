import { teamColors } from "../data/driverStandings.js";

export function StandingsTable({ drivers, leaderPoints }) {
  return (
    <section className="table-panel" aria-label="完整积分表">
      <div className="table-scroll">
        <table>
          <caption className="sr-only">2026 赛季车手积分排名</caption>
          <thead>
            <tr>
              <th scope="col">排名</th>
              <th scope="col">车手</th>
              <th scope="col">车队</th>
              <th scope="col">积分</th>
              <th scope="col">距榜首</th>

            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => {
              const gap = leaderPoints - driver.points;
              const progress = leaderPoints === 0 ? 0 : (driver.points / leaderPoints) * 100;

              return (
                <tr key={driver.name}>
                  <td className="position-cell">P{driver.position}</td>
                  <td>
                    <div className="driver-name">{driver.name}</div>
                    <div className="points-bar" aria-hidden="true">
                      <span
                        style={{
                          backgroundColor: teamColors[driver.team],
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <span
                      className="team-dot"
                      style={{ backgroundColor: teamColors[driver.team] }}
                      aria-hidden="true"
                    />
                    {driver.team}
                  </td>
                  <td className="points-cell">{driver.points}</td>
                  <td>{gap === 0 ? "领跑" : `-${gap}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

import { teamColors } from "../data/driverStandings.js";

export function Podium({ drivers }) {
  return (
    <section className="podium" aria-label="前三名车手">
      {drivers.map((driver) => (
        <article className="podium-card" key={driver.name}>
          <div
            className="team-strip"
            style={{ backgroundColor: teamColors[driver.team] }}
            aria-hidden="true"
          />
          <span className="rank">P{driver.position}</span>
          <h2>{driver.name}</h2>
          <p>{driver.team}</p>
          <strong>{driver.points} 分</strong>
        </article>
      ))}
    </section>
  );
}

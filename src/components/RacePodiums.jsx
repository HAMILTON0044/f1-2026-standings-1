import { teamColors } from "../data/driverStandings.js";

const positionLabels = {
  1: "冠军",
  2: "亚军",
  3: "季军",
};

function getMedalClass(position) {
  if (position === 1) return "medal medal--gold";
  if (position === 2) return "medal medal--silver";
  return "medal medal--bronze";
}

export function RacePodiums({ meta, races }) {
  return (
    <section className="race-podiums" aria-labelledby="race-podiums-title">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Race Podiums</p>
          <h2 id="race-podiums-title">领奖台</h2>
        </div>
        <p>
          截止 {meta.untilRound}，已完成 {races.length} 站
        </p>
      </div>

      <div className="race-podiums__grid">
        {races.map((race) => (
          <article className="race-card" key={race.round}>
            <div className="race-card__header">
              <span>R{race.round}</span>
              <div>
                <h3>{race.name}</h3>
                <p>
                  {race.circuit} · {race.date}
                </p>
              </div>
            </div>

            <ol className="race-card__list" aria-label={`${race.name} 前三名`}>
              {race.podium.map((result) => (
                <li key={result.position}>
                  <span className={getMedalClass(result.position)}>
                    {positionLabels[result.position]}
                  </span>
                  <div>
                    <strong>{result.driver}</strong>
                    <small>
                      <span
                        className="team-dot"
                        style={{ backgroundColor: teamColors[result.team] }}
                        aria-hidden="true"
                      />
                      {result.team}
                    </small>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}

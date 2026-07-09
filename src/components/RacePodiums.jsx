import { useState } from "react";
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

function RacePodiumCard({ isPinned, onTogglePinned, race }) {
  const [isHovered, setIsHovered] = useState(false);
  const isOpen = isPinned || isHovered;
  const detailsId = `race-podium-${race.round}`;

  return (
    <article
      className={isOpen ? "race-card race-card--open" : "race-card"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className="race-card__header"
        type="button"
        aria-controls={detailsId}
        aria-expanded={isOpen}
        onClick={onTogglePinned}
      >
        <span>R{race.round}</span>
        <strong>{race.name}</strong>
      </button>

      <div className="race-card__details" id={detailsId}>
        <p className="race-card__meta">
          {race.circuit} · {race.date}
        </p>

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
      </div>
    </article>
  );
}

export function RacePodiums({ meta, races }) {
  const [pinnedRounds, setPinnedRounds] = useState([]);

  function togglePinnedRound(round) {
    setPinnedRounds((currentRounds) => {
      if (currentRounds.includes(round)) {
        return currentRounds.filter((currentRound) => currentRound !== round);
      }

      return [...currentRounds, round];
    });
  }

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
          <RacePodiumCard
            isPinned={pinnedRounds.includes(race.round)}
            key={race.round}
            onTogglePinned={() => togglePinnedRound(race.round)}
            race={race}
          />
        ))}
      </div>
    </section>
  );
}

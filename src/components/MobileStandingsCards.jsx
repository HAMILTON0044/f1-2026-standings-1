import { useId } from "react";
import { teamColors } from "../data/driverStandings.js";

function getDriverMetrics(points, leaderPoints) {
  const safePoints = Number.isFinite(points) ? Math.max(0, points) : 0;
  const gap = Math.max(0, leaderPoints - safePoints);
  const progress =
    leaderPoints === 0
      ? 0
      : Math.min(100, Math.max(0, (safePoints / leaderPoints) * 100));

  return {
    gap,
    progress,
    progressValue: Math.round(progress),
  };
}

export function MobileStandingsCards({ drivers = [], leaderPoints = 0 }) {
  const headingId = useId();
  const standings = Array.isArray(drivers) ? drivers : [];
  const safeLeaderPoints = Number.isFinite(leaderPoints)
    ? Math.max(0, leaderPoints)
    : 0;

  return (
    <section className="mobile-standings" aria-labelledby={headingId}>
      <h2 className="mobile-standings__heading" id={headingId}>
        车手积分榜
      </h2>

      {standings.length === 0 ? (
        <p className="mobile-standings__empty" role="status">
          暂无符合条件的车手
        </p>
      ) : (
        <ol className="mobile-standings__list">
          {standings.map((driver) => {
            const { gap, progress, progressValue } = getDriverMetrics(
              driver.points,
              safeLeaderPoints,
            );
            const gapText = gap === 0 ? "领跑" : `-${gap}`;
            const accessibleGapText =
              gap === 0 ? "当前领跑" : `落后榜首 ${gap} 分`;
            const teamColor = teamColors[driver.team] ?? "#6b7280";

            return (
              <li
                className="mobile-standings__item"
                key={`${driver.position}-${driver.name}`}
                value={driver.position}
              >
                <article className="mobile-standings__card">
                  <header className="mobile-standings__header">
                    <span
                      className="mobile-standings__position"
                      aria-label={`第 ${driver.position} 名`}
                    >
                      P{driver.position}
                    </span>

                    <div className="mobile-standings__identity">
                      <h3 className="mobile-standings__name">{driver.name}</h3>
                      <p className="mobile-standings__team">
                        <span
                          className="mobile-standings__team-dot"
                          style={{ backgroundColor: teamColor }}
                          aria-hidden="true"
                        />
                        {driver.team}
                      </p>
                    </div>
                  </header>

                  <dl className="mobile-standings__stats">
                    <div className="mobile-standings__stat">
                      <dt className="mobile-standings__stat-label">积分</dt>
                      <dd className="mobile-standings__stat-value">
                        {driver.points}
                      </dd>
                    </div>
                    <div className="mobile-standings__stat">
                      <dt className="mobile-standings__stat-label">距榜首</dt>
                      <dd
                        className="mobile-standings__stat-value"
                        aria-label={accessibleGapText}
                      >
                        {gapText}
                      </dd>
                    </div>
                  </dl>

                  <div className="mobile-standings__progress-copy">
                    <span className="mobile-standings__progress-label">
                      榜首积分比例
                    </span>
                    <span className="mobile-standings__progress-value">
                      {progressValue}%
                    </span>
                  </div>
                  <div
                    className="mobile-standings__progress-track"
                    role="progressbar"
                    aria-label={`${driver.name} 的榜首积分比例`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={progressValue}
                    aria-valuetext={`${progressValue}%`}
                  >
                    <span
                      className="mobile-standings__progress-fill"
                      style={{
                        backgroundColor: teamColor,
                        width: `${progress}%`,
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

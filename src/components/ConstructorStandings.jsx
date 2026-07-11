import { useId } from "react";
import { teamColors } from "../data/driverStandings.js";

const FALLBACK_TEAM_COLOR = "#6b7280";

function getSafePoints(points) {
  return Number.isFinite(points) ? Math.max(0, points) : 0;
}

function getConstructorMetrics(points, leaderPoints) {
  const safePoints = getSafePoints(points);
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

export function ConstructorStandings({ standings = [] }) {
  const sectionId = useId();
  const titleId = `${sectionId}-title`;
  const descriptionId = `${sectionId}-description`;
  const constructors = Array.isArray(standings) ? standings : [];
  const leaderPoints = constructors.reduce(
    (highestPoints, constructor) =>
      Math.max(highestPoints, getSafePoints(constructor.points)),
    0,
  );

  return (
    <section
      className="constructor-standings"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <header className="constructor-standings__header">
        <h2 className="constructor-standings__title" id={titleId}>
          车队积分榜
        </h2>
        <p
          className="constructor-standings__description"
          id={descriptionId}
        >
          根据当前车手所属车队与积分简单汇总，并非官方车队积分榜，
          也不适用官方同分规则。
        </p>
      </header>

      {constructors.length === 0 ? (
        <p className="constructor-standings__empty" role="status">
          暂无车队积分数据
        </p>
      ) : (
        <ol className="constructor-standings__list">
          {constructors.map((constructor) => {
            const points = getSafePoints(constructor.points);
            const drivers = Array.isArray(constructor.drivers)
              ? constructor.drivers
              : [];
            const teamColor =
              teamColors[constructor.team] ?? FALLBACK_TEAM_COLOR;
            const { gap, progress, progressValue } = getConstructorMetrics(
              points,
              leaderPoints,
            );
            const gapText = gap === 0 ? "领跑" : `-${gap}`;
            const accessibleGapText =
              gap === 0 ? "当前领跑" : `落后榜首 ${gap} 分`;

            return (
              <li
                className="constructor-standings__item"
                key={`${constructor.position}-${constructor.team}`}
                value={constructor.position}
              >
                <article className="constructor-standings__card">
                  <header className="constructor-standings__card-header">
                    <span
                      className="constructor-standings__position"
                      aria-label={`第 ${constructor.position} 位`}
                    >
                      P{constructor.position}
                    </span>

                    <div className="constructor-standings__identity">
                      <span
                        className="constructor-standings__team-color"
                        style={{ backgroundColor: teamColor }}
                        aria-hidden="true"
                      />
                      <h3 className="constructor-standings__team">
                        {constructor.team}
                      </h3>
                    </div>
                  </header>

                  <div className="constructor-standings__drivers">
                    <h4 className="constructor-standings__drivers-title">
                      车手积分
                    </h4>
                    {drivers.length === 0 ? (
                      <p className="constructor-standings__drivers-empty">
                        暂无车手积分数据
                      </p>
                    ) : (
                      <ul className="constructor-standings__driver-list">
                        {drivers.map((driver) => (
                          <li
                            className="constructor-standings__driver"
                            key={driver.name}
                          >
                            <span className="constructor-standings__driver-name">
                              {driver.name}
                            </span>
                            <span className="constructor-standings__driver-points">
                              {getSafePoints(driver.points)} 分
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <dl className="constructor-standings__stats">
                    <div className="constructor-standings__stat">
                      <dt className="constructor-standings__stat-label">
                        总积分
                      </dt>
                      <dd className="constructor-standings__stat-value">
                        {points}
                      </dd>
                    </div>
                    <div className="constructor-standings__stat">
                      <dt className="constructor-standings__stat-label">
                        距榜首
                      </dt>
                      <dd
                        className="constructor-standings__stat-value"
                        aria-label={accessibleGapText}
                      >
                        {gapText}
                      </dd>
                    </div>
                  </dl>

                  <div className="constructor-standings__progress-copy">
                    <span className="constructor-standings__progress-label">
                      榜首积分比例
                    </span>
                    <span className="constructor-standings__progress-value">
                      {progressValue}%
                    </span>
                  </div>
                  <div
                    className="constructor-standings__progress-track"
                    role="progressbar"
                    aria-label={`${constructor.team} 的榜首积分比例`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={progressValue}
                    aria-valuetext={`${progressValue}%，${accessibleGapText}`}
                  >
                    <span
                      className="constructor-standings__progress-fill"
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

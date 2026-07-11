import { useEffect, useId, useRef, useState } from "react";
import { teamColors } from "../data/driverStandings.js";

const positionLabels = {
  1: "冠军",
  2: "亚军",
  3: "季军",
};

const medalModifiers = {
  1: "gold",
  2: "silver",
  3: "bronze",
};

export function RaceTimeline({ meta, races }) {
  const timelineId = useId();
  const selectorRef = useRef(null);
  const selectedButtonRef = useRef(null);
  const [selectedRound, setSelectedRound] = useState(
    () => races.at(-1)?.round ?? null,
  );
  const selectedRace =
    races.find((race) => race.round === selectedRound) ?? races.at(-1);
  const titleId = `${timelineId}-title`;
  const panelId = `${timelineId}-panel`;
  const panelTitleId = `${timelineId}-panel-title`;

  useEffect(() => {
    const selector = selectorRef.current;
    const selectedButton = selectedButtonRef.current;

    if (!selector || !selectedButton) {
      return;
    }

    const buttonStart = selectedButton.offsetLeft;
    const buttonEnd = buttonStart + selectedButton.offsetWidth;
    const visibleStart = selector.scrollLeft;
    const visibleEnd = visibleStart + selector.clientWidth;

    if (buttonStart < visibleStart) {
      selector.scrollLeft = buttonStart;
    } else if (buttonEnd > visibleEnd) {
      selector.scrollLeft = buttonEnd - selector.clientWidth;
    }
  }, [selectedRace?.round]);

  if (!selectedRace) {
    return (
      <section className="race-timeline race-timeline--empty" aria-labelledby={titleId}>
        <div className="race-timeline__header">
          <div>
            <p className="race-timeline__kicker">Race Timeline</p>
            <h2 className="race-timeline__title" id={titleId}>
              赛季时间线
            </h2>
          </div>
        </div>
        <p className="race-timeline__empty-message">暂无已完成的赛站。</p>
      </section>
    );
  }

  const podium = (selectedRace.podium ?? []).slice(0, 3);

  return (
    <section className="race-timeline" aria-labelledby={titleId}>
      <header className="race-timeline__header">
        <div>
          <p className="race-timeline__kicker">Race Timeline</p>
          <h2 className="race-timeline__title" id={titleId}>
            赛季时间线
          </h2>
        </div>
        <p className="race-timeline__summary">
          截止 {meta?.untilRound ?? selectedRace.name}，已完成 {races.length} 站
        </p>
      </header>

      <nav
        className="race-timeline__selector"
        aria-label="选择已完成的赛站"
        ref={selectorRef}
      >
        <ol className="race-timeline__list">
          {races.map((race) => {
            const isSelected = race.round === selectedRace.round;

            return (
              <li className="race-timeline__item" key={race.round}>
                <button
                  className={`race-timeline__button${
                    isSelected ? " race-timeline__button--active" : ""
                  }`}
                  type="button"
                  aria-controls={panelId}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedRound(race.round)}
                  ref={isSelected ? selectedButtonRef : undefined}
                >
                  <span className="race-timeline__round">R{race.round}</span>
                  <span className="race-timeline__race-name">{race.name}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <article
        className="race-timeline__panel"
        id={panelId}
        role="region"
        aria-labelledby={panelTitleId}
        aria-live="polite"
      >
        <header className="race-timeline__panel-header">
          <p className="race-timeline__panel-round">ROUND {selectedRace.round}</p>
          <h3 className="race-timeline__panel-title" id={panelTitleId}>
            {selectedRace.name}
          </h3>
        </header>

        <dl className="race-timeline__meta">
          <div className="race-timeline__meta-item">
            <dt>赛道</dt>
            <dd>{selectedRace.circuit}</dd>
          </div>
          <div className="race-timeline__meta-item">
            <dt>日期</dt>
            <dd>{selectedRace.date}</dd>
          </div>
        </dl>

        <ol className="race-timeline__podium" aria-label={`${selectedRace.name} 前三名`}>
          {podium.map((result) => {
            const medalModifier = medalModifiers[result.position] ?? "bronze";

            return (
              <li className="race-timeline__podium-item" key={result.position}>
                <span
                  className={`race-timeline__medal race-timeline__medal--${medalModifier}`}
                >
                  {positionLabels[result.position] ?? `P${result.position}`}
                </span>
                <div className="race-timeline__driver">
                  <strong className="race-timeline__driver-name">{result.driver}</strong>
                  <span className="race-timeline__team">
                    <span
                      className="race-timeline__team-dot"
                      style={{ backgroundColor: teamColors[result.team] }}
                      aria-hidden="true"
                    />
                    {result.team}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </article>
    </section>
  );
}

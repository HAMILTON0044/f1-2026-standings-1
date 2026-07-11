import { useId } from "react";
import { STANDINGS_VIEWS } from "../utils/standingsSelectors.js";

const VIEW_OPTIONS = [
  { value: STANDINGS_VIEWS.drivers, label: "车手积分榜" },
  { value: STANDINGS_VIEWS.constructors, label: "车队积分榜" },
];

export function StandingsViewSwitch({ value, onChange, panelId }) {
  const titleId = useId();

  return (
    <section
      className="standings-view-switch"
      aria-labelledby={titleId}
    >
      <h2 className="standings-view-switch__title" id={titleId}>
        积分榜视图
      </h2>
      <div className="standings-view-switch__controls">
        {VIEW_OPTIONS.map((option) => {
          const isActive = value === option.value;
          const className = [
            "standings-view-switch__button",
            isActive ? "standings-view-switch__button--active" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              className={className}
              type="button"
              value={option.value}
              aria-pressed={isActive}
              aria-controls={panelId}
              key={option.value}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

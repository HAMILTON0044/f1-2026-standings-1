import { useId } from "react";

export function StandingsToolbar({
  query,
  selectedTeam,
  sortBy,
  sortOptions,
  teams,
  resultCount,
  totalCount,
  hasActiveFilters,
  headingRef,
  onQueryChange,
  onTeamChange,
  onSortChange,
  onReset,
}) {
  const toolbarId = useId();
  const titleId = `${toolbarId}-title`;
  const descriptionId = `${toolbarId}-description`;
  const queryId = `${toolbarId}-query`;
  const teamId = `${toolbarId}-team`;
  const sortId = `${toolbarId}-sort`;

  return (
    <section
      className="standings-toolbar"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className="standings-toolbar__header">
        <div className="standings-toolbar__heading">
          <h2
            className="standings-toolbar__title"
            id={titleId}
            ref={headingRef}
            tabIndex={-1}
          >
            筛选与排序
          </h2>
          <p className="standings-toolbar__description" id={descriptionId}>
            搜索车手、选择车队，并调整积分榜排序。
          </p>
        </div>

        <p
          className="standings-toolbar__status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          显示 {resultCount} / {totalCount} 位车手
        </p>
      </div>

      <div className="standings-toolbar__controls">
        <div className="standings-toolbar__field standings-toolbar__field--search">
          <label className="standings-toolbar__label" htmlFor={queryId}>
            搜索车手
          </label>
          <input
            className="standings-toolbar__input"
            id={queryId}
            type="search"
            value={query}
            maxLength={80}
            placeholder="输入车手姓名"
            autoComplete="off"
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </div>

        <div className="standings-toolbar__field">
          <label className="standings-toolbar__label" htmlFor={teamId}>
            车队
          </label>
          <select
            className="standings-toolbar__select"
            id={teamId}
            value={selectedTeam}
            onChange={(event) => onTeamChange(event.target.value)}
          >
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        <div className="standings-toolbar__field">
          <label className="standings-toolbar__label" htmlFor={sortId}>
            排序方式
          </label>
          <select
            className="standings-toolbar__select"
            id={sortId}
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="standings-toolbar__reset"
          type="button"
          disabled={!hasActiveFilters}
          onClick={onReset}
        >
          重置筛选
        </button>
      </div>
    </section>
  );
}

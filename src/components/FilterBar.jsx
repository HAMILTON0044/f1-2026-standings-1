export function FilterBar({ count, onTeamChange, selectedTeam, teams }) {
  return (
    <section className="filter-bar" aria-label="车队筛选">
      <label htmlFor="team-filter">按车队查看</label>
      <select
        id="team-filter"
        onChange={(event) => onTeamChange(event.target.value)}
        value={selectedTeam}
      >
        {teams.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>
      <span>{count} 位车手</span>
    </section>
  );
}

export function DashboardLayout({ controls, podium, sidebar, standings, summary }) {
  return (
    <section className="dashboard" aria-label="F1 2026 赛季积分榜">
      <div className="dashboard__summary">{summary}</div>
      <div className="dashboard__podium">{podium}</div>
      <aside className="dashboard__sidebar" aria-label="赛季时间线">
        {sidebar}
      </aside>
      <div className="dashboard__controls">{controls}</div>
      <div className="dashboard__standings">{standings}</div>
    </section>
  );
}

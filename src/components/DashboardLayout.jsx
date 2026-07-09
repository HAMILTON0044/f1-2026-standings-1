export function DashboardLayout({ children, sidebar }) {
  return (
    <section className="dashboard" aria-label="F1 2026 车手积分榜">
      <div className="dashboard__main">{children}</div>
      <aside className="dashboard__sidebar" aria-label="赛站领奖台">
        {sidebar}
      </aside>
    </section>
  );
}

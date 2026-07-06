export function SummaryCards({ drivers }) {
  const leader = drivers[0];
  const second = drivers[1];
  const totalPoints = drivers.reduce((sum, driver) => sum + driver.points, 0);
  const teamCount = new Set(drivers.map((driver) => driver.team)).size;

  return (
    <section className="summary-grid" aria-label="赛季概要">
      <article className="summary-item">
        <span>榜首优势</span>
        <strong>{leader.points - second.points} 分</strong>
      </article>
      <article className="summary-item">
        <span>总积分</span>
        <strong>{totalPoints} 分</strong>
      </article>
      <article className="summary-item">
        <span>车队数量</span>
        <strong>{teamCount} 支</strong>
      </article>
    </section>
  );
}

import heroImage from "../assets/race-hero.png";

export function AppHeader({ leader, meta, totalDrivers }) {
  return (
    <header className="hero">
      <img className="hero__image" src={heroImage} alt="夜间赛道上的开放轮赛车" />
      <div className="hero__overlay" />

      <div className="hero__content">
        <h2 className="eyebrow">Formula 1 {meta.season}</h2>
        <h1>车手积分榜</h1>
        <p className="hero__subtitle">
          截止 {meta.afterRound} 后，共 {totalDrivers} 位车手进入榜单。
        </p>

        <div className="hero__facts" aria-label="榜单摘要">
          <div>
            <span>当前领跑</span>
            <strong>{leader.name}</strong>
          </div>
          <div>
            <span>领跑积分</span>
            <strong>{leader.points}</strong>

          </div>
          <div>
            <span>更新时间</span>
            <strong>{meta.updatedAt}</strong>
          </div>
        </div>
      </div>
    </header>
  );
}

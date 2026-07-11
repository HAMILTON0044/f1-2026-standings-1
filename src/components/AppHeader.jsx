import heroImage from "../assets/race-hero.png";
import { RadioClipButton } from "./RadioClipButton.jsx";
import { ThemeToggle } from "./ThemeToggle.jsx";

export function AppHeader({
  leader,
  meta,
  onThemeToggle,
  theme,
  totalDrivers,
  totalTeams,
}) {
  return (
    <header className="hero">
      <img className="hero__image" src={heroImage} alt="" aria-hidden="true" />
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="eyebrow">Formula 1 {meta.season}</p>
        <div className="hero__title-row">
          <h1 className="hero__title">赛季积分中心</h1>
          <div className="hero__actions">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <RadioClipButton />
          </div>
        </div>
        <p className="hero__subtitle">
          截止 {meta.afterRound} 后，汇总 {totalDrivers} 位车手与 {totalTeams} 支车队。
        </p>
        <p className="hero__source">
          积分榜来源：{" "}
          <a href={meta.sourceUrl} rel="noreferrer" target="_blank">
            {meta.sourceName}
          </a>
        </p>

        <div className="hero__facts" aria-label="榜单摘要">
          <div>
            <span>车手榜领跑</span>
            <strong>{leader.name}</strong>
          </div>
          <div>
            <span>车手榜积分</span>
            <strong>{leader.points}</strong>
          </div>
          <div>
            <span>更新时间</span>
            <strong>
              <time dateTime={meta.updatedAt}>{meta.updatedAt}</time>
            </strong>
          </div>
        </div>
      </div>
    </header>
  );
}

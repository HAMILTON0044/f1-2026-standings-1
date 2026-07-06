.app-shell {
  min-height: 100vh;
}

.hero {
  position: relative;
  min-height: 360px;
  overflow: hidden;
  background: #121418;
}

.hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(12, 14, 18, 0.9), rgba(12, 14, 18, 0.55) 50%, rgba(12, 14, 18, 0.2)),
    linear-gradient(0deg, rgba(244, 246, 248, 1), rgba(244, 246, 248, 0) 22%);
}

.hero__content {
  position: relative;
  z-index: 1;
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 72px 0 96px;
  color: #ffffff;
}

.eyebrow {
  margin: 0 0 10px;
  color: #ffd166;
  font-size: 0.92rem;
  font-weight: 700;
}

.hero h1 {
  max-width: 660px;
  margin: 0;
  font-size: clamp(2.5rem, 7vw, 5.8rem);
  line-height: 0.95;
}

.hero__subtitle {
  max-width: 540px;
  margin: 18px 0 0;
  color: #eef2f5;
  font-size: 1.08rem;
  line-height: 1.8;
}

.hero__facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 160px));
  gap: 12px;
  max-width: 560px;
  margin-top: 28px;
}

.hero__facts div,
.summary-item,
.podium-card,
.filter-bar,
.table-panel {
  border: 1px solid rgba(17, 24, 39, 0.1);
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 12px 30px rgba(17, 24, 39, 0.08);
}

.hero__facts div {
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(8px);
}

.hero__facts span,
.summary-item span {
  display: block;
  color: #626b78;
  font-size: 0.86rem;
}

.hero__facts span {
  color: #d6dde6;
}

.hero__facts strong,
.summary-item strong {
  display: block;
  margin-top: 5px;
  font-size: 1.1rem;
}

.dashboard {
  width: min(1120px, calc(100% - 32px));
  margin: -48px auto 64px;
  position: relative;
  z-index: 2;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.summary-item {
  padding: 18px;
}

.podium {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 14px;
}

.podium-card {
  position: relative;
  min-height: 174px;
  padding: 22px;
  overflow: hidden;
}

.team-strip {
  position: absolute;
  inset: 0 auto 0 0;
  width: 6px;
}

.rank {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 30px;
  border-radius: 999px;
  background: #171a1f;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 800;
}

.podium-card h2 {
  margin: 18px 0 6px;
  color: #171a1f;
  font-size: clamp(1.2rem, 2.4vw, 1.7rem);
  line-height: 1.1;
}

.podium-card p {
  margin: 0;
  color: #626b78;
}

.podium-card strong {
  display: block;
  margin-top: 18px;
  color: #e10600;
  font-size: 1.2rem;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  padding: 14px 16px;
}

.filter-bar label {
  font-weight: 700;
}

.filter-bar select {
  min-width: 180px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #cfd6df;
  border-radius: 8px;
  background: #ffffff;
  color: #171a1f;
}

.filter-bar span {
  margin-left: auto;
  color: #626b78;
}

.table-panel {
  margin-top: 14px;
  overflow: hidden;
}

.table-scroll {
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
}

th,
td {
  padding: 16px;
  border-bottom: 1px solid #e5e9ef;
  text-align: left;
  vertical-align: middle;
}

th {
  background: #f8fafc;
  color: #626b78;
  font-size: 0.82rem;
  text-transform: uppercase;
}

tbody tr:hover {
  background: #fff7f6;
}

tbody tr:last-child td {
  border-bottom: 0;
}

.position-cell,
.points-cell {
  font-weight: 800;
}

.driver-name {
  font-weight: 800;
}

.points-bar {
  width: min(260px, 100%);
  height: 7px;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: #e8edf2;
}

.points-bar span {
  display: block;
  height: 100%;
  min-width: 2px;
  border-radius: inherit;
}

.team-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 8px;
  border-radius: 50%;
  vertical-align: middle;
}

@media (max-width: 760px) {
  .hero {
    min-height: 500px;
  }

  .hero__overlay {
    background:
      linear-gradient(0deg, rgba(12, 14, 18, 0.92), rgba(12, 14, 18, 0.42)),
      linear-gradient(0deg, rgba(244, 246, 248, 1), rgba(244, 246, 248, 0) 16%);
  }

  .hero__content {
    padding-top: 56px;
  }

  .hero__facts,
  .summary-grid,
  .podium {
    grid-template-columns: 1fr;
  }

  .filter-bar {
    align-items: stretch;
    flex-direction: column;
  }

  .filter-bar span {
    margin-left: 0;
  }
}

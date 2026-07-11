# F1 2026 赛季积分中心

这是一个适合继续扩展的 React + Vite 数据项目，用来展示 2026 赛季英国大奖赛 Silverstone 后的车手积分，以及由当前车手数据派生的车队积分汇总。

## 本地运行

```bash
npm install
npm run dev
```

`npm run dev` 已经配置为 `vite --host 0.0.0.0`，同一局域网内的设备可以通过终端里显示的 Network 地址访问。

运行纯逻辑测试和生产构建：

```bash
npm test
npm run build
```

## 项目结构

```text
src/
  assets/                          横幅图片和车队无线电音频
  components/AppHeader.jsx         Hero、主题与音频入口
  components/DashboardLayout.jsx   响应式页面区域编排
  components/RaceTimeline.jsx      可选择的赛季时间线
  components/StandingsViewSwitch.jsx 车手榜与车队榜切换
  components/StandingsToolbar.jsx  搜索、车队筛选和排序工具栏
  components/StandingsTable.jsx    桌面端积分表
  components/MobileStandingsCards.jsx 移动端积分卡片
  components/ConstructorStandings.jsx 派生车队积分卡片
  components/EmptyState.jsx        可复用的无结果状态
  hooks/useStandingsFilters.js     筛选状态和 URL 同步
  utils/standingsSelectors.js      纯筛选、排序和 URL 函数
  utils/standingsSelectors.test.js 纯逻辑测试
  utils/constructorStandings.js    车队积分派生函数
  utils/constructorStandings.test.js 车队积分测试
  data/driverStandings.js          积分数据和车队颜色
  data/racePodiums.js              已完成赛站与领奖台数据
  App.jsx                          页面状态和组件组装入口
  App.css                          主题、布局和组件样式
  main.jsx                         React 挂载入口
```

页面支持车手榜与车队榜切换，以及按车手搜索、车队筛选和五种排序方式。非默认条件会同步到 URL 的 `q`、`team`、`sort`、`view` 参数，刷新或分享链接后可以恢复当前视图。

桌面端使用完整积分表，在 760px 及以下自动切换为车手卡片；1040px 及以下会把赛季时间线移动到筛选和积分榜之前。

后续如果要添加“车队积分”“车手对比”“逐站积分趋势”或“单车手详情”，建议继续在 `src/components` 里增加独立组件，在 `src/data` 里维护对应的数据文件和派生函数。

## 数据说明

积分数据来自 The Guardian 在 2026-07-05 英国大奖赛后的实时报道。报道中的车手积分表把 Isack Hadjar 写作 Racing Bulls，但同篇车队积分和 2026 车手阵容资料显示他应计入 Red Bull，因此本项目数据按 Red Bull 归类。

车队积分由当前车手的积分和所属车队简单汇总，仅用于此项目的数据探索。它无法反映车队处罚、车手季中转队造成的历史归属或官方同分比较规则，因此不应视为官方车队积分榜。

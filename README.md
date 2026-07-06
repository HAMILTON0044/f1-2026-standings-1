# F1 2026 车手积分榜

这是一个适合初学者继续扩展的 React + Vite 小项目，用来展示 2026 赛季英国大奖赛 Silverstone 后的 22 位 F1 车手积分。

## 本地运行

```bash
npm install
npm run dev
```

`npm run dev` 已经配置为 `vite --host 0.0.0.0`，同一局域网内的设备可以通过终端里显示的 Network 地址访问。

## 项目结构

```text
src/
  assets/                 横幅图片
  components/             页面组件
  data/driverStandings.js 积分数据和车队颜色
  App.jsx                 页面组装入口
  App.css                 页面样式
  main.jsx                React 挂载入口
```

后续如果要添加“车队积分”“赛历”“单车手详情”，建议继续在 `src/components` 里加组件，在 `src/data` 里加独立数据文件。

## 数据说明

积分数据来自 The Guardian 在 2026-07-05 英国大奖赛后的实时报道。报道中的车手积分表把 Isack Hadjar 写作 Racing Bulls，但同篇车队积分和 2026 车手阵容资料显示他应计入 Red Bull，因此本项目数据按 Red Bull 归类。

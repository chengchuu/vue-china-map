# Vue 3 + Pinia + Axios + ECharts 中国地图

基于 Vue 3、Vite、Pinia、Axios 和 ECharts 的动态中国地图示例。项目已从 Vue 2 迁移到 Vue 3，并适配 Node.js 22.x。如需在旧版本 Node.js 14.x 中运行或者使用 Vue 2 + Vuex + Axios，可以使用 [master](https://github.com/chengchuu/vue-china-map/tree/master) 分支。

![中国地图闪闪发光](./images/china-map.png)

## 安装与运行

```bash
npm install
npm run dev
```

开发服务器默认运行在 <http://127.0.0.1:8080/>。

## 常用命令

```bash
npm run dev      # 启动 Vite 开发服务器
npm run build    # 构建生产版本到 dist/
npm run preview  # 本地预览生产构建
npm run lint     # 运行 ESLint
npm test         # 当前等同于 npm run lint
```

## 项目结构

```plain
├── index.html
├── vite.config.js
├── public/
│   └── static/data/heatChinaRealData.json
└── src/
    ├── main.js
    ├── App.vue
    ├── components/ChinaMap.vue
    ├── stores/chinaMap.js
    └── styles.css
```

## 迁移说明

- Vue 2 `new Vue()` 已替换为 Vue 3 `createApp()`。
- Vuex 已替换为 Pinia。
- Webpack 3、Babel 6、Karma、PhantomJS、Nightwatch、Selenium 和 ChromeDriver 已移除。
- ECharts 已升级到模块化 ECharts 6，并通过 `china-map-geojson` 注册中国地图。
- 静态数据放在 `public/static/data/`，运行时通过 `/static/data/heatChinaRealData.json` 访问。

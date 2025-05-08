# Lovers Bill

一个基于 React 和 TypeScript 开发的现代 Web 应用，用于情侣之间的账单管理和追踪。

## 功能特点

- 使用 Material-UI 构建的现代化界面
- 响应式设计，支持各种设备
- 交互式图表和数据可视化
- 使用 TypeScript 确保类型安全
- 使用 React Router 实现客户端路由

## 技术栈

- React 18
- TypeScript
- Material-UI (MUI)
- React Router DOM
- Recharts 数据可视化
- date-fns 日期处理

## 开始使用

### 环境要求

- Node.js（推荐使用最新的 LTS 版本）
- npm 或 yarn 包管理器

### 安装步骤

1. 克隆仓库：
```bash
git clone [仓库地址]
cd lovers-bill
```

2. 安装依赖：
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器：
```bash
npm start
# 或
yarn start
```

应用将在 `http://localhost:3000` 运行。

### 构建生产版本

创建生产环境构建：

```bash
npm run build
# 或
yarn build
```

### 部署

项目已配置支持 Vercel 部署。部署命令：

```bash
npm run deploy
# 或
yarn deploy
```

## 项目结构
lovers-bill/
├── public/ # 静态文件
├── src/ # 源代码
├── build/ # 生产环境构建输出
├── node_modules/ # 依赖包
└── package.json # 项目配置文件


## 可用脚本

- `npm start` - 启动开发服务器
- `npm build` - 构建生产版本
- `npm test` - 运行测试
- `npm run deploy` - 部署到 Vercel

## 浏览器支持

应用支持所有现代浏览器，并针对以下浏览器进行了优化：
- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）

## 许可证

MIT License
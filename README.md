# 职映（ZhiYing）

> AI 职业自我认知与岗位匹配平台
> 让每段经历，都精准匹配理想岗位

## 核心理念

职映不是套模板的简历生成器，而是帮你"先照清自己，再匹配岗位"的完整链路：
知识库搭建 → 个人画像 → 岗位匹配 → 简历生成 → 学习路径

## 核心特性

- ✅ **真实匹配**：简历内容来自知识库真实经历，不编造
- ✅ **可追溯**：每句话都能对应知识库条目
- ✅ **诚实差距披露**：待补强项隔离，不冒充精通
- ✅ **三分组匹配**：直接匹配/可强调关联/待补强，非笼统打分
- ✅ **9 维度岗位评价**：客观评估岗位前景

## 技术栈

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui + Framer Motion
- Supabase (Postgres + Auth + Storage)
- Vercel 部署

## 快速开始

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入 Supabase + OpenAI keys

# 启动开发
npm run dev

# 构建
npm run build && npm start
```

## 项目文档

详细文档位于 `docs/` 目录：

| 文档 | 说明 |
|---|---|
| `01_PRD.md` | 产品需求文档 |
| `02_Design_System.md` | 设计系统 |
| `03_Page_UX_Spec.md` | 页面级 UI/UX 设计稿 |
| `04_Visual_Asset_Strategy.md` | 视觉素材策略 |
| `05_Architecture_API.md` | 技术架构与 API 文档 |
| `06_Dev_Pipeline_Plan.md` | 开发计划书 |
| `07_Self_Review.md` | 自检与优化报告 |
| `08_Deliverables/` | 交付文档（开发/运维/用户/测试） |

## 项目结构

```
zhiying-web/
├── src/
│   ├── app/              # Next.js App Router 页面
│   ├── components/       # React 组件
│   ├── lib/              # 工具库（Supabase、utils）
│   ├── types/            # TypeScript 类型
│   └── middleware.ts     # Auth 中间件
├── docs/                 # 项目文档
└── public/               # 静态资源
```

## 价值观

- **真实性原则**：简历内容必须来自知识库真实经历
- **诚实差距披露原则**：待补强项不冒充精通
- **流程不可跳过原则**：必须先建知识库再生成简历
- **可追溯性原则**：简历每句话能在知识库找到依据
- **不鼓励求职欺诈原则**：帮你挖掘真实价值，绝不协助造假

## License

MIT

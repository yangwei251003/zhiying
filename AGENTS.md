<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 全息与磨砂玻璃设计规范 (Glassmorphism & Background Hierarchy)

当全站采用全局动态流光渐变（如 `mesh-bg`、`aurora-bg`）作为网页背景时，为保证背景的高级感和流动效果不被遮挡，必须遵循以下容器设计原则：

1. **避免硬编码不透明背景**：除非是特殊的遮光区域，否则全局性 UI 容器（如 `Card`、`Navbar` 等）不应硬编码使用完全不透明的 `bg-white` 或 `bg-neutral-50`。
2. **默认使用半透明玻璃态**：
   - 卡片（Card）默认背景推荐采用 `bg-white/70` 或 `bg-white/60`，搭配 `backdrop-blur-md` 或 `backdrop-blur-lg`，使底部流光透射。
   - 边框应使用低不透明度边框（如 `border-neutral-200/50` 或 `border-white/20`）以增强融合感。
   - 应加入微弱的 Hover 提亮及阴影平滑过渡（例如 `transition-all duration-300 hover:bg-white/80 hover:shadow-md`）。
3. **导航栏（Navbar）保持通透**：浅色导航栏滚动时推荐采用 `bg-white/75 backdrop-blur-lg border-b border-neutral-200/50`，保证轻盈质感。
4. **确保排版与字色清晰**：半透明背景上必须使用高对比度的深色文本（如 `text-neutral-900`/`text-neutral-800`），辅以合适的行高和字重，确保无障碍可读性。

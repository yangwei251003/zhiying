"use client";

import { motion } from "framer-motion";
import { BarChart3, Shield } from "lucide-react";
import { FeatureIcon } from "@/components/motion/feature-icon";

const modules = [
  {
    title: "知识库搭建",
    desc: "9 模块结构化收集 · 多份管理",
    featureIcon: "knowledge" as const,
    category: "core",
  },
  {
    title: "个人画像",
    desc: "深度剖析能力 · 核心竞争力",
    featureIcon: "match" as const,
    category: "core",
  },
  {
    title: "岗位匹配分析",
    desc: "三分组精准 · 9 维度岗位评价",
    featureIcon: "match" as const,
    category: "core",
  },
  {
    title: "简历生成",
    desc: "每句可追溯 · Word/PDF 导出",
    featureIcon: "resume" as const,
    category: "core",
  },
  {
    title: "学习路径",
    desc: "待补强速成 · 7 天+30 天计划",
    featureIcon: "interview" as const,
    category: "aux",
  },
  {
    title: "岗位推荐",
    desc: "反向推荐方向 · 适合度说明",
    featureIcon: "jd" as const,
    category: "aux",
  },
  {
    title: "市场调研",
    desc: "前景薪资 · AI 替代性",
    icon: BarChart3,
    category: "aux",
  },
  {
    title: "避坑建议",
    desc: "从业者真话 · 框架式避坑清单",
    icon: Shield,
    category: "aux",
  },
];

export function ModuleOverviewSection() {
  return (
    <section id="features" className="py-16 md:py-20 bg-white">
      <div className="container-page mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
            一个完整的职业认知与匹配系统
          </h2>
          <p className="text-neutral-500 max-w-lg mx-auto">
            核心链路 4 模块 + 辅助增强 4 模块，覆盖从自我认知到岗位落地的完整链路
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {modules.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className={`relative rounded-xl border bg-white p-5 transition-all duration-200 hover:shadow-md ${
                  m.category === "core"
                    ? "border-primary-200 border-t-4 border-t-primary-500"
                    : "border-accent-200 border-t-4 border-t-accent-500"
                }`}
              >
              <div className="mb-3">
                {m.featureIcon ? (
                  <FeatureIcon name={m.featureIcon} size={52} />
                ) : (
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      m.category === "core"
                        ? "bg-primary-50 text-primary-600"
                        : "bg-accent-50 text-accent-600"
                    }`}
                  >
                    <m.icon className="h-6 w-6" />
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1 text-neutral-900">{m.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">{m.desc}</p>
              {m.category === "core" && (
                <span className="absolute top-3 right-3 text-[10px] font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                  核心
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

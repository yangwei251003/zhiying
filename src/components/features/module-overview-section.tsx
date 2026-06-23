"use client";

import { motion } from "framer-motion";
import { BarChart3, Shield } from "lucide-react";
import { FeatureIcon } from "@/components/motion/feature-icon";
import { cn } from "@/lib/utils";

const easing = [0.16, 1, 0.3, 1];

const modules = [
  {
    title: "知识库搭建",
    desc: "通过 9 个维度的专业结构化对话，逐步挖掘并凝练您的职业全景，生成多份个性化管理文档。",
    featureIcon: "knowledge" as const,
    category: "core",
  },
  {
    title: "个人画像",
    desc: "深度剖析能力要素与核心竞争力，生成可视化的职业技能图谱与分析报告。",
    featureIcon: "match" as const,
    category: "core",
  },
  {
    title: "岗位匹配分析",
    desc: "将简历与目标 JD 多维度深度碰撞，输出三分组精准匹配与 9 维度综合岗位评价。",
    featureIcon: "match" as const,
    category: "core",
  },
  {
    title: "简历生成",
    desc: "每句话均可在职业知识库中寻得真实来源，支持一键双语切换，Word/PDF 高清格式导出。",
    featureIcon: "resume" as const,
    category: "core",
  },
  {
    title: "学习路径规划",
    desc: "根据匹配分析中的薄弱环节，个性化定制 7 天快速提升与 30 天深度成长计划。",
    featureIcon: "interview" as const,
    category: "aux",
  },
  {
    title: "智能岗位推荐",
    desc: "基于个人画像，反向推荐适合的细分职业方向，并附带详尽的匹配度理由说明。",
    featureIcon: "jd" as const,
    category: "aux",
  },
  {
    title: "市场前沿调研",
    desc: "聚合行业薪资走势、岗位前景，并对该岗位在未来的 AI 替代性进行前瞻评估。",
    icon: BarChart3,
    category: "aux",
  },
  {
    title: "从业者避坑指南",
    desc: "由行业资深专家与大语言模型共同整理的避坑清单。为您揭示行业底层的潜规则与防坑指南，让您的职业发展少走弯路，步步稳健。",
    icon: Shield,
    category: "aux",
  },
];

export function ModuleOverviewSection() {
  return (
    <section id="features" className="relative py-28 md:py-36 bg-neutral-950 text-white overflow-hidden">
      {/* Awwwards Grain Noise Overlay */}
      <div className="noise-overlay" />

      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* Decorative Neon Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-page mx-auto px-4 md:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easing }}
          className="text-center mb-20 space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-primary-500/30 bg-primary-500/10 text-primary-300">
            完整功能体系
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400 leading-tight">
            一个完整的职业认知与匹配系统
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto leading-relaxed">
            核心链路 4 模块 + 智能增强 4 模块，全面覆盖从自我剖析到简历落地的全套服务。
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((m, i) => {
            // Determine Bento Grid spanning sizes
            let gridSpan = "md:col-span-1";
            if (i === 0) {
              gridSpan = "md:col-span-2"; // 1st is large
            } else if (i === 3) {
              gridSpan = "md:col-span-2"; // 4th is large
            } else if (i === 7) {
              gridSpan = "md:col-span-3"; // 8th is full-width at the bottom
            }

            const isCore = m.category === "core";
            const Icon = "icon" in m ? m.icon : null;

            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: easing, delay: i * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={cn(
                  "relative rounded-3xl border p-8 bg-neutral-900/40 backdrop-blur-md cursor-default group transition-all duration-300 overflow-hidden",
                  isCore 
                    ? "border-neutral-800 hover:border-primary-500/30" 
                    : "border-neutral-850 hover:border-accent-500/30",
                  gridSpan
                )}
              >
                {/* Glowing Background Glow on Hover */}
                <div 
                  className={cn(
                    "absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                    isCore ? "bg-primary-500/10" : "bg-accent-500/10"
                  )}
                />

                {/* Content Container */}
                <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px] md:min-h-[180px]">
                  <div>
                    {/* Header: Icon & Category */}
                    <div className="flex justify-between items-start mb-6">
                      {"featureIcon" in m && m.featureIcon ? (
                        <div className="p-1 rounded-2xl bg-neutral-800/40 border border-neutral-700/30 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
                          <FeatureIcon name={m.featureIcon} size={48} />
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105",
                            isCore
                              ? "bg-primary-950/30 border-primary-900/30 text-primary-400 group-hover:border-primary-500/40"
                              : "bg-accent-950/30 border-accent-900/30 text-accent-400 group-hover:border-accent-500/40"
                          )}
                        >
                          {Icon && <Icon className="h-6 w-6" />}
                        </div>
                      )}
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider",
                          isCore
                            ? "text-primary-300 bg-primary-950/50 border border-primary-800/30"
                            : "text-accent-300 bg-accent-950/50 border border-accent-800/30"
                        )}
                      >
                        {isCore ? "核心" : "智能"}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-white mb-2 tracking-tight group-hover:text-primary-300 transition-colors duration-200">
                      {m.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed max-w-xl">
                      {m.desc}
                    </p>
                  </div>

                  {/* Footnote Indicator */}
                  <div className="mt-6 pt-4 border-t border-neutral-800/50 flex items-center justify-between text-[11px] text-neutral-500">
                    <span>{isCore ? "核心链路构建" : "AI 智能增效工具"}</span>
                    <span 
                      className={cn(
                        "font-semibold flex items-center gap-1 transition-all duration-300 opacity-80 group-hover:opacity-100",
                        isCore ? "text-primary-400 group-hover:translate-x-1" : "text-accent-400 group-hover:translate-x-1"
                      )}
                    >
                      {i === 7 ? "开启稳健职场路 →" : "探索模块 →"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

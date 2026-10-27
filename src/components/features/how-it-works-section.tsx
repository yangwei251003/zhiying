"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FeatureIcon } from "@/components/motion/feature-icon";
import { ArrowRight } from "lucide-react";

const easing = [0.16, 1, 0.3, 1];

const steps = [
  {
    step: 1,
    title: "知识库搭建",
    desc: "9 模块结构化收集，多份管理",
    featureIcon: "knowledge" as const,
  },
  {
    step: 2,
    title: "个人画像",
    desc: "深度剖析能力与短板",
    featureIcon: "match" as const,
  },
  {
    step: 3,
    title: "岗位匹配",
    desc: "三分组精准匹配",
    featureIcon: "match" as const,
  },
  {
    step: 4,
    title: "简历生成",
    desc: "每句话可追溯，不编造",
    featureIcon: "resume" as const,
  },
  {
    step: 5,
    title: "学习路径",
    desc: "待补强项 → 速成计划",
    featureIcon: "interview" as const,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 md:py-32 dark-section-bg">
      <div className="container-page mx-auto px-4 md:px-8">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easing }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">
            核心流程
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white leading-[1.2] mb-4">
            五步完成从<span className="gradient-text-warm">「迷茫」</span>到「简历在手」
          </h2>
          <p className="text-neutral-400 text-lg max-w-lg mx-auto">
            每一步都有 AI 引导，不会让你迷失方向
          </p>
        </motion.div>

        {/* 步骤流程 */}
        <div className="relative max-w-5xl mx-auto">
          {/* 连接线（桌面端） */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-[1px] hidden lg:block overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: easing, delay: 0.4 }}
              className="h-full bg-gradient-to-r from-primary-500/20 via-primary-400/60 to-accent-500/40 origin-left"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: easing, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="flex flex-col items-center text-center glass-card-dark rounded-2xl p-6 cursor-default group transition-all duration-300 hover:border-primary-500/30 hover:bg-white/10"
              >
                {/* 步骤编号 */}
                <span className="text-4xl font-black gradient-text-warm opacity-25 mb-1 leading-none group-hover:opacity-50 transition-opacity">
                  {s.step}
                </span>
                <FeatureIcon name={s.featureIcon} size={52} className="mb-3" />
                <h3 className="font-bold text-sm mb-1 text-white">{s.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5, ease: easing }}
          className="text-center mt-14"
        >
          <Link
            href="/start"
            className="inline-flex items-center gap-2 text-primary-300 font-semibold hover:text-white transition-colors duration-200 group"
          >
            开始第一步：建立知识库
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FeatureIcon } from "@/components/motion/feature-icon";

const steps = [
  {
    step: 1,
    title: "知识库搭建",
    desc: "9 模块结构化收集，多份管理",
    featureIcon: "knowledge" as const,
    color: "border-primary-300 bg-primary-50",
  },
  {
    step: 2,
    title: "个人画像",
    desc: "深度剖析能力与短板",
    featureIcon: "match" as const,
    color: "border-primary-300 bg-primary-50",
  },
  {
    step: 3,
    title: "岗位匹配",
    desc: "三分组精准匹配",
    featureIcon: "match" as const,
    color: "border-primary-300 bg-primary-50",
  },
  {
    step: 4,
    title: "简历生成",
    desc: "每句话可追溯，不编造",
    featureIcon: "resume" as const,
    color: "border-accent-300 bg-accent-50",
  },
  {
    step: 5,
    title: "学习路径",
    desc: "待补强项 → 速成计划",
    featureIcon: "interview" as const,
    color: "border-neutral-300 bg-neutral-100",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-20 bg-neutral-50">
      <div className="container-page mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
            五步完成从"迷茫"到"简历在手"
          </h2>
          <p className="text-neutral-500">每一步都有 AI 引导，不会让你迷失方向</p>
        </motion.div>

        {/* 步骤流程 */}
        <div className="relative max-w-4xl mx-auto">
          {/* 连接线 */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-200 to-transparent -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 1, scale: 1, y: 0 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
                className={`flex flex-col items-center text-center rounded-xl border p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 ${s.color}`}
              >
                <span className="text-xs font-bold text-primary-600 mb-2">
                  步骤{s.step}
                </span>
                <FeatureIcon name={s.featureIcon} size={56} className="mb-3" />
                <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-neutral-500">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/start"
            className="inline-flex items-center gap-2 text-primary-600 font-medium hover:underline"
          >
            开始第一步：建立知识库 →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

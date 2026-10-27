"use client";

import { motion } from "framer-motion";
import {
  Search,
  ClipboardList,
  FileText,
  Target,
  ArrowRight,
} from "lucide-react";

const easing = [0.16, 1, 0.3, 1];

const painPoints = [
  {
    icon: Search,
    question: "不够了解自己？",
    solution: "职映帮你照清自己",
    color: "hover:border-blue-400/50",
    iconBg: "bg-blue-500/10 text-blue-500",
    accent: "bg-blue-400",
  },
  {
    icon: ClipboardList,
    question: "没整理信息习惯？",
    solution: "职映帮你系统化",
    color: "hover:border-emerald-400/50",
    iconBg: "bg-emerald-500/10 text-emerald-500",
    accent: "bg-emerald-400",
  },
  {
    icon: FileText,
    question: "简历不会写？",
    solution: "职映帮你写出每句有依据的",
    color: "hover:border-violet-400/50",
    iconBg: "bg-violet-500/10 text-violet-500",
    accent: "bg-violet-400",
  },
  {
    icon: Target,
    question: "不懂岗位真实工作？",
    solution: "职映帮你看清岗位真面目",
    color: "hover:border-amber-400/50",
    iconBg: "bg-amber-500/10 text-amber-500",
    accent: "bg-amber-400",
  },
];

export function PainPointsSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-page mx-auto px-4 md:px-8">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easing }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">
            你是否也在经历
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-neutral-900 leading-[1.2] mb-4">
            求职路上的四大困境
          </h2>
          <p className="text-neutral-500 text-lg max-w-lg mx-auto leading-relaxed">
            每个大学生求职时都会遇到的困惑，职映一一为你解决
          </p>
        </motion.div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.question}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: easing, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`group relative rounded-2xl border border-neutral-100 bg-white p-7 cursor-default transition-all duration-300 shadow-sm hover:shadow-lg ${point.color}`}
            >
              {/* 顶部色条 */}
              <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full ${point.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${point.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                <point.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-base mb-2 text-neutral-900">{point.question}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{point.solution}</p>
            </motion.div>
          ))}
        </div>

        {/* 底部引导 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12 text-neutral-400 text-sm"
        >
          职映的核心链路，就是为解决这些问题而设计
          <ArrowRight className="inline h-4 w-4 mx-1" />
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Search,
  ClipboardList,
  FileText,
  Target,
  ArrowRight,
} from "lucide-react";

const painPoints = [
  {
    icon: Search,
    question: "不够了解自己？",
    solution: "职映帮你照清自己",
    color: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    icon: ClipboardList,
    question: "没整理信息习惯？",
    solution: "职映帮你系统化",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
  },
  {
    icon: FileText,
    question: "简历不会写？",
    solution: "职映帮你写出每句有依据的",
    color: "bg-violet-50 border-violet-200 text-violet-700",
  },
  {
    icon: Target,
    question: "不懂岗位真实工作？",
    solution: "职映帮你看清岗位真面目",
    color: "bg-amber-50 border-amber-200 text-amber-700",
  },
];

export function PainPointsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-page mx-auto px-4 md:px-8">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
            这些问题，你是否也在经历？
          </h2>
          <p className="text-neutral-500 max-w-lg mx-auto">
            每个大学生求职时都会遇到的困惑，职映一一为你解决
          </p>
        </motion.div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
              className={`group rounded-xl border p-6 bg-white cursor-default transition-all duration-200 ${point.color}`}
            >
              <point.icon className="h-10 w-10 mb-4" />
              <h3 className="font-semibold text-sm mb-2">{point.question}</h3>
              <p className="text-xs opacity-80">{point.solution}</p>
            </motion.div>
          ))}
        </div>

        {/* 底部引导 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 text-neutral-400"
        >
          职映的核心链路，就是为解决这些问题而设计
          <ArrowRight className="inline h-4 w-4 mx-1" />
        </motion.p>
      </div>
    </section>
  );
}

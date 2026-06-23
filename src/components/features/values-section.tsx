"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, FileSearch, Eye } from "lucide-react";

const easing = [0.16, 1, 0.3, 1];

const values = [
  {
    icon: ShieldCheck,
    title: "真实性",
    desc: "简历内容来自知识库真实经历，只做专业表达，不编造。",
    color: "text-emerald-400",
  },
  {
    icon: FileSearch,
    title: "可追溯性",
    desc: "简历每句话都能对应知识库条目，找不到依据即删除。",
    color: "text-blue-400",
  },
  {
    icon: Eye,
    title: "诚实差距披露",
    desc: "岗位需要但你不具备的能力，诚实标注为待补强，不冒充精通。",
    color: "text-violet-400",
  },
  {
    icon: CheckCircle2,
    title: "不鼓励欺诈",
    desc: "帮你挖掘真实价值，绝不协助求职欺诈。",
    color: "text-accent-400",
  },
];

export function ValuesSection() {
  return (
    <section className="py-24 md:py-32 dark-section-bg">
      <div className="container-page mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easing }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">
            产品承诺
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white leading-[1.2] mb-4">
            我们的产品承诺
          </h2>
          <p className="text-neutral-400 text-lg max-w-lg mx-auto leading-relaxed">
            真实匹配，不编造——这套价值观贯穿职映所有功能与文案
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: easing, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-2xl glass-card-dark border border-white/10 p-7 group hover:border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 mb-5 transition-transform duration-200 group-hover:scale-110`}>
                <v.icon className={`h-6 w-6 ${v.color}`} />
              </div>
              <h3 className="font-bold text-base mb-2 text-white">{v.title}</h3>
              <p className="text-sm text-neutral-400 leading-[1.7]">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

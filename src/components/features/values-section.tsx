"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, FileSearch, Eye } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "真实性",
    desc: "简历内容来自知识库真实经历，只做专业表达，不编造。",
  },
  {
    icon: FileSearch,
    title: "可追溯性",
    desc: "简历每句话都能对应知识库条目，找不到依据即删除。",
  },
  {
    icon: Eye,
    title: "诚实差距披露",
    desc: "岗位需要但你不具备的能力，诚实标注为待补强，不冒充精通。",
  },
  {
    icon: CheckCircle2,
    title: "不鼓励欺诈",
    desc: "帮你挖掘真实价值，绝不协助求职欺诈。",
  },
];

export function ValuesSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary-800 to-primary-900 text-white">
      <div className="container-page mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">我们的产品承诺</h2>
          <p className="text-primary-200 max-w-lg mx-auto">
            真实匹配，不编造——这套价值观贯穿职映所有功能与文案
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-5"
            >
              <v.icon className="h-8 w-8 text-accent-400 mb-3" />
              <h3 className="font-semibold text-base mb-2">{v.title}</h3>
              <p className="text-sm text-primary-200 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

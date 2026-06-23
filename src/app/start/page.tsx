"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeatureIcon } from "@/components/motion/feature-icon";
import { XiaojingWaveMascot } from "@/components/motion/xiaojing-mascot";
import { DataParticles } from "@/components/motion/data-particles";
import {
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

export default function StartPage() {
  const router = useRouter();

  const options = [
    {
      title: "导入旧简历",
      desc: "已有 docx/pdf 简历？上传后自动提取，只追问缺失部分",
      featureIcon: "resume" as const,
      badge: "快速",
      onClick: () => router.push("/start/import"),
      variant: "secondary" as const,
    },
    {
      title: "新建知识库",
      desc: "从零开始，按 9 模块结构化深度收集（推荐）",
      featureIcon: "knowledge" as const,
      badge: "推荐",
      onClick: () => router.push("/kb/new/collect"),
      variant: "primary" as const,
      featured: true,
    },
    {
      title: "对话式补全",
      desc: "已有部分经历？像聊天一样补全缺失信息",
      featureIcon: "interview" as const,
      badge: "灵活",
      onClick: () => router.push("/kb/new/collect?mode=chat"),
      variant: "secondary" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      <DataParticles className="absolute inset-0 opacity-25" count={20} />

      <div className="container-page mx-auto px-4 md:px-8 py-12 md:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md border border-primary-100 mb-5">
            <XiaojingWaveMascot size={72} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            开始建立你的职业知识库
          </h1>
          <p className="text-neutral-600 max-w-xl mx-auto">
            选择一种方式，AI 会引导你完成后续步骤。
            <br className="hidden md:block" />
            通常需要 8-15 分钟，但一次建立，多次复用。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto items-stretch">
          {options.map((opt, i) => (
            <motion.div
              key={opt.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={opt.featured ? "md:-mt-4 md:mb-4" : ""}
            >
              <Card
                className={`relative h-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                  opt.featured
                    ? "border-primary-400 border-2 shadow-md"
                    : "hover:border-primary-200"
                }`}
                onClick={opt.onClick}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <FeatureIcon name={opt.featureIcon} size={64} />
                    <Badge variant={opt.featured ? "primary" : "neutral"}>
                      {opt.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{opt.title}</CardTitle>
                  <CardDescription className="text-sm">{opt.desc}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center text-sm font-medium text-primary-600 group">
                    开始
                    <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>

                {opt.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent" size="sm" className="shadow-sm">
                      <Check className="h-3 w-3" />
                      适合首次使用
                    </Badge>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 底部说明 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="rounded-xl bg-primary-50/60 border border-primary-100 p-5">
            <h3 className="text-sm font-medium text-primary-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              你知道吗
            </h3>
            <p className="text-sm text-primary-800/80 leading-relaxed">
              知识库不是一次性的——它会随着你的成长持续更新。
              每次有新实习、新课程、新证书，都可以回来补充。
              你可以建立多份知识库（如"大三版"、"实习版"），
              对应不同求职阶段使用。
            </p>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-sm text-neutral-400 hover:text-primary-600 transition-colors"
            >
              ← 返回首页
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

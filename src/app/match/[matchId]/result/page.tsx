"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Link2,
  AlertTriangle,
  Target,
  ArrowRight,
  ArrowLeft,
  FileDown,
  BookOpen,
  Loader2,
} from "lucide-react";
import { XiaojingThinkingMascot } from "@/components/motion/xiaojing-mascot";

const mockResult = {
  job_title: "电力系统工程师",
  company: "国家电网 · 某省电力公司",
  direct_matches: [
    { item: "电力系统实践经验", evidence: "core_experiences[0]", strength: "high" },
    { item: "变电站检修经验", evidence: "internships_jobs[0]", strength: "high" },
    { item: "MATLAB/Simulink 仿真", evidence: "skills[3]", strength: "medium" },
    { item: "电力系统分析课程", evidence: "education[0].core_courses", strength: "medium" },
    { item: "课程设计优秀", evidence: "projects[0]", strength: "high" },
  ],
  associations: [
    {
      item: "数据分析能力",
      rephrasing_as: "数据驱动的电力系统分析方法",
      how_to_bridge: "将 MATLAB 仿真经验表述为「基于数据的电力系统建模与优化分析」",
    },
    {
      item: "文档撰写",
      rephrasing_as: "技术文档与方案撰写能力",
      how_to_bridge: "实习报告经验转化为「电力系统技术文档规范撰写」",
    },
  ],
  gaps: [
    { skill: "Python 编程", level: "基础认知", reason: "岗位明确要求 Python 数据分析" },
    { skill: "电力市场交易知识", level: "无", reason: "岗位涉及电力市场分析" },
    { skill: "团队领导经验", level: "无", reason: "岗位需要带队能力" },
  ],
  evaluation: {
    pros: "稳定性高、福利完善、技术积累扎实",
    cons: "晋升路径相对慢、创新空间有限",
    growth: "技术专家路线明确，3-5 年可成为主责",
    salary: "应届 8-12K · 3年 15-20K · 资深 25K+",
    intensity: "中等，部分岗位需倒班",
    ai_replace: "低，电力系统核心判断仍需人工",
    beginner_friendly: "高，有完整新人培训体系",
    long_term: "稳定，行业不会消失",
    risk: "技术迭代慢，需主动学习新技术",
  },
  recommendation: "强烈推荐" as const,
};

const evaluationLabels: { key: string; label: string }[] = [
  { key: "pros", label: "优点" },
  { key: "cons", label: "缺点" },
  { key: "growth", label: "成长空间" },
  { key: "salary", label: "薪资发展" },
  { key: "intensity", label: "工作强度" },
  { key: "ai_replace", label: "AI 替代性" },
  { key: "beginner_friendly", label: "新人友好度" },
  { key: "long_term", label: "长期发展" },
  { key: "risk", label: "行业风险" },
];

const recommendationColors: Record<string, any> = {
  强烈推荐: "success",
  可以尝试: "primary",
  谨慎投递: "warning",
  不建议: "danger",
};

export default function MatchResultPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = params.matchId as string;
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<typeof mockResult | null>(null);

  useEffect(() => {
    // 模拟轮询 + 拉取结果
    const timer = setTimeout(() => {
      setResult(mockResult);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [matchId]);

  if (loading || !result) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center animate-pulse">
          <XiaojingThinkingMascot size={72} />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-neutral-700">职映小镜正在分析中...</p>
          <p className="text-xs text-neutral-400 mt-1">
            解析岗位 JD → 三分组匹配 → 9 维度客观评价
          </p>
        </div>
        <Loader2 className="h-5 w-5 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 py-8">
      <div className="container-page mx-auto px-4 md:px-8 max-w-5xl space-y-6">
        {/* 顶部：岗位信息 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="p-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-neutral-400 mb-1">匹配结果</p>
                <h1 className="text-xl font-bold text-neutral-900">
                  {result.job_title}
                </h1>
                <p className="text-sm text-neutral-500">{result.company}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-neutral-400">投递建议</p>
                  <Badge variant={recommendationColors[result.recommendation]} size="lg">
                    {result.recommendation}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 三分组匹配 */}
        <div>
          <h2 className="text-base font-bold text-white mb-3 px-1">
            三分组匹配结果
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 直接匹配 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full glass-card border-primary-500/20 text-white border-beam-hover">
                <CardHeader className="pb-3 border-b border-white/5 bg-white/5">
                  <CardTitle className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle2 className="h-4 w-4 text-primary-400" />
                    直接匹配 · {result.direct_matches.length} 项
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-3">
                  {result.direct_matches.map((m, i) => (
                    <div key={i} className="text-xs">
                      <p className="text-neutral-200 font-medium">{m.item}</p>
                      <p className="text-neutral-400 mt-0.5">
                        依据：<code className="text-[10px] bg-white/5 text-neutral-300 px-1 py-0.5 rounded">{m.evidence}</code>
                      </p>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t border-white/5">
                    <Badge variant="primary" size="sm">→ 进简历正文</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 可强调关联 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full glass-card border-accent-500/20 text-white border-beam-hover">
                <CardHeader className="pb-3 border-b border-white/5 bg-white/5">
                  <CardTitle className="flex items-center gap-2 text-sm text-white">
                    <Link2 className="h-4 w-4 text-accent-400" />
                    可强调关联 · {result.associations.length} 项
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-3">
                  {result.associations.map((a, i) => (
                    <div key={i} className="text-xs">
                      <p className="text-neutral-200 font-medium">{a.item}</p>
                      <p className="text-accent-400 mt-0.5">
                        → 换角度为：<span className="font-semibold">{a.rephrasing_as}</span>
                      </p>
                      <p className="text-neutral-400 mt-1 text-[11px] leading-relaxed">
                        {a.how_to_bridge}
                      </p>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t border-white/5">
                    <Badge variant="accent" size="sm">→ 进简历正文</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 待补强 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full glass-card border-amber-500/20 text-white border-beam-hover">
                <CardHeader className="pb-3 border-b border-white/5 bg-white/5">
                  <CardTitle className="flex items-center gap-2 text-sm text-white">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    待补强项 · {result.gaps.length} 项
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-3">
                  {result.gaps.map((g, i) => (
                    <div key={i} className="text-xs">
                      <p className="text-neutral-200 font-medium">{g.skill}</p>
                      <p className="text-neutral-400 mt-0.5">
                        当前：<span className="text-amber-400">{g.level}</span>
                      </p>
                      <p className="text-neutral-400 mt-0.5 text-[11px]">{g.reason}</p>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t border-white/5">
                    <Badge variant="warning" size="sm">→ 不进简历，进学习路径</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* 9 维度岗位评价 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary-500" />
                岗位客观评价 · 9 维度
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {evaluationLabels.map((e) => (
                  <div
                    key={e.key}
                    className="rounded-lg border border-neutral-100 bg-neutral-50/50 p-3"
                  >
                    <p className="text-xs font-medium text-neutral-500 mb-1">{e.label}</p>
                    <p className="text-sm text-neutral-800 leading-relaxed">
                      {(result.evaluation as any)[e.key]}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            variant="outline"
            size="lg"
            asChild
            className="flex-1"
          >
            <Link href={`/match/new`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              匹配其他岗位
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="flex-1"
          >
            <Link href={`/resume/${matchId}/learn`}>
              <BookOpen className="mr-2 h-4 w-4" />
              查看学习路径
            </Link>
          </Button>
          <Button
            size="lg"
            className="flex-1"
            onClick={() => router.push(`/resume/${matchId}/preview`)}
          >
            <FileDown className="mr-2 h-4 w-4" />
            生成简历
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Target,
  RefreshCw,
  AlertTriangle,
  ArrowRight,
  Star,
  Briefcase,
  Award,
  TrendingUp,
} from "lucide-react";

const profile = {
  name: "张三",
  major: "电气工程及其自动化",
  grade: "大三",
  target: "电力系统 / 新能源",
  competencies: [
    {
      title: "电力系统实践经验",
      evidence: "XX变电站实习 + XX课程设计",
    },
    {
      title: "数据分析能力",
      evidence: "MATLAB/Simulink 仿真 + 课程数据分析",
    },
    {
      title: "项目落地能力",
      evidence: "省赛二等奖项目 + 课程设计优秀",
    },
  ],
  transferable: [
    "跨领域学习能力（自学 Python 完成 XX 小项目）",
    "文档撰写能力（实习报告获评优秀）",
    "数据敏感度（电力系统数据分析）",
  ],
  gaps: [
    "缺少量化数据（实习经历的具体产出指标）",
    "缺少团队协作证据（多为个人项目）",
    "证书数量偏少（仅有英语四级）",
  ],
  recommendations: ["电力系统工程师", "新能源工程师", "电气设计工程师"],
  highlights: [
    "XX变电站实习：独立完成XX检修，缩短检修时间约30%",
    "XX课程设计：搭建XX仿真模型，获评优秀",
    "XX竞赛：带队获省二等奖，负责XX模块",
  ],
};

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const kbId = params.kbId as string;

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 md:py-12">
      <div className="container-page mx-auto px-4 md:px-8 max-w-5xl space-y-6">
        {/* 顶部：用户信息卡 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="overflow-hidden glass-card border-white/5">
            <div className="bg-gradient-to-r from-primary-900/60 to-primary-800/40 p-6 text-white">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">
                    {profile.name.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-xl font-black text-white">{profile.name} 的个人职业画像</h1>
                    <p className="text-sm text-neutral-300 mt-1">
                      {profile.major} · {profile.grade} · 意向：{profile.target}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/10 hover:bg-white/10 text-white"
                    onClick={() => router.push(`/kb/${kbId}/collect`)}
                  >
                    <RefreshCw className="mr-2 h-3.5 w-3.5" />
                    更新知识库
                  </Button>
                  <Button
                    size="sm"
                    variant="accent"
                    onClick={() => router.push(`/match/new?kb=${kbId}`)}
                  >
                    <Target className="mr-2 h-3.5 w-3.5" />
                    匹配岗位
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 核心竞争力 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-white/5 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Star className="h-5 w-5 text-amber-500" />
                三大核心竞争力
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profile.competencies.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="rounded-xl border border-primary-100 bg-primary-50/40 p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <h3 className="text-sm font-semibold text-neutral-900">{c.title}</h3>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      <span className="text-neutral-400">依据：</span>
                      {c.evidence}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 双栏：可迁移能力 + 素材不足 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full glass-card border-white/5 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-white">
                  <RefreshCw className="h-4 w-4 text-primary-400" />
                  可迁移能力
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {profile.transferable.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-neutral-200">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="h-full glass-card border-amber-500/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-white">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  素材不足（待补强）
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {profile.gaps.map((g) => (
                    <li key={g} className="flex items-start gap-2 text-sm text-neutral-200">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-neutral-400 mt-3 pt-3 border-t border-white/5">
                  这些不会出现在简历正文，但会影响画像精准度
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* 推荐岗位方向 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card border-white/5 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Briefcase className="h-5 w-5 text-primary-400" />
                最适合的岗位方向
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.recommendations.map((r) => (
                  <Link
                    key={r}
                    href={`/research/${encodeURIComponent(r)}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    {r}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
              <p className="text-xs text-neutral-400 mt-3">
                基于你的画像 + 知识库反向推荐 · 点击查看岗位市场调研
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* 经历亮点 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card className="glass-card border-white/5 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="h-5 w-5 text-accent-400" />
                经历亮点
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {profile.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-200">{h}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center pt-4"
        >
          <Button
            size="lg"
            variant="primary"
            onClick={() => router.push(`/match/new?kb=${kbId}`)}
            className="px-8 btn-glow bg-primary-500 hover:bg-primary-400 text-white"
          >
            <Target className="mr-2 h-4 w-4" />
            开始匹配你的目标岗位
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

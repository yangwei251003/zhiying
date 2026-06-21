"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Rocket,
  TrendingUp,
  HelpCircle,
  Calendar,
  BookOpen,
  Target,
  ArrowLeft,
} from "lucide-react";

const learningData = {
  gaps: [
    { skill: "Python 编程", level: "基础认知", priority: "高" },
    { skill: "电力市场交易知识", level: "无", priority: "中" },
    { skill: "团队领导经验", level: "无", priority: "低" },
  ],
  plan7day: [
    {
      day: "Day 1-2",
      topic: "Python 基础语法",
      resources: [
        { title: "菜鸟教程 Python3", type: "免费" },
        { title: "廖雪峰 Python 教程", type: "免费" },
      ],
    },
    {
      day: "Day 3-4",
      topic: "电力市场交易入门",
      resources: [
        { title: "《电力市场基础》", type: "付费" },
        { title: "国家能源局公开课", type: "免费" },
      ],
    },
    {
      day: "Day 5-7",
      topic: "面试高频题练习",
      resources: [
        { title: "国家电网历年面试题", type: "免费" },
        { title: "电力系统常见技术问题", type: "免费" },
      ],
    },
  ],
  plan30day: [
    { week: "Week 1", theme: "Python 进阶", tasks: ["完成 1 个数据分析小项目", "学习 pandas/numpy 基础"], deliverable: "GitHub 项目链接" },
    { week: "Week 2-3", theme: "电力市场专题", tasks: ["阅读 2 本电力市场书籍", "梳理电力市场交易流程图"], deliverable: "学习笔记 + 思维导图" },
    { week: "Week 4", theme: "总结复盘", tasks: ["更新知识库", "整理面试作品集"], deliverable: "可展示的学习成果" },
  ],
  qa: [
    {
      q: "你没有 Python 经验，怎么胜任数据分析工作？",
      a: "诚实回应：目前已系统学习 Python 基础，并完成 XX 数据分析小项目（GitHub 链接）。同时强调 MATLAB 数据分析经验，说明数据思维是相通的。",
      difficulty: "常见",
    },
    {
      q: "你为什么选择电力系统方向？",
      a: "结合知识库中的实习经历和课程设计，说明从实践中确认了对电力系统的兴趣，并展示已积累的能力。",
      difficulty: "常见",
    },
  ],
};

const difficultyColors: Record<string, any> = {
  常见: "primary",
  刁钻: "warning",
  行为: "info",
};

export default function LearnPage() {
  const params = useParams();
  const matchId = params.matchId as string;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 py-8">
      <div className="container-page mx-auto px-4 md:px-8 max-w-4xl space-y-6">
        {/* 顶部 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-primary-500 items-center justify-center mb-3">
            <BookOpen className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">面试不足与学习路径</h1>
          <p className="text-neutral-600">
            基于匹配分析，针对你的待补强项，给出可执行的提升计划
          </p>
        </motion.div>

        {/* 待补强项 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                你的待补强项
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {learningData.gaps.map((g) => (
                  <div
                    key={g.skill}
                    className="flex items-center justify-between p-3 rounded-lg bg-amber-50/50 border border-amber-100"
                  >
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{g.skill}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        当前水平：<span className="text-amber-700">{g.level}</span>
                      </p>
                    </div>
                    <Badge variant={g.priority === "高" ? "danger" : g.priority === "中" ? "warning" : "neutral"}>
                      优先级 {g.priority}
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="text-xs text-neutral-400 mt-3 pt-3 border-t border-neutral-100">
                这些不会出现在简历正文，但面试可能被问到。诚实回应 + 展示学习计划 = 加分项
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* 7 天速成计划 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-accent-500" />
                7 天速成计划 · 面试前必备
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {learningData.plan7day.map((p) => (
                  <div
                    key={p.day}
                    className="rounded-lg border border-neutral-100 p-3"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="accent" size="sm">
                        <Calendar className="h-3 w-3" />
                        {p.day}
                      </Badge>
                      <h4 className="text-sm font-medium text-neutral-900">{p.topic}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-1">
                      {p.resources.map((r) => (
                        <span
                          key={r.title}
                          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-neutral-100 text-neutral-700"
                        >
                          {r.title}
                          <Badge variant={r.type === "免费" ? "success" : "warning"} size="sm">
                            {r.type}
                          </Badge>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 30 天进阶计划 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary-500" />
                30 天进阶计划 · 提升竞争力
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {learningData.plan30day.map((p) => (
                  <div key={p.week} className="rounded-lg border border-primary-100 bg-primary-50/30 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="primary" size="sm">{p.week}</Badge>
                      <h4 className="text-sm font-medium text-neutral-900">{p.theme}</h4>
                    </div>
                    <ul className="space-y-1 ml-1">
                      {p.tasks.map((t) => (
                        <li key={t} className="text-xs text-neutral-700 flex items-start gap-1.5">
                          <Target className="h-3 w-3 text-primary-500 mt-0.5 flex-shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                    {p.deliverable && (
                      <p className="text-xs text-primary-700 mt-2 pt-2 border-t border-primary-100">
                        产出：{p.deliverable}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 面试 Q&A */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary-500" />
                面试官可能关注的问题
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {learningData.qa.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-neutral-100 overflow-hidden"
                >
                  <summary className="flex items-start gap-2 p-3 cursor-pointer hover:bg-neutral-50 list-none">
                    <Badge variant={difficultyColors[item.difficulty]} size="sm">
                      {item.difficulty}
                    </Badge>
                    <p className="text-sm font-medium text-neutral-900 flex-1">
                      Q{i + 1}: {item.q}
                    </p>
                    <svg className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="p-3 pt-0 border-t border-neutral-100 mt-1">
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      <span className="font-medium text-primary-700">建议回答：</span>
                      {item.a}
                    </p>
                  </div>
                </details>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* 返回 */}
        <div className="text-center pt-4">
          <Link
            href={`/resume/${matchId}/preview`}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-600"
          >
            <ArrowLeft className="h-4 w-4" />
            返回简历预览
          </Link>
        </div>
      </div>
    </div>
  );
}

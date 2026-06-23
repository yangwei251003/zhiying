"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Shield,
  AlertTriangle,
  ArrowLeft,
  Briefcase,
  DollarSign,
  Clock,
  Zap,
} from "lucide-react";

const marketData = {
  电力系统工程师: {
    overview: "电力系统工程师负责电力系统的规划、设计、运行和维护。是电力行业的核心技术岗位。",
    salary: { range: "应届8-12K · 3年15-20K · 资深25K+", growth: "年均涨薪8-12%", city_diff: "一线城市上浮20-30%" },
    demand: { trend: "稳定增长", desc: "新能源并网+智能电网推动需求，年增5-8%" },
    ai_risk: { level: "低", reason: "电力系统核心判断需人工经验+现场操作不可替代" },
    skills_needed: ["电力系统分析", "继电保护", "AutoCAD", "设备调试", "MATLAB/Simulink"],
    entry_path: "电网公司校招 → 新人培训 → 3年主责/5年主管",
    pros: ["稳定铁饭碗", "福利完善", "技术积累深厚", "行业不会消失"],
    cons: ["晋升慢", "创新空间有限", "部分岗位需倒班"],
  },
  新能源工程师: {
    overview: "新能源工程师专注光伏、风电、储能等可再生能源系统的设计与运维。",
    salary: { range: "应届9-13K · 3年18-25K · 资深30K+", growth: "年均涨薪15-20%", city_diff: "西部项目补贴高" },
    demand: { trend: "高速增长", desc: "双碳政策推动，年增15-20%" },
    ai_risk: { level: "低", reason: "现场部署+系统设计需人工" },
    skills_needed: ["光伏系统设计", "储能技术", "电力电子", "Python", "项目管理"],
    entry_path: "新能源企业校招 → 项目助理 → 项目工程师 → 项目经理",
    pros: ["政策红利大", "薪资天花板高", "技术前沿"],
    cons: ["项目出差多", "行业依赖政策", "技术迭代快"],
  },
  default: {
    overview: "该岗位的市场数据正在收集中，以下是基于通用行业分析的结果。",
    salary: { range: "应届7-12K", growth: "视行业而定", city_diff: "一线城市偏高" },
    demand: { trend: "待分析", desc: "数据收集中" },
    ai_risk: { level: "未评估", reason: "需更多数据" },
    skills_needed: ["专业技能", "沟通能力", "学习能力"],
    entry_path: "校招或社招",
    pros: ["成长空间"],
    cons: ["竞争激烈"],
  },
};

export default function ResearchPage() {
  const params = useParams();
  const jobKey = decodeURIComponent(params.jobKey as string);
  const data = (marketData as any)[jobKey] || marketData.default;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 py-8">
      <div className="container-page mx-auto px-4 md:px-8 max-w-4xl space-y-6">
        {/* 顶部 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 items-center justify-center mb-3">
            <BarChart3 className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">{jobKey} · 市场调研</h1>
          <p className="text-neutral-600">{data.overview}</p>
        </motion.div>

        {/* 数据卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-accent-500" />
                  薪资范围
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p className="font-medium text-neutral-800">{data.salary.range}</p>
                <p className="text-xs text-neutral-500">{data.salary.growth}</p>
                <p className="text-xs text-neutral-400">{data.salary.city_diff}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-primary-500" />
                  市场需求
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <Badge variant={data.demand.trend === "高速增长" ? "success" : "primary"}>
                  {data.demand.trend}
                </Badge>
                <p className="text-xs text-neutral-500 mt-1">{data.demand.desc}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-amber-500" />
                  AI 替代性
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <Badge variant={data.ai_risk.level === "低" ? "success" : "warning"}>
                  {data.ai_risk.level}
                </Badge>
                <p className="text-xs text-neutral-500 mt-1">{data.ai_risk.reason}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* 详细分析 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary-500" />
                核心技能要求
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.skills_needed.map((s: string) => (
                  <Badge key={s} variant="primary">{s}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-emerald-500" />
                  优势
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {data.pros.map((p: string) => (
                    <li key={p} className="flex items-start gap-1.5 text-sm text-neutral-700">
                      <span className="text-emerald-500 mt-0.5">+</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  劣势/风险
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {data.cons.map((c: string) => (
                    <li key={c} className="flex items-start gap-1.5 text-sm text-neutral-700">
                      <span className="text-red-500 mt-0.5">-</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary-500" />
                入行路径
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-700">{data.entry_path}</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="text-center pt-4 flex gap-4 justify-center">
          <Link href="/recommend" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-600">
            <ArrowLeft className="h-4 w-4" />
            返回岗位推荐
          </Link>
          <Link href={`/insights/${encodeURIComponent(jobKey)}`} className="inline-flex items-center gap-2 text-sm text-primary-600 hover:underline">
            查看从业者避坑建议 →
          </Link>
        </div>
      </div>
    </div>
  );
}

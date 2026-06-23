"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  AlertTriangle,
  ArrowLeft,
  MessageSquare,
  HelpCircle,
  ThumbsDown,
  Lightbulb,
  Pin,
} from "lucide-react";

const insightsData: Record<string, any> = {
  电力系统工程师: {
    real_work: [
      "日常工作不只是画图——还涉及大量设备巡视、故障排查和应急处理",
      "新人前6个月主要在跑现场、记设备位置、熟悉操作规程",
      "值班制岗位（变电/调度）需要倒班，可能影响生活作息",
    ],
    common_mistakes: [
      "仅为了快速上手而忽略安全规范——电力行业零容忍",
      "过于依赖理论而不下楼跑现场——书本知识和实际差很大",
      "只盯着国网——南网、电建、设计院、设备厂商都是好路径",
    ],
    interview_traps: [
      "考官会问'你能接受倒班吗'——诚实回答，不要勉强",
      "让你画单线图——提前练习简化的主接线图绘制",
      "问你对电力市场的看法——关注最新电改政策是加分项",
    ],
    onboarding_tips: [
      "入职第一年：跟师傅学、考取证、建立现场经验——不要急于表现",
      "带个小本随时记，老师傅的经验是书上没有的",
      "关注新能源和储能方向，这是未来5年的增长引擎",
    ],
  },
  default: {
    real_work: ["实际工作内容往往比JD描述的更具体和琐碎"],
    common_mistakes: ["不要只看薪资，关注成长空间和工作环境"],
    interview_traps: ["诚实是最好的策略，不懂就说在学"],
    onboarding_tips: ["前三个月是关键适应期，多观察多学习"],
  },
};

export default function InsightsPage() {
  const params = useParams();
  const jobKey = decodeURIComponent(params.jobKey as string);
  const data = insightsData[jobKey] || insightsData.default;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-transparent py-8">
      <div className="container-page mx-auto px-4 md:px-8 max-w-4xl space-y-6">
        {/* 顶部 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-primary-500 items-center justify-center mb-3">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">{jobKey} · 从业者避坑建议</h1>
          <p className="text-neutral-600">
            来自从业者的真实经验——帮你避开常见误区，更快上手
          </p>
          <Badge variant="warning" className="mt-2">AI 框架生成 · 从业者补充入口即将开放</Badge>
        </motion.div>

        {/* 真实工作内容 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary-500" />
                真实工作内容（JD不会告诉你的事）
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.real_work.map((item: string) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                    <Pin className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* 常见误区 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                常见误区（新人最容易踩的坑）
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.common_mistakes.map((item: string) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                    <ThumbsDown className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* 面试雷区 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                面试雷区
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.interview_traps.map((item: string) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                    <HelpCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* 入职后避坑 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Lightbulb className="h-4 w-4 text-accent-500" />
                入职后避坑手册
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.onboarding_tips.map((item: string) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                    <Lightbulb className="h-4 w-4 text-accent-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* 从业者补充入口 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card className="bg-primary-50/60 border-primary-100">
            <CardContent className="p-5 text-center">
              <MessageSquare className="h-8 w-8 text-primary-400 mx-auto mb-2" />
              <p className="text-sm text-primary-800 font-medium mb-1">你是从业者？</p>
              <p className="text-xs text-primary-600/80 mb-3">
                我们正在建立真实的从业者经验库。你的分享将帮助更多新人避坑。
              </p>
              <Badge variant="primary" size="sm">从业者投稿入口即将开放</Badge>
            </CardContent>
          </Card>
        </motion.div>

        <div className="text-center pt-4 flex gap-4 justify-center">
          <Link href={`/research/${encodeURIComponent(jobKey)}`} className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-600">
            <ArrowLeft className="h-4 w-4" />
            返回市场调研
          </Link>
        </div>
      </div>
    </div>
  );
}
